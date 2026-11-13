import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  ShieldCheck,
  Flame,
  Store,
  Briefcase,
  Users,
  CheckCircle2,
  ArrowRight,
  Lock,
  Phone,
  MessageCircle,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { saveLead } from "@/lib/policybazaar";

export const Route = createFileRoute("/msme-insurance")({
  head: () => ({
    meta: [
      { title: "MSME & Business Insurance | Shop, Fire & Liability — Insure Audit Expert" },
      {
        name: "description",
        content:
          "Comprehensive business insurance for Indian MSMEs: Shop & Establishment, Fire & Special Perils, Burglary, Public Liability, and Employee Group Cover. Professional risk audit included.",
      },
      {
        name: "keywords",
        content:
          "MSME insurance India, shop insurance, fire and special perils policy, factory insurance, burglary insurance business, public liability policy, business package policy",
      },
    ],
  }),
  component: MsmeInsurancePage,
});

const MSME_PLANS = [
  {
    id: "shop",
    title: "Shop & Establishment Insurance",
    desc: "Single package policy protecting retail storefronts, offices, inventory, and fixtures against fire, water leakage, burglary, and plate-glass damage.",
    features: ["Stock & inventory valuation cover", "Cash in counter & transit cover", "Signboard & plate glass protection"],
  },
  {
    id: "fire",
    title: "Fire & Special Perils (Bharat Sookshma)",
    desc: "Mandatory IRDAI standard fire cover for micro and small enterprises covering factory buildings, warehouses, plant & machinery, and raw material.",
    features: ["Covers storm, tempest, flood & inundation (STFI)", "Earthquake & explosion risks", "Business interruption loss add-on"],
  },
  {
    id: "property",
    title: "Commercial Property Insurance",
    desc: "Full reinstatement value coverage for commercial complexes, manufacturing units, industrial sheds, and multi-tenant warehouses.",
    features: ["Reinstatement value clause audit", "Debris removal & architect fee coverage", "Third-party neighboring property damage"],
  },
  {
    id: "burglary",
    title: "Burglary & Housebreaking Policy",
    desc: "Protects high-value raw materials, finished stock, and electronic equipment against forcible entry, theft, and warehouse hold-ups.",
    features: ["First loss percentage cover options", "Covers damage to safe & premises during break-in", "Audited security compliance clauses"],
  },
  {
    id: "liability",
    title: "Public & Product Liability",
    desc: "Legal defense costs and court damages arising from third-party bodily injury, property damage on premises, or manufactured product claims.",
    features: ["Any One Accident (AOA) to Any One Year (AOY) ratios", "Premises liability for visitors & clients", "Contractual vendor agreement compliance"],
  },
  {
    id: "employee",
    title: "Workmen's Compensation & Group Cover",
    desc: "Statutory Employer's Liability under Employee's Compensation Act covering factory workers, drivers, warehouse staff, and field team accidents.",
    features: ["Statutory death & permanent disability compensation", "Medical expense reimbursement riders", "Protection against labor court disputes"],
  },
  {
    id: "package",
    title: "Custom Business Package Policy",
    desc: "Tailored multi-peril policy combining asset, liability, transit, and employee protection under one single master contract with unified premium.",
    features: ["Tailored for manufacturing & export units", "Marine sales transit coverage extension", "Dedicated business claim audit assistance"],
  },
];

