import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import type { ServerLeadRecord, LeadStatus } from "./leads";

const DATA_DIR = path.resolve(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const ADMIN_SECRET = process.env.ADMIN_SECRET || "iae_admin_secret_key_2026_prod";
const ADMIN_PIN = process.env.ADMIN_PIN || "4426";

// In-memory cache for serverless / edge runtime (e.g. Cloudflare Pages / Workers)
let inMemoryLeads: ServerLeadRecord[] = [];
let hasLoadedFromFile = false;

export async function ensureLeadsFile(): Promise<ServerLeadRecord[]> {
  if (hasLoadedFromFile && inMemoryLeads.length > 0) {
    return inMemoryLeads;
  }
  try {
    if (typeof fs !== "undefined" && typeof fs.mkdir === "function") {
      await fs.mkdir(DATA_DIR, { recursive: true });
      try {
        const data = await fs.readFile(LEADS_FILE, "utf-8");
        const parsed = JSON.parse(data) as ServerLeadRecord[];
        if (Array.isArray(parsed)) {
          inMemoryLeads = parsed;
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
    // Expected on serverless edge runtimes (e.g. Cloudflare Pages) where disk is read-only
  }
  hasLoadedFromFile = true;
  return inMemoryLeads;
}

export async function writeLeadsFile(leads: ServerLeadRecord[]): Promise<boolean> {
  // Always update in-memory leads collection
  inMemoryLeads = leads;
  try {
    if (typeof fs !== "undefined" && typeof fs.mkdir === "function") {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
    }
  } catch (err) {
    // In serverless / edge runtimes, filesystem writes are restricted
    console.warn("Storage note: Server filesystem write unavailable on edge runtime, preserved in memory:", err);
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

