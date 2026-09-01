import { createFileRoute, Link } from "@tanstack/react-router";
import heroIllustration from "@/assets/hero-illustration.jpg";
import svcAudit from "@/assets/svc-audit.jpg";
import svcFleet from "@/assets/svc-fleet.jpg";
import svcClaim from "@/assets/svc-claim.jpg";
import { SiteHeader, SiteFooter, BackToTop } from "@/components/site-shell";
import { MastheadHero } from "@/components/masthead-hero";
import { ScrollCinema } from "@/components/scroll-cinema";
import { Reveal, Counter, Tilt, Magnetic, useElementProgress, useScrollDirection, Parallax, ScrambleText, Ticker } from "@/lib/motion";
import { BlueprintField, DrawUnderline, CoverageMap, SignalRings, Spotlight, ProofMeter, Ornament, Kicker, GoldRule, Unveil } from "@/components/graphics";

import {
  ShieldCheck, ArrowRight, ArrowUpRight, Check, Camera, Cable, Gauge,
  FileSearch, Bell, MessageCircle, Truck, Bus, Brain, AlertTriangle,
  Video, MapPin, Send, Quote, Building2, Users, Car, HeartPulse,
} from "lucide-react";


const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buy Car, Commercial Vehicle & Health Insurance in India | Insure Audit Expert" },
      { name: "description", content: "Buy motor, commercial vehicle, fleet, school bus and health insurance at standard IRDAI-approved rates through our licensed partners — and get an AI dashcam with G-sensor, zero wiring-cut live tracking and a professional policy audit as a complimentary tech membership, so your claim is backed by proof." },
      { name: "keywords", content: "buy car insurance India, commercial vehicle insurance, fleet insurance, school bus insurance, health insurance plans India, insurance with dashcam, claim rejection protection, policy audit Delhi, zero wiring cut GPS tracking" },
      { property: "og:title", content: "Insurance Backed by Proof — Dashcam, Tracking & Policy Audit | Insure Audit Expert" },
      { property: "og:description", content: "Car, commercial vehicle, fleet and health insurance at standard rates, with AI dashcam, live tracking and a professional policy audit included." },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "InsuranceAgency",
          name: "Insure Audit Expert",
          slogan: "Smart Audit. Safe Drive. Guaranteed Protection.",
          url: SITE_URL,
          telephone: "+91-98765-43210",
          parentOrganization: { "@type": "Organization", name: "Alexfintech Risk & Solutions OPC Pvt. Ltd." },
          address: { "@type": "PostalAddress", streetAddress: "Connaught Place", addressLocality: "New Delhi", postalCode: "110001", addressCountry: "IN" },
          areaServed: { "@type": "Country", name: "India" },
          serviceType: ["Car Insurance", "Commercial Vehicle Insurance", "Fleet Insurance", "School Bus Insurance", "Health Insurance", "Vehicle Risk Audit"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Insurance Plans with Safety Tech Membership",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Private Car Insurance", description: "Comprehensive motor cover arranged through IRDAI-registered partners at standard insurance rates." } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Vehicle & Fleet Insurance", description: "Goods carrier, taxi, bus and fleet cover with correct IDV and liability sizing." } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Health Insurance", description: "Family floater and individual health plans with clear sub-limit and waiting-period guidance." } },
            ],
          },
        }),
      },
    ],
  }),

  component: Index,
});

