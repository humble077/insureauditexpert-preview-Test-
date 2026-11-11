export interface LeadRecord {
  id: string;
  timestamp: string;
  category: "car" | "bike" | "gcv" | "pcv" | "fleet" | "health";
  categoryLabel: string;
  phone: string;
  regNo?: string;
  action: "redirect_pb" | "assisted_form";
}

export const PB_LINKS = {
  car: "https://pbpci.policybazaar.com/v3/car?token=o5aMAq6qZ1tLXTODNpDyVbk4MP6pWDnq6hhpN5u%2BmyJdeAFTvCQPw%2FrUCpwq%2BC43Pp%2FYpc582xBfjDhNZ3PSxUOct6CcR1mDYSZyV17ZGz%2BDCoiVfwncWVZevOltzdAHhCIVdlONcpyJpdQ%2FYE2ko9URX8CbyVIn7DLwHIrIEtlMRbduCAXD5VXRSZ1p%2BQzsArBxUscnc9rgdlVD0y2KIQ%3D%3D&_gl=1*12t8w4c*_ga*NzgzOTQ4MzUwLjE3OTQzNzE3MzI.*_ga_HJQ0E2N5FF*czE3OTQzNzE3MzIkbzEkZzEkdDE3OTQzOTM2ODAkajYwJGwwJGgw",
  gcv: "https://cvpbp.policybazaar.com/?token=o5aMAq6qZ1tLXTODNpDyVbk4MP6pWDnq6hhpN5u%2BmyJdeAFTvCQPw%2FrUCpwq%2BC43Pp%2FYpc582xBfjDhNZ3PSxUOct6CcR1mDYSZyV17ZGz%2BDCoiVfwncWVZevOltzdAHhCIVdlONcpyJpdQ%2FYE2ko9URX8CbyVIn7DLwHIrIEtlMRbduCAXD5VXRSZ1p%2BQzsArBxUscnc9rgdlVD0y2KIQ%3D%3D&_gl=1*e8epwz*_ga*NzgzOTQ4MzUwLjE3OTQzNzE3MzI.*_ga_HJQ0E2N5FF*czE3OTQzNzE3MzIkbzEkZzEkdDE3OTQzOTM2OTYkajQ0JGwwJGgw",
  bike: "https://pbptwowheeler.policybazaar.com/v3/bike?token=o5aMAq6qZ1tLXTODNpDyVbk4MP6pWDnq6hhpN5u%2BmyJdeAFTvCQPw%2FrUCpwq%2BC43Pp%2FYpc582xBfjDhNZ3PSxUOct6CcR1mDYSZyV17ZGz%2BDCoiVfwncWVZevOltzdAHhCIVdlONcpyJpdQ%2FYE2ko9URX8CbyVIn7DLwHIrIEtlMRbduCAXD5VXRSZ1p%2BQzsArBxUscnc9rgdlVD0y2KIQ%3D%3D&_gl=1*43g82l*_ga*NzgzOTQ4MzUwLjE3OTQzNzE3MzI.*_ga_HJQ0E2N5FF*czE3OTQzNzE3MzIkbzEkZzEkdDE3OTQzOTM2OTUkajQ1JGwwJGgw",
  // PCV link pending from PB; set to null so it automatically routes to internal consultation form
  pcv: null as string | null,
};

export const CATEGORY_INFO: Record<
  LeadRecord["category"],
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
    description: "Family floater & individual health plans. Pre-existing disease and room rent review.",
  },
};

const STORAGE_KEY = "iae_captured_leads_v1";

export function saveLead(lead: Omit<LeadRecord, "id" | "timestamp">): LeadRecord {
  const fullLead: LeadRecord = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const existing = getLeads();
      const updated = [fullLead, ...existing];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("iae:lead-saved", { detail: fullLead }));

      // Optional webhook push if configured in .env (e.g. Google Sheets / CRM webhook)
      const webhookUrl = import.meta.env.VITE_LEADS_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
          body: JSON.stringify(fullLead),
        }).catch((err) => console.warn("Webhook dispatch error:", err));
      }
    } catch (e) {
      console.warn("Unable to write lead to localStorage", e);
    }
  }

  return fullLead;
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

export function exportLeadsToCsv(): void {
  const leads = getLeads();
  if (!leads.length) {
    alert("No leads captured yet.");
    return;
  }

  const headers = ["ID", "Timestamp (IST)", "Category", "Category Label", "Mobile Number", "Vehicle Reg No", "Action"];
  const rows = leads.map((l) => [
    l.id,
    new Date(l.timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    l.category,
    `"${l.categoryLabel.replace(/"/g, '""')}"`,
    `"${l.phone}"`,
    `"${l.regNo || "N/A"}"`,
    l.action,
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

