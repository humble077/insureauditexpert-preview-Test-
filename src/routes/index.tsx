import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Camera,
  Radio,
  Lock,
  Thermometer,
  Fuel,
  CreditCard,
  LayoutDashboard,
  Building2,
  HeartPulse,
  Car,
  Bike,
  Truck,
  Bus,
  FileSearch,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Mail,
  ChevronDown,
  Sparkles,
  AlertTriangle,
  Navigation,
  Bell,
  FileText,
  Gauge,
  Headphones,
  Send,
  Brain,
  Quote,
  Users,
  Check,
  Zap,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { openQuoteModal } from "@/components/quote-dialog";
import { openDeviceEnquiryModal } from "@/components/device-enquiry-dialog";
import { openDemoRequestModal } from "@/components/demo-request-dialog";
import heroIllustration from "@/assets/hero-illustration.jpg";
import svcCorporate from "@/assets/svc-corporate.jpg";
import svcFleet from "@/assets/svc-fleet.jpg";
import svcAudit from "@/assets/svc-audit.jpg";
import svcClaim from "@/assets/svc-claim.jpg";

import {
  Reveal,
  Counter,
  Tilt,
  Magnetic,
  useElementProgress,
  Parallax,
  Ticker,
  SplitText,
} from "@/lib/motion";

import {
  BlueprintField,
  DrawUnderline,
  CoverageMap,
  SignalRings,
  Spotlight,
  ProofMeter,
  GoldRule,
  Unveil,
} from "@/components/graphics";

