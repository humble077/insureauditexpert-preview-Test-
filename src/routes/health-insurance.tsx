import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  HeartPulse,
  Users,
  ShieldCheck,
  CheckCircle2,
  Building2,
  ArrowRight,
  Clock,
  Lock,
  Phone,
  MessageCircle,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { saveLead } from "@/lib/policybazaar";

export const Route = createFileRoute("/health-insurance")({
  head: () => ({
    meta: [
      { title: "Health Insurance Plans & Policy Audit | Insure Audit Expert" },
      {
        name: "description",
        content:
          "Independent health insurance advisory for Individual, Family Floater, Senior Citizen, and Corporate Group Health plans. Room rent capping audits and waiting period checks before purchase.",
      },
    ],
  }),
  component: HealthInsurancePage,
});

const HEALTH_CATEGORIES = [
  {
    id: "individual",
    title: "Individual Health Insurance",
    desc: "Dedicated sum insured for individuals aged 18 to 65. Comprehensive hospitalization, pre/post cover, and daycare procedures.",
    features: ["No shared sum insured", "Cumulative bonus for claim-free years", "Restoration of sum insured on exhaustion"],
  },
  {
    id: "family",
    title: "Family Floater Plans",
    desc: "Single umbrella policy covering self, spouse, and dependent children under one shared sum insured with unified renewal.",
    features: ["Covers up to 2 adults & 4 children", "Maternity & newborn coverage options", "Cashless hospitalization across 10,000+ network hospitals"],
  },
  {
    id: "senior",
    title: "Senior Citizen Health Cover",
    desc: "Specialized coverage for parents and seniors aged 60+. Focus on pre-existing condition management, co-payment audit, and critical illness.",
    features: ["Specific pre-existing disease riders", "Annual health check-ups included", "Audit of sub-limits on cataract, joint replacement"],
  },
  {
    id: "group",
    title: "Group Health & MSME Employees",
    desc: "Employee health benefits for startups, retail establishments, and MSMEs with 5 to 500+ employees. Zero waiting period options.",
    features: ["Day-1 pre-existing disease cover for team", "Corporate cashless claims desk", "Maternity cover for employees & spouses"],
  },
  {
    id: "corporate",
    title: "Corporate Health & Wellness",
    desc: "Comprehensive corporate medical benefits, tailored deductibles, OPD allowances, and executive preventive health checkups.",
    features: ["Customized group medical policies", "Dedicated relationship manager for claims", "Executive health checkup bundles"],
  },
];

