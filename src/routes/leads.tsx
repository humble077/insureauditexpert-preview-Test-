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
  ExternalLink,
  Lock,
  KeyRound,
  Clock,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";
import {
  getLeads,
  clearLeads,
  exportLeadsToCsv,
  type LeadRecord,
} from "@/lib/policybazaar";

const ADMIN_PIN = "4426"; // Secure access PIN
const SESSION_TIMEOUT_MS = 150 * 1000; // 2.5 minutes auto-lock timeout (150 seconds)

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
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [secondsRemaining, setSecondsRemaining] = useState<number>(150);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Check existing session validity on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const expiresAt = window.sessionStorage.getItem("iae_admin_auth_expires");
    if (expiresAt && Date.now() < Number(expiresAt)) {
      setIsAuthenticated(true);
      setSecondsRemaining(Math.max(0, Math.floor((Number(expiresAt) - Date.now()) / 1000)));
    } else {
      window.sessionStorage.removeItem("iae_admin_auth_expires");
      setIsAuthenticated(false);
    }
  }, []);

  // Auto-lock countdown timer (re-asks for passcode after 2.5 minutes)
  useEffect(() => {
    if (!isAuthenticated) return;

    const timer = setInterval(() => {
      const expiresAt = Number(window.sessionStorage.getItem("iae_admin_auth_expires") || 0);
      const diff = Math.floor((expiresAt - Date.now()) / 1000);

      if (diff <= 0) {
        window.sessionStorage.removeItem("iae_admin_auth_expires");
        setIsAuthenticated(false);
        setPinError("Session timed out after 2.5 minutes for security. Please re-enter passcode.");
        setPinInput("");
        setSecondsRemaining(0);
      } else {
        setSecondsRemaining(diff);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      const expiresAt = Date.now() + SESSION_TIMEOUT_MS;
      window.sessionStorage.setItem("iae_admin_auth_expires", String(expiresAt));
      setIsAuthenticated(true);
      setPinError("");
      setSecondsRemaining(Math.floor(SESSION_TIMEOUT_MS / 1000));
    } else {
      setPinError("Incorrect PIN. Access restricted to authorized personnel.");
    }
  };

  const handleExtendSession = () => {
    const expiresAt = Date.now() + SESSION_TIMEOUT_MS;
    window.sessionStorage.setItem("iae_admin_auth_expires", String(expiresAt));
    setSecondsRemaining(Math.floor(SESSION_TIMEOUT_MS / 1000));
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem("iae_admin_auth_expires");
    setIsAuthenticated(false);
    setPinInput("");
    setPinError("");
  };

  const refreshLeads = () => {
    setLeads(getLeads());
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshLeads();
      const handleUpdate = () => refreshLeads();
      window.addEventListener("iae:lead-saved", handleUpdate);
      return () => window.removeEventListener("iae:lead-saved", handleUpdate);
    }
  }, [isAuthenticated]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  if (!isAuthenticated) {
    return (
      <PageShell>
        <div className="min-h-[70vh] flex items-center justify-center py-20 px-6 bg-cloud/30">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-ink/10 shadow-xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-night text-accent-yellow grid place-items-center mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-[22px] font-extrabold text-night">Authorized Access Only</h1>
            <p className="mt-2 text-xs text-ink/65 leading-relaxed">
              This internal portal contains confidential customer quote inquiries. Enter your 4-digit admin security PIN to continue.
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
                  <p className="mt-2 text-xs text-rose-500 font-semibold bg-rose-50 p-2 rounded-lg border border-rose-100">
                    {pinError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full h-11 bg-brand hover:bg-brand-deep text-white font-bold text-sm rounded-xl transition cursor-pointer shadow-sm inline-flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" /> Unlock Dashboard
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-ink/8 text-center">
              <span className="text-[11px] text-ink/40 block mb-1">
                🔒 Auto-locks after 2.5 minutes of use for confidentiality
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

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all locally captured leads? Please download CSV first if needed.")) {
      clearLeads();
      refreshLeads();
    }
  };

  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.phone.includes(search) ||
      (l.regNo && l.regNo.toLowerCase().includes(search.toLowerCase())) ||
      l.categoryLabel.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "all" || l.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <PageShell>
      <div className="bg-cloud/40 min-h-screen py-12">
        <div className="max-w-[1240px] mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-ink/10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-ink/60 hover:text-brand"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                </Link>
                <span className="text-ink/20">·</span>
                {/* Auto-lock countdown indicator */}
                <span
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-mono font-bold bg-white border border-ink/10 px-2.5 py-1 rounded-lg text-ink/70"
                  title="Session will automatically lock when this reaches 0:00"
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
                <h1 className="text-[28px] sm:text-[34px] font-extrabold text-night">
                  Captured Quote Leads
                </h1>
                <span className="text-xs font-bold bg-brand text-white px-2.5 py-1 rounded-full tabular-nums">
                  {leads.length} Leads
                </span>
              </div>
              <p className="mt-1 text-sm text-ink/60">
                Confidential log of clients who initiated policy quotes and entered their phone numbers.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={refreshLeads}
                className="inline-flex items-center gap-1.5 bg-white border border-ink/15 text-night font-bold text-xs px-3.5 py-2.5 rounded-xl hover:bg-cloud transition shadow-2xs"
                title="Refresh leads"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
              <button
                type="button"
                onClick={exportLeadsToCsv}
                disabled={leads.length === 0}
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" /> Export to CSV
              </button>
              {leads.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs px-3 py-2.5 rounded-xl transition"
                  title="Clear storage"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-ink/8 p-5">
              <span className="text-xs font-semibold text-ink/60">Total Leads</span>
              <div className="text-2xl font-extrabold text-night mt-1 tabular-nums">
                {leads.length}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-ink/8 p-5">
              <span className="text-xs font-semibold text-ink/60">Policybazaar Redirects</span>
              <div className="text-2xl font-extrabold text-brand mt-1 tabular-nums">
                {leads.filter((l) => l.action === "redirect_pb").length}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-ink/8 p-5">
              <span className="text-xs font-semibold text-ink/60">Assisted Consultations</span>
              <div className="text-2xl font-extrabold text-night mt-1 tabular-nums">
                {leads.filter((l) => l.action === "assisted_form").length}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-ink/8 p-5">
              <span className="text-xs font-semibold text-ink/60">Commercial (GCV/PCV)</span>
              <div className="text-2xl font-extrabold text-night mt-1 tabular-nums">
                {leads.filter((l) => l.category === "gcv" || l.category === "pcv").length}
              </div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-ink/8">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="w-4 h-4 text-ink/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by mobile number, vehicle reg, or category..."
                className="w-full text-sm outline-none bg-transparent placeholder:text-ink/40"
              />
            </div>
            <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-ink/10 pt-2 sm:pt-0 sm:pl-3">
              <Filter className="w-3.5 h-3.5 text-ink/50" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs font-bold text-night bg-cloud/50 border border-ink/10 rounded-lg px-2.5 py-1.5 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="car">Private Car</option>
                <option value="bike">Bike / Two-Wheeler</option>
                <option value="gcv">Commercial (GCV)</option>
                <option value="pcv">Passenger (PCV)</option>
                <option value="fleet">Fleet</option>
                <option value="health">Health</option>
              </select>
            </div>
          </div>

          {/* Leads Table */}
          <div className="mt-6 bg-white rounded-2xl border border-ink/8 overflow-hidden shadow-xs">
            {filtered.length === 0 ? (
              <div className="p-16 text-center">
                <ShieldCheck className="w-12 h-12 text-ink/20 mx-auto mb-3" />
                <h3 className="text-base font-bold text-night">No Leads Found</h3>
                <p className="mt-1 text-xs text-ink/60 max-w-sm mx-auto">
                  {leads.length === 0
                    ? "When clients or agents click 'Get Quote' and enter their phone number on the site, their details will instantly appear here."
                    : "No leads matched your search query."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-cloud/60 text-[11px] font-bold uppercase tracking-wider text-ink/60 border-b border-ink/8">
                    <tr>
                      <th className="px-5 py-3.5">Time (IST)</th>
                      <th className="px-5 py-3.5">Category</th>
                      <th className="px-5 py-3.5">Mobile Number</th>
                      <th className="px-5 py-3.5">Vehicle Reg No</th>
                      <th className="px-5 py-3.5">Lead Type</th>
                      <th className="px-5 py-3.5 text-right">Quick Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {filtered.map((l) => (
                      <tr key={l.id} className="hover:bg-cloud/30 transition">
                        <td className="px-5 py-4 text-xs text-ink/65 whitespace-nowrap">
                          {new Date(l.timestamp).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-5 py-4">
                          <span className="font-bold text-night text-xs block">
                            {l.categoryLabel}
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-ink/40">
                            {l.category}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-mono font-bold text-night">
                          +91 {l.phone}
                        </td>
                        <td className="px-5 py-4 font-mono text-xs">
                          {l.regNo ? (
                            <span className="bg-cloud px-2 py-1 rounded font-bold text-night">
                              {l.regNo}
                            </span>
                          ) : (
                            <span className="text-ink/40 italic">Not provided</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          {l.action === "redirect_pb" ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand bg-brand-soft px-2.5 py-1 rounded-full">
                              PB Partner Portal ↗
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                              Assisted Form Request
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`https://wa.me/91${l.phone}?text=${encodeURIComponent(
                                `Hi! Greetings from Insure Audit Expert. We noticed you checked quotes for your ${l.categoryLabel} (${l.regNo || "vehicle"}). How may we assist you with best discount points & coverage today?`
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