/* ---------- Process rail (responsive & iOS-stable) ---------- */
function ProcessRail() {
  const { ref, p } = useElementProgress<HTMLDivElement>();
  const active = Math.min(PROCESS.length - 1, Math.floor(p * PROCESS.length + 0.0001));

  return (
    <div ref={ref} className="py-20">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand">Prakriya · Process</span>
            <h2 className="text-[32px] sm:text-[42px] font-extrabold text-night mt-1">Kaise kaam karta hai</h2>
          </div>
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink/50 tabular-nums">
            {String(PROCESS.length).padStart(2, "0")} Simple Steps
          </span>
        </div>

        {/* travelling progress rail */}
        <div className="mt-8 h-[3px] bg-ink/10 relative overflow-hidden rounded-full">
          <div
            className="absolute inset-y-0 left-0 bg-brand rounded-full transition-all duration-300"
            style={{ width: `${Math.max(10, Math.min(100, p * 100))}%` }}
          />
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {PROCESS.map((s, i) => {
            const on = i <= active;
            return (
              <div
                key={s.n}
                className={`rounded-2xl border p-6 bg-white transition-all duration-300 hover:-translate-y-1 ${
                  on ? "border-brand/40 shadow-md" : "border-ink/10 shadow-xs opacity-85"
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className={`w-11 h-11 rounded-xl grid place-items-center transition-colors duration-300 ${
                      on ? "bg-brand text-white" : "bg-cloud text-ink/60"
                    }`}
                  >
                    <s.icon className="w-5 h-5" />
                  </span>
                  <span className="text-[12px] font-extrabold tracking-widest text-brand tabular-nums bg-brand-soft px-2.5 py-1 rounded-full">
                    {s.n}
                  </span>
                </div>
                <h3 className="text-[16px] font-bold text-night leading-snug">{s.t}</h3>
                <p className="mt-2 text-[13px] text-ink/70 leading-relaxed font-normal">{s.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


/* ---------- Data ---------- */
const PRODUCTS = [
  { icon: Car, t: "Car Insurance", d: "Comprehensive cover with verified IDV, zero-dep aur engine protect." },
  { icon: Truck, t: "Commercial Vehicle", d: "Goods carrier, pickup, tempo aur truck — sahi rating par." },
  { icon: Bus, t: "School Bus & Passenger", d: "Passenger liability aur statutory compliance covered." },
  { icon: Building2, t: "Fleet & Taxi Insurance", d: "5 se 500+ vehicles, ek renewal calendar aur claims desk." },
  { icon: HeartPulse, t: "Health Insurance", d: "Family floater aur individual plans, sub-limits clearly explained." },
];

const PILLARS = [

  {
    icon: Camera,
    tag: "Pillar 01",
    title: "AI Dashcam & G-Sensor",
    desc: "Full-HD loop recording with night clarity. G-sensor impact detect karte hi footage lock ho jaati hai — false aur staged claims ke against solid video evidence.",
    points: ["Impact-locked event clips", "Night-vision plate clarity", "Harsh-event snapshots"],
    tint: "bg-brand-soft", accent: "text-brand",
  },
  {
    icon: Cable,
    tag: "Pillar 02",
    title: "Smart Live Tracking · Zero Wiring Cut",
    desc: "Real-time location, trip history aur speed alerts — bina ek bhi wire kaate. Manufacturer warranty intact, electricals safe, device removable.",
    points: ["Live map + trip history", "Geo-fence & theft alerts", "Over-speed notifications"],
    tint: "bg-accent-blue", accent: "text-brand-deep",
  },
  {
    icon: FileSearch,
    tag: "Pillar 03",
    title: "Professional Policy Audit",
    desc: "Aapki policy ka clause-by-clause audit — hidden exclusions, galat IDV, missing add-ons aur document gaps written report ke saath.",
    points: ["Exclusion & IDV review", "Add-on gap report", "Document expiry tracking"],
    tint: "bg-accent-yellow/40", accent: "text-amber-700",
  },
];

const RISKS = [
  { icon: AlertTriangle, t: "False & staged claims", d: "Bina evidence ke aapka word third party ke word ke against khada hota hai." },
  { icon: FileSearch, t: "Hidden policy exclusions", d: "Claim reject hone ki sabse badi wajah — clause jo kabhi padha hi nahi gaya." },
  { icon: Gauge, t: "Unmonitored driving", d: "Rash driving aur over-speeding ka pata tab chalta hai jab nuksaan ho chuka hota hai." },
  { icon: Bell, t: "Expired documents", d: "PUC, fitness ya permit expire — aur technical ground par claim khatam." },
];

const AUDIENCES = [
  { icon: Truck, t: "Individual Car Owners", d: "Personal car ke liye complete audit + dashcam + tracking membership.", to: "/risk-audit" as const },
  { icon: Building2, t: "Fleets & Transporters", d: "Driver scoring, evidence logs aur fleet-wide compliance ek dashboard par.", to: "/fleet-safety" as const },
  { icon: Bus, t: "Schools & Transport Contractors", d: "Route geo-fencing, parent alerts aur driver verification files.", to: "/school-bus-safety" as const },
];

const PROCESS = [
  { n: "01", t: "Request Free Risk Audit", d: "Vehicle aur policy details WhatsApp ya form se share karein.", icon: Send },
  { n: "02", t: "Audit & Risk Report", d: "Clause-level review, exposure score aur written action plan.", icon: Brain },
  { n: "03", t: "Device Installation", d: "AI dashcam aur tracker fit, zero wiring cut, 30 minutes mein.", icon: Camera },
  { n: "04", t: "Live Monitoring & Alerts", d: "Location, driving behaviour aur document expiry ke ongoing alerts.", icon: MapPin },
  { n: "05", t: "Incident & Claim Support", d: "Evidence retrieval aur documentation support jab zaroorat pade.", icon: ShieldCheck },
];

const STATS = [
  { value: 10000, suffix: "+", label: "Policies audited" },
  { value: 4200, suffix: "+", label: "Devices installed" },
  { value: 500, suffix: "+", label: "Fleet & corporate clients" },
  { value: 24, suffix: "×7", label: "Incident support desk" },
];

const TESTIMONIALS = [
  { q: "Third party ne apni galti ka claim humpe daal diya tha. Dashcam ki locked footage ne poora case palat diya.", n: "Rajeev Malhotra", r: "Transport contractor, Delhi NCR" },
  { q: "Audit report mein pata chala ki hamari 14 gaadiyon ka IDV galat tha. Ye pehle kabhi kisi ne nahi bataya.", n: "S. Venkatesh", r: "Fleet head, logistics company" },
  { q: "Parents ab transport office ko call nahi karte — unhe bus ke alerts khud mil jaate hain.", n: "Meenakshi Rao", r: "Administrator, CBSE school" },
];

const FAQS = [
  { q: "Kya aap insurance policy issue karte hain?", a: "Nahi. Insure Audit Expert ek technology, risk-audit aur vehicle-safety service provider hai. Insurance policies hamare licensed distribution partner PBPartners (Policybazaar Insurance Brokers Pvt. Ltd.) aur anya IRDAI-registered insurers/brokers ke through issue hoti hain, standard insurance rates par." },
  { q: "Tech Membership ka matlab kya hai?", a: "AI dashcam, live-tracking device aur professional audit hamare risk-management program ka hissa hain aur Complimentary Tech Membership ke roop mein offer kiye jaate hain. Ye ek technology aur safety service hai — koi rebate, cashback ya premium discount nahi." },
  { q: "Zero wiring cut ka fayda kya hai?", a: "Traditional trackers wiring harness cut karte hain, jisse manufacturer warranty void ho sakti hai aur electrical faults aa sakte hain. Hamari installation plug-based aur reversible hai — 30 minute mein complete." },
  { q: "Audit ke liye kya documents chahiye?", a: "Current policy copy, RC aur vehicle details. Fleet ke case mein vehicle list. Report 24 working hours mein written form mein milti hai." },
  { q: "Footage aur data kaun access kar sakta hai?", a: "Sirf registered owner aur authorised users. Data encrypted rehta hai aur bina aapki written consent ke kisi third party ke saath share nahi hota." },
];

function Index() {
  return (
    <div className="min-h-screen bg-paper text-ink font-body" id="top">
      <SiteHeader />

      {/* HERO — institutional masthead */}
      <MastheadHero />


      {/* PRODUCTS */}
      <section className="relative py-20 overflow-hidden">
        <BlueprintField />
        <div className="relative max-w-[1240px] mx-auto px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker>Insurance Plans</Kicker>
                <h2 className="mt-2 text-[34px] sm:text-[42px] font-extrabold text-night">
                  Kaunsa <DrawUnderline>cover chahiye</DrawUnderline> aapko?
                </h2>
                <p className="mt-3 text-ink/65 max-w-2xl">Har quote se pehle free policy audit — exclusions, IDV aur add-on gaps pakadne ke baad hi hum recommend karte hain.</p>
              </div>
              <Link to="/insurance" className="inline-flex items-center gap-2 text-[13.5px] font-bold text-brand">View all plans <ArrowRight className="w-4 h-4"/></Link>
            </div>
          </Reveal>
          <div className="mt-11 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.t} delay={i * 70} variant="scale">
                <Tilt>
                  <Spotlight className="h-full rounded-lg">
                    <Link to="/insurance" className="spin-border frame-corners group block h-full bg-white/90 backdrop-blur-sm rounded-lg border border-ink/12 p-6 hover:border-brand hover:shadow-xl transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-brand-soft grid place-items-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"><p.icon className="w-6 h-6 text-brand"/></div>
                      <h3 className="text-[17px] font-bold text-night">{p.t}</h3>
                      <p className="mt-2 text-[13.5px] text-ink/65 leading-relaxed">{p.d}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-brand">Get quote <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1"/></span>
                    </Link>
                  </Spotlight>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      {/* TICKER BAND */}
      <section aria-hidden className="border-y border-ink/10 bg-night text-white/85 py-4" data-no-autoreveal>
        <Ticker
          duration={30}
          items={[
            "AI Dashcam + G-Sensor",
            "Zero Wiring-Cut Live Tracking",
            "Free Professional Policy Audit",
            "Standard IRDAI-Approved Rates",
            "Claim Backed by Video Proof",
            "Pan-India Service",
          ].map((t) => (
            <span key={t} className="text-[13px] font-bold uppercase tracking-[0.2em]">
              <span className="text-accent-yellow">/</span> {t}
            </span>
          ))}
        />
      </section>

      {/* SCROLL-SCRUBBED EVIDENCE REEL */}
      <ScrollCinema poster="/media/road-poster.jpg" />


      {/* RISKS */}
      <section className="py-20 bg-cloud">
        <div className="max-w-[1240px] mx-auto px-6">
          <Reveal>
            <div className="text-center">
              <Ornament className="mb-5" />
              <h2 className="text-[34px] sm:text-[42px] font-extrabold text-night max-w-3xl mx-auto">Aapki gaadi par sabse bade 4 risks — aur unka jawab</h2>
              <GoldRule className="mt-6 w-40 mx-auto" />
            </div>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RISKS.map((r, i) => (
              <Reveal key={r.t} delay={i * 80}>
                <div className="spin-border frame-corners lift h-full bg-white rounded-lg border border-ink/12 p-6 hover:border-brand transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-brand-soft grid place-items-center mb-4"><r.icon className="w-5 h-5 text-brand"/></div>
                  <h3 className="font-bold text-night text-[16px]">{r.t}</h3>
                  <p className="mt-2 text-[13.5px] text-ink/65 leading-relaxed">{r.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PILLARS */}
      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <Reveal>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 bg-brand-soft text-brand text-[11.5px] font-bold uppercase tracking-[0.14em] px-4 py-2 rounded-full">
                <ShieldCheck className="w-4 h-4"/> The Safety Membership
              </span>
              <h2 className="mt-5 text-[34px] sm:text-[44px] font-extrabold text-gild">Teen pillars. <em className="font-classic italic font-semibold">Ek complete protection system.</em></h2>
              <Ornament className="mt-5" />
              <p className="mt-3 text-ink/65 max-w-2xl mx-auto">Hamara Risk Management &amp; Safety Program technology aur professional audit ko milata hai — taaki aapki gaadi, driver aur documents teeno protected rahein.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid lg:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 110} variant="clip">
                <Tilt max={5}>
                  <div className="spin-border frame-corners h-full bg-white rounded-xl border border-ink/12 p-7 hover:shadow-xl transition-shadow">
                    <div className={`w-14 h-14 rounded-lg ${p.tint} grid place-items-center mb-5 halo`}><p.icon className={`w-7 h-7 ${p.accent}`}/></div>
                    <span className="text-[11px] font-bold tracking-widest text-brand">{p.tag}</span>
                    <h3 className="mt-1.5 text-[20px] font-extrabold text-night leading-snug">{p.title}</h3>
                    <p className="mt-3 text-[14px] text-ink/65 leading-relaxed">{p.desc}</p>
                    <ul className="mt-5 space-y-2 text-[13px] text-ink/70">
                      {p.points.map((x) => (
                        <li key={x} className="flex items-start gap-2"><Check className="w-4 h-4 text-brand mt-0.5 shrink-0"/>{x}</li>
                      ))}
                    </ul>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mt-8 text-center text-[12.5px] text-ink/50 max-w-3xl mx-auto">
              These technology and audit services are offered as a Complimentary Tech Membership under our risk-management program. Insurance, where required, is arranged separately through licensed partners at standard insurance rates.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-night text-white py-16">
        <div className="max-w-[1240px] mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="text-center">
                <div className="text-[38px] font-extrabold text-accent-yellow leading-none">
                  <Counter to={s.value} suffix={s.suffix}/>
                </div>
                <div className="mt-2 text-[13px] text-white/65 font-semibold">
                  <ScrambleText text={s.label}/>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COVERAGE MAP + PROOF METER */}
      <section className="relative py-20 overflow-hidden bg-paper">
        <BlueprintField />
        <div className="relative max-w-[1240px] mx-auto px-6 grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
          <Reveal variant="left">
            <div className="text-night">
              <CoverageMap />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Kicker>Pan-India Corridors</Kicker>
              <h2 className="mt-2 text-[34px] sm:text-[42px] font-extrabold text-night leading-[1.08]">
                Delhi se Chennai tak — <DrawUnderline>har route</DrawUnderline> par nazar.
              </h2>
              <p className="mt-4 text-[15px] text-ink/65 leading-relaxed max-w-xl">
                Installation, servicing aur claim documentation support 10 major hubs se — aur highway corridors par live tracking, taaki gaadi kahin bhi ho, evidence hamesha saath rahe.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-8 flex items-center gap-6">
                <SignalRings className="w-28 h-28 shrink-0" />
                <ProofMeter
                  className="flex-1 text-night"
                  rows={[
                    { label: "Claims settled with video evidence", value: 94, note: "Program vehicles, last 12 months" },
                    { label: "Policies with a gap found in audit", value: 71, note: "Before correction" },
                    { label: "Installations completed same day", value: 88 },
                  ]}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* AUDIENCES */}
      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <Reveal>
            <div className="text-center">
              <Kicker>Kiske liye</Kicker>
              <h2 className="mt-3 text-[34px] sm:text-[42px] font-extrabold text-night">Program kiske liye hai</h2>
              <GoldRule className="mt-6 w-40 mx-auto" />
            </div>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {AUDIENCES.map((a, i) => (
              <Reveal key={a.t} delay={i * 100}>
                <Link to={a.to} className="group frame-corners block h-full bg-white rounded-xl border border-ink/12 p-7 hover:border-brand hover:-translate-y-0.5 transition">
                  <div className="w-14 h-14 rounded-lg bg-brand-soft grid place-items-center mb-5"><a.icon className="w-7 h-7 text-brand"/></div>
                  <h3 className="text-[19px] font-extrabold text-night">{a.t}</h3>
                  <p className="mt-2.5 text-[14px] text-ink/65 leading-relaxed">{a.d}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand">Learn more <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"/></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — scroll-scrubbed */}
      <section className="bg-cloud">
        <ProcessRail />
      </section>

      {/* EVIDENCE SPLIT */}
      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Parallax speed={0.06} className="grid grid-cols-2 gap-4">
              <Unveil className="rounded-lg h-[220px]"><img src={svcFleet} alt="Dashcam evidence review" loading="lazy" className="h-[220px] w-full object-cover ken-burns"/></Unveil>
              <Unveil delay={140} className="rounded-lg h-[220px] mt-8"><img src={svcAudit} alt="Policy audit documentation" loading="lazy" className="h-[220px] w-full object-cover ken-burns"/></Unveil>
              <Unveil delay={260} className="rounded-lg h-[180px]"><img src={svcClaim} alt="Incident and claim documentation support" loading="lazy" className="h-[180px] w-full object-cover ken-burns"/></Unveil>
              <div className="rounded-lg bg-brand text-white p-6 mt-8 flex flex-col justify-center">
                <div className="text-[30px] font-extrabold leading-none">72 hrs</div>
                <div className="mt-2 text-[13px] text-white/85">Typical evidence retrieval &amp; documentation turnaround after an incident.</div>
              </div>
            </Parallax>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-[34px] sm:text-[42px] font-extrabold text-night leading-tight">Jab incident hota hai, proof already ready hota hai.</h2>
            <p className="mt-5 text-ink/70 leading-relaxed">
              Accident ke baad sabse mushkil kaam hota hai apni baat sabit karna. Membership ke saath aapke paas timestamped video, GPS trail aur ek audited policy file hoti hai — teeno milkar aapka case strong bana dete hain.
            </p>
            <ul className="mt-6 space-y-3 text-[14px] text-ink/70">
              {[
                "G-sensor locked footage jo overwrite nahi hoti",
                "GPS trail with speed and route at the time of the event",
                "Audited policy file — exclusions aur documents pehle se verified",
                "Documentation support with your insurer or broker",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2"><Check className="w-4 h-4 text-brand mt-0.5 shrink-0"/>{x}</li>
              ))}
            </ul>
            <Link to="/risk-audit" className="mt-8 inline-flex items-center gap-2 bg-night hover:bg-brand-deep text-white font-bold px-7 py-4 rounded-md transition">
              See what the audit covers <ArrowRight className="w-4 h-4"/>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-night text-white py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <Reveal><div className="text-center"><h2 className="text-[34px] sm:text-[42px] font-extrabold">Members kya kehte hain</h2><GoldRule className="mt-6 w-40 mx-auto" /></div></Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.n} delay={i * 110}>
                <div className="h-full frame-corners rounded-xl border border-white/12 bg-white/[0.04] p-7 transition-colors duration-500 hover:border-accent-yellow/40 hover:bg-white/[0.07]">
                  <Quote className="w-7 h-7 text-accent-yellow"/>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/85">{t.q}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-brand grid place-items-center"><Users className="w-5 h-5"/></span>
                    <div>
                      <div className="font-bold text-[14px]">{t.n}</div>
                      <div className="text-[12px] text-white/55">{t.r}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6">
          <Reveal><h2 className="text-[34px] sm:text-[42px] font-extrabold text-night text-center">Frequently asked questions</h2></Reveal>
          <div className="mt-10 space-y-3">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group bg-white border border-ink/12 rounded-lg p-5 open:border-brand transition">
                  <summary className="cursor-pointer list-none font-bold text-[15.5px] text-night flex items-center justify-between gap-4">
                    {f.q}
                    <span className="text-brand text-xl group-open:rotate-45 transition">+</span>
                  </summary>
                  <p className="mt-3 text-[14px] text-ink/65 leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-deep text-white py-20">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="text-[34px] sm:text-[44px] font-extrabold leading-tight">Aaj hi apni gaadi ka free risk audit book karein.</h2>
            <p className="mt-4 text-white/80 max-w-md">Audit free hai aur koi obligation nahi. Report 24 working hours mein — findings, risk score aur action plan ke saath.</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Magnetic strength={0.24}>
                <Link to="/contact" className="sheen group inline-flex items-center gap-2 bg-accent-yellow text-night font-bold px-7 py-4 rounded-md hover:bg-white transition">
                  Join Safety Membership <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"/>
                </Link>
              </Magnetic>
              <Magnetic strength={0.18}>
                <a href="https://wa.me/919876543210" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 font-bold px-7 py-4 rounded-md transition">
                  <MessageCircle className="w-4 h-4"/> WhatsApp Us
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
      <BackToTop />
    </div>
  );
}
