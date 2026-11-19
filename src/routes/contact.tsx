import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock, FileSearch, Lock, Mail, MapPin, MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { saveLead } from "@/lib/policybazaar";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

const COVER_LABEL: Record<string, string> = {
  car: "Car Insurance",
  bike: "Bike / Two-Wheeler",
  cv: "Commercial Vehicle (GCV - Goods Carrier)",
  gcv: "Commercial Vehicle (GCV - Goods Carrier)",
  pcv: "School Bus / Passenger Carrier (PCV)",
  bus: "School Bus / Passenger Carrier (PCV)",
  fleet: "Fleet / Corporate Insurance",
  health: "Health Insurance",
};

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { cover?: string; reg?: string; phone?: string } => ({
    ...(typeof search.cover === "string" ? { cover: search.cover } : {}),
    ...(typeof search.reg === "string" ? { reg: search.reg } : {}),
    ...(typeof search.phone === "string" ? { phone: search.phone } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Get an Insurance Quote | Car, Fleet & Health Insurance — Insure Audit Expert" },
      { name: "description", content: "Request a car, commercial vehicle, fleet, school bus or health insurance quote at standard IRDAI-approved rates, with a free policy audit first. New Delhi HQ (Safdarjung Enclave), pan-India service, reply within 24 hours." },
      { name: "keywords", content: "insurance quote India, car insurance quote, commercial vehicle insurance quote, fleet insurance quote Delhi, health insurance quote, free policy audit" },
      { property: "og:title", content: "Get an Insurance Quote | Insure Audit Expert" },
      { property: "og:description", content: "Free policy audit, then a best-fit quote at standard insurance rates. Delhi HQ · pan-India." },

      { property: "og:url", content: `${SITE_URL}/contact` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Insure Audit Expert",
        url: `${SITE_URL}/contact`,
      }),
    }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { cover, reg, phone } = Route.useSearch();
  const selected = (cover && COVER_LABEL[cover]) || "Car Insurance";
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: phone ?? "",
    coverNeeded: selected,
    regNo: reg ?? "",
    renewalDue: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    if (cover || reg || phone) {
      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [cover, reg, phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");
    setSubmitError(null);

    const cleanPhone = formData.phone.replace(/\D/g, "").slice(0, 10);
    if (!cleanPhone || cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      return;
    }

    setSubmitting(true);
    try {
      const res = await saveLead({
        category: (cover as any) || "car",
        categoryLabel: formData.coverNeeded,
        phone: cleanPhone,
        name: formData.name || undefined,
        regNo: formData.regNo || undefined,
        action: "assisted_form",
        leadType: "Request Quote",
        notes: `Email: ${formData.email || "N/A"} | Due: ${formData.renewalDue || "N/A"} | Notes: ${formData.notes || "N/A"}`,
        sourcePage: "/contact",
      });

      if (!res.success) {
        setSubmitError(res.error || "Failed to submit request. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError("Network connection error. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <PageShell>
      <section className="bg-gradient-to-br from-brand-deep via-brand to-brand-deep text-white py-20 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent-yellow/20 blur-3xl"/>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"/>
        <div className="relative max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h1 className="text-[44px] sm:text-[56px] leading-[1.05] font-extrabold">
              Apna insurance quote lein — <span className="italic text-accent-yellow">audit ke saath</span>.
            </h1>
            <p className="mt-5 text-white/85 max-w-md text-[16.5px]">
              Car, commercial vehicle, fleet, school bus ya health — hum pehle aapki current policy ka free audit karte hain, phir standard rates par best-fit quote bhejte hain. Reply within 24 hours.
            </p>


            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              <a href="tel:7042733002" className="bg-white/10 border border-white/15 rounded-2xl p-5 hover:bg-white/15 transition">
                <Phone className="w-5 h-5 text-accent-yellow"/>
                <div className="mt-3 text-[12px] font-bold uppercase tracking-wider text-white/60">Primary Business Phone</div>
                <div className="font-bold text-white text-sm">7042733002 / 7042733005</div>
                <div className="text-[11px] text-white/60 mt-0.5">Helpline: 08065604804 / 08065604805</div>
              </a>
              <a href="mailto:info@insureauditexpert.com" className="bg-white/10 border border-white/15 rounded-2xl p-5 hover:bg-white/15 transition">
                <Mail className="w-5 h-5 text-accent-yellow"/>
                <div className="mt-3 text-[12px] font-bold uppercase tracking-wider text-white/60">Email</div>
                <div className="font-bold text-white text-sm break-all">info@insureauditexpert.com</div>
              </a>
              <a href="https://wa.me/918700515288" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/15 rounded-2xl p-5 hover:bg-white/15 transition">
                <MessageCircle className="w-5 h-5 text-accent-yellow"/>
                <div className="mt-3 text-[12px] font-bold uppercase tracking-wider text-white/60">WhatsApp (24x7)</div>
                <div className="font-bold text-white text-sm">+91 87005 15288</div>
              </a>
              <div className="bg-white/10 border border-white/15 rounded-2xl p-5">
                <Clock className="w-5 h-5 text-accent-yellow"/>
                <div className="mt-3 text-[12px] font-bold uppercase tracking-wider text-white/60">Hours</div>
                <div className="font-bold text-white text-sm">Mon – Sat · 9:30 AM – 6:30 PM</div>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-2 text-sm text-white/80">
              <MapPin className="w-4 h-4 text-accent-yellow mt-0.5 shrink-0"/>
              <a href="https://www.google.com/maps/place/28%C2%B033'39.5%22N+77%C2%B011'31.7%22E/@28.5608467,77.1920417,20.64z/data=!4m4!3m3!8m2!3d28.5609581!4d77.1921258?hl=en&entry=ttu&g_ep=EgoyMDI2MDgzMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="hover:text-white transition hover:underline">
                B-5/55, Safdarjung Enclave, New Delhi - 110029 · Pan-India service across all states &amp; UTs.
              </a>
            </div>
          </div>

          <div className="bg-white text-ink rounded-3xl p-7 shadow-2xl" id="quote">
            <div className="flex items-center gap-2 border-b border-ink/8 pb-4 mb-5">
              <div className="w-9 h-9 rounded-lg bg-brand grid place-items-center"><FileSearch className="w-5 h-5 text-white"/></div>
              <span className="font-bold text-[15px]">Get Insurance Quote + Free Audit</span>
              <span className="ml-auto text-[11px] font-bold text-brand inline-flex items-center gap-1.5">
                <Lock className="w-3 h-3"/> 100% Secure
              </span>
            </div>

            {submitError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <div>{submitError}</div>
              </div>
            )}

            {submitted ? (
              <div className="py-8 text-center animate-reveal">
                <div className="w-14 h-14 rounded-2xl bg-brand-soft text-brand grid place-items-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-[20px] font-bold text-night">Request Submitted Successfully!</h3>
                <p className="mt-2 text-[14px] text-ink/70 leading-relaxed max-w-sm mx-auto">
                  Hamari insurance audit desk aapke details ke saath audit report aur partner quotes prepare kar rahi hai. Hum 24 ghante ke andar aapse sampark karenge.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <a
                    href={`https://wa.me/918700515288?text=${encodeURIComponent(
                      `Hi Insure Audit Expert, I just requested an assisted quote for ${formData.coverNeeded} (${formData.regNo || "N/A"}). My phone number is ${formData.phone}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-brand text-white font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-brand-deep transition"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp Desk Now
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-1.5 bg-cloud text-ink/70 font-semibold text-xs px-4 py-2.5 rounded-lg hover:bg-ink/10 transition"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Your Name</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-11 px-3 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition"
                    placeholder="Rahul Sharma"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Phone <span className="text-rose-500">* (Mandatory)</span></label>
                    <input
                      required
                      type="tel"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        setPhoneError("");
                      }}
                      className="w-full h-11 px-3 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition font-medium"
                      placeholder="10-digit mobile"
                    />
                    {phoneError && <p className="text-[10.5px] text-rose-500 font-semibold mt-1">{phoneError}</p>}
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Insurance Needed</label>
                    <select
                      value={formData.coverNeeded}
                      onChange={(e) => setFormData({ ...formData, coverNeeded: e.target.value })}
                      className="w-full h-11 px-3 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition"
                    >
                      <option>Car Insurance</option>
                      <option>Bike / Two-Wheeler</option>
                      <option>Commercial Vehicle (GCV - Goods Carrier)</option>
                      <option>School Bus / Passenger Carrier (PCV)</option>
                      <option>Fleet / Corporate Insurance</option>
                      <option>Health Insurance</option>
                      <option>Only Policy Audit</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Vehicle / Reg. No.</label>
                    <input
                      value={formData.regNo}
                      onChange={(e) => setFormData({ ...formData, regNo: e.target.value.toUpperCase() })}
                      className="w-full h-11 px-3 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition font-mono uppercase"
                      placeholder="DL 3C XX 1234"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Renewal Due</label>
                    <input
                      value={formData.renewalDue}
                      onChange={(e) => setFormData({ ...formData, renewalDue: e.target.value })}
                      className="w-full h-11 px-3 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition"
                      placeholder="e.g. Next month"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-11 px-3 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Anything else?</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2.5 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition"
                    placeholder="Current insurer, claims history, add-ons you want..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-lg bg-gradient-to-br from-brand to-brand-deep text-white font-bold text-sm hover:opacity-95 transition inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Get My Quote"} <ArrowRight className="w-4 h-4"/>
                </button>
                <p className="text-[11px] text-ink/50 text-center">Standard insurance rates · Policies issued via IRDAI-registered partners</p>
              </form>
            )}
          </div>

        </div>
      </section>
    </PageShell>
  );
}
