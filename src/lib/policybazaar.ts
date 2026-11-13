import { saveLeadServerFn, type LeadStatus, type ServerLeadRecord } from "./api/leads";

export interface LeadRecord {
  id: string;
  timestamp: string;
  category: string;
  categoryLabel: string;
  phone: string;
  regNo?: string;
  name?: string;
  companyName?: string;
  fleetSize?: string;
  deviceCategory?: string;
  leadType?: "PB Referral" | "Request Quote" | "Device Enquiry" | "Demo Request";
  action: "redirect_pb" | "quote_request" | "device_enquiry" | "tracking_demo" | "assisted_form";
  referralUrl?: string;
  sourcePage?: string;
  notes?: string;
  status?: LeadStatus;
}

export const PB_LINKS = {
  car: "https://pbpci.policybazaar.com/v3/car?token=o5aMAq6qZ1tLXTODNpDyVbk4MP6pWDnq6hhpN5u%2BmyJdeAFTvCQPw%2FrUCpwq%2BC43Pp%2FYpc582xBfjDhNZ3PSxUOct6CcR1mDYSZyV17ZGz%2BDCoiVfwncWVZevOltzdAHhCIVdlONcpyJpdQ%2FYE2ko9URX8CbyVIn7DLwHIrIEtlMRbduCAXD5VXRSZ1p%2BQzsArBxUscnc9rgdlVD0y2KIQ%3D%3D&_gl=1*12t8w4c*_ga*NzgzOTQ4MzUwLjE3OTQzNzE3MzI.*_ga_HJQ0E2N5FF*czE3OTQzNzE3MzIkbzEkZzEkdDE3OTQzOTM2ODAkajYwJGwwJGgw",
  gcv: "https://cvpbp.policybazaar.com/?token=o5aMAq6qZ1tLXTODNpDyVbk4MP6pWDnq6hhpN5u%2BmyJdeAFTvCQPw%2FrUCpwq%2BC43Pp%2FYpc582xBfjDhNZ3PSxUOct6CcR1mDYSZyV17ZGz%2BDCoiVfwncWVZevOltzdAHhCIVdlONcpyJpdQ%2FYE2ko9URX8CbyVIn7DLwHIrIEtlMRbduCAXD5VXRSZ1p%2BQzsArBxUscnc9rgdlVD0y2KIQ%3D%3D&_gl=1*e8epwz*_ga*NzgzOTQ4MzUwLjE3OTQzNzE3MzI.*_ga_HJQ0E2N5FF*czE3OTQzNzE3MzIkbzEkZzEkdDE3OTQzOTM2OTYkajQ0JGwwJGgw",
  bike: "https://pbptwowheeler.policybazaar.com/v3/bike?token=o5aMAq6qZ1tLXTODNpDyVbk4MP6pWDnq6hhpN5u%2BmyJdeAFTvCQPw%2FrUCpwq%2BC43Pp%2FYpc582xBfjDhNZ3PSxUOct6CcR1mDYSZyV17ZGz%2BDCoiVfwncWVZevOltzdAHhCIVdlONcpyJpdQ%2FYE2ko9URX8CbyVIn7DLwHIrIEtlMRbduCAXD5VXRSZ1p%2BQzsArBxUscnc9rgdlVD0y2KIQ%3D%3D&_gl=1*43g82l*_ga*NzgzOTQ4MzUwLjE3OTQzNzE3MzI.*_ga_HJQ0E2N5FF*czE3OTQzNzE3MzIkbzEkZzEkdDE3OTQzOTM2OTUkajQ1JGwwJGgw",
  // PCV link pending from PB; set to null so it automatically routes to internal consultation form
  pcv: null as string | null,
};

export const CATEGORY_INFO: Record<
  string,
  { label: string; short: string; isInstantPb: boolean; badge: string; description: string }
> = {
  car: {
    label: "Private Car Insurance",
    short: "Car",
    isInstantPb: true,
    badge: "Instant Policybazaar Quote",
    description: "Compare quotes across 20+ insurers instantly. Verified IDV & add-on audits.",
  },
  bike: {
    label: "Two-Wheeler / Bike Insurance",
    short: "Bike",
    isInstantPb: true,
    badge: "Instant Policybazaar Quote",
    description: "Instant quotes for motorcycle & scooter. Comprehensive or 3rd party cover in 2 minutes.",
  },
  gcv: {
    label: "Commercial Vehicle (GCV - Goods Carrier)",
    short: "Commercial (GCV)",
    isInstantPb: true,
    badge: "Instant Policybazaar Quote",
    description: "Goods carrier, pickup, tempo & truck cover. Sized by GVW & permit type.",
  },
  truck: {
    label: "Heavy Truck & Trailer Insurance",
    short: "Truck",
    isInstantPb: true,
    badge: "Instant Policybazaar Quote",
    description: "Multi-axle, tipper, tractor-trailer & goods vehicle insurance. IRDAI-compliant commercial rating.",
  },
  auto: {
    label: "Auto & Taxi / Cabs Insurance",
    short: "Auto / Taxi",
    isInstantPb: false,
    badge: "Assisted Quote",
    description: "Passenger commercial vehicles, three-wheeler autos, tourist cabs & app taxis. Statutory passenger liability compliance.",
  },
  bus: {
    label: "School Bus & Passenger Carrier (PCV)",
    short: "School Bus",
    isInstantPb: false,
    badge: "Assisted Quote",
    description: "School buses, staff buses, college coaches. Mandatory passenger cover & safety compliance audit.",
  },
  tempo: {
    label: "Four-Wheeler Tempo / Pickup Insurance",
    short: "Tempo / Pickup",
    isInstantPb: true,
    badge: "Instant Policybazaar Quote",
    description: "Pickups, delivery vans, Bolero Camper & intra-city logistics transport cover.",
  },
  pcv: {
    label: "Commercial Vehicle (PCV - Passenger Carrier)",
    short: "Passenger (PCV)",
    isInstantPb: false,
    badge: "Expert Assisted Quote",
    description: "School bus, staff bus, taxi, cab & auto. Statutory passenger liability compliance.",
  },
  fleet: {
    label: "Fleet & Taxi Fleet Insurance",
    short: "Fleet",
    isInstantPb: false,
    badge: "Corporate Assisted Quote",
    description: "5 to 500+ commercial vehicles. Unified renewal calendar & dedicated claims desk.",
  },
  health: {
    label: "Health Insurance",
    short: "Health",
    isInstantPb: false,
    badge: "Advisory Quote",
    description: "Family floater, individual & corporate group health plans. Pre-existing disease and room rent review.",
  },
  msme: {
    label: "MSME & Business Insurance",
    short: "MSME",
    isInstantPb: false,
    badge: "Business Quote",
    description: "Shop & establishment, fire & burglary, property, public liability and employee group cover.",
  },
};

