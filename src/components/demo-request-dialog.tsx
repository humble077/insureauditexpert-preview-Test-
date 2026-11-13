import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  LayoutDashboard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { saveLead } from "@/lib/policybazaar";

export function openDemoRequestModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("iae:open-demo-modal"));
  }
}

export function DemoRequestDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function handleOpen() {
      setPhoneError("");
      setSubmitError(null);
      setSubmitted(false);
      setSubmitting(false);
      setOpen(true);
    }

    window.addEventListener("iae:open-demo-modal", handleOpen);
    return () => window.removeEventListener("iae:open-demo-modal", handleOpen);
  }, []);

  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 10);
    setPhone(cleaned);
    if (cleaned.length === 10) {
      if (!/^[6-9]/.test(cleaned)) {
        setPhoneError("Enter a valid 10-digit Indian mobile number (starts with 6-9)");
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
        category: "demo",
        categoryLabel: "Fleet Tracking Software Demo",
        phone,
        name: name.trim() || undefined,
        companyName: companyName.trim() || undefined,
        fleetSize: fleetSize.trim() || undefined,
        action: "tracking_demo",
        leadType: "Demo Request",
        notes: message.trim() || undefined,
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "/tracking-solutions",
      });

      if (!result.success) {
        setSubmitError(result.error || "Failed to submit demo request. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Demo request error:", err);
      setSubmitError("Network connection error. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden bg-white border-ink/10 rounded-3xl shadow-2xl">
        {submitted ? (
          <div className="p-8 text-center animate-reveal">
            <div className="w-16 h-16 rounded-2xl bg-brand-soft text-brand grid place-items-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <DialogTitle className="text-[24px] font-extrabold text-night">
              Demo Request Scheduled!
            </DialogTitle>
            <DialogDescription className="mt-2 text-[14.5px] text-ink/70 leading-relaxed max-w-md mx-auto">
              Thank you, <strong className="text-night">{name || "Fleet Manager"}</strong>. Our enterprise solutions team will set up a live guided tour of the Fleet Command Center for your organization.
            </DialogDescription>

            <div className="mt-6 bg-cloud/70 border border-ink/8 rounded-2xl p-4 text-left space-y-2 text-[13px]">
              <div className="flex items-center justify-between text-ink/65">
                <span>Enterprise:</span>
                <span className="font-bold text-night">{companyName || "Organization"}</span>
              </div>
              <div className="flex items-center justify-between text-ink/65">
                <span>Fleet Sizing:</span>
                <span className="font-bold text-night">{fleetSize || "Not specified"}</span>
              </div>
              <div className="flex items-center justify-between text-ink/65">
                <span>Contact Number:</span>
                <span className="font-bold text-night">+91 {phone}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://insureauditexpert.tech/command-center"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-brand text-white font-bold text-[13.5px] px-4 py-2.5 rounded-xl hover:bg-brand-deep transition shadow-xs"
              >
                Access Command Center Portal <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/918700515288?text=${encodeURIComponent(
                  `Hi Insure Audit Expert, I just requested a demo for Fleet Command Center for ${companyName || "my company"} (${fleetSize || "fleet"}, Phone: ${phone}).`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-cloud hover:bg-cloud/80 text-night font-bold text-[13.5px] px-4 py-2.5 rounded-xl transition"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Desk
              </a>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-7">
            <DialogHeader className="text-left mb-4">
              <div className="inline-flex items-center gap-2 bg-brand-soft text-brand text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Fleet Intelligence
              </div>
              <DialogTitle className="text-[22px] sm:text-[24px] font-extrabold text-night leading-tight">
                Request a Live Command Center Demo
              </DialogTitle>
              <DialogDescription className="text-[13.5px] text-ink/65 mt-1">
                Experience real-time telematics, route replays, geofence triggers, and temperature/fuel alerts tailored to your commercial vehicles.
              </DialogDescription>
            </DialogHeader>

            {submitError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <div>{submitError}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amit Singhal"
                    className="w-full h-10 px-3.5 bg-cloud rounded-xl text-sm outline-none border border-ink/10 focus:border-brand transition placeholder:text-ink/40"
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
                    className="w-full h-10 px-3.5 bg-cloud rounded-xl text-sm font-bold tracking-wider outline-none border border-ink/10 focus:border-brand transition placeholder:text-ink/40 placeholder:font-normal placeholder:tracking-normal"
                  />
                  {phoneError && <p className="text-[11px] text-rose-500 font-semibold mt-1">{phoneError}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Logistics Ltd."
                    className="w-full h-10 px-3.5 bg-cloud rounded-xl text-sm outline-none border border-ink/10 focus:border-brand transition placeholder:text-ink/40"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                    Fleet Size (Number of Vehicles)
                  </label>
                  <select
                    value={fleetSize}
                    onChange={(e) => setFleetSize(e.target.value)}
                    className="w-full h-10 px-3 bg-cloud rounded-xl text-sm outline-none border border-ink/10 focus:border-brand transition text-night"
                  >
                    <option value="">Select Fleet Size</option>
                    <option value="1 - 5 Vehicles">1 - 5 Vehicles</option>
                    <option value="6 - 20 Vehicles">6 - 20 Vehicles</option>
                    <option value="21 - 50 Vehicles">21 - 50 Vehicles</option>
                    <option value="50+ Vehicles">50+ Commercial Vehicles</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                  Specific Requirements / Use Case <span className="text-ink/40 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Fuel pilferage detection, cold chain temperature monitoring, AIS-140 compliance..."
                  className="w-full p-3 bg-cloud rounded-xl text-sm outline-none border border-ink/10 focus:border-brand transition placeholder:text-ink/40 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold text-[14px] py-3.5 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Scheduling Demo...
                  </>
                ) : (
                  <>
                    <LayoutDashboard className="w-4 h-4" /> Book Live Software Demo
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