function HealthInsurancePage() {
  const [selectedPlan, setSelectedPlan] = useState("Family Floater Plans");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [members, setMembers] = useState("Self & Family (Floater)");
  const [sumInsured, setSumInsured] = useState("₹10 Lakhs - ₹25 Lakhs");
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
        category: "health",
        categoryLabel: `Health: ${selectedPlan}`,
        phone,
        name: name.trim() || undefined,
        action: "assisted_form",
        leadType: "Request Quote",
        notes: `Members: ${members} | Sum Insured: ${sumInsured} | City: ${city} | Notes: ${message}`,
        sourcePage: "/health-insurance",
      });

      if (!result.success) {
        setSubmitError(result.error || "Failed to submit health enquiry. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Health form error:", err);
      setSubmitError("Network connection error. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/60 via-white to-cloud/30 py-16 lg:py-20 border-b border-ink/8">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                <HeartPulse className="w-4 h-4" /> Independent Health Advisory · IRDAI Partners
              </div>
              <h1 className="text-[34px] sm:text-[46px] font-extrabold text-night leading-[1.1]">
                Health Insurance Audited for <span className="text-rose-600">Hidden Gaps</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-ink/75 leading-relaxed">
                Hospitalization claims get rejected due to room-rent capping, undisclosed waiting periods, or sub-limit traps. Our health desk audits policy clauses from licensed insurance partners to protect your savings when medical emergencies strike.
              </p>

              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-ink/8 shadow-xs">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">01 · Audit</span>
                  <p className="text-xs font-bold text-night mt-1">Room Rent Capping</p>
                  <p className="text-[11px] text-ink/60 mt-0.5">Prevent proportionate deduction on hospital bills.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-ink/8 shadow-xs">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">02 · Clarity</span>
                  <p className="text-xs font-bold text-night mt-1">Pre-Existing Timeline</p>
                  <p className="text-[11px] text-ink/60 mt-0.5">Clear documentation of waiting period milestones.</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-ink/8 shadow-xs">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">03 · Assistance</span>
                  <p className="text-xs font-bold text-night mt-1">Cashless Desk</p>
                  <p className="text-[11px] text-ink/60 mt-0.5">Guidance during network hospital TPA approvals.</p>
                </div>
              </div>
            </div>

            {/* Health Quote Form (NO Vehicle Registration Field) */}
            <div className="bg-white rounded-3xl border border-ink/10 p-7 shadow-xl" id="quote-form">
              {submitted ? (
                <div className="text-center py-8 animate-reveal">
                  <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 grid place-items-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-night">Enquiry Submitted!</h3>
                  <p className="mt-2 text-sm text-ink/70 leading-relaxed max-w-sm mx-auto">
                    Our senior health insurance advisor is auditing suitable plans for <strong className="text-night">{selectedPlan}</strong>. We will contact you at <strong className="text-night">+91 {phone}</strong> within business hours.
                  </p>
                  <div className="mt-6 flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="bg-cloud hover:bg-cloud/80 text-night font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
                    >
                      Submit Another Health Request
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-ink/8 pb-4 mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-night">Request Audited Health Quote</h3>
                      <p className="text-xs text-ink/60">Independent clause review across top health insurers</p>
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
                        Select Plan Category <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm font-semibold outline-none border border-ink/10 focus:border-rose-500 transition text-night"
                      >
                        {HEALTH_CATEGORIES.map((c) => (
                          <option key={c.id} value={c.title}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Priya Sharma"
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm outline-none border border-ink/10 focus:border-rose-500 transition placeholder:text-ink/40"
                        />
                      </div>
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
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm font-bold tracking-wider outline-none border border-ink/10 focus:border-rose-500 transition placeholder:text-ink/40 placeholder:font-normal placeholder:tracking-normal"
                        />
                        {phoneError && <p className="text-[10.5px] text-rose-500 font-semibold mt-1">{phoneError}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                          Members to Cover
                        </label>
                        <select
                          value={members}
                          onChange={(e) => setMembers(e.target.value)}
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm outline-none border border-ink/10 focus:border-rose-500 transition text-night"
                        >
                          <option value="Self Only (Individual)">Self Only (Individual)</option>
                          <option value="Self & Spouse (2 Adults)">Self &amp; Spouse (2 Adults)</option>
                          <option value="Self & Family (Floater)">Self, Spouse &amp; Children (Floater)</option>
                          <option value="Parents / Senior Citizens">Parents (Senior Citizens)</option>
                          <option value="Corporate / MSME Employees">Corporate / MSME Group Employees</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                          Target Sum Insured
                        </label>
                        <select
                          value={sumInsured}
                          onChange={(e) => setSumInsured(e.target.value)}
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm outline-none border border-ink/10 focus:border-rose-500 transition text-night"
                        >
                          <option value="₹5 Lakhs">₹5 Lakhs</option>
                          <option value="₹10 Lakhs - ₹25 Lakhs">₹10 Lakhs - ₹25 Lakhs</option>
                          <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore (Super Topup)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                        City of Residence &amp; Pincode
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. New Delhi, 110029"
                        className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm outline-none border border-ink/10 focus:border-rose-500 transition placeholder:text-ink/40"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...
                        </>
                      ) : (
                        <>
                          Request Audited Health Proposal <ArrowRight className="w-4 h-4" />
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

      {/* Plan Details Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-night">
              Available Health Insurance Categories
            </h2>
            <p className="mt-2 text-sm text-ink/65">
              Every health policy proposal is audited against room-rent sub-limits, disease waiting periods, and network hospital cashless terms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HEALTH_CATEGORIES.map((c) => (
              <div key={c.id} className="bg-cloud/40 rounded-3xl border border-ink/8 p-6 flex flex-col justify-between hover:border-rose-300 transition">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 grid place-items-center mb-4">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-night">{c.title}</h3>
                  <p className="mt-2 text-xs text-ink/70 leading-relaxed">{c.desc}</p>
                  <ul className="mt-4 space-y-2 text-xs text-ink/80">
                    {c.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-ink/8">
                  <a
                    href="#quote-form"
                    onClick={() => setSelectedPlan(c.title)}
                    className="text-xs font-bold text-rose-600 hover:underline inline-flex items-center gap-1"
                  >
                    Get Quote for {c.title.split(" ")[0]} →
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