const STORAGE_KEY = "iae_captured_leads_v1";

export async function saveLead(
  lead: Omit<LeadRecord, "id" | "timestamp" | "status">,
): Promise<{ success: boolean; lead: LeadRecord; error?: string }> {
  // Determine leadType if not specified
  const leadType =
    lead.leadType ||
    (lead.action === "redirect_pb"
      ? "PB Referral"
      : lead.action === "device_enquiry"
        ? "Device Enquiry"
        : lead.action === "tracking_demo"
          ? "Demo Request"
          : "Request Quote");

  // Call server function for backend persistence
  try {
    const res = await saveLeadServerFn({
      data: {
        phone: lead.phone,
        regNo: lead.regNo || undefined,
        name: lead.name || undefined,
        companyName: lead.companyName || undefined,
        fleetSize: lead.fleetSize || undefined,
        category: lead.category,
        categoryLabel: lead.categoryLabel,
        deviceCategory: lead.deviceCategory || undefined,
        leadType,
        action: lead.action,
        referralUrl: lead.referralUrl || undefined,
        sourcePage: lead.sourcePage || (typeof window !== "undefined" ? window.location.pathname : undefined),
        notes: lead.notes || undefined,
      },
    });

    if (!res || !res.success || !res.lead) {
      throw new Error("Server rejected lead persistence");
    }

    const savedLead: LeadRecord = {
      ...res.lead,
      leadType,
    };

    // Client-side backup in localStorage
    if (typeof window !== "undefined") {
      try {
        const existing = getLeads();
        const updated = [savedLead, ...existing.filter((l) => l.id !== savedLead.id)];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent("iae:lead-saved", { detail: savedLead }));

        // Optional webhook push if configured in .env (e.g. Google Sheets / CRM webhook)
        const webhookUrl = import.meta.env.VITE_LEADS_WEBHOOK_URL;
        if (webhookUrl) {
          fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "no-cors",
            body: JSON.stringify(savedLead),
          }).catch((err) => console.warn("Webhook dispatch error:", err));
        }
      } catch (e) {
        console.warn("Unable to write lead to localStorage", e);
      }
    }

    return { success: true, lead: savedLead };
  } catch (err: any) {
    console.error("Backend lead persistence error:", err);
    return {
      success: false,
      lead: {
        id: "",
        timestamp: "",
        category: lead.category,
        categoryLabel: lead.categoryLabel,
        phone: lead.phone,
        action: lead.action,
      },
      error: err?.message || "Failed to save lead to database",
    };
  }
}

export function getLeads(): LeadRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LeadRecord[]) : [];
  } catch (e) {
    console.warn("Unable to read leads from localStorage", e);
    return [];
  }
}

export function clearLeads(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("iae:lead-saved", { detail: null }));
  }
}

export function exportLeadsToCsv(leadsList?: LeadRecord[]): void {
  const leads = leadsList ?? getLeads();
  if (!leads.length) {
    alert("No leads captured yet.");
    return;
  }

  const headers = [
    "Lead ID",
    "Timestamp (IST)",
    "Customer Name",
    "Mobile Number",
    "Vehicle Reg No",
    "Category",
    "Category Label",
    "Lead Type",
    "Device Category",
    "Company / Fleet",
    "Status",
    "Action",
    "Source Page",
  ];

  const rows = leads.map((l) => [
    l.id,
    new Date(l.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    `"${(l.name || "N/A").replace(/"/g, '""')}"`,
    `"${l.phone}"`,
    `"${l.regNo || "N/A"}"`,
    l.category,
    `"${l.categoryLabel.replace(/"/g, '""')}"`,
    `"${l.leadType || "PB Referral"}"`,
    `"${l.deviceCategory || "N/A"}"`,
    `"${l.companyName ? `${l.companyName} (${l.fleetSize || "N/A"} vehicles)` : "N/A"}"`,
    `"${l.status || "New"}"`,
    l.action,
    `"${l.sourcePage || "N/A"}"`,
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `insure_audit_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
