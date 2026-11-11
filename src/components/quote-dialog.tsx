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
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Lock,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { PB_LINKS, CATEGORY_INFO, saveLead, type LeadRecord } from "@/lib/policybazaar";

export function openQuoteModal(options?: {
  category?: LeadRecord["category"];
  reg?: string;
}) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("iae:open-quote-modal", { detail: options }));
  }
}

export function QuoteDialog() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<LeadRecord["category"]>("car");
  const [regNo, setRegNo] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submittedLink, setSubmittedLink] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleOpen(e: Event) {
      const detail = (e as CustomEvent<{ category?: LeadRecord["category"]; reg?: string }>).detail;
      if (detail?.category) setCategory(detail.category);
      if (detail?.reg) setRegNo(detail.reg.toUpperCase());
      setPhoneError("");
      setSubmittedLink(null);
      setOpen(true);
    }

    window.addEventListener("iae:open-quote-modal", handleOpen);
    return () => window.removeEventListener("iae:open-quote-modal", handleOpen);
  }, []);

  const info = CATEGORY_INFO[category];

  const handlePhoneChange = (val: string) => {
    // Only keep numeric digits, max 10
    const cleaned = val.replace(/\D/g, "").slice(0, 10);
    setPhone(cleaned);
    if (cleaned.length === 10) {
      if (!/^[6-9]/.test(cleaned)) {
        setPhoneError("Please enter a valid 10-digit Indian mobile number");
      } else {
        setPhoneError("");
      }
    } else if (cleaned.length > 0 && cleaned.length < 10) {
      setPhoneError("Enter full 10-digit mobile number");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || phone.length !== 10 || !/^[6-9]/.test(phone)) {
      setPhoneError("Valid 10-digit mobile number is required to view quotes");
      return;
    }

    const pbUrl = PB_LINKS[category as keyof typeof PB_LINKS];

    if (info.isInstantPb && pbUrl) {
      // Record lead
      saveLead({
        category,
        categoryLabel: info.label,
        phone,
        regNo: regNo.trim() || undefined,
        action: "redirect_pb",
      });

      // Open Policybazaar in new tab
      window.open(pbUrl, "_blank", "noopener,noreferrer");
      setSubmittedLink(pbUrl);
    } else {
      // For PCV, Fleet, Health -> Route to internal consultation form
      saveLead({
        category,
        categoryLabel: info.label,
        phone,
        regNo: regNo.trim() || undefined,
        action: "assisted_form",
      });

      setOpen(false);
      navigate({
        to: "/contact",
        search: {
          cover: category === "pcv" ? "bus" : category,
          reg: regNo.trim() || undefined,
          phone,
        },
        hash: "quote",
      });
    }
  };

  const handleResetForAnother = () => {
    setSubmittedLink(null);
    setPhone("");
    setRegNo("");
    setPhoneError("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden bg-white border-ink/10 rounded-3xl">
        {submittedLink ? (
          /* Success Screen for PB Redirect */
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-soft text-brand grid place-items-center mx-auto mb-4 animate-reveal">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <DialogTitle className="text-[24px] font-extrabold text-night">
              Policybazaar Portal Opened!
            </DialogTitle>
            <DialogDescription className="mt-2 text-[14.5px] text-ink/70 leading-relaxed max-w-md mx-auto">
              We have opened the official Policybazaar partner portal in a new tab for your{" "}
              <strong className="text-night">{info.label}</strong>.
            </DialogDescription>

            <div className="mt-6 bg-cloud/70 border border-ink/8 rounded-2xl p-4 text-left space-y-2 text-[13px]">
              <div className="flex items-center justify-between text-ink/65">
                <span>Mobile Number Captured:</span>
                <span className="font-bold text-night">+91 {phone}</span>
              </div>
              {regNo && (
                <div className="flex items-center justify-between text-ink/65">
                  <span>Vehicle Number:</span>
                  <span className="font-bold text-night font-mono">{regNo}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-ink/65">
                <span>Partner Desk:</span>
                <span className="font-bold text-brand flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Insure Audit Support Active
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-accent-yellow/15 border border-accent-yellow/40 text-left">
              <p className="text-[13px] font-semibold text-night leading-relaxed">
                💡 <strong>Stuck on variants or choosing IDV?</strong>
                <br />
                Our team is on standby to help you apply special discount points and review any policy clause before you pay.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/918700515288?text=${encodeURIComponent(
                    `Hi Insure Audit Expert, I need help with ${info.label} for vehicle ${regNo || "N/A"} (Mobile: ${phone}).`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-brand text-white font-bold text-[12.5px] px-3.5 py-2 rounded-lg hover:bg-brand-deep transition"
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
                Check Another Vehicle
              </button>
            </div>
          </div>
        ) : (
          /* Lead Capture Form */
          <div className="p-6 sm:p-7">
            <DialogHeader className="text-left mb-5">
              <div className="inline-flex items-center gap-2 bg-brand-soft text-brand text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-2">
                <Sparkles className="w-3.5 h-3.5" /> {info.badge}
              </div>
              <DialogTitle className="text-[22px] sm:text-[24px] font-extrabold text-night leading-tight">
                Get Your Audited Insurance Quote
              </DialogTitle>
              <DialogDescription className="text-[13.5px] text-ink/65 mt-1">
                Select your vehicle type, enter your mobile number and registration to proceed.
              </DialogDescription>
            </DialogHeader>

            {/* Category selection grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-1 bg-cloud rounded-2xl mb-5">
              {[
                { id: "car", label: "Car", icon: Car },
                { id: "bike", label: "Bike", icon: Bike },
                { id: "gcv", label: "GCV", icon: Truck, hint: "Goods" },
                { id: "pcv", label: "PCV", icon: Bus, hint: "Passenger" },
                { id: "fleet", label: "Fleet", icon: ShieldCheck },
                { id: "health", label: "Health", icon: HeartPulse },
              ].map((c) => {
                const isSelected = category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id as LeadRecord["category"])}
                    className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all ${
                      isSelected
                        ? "bg-white text-night font-bold shadow-xs border border-ink/8"
                        : "text-ink/65 hover:text-night hover:bg-white/50 font-medium"
                    }`}
                  >
                    <c.icon className={`w-4 h-4 mb-1 ${isSelected ? "text-brand" : "text-ink/50"}`} />
                    <span className="text-[11.5px] leading-none">{c.label}</span>
                    {c.hint && (
                      <span className="text-[9px] uppercase tracking-wider text-ink/40 mt-0.5">
                        {c.hint}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Category Note / Disclaimer */}
            <div className="bg-brand-soft/40 border border-brand/15 rounded-xl p-3 mb-5 flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-md bg-brand text-white grid place-items-center shrink-0 mt-0.5 text-[10px] font-bold">
                ✓
              </div>
              <p className="text-[12.5px] text-ink/80 leading-relaxed">
                <strong>{info.label}:</strong> {info.description}
                {!info.isInstantPb && (
                  <span className="block text-[11.5px] text-brand font-semibold mt-0.5">
                    *Direct links for passenger carrier are being activated soon; our desk prepares your statutory proposal directly.
                  </span>
                )}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Vehicle Number */}
              <div>
                <label className="block text-[12px] font-bold uppercase tracking-wider text-ink/70 mb-1.5">
                  Vehicle Registration Number <span className="text-ink/40 font-normal">(Optional if new)</span>
                </label>
                <input
                  type="text"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value.toUpperCase())}
                  placeholder="e.g. DL 3C AB 1234 or MH 02 CD 5678"
                  className="w-full h-11 px-3.5 bg-cloud rounded-xl text-sm font-mono tracking-wider outline-none border border-ink/10 focus:border-brand focus:ring-1 focus:ring-brand transition uppercase placeholder:normal-case placeholder:font-sans placeholder:tracking-normal"
                />
              </div>

              {/* Mobile Number - Mandatory */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-ink/70">
                    Mobile Number <span className="text-rose-500">* (Mandatory)</span>
                  </label>
                  <span className="text-[11px] font-medium text-brand flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Spam-Free &amp; Confidential
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
                    className="w-full h-11 px-3 bg-transparent text-sm font-bold text-night tracking-wider outline-none placeholder:text-ink/40 placeholder:font-normal placeholder:tracking-normal"
                  />
                </div>
                {phoneError && (
                  <p className="mt-1 text-[11.5px] font-semibold text-rose-500">{phoneError}</p>
                )}
                <p className="mt-1.5 text-[11px] text-ink/55 leading-normal">
                  Required to save your lead, assist you with discount points, and recover your quote if the session drops.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold text-[14.5px] py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-[0.99] cursor-pointer"
              >
                {info.isInstantPb ? (
                  <>
                    Continue to Policybazaar Quotes <ExternalLink className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Request Audited Quote <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <span className="text-[11px] text-ink/50 inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand" /> IRDAI-Registered Distribution Partner PBPartners
                </span>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

