import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock, FileSearch, Lock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageShell } from "@/components/site-shell";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

const COVER_LABEL: Record<string, string> = {
  car: "Car Insurance",
  cv: "Commercial Vehicle",
  fleet: "Fleet / Taxi",
  bus: "School Bus / Passenger Carrier",
  health: "Health Insurance",
};

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { cover?: string; reg?: string } => ({
    ...(typeof search.cover === "string" ? { cover: search.cover } : {}),
    ...(typeof search.reg === "string" ? { reg: search.reg } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Get an Insurance Quote | Car, Fleet & Health Insurance — Insure Audit Expert" },
      { name: "description", content: "Request a car, commercial vehicle, fleet, school bus or health insurance quote at standard IRDAI-approved rates, with a free policy audit first. New Delhi HQ (Connaught Place), pan-India service, reply within 24 hours." },
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
  const { cover, reg } = Route.useSearch();
  const selected = (cover && COVER_LABEL[cover]) || "Car Insurance";

  useEffect(() => {
    if (cover || reg) {
      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [cover, reg]);

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
              <a href="tel:+918700515288" className="bg-white/10 border border-white/15 rounded-2xl p-5 hover:bg-white/15 transition">
                <Phone className="w-5 h-5 text-accent-yellow"/>
                <div className="mt-3 text-[12px] font-bold uppercase tracking-wider text-white/60">Phone</div>
                <div className="font-bold text-white text-sm">+91 8700515288 / 9217955477</div>
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
              <span>B-3/91, Krishna Nagar, Safdarjung Enclave, New Delhi - 110029 · Pan-India service across all states &amp; UTs.</span>
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
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert("Thanks! Hamari team aapko 24 ghante mein quote ke saath contact karegi."); }}>
              <div>
                <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Your Name</label>
                <input required className="w-full h-11 px-3 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition" placeholder="Rahul Sharma"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Phone</label>
                  <input required className="w-full h-11 px-3 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition" placeholder="+91 98xxx xxxxx"/>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Insurance Needed</label>
                  <select key={selected} defaultValue={selected} className="w-full h-11 px-3 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition">
                    <option>Car Insurance</option>
                    <option>Commercial Vehicle</option>
                    <option>School Bus / Passenger Carrier</option>
                    <option>Fleet / Taxi</option>
                    <option>Health Insurance</option>
                    <option>Only Policy Audit</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Vehicle / Reg. No.</label>
                  <input key={reg ?? "reg"} defaultValue={reg ?? ""} className="w-full h-11 px-3 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition" placeholder="DL 3C XX 1234"/>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Renewal Due</label>
                  <input className="w-full h-11 px-3 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition" placeholder="e.g. Next month"/>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Email</label>
                <input type="email" className="w-full h-11 px-3 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition" placeholder="you@company.com"/>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-ink/65 mb-1.5">Anything else?</label>
                <textarea rows={2} className="w-full px-3 py-2.5 bg-cloud rounded-lg text-sm outline-none focus:ring-2 ring-brand transition" placeholder="Current insurer, claims history, add-ons you want..."/>
              </div>
              <button type="submit" className="w-full h-12 rounded-lg bg-gradient-to-br from-brand to-brand-deep text-white font-bold text-sm hover:opacity-95 transition inline-flex items-center justify-center gap-2">
                Get My Quote <ArrowRight className="w-4 h-4"/>
              </button>
              <p className="text-[11px] text-ink/50 text-center">Standard insurance rates · Policies issued via IRDAI-registered partners</p>
            </form>
          </div>

        </div>
      </section>
    </PageShell>
  );
}