function MsmeInsurancePage() {
  const [selectedPlan, setSelectedPlan] = useState("Shop & Establishment Insurance");
  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("Retail / Shop");
  const [estimatedValue, setEstimatedValue] = useState("₹25 Lakhs - ₹1 Crore");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 10);
    setPhone(cleaned);
    if (cleaned.length === 10) {
      if (!/^[6-9]/.test(cleaned)) {
        setPhoneError("Enter a valid 10-digit Indian mobile number");
      } else {
        setPhoneError("");
      }
    } else if (cleaned.length > 0 && cleaned.length < 10) {
      setPhoneError("Enter full 10-digit mobile number");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!phone || phone.length !== 10 || !/^[6-9]/.test(phone)) {
      setPhoneError("Valid 10-digit mobile number is required");
      return;
    }

    setSubmitting(true);

    try {
      const result = await saveLead({
        category: "msme",
        categoryLabel: `MSME: ${selectedPlan}`,
        phone,
        name: contactPerson.trim() || undefined,
        companyName: businessName.trim() || undefined,
        action: "assisted_form",
        leadType: "Request Quote",
        notes: `Enterprise: ${businessName} | Nature: ${businessType} | Asset Value: ${estimatedValue} | City: ${city} | Notes: ${message}`,
        sourcePage: "/msme-insurance",
      });

      if (!result.success) {
        setSubmitError(result.error || "Failed to submit MSME request. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error("MSME form error:", err);
      setSubmitError("Network connection error. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/70 via-white to-cloud/30 py-16 lg:py-20 border-b border-ink/8">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                <Building2 className="w-4 h-4" /> Commercial Enterprise Protection · IRDAI Partners
              </div>
              <h1 className="text-[34px] sm:text-[46px] font-extrabold text-night leading-[1.1]">
                MSME Insurance Audited for <span className="text-blue-700">Business Continuity</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-ink/75 leading-relaxed">
                Protect your shop, factory, stock, machinery, and employee liabilities against catastrophic business interruptions. Our commercial audit team reviews policy deductibles, under-insurance clauses, and average condition rules before you commit capital.
              </p>

              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-ink/8 shadow-xs">
                  <Store className="w-5 h-5 text-blue-700 mb-2" />
                  <p className="text-xs font-bold text-night">Shops &amp; Retail</p>
                  <p className="text-[11px] text-ink/60 mt-0.5">Inventory, cash, and fire protection under one cover.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-ink/8 shadow-xs">
                  <Flame className="w-5 h-5 text-blue-700 mb-2" />
                  <p className="text-xs font-bold text-night">Factory &amp; Fire</p>
                  <p className="text-[11px] text-ink/60 mt-0.5">Bharat Sookshma &amp; Laghu Udyam IRDAI filings.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-ink/8 shadow-xs">
                  <Users className="w-5 h-5 text-blue-700 mb-2" />
                  <p className="text-xs font-bold text-night">Labor Liabilities</p>
                  <p className="text-[11px] text-ink/60 mt-0.5">Statutory Workmen's Compensation compliance.</p>
                </div>
              </div>
            </div>

            {/* MSME Quote Form (NO Vehicle Registration Field) */}
            <div className="bg-white rounded-3xl border border-ink/10 p-7 shadow-xl" id="quote-form">
              {submitted ? (
                <div className="text-center py-8 animate-reveal">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 grid place-items-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-night">Proposal Request Received!</h3>
                  <p className="mt-2 text-sm text-ink/70 leading-relaxed max-w-sm mx-auto">
                    Thank you. Our commercial underwriting auditor is structuring proposals for <strong className="text-night">{businessName || selectedPlan}</strong>. We will contact <strong className="text-night">+91 {phone}</strong> promptly.
                  </p>
                  <div className="mt-6 flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="bg-cloud hover:bg-cloud/80 text-night font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
                    >
                      Submit Another Commercial Request
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-ink/8 pb-4 mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-night">Request Commercial Insurance Audit</h3>
                      <p className="text-xs text-ink/60">Tailored quotes for Indian business establishments</p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <Lock className="w-3 h-3" /> Confidential
                    </span>
                  </div>

                  {submitError && (
                    <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                      <div>{submitError}</div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                        Commercial Category <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm font-semibold outline-none border border-ink/10 focus:border-blue-600 transition text-night"
                      >
                        {MSME_PLANS.map((p) => (
                          <option key={p.id} value={p.title}>
                            {p.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                          Enterprise / Firm Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="e.g. Apex Industrial Works"
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm outline-none border border-ink/10 focus:border-blue-600 transition placeholder:text-ink/40"
                        />
                      </div>
                      <div>
                        <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                          Contact Person Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={contactPerson}
                          onChange={(e) => setContactPerson(e.target.value)}
                          placeholder="e.g. Rajesh Bansal"
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm outline-none border border-ink/10 focus:border-blue-600 transition placeholder:text-ink/40"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                          Mobile Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder="10-digit number"
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm font-bold tracking-wider outline-none border border-ink/10 focus:border-blue-600 transition placeholder:text-ink/40 placeholder:font-normal placeholder:tracking-normal"
                        />
                        {phoneError && <p className="text-[10.5px] text-rose-500 font-semibold mt-1">{phoneError}</p>}
                      </div>
                      <div>
                        <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                          Nature of Business
                        </label>
                        <select
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm outline-none border border-ink/10 focus:border-blue-600 transition text-night"
                        >
                          <option value="Retail / Shop">Retail / Shop</option>
                          <option value="Manufacturing / Factory">Manufacturing / Factory</option>
                          <option value="Warehouse / Logistics">Warehouse / Logistics</option>
                          <option value="Corporate Office / IT">Corporate Office / IT</option>
                          <option value="Hospitality / Food Services">Hospitality / Food Services</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                          Estimated Asset / Stock Value
                        </label>
                        <select
                          value={estimatedValue}
                          onChange={(e) => setEstimatedValue(e.target.value)}
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm outline-none border border-ink/10 focus:border-blue-600 transition text-night"
                        >
                          <option value="Up to ₹25 Lakhs">Up to ₹25 Lakhs</option>
                          <option value="₹25 Lakhs - ₹1 Crore">₹25 Lakhs - ₹1 Crore</option>
                          <option value="₹1 Crore - ₹5 Crores">₹1 Crore - ₹5 Crores</option>
                          <option value="₹5 Crores+ (Laghu/Madhyam)">₹5 Crores+ (Large Risk)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                          Location (City / Industrial Area)
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Okhla Phase III, Delhi"
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm outline-none border border-ink/10 focus:border-blue-600 transition placeholder:text-ink/40"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...
                        </>
                      ) : (
                        <>
                          Request Commercial Proposal <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MSME Plans Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-night">
              Business Insurance Coverage Portfolio
            </h2>
            <p className="mt-2 text-sm text-ink/65">
              Structured strictly under IRDAI commercial guidelines with expert clause scrutiny.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MSME_PLANS.map((p) => (
              <div key={p.id} className="bg-cloud/40 rounded-3xl border border-ink/8 p-6 flex flex-col justify-between hover:border-blue-300 transition">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 grid place-items-center mb-4">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-night">{p.title}</h3>
                  <p className="mt-2 text-xs text-ink/70 leading-relaxed">{p.desc}</p>
                  <ul className="mt-4 space-y-2 text-xs text-ink/80">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-ink/8">
                  <a
                    href="#quote-form"
                    onClick={() => setSelectedPlan(p.title)}
                    className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1"
                  >
                    Get Quote for {p.title.split(" ")[0]} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

