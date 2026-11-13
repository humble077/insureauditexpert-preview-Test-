import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Camera,
  Radio,
  Lock,
  Thermometer,
  Fuel,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Phone,
  MessageCircle,
} from "lucide-react";
import { saveLead } from "@/lib/policybazaar";

export interface DeviceEnquiryOptions {
  device?: "Dashcams" | "AIS-140 GPS Devices" | "E-Locks" | "Heat Sensors" | "Fuel Rod Sensors" | "GPS ID Cards" | string;
}

export function openDeviceEnquiryModal(options?: DeviceEnquiryOptions) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("iae:open-device-modal", { detail: options }));
  }
}

export function DeviceEnquiryDialog() {
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState<string>("Dashcams");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function handleOpen(e: Event) {
      const detail = (e as CustomEvent<DeviceEnquiryOptions>).detail;
      if (detail?.device) setDevice(detail.device);
      setPhoneError("");
      setSubmitError(null);
      setSubmitted(false);
      setSubmitting(false);
      setOpen(true);
    }

    window.addEventListener("iae:open-device-modal", handleOpen);
    return () => window.removeEventListener("iae:open-device-modal", handleOpen);
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
        category: "device",
        categoryLabel: `Device: ${device}`,
        deviceCategory: device,
        phone,
        name: name.trim() || undefined,
        regNo: vehicleType.trim() || undefined,
        action: "device_enquiry",
        leadType: "Device Enquiry",
        notes: message.trim() || undefined,
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "/devices",
      });

      if (!result.success) {
        setSubmitError(result.error || "Failed to submit enquiry. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Device enquiry error:", err);
      setSubmitError("Network connection error. Please try again.");
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setVehicleType("");
    setMessage("");
    setSubmitError(null);
  };

  const DEVICES = [
    { id: "Dashcams", label: "AI Dashcams", icon: Camera },
    { id: "AIS-140 GPS Devices", label: "AIS-140 GPS", icon: Radio, badge: "Govt Mandate" },
    { id: "E-Locks", label: "Smart E-Locks", icon: Lock },
    { id: "Heat Sensors", label: "Heat Sensors", icon: Thermometer },
    { id: "Fuel Rod Sensors", label: "Fuel Rods", icon: Fuel },
    { id: "GPS ID Cards", label: "GPS ID Cards", icon: CreditCard },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden bg-white border-ink/10 rounded-3xl shadow-2xl">
        {submitted ? (
          <div className="p-8 text-center animate-reveal">
            <div className="w-16 h-16 rounded-2xl bg-brand-soft text-brand grid place-items-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <DialogTitle className="text-[24px] font-extrabold text-night">
              Enquiry Received!
            </DialogTitle>
            <DialogDescription className="mt-2 text-[14.5px] text-ink/70 leading-relaxed max-w-md mx-auto">
              Thank you for enquiring about our <strong className="text-night">{device}</strong>. Our hardware &amp; telematics team will contact you within business hours with specifications and subscription plans.
            </DialogDescription>

            <div className="mt-6 bg-cloud/70 border border-ink/8 rounded-2xl p-4 text-left space-y-2 text-[13px]">
              <div className="flex items-center justify-between text-ink/65">
                <span>Selected Device:</span>
                <span className="font-bold text-night">{device}</span>
              </div>
              <div className="flex items-center justify-between text-ink/65">
                <span>Contact Number:</span>
                <span className="font-bold text-night">+91 {phone}</span>
              </div>
              {name && (
                <div className="flex items-center justify-between text-ink/65">
                  <span>Contact Person:</span>
                  <span className="font-bold text-night">{name}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-ink/65">
                <span>Pricing Model:</span>
                <span className="font-bold text-brand">Enquiry-Based / Custom Quote</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <a
                href={`https://wa.me/918700515288?text=${encodeURIComponent(
                  `Hi Insure Audit Expert, I just enquired for ${device} (Phone: ${phone}). Please share device specs and subscription options.`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-brand text-white font-bold text-[13px] px-4 py-2.5 rounded-xl hover:bg-brand-deep transition shadow-xs"
              >
                <MessageCircle className="w-4 h-4" /> Quick WhatsApp
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 bg-cloud hover:bg-cloud/80 text-night font-bold text-[13px] px-4 py-2.5 rounded-xl transition"
              >
                Enquire Another Device
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-7">
            <DialogHeader className="text-left mb-4">
              <div className="inline-flex items-center gap-2 bg-brand-soft text-brand text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Hardware &amp; Telematics
              </div>
              <DialogTitle className="text-[22px] sm:text-[24px] font-extrabold text-night leading-tight">
                Request Device Enquiry &amp; Specs
              </DialogTitle>
              <DialogDescription className="text-[13.5px] text-ink/65 mt-1">
                Purchase vehicle safety hardware independently. Applicable software subscription &amp; SIM connectivity charges apply where disclosed.
              </DialogDescription>
            </DialogHeader>

            {/* Device selection pills */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 bg-cloud rounded-2xl mb-4">
              {DEVICES.map((d) => {
                const isSelected = device === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDevice(d.id)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white text-night font-bold shadow-xs border border-ink/8"
                        : "text-ink/65 hover:text-night hover:bg-white/50 font-medium"
                    }`}
                  >
                    <d.icon className={`w-4 h-4 mb-1 ${isSelected ? "text-brand" : "text-ink/50"}`} />
                    <span className="text-[10.5px] leading-tight text-center">{d.label}</span>
                  </button>
                );
              })}
            </div>

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
                    placeholder="e.g. Vikram Seth"
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

              <div>
                <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                  Vehicle / Business Type <span className="text-ink/40 font-normal">(e.g. Commercial Truck, School Bus, Taxi, Cold Chain)</span>
                </label>
                <input
                  type="text"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  placeholder="e.g. 10 Goods Carrier Trucks, Cold Storage Tanker"
                  className="w-full h-10 px-3.5 bg-cloud rounded-xl text-sm outline-none border border-ink/10 focus:border-brand transition placeholder:text-ink/40"
                />
              </div>

              <div>
                <label className="block text-[11.5px] font-bold uppercase tracking-wider text-ink/70 mb-1">
                  Enquiry Details &amp; Quantity <span className="text-ink/40 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about required units, installation requirements or queries..."
                  className="w-full p-3 bg-cloud rounded-xl text-sm outline-none border border-ink/10 focus:border-brand transition placeholder:text-ink/40 resize-none"
                />
              </div>

              <div className="bg-cloud/60 rounded-xl p-2.5 text-[11px] text-ink/65 leading-relaxed">
                ℹ️ <strong>Transparent Pricing:</strong> Hardware pricing is enquiry-based according to volume. Software platform subscriptions and SIM connectivity charges apply for active live tracking.
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold text-[14px] py-3.5 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting Enquiry...
                  </>
                ) : (
                  <>Submit Device Enquiry</>
                )}
              </button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

