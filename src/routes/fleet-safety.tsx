import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Check, Gauge, ShieldCheck, Truck, Users, Wrench } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { ScrollCinema } from "@/components/scroll-cinema";
import { VIDEO, mp4 } from "@/lib/videos";
import svcCorporate from "@/assets/svc-corporate.jpg";

const FLEET_BEATS = [
  { stepNumber: "01", icon: Truck, kicker: "Pillar 01 · Live Fleet", title: "Poora fleet ek screen par.", body: "Har truck ki live location, halt aur route deviation — Delhi office se Chennai run tak." },
  { stepNumber: "02", icon: Gauge, kicker: "Pillar 02 · Driver Scores", title: "Driver behaviour measurable ho gaya.", body: "Over-speed, harsh braking aur night hours ka monthly scorecard, driver ke naam ke saath." },
  { stepNumber: "03", icon: ShieldCheck, kicker: "Pillar 03 · Claim Proof", title: "Highway accident? Footage ready.", body: "G-sensor clip lock hoti hai — third-party dispute mein aapki side ka verifiable proof." },
];

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/fleet-safety")({
  head: () => ({
    meta: [
      { title: "Fleet Safety & Risk Management Program India | Insure Audit Expert" },
      { name: "description", content: "Fleet safety program for transporters and corporates — AI dashcams, zero wiring-cut tracking, driver behaviour scoring, document compliance and policy audits across your entire fleet, from one dashboard." },
      { name: "keywords", content: "fleet safety program India, commercial vehicle tracking, driver behaviour monitoring, fleet risk management, transporter safety, fleet policy audit, truck dashcam India" },
      { property: "og:title", content: "Fleet Safety & Risk Management Program | Insure Audit Expert" },
      { property: "og:description", content: "One dashboard for dashcams, tracking, driver scores and policy audits across your fleet." },
      { property: "og:url", content: `${SITE_URL}/fleet-safety` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/fleet-safety` }],
  }),
  component: FleetSafetyPage,
});

const MODULES = [
  { icon: Truck, t: "Vehicle-Wise Safety File", d: "Har vehicle ka apna record — device status, audit findings, document expiry aur incident history." },
  { icon: Gauge, t: "Driver Behaviour Scoring", d: "Over-speeding, harsh braking, night-driving hours aur idling — monthly driver scorecard." },
  { icon: BarChart3, t: "Incident & Evidence Log", d: "G-sensor triggered clips ek jagah, taaki claim ya dispute ke waqt evidence turant available ho." },
  { icon: Wrench, t: "Document Compliance Tracker", d: "Fitness, permit, PUC, RC aur licence expiry ke advance alerts — challan aur claim rejection se bachav." },
  { icon: ShieldCheck, t: "Fleet-Wide Policy Audit", d: "Poore fleet ki policies ka consolidated audit — coverage gaps, IDV mismatch aur duplicate covers." },
  { icon: Users, t: "Dedicated Account Manager", d: "Ek single point of contact installation, training aur claim documentation support ke liye." },
];

const OUTCOMES = [
  { k: "-38%", v: "Harsh-braking events after 90 days of driver scoring" },
  { k: "-52%", v: "Disputed third-party claims where footage was available" },
  { k: "100%", v: "Fleet documents tracked with advance expiry alerts" },
  { k: "< 30 min", v: "Per-vehicle installation, zero wiring cut" },
];

function FleetSafetyPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-b from-brand-soft/60 to-paper py-20">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
              <Truck className="w-4 h-4"/> For Fleets &amp; Transporters
            </span>
            <h1 className="mt-6 text-[42px] sm:text-[54px] leading-[1.06] font-extrabold text-night">
              Har gaadi safe. Har driver <span className="italic text-brand">accountable.</span>
            </h1>
            <p className="mt-5 text-[17px] text-ink/70 leading-relaxed">
              Fleet chalane ka sabse bada risk unpredictability hai — false claims, rash driving aur expired documents. Hamara Fleet Safety Program in teeno ko measurable bana deta hai.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold px-7 py-4 rounded-full transition">
                Request Fleet Risk Audit <ArrowRight className="w-4 h-4"/>
              </Link>
              <Link to="/ai-dashcam-tracking" className="inline-flex items-center gap-2 border border-ink/15 hover:border-brand font-bold px-7 py-4 rounded-full transition">
                Explore Tech Features
              </Link>
            </div>
          </div>
          <img src={svcCorporate} alt="Fleet safety and vehicle risk management dashboard" loading="lazy" className="rounded-3xl w-full h-[380px] object-cover shadow-2xl"/>
        </div>
      </section>

      <ScrollCinema
        sources={mp4(VIDEO.fleet)}
        badge="Fleet Reel"
        beats={FLEET_BEATS}
        ctaTo="/contact"
        ctaLabel="Fleet audit book karein"
      />

      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <h2 className="text-[34px] sm:text-[42px] font-extrabold text-night text-center">Program modules</h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map((m) => (
              <div key={m.t} className="bg-white border border-ink/8 rounded-2xl p-6 hover:border-brand hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-xl bg-brand-soft grid place-items-center mb-4"><m.icon className="w-6 h-6 text-brand"/></div>
                <h3 className="text-[17px] font-bold text-night">{m.t}</h3>
                <p className="mt-2 text-[13.5px] text-ink/65 leading-relaxed">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night text-white py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <h2 className="text-[34px] sm:text-[42px] font-extrabold text-center">What fleets typically see</h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OUTCOMES.map((o) => (
              <div key={o.v} className="border border-white/12 rounded-2xl p-6 bg-white/[0.04]">
                <div className="text-[32px] font-extrabold text-accent-yellow leading-none">{o.k}</div>
                <div className="mt-3 text-[13px] text-white/70 leading-relaxed">{o.v}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-[12px] text-white/45 max-w-2xl mx-auto">
            Indicative figures based on program participants; actual results vary by fleet size, routes and driver profile.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-6 max-w-3xl">
          <h2 className="text-[30px] font-extrabold text-night">How enrolment works</h2>
          <ul className="mt-6 space-y-3 text-[14.5px] text-ink/70">
            {[
              "Share your fleet list — vehicle numbers, types and current policy copies.",
              "We complete a fleet-wide risk and policy audit and share a written report.",
              "Devices are installed vehicle by vehicle, with zero wiring cut, at your yard.",
              "Your team gets dashboard access, driver scorecards and monthly review calls.",
              "Where cover needs correcting, policies are arranged through our licensed insurance partners at standard insurance rates.",
            ].map((x) => (
              <li key={x} className="flex items-start gap-2"><Check className="w-4 h-4 text-brand mt-1 shrink-0"/>{x}</li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
