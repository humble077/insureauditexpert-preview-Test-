import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type LeadStatus = "New" | "Contacted" | "Follow-up" | "Converted" | "Closed";

export interface ServerLeadRecord {
  id: string;
  timestamp: string;
  phone: string;
  regNo?: string;
  name?: string;
  companyName?: string;
  fleetSize?: string;
  category: string;
  categoryLabel: string;
  deviceCategory?: string;
  leadType: "PB Referral" | "Request Quote" | "Device Enquiry" | "Demo Request";
  action: "redirect_pb" | "quote_request" | "device_enquiry" | "tracking_demo" | "assisted_form";
  referralUrl?: string;
  sourcePage?: string;
  notes?: string;
  status: LeadStatus;
}

export const saveLeadServerFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid 10-digit Indian phone number"),
      regNo: z.string().optional(),
      name: z.string().optional(),
      companyName: z.string().optional(),
      fleetSize: z.string().optional(),
      category: z.string().min(1),
      categoryLabel: z.string().min(1),
      deviceCategory: z.string().optional(),
      leadType: z.enum(["PB Referral", "Request Quote", "Device Enquiry", "Demo Request"]),
      action: z.enum(["redirect_pb", "quote_request", "device_enquiry", "tracking_demo", "assisted_form"]),
      referralUrl: z.string().optional(),
      sourcePage: z.string().optional(),
      notes: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { ensureLeadsFile, writeLeadsFile } = await import("./leads.server");
    const leads = await ensureLeadsFile();

    // Idempotency check: if exact same phone and category submitted within past 15 min
    const now = Date.now();
    const existingIndex = leads.findIndex((l) => {
      const isSamePhone = l.phone === data.phone;
      const isSameCat = l.category === data.category;
      const isSameType = (l.leadType || "") === (data.leadType || "");
      const isRecent = now - new Date(l.timestamp).getTime() < 15 * 60 * 1000;
      return isSamePhone && isSameCat && isSameType && isRecent;
    });

    if (existingIndex !== -1) {
      return { success: true, lead: leads[existingIndex], isDuplicate: true };
    }

    const newLead: ServerLeadRecord = {
      ...data,
      id: `lead_${now}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
      status: "New",
    };

    const updated = [newLead, ...leads];
    try {
      await writeLeadsFile(updated);
    } catch (writeErr) {
      console.warn("Server lead file write notice:", writeErr);
    }

    return { success: true, lead: newLead, isDuplicate: false };
  });

export const verifyAdminPinServerFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ pin: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { checkAdminPin, generateSessionToken } = await import("./leads.server");
    if (checkAdminPin(data.pin)) {
      const token = generateSessionToken();
      return { success: true, token, expiresAt: Date.now() + 150 * 1000 };
    }
    return { success: false, error: "Incorrect PIN. Access restricted to authorized personnel." };
  });

export const getLeadsServerFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const { verifySessionToken, ensureLeadsFile } = await import("./leads.server");
    const isValid = verifySessionToken(data.token);
    if (!isValid) {
      throw new Error("Unauthorized: Invalid or expired session token.");
    }
    const leads = await ensureLeadsFile();
    return { success: true, leads };
  });

export const updateLeadStatusServerFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string(),
      leadId: z.string(),
      status: z.enum(["New", "Contacted", "Follow-up", "Converted", "Closed"]),
    }),
  )
  .handler(async ({ data }) => {
    const { verifySessionToken, ensureLeadsFile, writeLeadsFile } = await import("./leads.server");
    const isValid = verifySessionToken(data.token);
    if (!isValid) {
      throw new Error("Unauthorized: Invalid or expired session token.");
    }

    const leads = await ensureLeadsFile();
    const lead = leads.find((l) => l.id === data.leadId);
    if (!lead) {
      throw new Error("Lead not found.");
    }

    lead.status = data.status;
    await writeLeadsFile(leads);
    return { success: true, lead };
  });

export const clearLeadsServerFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const { verifySessionToken, writeLeadsFile } = await import("./leads.server");
    const isValid = verifySessionToken(data.token);
    if (!isValid) {
      throw new Error("Unauthorized: Invalid or expired session token.");
    }

    await writeLeadsFile([]);
    return { success: true };
  });
