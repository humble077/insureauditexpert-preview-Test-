import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  FileSearch,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Camera,
  Navigation,
  FileText,
  HelpCircle,
  Lock,
  Loader2,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { saveLead } from "@/lib/policybazaar";
import { Reveal, Tilt, Magnetic } from "@/lib/motion";
import { BlueprintField, DrawUnderline, Spotlight } from "@/components/graphics";
import { ClaimEvidenceSlider, PolicyBlindspotQuiz } from "@/components/interactive-showcase";

export const Route = createFileRoute("/claim-assistance")({
  head: () => ({
    meta: [
      { title: "Insurance Claim Assistance Desk | Insure Audit Expert" },
      {
        name: "description",
        content:
          "Professional guidance and evidence dossier preparation for motor, commercial vehicle, and health insurance claims. Surveyor coordination, dashcam footage review, and document checklists.",
      },
      {
        name: "keywords",
        content:
          "insurance claim assistance Delhi, motor accident claim help, commercial vehicle claim support, dashcam accident evidence, surveyor coordination, claim rejection advice",
      },
    ],
  }),
  component: ClaimAssistancePage,
});

const STEPS = [
  {
    step: "01",
    title: "Immediate Notice of Loss Guidance",
    desc: "Step-by-step instructions immediately after an incident: photographing vehicle positions, noting third-party details, FIR requirements, and timely insurer notification.",
  },
  {
    step: "02",
    title: "Evidence Dossier Preparation",
    desc: "Retrieval and verification of G-sensor dashcam footage and GPS speed/route telemetry to corroborate your version of events objectively.",
  },
  {
    step: "03",
    title: "Document Verification Checklist",
    desc: "Pre-survey audit of driver's license validity, commercial vehicle fitness/permit documents, and policy conditions to eliminate common procedural rejection grounds.",
  },
  {
    step: "04",
    title: "Surveyor & Workshop Coordination",
    desc: "Guidance through surveyor inspection, cashless network garage coordination, and clear communication on depreciation and deductible schedules.",
  },
];