import { InsureTrackAppShowcase } from "@/components/insure-track-showcase";
import { ScrollCinema } from "@/components/scroll-cinema";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Insure Audit Expert | Smarter Insurance. Safer Vehicles. Smarter Fleets." },
      {
        name: "description",
        content:
          "Explore insurance solutions, vehicle safety devices, and intelligent fleet technology designed to help individuals and businesses manage risk and operate with greater confidence.",
      },
      {
        name: "keywords",
        content:
          "car insurance India, commercial vehicle insurance, fleet tracking software, command center, AIS-140 GPS devices, dashcam motor insurance, health insurance, MSME insurance Delhi",
      },
      { property: "og:title", content: "Insure Audit Expert — Smarter Insurance. Safer Vehicles. Smarter Fleets." },
      {
        property: "og:description",
        content:
          "Insurance solutions, vehicle safety devices, and intelligent fleet technology across India.",
      },
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
          slogan: "Smarter Insurance. Safer Vehicles. Smarter Fleets.",
          url: SITE_URL,
          telephone: "08065604804",
          parentOrganization: { "@type": "Organization", name: "Alxsure Tech Hub (OPC) Pvt. Ltd." },
          address: {
            "@type": "PostalAddress",
            streetAddress: "B-5/55, Safdarjung Enclave",
            addressLocality: "New Delhi",
            postalCode: "110029",
            addressCountry: "IN",
          },
          areaServed: { "@type": "Country", name: "India" },
          serviceType: [
            "Motor Insurance",
            "Commercial Vehicle Insurance",
            "Health Insurance",
            "MSME Insurance",
            "Fleet Telematics Software",
            "Vehicle Safety Devices",
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

/* ---------- Ticker verified highlights ---------- */
const TICKER_ITEMS = [
  { label: "PBPartners Referral Partner", icon: ShieldCheck },
  { label: "Standard IRDAI-Approved Rates", icon: CheckCircle2 },
  { label: "AI Dashcam G-Sensor Video Evidence", icon: Camera },
  { label: "Zero Wire-Cut Telematics (Preserves Warranty)", icon: Radio },
  { label: "AIS-140 Certified GPS Telematics", icon: Navigation },
  { label: "Smart Cargo E-Locks with Tamper Alarms", icon: Lock },
  { label: "Cold Chain Real-Time Temperature Probes", icon: Thermometer },
  { label: "Fuel Rod Level & Drain Sensors", icon: Fuel },
  { label: "24x7 Incident & Claim Advisory: 08065604804", icon: Phone },
];

/* ---------- Audit & Claim Process Steps ---------- */
const AUDIT_PROCESS = [
  {
    n: "01",
    t: "Incident Notice & Loss Alert",
    d: "Share vehicle registration and loss details via WhatsApp or our 24x7 desk immediately after an event.",
    icon: Send,
  },
  {
    n: "02",
    t: "Evidence Dossier Assembly",
    d: "Secure extraction of timestamped dashcam video clips, GPS speed logs, and G-sensor collision telemetry.",
    icon: Camera,
  },
  {
    n: "03",
    t: "Policy Clause & IDV Audit",
    d: "Verification of IDV sizing, deductibles, salvage clauses, and NCB validity to avoid surveyor deductions.",
    icon: Brain,
  },
  {
    n: "04",
    t: "Surveyor & Insurer Coordination",
    d: "Structured evidence submission to appointed surveyors and insurer claim desks for transparent assessment.",
    icon: ShieldCheck,
  },
];

function ProcessRail() {
  const { ref, p } = useElementProgress<HTMLDivElement>();
  const active = Math.min(AUDIT_PROCESS.length - 1, Math.floor(p * AUDIT_PROCESS.length + 0.0001));

  return (
    <div ref={ref} className="py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand">Prakriya · Structured Process</span>
            <h2 className="text-[28px] sm:text-[38px] font-extrabold text-night mt-1">
              How Claim Advisory &amp; Evidence Work
            </h2>
          </div>
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink/50 tabular-nums">
            {String(AUDIT_PROCESS.length).padStart(2, "0")} Systematic Steps
          </span>
        </div>

        {/* Travelling progress rail */}
        <div className="mt-8 h-[3px] bg-ink/10 relative overflow-hidden rounded-full">
          <div
            className="absolute inset-y-0 left-0 bg-brand rounded-full transition-all duration-300"
            style={{ width: `${Math.max(10, Math.min(100, p * 100))}%` }}
          />
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIT_PROCESS.map((s, i) => {
            const on = i <= active;
            return (
              <div
                key={s.n}
                className={`rounded-3xl border p-6 bg-white transition-all duration-300 hover:-translate-y-1.5 ${
                  on ? "border-brand/50 shadow-md ring-2 ring-brand/10" : "border-ink/10 shadow-xs opacity-90"
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className={`w-11 h-11 rounded-2xl grid place-items-center transition-colors duration-300 ${
                      on ? "bg-brand text-white shadow-xs" : "bg-cloud text-ink/60"
                    }`}
                  >
                    <s.icon className="w-5 h-5" />
                  </span>
                  <span className="text-[12px] font-extrabold tracking-widest text-brand tabular-nums bg-brand-soft px-3 py-1 rounded-full">
                    {s.n}
                  </span>
                </div>
                <h3 className="text-[17px] font-bold text-night leading-snug">{s.t}</h3>
                <p className="mt-2 text-[13px] text-ink/70 leading-relaxed font-normal">{s.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const PROOF_METRICS = [
  { label: "Policy Clause & Add-On Accuracy", value: 98, note: "Pre-binding IDV and deductible validation" },
  { label: "Zero Wire-Cut Warranty Preservation", value: 100, note: "OBD-II and plug-and-play fuse tap installations" },
  { label: "Objective Evidence Availability on Road", value: 95, note: "Full-HD loop recording with G-sensor lock" },
  { label: "24x7 Claims First-Response SLA", value: 99, note: "Incident notice logged within 15 minutes" },
];

const STATS = [
  { value: 10000, suffix: "+", label: "Policies Audited" },
  { value: 4200, suffix: "+", label: "Devices Installed" },
  { value: 500, suffix: "+", label: "Fleet & Transport Clients" },
  { value: 24, suffix: "x7", label: "Dedicated Support Desk" },
];

function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <PageShell>
      {/* =========================================================================
          SECTION 1: HERO (WITH BLUEPRINT FIELD, REVEAL, DRAW UNDERLINE & TICKER)
          ========================================================================= */}
      <section className="relative bg-gradient-to-b from-brand-soft/70 via-white to-cloud/40 pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-ink/8 overflow-hidden">
        <BlueprintField tone="light" />

        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          <div>
            <Reveal variant="up">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-brand/20 shadow-xs text-night text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-brand animate-pulse" /> Insurance · Safety Devices · Fleet Telematics
              </div>
              <h1 className="text-[38px] sm:text-[54px] lg:text-[62px] font-extrabold text-night leading-[1.07] tracking-tight">
                <SplitText text="Smarter Insurance." delay={40} stagger={22} className="block" />
                <DrawUnderline color="var(--brand)">
                  <span className="text-brand inline-block">
                    <SplitText text="Safer Vehicles." delay={340} stagger={22} />
                  </span>
                </DrawUnderline>
                <SplitText text="Smarter Fleets." delay={640} stagger={22} className="block" />
              </h1>
            </Reveal>

            <Reveal variant="up" delay={80}>
              <p className="mt-6 text-base sm:text-lg text-ink/75 leading-relaxed max-w-xl">
                Explore insurance solutions, vehicle safety devices, and intelligent fleet technology designed to help individuals and businesses manage risk and operate with greater confidence.
              </p>
            </Reveal>

            {/* CTAs with Magnetic Hover */}
            <Reveal variant="up" delay={130}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.3}>
                  <button
                    type="button"
                    onClick={() => openQuoteModal({ category: "car" })}
                    className="sheen inline-flex items-center gap-2.5 bg-brand hover:bg-brand-deep text-white font-bold text-sm sm:text-base px-7 py-4 rounded-xl shadow-md transition-all hover:shadow-xl active:scale-[0.98] cursor-pointer"
                  >
                    <ShieldCheck className="w-5 h-5 text-accent-yellow" /> Explore Insurance
                  </button>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <Link
                    to="/tracking-solutions"
                    className="inline-flex items-center gap-2.5 bg-white hover:bg-cloud border border-ink/15 text-night font-bold text-sm sm:text-base px-7 py-4 rounded-xl transition shadow-2xs hover:shadow-md"
                  >
                    <LayoutDashboard className="w-4 h-4 text-brand" /> Explore Fleet Solutions
                  </Link>
                </Magnetic>
              </div>
            </Reveal>

            {/* Micro Highlights */}
            <Reveal variant="up" delay={180}>
              <div className="mt-10 pt-6 border-t border-ink/10 grid grid-cols-3 gap-4 text-xs font-bold text-night">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                  <span>Standard IRDAI Rates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                  <span>Zero Wire-Cut Telematics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                  <span>Independent Clause Audit</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Hero Visual showing Vehicles, Fleet & Technology */}
          <Unveil delay={160} className="rounded-3xl shadow-2xl border-4 border-white bg-night">
            <Tilt max={5} className="w-full h-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <img
                  src={heroIllustration}
                  alt="Vehicles, Fleet Operations and Safety Telematics"
                  className="w-full h-full object-cover ken-burns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />

                {/* Floating Status Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-ink/10 shadow-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand text-white grid place-items-center shadow-xs">
                      <Navigation className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="font-extrabold text-night block">Live Fleet Command Active</span>
                      <span className="text-[11px] text-ink/65">Sub-second telemetry &amp; sensor integration</span>
                    </div>
                  </div>
                  <Link
                    to="/tracking-solutions"
                    className="font-bold text-brand hover:text-brand-deep flex items-center gap-1 group"
                  >
                    View Live <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Tilt>
          </Unveil>
        </div>

        {/* Marquee Ticker */}
        <div className="mt-16 border-t border-b border-ink/8 bg-white/90 backdrop-blur-sm py-3.5 overflow-hidden">
          <Ticker
            duration={32}
            items={TICKER_ITEMS.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-night/80 px-6 border-r border-ink/10">
                <item.icon className="w-4 h-4 text-brand shrink-0" />
                {item.label}
              </span>
            ))}
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OUR CORE SOLUTIONS (4 PROMINENT CARDS WITH TILT & SPOTLIGHT)
          ========================================================================= */}
      <section className="py-20 bg-white relative" id="solutions">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Core Solutions</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-night mt-1">
                End-to-End Protection &amp; <DrawUnderline color="var(--brand)">Fleet Intelligence</DrawUnderline>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-ink/65 leading-relaxed">
                Designed to help vehicle owners, commercial transport operators, and business enterprises manage risk with clarity.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Motor Insurance */}
            <Reveal variant="scale" delay={0}>
              <Tilt max={7}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="spin-border lift bg-cloud/40 rounded-3xl border border-ink/8 p-7 flex flex-col justify-between h-full hover:border-brand/40 transition">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand grid place-items-center mb-5 shadow-2xs">
                        <Car className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-night">Motor Insurance</h3>
                      <p className="mt-2.5 text-xs sm:text-sm text-ink/70 leading-relaxed">
                        Comprehensive and third-party policies for private cars, bikes, commercial goods vehicles, trucks, and school buses at standard IRDAI rates.
                      </p>
                    </div>
                    <div className="mt-6 pt-5 border-t border-ink/8">
                      <Link
                        to="/motor-insurance"
                        className="text-xs font-bold text-brand hover:text-brand-deep inline-flex items-center gap-1.5 group"
                      >
                        Explore Motor Plans <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* Card 2: Health Insurance */}
            <Reveal variant="scale" delay={80}>
              <Tilt max={7}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="spin-border lift bg-cloud/40 rounded-3xl border border-ink/8 p-7 flex flex-col justify-between h-full hover:border-rose-300 transition">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 grid place-items-center mb-5 shadow-2xs">
                        <HeartPulse className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-night">Health Insurance</h3>
                      <p className="mt-2.5 text-xs sm:text-sm text-ink/70 leading-relaxed">
                        Individual, family floater, senior citizen, and corporate group medical policies audited for room-rent sub-limits and pre-existing clauses.
                      </p>
                    </div>
                    <div className="mt-6 pt-5 border-t border-ink/8">
                      <Link
                        to="/health-insurance"
                        className="text-xs font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1.5 group"
                      >
                        Explore Health Plans <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* Card 3: MSME Insurance */}
            <Reveal variant="scale" delay={160}>
              <Tilt max={7}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="spin-border lift bg-cloud/40 rounded-3xl border border-ink/8 p-7 flex flex-col justify-between h-full hover:border-blue-300 transition">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 grid place-items-center mb-5 shadow-2xs">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-night">MSME Insurance</h3>
                      <p className="mt-2.5 text-xs sm:text-sm text-ink/70 leading-relaxed">
                        Protect storefronts, warehouses, factories, and commercial property against fire, theft, flood, and statutory employee liabilities.
                      </p>
                    </div>
                    <div className="mt-6 pt-5 border-t border-ink/8">
                      <Link
                        to="/msme-insurance"
                        className="text-xs font-bold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1.5 group"
                      >
                        Explore MSME Plans <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* Card 4: Fleet Tracking Software */}
            <Reveal variant="scale" delay={240}>
              <Tilt max={7}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="spin-border lift bg-cloud/40 rounded-3xl border border-ink/8 p-7 flex flex-col justify-between h-full hover:border-night/40 transition">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-night text-white grid place-items-center mb-5 shadow-2xs">
                        <LayoutDashboard className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-night">Fleet Tracking Software</h3>
                      <p className="mt-2.5 text-xs sm:text-sm text-ink/70 leading-relaxed">
                        Real-time GPS telematics, driver scoring, fuel monitoring, temperature excursion alerts, and cargo e-lock tracking on our Command Center.
                      </p>
                    </div>
                    <div className="mt-6 pt-5 border-t border-ink/8">
                      <Link
                        to="/tracking-solutions"
                        className="text-xs font-bold text-night hover:text-brand inline-flex items-center gap-1.5 group"
                      >
                        Access Telematics Hub <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHY CHOOSE US (PAN-INDIA MAP, PROOF METER & COUNTERS)
          ========================================================================= */}
      <section className="py-20 bg-cloud/50 border-y border-ink/8 relative overflow-hidden">
        <BlueprintField tone="light" />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Why Choose Us</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-night mt-1">
                Verified Principles &amp; <DrawUnderline color="var(--brand)">Independent Service</DrawUnderline>
              </h2>
              <p className="mt-3 text-sm text-ink/65 leading-relaxed">
                We stand apart through factual policy auditing, non-intrusive safety telematics, and dedicated claims coordination across India.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Core Value Pillars */}
            <Reveal variant="left">
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-ink/8 p-5 shadow-2xs hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-soft text-brand grid place-items-center shrink-0">
                      <FileSearch className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-night">Independent Policy Audits</h4>
                      <p className="mt-1 text-xs text-ink/70 leading-relaxed">
                        We review IDV, deductibles, NCB validity, and fine-print exclusions before you commit money to an insurance policy.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-ink/8 p-5 shadow-2xs hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-soft text-brand grid place-items-center shrink-0">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-night">Evidentiary Safety Support</h4>
                      <p className="mt-1 text-xs text-ink/70 leading-relaxed">
                        G-sensor locked video footage provides objective supporting proof during surveyor claim assessment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-ink/8 p-5 shadow-2xs hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-soft text-brand grid place-items-center shrink-0">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-night">Zero Wire-Cutting Telematics</h4>
                      <p className="mt-1 text-xs text-ink/70 leading-relaxed">
                        Our telematics devices connect cleanly via OBD-II and fuse adapters, preserving your manufacturer vehicle warranty.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-ink/8 p-5 shadow-2xs hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-soft text-brand grid place-items-center shrink-0">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-night">Dedicated Customer Desk</h4>
                      <p className="mt-1 text-xs text-ink/70 leading-relaxed">
                        Senior advisors and hardware technicians assisting you on phone, WhatsApp, and in-person across India.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Pan-India Coverage Map & Proof Meter */}
            <Reveal variant="right" delay={120}>
              <div className="bg-white rounded-3xl border border-ink/10 p-8 shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand block">Active Corridor Network</span>
                    <h3 className="text-lg font-bold text-night">Pan-India Telematics Coverage</h3>
                  </div>
                  <SignalRings label="LIVE 5S" />
                </div>

                {/* Animated Vector Map of India */}
                <CoverageMap className="w-full max-w-[380px] mx-auto py-2" />

                {/* Proof Meter Benchmarks */}
                <div className="mt-6 pt-6 border-t border-ink/8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-night/70 mb-4">Advisory &amp; Hardware Benchmarks</h4>
                  <ProofMeter rows={PROOF_METRICS} />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Animated Statistics Rail */}
          <div className="mt-14 pt-10 border-t border-ink/10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80} variant="up">
                <div className="text-center p-5 rounded-2xl bg-white border border-ink/8 shadow-2xs hover:shadow-md transition">
                  <div className="text-3xl sm:text-4xl font-extrabold text-brand font-display">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-bold text-night/70 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: MOTOR INSURANCE SOLUTIONS (OPTION A vs OPTION B)
          ========================================================================= */}
      <section className="py-20 bg-white" id="motor-options">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Motor Insurance Structure</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-night mt-1">
                Two Clear Insurance <DrawUnderline color="var(--accent-yellow)">Choices</DrawUnderline>
              </h2>
              <p className="mt-3 text-sm text-ink/65 leading-relaxed">
                Complete transparency without hidden clauses. Choose between eligible policies bundled with a complimentary safety dashcam or standard standalone motor policies.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Option A: Motor + Complimentary Dashcam */}
            <Reveal variant="left">
              <Tilt max={5}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="spin-border lift bg-white rounded-3xl border-2 border-brand/40 p-8 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
                    <div>
                      <div className="inline-block bg-accent-yellow/20 text-night text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
                        Option A · Technology Bundle
                      </div>
                      <h3 className="text-2xl font-bold text-night">Motor Insurance with Complimentary Dashcam</h3>
                      <p className="mt-3 text-sm text-ink/75 leading-relaxed">
                        Purchase an eligible motor insurance policy and receive one complimentary dashcam hardware device under applicable offers and eligibility conditions.
                      </p>

                      <div className="mt-6 space-y-3.5 text-xs sm:text-[13px] text-ink/80">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                          <span><strong>Complimentary Hardware Device:</strong> Zero device charge under our safety membership offer.</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                          <span><strong>Applicable Software &amp; Connectivity:</strong> Customer pays applicable software subscription charges and SIM connectivity charges for live cloud recording.</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                          <span><strong>Objective Supporting Evidence:</strong> Dashcam captures collision evidence to support your version during surveyor inspection (does not guarantee claim approval).</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-ink/8 flex items-center justify-between">
                      <span className="text-xs text-ink/50">*Subject to terms and eligibility</span>
                      <Magnetic strength={0.3}>
                        <button
                          type="button"
                          onClick={() => openQuoteModal({ category: "car" })}
                          className="sheen bg-brand hover:bg-brand-deep text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition cursor-pointer shadow-md"
                        >
                          Check Eligibility &amp; Quote →
                        </button>
                      </Magnetic>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* Option B: Standard Motor Insurance */}
            <Reveal variant="right" delay={100}>
              <Tilt max={5}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-cloud/40 rounded-3xl border border-ink/10 p-8 shadow-xs flex flex-col justify-between h-full hover:border-ink/20 transition">
                    <div>
                      <div className="inline-block bg-cloud text-ink/70 border border-ink/10 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
                        Option B · Pure Policy
                      </div>
                      <h3 className="text-2xl font-bold text-night">Standard Motor Insurance</h3>
                      <p className="mt-3 text-sm text-ink/75 leading-relaxed">
                        Standard motor insurance comparison across 20+ insurers. Comprehensive, standalone own-damage, and statutory third-party policies without bundled devices.
                      </p>

                      <div className="mt-6 space-y-3.5 text-xs sm:text-[13px] text-ink/80">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-night shrink-0 mt-0.5" />
                          <span><strong>IRDAI Standard Rates:</strong> Sourced directly through our licensed partner PBPartners.</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-night shrink-0 mt-0.5" />
                          <span><strong>No Hardware Bundled:</strong> Zero hardware or recurring subscription obligations.</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-night shrink-0 mt-0.5" />
                          <span><strong>Verified IDV &amp; Add-ons:</strong> Independent check on zero depreciation and roadside assistance riders.</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-ink/8 flex items-center justify-between">
                      <span className="text-xs text-ink/50">Instant online comparison</span>
                      <Magnetic strength={0.3}>
                        <button
                          type="button"
                          onClick={() => openQuoteModal({ category: "car" })}
                          className="bg-night hover:bg-brand text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition cursor-pointer shadow-xs"
                        >
                          Get Standard Quote →
                        </button>
                      </Magnetic>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>
          </div>

          {/* Boundaries Clarification */}
          <div className="mt-8 p-4 rounded-2xl bg-cloud border border-ink/8 text-xs text-ink/70 text-center">
            Notice: AIS-140 GPS is a standalone device offering and is <strong>NOT</strong> an insurance bundle. All insurance policies are issued under standard rates approved by IRDAI.
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: VEHICLE CATEGORIES (7 VISUALLY ATTRACTIVE CARDS WITH TILT)
          ========================================================================= */}
      <section className="py-20 bg-cloud/40 border-y border-ink/8" id="vehicles">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Coverage Categories</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-night mt-1">
                Select Your Vehicle Category
              </h2>
              <p className="mt-3 text-sm text-ink/65 leading-relaxed">
                Quotes for Cars, Bikes, and Commercial GCV are compared instantly on PBPartners. Passenger vehicles and taxis receive dedicated assisted proposals.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Private Cars */}
            <Reveal variant="up" delay={0}>
              <Tilt max={6}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand grid place-items-center shadow-2xs">
                          <Car className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand text-white px-2.5 py-0.5 rounded-full">
                          PB Instant
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-night">Private Cars</h3>
                      <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                        Comprehensive cover for hatchbacks, sedans, and luxury SUVs. Verified IDV and zero-depreciation audits.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-ink/8">
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "car" })}
                        className="w-full bg-brand hover:bg-brand-deep text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        Get Car Quote <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* 2. Bikes / Two-Wheelers */}
            <Reveal variant="up" delay={60}>
              <Tilt max={6}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand grid place-items-center shadow-2xs">
                          <Bike className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand text-white px-2.5 py-0.5 rounded-full">
                          PB Instant
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-night">Bikes / Two-Wheelers</h3>
                      <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                        Motorcycle and scooter policies issued online in 2 minutes. Third-party and comprehensive with zero inspection.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-ink/8">
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "bike" })}
                        className="w-full bg-brand hover:bg-brand-deep text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        Get Bike Quote <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* 3. Commercial Vehicles / GCV */}
            <Reveal variant="up" delay={120}>
              <Tilt max={6}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand grid place-items-center shadow-2xs">
                          <Truck className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand text-white px-2.5 py-0.5 rounded-full">
                          PB Instant
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-night">Commercial (GCV)</h3>
                      <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                        Goods carrying commercial vehicles rated by Gross Vehicle Weight (GVW), route permits, and driver liabilities.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-ink/8">
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "gcv" })}
                        className="w-full bg-brand hover:bg-brand-deep text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        Get GCV Quote <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* 4. Heavy Trucks */}
            <Reveal variant="up" delay={180}>
              <Tilt max={6}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-night text-white grid place-items-center shadow-2xs">
                          <Truck className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand text-white px-2.5 py-0.5 rounded-full">
                          PB Instant
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-night">Trucks &amp; Multi-Axle</h3>
                      <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                        Multi-axle, tipper, tractor-trailer, and heavy logistics vehicles with national permit liability endorsements.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-ink/8">
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "gcv" })}
                        className="w-full bg-brand hover:bg-brand-deep text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        Compare Truck Quotes <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* 5. Auto & Taxi / Cabs */}
            <Reveal variant="up" delay={240}>
              <Tilt max={6}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 grid place-items-center shadow-2xs">
                          <Car className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                          Assisted Quote
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-night">Auto &amp; Taxi / Cabs</h3>
                      <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                        Yellow-board tourist cabs, aggregators, and autorickshaws requiring statutory per-passenger seating liabilities.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-ink/8">
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "auto" })}
                        className="w-full bg-night hover:bg-brand text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        Request Taxi Quote <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* 6. School Buses */}
            <Reveal variant="up" delay={300}>
              <Tilt max={6}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 grid place-items-center shadow-2xs">
                          <Bus className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                          Compliance Desk
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-night">School Buses</h3>
                      <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                        Institutional passenger carriers, school coaches, and college staff buses compliant with statutory guidelines.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-ink/8">
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "bus" })}
                        className="w-full bg-night hover:bg-brand text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        Request Bus Quote <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* 7. Four-Wheeler Tempos / Pickups */}
            <Reveal variant="up" delay={360} className="sm:col-span-2 lg:col-span-2">
              <Tilt max={6}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand grid place-items-center shadow-2xs">
                          <Truck className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-brand text-white px-2.5 py-0.5 rounded-full">
                          PB Instant
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-night">Four-Wheeler Tempos / Pickups</h3>
                      <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                        Dedicated coverage for Bolero Pickups, Tata Ace, Dost, and intra-city logistics fleets. Sized accurately by registered unladen/laden weights to avoid surveyor claim reductions.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-ink/8 flex items-center justify-between">
                      <span className="text-xs font-semibold text-ink/50">Instant GCV PBPartners comparison</span>
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "tempo" })}
                        className="bg-brand hover:bg-brand-deep text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        Get Pickup Quote <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FLEET TRACKING SOFTWARE (COMMAND CENTER, CINEMA REEL & APP SHOWCASE)
          ========================================================================= */}
      <section className="py-20 bg-white" id="fleet-software">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="bg-night text-white rounded-3xl p-8 lg:p-12 relative overflow-hidden border border-white/10 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-yellow">
                    Proprietary Telematics Platform
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 text-white leading-tight">
                    Intelligent Fleet <span className="text-brand">Command Center</span>
                  </h2>
                  <p className="mt-4 text-sm text-white/80 leading-relaxed">
                    Monitor vehicles, drivers, cold-chain temperature, and fuel consumption from a single verified web dashboard.
                  </p>

                  {/* Verified Feature Checklist */}
                  <div className="mt-6 grid sm:grid-cols-2 gap-2.5 text-xs text-white/85">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                      <span>Real-time GPS tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                      <span>Fleet &amp; depot monitoring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                      <span>90-day location history</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                      <span>Device health diagnostics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                      <span>Automated geofence alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                      <span>Fuel pilferage telemetry</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                      <span>Cold chain heat sensors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                      <span>Smart E-lock monitoring</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Magnetic strength={0.3}>
                      <a
                        href="https://insureauditexpert.tech/command-center"
                        target="_blank"
                        rel="noreferrer"
                        className="sheen bg-brand hover:bg-brand-deep text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl transition inline-flex items-center gap-2 shadow-lg cursor-pointer"
                      >
                        Access Command Center <ExternalLink className="w-4 h-4" />
                      </a>
                    </Magnetic>
                    <Magnetic strength={0.3}>
                      <button
                        type="button"
                        onClick={() => openDemoRequestModal()}
                        className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/20 transition cursor-pointer"
                      >
                        Request a Demo →
                      </button>
                    </Magnetic>
                  </div>
                </div>

                {/* Graphic Mockup with Live Sensor Readouts */}
                <Tilt max={6}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 font-mono text-xs text-white/90 space-y-3.5 backdrop-blur-md">
                    <div className="text-[11px] text-accent-yellow uppercase tracking-wider pb-2 border-b border-white/10 flex items-center justify-between">
                      <span>Command Center Telemetry Feed</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-emerald-400" /> GPS Sub-Second Refresh
                      </span>
                      <span className="text-emerald-400 font-bold">5s Frequency</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-accent-yellow" /> Fuel Rod Sensor Telemetry
                      </span>
                      <span className="text-accent-yellow font-bold">Drainage Alerts ON</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-blue-400" /> Cold Chain Reefer Sensor
                      </span>
                      <span className="text-blue-400 font-bold">-18.4°C Steady</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-emerald-400" /> Container E-Lock Status
                      </span>
                      <span className="text-emerald-400 font-bold">Geofence Verified</span>
                    </div>
                  </div>
                </Tilt>
              </div>

              {/* Sub-banner linking to the full interactive telematics suite & ROI calculator */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                <span className="text-white/70">
                  Simulate live CANbus deceleration physics or calculate your fleet fuel savings:
                </span>
                <Link
                  to="/tracking-solutions"
                  className="font-bold text-accent-yellow hover:text-white inline-flex items-center gap-1.5 transition"
                >
                  Explore Interactive Telematics Suite &amp; ROI Calculator →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Live Video Evidence Cinema Reel */}
        <div className="mt-20">
          <ScrollCinema poster="/media/road-poster.jpg" />
        </div>

        {/* InsureTrack Mobile App Simulator Showcase */}
        <div className="mt-20">
          <InsureTrackAppShowcase />
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: DEVICES SHOWCASE (6 DEDICATED CARDS WITH TILT & SPOTLIGHT)
          ========================================================================= */}
      <section className="py-20 bg-cloud/40 border-b border-ink/8" id="devices-section">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Hardware Catalog</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-night mt-1">
                Vehicle Safety &amp; <DrawUnderline color="var(--brand)">Tracking Devices</DrawUnderline>
              </h2>
              <p className="mt-3 text-sm text-ink/65 leading-relaxed">
                Customers can enquire about any hardware device independently without buying insurance. Hardware pricing is enquiry-based; applicable software platform subscriptions and SIM charges apply where disclosed.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Dashcams */}
            <Reveal variant="scale" delay={0}>
              <Tilt max={6}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand grid place-items-center mb-4 shadow-2xs">
                        <Camera className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-night">AI Dashcams</h3>
                      <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                        Collision-locked video recording preserving objective accident proof. Available complimentary on eligible motor policies, or enquired standalone.
                      </p>
                      <div className="mt-4 pt-3 border-t border-ink/8 text-[11px] text-ink/60 space-y-1">
                        <div>• Video evidence supports surveyor claims</div>
                        <div>• Software &amp; SIM connectivity charges apply</div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-ink/8 flex items-center justify-between">
                      <span className="text-xs font-bold text-ink/50">Enquiry-Based</span>
                      <button
                        type="button"
                        onClick={() => openDeviceEnquiryModal({ device: "Dashcams" })}
                        className="bg-brand hover:bg-brand-deep text-white font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs"
                      >
                        Enquire Dashcam →
                      </button>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* 2. AIS-140 GPS Devices */}
            <Reveal variant="scale" delay={80}>
              <Tilt max={6}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand grid place-items-center mb-4 shadow-2xs">
                        <Radio className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-night">AIS-140 GPS Devices</h3>
                      <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                        MoRTH compliant commercial vehicle location tracking device (VLTD) with emergency panic button. Standalone hardware offering — NOT an insurance combination.
                      </p>
                      <div className="mt-4 pt-3 border-t border-ink/8 text-[11px] text-ink/60 space-y-1">
                        <div>• Certified government mandate compliance</div>
                        <div>• Platform &amp; M2M SIM subscription apply</div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-ink/8 flex items-center justify-between">
                      <span className="text-xs font-bold text-ink/50">Enquiry-Based</span>
                      <button
                        type="button"
                        onClick={() => openDeviceEnquiryModal({ device: "AIS-140 GPS Devices" })}
                        className="bg-brand hover:bg-brand-deep text-white font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs"
                      >
                        Enquire AIS-140 →
                      </button>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* 3. E-Locks */}
            <Reveal variant="scale" delay={160}>
              <Tilt max={6}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand grid place-items-center mb-4 shadow-2xs">
                        <Lock className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-night">Smart E-Locks</h3>
                      <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                        Heavy-duty electronic container padlocks with GPS tracking and unauthorized tamper alerts for high-value logistics transport.
                      </p>
                      <div className="mt-4 pt-3 border-t border-ink/8 text-[11px] text-ink/60 space-y-1">
                        <div>• Geofenced remote unlocking control</div>
                        <div>• IP67 weatherproof rugged casing</div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-ink/8 flex items-center justify-between">
                      <span className="text-xs font-bold text-ink/50">Enquiry-Based</span>
                      <button
                        type="button"
                        onClick={() => openDeviceEnquiryModal({ device: "E-Locks" })}
                        className="bg-brand hover:bg-brand-deep text-white font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs"
                      >
                        Enquire E-Lock →
                      </button>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* 4. Heat Sensors */}
            <Reveal variant="scale" delay={240}>
              <Tilt max={6}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand grid place-items-center mb-4 shadow-2xs">
                        <Thermometer className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-night">Cold Chain Heat Sensors</h3>
                      <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                        Temperature logging telemetry for refrigerated vaccine, dairy, and perishable food logistics with instant excursion warnings.
                      </p>
                      <div className="mt-4 pt-3 border-t border-ink/8 text-[11px] text-ink/60 space-y-1">
                        <div>• Proof of cold-chain audit compliance</div>
                        <div>• Centralized Command Center alerts</div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-ink/8 flex items-center justify-between">
                      <span className="text-xs font-bold text-ink/50">Enquiry-Based</span>
                      <button
                        type="button"
                        onClick={() => openDeviceEnquiryModal({ device: "Heat Sensors" })}
                        className="bg-brand hover:bg-brand-deep text-white font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs"
                      >
                        Enquire Sensor →
                      </button>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* 5. Fuel Rod Sensors */}
            <Reveal variant="scale" delay={320}>
              <Tilt max={6}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand grid place-items-center mb-4 shadow-2xs">
                        <Fuel className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-night">Fuel Rod Level Sensors</h3>
                      <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                        High-precision capacitive rods measuring diesel levels in truck tanks, detecting sudden theft and tracking accurate refueling volumes.
                      </p>
                      <div className="mt-4 pt-3 border-t border-ink/8 text-[11px] text-ink/60 space-y-1">
                        <div>• Instant pilferage alarm on sudden drop</div>
                        <div>• Sized to commercial tank depth</div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-ink/8 flex items-center justify-between">
                      <span className="text-xs font-bold text-ink/50">Enquiry-Based</span>
                      <button
                        type="button"
                        onClick={() => openDeviceEnquiryModal({ device: "Fuel Rod Sensors" })}
                        className="bg-brand hover:bg-brand-deep text-white font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs"
                      >
                        Enquire Fuel Rod →
                      </button>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* 6. GPS ID Cards */}
            <Reveal variant="scale" delay={400}>
              <Tilt max={6}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-6 shadow-xs flex flex-col justify-between h-full">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand grid place-items-center mb-4 shadow-2xs">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-night">GPS ID Cards</h3>
                      <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                        Compact wearable employee and child tracking cards with SOS panic button and geofencing for school staff and security personnel.
                      </p>
                      <div className="mt-4 pt-3 border-t border-ink/8 text-[11px] text-ink/60 space-y-1">
                        <div>• Direct SOS alert to emergency contacts</div>
                        <div>• Slim badge format with lanyard slot</div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-ink/8 flex items-center justify-between">
                      <span className="text-xs font-bold text-ink/50">Enquiry-Based</span>
                      <button
                        type="button"
                        onClick={() => openDeviceEnquiryModal({ device: "GPS ID Cards" })}
                        className="bg-brand hover:bg-brand-deep text-white font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs"
                      >
                        Enquire ID Card →
                      </button>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: CLAIM ASSISTANCE (WITH INTERACTIVE PROCESS RAIL & HOTLINES)
          ========================================================================= */}
      <section className="py-20 bg-white" id="claim-assistance">
        {/* Interactive Travelling Process Progress Rail */}
        <ProcessRail />

        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center mt-8">
          <Reveal variant="left">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Customer Support Desk</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-night mt-2 leading-tight">
                Insurance Claim Assistance Desk
              </h2>
              <p className="mt-4 text-sm text-ink/75 leading-relaxed">
                Facing an accident or vehicle damage? Our dedicated claims assistance desk guides you through every step: securing the scene, preparing a verified evidence dossier (dashcam footage and GPS speed logs), and coordinating with surveyors.
              </p>

              <div className="mt-6 space-y-3.5 text-xs sm:text-[13px] text-ink/80">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span><strong>Accident Protocol Checklist:</strong> Immediate instructions on FIR filing and photography.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span><strong>Telematics Evidence Dossier:</strong> Time-stamped speed, route, and impact logs for surveyors.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span><strong>Assistance Clarification:</strong> Insure Audit Expert provides documentation assistance. We are not the insurance underwriter and do not hold claim approval authority.</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.3}>
                  <Link
                    to="/claim-assistance"
                    className="sheen bg-brand hover:bg-brand-deep text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition inline-flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    Learn More About Claim Assistance <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <a
                    href="tel:08065604804"
                    className="bg-white border border-ink/15 text-night hover:bg-cloud font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition inline-flex items-center gap-2 shadow-2xs hover:shadow-xs"
                  >
                    <Phone className="w-4 h-4 text-brand" /> 08065604804
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>

          {/* Visual Protocol Card with Tilt */}
          <Reveal variant="right" delay={120}>
            <Tilt max={5}>
              <div className="bg-cloud/50 rounded-3xl border border-ink/8 p-8 space-y-4 shadow-sm">
                <h4 className="text-lg font-bold text-night">Immediate Guidance on Road:</h4>
                <div className="space-y-3.5 text-xs text-ink/75">
                  <div className="p-4 bg-white rounded-2xl border border-ink/6 shadow-2xs">
                    <strong className="text-night block mb-1">1. Preserve Video Footage:</strong>
                    Do not overwrite or remove the dashcam SD card until collision clips are safely exported to cloud or phone.
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-ink/6 shadow-2xs">
                    <strong className="text-night block mb-1">2. Note Third-Party Details:</strong>
                    Photograph the license plates and damage positions of all involved vehicles from multiple angles before moving.
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-ink/6 shadow-2xs">
                    <strong className="text-night block mb-1">3. Contact Support Immediately:</strong>
                    Notify our desk on 08065604804 or WhatsApp before moving the vehicle if a formal spot survey is required.
                  </div>
                </div>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: TESTIMONIALS AND TRUST (WITH GOLD RULE & TILT)
          ========================================================================= */}
      <section className="py-20 bg-cloud/40 border-y border-ink/8">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Client Feedback</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-night mt-1">
                Trusted by Vehicle Owners &amp; Fleets
              </h2>
              <GoldRule className="mt-4 w-32 mx-auto" />
              <p className="mt-4 text-sm text-ink/65 leading-relaxed">
                Genuine experiences from logistics managers, commercial transport owners, and private car owners across India.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            <Reveal variant="up" delay={0}>
              <Tilt max={5}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/8 p-7 shadow-xs h-full flex flex-col justify-between">
                    <div>
                      <div className="text-accent-yellow text-sm font-bold mb-3">★★★★★</div>
                      <p className="text-xs sm:text-sm text-ink/80 leading-relaxed italic">
                        "Having the dashcam footage was crucial when another vehicle reversed into our delivery tempo. The surveyor had zero ambiguity, and our claim moved without delay."
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-ink/8">
                      <span className="font-bold text-sm text-night block">Sanjay Verma</span>
                      <span className="text-[11px] text-ink/50">Logistics Fleet Owner, Gurugram</span>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            <Reveal variant="up" delay={100}>
              <Tilt max={5}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/8 p-7 shadow-xs h-full flex flex-col justify-between">
                    <div>
                      <div className="text-accent-yellow text-sm font-bold mb-3">★★★★★</div>
                      <p className="text-xs sm:text-sm text-ink/80 leading-relaxed italic">
                        "The policy audit revealed our commercial truck IDV was entered 30% below market value by our prior agent. Fixing it before renewal protected our asset completely."
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-ink/8">
                      <span className="font-bold text-sm text-night block">Manpreet Singh</span>
                      <span className="text-[11px] text-ink/50">Commercial Haulage Operator, Punjab</span>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            <Reveal variant="up" delay={200}>
              <Tilt max={5}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/8 p-7 shadow-xs h-full flex flex-col justify-between">
                    <div>
                      <div className="text-accent-yellow text-sm font-bold mb-3">★★★★★</div>
                      <p className="text-xs sm:text-sm text-ink/80 leading-relaxed italic">
                        "Clean zero wire-cutting installation on our school vans. The Command Center lets our transport desk confirm bus positions and arrival times with zero guesswork."
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-ink/8">
                      <span className="font-bold text-sm text-night block">Anita Deshmukh</span>
                      <span className="text-[11px] text-ink/50">Transport Coordinator, Delhi NCR</span>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: FAQS AND CONTACT (WITH SMOOTH ACCORDION & CONTACT CARDS)
          ========================================================================= */}
      <section className="py-20 bg-white" id="faqs">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          {/* FAQs Accordion */}
          <Reveal variant="left">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Got Questions?</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-night mt-1">
                Frequently Asked <DrawUnderline color="var(--brand)">Questions</DrawUnderline>
              </h2>
              <p className="mt-3 text-sm text-ink/65 leading-relaxed">
                Transparent answers regarding policy audits, dashcam hardware offers, software subscriptions, and claim support.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  {
                    q: "How does the Motor Insurance with Complimentary Dashcam offer work?",
                    a: "When you purchase an eligible motor insurance policy under our safety program, you receive one complimentary dashcam hardware device. The customer pays applicable software subscription charges and SIM connectivity charges for continuous cloud access and telematics. Terms and policy eligibility conditions apply.",
                  },
                  {
                    q: "Does installing a dashcam guarantee that my insurance claim will be approved?",
                    a: "No. A dashcam records objective video evidence of road incidents. This provides factual proof to support your version of events during surveyor investigation, but claim approval remains the sole authority of the licensed insurance underwriter under policy terms.",
                  },
                  {
                    q: "Is AIS-140 GPS part of an insurance bundle?",
                    a: "No. AIS-140 GPS devices are standalone safety and regulatory compliance offerings. They are not bundled with insurance policies and can be purchased and enquired about independently.",
                  },
                  {
                    q: "Can I buy devices without purchasing an insurance policy?",
                    a: "Yes. All six hardware devices (Dashcams, AIS-140 GPS, E-Locks, Heat Sensors, Fuel Rod Sensors, and GPS ID Cards) are available for standalone enquiry and purchase.",
                  },
                  {
                    q: "What software subscription charges apply to tracking devices?",
                    a: "Active GPS telematics, live map tracking, cloud dashcam backups, and automated SMS/WhatsApp alerts require active telematics platform servers and M2M SIM data connectivity. These are billed as periodic software subscriptions.",
                  },
                  {
                    q: "Which vehicle categories compare quotes instantly on Policybazaar?",
                    a: "Private Cars, Two-Wheelers / Bikes, and Commercial Goods Vehicles (GCV) compare quotes instantly across 20+ insurers via our licensed partner PBPartners. Other categories like Taxis and School Buses use our assisted quote desk.",
                  },
                  {
                    q: "What is Insure Audit Expert's role in claims?",
                    a: "Insure Audit Expert is an advisory, telematics, and risk management service provider. We assist with evidence dossiers, documentation checklists, and surveyor communication. We are not an underwriter and do not approve or pay out claims directly.",
                  },
                  {
                    q: "How do I access the Fleet Command Center?",
                    a: "Authorized enterprise fleet clients can access the Command Center directly at https://insureauditexpert.tech/command-center using their assigned fleet login credentials.",
                  },
                ].map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-cloud/40 rounded-2xl border border-ink/8 overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left font-bold text-xs sm:text-sm text-night flex items-center justify-between gap-3 cursor-pointer hover:bg-cloud/70 transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-brand shrink-0 transition-transform duration-300 ${
                          openFaqIndex === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-4 pb-4 pt-1 text-xs text-ink/75 leading-relaxed border-t border-ink/6 animate-reveal">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Contact Information & Hours */}
          <Reveal variant="right" delay={120}>
            <div className="space-y-6">
              <Tilt max={4}>
                <div className="bg-white rounded-3xl border border-ink/10 p-7 shadow-xs">
                  <h3 className="text-xl font-bold text-night mb-2">Speak to Our Expert Desk</h3>
                  <p className="text-xs text-ink/65 leading-relaxed mb-6">
                    Connect with our licensed advisors and hardware engineers for policy audits or enterprise telematics setups.
                  </p>

                  <div className="space-y-4 text-xs sm:text-sm">
                    <Magnetic strength={0.2} className="w-full">
                      <a
                        href="tel:08065604804"
                        className="flex items-center gap-3 p-3.5 rounded-2xl bg-cloud/50 hover:bg-cloud text-night transition font-bold w-full"
                      >
                        <Phone className="w-4 h-4 text-brand shrink-0" />
                        <div>
                          <span className="text-[11px] text-ink/50 uppercase font-bold block">Phone Numbers</span>
                          <span>08065604804 / 08065604805</span>
                        </div>
                      </a>
                    </Magnetic>

                    <Magnetic strength={0.2} className="w-full">
                      <a
                        href="https://wa.me/918700515288"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 transition font-bold w-full"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <span className="text-[11px] text-emerald-700 uppercase font-bold block">24x7 WhatsApp</span>
                          <span>+91 87005 15288</span>
                        </div>
                      </a>
                    </Magnetic>

                    <Magnetic strength={0.2} className="w-full">
                      <a
                        href="mailto:info@insureauditexpert.com"
                        className="flex items-center gap-3 p-3.5 rounded-2xl bg-cloud/50 hover:bg-cloud text-night transition font-bold w-full"
                      >
                        <Mail className="w-4 h-4 text-brand shrink-0" />
                        <div>
                          <span className="text-[11px] text-ink/50 uppercase font-bold block">Official Email</span>
                          <span className="break-all">info@insureauditexpert.com</span>
                        </div>
                      </a>
                    </Magnetic>

                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-cloud/50 text-night font-bold">
                      <Clock className="w-4 h-4 text-brand shrink-0" />
                      <div>
                        <span className="text-[11px] text-ink/50 uppercase font-bold block">Business Hours</span>
                        <span>Mon – Sat · 9:30 AM – 6:30 PM IST</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-cloud/50 text-night">
                      <MapPin className="w-4 h-4 text-brand shrink-0 mt-1" />
                      <div className="text-xs">
                        <span className="text-[11px] text-ink/50 uppercase font-bold block">New Delhi Office</span>
                        <a
                          href="https://www.google.com/maps/place/28%C2%B033'39.5%22N+77%C2%B011'31.7%22E/@28.5608467,77.1920417,20.64z/data=!4m4!3m3!8m2!3d28.5609581!4d77.1921258?hl=en&entry=ttu&g_ep=EgoyMDI2MDgzMS4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline font-semibold"
                        >
                          B-5/55, Safdarjung Enclave, New Delhi - 110029
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
