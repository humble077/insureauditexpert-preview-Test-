import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import type { ServerLeadRecord, LeadStatus } from "./leads";

const DATA_DIR = path.resolve(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const ADMIN_SECRET = process.env.ADMIN_SECRET || "iae_admin_secret_key_2026_prod";
const ADMIN_PIN = process.env.ADMIN_PIN || "4426";

export async function ensureLeadsFile(): Promise<ServerLeadRecord[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const data = await fs.readFile(LEADS_FILE, "utf-8");
      return JSON.parse(data) as ServerLeadRecord[];
    } catch {
      await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
  } catch (err) {
    console.error("Error accessing leads file:", err);
    return [];
  }
}

export async function writeLeadsFile(leads: ServerLeadRecord[]): Promise<boolean> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to write leads file:", err);
    return false;
  }
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

