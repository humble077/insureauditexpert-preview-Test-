import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Car,
  Bike,
  Truck,
  Bus,
  ShieldCheck,
  HeartPulse,
  Building2,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Lock,
  MessageCircle,
  Phone,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { PB_LINKS, CATEGORY_INFO, saveLead, type LeadRecord } from "@/lib/policybazaar";

export function openQuoteModal(options?: {
  category?: string;
  reg?: string;
  name?: string;
  phone?: string;
}) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("iae:open-quote-modal", { detail: options }));
  }
}

export function QuoteDialog() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string>("car");
  const [regNo, setRegNo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedLink, setSubmittedLink] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleOpen(e: Event) {
      const detail = (e as CustomEvent<{ category?: string; reg?: string; name?: string; phone?: string }>).detail;
      if (detail?.category) setCategory(detail.category);
      if (detail?.reg) setRegNo(detail.reg.toUpperCase());
      if (detail?.name) setName(detail.name);
      if (detail?.phone) setPhone(detail.phone);
      setPhoneError("");
      setSubmitError(null);
      setSubmittedLink(null);
      setSubmitting(false);
      setOpen(true);
    }

    window.addEventListener("iae:open-quote-modal", handleOpen);
    return () => window.removeEventListener("iae:open-quote-modal", handleOpen);
  }, []);

  const info = CATEGORY_INFO[category] || CATEGORY_INFO.car;
  const isVehicleCategory = !["health", "msme"].includes(category);

  // Map category to PB link key
  const getPbUrl = (cat: string): string | null => {
    if (cat === "car") return PB_LINKS.car;
    if (cat === "bike") return PB_LINKS.bike;
    if (cat === "gcv" || cat === "truck" || cat === "tempo") return PB_LINKS.gcv;
    return null;
  };

  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 10);
    setPhone(cleaned);
    if (cleaned.length === 10) {
      if (!/^[6-9]/.test(cleaned)) {
        setPhoneError("Please enter a valid 10-digit Indian mobile number (starts with 6-9)");
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

    // Validate phone: mandatory 10 digits starting with 6-9
    if (!phone || phone.length !== 10 || !/^[6-9]/.test(phone)) {
      setPhoneError("Valid 10-digit mobile number is required to proceed");
      return;
    }

    const pbUrl = getPbUrl(category);
    const isInstant = Boolean(pbUrl);

    setSubmitting(true);

    try {
      // Step 1: Save lead to backend database FIRST
      const result = await saveLead({
        category,
        categoryLabel: info.label,
        phone,
        name: name.trim() || undefined,
        regNo: isVehicleCategory && regNo.trim() ? regNo.trim() : undefined,
        action: isInstant ? "redirect_pb" : "assisted_form",
        leadType: isInstant ? "PB Referral" : "Request Quote",
        referralUrl: pbUrl || undefined,
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "/",
      });

      // Step 2: Verify that persistence succeeded before any redirect
      if (!result.success) {
        setSubmitError(
          result.error || "Failed to save your lead securely to the database. Please try again.",
        );
        setSubmitting(false);
        return;
      }

      setSubmitting(false);

      if (isInstant && pbUrl) {
        // Step 3: ONLY after successful persistence, redirect to exact PB referral URL
        window.open(pbUrl, "_blank", "noopener,noreferrer");
        setSubmittedLink(pbUrl);
      } else {
        // For Assisted Categories (Auto & Taxi, School Bus, Health, MSME, Fleet):
        // Route to the internal Request Quote form with prefilled information
        setOpen(false);
        navigate({
          to: "/contact",
          search: {
            cover: category,
            reg: isVehicleCategory && regNo.trim() ? regNo.trim() : undefined,
            phone,
          },
          hash: "quote",
        });
      }
    } catch (err: any) {
      console.error("Quote submission error:", err);
      setSubmitError(
        "A network error occurred while saving your enquiry. Your lead was not saved. Please try again.",
      );
      setSubmitting(false);
    }
  };

  const handleResetForAnother = () => {
    setSubmittedLink(null);
    setPhone("");
    setRegNo("");
    setName("");
    setPhoneError("");
    setSubmitError(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden bg-white border-ink/10 rounded-3xl shadow-2xl">
        {submittedLink ? (
          /* Success Screen for PB Redirect */
          <div className="p-8 text-center animate-reveal">
            <div className="w-16 h-16 rounded-2xl bg-brand-soft text-brand grid place-items-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <DialogTitle className="text-[24px] font-extrabold text-night">
              Policybazaar Portal Opened!
            </DialogTitle>
            <DialogDescription className="mt-2 text-[14.5px] text-ink/70 leading-relaxed max-w-md mx-auto">
              Your inquiry has been securely recorded. We have opened the official Policybazaar partner portal in a new tab for your{" "}
              <strong className="text-night">{info.label}</strong>.
            </DialogDescription>

            <div className="mt-6 bg-cloud/70 border border-ink/8 rounded-2xl p-4 text-left space-y-2 text-[13px]">
              <div className="flex items-center justify-between text-ink/65">
                <span>Database Status:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Lead Saved &amp; Verified
                </span>
              </div>
              <div className="flex items-center justify-between text-ink/65">
                <span>Mobile Number:</span>
                <span className="font-bold text-night">+91 {phone}</span>
              </div>
              {isVehicleCategory && regNo && (
                <div className="flex items-center justify-between text-ink/65">
                  <span>Vehicle Registration:</span>
                  <span className="font-bold text-night font-mono">{regNo}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-ink/65">
                <span>Assistance Partner:</span>
                <span className="font-bold text-brand flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Insure Audit Support Desk
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-accent-yellow/15 border border-accent-yellow/40 text-left">
              <p className="text-[13px] font-semibold text-night leading-relaxed">
                💡 <strong>Need help choosing the right IDV or policy add-on?</strong>
                <br />
                Our team is on standby to help you verify clause exclusions, NCB protection, and apply special discount points before you make any payment.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/918700515288?text=${encodeURIComponent(
                    `Hi Insure Audit Expert, I just opened quotes for ${info.label} (Vehicle: ${regNo || "N/A"}, Phone: ${phone}). Please assist with audit and discounts.`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-brand text-white font-bold text-[12.5px] px-3.5 py-2 rounded-lg hover:bg-brand-deep transition shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support
                </a>
                <a
                  href="tel:08065604804"
                  className="inline-flex items-center gap-1.5 bg-white border border-ink/15 text-night font-bold text-[12.5px] px-3.5 py-2 rounded-lg hover:bg-cloud transition"
                >
                  <Phone className="w-3.5 h-3.5" /> Call 08065604804
                </a>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                href={submittedLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-brand font-bold text-[13.5px] hover:underline"
              >
                Re-open Portal Link <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-ink/20">·</span>
              <button
                type="button"
                onClick={handleResetForAnother}
                className="text-[13.5px] font-medium text-ink/60 hover:text-night transition"
              >
                Check Another Policy
              </button>
            </div>
          </div>
        ) : (
          /* Lead Capture Form */
          <div className="p-6 sm:p-7">
            <DialogHeader className="text-left mb-4">
              <div className="inline-flex items-center gap-2 bg-brand-soft text-brand text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-2">
                <Sparkles className="w-3.5 h-3.5" /> {info.badge}
              </div>
              <DialogTitle className="text-[22px] sm:text-[24px] font-extrabold text-night leading-tight">
                Get Your Audited Insurance Quote
              </DialogTitle>
              <DialogDescription className="text-[13.5px] text-ink/65 mt-1">
                Select your category and enter your mobile number. Your lead is securely persisted before comparison.
              </DialogDescription>
            </DialogHeader>

            {/* Category selection grid */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 p-1 bg-cloud rounded-2xl mb-4">
              {[
                { id: "car", label: "Car", icon: Car },
                { id: "bike", label: "Bike", icon: Bike },
                { id: "gcv", label: "GCV", icon: Truck },
                { id: "truck", label: "Truck", icon: Truck },
                { id: "auto", label: "Auto/Cab", icon: Car },
                { id: "bus", label: "Bus", icon: Bus },
                { id: "health", label: "Health", icon: HeartPulse },
                { id: "msme", label: "MSME", icon: Building2 },
              ].map((c) => {
                const isSelected = category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCategory(c.id);
                      setSubmitError(null);
                    }}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white text-night font-bold shadow-xs border border-ink/8"
                        : "text-ink/65 hover:text-night hover:bg-white/50 font-medium"
                    }`}
                  >
                    <c.icon className={`w-4 h-4 mb-1 ${isSelected ? "text-brand" : "text-ink/50"}`} />
                    <span className="text-[11px] leading-tight text-center">{c.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Category Note */}
            <div className="bg-brand-soft/40 border border-brand/15 rounded-xl p-3 mb-4 flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-md bg-brand text-white grid place-items-center shrink-0 mt-0.5 text-[10px] font-bold">
                ✓
              </div>
              <p className="text-[12.5px] text-ink/80 leading-relaxed">
                <strong>{info.label}:</strong> {info.description}
                {Boolean(getPbUrl(category)) ? (
                  <span className="block text-[11px] text-brand font-semibold mt-0.5">
                    *Instant comparison across 20+ insurers via our licensed distribution partner PBPartners.
                  </span>
                ) : (
                  <span className="block text-[11px] text-amber-700 font-semibold mt-0.5">
                    *Assisted quote flow: our dedicated desk prepares your statutory compliance and audited rates.
                  </span>
                )}
              </p>
            </div>

            {/* Error Message if Database Save Fails */}
            {submitError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <div>
                  <strong className="font-bold">Submission Notice:</strong> {submitError}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Optional Name */}
              <div>
                <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                  Your Name <span className="text-ink/40 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full h-10 px-3.5 bg-cloud rounded-xl text-sm outline-none border border-ink/10 focus:border-brand focus:ring-1 focus:ring-brand transition placeholder:text-ink/40"
                />
              </div>

              {/* Vehicle Number (Only for vehicle categories) */}
              {isVehicleCategory && (
                <div>
                  <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                    Vehicle Registration Number <span className="text-ink/40 font-normal">(Optional if new / unassigned)</span>
                  </label>
                  <input
                    type="text"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value.toUpperCase())}
                    placeholder="e.g. DL 01 AB 1234 / MH 04 XY 9876"
                    className="w-full h-10 px-3.5 bg-cloud rounded-xl text-sm font-mono tracking-wider outline-none border border-ink/10 focus:border-brand focus:ring-1 focus:ring-brand transition uppercase placeholder:normal-case placeholder:font-sans placeholder:tracking-normal"
                  />
                </div>
              )}

              {/* Mobile Number - Mandatory */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70">
                    Mobile Number <span className="text-rose-500">* (Mandatory)</span>
                  </label>
                  <span className="text-[11px] font-medium text-brand flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Confidential &amp; Spam-Free
                  </span>
                </div>
                <div className="flex items-center bg-cloud rounded-xl border border-ink/10 focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition">
                  <span className="px-3 text-sm font-bold text-ink/70 border-r border-ink/10 select-none">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    disabled={submitting}
                    className="w-full h-10 px-3 bg-transparent text-sm font-bold text-night tracking-wider outline-none placeholder:text-ink/40 placeholder:font-normal placeholder:tracking-normal"
                  />
                </div>
                {phoneError && (
                  <p className="mt-1 text-[11.5px] font-semibold text-rose-500">{phoneError}</p>
                )}
                <p className="mt-1 text-[11px] text-ink/55 leading-normal">
                  Your number is securely stored in our backend before quotation to assist with policy audit and recover your quotes.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold text-[14px] py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Verifying &amp; Saving Lead...
                  </>
                ) : Boolean(getPbUrl(category)) ? (
                  <>
                    Save &amp; Continue to Policybazaar <ExternalLink className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Save &amp; Request Audited Quote <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <span className="text-[11px] text-ink/50 inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand" /> IRDAI-Registered Distribution Partner PBPartners (Policybazaar)
                </span>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
