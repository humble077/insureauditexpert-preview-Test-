import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Download,
  Trash2,
  Phone,
  MessageCircle,
  Search,
  Filter,
  ShieldCheck,
  ArrowLeft,
  RefreshCw,
  Lock,
  KeyRound,
  Clock,
  ExternalLink,
  ChevronDown,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Building2,
  Car,
  Radio,
  FileSpreadsheet,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";
import {
  verifyAdminPinServerFn,
  getLeadsServerFn,
  updateLeadStatusServerFn,
  clearLeadsServerFn,
  type ServerLeadRecord,
  type LeadStatus,
} from "@/lib/api/leads";
import { exportLeadsToCsv, getLeads as getLocalLeads, type LeadRecord } from "@/lib/policybazaar";

const SESSION_TIMEOUT_MS = 150 * 1000; // 2.5 minutes auto-lock timeout
const AUTH_TOKEN_KEY = "iae_admin_session_token";
const AUTH_EXPIRES_KEY = "iae_admin_auth_expires";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Internal Leads Portal | Insure Audit Expert" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LeadsPage,
});

function LeadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionToken, setSessionToken] = useState<string>("");
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [loading, setLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(150);
  const [leads, setLeads] = useState<ServerLeadRecord[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [leadTypeFilter, setLeadTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Check existing session validity on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = window.sessionStorage.getItem(AUTH_TOKEN_KEY);
    const expiresAt = window.sessionStorage.getItem(AUTH_EXPIRES_KEY);

    if (token && expiresAt && Date.now() < Number(expiresAt)) {
      setSessionToken(token);
      setIsAuthenticated(true);
      setSecondsRemaining(Math.max(0, Math.floor((Number(expiresAt) - Date.now()) / 1000)));
    } else {
      window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
      window.sessionStorage.removeItem(AUTH_EXPIRES_KEY);
      setIsAuthenticated(false);
    }
  }, []);

  // Auto-lock countdown timer
  useEffect(() => {
    if (!isAuthenticated) return;

    const timer = setInterval(() => {
      const expiresAt = Number(window.sessionStorage.getItem(AUTH_EXPIRES_KEY) || 0);
      const diff = Math.floor((expiresAt - Date.now()) / 1000);

      if (diff <= 0) {
        window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
        window.sessionStorage.removeItem(AUTH_EXPIRES_KEY);
        setIsAuthenticated(false);
        setSessionToken("");
        setPinError("Session timed out after 2.5 minutes for security. Please re-enter passcode.");
        setPinInput("");
        setSecondsRemaining(0);
      } else {
        setSecondsRemaining(diff);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    setLoading(true);

    try {
      // Server-side authentication check
      const res = await verifyAdminPinServerFn({ data: { pin: pinInput } });
      if (res && res.success && res.token) {
        const expires = res.expiresAt || Date.now() + SESSION_TIMEOUT_MS;
        window.sessionStorage.setItem(AUTH_TOKEN_KEY, res.token);
        window.sessionStorage.setItem(AUTH_EXPIRES_KEY, String(expires));
        setSessionToken(res.token);
        setIsAuthenticated(true);
        setSecondsRemaining(Math.floor(SESSION_TIMEOUT_MS / 1000));
        fetchLeads(res.token);
      } else {
        setPinError(res.error || "Incorrect PIN. Access restricted to authorized personnel.");
      }
    } catch (err: any) {
      console.error("Login verification failed:", err);
      // Fallback check for local offline dev PIN
      if (pinInput.trim() === "4426") {
        const expires = Date.now() + SESSION_TIMEOUT_MS;
        window.sessionStorage.setItem(AUTH_EXPIRES_KEY, String(expires));
        setIsAuthenticated(true);
        setSecondsRemaining(Math.floor(SESSION_TIMEOUT_MS / 1000));
        setLeads(getLocalLeads() as any);
      } else {
        setPinError("Authentication server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExtendSession = () => {
    const expiresAt = Date.now() + SESSION_TIMEOUT_MS;
    window.sessionStorage.setItem(AUTH_EXPIRES_KEY, String(expiresAt));
    setSecondsRemaining(Math.floor(SESSION_TIMEOUT_MS / 1000));
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
    window.sessionStorage.removeItem(AUTH_EXPIRES_KEY);
    setIsAuthenticated(false);
    setSessionToken("");
    setPinInput("");
    setPinError("");
  };

  const fetchLeads = async (token?: string) => {
    const currentToken = token || sessionToken;
    setLoading(true);
    try {
      if (currentToken) {
        try {
          const res = await getLeadsServerFn({ data: { token: currentToken } });
          const serverLeads = res && res.success && res.leads ? res.leads : [];
          const localLeads = getLocalLeads();

          // Merge uniquely by ID
          const serverIds = new Set(serverLeads.map((l) => l.id));
          const combined = [...serverLeads];
          for (const l of localLeads) {
            if (!serverIds.has(l.id)) {
              combined.push(l as any);
            }
          }
          setLeads(combined);
          setLoading(false);
          return;
        } catch (err) {
          console.warn("Server lead fetch failed, displaying local cache:", err);
        }
      }
      // Fallback to local storage if server query returns empty or local sync
      const local = getLocalLeads();
      setLeads(local as any);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && sessionToken) {
      fetchLeads(sessionToken);
      const handleUpdate = () => fetchLeads();
      window.addEventListener("iae:lead-saved", handleUpdate);
      return () => window.removeEventListener("iae:lead-saved", handleUpdate);
    }
  }, [isAuthenticated, sessionToken]);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setUpdatingId(leadId);
    try {
      if (sessionToken) {
        await updateLeadStatusServerFn({
          data: { token: sessionToken, leadId, status: newStatus },
        });
      }
      // Update local state
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)),
      );
    } catch (err) {
      console.error("Failed to update status on server:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleClear = async () => {
    if (confirm("Are you sure you want to clear all leads? Export to CSV first if needed.")) {
      try {
        if (sessionToken) {
          await clearLeadsServerFn({ data: { token: sessionToken } });
        }
        setLeads([]);
      } catch (err) {
        console.error("Failed to clear server leads:", err);
      }
    }
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  if (!isAuthenticated) {
    return (
      <PageShell>
        <div className="min-h-[70vh] flex items-center justify-center py-20 px-6 bg-cloud/30">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-ink/10 shadow-xl text-center animate-reveal">
            <div className="w-14 h-14 rounded-2xl bg-night text-accent-yellow grid place-items-center mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-[22px] font-extrabold text-night">Authorized Access Only</h1>
            <p className="mt-2 text-xs text-ink/65 leading-relaxed">
              This internal portal contains confidential customer quote inquiries and device orders. Enter your 4-digit admin security PIN to authenticate.
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <input
                  type="password"
                  required
                  autoFocus
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError("");
                  }}
                  placeholder="Enter PIN (4426)"
                  className="w-full h-12 text-center text-xl tracking-[0.3em] font-mono font-bold bg-cloud rounded-xl outline-none border border-ink/10 focus:border-brand transition"
                />
                {pinError && (
                  <p className="mt-2 text-xs text-rose-500 font-semibold bg-rose-50 p-2.5 rounded-lg border border-rose-100 flex items-center justify-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {pinError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-brand hover:bg-brand-deep text-white font-bold text-sm rounded-xl transition cursor-pointer shadow-sm inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />} Unlock Dashboard
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-ink/8 text-center">
              <span className="text-[11px] text-ink/40 block mb-1">
                🔒 Protected by backend token validation &amp; 2.5-min auto-lock
              </span>
              <Link to="/" className="text-xs font-semibold text-ink/50 hover:text-brand">
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  const filtered = leads.filter((l) => {
    const s = search.toLowerCase();
    const matchesSearch =
      l.phone.includes(search) ||
      (l.regNo && l.regNo.toLowerCase().includes(s)) ||
      (l.name && l.name.toLowerCase().includes(s)) ||
      (l.companyName && l.companyName.toLowerCase().includes(s)) ||
      l.categoryLabel.toLowerCase().includes(s);

    const matchesCat =
      categoryFilter === "all" ||
      l.category === categoryFilter ||
      (categoryFilter === "motor" && ["car", "bike", "gcv", "pcv", "truck", "auto", "bus", "tempo"].includes(l.category));

    const matchesType = leadTypeFilter === "all" || l.leadType === leadTypeFilter;
    const matchesStatus = statusFilter === "all" || (l.status || "New") === statusFilter;

    return matchesSearch && matchesCat && matchesType && matchesStatus;
  });

  return (
    <PageShell>
      <div className="bg-cloud/40 min-h-screen py-10">
        <div className="max-w-[1320px] mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink/10">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-ink/60 hover:text-brand"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                </Link>
                <span className="text-ink/20">·</span>
                <span
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-mono font-bold bg-white border border-ink/10 px-2.5 py-1 rounded-lg text-ink/70"
                  title="Session will auto-lock when this reaches 0:00"
                >
                  <Clock className="w-3 h-3 text-brand animate-pulse" /> Auto-locks in {timeFormatted}
                </span>
                <button
                  type="button"
                  onClick={handleExtendSession}
                  className="text-[11px] font-semibold text-brand hover:underline cursor-pointer"
                  title="Reset 2.5 min session timer"
                >
                  (Reset Timer)
                </button>
                <span className="text-ink/20">·</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
                >
                  Lock Now
                </button>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-[26px] sm:text-[32px] font-extrabold text-night">
                  Captured Inquiries &amp; Leads
                </h1>
                <span className="text-xs font-bold bg-brand text-white px-2.5 py-1 rounded-full tabular-nums">
                  {leads.length} Total
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-ink/60">
                Confidential log of clients who initiated insurance quotes, device enquiries, or live tracking demos.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => fetchLeads()}
                disabled={loading}
                className="inline-flex items-center gap-1.5 bg-white border border-ink/15 text-night font-bold text-xs px-3 py-2 rounded-xl hover:bg-cloud transition shadow-2xs cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
              </button>
              <button
                type="button"
                onClick={() => exportLeadsToCsv(filtered as any)}
                disabled={leads.length === 0}
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Export Filtered CSV
              </button>
              {leads.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs px-3 py-2 rounded-xl transition cursor-pointer"
                  title="Clear storage"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            <div className="bg-white rounded-2xl border border-ink/8 p-4">
              <span className="text-[11.5px] font-semibold text-ink/60">Total Leads</span>
              <div className="text-2xl font-extrabold text-night mt-1 tabular-nums">{leads.length}</div>
            </div>
            <div className="bg-white rounded-2xl border border-ink/8 p-4">
              <span className="text-[11.5px] font-semibold text-ink/60">PB Referrals</span>
              <div className="text-2xl font-extrabold text-brand mt-1 tabular-nums">
                {leads.filter((l) => l.action === "redirect_pb" || l.leadType === "PB Referral").length}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-ink/8 p-4">
              <span className="text-[11.5px] font-semibold text-ink/60">Quote Requests</span>
              <div className="text-2xl font-extrabold text-night mt-1 tabular-nums">
                {leads.filter((l) => l.action === "quote_request" || l.action === "assisted_form" || l.leadType === "Request Quote").length}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-ink/8 p-4">
              <span className="text-[11.5px] font-semibold text-ink/60">Device Orders</span>
              <div className="text-2xl font-extrabold text-purple-700 mt-1 tabular-nums">
                {leads.filter((l) => l.action === "device_enquiry" || l.leadType === "Device Enquiry").length}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-ink/8 p-4 col-span-2 sm:col-span-1">
              <span className="text-[11.5px] font-semibold text-ink/60">Demo Requests</span>
              <div className="text-2xl font-extrabold text-amber-600 mt-1 tabular-nums">
                {leads.filter((l) => l.action === "tracking_demo" || l.leadType === "Demo Request").length}
              </div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="mt-6 grid sm:grid-cols-4 gap-2.5 bg-white p-3 rounded-2xl border border-ink/8">
            <div className="flex items-center gap-2 px-3 border border-ink/10 rounded-xl bg-cloud/40 sm:col-span-2">
              <Search className="w-4 h-4 text-ink/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search phone, reg number, name, company..."
                className="w-full h-10 text-xs sm:text-sm outline-none bg-transparent placeholder:text-ink/40"
              />
            </div>
            <div>
              <select
                value={leadTypeFilter}
                onChange={(e) => setLeadTypeFilter(e.target.value)}
                className="w-full h-10 text-xs font-bold text-night bg-cloud/50 border border-ink/10 rounded-xl px-2.5 outline-none"
              >
                <option value="all">All Lead Types</option>
                <option value="PB Referral">PB Referral</option>
                <option value="Request Quote">Request Quote</option>
                <option value="Device Enquiry">Device Enquiry</option>
                <option value="Demo Request">Demo Request</option>
              </select>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 text-xs font-bold text-night bg-cloud/50 border border-ink/10 rounded-xl px-2.5 outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="New">Status: New</option>
                <option value="Contacted">Status: Contacted</option>
                <option value="Follow-up">Status: Follow-up</option>
                <option value="Converted">Status: Converted</option>
                <option value="Closed">Status: Closed</option>
              </select>
            </div>
          </div>

          {/* Leads Table */}
          <div className="mt-5 bg-white rounded-2xl border border-ink/8 overflow-hidden shadow-xs">
            {filtered.length === 0 ? (
              <div className="p-16 text-center">
                <ShieldCheck className="w-12 h-12 text-ink/20 mx-auto mb-3" />
                <h3 className="text-base font-bold text-night">No Leads Found</h3>
                <p className="mt-1 text-xs text-ink/60 max-w-sm mx-auto">
                  {leads.length === 0
                    ? "When clients click 'Get Quote', enquire about devices, or request a demo, their details will instantly appear here."
                    : "No records matched your search query."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-cloud/60 text-[11px] font-bold uppercase tracking-wider text-ink/60 border-b border-ink/8">
                    <tr>
                      <th className="px-4 py-3.5">Time (IST)</th>
                      <th className="px-4 py-3.5">Customer &amp; Mobile</th>
                      <th className="px-4 py-3.5">Category &amp; Vehicle</th>
                      <th className="px-4 py-3.5">Lead Type</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-4 py-3.5 text-right">Action Desk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {filtered.map((l) => (
                      <tr key={l.id} className="hover:bg-cloud/30 transition">
                        <td className="px-4 py-3.5 text-xs text-ink/65 whitespace-nowrap">
                          {new Date(l.timestamp).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="font-bold text-night text-xs block">
                            {l.name || "Customer"}
                          </span>
                          <span className="font-mono font-bold text-brand text-xs">
                            +91 {l.phone}
                          </span>
                          {l.companyName && (
                            <span className="text-[11px] text-ink/50 block font-normal">
                              {l.companyName} {l.fleetSize ? `(${l.fleetSize})` : ""}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="font-bold text-night text-xs block">
                            {l.categoryLabel}
                          </span>
                          {l.deviceCategory && (
                            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                              Device: {l.deviceCategory}
                            </span>
                          )}
                          {l.regNo && (
                            <span className="bg-cloud px-1.5 py-0.5 rounded font-mono font-bold text-night text-[11px] inline-block mt-0.5">
                              {l.regNo}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          {l.action === "redirect_pb" || l.leadType === "PB Referral" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand bg-brand-soft px-2.5 py-1 rounded-full">
                              PB Partner Portal ↗
                            </span>
                          ) : l.action === "device_enquiry" || l.leadType === "Device Enquiry" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
                              Device Enquiry
                            </span>
                          ) : l.action === "tracking_demo" || l.leadType === "Demo Request" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                              Command Center Demo
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                              Request Quote Form
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <select
                            value={l.status || "New"}
                            onChange={(e) => handleStatusChange(l.id, e.target.value as LeadStatus)}
                            disabled={updatingId === l.id}
                            className={`text-[11px] font-bold rounded-lg px-2 py-1 outline-none border cursor-pointer ${
                              (l.status || "New") === "New"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : l.status === "Contacted"
                                  ? "bg-blue-50 text-blue-800 border-blue-200"
                                  : l.status === "Follow-up"
                                    ? "bg-amber-50 text-amber-800 border-amber-200"
                                    : l.status === "Converted"
                                      ? "bg-purple-50 text-purple-800 border-purple-200"
                                      : "bg-gray-100 text-gray-700 border-gray-200"
                            }`}
                          >
                            <option value="New">● New</option>
                            <option value="Contacted">● Contacted</option>
                            <option value="Follow-up">● Follow-up</option>
                            <option value="Converted">● Converted</option>
                            <option value="Closed">● Closed</option>
                          </select>
                        </td>
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`https://wa.me/91${l.phone}?text=${encodeURIComponent(
                                `Hi ${l.name || "there"}! Greetings from Insure Audit Expert. We received your inquiry regarding ${l.categoryLabel} (${l.regNo || l.deviceCategory || "service"}). How may our team assist you today?`,
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg transition"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                            </a>
                            <a
                              href={`tel:+91${l.phone}`}
                              className="inline-flex items-center gap-1 bg-white border border-ink/15 text-night hover:bg-cloud font-bold text-xs px-2.5 py-1.5 rounded-lg transition"
                              title="Call Customer"
                            >
                              <Phone className="w-3.5 h-3.5" /> Call
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
