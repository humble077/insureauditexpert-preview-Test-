import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Cable, Check, Gauge, MapPin, Radio, ShieldCheck, Video, Zap, Smartphone } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { ScrollCinema } from "@/components/scroll-cinema";
import { InsureTrackAppShowcase, AppleAppStoreBadge, GooglePlayBadge } from "@/components/insure-track-showcase";
import { VIDEO, mp4 } from "@/lib/videos";
import { Parallax } from "@/lib/motion";
import svcFleet from "@/assets/svc-fleet.jpg";
import svcWhatsapp from "@/assets/svc-whatsapp.jpg";

const INSTALL_BEATS = [
  { stepNumber: "01", icon: Cable, kicker: "Step 01 · Fit", title: "Ek bhi wire nahi kati.", body: "Plug-based install, 30 minute mein. Manufacturer warranty poori tarah intact." },
  { stepNumber: "02", icon: Video, kicker: "Step 02 · Record", title: "Camera hamesha on.", body: "Loop recording, night vision aur event snapshots — har trip ka clean record." },
  { stepNumber: "03", icon: Radio, kicker: "Step 03 · Connect", title: "Mobile par live feed.", body: "Location, speed aur alerts seedha aapke phone par, real time." },
];

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/ai-dashcam-tracking")({
  head: () => ({
    meta: [
      { title: "AI Dashcam, G-Sensor & Zero Wiring-Cut Live Tracking | Insure Audit Expert" },
      { name: "description", content: "AI dashcam with G-sensor impact lock and smart live GPS tracking installed with zero wiring cut. Video evidence against false claims, real-time location, speed and harsh-driving alerts — independent technology offerings by Alxsure Tech Hub (OPC) Pvt Ltd." },
      { name: "keywords", content: "AI dashcam India, G-sensor dashcam, vehicle live tracking, zero wiring cut GPS tracker, false claim video evidence, car safety device, driver behaviour monitoring" },
      { property: "og:title", content: "AI Dashcam, G-Sensor & Zero Wiring-Cut Live Tracking" },
      { property: "og:description", content: "Video evidence, impact detection and live tracking — installed without cutting a single wire." },
      { property: "og:url", content: `${SITE_URL}/ai-dashcam-tracking` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ai-dashcam-tracking` }],
  }),
  component: TechPage,
});

const DASHCAM = [
  { icon: Video, t: "Continuous Loop Recording", d: "Full-HD front recording with night-vision clarity — number plates readable even in low light." },
  { icon: Zap, t: "G-Sensor Impact Lock", d: "Collision detect hote hi footage automatically lock ho jaata hai, overwrite nahi hoti — court aur surveyor ke liye clean evidence." },
  { icon: Camera, t: "Event Snapshots", d: "Harsh braking, sudden lane change aur impact events ke timestamped clips." },
  { icon: ShieldCheck, t: "False-Claim Defence", d: "Staged accidents aur fraudulent third-party claims ke against verifiable video record." },
];

const TRACKING = [
  { icon: MapPin, t: "Real-Time Location", d: "Live map view, trip history aur stoppage report — mobile par." },
  { icon: Cable, t: "Zero Wiring Cut Install", d: "Non-invasive installation. Vehicle ki original wiring harness cut nahi hoti, isliye manufacturer warranty aur electricals safe rehte hain." },
  { icon: Gauge, t: "Speed & Driving Alerts", d: "Over-speed, harsh acceleration aur rash braking ke instant alerts." },
  { icon: Radio, t: "Geo-Fence & Theft Alerts", d: "Defined zone se bahar jaate hi ya unusual ignition par notification." },
];

function TechPage() {
  return (
    <PageShell>
      <section className="bg-night text-white py-20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand/25 blur-3xl animate-aurora"/>
        <div className="absolute -bottom-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-accent-yellow/15 blur-3xl animate-aurora" style={{ animationDelay: "-8s" }}/>
        <div className="relative max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 border border-white/20 text-accent-yellow text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
              <Camera className="w-4 h-4"/> Pillars 01 &amp; 02 · Safety Technology
            </span>
            <h1 className="mt-6 text-[42px] sm:text-[56px] leading-[1.05] font-extrabold">
              AI Dashcam + Smart Tracking. <span className="italic text-accent-yellow">Zero wiring cut.</span>
            </h1>
            <p className="mt-5 text-white/80 text-[17px] leading-relaxed">
              Aapki gaadi ko ek silent witness milta hai. Har trip record hoti hai, har impact detect hota hai aur har location live dikhti hai — bina ek bhi wire kaate.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-accent-yellow text-night font-bold px-7 py-4 rounded-full hover:bg-white transition">
                Join Safety Membership <ArrowRight className="w-4 h-4"/>
              </Link>
              <Link to="/risk-audit" className="inline-flex items-center gap-2 border border-white/25 hover:bg-white/10 font-bold px-7 py-4 rounded-full transition">
                Request Free Risk Audit
              </Link>
            </div>
            <div className="mt-6 pt-6 border-t border-white/15 flex flex-wrap items-center gap-3">
              <span className="text-[12px] font-bold uppercase tracking-wider text-accent-yellow block w-full sm:w-auto">
                Insure Track App:
              </span>
              <GooglePlayBadge className="scale-90 origin-left" />
              <AppleAppStoreBadge className="scale-90 origin-left" />
            </div>
          </div>
          <Parallax speed={0.08}>
            <img src={svcFleet} alt="AI dashcam and live tracking device fitted in a vehicle" loading="lazy" className="rounded-3xl w-full h-[360px] object-cover shadow-2xl"/>
          </Parallax>
        </div>
      </section>

      <ScrollCinema
        sources={mp4(VIDEO.dashcam)}
        badge="Install Reel"
        beats={INSTALL_BEATS}
        ctaTo="/contact"
        ctaLabel="Installation book karein"
      />

      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-[32px] font-extrabold text-sweep">AI Dashcam &amp; G-Sensor</h2>
            <div className="mt-6 space-y-4">
              {DASHCAM.map((f) => (
                <div key={f.t} className="spin-border lift flex gap-4 bg-white border border-ink/8 rounded-2xl p-5 hover:border-brand transition">
                  <div className="w-11 h-11 rounded-xl bg-brand-soft grid place-items-center shrink-0"><f.icon className="w-5 h-5 text-brand"/></div>
                  <div>
                    <h3 className="font-bold text-night text-[16px]">{f.t}</h3>
                    <p className="mt-1 text-[13.5px] text-ink/65 leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-[32px] font-extrabold text-sweep">Smart Live Tracking</h2>
            <div className="mt-6 space-y-4">
              {TRACKING.map((f) => (
                <div key={f.t} className="spin-border lift flex gap-4 bg-white border border-ink/8 rounded-2xl p-5 hover:border-brand transition">
                  <div className="w-11 h-11 rounded-xl bg-accent-blue grid place-items-center shrink-0"><f.icon className="w-5 h-5 text-brand-deep"/></div>
                  <div>
                    <h3 className="font-bold text-night text-[16px]">{f.t}</h3>
                    <p className="mt-1 text-[13.5px] text-ink/65 leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INSURE TRACK APP DUAL-OS SHOWCASE */}
      <InsureTrackAppShowcase />

      <section className="bg-cloud py-20">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <img src={svcWhatsapp} alt="Live tracking and alerts on a mobile dashboard" loading="lazy" className="rounded-3xl w-full h-[320px] object-cover"/>
          <div>
            <h2 className="text-[32px] font-extrabold text-night">Why zero wiring cut matters</h2>
            <p className="mt-4 text-ink/70 leading-relaxed">
              Traditional trackers ke liye wiring harness cut ki jaati hai — jisse manufacturer warranty void ho sakti hai, electrical faults aa sakte hain aur resale value girti hai. Hamari installation plug-based aur reversible hai.
            </p>
            <ul className="mt-6 space-y-2.5 text-[14px] text-ink/70">
              {["Manufacturer warranty intact", "No electrical short-circuit risk", "Removable and transferable to another vehicle", "Installation in under 30 minutes", "Device remains our property under the Tech Membership"].map((x) => (
                <li key={x} className="flex items-start gap-2"><Check className="w-4 h-4 text-brand mt-0.5 shrink-0"/>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