function ClaimAssistancePage() {
  const [claimType, setClaimType] = useState("Private Car Accident Claim");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [regNo, setRegNo] = useState("");
  const [insurer, setInsurer] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [details, setDetails] = useState("");
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
        category: "claim",
        categoryLabel: `Claim Assistance: ${claimType}`,
        phone,
        name: name.trim() || undefined,
        regNo: regNo.trim() || undefined,
        action: "assisted_form",
        leadType: "Request Quote",
        notes: `Type: ${claimType} | Insurer: ${insurer} | Incident Date: ${incidentDate} | Details: ${details}`,
        sourcePage: "/claim-assistance",
      });

      if (!result.success) {
        setSubmitError(result.error || "Failed to submit request. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Claim assistance form error:", err);
      setSubmitError("Network connection error. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-soft/70 via-white to-cloud/30 py-16 lg:py-20 border-b border-ink/8 relative overflow-hidden">
        <BlueprintField tone="light" />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <Reveal variant="up">
              <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                <ShieldCheck className="w-4 h-4" /> Dedicated Assistance Desk
              </div>
              <h1 className="text-[34px] sm:text-[48px] font-extrabold text-night leading-[1.1]">
                Professional Insurance <DrawUnderline color="var(--brand)"><span className="text-brand">Claim Assistance</span></DrawUnderline>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-ink/75 leading-relaxed">
                When an accident, vehicle damage, or loss occurs, our claims support team guides you through evidence documentation, surveyor coordination, and procedural formalities.
              </p>
            </Reveal>
          </div>

          {/* Important Regulatory Disclosure */}
          <Reveal variant="up" delay={100}>
            <div className="mt-8 bg-white border border-ink/10 rounded-2xl p-5 shadow-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-[13px] text-ink/80 leading-relaxed">
                <strong className="text-night font-bold">Important Assistance Clarification:</strong>
                <p className="mt-1">
                  Insure Audit Expert provides advisory support, documentation assistance, and telematics evidence preparation. Insure Audit Expert is <strong>NOT</strong> an insurance underwriter and does not hold authority to approve or settle claims. All insurance claims are assessed, approved, and disbursed solely by the respective licensed insurance company under their policy terms and IRDAI regulations.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Assistance Workflow</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-night mt-1">
                How Our Claims Assistance Team Helps
              </h2>
              <p className="mt-2 text-sm text-ink/65">
                Structured assistance from immediate accident protocol to final surveyor documentation.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={i} variant="scale" delay={i * 80}>
                <Tilt max={6}>
                  <Spotlight className="h-full rounded-3xl">
                    <div className="lift bg-cloud/40 rounded-3xl border border-ink/8 p-6 flex flex-col justify-between h-full hover:border-brand/30 transition">
                      <div>
                        <span className="text-xs font-mono font-extrabold text-brand bg-brand-soft px-3 py-1 rounded-full">
                          Step {s.step}
                        </span>
                        <h3 className="text-base font-bold text-night mt-4 leading-snug">{s.title}</h3>
                        <p className="mt-2 text-xs text-ink/70 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </Spotlight>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Word vs Evidence Claim Split Slider */}
      <section className="py-16 bg-cloud/50 border-t border-ink/8">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="mb-6 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                Interactive Comparison · Awwwards Split-Screen
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-night mt-1">
                Why Dashcam Video Evidence Changes Claim Outcomes
              </h3>
              <p className="text-xs sm:text-sm text-ink/70 mt-1 max-w-xl">
                Drag the interactive slider to see how timestamped Full-HD footage with speed telemetry overrides verbal third-party disputes and saves you from arbitrary surveyor deductions.
              </p>
            </div>
            <ClaimEvidenceSlider />
          </Reveal>
        </div>
      </section>

      {/* Interactive Policy Blindspot Quiz */}
      <section className="py-16 bg-white border-t border-ink/8">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <PolicyBlindspotQuiz />
          </Reveal>
        </div>
      </section>

      {/* Assistance Request Form & Direct Hotline */}
      <section className="py-16 bg-cloud/40 border-t border-ink/8">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          {/* Form */}
          <Reveal variant="left">
            <div className="bg-white rounded-3xl border border-ink/10 p-7 shadow-xl">
              {submitted ? (
                <div className="text-center py-8 animate-reveal">
                  <div className="w-16 h-16 rounded-2xl bg-brand-soft text-brand grid place-items-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-night">Assistance Request Logged</h3>
                  <p className="mt-2 text-sm text-ink/70 leading-relaxed max-w-sm mx-auto">
                    Our claim assistance specialist has received your incident details for vehicle <strong className="text-night">{regNo || "your vehicle"}</strong>. We will contact you at <strong className="text-night">+91 {phone}</strong> immediately.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Magnetic strength={0.3}>
                      <a
                        href={`https://wa.me/918700515288?text=${encodeURIComponent(
                          `URGENT CLAIM ASSISTANCE: Vehicle ${regNo || "N/A"}, Phone ${phone}, Insurer: ${insurer}. Please advise on next steps.`,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-brand text-white font-bold text-xs px-5 py-3 rounded-xl hover:bg-brand-deep transition shadow-md"
                      >
                        <MessageCircle className="w-4 h-4" /> Priority WhatsApp Desk
                      </a>
                    </Magnetic>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="bg-cloud hover:bg-cloud/80 text-night font-bold text-xs px-5 py-3 rounded-xl transition cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="border-b border-ink/8 pb-4 mb-5">
                    <h3 className="text-lg font-bold text-night">Request Claim Guidance</h3>
                    <p className="text-xs text-ink/60">Fill details for immediate review and checklist preparation</p>
                  </div>

                  {submitError && (
                    <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                      <div>{submitError}</div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                        Incident Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={claimType}
                        onChange={(e) => setClaimType(e.target.value)}
                        className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm font-semibold outline-none border border-ink/10 focus:border-brand transition text-night"
                      >
                        <option value="Private Car Accident Claim">Private Car Accident / Collision</option>
                        <option value="Commercial Truck / GCV Claim">Commercial Vehicle / Truck Accident</option>
                        <option value="Two-Wheeler Accident Claim">Two-Wheeler / Bike Damage</option>
                        <option value="Vehicle Theft / Stolen Claim">Vehicle Theft / Stolen FIR Claim</option>
                        <option value="Third-Party Liability Claim">Third-Party Property / Injury Notice</option>
                        <option value="Health Hospitalization Claim">Health Hospitalization Reimbursement</option>
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                          Your Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Anand Kumar"
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm outline-none border border-ink/10 focus:border-brand transition placeholder:text-ink/40"
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
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm font-bold tracking-wider outline-none border border-ink/10 focus:border-brand transition placeholder:text-ink/40 placeholder:font-normal placeholder:tracking-normal"
                        />
                        {phoneError && <p className="text-[10.5px] text-rose-500 font-semibold mt-1">{phoneError}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                          Vehicle Registration Number
                        </label>
                        <input
                          type="text"
                          value={regNo}
                          onChange={(e) => setRegNo(e.target.value.toUpperCase())}
                          placeholder="e.g. DL 3C AA 1234"
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm font-mono tracking-wider outline-none border border-ink/10 focus:border-brand transition uppercase placeholder:normal-case placeholder:font-sans placeholder:tracking-normal"
                        />
                      </div>
                      <div>
                        <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                          Insurance Company Name
                        </label>
                        <input
                          type="text"
                          value={insurer}
                          onChange={(e) => setInsurer(e.target.value)}
                          placeholder="e.g. ICICI Lombard, HDFC Ergo, Tata AIG"
                          className="w-full h-10 px-3 bg-cloud rounded-xl text-xs sm:text-sm outline-none border border-ink/10 focus:border-brand transition placeholder:text-ink/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                        Brief Incident Description <span className="text-ink/40 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Location of accident, dashcam footage available, or current garage status..."
                        className="w-full p-3 bg-cloud rounded-xl text-xs sm:text-sm outline-none border border-ink/10 focus:border-brand transition placeholder:text-ink/40 resize-none"
                      />
                    </div>

                    <Magnetic strength={0.2} className="w-full">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="sheen w-full mt-2 inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-60"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...
                          </>
                        ) : (
                          <>
                            Connect with Claim Assistance Specialist <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </form>
                </>
              )}
            </div>
          </Reveal>

          {/* Contact Cards */}
          <Reveal variant="right" delay={120}>
            <div className="space-y-4">
              <Tilt max={5}>
                <div className="bg-night text-white rounded-3xl p-6 border border-white/10 shadow-lg">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-yellow block">
                    24x7 Emergency Assistance
                  </span>
                  <h4 className="text-xl font-bold mt-2">Accident on Road? Contact Now</h4>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed">
                    If an accident just occurred, avoid arguments, capture wide angle photos of the vehicles and road conditions, and contact our helpline.
                  </p>
                  <div className="mt-5 space-y-2.5">
                    <Magnetic strength={0.2} className="w-full">
                      <a
                        href="tel:08065604804"
                        className="flex items-center gap-3 bg-white/10 hover:bg-white/15 p-3 rounded-xl transition text-sm font-bold text-white w-full"
                      >
                        <Phone className="w-4 h-4 text-brand" /> 08065604804 / 08065604805
                      </a>
                    </Magnetic>
                    <Magnetic strength={0.2} className="w-full">
                      <a
                        href="https://wa.me/918700515288"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 p-3 rounded-xl transition text-sm font-bold text-white w-full shadow-xs"
                      >
                        <MessageCircle className="w-4 h-4" /> WhatsApp Helpline (Instant Response)
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </Tilt>

              <div className="bg-white rounded-3xl p-6 border border-ink/10 shadow-xs">
                <h4 className="text-base font-bold text-night">What to Keep Ready:</h4>
                <ul className="mt-3 space-y-2 text-xs text-ink/75">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span>Copy of Insurance Policy and Certificate of Insurance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span>Driver's License (DL) of the person driving during incident</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span>Vehicle Registration Certificate (RC)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span>Dashcam Memory Card or exported video clips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span>Fitness Certificate &amp; Route Permit (for commercial vehicles)</span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
