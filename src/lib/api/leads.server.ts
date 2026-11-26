import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import type { ServerLeadRecord, LeadStatus } from "./leads";

const DATA_DIR = path.resolve(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const ADMIN_SECRET = process.env.ADMIN_SECRET || "iae_admin_secret_key_2026_prod";
const ADMIN_PIN = process.env.ADMIN_PIN || "4426";

// Helper to detect Cloudflare KV namespace binding
export function getCloudflareKV(): any {
  try {
    // 1. Direct global binding (set by Nitro plugin, worker global scope, or Service Worker)
    if ((globalThis as any).LEADS_KV && typeof (globalThis as any).LEADS_KV.get === "function") {
      return (globalThis as any).LEADS_KV;
    }
    if ((globalThis as any).KV && typeof (globalThis as any).KV.get === "function") {
      return (globalThis as any).KV;
    }

    // 2. Global environment set by Nitro request hook or server entry
    const cfEnv = (globalThis as any).__CF_ENV__ || (globalThis as any).__env__;
    if (cfEnv) {
      if (cfEnv.LEADS_KV && typeof cfEnv.LEADS_KV.get === "function") return cfEnv.LEADS_KV;
      if (cfEnv.KV && typeof cfEnv.KV.get === "function") return cfEnv.KV;
    }

    // 3. Process env for Node.js / local CLI emulation
    const procEnv = (process as any)?.env;
    if (procEnv) {
      if (procEnv.LEADS_KV && typeof procEnv.LEADS_KV.get === "function") return procEnv.LEADS_KV;
      if (procEnv.KV && typeof procEnv.KV.get === "function") return procEnv.KV;
    }
  } catch {}
  return null;
}

// In-memory cache for serverless / edge runtime (e.g. Cloudflare Pages / Workers)
let inMemoryLeads: ServerLeadRecord[] = [];
let hasLoadedFromFile = false;

// Strict deduplicator to prevent duplicate records from inflating count across edge nodes
export function deduplicateLeads(leads: ServerLeadRecord[]): ServerLeadRecord[] {
  if (!Array.isArray(leads)) return [];
  const seenIds = new Set<string>();
  const seenSubmissions = new Set<string>();
  const result: ServerLeadRecord[] = [];

  for (const lead of leads) {
    if (!lead || !lead.id || !lead.phone) continue;

    // Check unique ID
    if (seenIds.has(lead.id)) continue;
    seenIds.add(lead.id);

    // Check duplicate submissions within 15-minute window for same phone and category
    const timeMs = new Date(lead.timestamp).getTime();
    const timeWindow = isNaN(timeMs) ? "0" : String(Math.floor(timeMs / (15 * 60 * 1000)));
    const submissionKey = `${lead.phone}_${lead.category}_${lead.leadType || "quote"}_${timeWindow}`;
    if (seenSubmissions.has(submissionKey)) continue;
    seenSubmissions.add(submissionKey);

    result.push(lead);
  }

  // Sort descending by timestamp (newest first)
  return result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function ensureLeadsFile(): Promise<ServerLeadRecord[]> {
  // 1. Primary Centralized Storage: Cloudflare KV (Worldwide consistency)
  const kv = getCloudflareKV();
  if (kv && typeof kv.get === "function") {
    try {
      const data = await kv.get("iae_leads");
      if (data) {
        const parsed = JSON.parse(data) as ServerLeadRecord[];
        if (Array.isArray(parsed)) {
          inMemoryLeads = deduplicateLeads(parsed);
          return inMemoryLeads;
        }
      } else {
        // If KV exists but has no data yet, sync inMemoryLeads to KV so all isolates share it
        if (inMemoryLeads.length > 0) {
          try {
            await kv.put("iae_leads", JSON.stringify(deduplicateLeads(inMemoryLeads)));
          } catch {}
        }
      }
    } catch (kvErr) {
      console.warn("Cloudflare KV read notice:", kvErr);
    }
  }

  if (hasLoadedFromFile && inMemoryLeads.length > 0) {
    return deduplicateLeads(inMemoryLeads);
  }

  // 2. Local Node server filesystem storage
  try {
    if (typeof fs !== "undefined" && typeof fs.mkdir === "function") {
      await fs.mkdir(DATA_DIR, { recursive: true });
      try {
        const data = await fs.readFile(LEADS_FILE, "utf-8");
        const parsed = JSON.parse(data) as ServerLeadRecord[];
        if (Array.isArray(parsed)) {
          inMemoryLeads = deduplicateLeads(parsed);
          hasLoadedFromFile = true;
          return inMemoryLeads;
        }
      } catch {
        try {
          await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
        } catch {}
      }
    }
  } catch (err) {
    // Expected on serverless edge runtimes
  }
  hasLoadedFromFile = true;
  return deduplicateLeads(inMemoryLeads);
}

export async function writeLeadsFile(leads: ServerLeadRecord[]): Promise<boolean> {
  const cleanLeads = deduplicateLeads(leads);
  inMemoryLeads = cleanLeads;

  // 1. Persist to Cloudflare KV if bound
  const kv = getCloudflareKV();
  if (kv && typeof kv.put === "function") {
    try {
      await kv.put("iae_leads", JSON.stringify(cleanLeads));
    } catch (kvErr) {
      console.warn("Cloudflare KV write notice:", kvErr);
    }
  }

  // 2. Persist to local filesystem if available
  try {
    if (typeof fs !== "undefined" && typeof fs.mkdir === "function") {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(LEADS_FILE, JSON.stringify(cleanLeads, null, 2), "utf-8");
    }
  } catch (err) {
    // Expected on serverless edge runtimes
  }
  return true;
}

export function generateSessionToken(): string {
  const expiresAt = Date.now() + 150 * 1000; // 2.5 minutes session
  const payload = `${expiresAt}:${ADMIN_PIN}`;
  const hmac = crypto.createHmac("sha256", ADMIN_SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${hmac}`).toString("base64");
}

export function verifySessionToken(token: string): boolean {
  try {
    if (!token) return false;
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [expiresAtStr, pin, hmac] = decoded.split(":");
    if (!expiresAtStr || !pin || !hmac) return false;

    const expiresAt = Number(expiresAtStr);
    if (Date.now() > expiresAt) return false;
    if (pin !== ADMIN_PIN) return false;

    const expectedHmac = crypto.createHmac("sha256", ADMIN_SECRET).update(`${expiresAtStr}:${pin}`).digest("hex");
    return hmac === expectedHmac;
  } catch {
    return false;
  }
}

export function checkAdminPin(pin: string): boolean {
  return pin.trim() === ADMIN_PIN;
}
