import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bell, Bus, Check, Eye, MapPin, ShieldCheck, UserCheck } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { ScrollCinema } from "@/components/scroll-cinema";
import { VIDEO, mp4 } from "@/lib/videos";
import svcClaim from "@/assets/svc-claim.jpg";

const BUS_BEATS = [
  { stepNumber: "01", icon: Bus, kicker: "Pillar 01 · Pick-up Alerts", title: "Bus nikli — parents ko pata chal gaya.", body: "Har stop par arrival aur departure notification, bina transport desk ko call kiye." },
  { stepNumber: "02", icon: MapPin, kicker: "Pillar 02 · Route Fence", title: "Route se hatte hi alert.", body: "Geo-fenced approved route. Deviation hote hi school admin ko instant notification." },
  { stepNumber: "03", icon: Eye, kicker: "Pillar 03 · Incident Record", title: "Har incident recorded.", body: "AI dashcam evidence with G-sensor impact lock — disputed claims ke against solid proof." },
];

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/school-bus-safety")({
  head: () => ({
    meta: [
      { title: "School Bus & Child Safety Program India | Insure Audit Expert" },
      { name: "description", content: "School bus safety program with AI dashcam, zero wiring-cut live tracking, route geo-fencing, driver verification and parent alerts — plus a full audit of the school's vehicle policies and statutory compliance." },
      { name: "keywords", content: "school bus safety India, school bus GPS tracking, child safety vehicle, school transport compliance, parent tracking app, school bus dashcam, student transport audit" },
      { property: "og:title", content: "School Bus & Child Safety Program | Insure Audit Expert" },
      { property: "og:description", content: "Live tracking, dashcam evidence, driver verification and parent alerts for school transport." },
      { property: "og:url", content: `${SITE_URL}/school-bus-safety` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/school-bus-safety` }],
  }),
  component: SchoolBusPage,
});

const FEATURES = [
  { icon: MapPin, t: "Route Geo-Fencing", d: "Approved route se deviation hote hi school admin ko instant alert." },
  { icon: Bell, t: "Pick-Up & Drop Alerts", d: "Bus arrival aur departure ke notifications parents aur transport in-charge ko." },
  { icon: Eye, t: "AI Dashcam Evidence", d: "Front-facing recording with G-sensor impact lock — incidents ka verifiable record." },
  { icon: UserCheck, t: "Driver Verification File", d: "Licence validity, badge, medical fitness aur police verification documents tracked with expiry alerts." },
  { icon: Bus, t: "Vehicle Fitness Compliance", d: "Fitness certificate, permit, PUC aur speed-governor status ka running compliance sheet." },
  { icon: ShieldCheck, t: "School Policy Audit", d: "School ki bus policies, passenger liability aur student cover ka professional audit." },
];

function SchoolBusPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-b from-accent-yellow/25 to-paper py-20">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
              <Bus className="w-4 h-4"/> For Schools &amp; Transport Contractors
            </span>
            <h1 className="mt-6 text-[42px] sm:text-[54px] leading-[1.06] font-extrabold text-night">
              Bachche bus mein hain — aur aap <span className="italic text-brand">har minute</span> dekh sakte hain.
            </h1>
            <p className="mt-5 text-[17px] text-ink/70 leading-relaxed">
              School transport mein sabse badi zimmedari visibility ki hai. Hamara program bus ko trackable, driver ko accountable aur har incident ko documented bana deta hai.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold px-7 py-4 rounded-full transition">
                Book a School Safety Audit <ArrowRight className="w-4 h-4"/>
              </Link>
              <Link to="/ai-dashcam-tracking" className="inline-flex items-center gap-2 border border-ink/15 hover:border-brand font-bold px-7 py-4 rounded-full transition">
                Explore Tech Features
              </Link>
            </div>
          </div>
          <img src={svcClaim} alt="School bus safety and child transport monitoring" loading="lazy" className="rounded-3xl w-full h-[380px] object-cover shadow-2xl"/>
        </div>
      </section>

      <ScrollCinema
        sources={mp4(VIDEO.school)}
        badge="Morning Route"
        beats={BUS_BEATS}
        ctaTo="/contact"
        ctaLabel="School safety audit book karein"
      />

      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <h2 className="text-[34px] sm:text-[42px] font-extrabold text-night text-center">Program mein kya milta hai</h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.t} className="bg-white border border-ink/8 rounded-2xl p-6 hover:border-brand hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-xl bg-brand-soft grid place-items-center mb-4"><f.icon className="w-6 h-6 text-brand"/></div>
                <h3 className="text-[17px] font-bold text-night">{f.t}</h3>
                <p className="mt-2 text-[13.5px] text-ink/65 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cloud py-20">
        <div className="max-w-[1240px] mx-auto px-6 max-w-3xl">
          <h2 className="text-[30px] font-extrabold text-night">Why schools choose the program</h2>
          <ul className="mt-6 space-y-3 text-[14.5px] text-ink/70">
            {[
              "Installation with zero wiring cut — bus warranty and electricals stay untouched.",
              "Documented driver and vehicle compliance file for every bus, ready for inspection.",
              "Impact-locked footage that protects the school against disputed accident claims.",
              "Parent-facing alerts that reduce daily phone calls to the transport desk.",
              "Insurance for buses arranged through licensed partners at standard insurance rates.",
            ].map((x) => (
              <li key={x} className="flex items-start gap-2"><Check className="w-4 h-4 text-brand mt-1 shrink-0"/>{x}</li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
