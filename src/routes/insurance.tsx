import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Bus, Camera, Car, Bike, Check, FileSearch, HeartPulse,
  MapPin, MessageCircle, ShieldCheck, Truck, Zap, ExternalLink,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { ScrollCinema } from "@/components/scroll-cinema";
import { openQuoteModal } from "@/components/quote-dialog";
import type { LeadRecord } from "@/lib/policybazaar";
import svcAudit from "@/assets/svc-audit.jpg";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/insurance")({
  head: () => ({
    meta: [
      { title: "Buy Car, Commercial Vehicle & Health Insurance | Insure Audit Expert" },
      { name: "description", content: "Compare and buy motor, commercial vehicle, school bus, fleet and health insurance at standard IRDAI-approved rates through licensed partner PBPartners — with optional independent AI dashcams, live tracking and professional policy audits." },
      { name: "keywords", content: "buy car insurance India, commercial vehicle insurance, taxi insurance, school bus insurance, fleet insurance India, health insurance plans, insurance with dashcam, standard insurance rates" },
      { property: "og:title", content: "Insurance Plans with a Built-In Safety Program | Insure Audit Expert" },
      { property: "og:description", content: "Motor, fleet, school bus and health insurance at standard rates — plus AI dashcam, live tracking and a policy audit." },
      { property: "og:url", content: `${SITE_URL}/insurance` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/insurance` }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Insurance Plans | Insure Audit Expert",
        url: `${SITE_URL}/insurance`,
        description: "Motor, commercial vehicle, school bus, fleet and health insurance arranged through IRDAI-registered partners at standard insurance rates.",
      }),
    }],
  }),
  component: InsurancePage,
});

const PLANS: {
  icon: any;
  t: string;
  category: LeadRecord["category"];
  isInstant: boolean;
  d: string;
  pts: string[];
}[] = [
  {
    icon: Car,
    t: "Private Car Insurance",
    category: "car",
    isInstant: true,
    d: "Comprehensive cover with verified IDV, zero-dep, engine protect & RSA. Instant Policybazaar quotes across 20+ insurers.",
    pts: ["IDV verified, not guessed", "Instant comparison on PBPartners", "Cashless garage network across India"],
  },
  {
    icon: Bike,
    t: "Two-Wheeler & Bike Insurance",
    category: "bike",
    isInstant: true,
    d: "Comprehensive & 3rd party motorcycle & scooter insurance issued in under 2 minutes with instant paperless inspection.",
    pts: ["Instant quote on PBPartners", "Zero inspection for timely renewal", "Personal accident cover included"],
  },
  {
    icon: Truck,
    t: "Commercial Vehicle (GCV - Goods Carrier)",
    category: "gcv",
    isInstant: true,
    d: "Goods carrier, pickup, tempo aur truck cover — GVW, permit aur route ke hisaab se instant verified rating.",
    pts: ["Instant quotes via PBPartners GCV", "Legal liability to driver", "Permit & fitness rating check"],
  },
  {
    icon: Bus,
    t: "Commercial Vehicle (PCV - School Bus & Taxi)",
    category: "pcv",
    isInstant: false,
    d: "School buses, staff buses, tourist cabs & passenger carriers — tailored statutory passenger liability & compliance audit.",
    pts: ["Statutory passenger liability sizing", "Route & permit compliance audit", "Assisted policy issuance by expert desk"],
  },
  {
    icon: ShieldCheck,
    t: "Fleet & Corporate Insurance",
    category: "fleet",
    isInstant: false,
    d: "5 se 500+ gaadiyon ka fleet cover, single renewal calendar aur dedicated 24x7 claims desk support.",
    pts: ["One renewal calendar", "Claims desk support", "Driver-scoring linked risk audit"],
  },
  {
    icon: HeartPulse,
    t: "Health Insurance Plans",
    category: "health",
    isInstant: false,
    d: "Family floater aur individual health plans — waiting period, room rent aur sub-limit clearly audited.",
    pts: ["Room-rent capping check", "Pre-existing timeline map", "Network hospital claim support"],
  },
];

const WHY_TECH = [
  { icon: Camera, t: "Video proof stops false claims", d: "Insurance ka sabse bada dispute hota hai 'kiski galti thi'. G-sensor locked dashcam footage aapki version ko sabit karti hai — claim faster settle hota hai aur galat claim aap par nahi chipakta." },
  { icon: MapPin, t: "GPS trail proves the facts", d: "Speed, route aur time ka verifiable record insurer ke surveyor ko dena matlab kam questions, kam delay. Theft case mein recovery chance bhi badhta hai." },
  { icon: FileSearch, t: "Audit kills the rejection reasons", d: "Zyada claims exclusion, galat IDV ya expired document ki wajah se reject hote hain — policy audit ye teeno gaps buy karne se pehle theek kar deta hai." },
];

function InsurancePage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-b from-brand-soft/70 to-paper py-20">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white border border-brand/20 text-brand text-[11.5px] font-bold uppercase tracking-[0.14em] px-4 py-2 rounded-full">
              <ShieldCheck className="w-4 h-4"/> Standard insurance rates · IRDAI-registered partners
            </span>
            <h1 className="mt-6 text-[40px] sm:text-[52px] leading-[1.06] font-extrabold text-night">
              Insurance jo sirf paper nahi — <span className="italic text-brand">proof</span> ke saath aata hai.
            </h1>
            <p className="mt-5 text-[17px] text-ink/70 leading-relaxed max-w-xl">
              Car, commercial vehicle, school bus, fleet aur health cover — sab standard IRDAI insurance rates par, hamare licensed partner PBPartners ke through. Saath mein optional independent telemetry add-on: AI dashcam, live tracking aur professional policy audit, taaki claim ke waqt aapke paas objective evidence ho.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold px-7 py-4 rounded-full transition shadow-[0_14px_34px_-12px_rgba(31,157,85,0.7)] hover:-translate-y-0.5 cursor-pointer"
              >
                Get My Insurance Quote <ArrowRight className="w-4 h-4"/>
              </button>
              <a href="https://wa.me/918700515288" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-ink/15 hover:border-brand hover:text-brand font-bold px-7 py-4 rounded-full transition">
                <MessageCircle className="w-4 h-4"/> WhatsApp for a quote
              </a>
            </div>
          </div>
          <img src={svcAudit} alt="Insurance policy audit and quote preparation" loading="lazy" className="rounded-3xl w-full h-[400px] object-cover shadow-2xl"/>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <h2 className="text-[34px] sm:text-[42px] font-extrabold text-night text-center">Jo cover aap khareed sakte hain</h2>
          <p className="mt-3 text-center text-ink/65 max-w-2xl mx-auto">Har quote se pehle hum aapki current policy ka audit karte hain — phir sahi cover recommend karte hain.</p>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div key={p.t} className="h-full bg-white rounded-3xl border border-ink/8 p-7 hover:shadow-xl hover:-translate-y-1.5 transition">
                <div className="w-14 h-14 rounded-2xl bg-brand-soft grid place-items-center mb-5"><p.icon className="w-7 h-7 text-brand"/></div>
                <h3 className="text-[19px] font-extrabold text-night">{p.t}</h3>
                <p className="mt-2.5 text-[14px] text-ink/65 leading-relaxed">{p.d}</p>
                <ul className="mt-5 space-y-2 text-[13px] text-ink/70">
                  {p.pts.map((x) => (
                    <li key={x} className="flex items-start gap-2"><Check className="w-4 h-4 text-brand mt-0.5 shrink-0"/>{x}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openQuoteModal({ category: p.category })}
                  className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand hover:text-brand-deep transition cursor-pointer"
                >
                  {p.isInstant ? (
                    <>
                      Get instant PB quote <ExternalLink className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      Request assisted quote <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wishlink Video & Pillar Showcase */}
      <ScrollCinema
        badge="Insurance Evidence Reel"
        beats={[
          {
            icon: Camera,
            stepNumber: "01",
            kicker: "Pillar 01 · Video Evidence",
            title: "Video proof stops false claims.",
            body: "G-sensor locked dashcam footage aapki version ko instantly sabit karti hai — surveyor claim fast pass karta hai aur false liability aap par nahi aati.",
          },
          {
            icon: MapPin,
            stepNumber: "02",
            kicker: "Pillar 02 · GPS Location Record",
            title: "GPS trail proves the facts.",
            body: "Exact speed, timestamped route aur location data surveyor aur police ke samne 100% indisputable evidence banata hai.",
          },
          {
            icon: FileSearch,
            stepNumber: "03",
            kicker: "Pillar 03 · Pre-Audit Protection",
            title: "Audit kills rejection reasons.",
            body: "Hidden policy exclusions, galat IDV aur expired add-on gaps policy buy karne se pehle hi audit karke fix kiye jaate hain.",
          },
        ]}
        ctaTo="/contact"
        ctaLabel="Get audited insurance quote"
      />

      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-[30px] sm:text-[38px] font-extrabold text-night">Quote lene ka process</h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-5 text-left">
            {[
              { n: "01", t: "Share vehicle & policy details", d: "Form ya WhatsApp par RC, current policy aur usage details bhejein." },
              { n: "02", t: "Free audit + quote comparison", d: "Hum exclusions, IDV aur add-ons audit karke partner insurers ke options bhejte hain." },
              { n: "03", t: "Policy issued + tech installed", d: "Policy licensed partner ke through standard rates par issue, dashcam & tracker 30 minute mein fit." },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-2xl border border-ink/8 p-6">
                <span className="text-[11px] font-bold tracking-widest text-brand">{s.n}</span>
                <h3 className="mt-1.5 text-[16px] font-bold text-night">{s.t}</h3>
                <p className="mt-2 text-[13.5px] text-ink/65 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[12.5px] text-ink/60 leading-relaxed">
            Insurance is the subject matter of solicitation. All motor, health, and MSME insurance policies are solicited and serviced through our licensed partner PBPartners (Policybazaar Insurance Brokers Private Limited). Insure Audit Expert operates as an authorized POSP channel partner (POS Code: IP461548). Telematics devices, AI dashcams, and fleet tracking software are independent technology products offered by Alxsure Tech Hub (OPC) Pvt Ltd under independent commercial terms in compliance with Section 41 (Prohibition of Rebates) of the Insurance Act, 1938.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
