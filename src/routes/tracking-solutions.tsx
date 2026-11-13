import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Navigation,
  Bell,
  FileText,
  Fuel,
  Thermometer,
  Lock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Smartphone,
  Gauge,
  Radio,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { openDemoRequestModal } from "@/components/demo-request-dialog";
import { Reveal, Tilt, Magnetic, SplitText } from "@/lib/motion";
import { BlueprintField, DrawUnderline, CoverageMap, SignalRings, Spotlight } from "@/components/graphics";
import { KineticMatrixGrid, IncidentShockwaveSimulator, GpsMotionPathReplay } from "@/components/anime-kinetic";
import { FleetRoiCalculator } from "@/components/interactive-showcase";
import { InsureTrackAppShowcase } from "@/components/insure-track-showcase";
import svcFleet from "@/assets/svc-fleet.jpg";

export const Route = createFileRoute("/tracking-solutions")({
  head: () => ({
    meta: [
      { title: "Fleet Tracking Software & Command Center | Insure Audit Expert" },
      {
        name: "description",
        content:
          "Enterprise Fleet Tracking Software & Command Center portal. Real-time GPS vehicle tracking, route history, fuel pilferage alerts, cold chain temperature monitoring, and electronic lock audits.",
      },
      {
        name: "keywords",
        content:
          "fleet tracking software India, command center fleet tracking, GPS vehicle monitoring, fuel level monitoring sensors, cold chain temperature alerts, smart e-lock fleet",
      },
    ],
  }),
  component: TrackingSolutionsPage,
});

const FEATURES = [
  {
    icon: Navigation,
    title: "Real-Time Vehicle Tracking",
    desc: "Live sub-second GPS telemetry showing exact location, instantaneous speed, heading, and ignition status across your entire vehicle fleet.",
  },
  {
    icon: LayoutDashboard,
    title: "Centralized Fleet Monitoring",
    desc: "Interactive multi-map command view grouping vehicles by depot, route, operational status (moving, idling, parked, offline), or geofence.",
  },
  {
    icon: Radio,
    title: "Location History & Playback",
    desc: "Up to 90 days of animated historical route playback with detailed turn-by-turn timestamps, halt durations, and route deviation tags.",
  },
  {
    icon: Gauge,
    title: "Device Management & Health",
    desc: "Live diagnostics of hardware health, internal battery voltage, external power supply integrity, SIM network connectivity, and tamper triggers.",
  },
  {
    icon: Bell,
    title: "Instant Alerts & Notifications",
    desc: "Automated real-time notifications on WhatsApp, SMS, and App for over-speeding, geofence breaches, towing attempts, and sudden emergency panic alarms.",
  },
  {
    icon: FileText,
    title: "Automated Compliance Reports",
    desc: "Daily trip summaries, idling waste analysis, driver behavior scorecards, and statutory RTO fitness compliance logs exportable in Excel and PDF.",
  },
  {
    icon: Fuel,
    title: "Fuel Rod Level Monitoring",
    desc: "Continuous capacitive fuel rod telemetry detecting sudden drainage (pilferage alerts) and fuel refueling logs with accurate volume timestamps.",
  },
  {
    icon: Thermometer,
    title: "Cold Chain Temperature Monitoring",
    desc: "Refrigerated transport sensors with continuous temperature logging and excursion alerts for pharmaceutical and perishable consignments.",
  },
  {
    icon: Lock,
    title: "Smart E-Lock Monitoring",
    desc: "Cargo container electronic lock tracking with unauthorized seal breach alerts, tamper detection, and verified geofenced unlocking protocols.",
  },
];

function TrackingSolutionsPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-gradient-to-b from-night via-night/95 to-ink text-white py-16 lg:py-24 relative overflow-hidden">
        <BlueprintField tone="dark" />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column (col-span-7) */}
            <div className="lg:col-span-7">
              <Reveal variant="up">
                <div className="inline-flex items-center gap-2 bg-brand/20 text-accent-yellow border border-brand/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                  <Sparkles className="w-4 h-4" /> Enterprise Fleet Telematics
                </div>
                <h1 className="text-[34px] sm:text-[50px] font-extrabold leading-[1.08] tracking-tight text-white">
                  <SplitText text="Intelligent Fleet Tracking &" delay={40} stagger={22} className="block" />
                  <DrawUnderline color="var(--brand)">
                    <span className="text-brand inline-block">
                      <SplitText text="Command Center" delay={320} stagger={22} />
                    </span>
                  </DrawUnderline>
                </h1>
                <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
                  Empower your transport logistics with real-time telematics, driver scoring, fuel pilferage defense, and cold chain safety — all visible on a single enterprise dashboard.
                </p>
              </Reveal>

              {/* Telematics Staggered Pulse Matrix */}
              <Reveal variant="up" delay={80}>
                <div className="mt-6 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-lg">
                  <KineticMatrixGrid tone="dark" rows={4} cols={14} />
                </div>
              </Reveal>

              <Reveal variant="up" delay={120}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Magnetic strength={0.3}>
                    <a
                      href="https://insureauditexpert.tech/command-center"
                      target="_blank"
                      rel="noreferrer"
                      className="sheen inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold text-sm px-7 py-4 rounded-xl shadow-xl transition cursor-pointer"
                    >
                      Access Command Center <ExternalLink className="w-4 h-4" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.3}>
                    <button
                      type="button"
                      onClick={() => openDemoRequestModal()}
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-4 rounded-xl border border-white/20 transition cursor-pointer"
                    >
                      Request a Live Demo →
                    </button>
                  </Magnetic>
                </div>
              </Reveal>
            </div>

            {/* Right Column (col-span-5): High-Tech Command Telemetry Cockpit */}
            <div className="lg:col-span-5">
              <Reveal variant="right" delay={140}>
                <Tilt max={5} className="w-full">
                  <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md p-5 shadow-2xl relative overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                          Telemetry Satellite Uplink
                        </span>
                      </div>
                      <SignalRings label="LIVE 5S" />
                    </div>

                    {/* Fleet Imagery with Live HUD Overlays */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 mb-4 bg-night">
                      <img
                        src={svcFleet}
                        alt="Fleet Intelligence & Command Center"
                        className="w-full h-full object-cover ken-burns opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/35 to-transparent" />

                      {/* HUD Top Coordinates */}
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/15 rounded-lg px-2.5 py-1 text-[11px] font-mono text-accent-yellow flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 animate-pulse" />
                        <span>LAT 28.5708° N · LON 77.1950° E</span>
                      </div>

                      {/* HUD Bottom Status Banner */}
                      <div className="absolute bottom-3 left-3 right-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 text-xs flex items-center justify-between">
                        <div>
                          <span className="font-bold text-white block">Commercial Haulage #DL-01-4426</span>
                          <span className="text-[11px] text-white/60 font-mono">Speed: 64 km/h · Heading: NH44 North</span>
                        </div>
                        <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Active Loop
                        </span>
                      </div>
                    </div>

                    {/* 3 Live Telemetry Sensor Tiles */}
                    <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                        <span className="text-[10px] text-white/50 uppercase block">CANbus Sync</span>
                        <span className="text-xs font-bold text-emerald-400 mt-0.5 block">0 Wire-Cut</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                        <span className="text-[10px] text-white/50 uppercase block">Reefer Probe</span>
                        <span className="text-xs font-bold text-blue-400 mt-0.5 block">-18.2°C</span>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                        <span className="text-[10px] text-white/50 uppercase block">Fuel Rod</span>
                        <span className="text-xs font-bold text-accent-yellow mt-0.5 block">84% Secure</span>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-white/10">
            <Reveal variant="up" delay={0}>
              <div>
                <span className="text-xs text-white/60 font-semibold block">Refresh Telemetry</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block">Live 5s GPS</span>
              </div>
            </Reveal>
            <Reveal variant="up" delay={80}>
              <div>
                <span className="text-xs text-white/60 font-semibold block">Wiring Safety</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-brand mt-1 block">Zero Wire-Cut</span>
              </div>
            </Reveal>
            <Reveal variant="up" delay={160}>
              <div>
                <span className="text-xs text-white/60 font-semibold block">History Log</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block">90 Days Replay</span>
              </div>
            </Reveal>
            <Reveal variant="up" delay={240}>
              <div>
                <span className="text-xs text-white/60 font-semibold block">Command Portal</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-accent-yellow mt-1 block">Web &amp; App</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Verified Capabilities Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Verified Capabilities</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-night mt-1">
                Complete Visibility Across <DrawUnderline color="var(--brand)">Every Mile</DrawUnderline>
              </h2>
              <p className="mt-2 text-sm text-ink/65">
                Features engineered for fleet owners, logistics directors, school transport coordinators, and cold-chain operators.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <Reveal key={i} variant="scale" delay={i * 60}>
                <Tilt max={6}>
                  <Spotlight className="h-full rounded-3xl">
                    <div className="lift bg-cloud/40 rounded-3xl border border-ink/8 p-6 flex flex-col justify-between h-full hover:border-brand/40 transition">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-white border border-ink/8 text-brand grid place-items-center mb-4 shadow-2xs">
                          <f.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-night leading-snug">{f.title}</h3>
                        <p className="mt-2.5 text-xs text-ink/70 leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  </Spotlight>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Command Center Showcase Section */}
      <section className="py-20 bg-cloud/50 border-y border-ink/8 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal variant="left">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Live Cloud Platform</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-night mt-2 leading-tight">
                Enterprise Command Center at Your Fingertips
              </h2>
              <p className="mt-4 text-sm text-ink/75 leading-relaxed">
                Log in to the dedicated Insure Audit Expert Command Center web platform to manage your active vehicles, configure geofenced delivery hubs, generate fuel reports, and monitor live driver safety indicators.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-ink/80">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span><strong>Multi-Tenant Fleet Grouping:</strong> Segment vehicles by operating city, contractor, or delivery branch.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span><strong>Automated Geofence Triggers:</strong> Receive entry, dwell-time, and departure timestamps at loading bays.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span><strong>Trip Scorecards:</strong> Harsh braking, sudden acceleration, and idling detection to optimize fuel efficiency.</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.3}>
                  <a
                    href="https://insureauditexpert.tech/command-center"
                    target="_blank"
                    rel="noreferrer"
                    className="sheen bg-night hover:bg-brand text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition inline-flex items-center gap-2 shadow-md"
                  >
                    Access Command Center Portal <ExternalLink className="w-4 h-4" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <button
                    type="button"
                    onClick={() => openDemoRequestModal()}
                    className="bg-white border border-ink/15 text-night hover:bg-cloud font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition cursor-pointer"
                  >
                    Schedule Guided Walkthrough
                  </button>
                </Magnetic>
              </div>
            </div>
          </Reveal>

          {/* Graphical Mockup of Command Center */}
          <Reveal variant="right" delay={120}>
            <Tilt max={6}>
              <div className="bg-night rounded-3xl p-6 border border-white/15 shadow-2xl text-white">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold tracking-wider text-white/90">
                      COMMAND CENTER · FLEET LIVE
                    </span>
                  </div>
                  <SignalRings label="LIVE" />
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">Vehicle #DL-01-AB-4426</span>
                      <span className="text-[11px] text-white/60">GCV Haulage · NH44 Corridor</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-bold block">Moving 58 km/h</span>
                      <span className="text-[11px] text-white/50">Fuel: 82% · Temp: -18°C</span>
                    </div>
                  </div>

                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">School Bus #UP-16-BX-1029</span>
                      <span className="text-[11px] text-white/60">Delhi NCR Route #4 · AIS-140</span>
                    </div>
                    <div className="text-right">
                      <span className="text-accent-yellow font-bold block">Halt at School Gate</span>
                      <span className="text-[11px] text-white/50">Speed: 0 km/h · Doors Open</span>
                    </div>
                  </div>

                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">Cargo Container #HR-55-CK-8812</span>
                      <span className="text-[11px] text-white/60">Smart E-Lock · Secure Transit</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-bold block">Seal Locked</span>
                      <span className="text-[11px] text-white/50">Geofence Safe Zone</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 text-center">
                  <span className="text-[11px] text-white/60">
                    Direct URL:{" "}
                    <a
                      href="https://insureauditexpert.tech/command-center"
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent-yellow underline"
                    >
                      https://insureauditexpert.tech/command-center
                    </a>
                  </span>
                </div>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* Interactive G-Impact Shockwave & Video Lock Simulator */}
      <section className="py-16 bg-white border-b border-ink/8">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="mb-6 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                Interactive Telematics Physics · Real-Time G-Sensor Telemetry
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-night mt-1">
                Simulate CANbus Deceleration &amp; Video Evidence Lock
              </h3>
              <p className="text-xs sm:text-sm text-ink/70 mt-1 max-w-2xl">
                Experience how instant G-force threshold breaches trigger concentric shockwave alerts, decelerate telemetry, and lock continuous loop video evidence to protect your commercial drivers and claims.
              </p>
            </div>
            <IncidentShockwaveSimulator />
          </Reveal>
        </div>
      </section>

      {/* Interactive Fleet ROI & Fuel Savings Calculator (Samsara Benchmark) */}
      <section className="py-16 bg-cloud/40 border-b border-ink/8">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <FleetRoiCalculator />
          </Reveal>
        </div>
      </section>

      {/* SHOWSTOPPER: SVG Motion Path Corridor & 90-Day Trip Replay Simulator */}
      <section className="py-20 bg-white border-b border-ink/8 relative overflow-hidden" id="route-replay">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                Interactive Highway Corridor · Real-Time GPS Route Telemetry
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-night mt-1">
                90-Day GPS Route Replay &amp; <DrawUnderline color="var(--brand)">Round-Trip Telemetry</DrawUnderline>
              </h2>
              <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                Experience full 972 KM round-trip corridor replay (Delhi Depot → Mumbai Port → Delhi Depot), waypoint geofences, live speed telemetry, and automatic cycle completion lock.
              </p>
            </div>
            <GpsMotionPathReplay />
          </Reveal>
        </div>
      </section>

      {/* Enterprise Fleet Pilot & Live Corridor Dispatch Console */}
      <section className="py-20 bg-night text-white border-y border-white/10 relative overflow-hidden">
        <BlueprintField tone="dark" />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <Reveal variant="left">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-yellow bg-accent-yellow/10 border border-accent-yellow/30 px-3.5 py-1 rounded-full mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> Enterprise Onboarding &amp; SLA
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  Deploy Telematics Across Your Fleet in <span className="text-accent-yellow">Under 48 Hours</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed max-w-xl">
                  From single-depot commercial transporters to pan-India logistics networks — get zero wire-cut tracking, automated driver risk scorecards, and live fuel security without disrupting daily operations.
                </p>

                <div className="mt-8 grid sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <span className="text-xl font-extrabold text-brand block">&lt; 30 Mins</span>
                    <span className="text-xs text-white/80 font-medium mt-1 block">Plug &amp; Play Setup</span>
                    <span className="text-[11px] text-white/50 mt-1 block">Zero wire-cutting, OEM warranty 100% safe.</span>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <span className="text-xl font-extrabold text-accent-yellow block">AIS-140</span>
                    <span className="text-xs text-white/80 font-medium mt-1 block">Govt &amp; RTO Certified</span>
                    <span className="text-[11px] text-white/50 mt-1 block">Statutory compliance for state &amp; national permits.</span>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <span className="text-xl font-extrabold text-emerald-400 block">24x7 SLA</span>
                    <span className="text-xs text-white/80 font-medium mt-1 block">Incident Support Desk</span>
                    <span className="text-[11px] text-white/50 mt-1 block">Direct assistance for dispute and claim evidence.</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Magnetic strength={0.3}>
                    <button
                      type="button"
                      onClick={() => openDemoRequestModal()}
                      className="sheen bg-brand hover:bg-brand-deep text-white font-bold text-xs sm:text-sm px-7 py-4 rounded-xl transition cursor-pointer shadow-lg inline-flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-accent-yellow" /> Request 30-Day Fleet Pilot
                    </button>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <a
                      href="tel:08065604804"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 px-6 py-4 rounded-xl border border-white/20 transition"
                    >
                      Speak with Fleet Engineer: 08065604804
                    </a>
                  </Magnetic>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Live Simulated Dispatch Hub Status */}
            <div className="lg:col-span-5">
              <Reveal variant="right" delay={120}>
                <Tilt max={5}>
                  <div className="rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-6 shadow-2xl font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-bold text-white tracking-wider uppercase text-[11px]">
                          Corridor Dispatch Telemetry
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        ALL SENSORS NORMAL
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between text-white font-bold mb-1">
                          <span>Delhi → Mumbai Freight #DL-01-4426</span>
                          <span className="text-emerald-400">58 KM/H</span>
                        </div>
                        <div className="text-[11px] text-white/60 flex items-center justify-between">
                          <span>NH44 Near Jaipur Toll</span>
                          <span className="text-accent-yellow">Fuel: 86% · Rod OK</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between text-white font-bold mb-1">
                          <span>Cold-Chain Reefer #HR-55-9012</span>
                          <span className="text-blue-400">-18.4°C</span>
                        </div>
                        <div className="text-[11px] text-white/60 flex items-center justify-between">
                          <span>Kundli Industrial Cargo Hub</span>
                          <span className="text-emerald-400">Digital Lock Engaged</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-center justify-between text-white font-bold mb-1">
                          <span>Urban Transit Bus #UP-16-1029</span>
                          <span className="text-accent-yellow">0 KM/H</span>
                        </div>
                        <div className="text-[11px] text-white/60 flex items-center justify-between">
                          <span>Noida Sec 62 Depot Halt</span>
                          <span className="text-white/50">AIS-140 SOS Healthy</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                      <span>Live Telematics Sync</span>
                      <span className="text-emerald-400 font-bold">5s Polling Interval</span>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWSTOPPER: Interactive Mobile App Telematics Simulator */}
      <section className="py-12 bg-cloud/30">
        <InsureTrackAppShowcase />
      </section>
    </PageShell>
  );
}
