import { useState, useRef, useEffect, useCallback } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  TrendingDown,
  Fuel,
  Truck,
  Sliders,
  Car,
  Camera,
  Navigation,
  Lock,
  Bike,
  Building2,
  Gauge,
  HelpCircle,
} from "lucide-react";
import { openQuoteModal } from "./quote-dialog";
import { openDeviceEnquiryModal } from "./device-enquiry-dialog";
import { openDemoRequestModal } from "./demo-request-dialog";
import { Tilt } from "@/lib/motion";

/* =========================================================================
   FEATURE 1: INTERACTIVE "WORD VS. EVIDENCE" CLAIM SPLIT SLIDER
   ========================================================================= */
export function ClaimEvidenceSlider({ className = "" }: { className?: string }) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDraggingState, setIsDraggingState] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(Math.round(pct));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    setIsDraggingState(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handlePointerUp = () => {
      isDragging.current = false;
      setIsDraggingState(false);
    };
    const handlePointerMove = (e: globalThis.PointerEvent) => {
      if (!isDragging.current) return;
      handleMove(e.clientX);
    };

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handleMove]);

  return (
    <div className={`relative ${className}`}>
      {/* Slider instructions & quick toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-xs">
        <span className="font-mono text-ink/65 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-brand" /> Drag handle to compare claim outcomes:
        </span>
        <div className="flex items-center gap-1.5 font-mono">
          <button
            type="button"
            onClick={() => setSliderPos(100)}
            className={`px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${
              sliderPos >= 75
                ? "bg-red-500 text-white font-bold shadow-sm"
                : "bg-ink/5 hover:bg-ink/10 text-ink/70"
            }`}
          >
            Without Dashcam
          </button>
          <button
            type="button"
            onClick={() => setSliderPos(50)}
            className={`px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${
              sliderPos > 25 && sliderPos < 75
                ? "bg-brand text-white font-bold shadow-sm"
                : "bg-ink/5 hover:bg-ink/10 text-ink/70"
            }`}
          >
            50/50 Split
          </button>
          <button
            type="button"
            onClick={() => setSliderPos(0)}
            className={`px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${
              sliderPos <= 25
                ? "bg-emerald-600 text-white font-bold shadow-sm"
                : "bg-ink/5 hover:bg-ink/10 text-ink/70"
            }`}
          >
            With Evidence
          </button>
        </div>
      </div>

      {/* Main interactive split stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className="relative h-[420px] sm:h-[460px] rounded-3xl overflow-hidden border-2 border-ink/10 shadow-xl cursor-ew-resize select-none bg-night"
      >
        {/* RIGHT LAYER: With Insure Audit Expert AI Dashcam (Evidence) */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-night to-night-deep text-white p-5 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-end gap-2 sm:gap-3 border-b border-white/10 pb-3 sm:pb-4 ml-auto">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  With AI Dashcam Evidence
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                1080p Telematics Stamped
              </span>
            </div>

            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-3.5 max-w-[280px] sm:max-w-sm md:max-w-md ml-auto text-right">
              <div className="inline-block text-left bg-emerald-500/10 border border-emerald-500/30 p-3 sm:p-4 rounded-2xl w-full">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs sm:text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Uncontested Surveyor Assessment</span>
                </div>
                <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed">
                  Timestamped dashcam video locks exact right-of-way, braking timeline, and vehicle speed (54 km/h), invalidating false third-party allegations.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left text-xs font-mono">
                <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] text-white/50 block">Arbitrary Deduction</span>
                  <span className="text-emerald-400 font-extrabold text-sm sm:text-base">0% Zero Cut</span>
                </div>
                <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] text-white/50 block">Claim Clearance</span>
                  <span className="text-emerald-400 font-extrabold text-sm sm:text-base">48–72 Hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3 sm:pt-4 flex items-center justify-end gap-3 text-[11px] sm:text-xs text-white/60 ml-auto">
            <span className="hidden sm:inline">Evidence Dossier Sealed: GPS + G-Sensor Vector</span>
            <span className="text-emerald-300 font-bold">Standard IRDAI Eligible Policy</span>
          </div>
        </div>

        {/* LEFT LAYER (CLIPPED): Standard Claim Without Dashcam (Word against word) */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-red-950/95 via-night/95 to-ink text-white p-5 sm:p-8 flex flex-col justify-between ${
            isDraggingState ? "" : "transition-[clip-path] duration-300 ease-out"
          }`}
          style={{
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
          }}
        >
          <div>
            <div className="flex items-center justify-start gap-2 sm:gap-3 border-b border-white/10 pb-3 sm:pb-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <AlertTriangle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-red-400 shrink-0" />
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                  Without Dashcam (Word Against Word)
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 whitespace-nowrap">
                Disputed Liability
              </span>
            </div>

            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-3.5 max-w-[280px] sm:max-w-sm md:max-w-md">
              <div className="bg-red-500/10 border border-red-500/30 p-3 sm:p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-red-300 font-bold text-xs sm:text-sm mb-1">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Contributory Negligence Deduction</span>
                </div>
                <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed">
                  Third party falsely claims rash driving. Without objective video evidence, insurance surveyor levies arbitrary 50% fault deduction on own-damage repair.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] text-white/50 block">Surveyor Deduction</span>
                  <span className="text-red-400 font-extrabold text-sm sm:text-base">Up to 50% Cut</span>
                </div>
                <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] text-white/50 block">Settlement Dispute</span>
                  <span className="text-red-400 font-extrabold text-sm sm:text-base">35–60 Days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3 sm:pt-4 flex items-center justify-between text-[11px] sm:text-xs text-white/60">
            <span>Result: Unnecessary out-of-pocket loss</span>
            <span className="text-red-300 font-bold hidden sm:inline">Unverified Verbal Claim</span>
          </div>
        </div>

        {/* DRAGGABLE DIVIDER HANDLE */}
        <div
          className={`absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none ${
            isDraggingState ? "" : "transition-all duration-300 ease-out"
          }`}
          style={{
            left: `${sliderPos}%`,
            opacity: sliderPos === 0 || sliderPos === 100 ? 0.4 : 1,
          }}
        >
          <div
            className="absolute top-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-night font-bold shadow-2xl border-2 border-brand flex items-center justify-center cursor-ew-resize pointer-events-auto hover:scale-110 active:scale-95 transition-transform"
            style={{
              transform: `translate(${sliderPos <= 3 ? "0%" : sliderPos >= 97 ? "-100%" : "-50%"}, -50%)`,
            }}
            title="Drag left/right to compare claim outcomes"
          >
            <Sliders className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-brand rotate-90" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   FEATURE 2: INTERACTIVE FLEET ROI & TELEMATICS SAVINGS CALCULATOR
   ========================================================================= */
export function FleetRoiCalculator({ className = "" }: { className?: string }) {
  const [fleetSize, setFleetSize] = useState(15);
  const [fuelPerVehicle, setFuelPerVehicle] = useState(55000); // INR per month
  const [hasFuelRod, setHasFuelRod] = useState(true);
  const [hasRouteOptimize, setHasRouteOptimize] = useState(true);

  // Fuel rod drain detection + idling alert saves ~8-12% of monthly fuel
  const fuelSavingsRate = (hasFuelRod ? 0.085 : 0) + (hasRouteOptimize ? 0.035 : 0);
  const monthlyFuelSaved = Math.round(fleetSize * fuelPerVehicle * fuelSavingsRate);
  const annualFuelSaved = monthlyFuelSaved * 12;

  // Reduced disputed accident liability estimate per year (avg 1 major dispute per 10 trucks)
  const annualClaimProtection = Math.round(fleetSize * 18000);

  return (
    <div
      className={`rounded-3xl border border-ink/10 bg-gradient-to-br from-white via-cloud/30 to-brand-soft/40 p-6 sm:p-10 shadow-xl ${className}`}
    >
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        {/* Left column: Interactive Sliders */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand">
              Financial Payback Simulator · Samsara Benchmark
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-night mt-1">
              Calculate Your Fleet &amp; Fuel Savings
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed">
              Adjust your commercial fleet size and average diesel spend. Telematics fuel rod sensors and G-sensor dashcams actively curtail unauthorized fuel siphoning and frivolous accident claims.
            </p>
          </div>

          {/* Slider 1: Fleet Size */}
          <div className="bg-white rounded-2xl p-5 border border-ink/8 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="fleet-size-slider" className="text-xs font-bold text-night flex items-center gap-2">
                <Truck className="w-4 h-4 text-brand" /> Active Vehicles in Fleet:
              </label>
              <span className="text-lg font-extrabold font-mono text-brand tabular-nums">
                {fleetSize} Vehicles
              </span>
            </div>
            <input
              id="fleet-size-slider"
              type="range"
              min="5"
              max="200"
              step="5"
              value={fleetSize}
              onChange={(e) => setFleetSize(Number(e.target.value))}
              className="w-full accent-brand cursor-pointer h-2 bg-ink/10 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-ink/40 font-mono mt-1">
              <span>5 (Small Haulage)</span>
              <span>50 (Regional Hub)</span>
              <span>200+ (Enterprise)</span>
            </div>
          </div>

          {/* Slider 2: Monthly Fuel Spend */}
          <div className="bg-white rounded-2xl p-5 border border-ink/8 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="fuel-spend-slider" className="text-xs font-bold text-night flex items-center gap-2">
                <Fuel className="w-4 h-4 text-amber-500" /> Avg. Monthly Fuel / Vehicle:
              </label>
              <span className="text-lg font-extrabold font-mono text-night tabular-nums">
                ₹{fuelPerVehicle.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              id="fuel-spend-slider"
              type="range"
              min="20000"
              max="150000"
              step="5000"
              value={fuelPerVehicle}
              onChange={(e) => setFuelPerVehicle(Number(e.target.value))}
              className="w-full accent-brand cursor-pointer h-2 bg-ink/10 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-ink/40 font-mono mt-1">
              <span>₹20k (Pickup/Intra-city)</span>
              <span>₹75k (Interstate GCV)</span>
              <span>₹1.5L (Multi-Axle Truck)</span>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setHasFuelRod(!hasFuelRod)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border cursor-pointer ${
                hasFuelRod
                  ? "bg-brand text-white border-brand shadow-xs"
                  : "bg-white text-ink/60 border-ink/15 hover:bg-cloud"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Fuel Rod Pilferage Defense (8.5%)
            </button>
            <button
              type="button"
              onClick={() => setHasRouteOptimize(!hasRouteOptimize)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border cursor-pointer ${
                hasRouteOptimize
                  ? "bg-brand text-white border-brand shadow-xs"
                  : "bg-white text-ink/60 border-ink/15 hover:bg-cloud"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Idling &amp; Route Telemetry (3.5%)
            </button>
          </div>
        </div>

        {/* Right column: Dynamic Live Calculations Card */}
        <div className="lg:col-span-5">
          <Tilt max={6}>
            <div className="rounded-3xl bg-night text-white p-7 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent-yellow flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4" /> Estimated Bottom-Line Recovery
                </span>
                <span className="text-[10px] font-mono bg-white/10 px-2.5 py-0.5 rounded-full text-white/80">
                  Annualized
                </span>
              </div>

              {/* Big Annual Savings Number */}
              <div>
                <span className="text-xs text-white/60 block font-medium">Estimated Annual Fuel Waste Saved</span>
                <div className="mt-1 text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tabular-nums">
                  ₹{annualFuelSaved.toLocaleString("en-IN")}
                </div>
                <span className="text-[11px] text-white/50 mt-1 block">
                  ~₹{monthlyFuelSaved.toLocaleString("en-IN")}/month recovered from unmonitored idling &amp; drain
                </span>
              </div>

              <div className="my-6 pt-5 border-t border-white/10 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                  <span className="text-white/70">Unwarranted Claims Protection:</span>
                  <span className="font-bold text-accent-yellow">₹{annualClaimProtection.toLocaleString("en-IN")}/yr</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                  <span className="text-white/70">Vehicle Warranty Integrity:</span>
                  <span className="font-bold text-emerald-400">100% (Zero Wire-Cut)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openDemoRequestModal()}
                className="w-full sheen bg-brand hover:bg-brand-deep text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-lg"
              >
                Request Custom Fleet ROI Audit <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Tilt>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   FEATURE 3: INTERACTIVE 360° EXPLODED DEVICE INSPECTOR (CLEAN NON-OVERLAPPING)
   ========================================================================= */
const HARDWARE_MODELS = [
  {
    id: "dashcam",
    name: "AI Dual-Facing Dashcam",
    badge: "Independent Technology Add-On by Alxsure",
    description: "Full-HD dual-lens camera with internal G-sensor lock and extreme-heat supercapacitors.",
    hotspots: [
      {
        id: "optics",
        title: "Sony STARVIS Night Optics",
        shortTag: "Sony STARVIS Optics",
        detail: "Dual 1080p f/1.8 aperture lens captures high-contrast night footage with legible license plates up to 40 ft.",
        spec: "1080p 30fps · f/1.8 · 140° Wide FOV",
      },
      {
        id: "gsensor",
        title: "Tri-Axial G-Sensor Unit",
        shortTag: "G-Sensor Deceleration",
        detail: "Detects 0.2G to 4.0G impact thresholds, auto-locking 15s pre and 15s post collision video to protected memory.",
        spec: "3-Axis Deceleration · 100Hz Polling",
      },
      {
        id: "supercap",
        title: "70°C Safe Supercapacitor",
        shortTag: "70°C Heat Supercap",
        detail: "Zero lithium battery swelling or fire hazard in extreme Indian summer cabin temperatures. Operates up to 70°C.",
        spec: "Dual Supercap Cell · -20°C to 70°C",
      },
      {
        id: "obd",
        title: "Zero Wire-Cut Fuse Harness",
        shortTag: "Zero Wire-Cut OBD-II",
        detail: "Connects cleanly via vehicle fuse box or OBD-II port without splicing a single factory wire, preserving full manufacturer warranty.",
        spec: "Plug & Play · Factory Warranty Safe",
      },
    ],
  },
  {
    id: "ais140",
    name: "AIS-140 GPS Telematics",
    badge: "Statutory RTO Compliance Unit",
    description: "Government-approved commercial tracking hardware with dual IRNSS satellite connectivity.",
    hotspots: [
      {
        id: "navic",
        title: "Dual IRNSS & GPS Module",
        shortTag: "Dual IRNSS / GPS",
        detail: "Indian Space Research (NavIC) and Global GPS positioning for sub-second location accuracy across national highways.",
        spec: "IRNSS L5 + GPS L1 · Sub-Second Fix",
      },
      {
        id: "sos",
        title: "Emergency Panic Interface",
        shortTag: "Statutory SOS Trigger",
        detail: "Direct connection for physical emergency panic buttons, broadcasting real-time emergency packets to state command servers.",
        spec: "Dual IP Server Uplink · RTO Certified",
      },
      {
        id: "esim",
        title: "Embedded Roaming eSIM",
        shortTag: "4G M2M Multi-Roaming",
        detail: "Industrial-grade soldered eSIM automatically roaming between Airtel, Jio, and Vi for non-stop national connectivity.",
        spec: "4G LTE Cat-1 with 2G Fallback",
      },
      {
        id: "battery",
        title: "8-Hour Battery Backup",
        shortTag: "Internal Battery Backup",
        detail: "Maintains live tracking beacons and sabotage alerts even if primary vehicle battery cables are cut or disconnected.",
        spec: "Li-Polymer 850mAh · 8-Hour Offline",
      },
    ],
  },
  {
    id: "elock",
    name: "Smart Cargo E-Lock",
    badge: "Cargo Security & Anti-Theft",
    description: "High-tensile steel container seal with automated geofenced unlocking and cut-wire alarms.",
    hotspots: [
      {
        id: "shackle",
        title: "Hardened Steel Shackle",
        shortTag: "Anti-Cut Steel Shackle",
        detail: "High-tensile forged steel bolt resistant to angle grinder cutting, hydraulic bolt cutters, and brute-force prying.",
        spec: "12mm Hardened Steel · IP67 Waterproof",
      },
      {
        id: "geofence",
        title: "Geofenced Remote Unlock",
        shortTag: "Geofenced Authorization",
        detail: "Shackle only unlocks when the GPS confirms the container has reached authorized warehouse destination coordinates.",
        spec: "Automated GPS Geofence Verification",
      },
      {
        id: "tamper",
        title: "Tamper & Cut Alarm",
        shortTag: "Sabotage Alarm Siren",
        detail: "Internal conductive sensor triggers instant SMS and app panic siren if the locking cable is cut or tampered with.",
        spec: "Instant Server Alert within 1.5s",
      },
      {
        id: "rfid",
        title: "RFID / BLE Authorization",
        shortTag: "RFID / NFC Depot Pass",
        detail: "Authorized depot supervisors can perform cryptographic offline unlocks using encrypted NFC or RFID security badges.",
        spec: "13.56 MHz Encrypted RFID + BLE 5.0",
      },
    ],
  },
  {
    id: "fuelrod",
    name: "Capacitive Fuel Rod Sensor",
    badge: "Pilferage & Drain Telemetry",
    description: "High-precision digital fuel level probe calibrated directly inside vehicle diesel tank.",
    hotspots: [
      {
        id: "flange",
        title: "Sealed Fuel Tank Flange",
        shortTag: "Vibration-Proof Flange",
        detail: "Machined aluminum mounting flange flush-mounted and gasket-sealed to prevent diesel fumes or leaks under rough road conditions.",
        spec: "Aerospace Grade 6061-T6 Aluminum",
      },
      {
        id: "rod",
        title: "Dielectric Measuring Rod",
        shortTag: "99.5% Capacitive Sensor",
        detail: "Continuous capacitive sensor rod measuring diesel level variations as small as 1.5 litres, impervious to vehicle slope sloshing.",
        spec: "Resolution < 1mm · 99.5% Accuracy",
      },
      {
        id: "theft",
        title: "Anti-Pilferage Drain Alert",
        shortTag: "Sudden Fuel Drain Siren",
        detail: "Detects sudden nocturnal fuel drainage when ignition is turned off, immediately sending SMS and siren alerts to the fleet owner.",
        spec: "Drain Threshold: >3L in 60s",
      },
      {
        id: "rs485",
        title: "Digital RS485 Interface",
        shortTag: "Noise-Immune Digital Bus",
        detail: "High-noise immunity RS485 industrial serial bus transmits calibrated digital volume numbers directly to GPS telematics unit.",
        spec: "RS-485 Modbus RTU · Surge Protected",
      },
    ],
  },
];

export function DeviceInspector({ className = "" }: { className?: string }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activePin, setActivePin] = useState(0);

  const device = HARDWARE_MODELS[selectedIdx];
  const activeSpot = device.hotspots[activePin] || device.hotspots[0];

  return (
    <div className={`rounded-3xl border border-ink/10 bg-white p-6 sm:p-10 shadow-xl ${className}`}>
      {/* Header and Device Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-ink/8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand">
            Interactive Hardware Dissection · Apple Benchmark
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-night mt-1">
            Engineered for Extreme Road Conditions
          </h3>
          <p className="text-xs sm:text-sm text-ink/70 mt-1 max-w-xl">
            Click the interactive hotspot pins around the perimeter to inspect internal optics, sensors, power cells, and wiring harnesses.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap gap-2">
          {HARDWARE_MODELS.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setSelectedIdx(idx);
                setActivePin(0);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                idx === selectedIdx
                  ? "bg-night text-white shadow-md"
                  : "bg-cloud hover:bg-ink/10 text-night/70"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Stage */}
      <div className="mt-8 grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Column (7 cols): Clean Technical Blueprint Stage - ZERO TEXT OVERLAP */}
        <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[440px] rounded-3xl bg-gradient-to-br from-night via-night-deep to-ink p-6 sm:p-8 flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
          {/* Engineering blueprint grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Leader Lines SVG connecting center hub to 4 perimeter pins */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" aria-hidden="true">
            <line x1="50%" y1="50%" x2="16%" y2="16%" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="84%" y2="16%" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="16%" y2="84%" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="84%" y2="84%" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>

          {/* Central Hardware Medallion - CLEAN WITH ZERO OVERLAPPING PINS */}
          <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none select-none">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-white/15 bg-white/5 flex items-center justify-center">
              {/* Radar sweep */}
              <div className="absolute inset-0 rounded-full radar-sweep pointer-events-none overflow-hidden opacity-35">
                <div
                  className="w-1/2 h-1/2 absolute top-0 right-0 origin-bottom-left"
                  style={{
                    background: "conic-gradient(from 180deg at 0% 100%, rgba(245,166,35,0.4) 0deg, transparent 75deg)",
                  }}
                />
              </div>

              {/* Hardware Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand text-white flex items-center justify-center shadow-2xl ring-4 ring-brand/30">
                {selectedIdx === 0 && <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-white" />}
                {selectedIdx === 1 && <Navigation className="w-8 h-8 sm:w-10 sm:h-10 text-white" />}
                {selectedIdx === 2 && <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />}
                {selectedIdx === 3 && <Fuel className="w-8 h-8 sm:w-10 sm:h-10 text-white" />}
              </div>
            </div>

            <div className="text-center mt-3">
              <span className="text-xs font-mono font-bold text-white tracking-wider uppercase block">
                {device.name}
              </span>
              <span className="text-[10px] font-mono text-accent-yellow font-bold mt-0.5 block">
                {device.badge}
              </span>
            </div>
          </div>

          {/* PIN 01: Top-Left Perimeter */}
          <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActivePin(0)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 cursor-pointer shadow-lg ${
                activePin === 0
                  ? "bg-accent-yellow text-night scale-110 shadow-[0_0_20px_var(--accent-yellow)] ring-2 ring-white"
                  : "bg-white/90 hover:bg-white text-night hover:scale-105"
              }`}
              aria-label={device.hotspots[0].title}
            >
              01
            </button>
            <span
              onClick={() => setActivePin(0)}
              className={`hidden sm:inline-block text-[11px] font-mono px-2.5 py-1 rounded-lg border backdrop-blur-md transition cursor-pointer ${
                activePin === 0
                  ? "bg-accent-yellow/20 text-accent-yellow border-accent-yellow/40 font-bold"
                  : "bg-white/10 text-white/80 border-white/10 hover:bg-white/15"
              }`}
            >
              {device.hotspots[0].shortTag}
            </span>
          </div>

          {/* PIN 02: Top-Right Perimeter */}
          <div className="absolute top-5 right-5 z-20 flex items-center gap-2 flex-row-reverse">
            <button
              type="button"
              onClick={() => setActivePin(1)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 cursor-pointer shadow-lg ${
                activePin === 1
                  ? "bg-accent-yellow text-night scale-110 shadow-[0_0_20px_var(--accent-yellow)] ring-2 ring-white"
                  : "bg-white/90 hover:bg-white text-night hover:scale-105"
              }`}
              aria-label={device.hotspots[1].title}
            >
              02
            </button>
            <span
              onClick={() => setActivePin(1)}
              className={`hidden sm:inline-block text-[11px] font-mono px-2.5 py-1 rounded-lg border backdrop-blur-md transition cursor-pointer ${
                activePin === 1
                  ? "bg-accent-yellow/20 text-accent-yellow border-accent-yellow/40 font-bold"
                  : "bg-white/10 text-white/80 border-white/10 hover:bg-white/15"
              }`}
            >
              {device.hotspots[1].shortTag}
            </span>
          </div>

          {/* PIN 03: Bottom-Left Perimeter */}
          <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActivePin(2)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 cursor-pointer shadow-lg ${
                activePin === 2
                  ? "bg-accent-yellow text-night scale-110 shadow-[0_0_20px_var(--accent-yellow)] ring-2 ring-white"
                  : "bg-white/90 hover:bg-white text-night hover:scale-105"
              }`}
              aria-label={device.hotspots[2].title}
            >
              03
            </button>
            <span
              onClick={() => setActivePin(2)}
              className={`hidden sm:inline-block text-[11px] font-mono px-2.5 py-1 rounded-lg border backdrop-blur-md transition cursor-pointer ${
                activePin === 2
                  ? "bg-accent-yellow/20 text-accent-yellow border-accent-yellow/40 font-bold"
                  : "bg-white/10 text-white/80 border-white/10 hover:bg-white/15"
              }`}
            >
              {device.hotspots[2].shortTag}
            </span>
          </div>

          {/* PIN 04: Bottom-Right Perimeter */}
          <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 flex-row-reverse">
            <button
              type="button"
              onClick={() => setActivePin(3)}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 cursor-pointer shadow-lg ${
                activePin === 3
                  ? "bg-accent-yellow text-night scale-110 shadow-[0_0_20px_var(--accent-yellow)] ring-2 ring-white"
                  : "bg-white/90 hover:bg-white text-night hover:scale-105"
              }`}
              aria-label={device.hotspots[3].title}
            >
              04
            </button>
            <span
              onClick={() => setActivePin(3)}
              className={`hidden sm:inline-block text-[11px] font-mono px-2.5 py-1 rounded-lg border backdrop-blur-md transition cursor-pointer ${
                activePin === 3
                  ? "bg-accent-yellow/20 text-accent-yellow border-accent-yellow/40 font-bold"
                  : "bg-white/10 text-white/80 border-white/10 hover:bg-white/15"
              }`}
            >
              {device.hotspots[3].shortTag}
            </span>
          </div>
        </div>

        {/* Right Column (5 cols): Callout Detail Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-brand-soft/50 border border-brand/20 rounded-2xl p-6">
            <div className="flex items-center justify-between gap-2 text-xs font-mono font-bold text-brand uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand" /> Component Specification 0{activePin + 1}
              </span>
              <span className="text-[10px] bg-brand text-white px-2 py-0.5 rounded-full font-bold">
                Inspected
              </span>
            </div>
            <h4 className="text-xl font-extrabold text-night leading-snug">{activeSpot.title}</h4>
            <p className="mt-2.5 text-xs sm:text-sm text-ink/75 leading-relaxed">{activeSpot.detail}</p>
            <div className="mt-4 pt-3 border-t border-brand/15 text-xs font-mono font-bold text-night/80 flex items-center justify-between">
              <span className="text-ink/60">Benchmarked Spec:</span>
              <span className="text-brand font-extrabold">{activeSpot.spec}</span>
            </div>
          </div>

          {/* Hotspot selector list */}
          <div className="space-y-2">
            {device.hotspots.map((spot, i) => (
              <button
                key={spot.title}
                type="button"
                onClick={() => setActivePin(i)}
                className={`w-full text-left p-3.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer border ${
                  i === activePin
                    ? "bg-night text-white border-night shadow-sm"
                    : "bg-cloud hover:bg-ink/10 text-night/80 border-ink/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      i === activePin ? "bg-accent-yellow text-night" : "bg-ink/10 text-ink/70"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span>{spot.title}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => openDeviceEnquiryModal(device.id)}
              className="w-full bg-brand hover:bg-brand-deep text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              Enquire About {device.name} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   FEATURE 4: DEEP DYNAMIC POLICY AUDIT QUIZ (REAL-TIME ENGINE)
   ========================================================================= */

type VehicleCategory = "car" | "gcv" | "bike" | "msme";
type VehicleAge = "new" | "mid" | "old";
type ProtectionGoal = "zero-dep" | "fast-claim" | "commercial";

interface TrapItem {
  title: string;
  risk: string;
  riskBadgeColor: "red" | "amber" | "orange";
  note: string;
  solution: string;
}

interface AuditComputation {
  score: number;
  riskLevel: string;
  riskClass: string;
  progressBarColor: string;
  headline: string;
  estimatedLoss: string;
  traps: TrapItem[];
}

function computePolicyAudit(
  category: VehicleCategory,
  age: VehicleAge,
  goal: ProtectionGoal,
): AuditComputation {
  // Base computations tailored specifically to category, age, and goal
  if (category === "gcv") {
    return {
      score: age === "new" ? 52 : age === "mid" ? 41 : 32,
      riskLevel: "CRITICAL COMMERCIAL REPUDIATION RISK",
      riskClass: "text-red-600 bg-red-50 border-red-200",
      progressBarColor: "bg-red-500",
      headline: "Commercial Goods Carrier · Statutory & Surveyor Vulnerabilities",
      estimatedLoss: "₹1,50,000 to ₹8,00,000 per disputed claim",
      traps: [
        {
          title: "Gross Vehicle Weight (GVW) Overload Rejection",
          risk: "100% Claim Repudiation",
          riskBadgeColor: "red",
          note: "Insurance surveyors automatically deny total loss or own-damage claims if toll weighbridge records indicate cargo weight exceeded RC registered payload, even marginally.",
          solution: "Independent pre-binding policy audit ensuring accurate GVW rating and overload defense clause verification.",
        },
        {
          title: "Driver & Cleaner IMT-28 Legal Liability Deficit",
          risk: "Personal Owner Liability in MACT Court",
          riskBadgeColor: "red",
          note: "Without statutory IMT-28 and Legal Liability to Paid Driver endorsements, third-party bodily injury awards by tribunals fall directly on the transport owner's personal balance sheet.",
          solution: "Mandatory endorsement of IMT-28, IMT-34, and employee compensation riders.",
        },
        {
          title: "National Permit & Territorial Route Boundary Clause",
          risk: "Total Void Outside State Limits",
          riskBadgeColor: "orange",
          note: "Accidents occurring in a different state without up-to-date National Permit authorization allow insurers to void own-damage repair coverage completely.",
          solution: "All-India permit endorsement validation across interstate fleet routes.",
        },
        {
          title: "Disputed Highway Collision Liability (Word vs Word)",
          risk: "50% Contributory Negligence Deduction",
          riskBadgeColor: "amber",
          note: "In night highway collisions involving smaller passenger vehicles, the heavier commercial vehicle is routinely blamed by surveyors without objective proof.",
          solution: "Deploy an AI dashcam with G-sensor video telemetry to prove exact lane discipline and right-of-way.",
        },
      ],
    };
  }

  if (category === "bike") {
    return {
      score: age === "new" ? 58 : age === "mid" ? 44 : 35,
      riskLevel: "HIGH TWO-WHEELER OUT-OF-POCKET EXPOSURE",
      riskClass: "text-amber-700 bg-amber-50 border-amber-200",
      progressBarColor: "bg-amber-500",
      headline: "Two-Wheeler · High Parts Depreciation & Passenger Liability Traps",
      estimatedLoss: "₹12,000 to ₹45,000 on average collision",
      traps: [
        {
          title: "Fiberglass, Plastic & Fairing Flat 50% Deduction",
          risk: "Flat 50% Cost on Rider",
          riskBadgeColor: "red",
          note: "Under standard two-wheeler policies, all plastic panels, fairings, mudguards, and headlamp housings receive an automatic 50% depreciation deduction.",
          solution: "Bind Nil-Depreciation cover to secure 100% replacement reimbursement.",
        },
        {
          title: "Unnamed Pillion Passenger Personal Accident Void",
          risk: "Zero Medical / Death Cover for Passenger",
          riskBadgeColor: "red",
          note: "Standard motor policies cover only the owner-driver. Family members or pillion riders have zero accidental medical compensation unless an explicit endorsement is bound.",
          solution: "Add Unnamed Passenger Pillion PA cover (up to ₹2 Lakhs per person).",
        },
        {
          title: "Roadside Towing Limit Caps (₹1,500 Threshold)",
          risk: "Out-of-Pocket Crane / Flatbed Cost",
          riskBadgeColor: "orange",
          note: "Standard bike insurance caps towing at just ₹1,000–₹1,500. Highway breakdown recovery charges of ₹4,000+ must be borne out of pocket by the rider.",
          solution: "24x7 pan-India roadside assistance add-on with zero distance cap.",
        },
        {
          title: "Helmet & Protective Gear Surveyor Dispute",
          risk: "Contributory Negligence Dispute",
          riskBadgeColor: "amber",
          note: "In personal injury claims, underwriters routinely attempt compensation reductions by demanding proof of ISI-standard helmet compliance during the impact.",
          solution: "Handle claim documentation through our 24x7 advisory desk for surveyor coordination.",
        },
      ],
    };
  }

  if (category === "msme") {
    return {
      score: age === "new" ? 62 : age === "mid" ? 49 : 39,
      riskLevel: "CRITICAL COMMERCIAL ASSET & LIABILITY RISK",
      riskClass: "text-red-700 bg-red-50 border-red-200",
      progressBarColor: "bg-red-500",
      headline: "MSME Commercial Asset · Under-Insurance & Peril Traps",
      estimatedLoss: "₹3,00,000 to ₹25,00,000 on fire or flood loss",
      traps: [
        {
          title: "Under-Insurance 'Average Clause' Pro-Rata Slashing",
          risk: "Proportionate 20%–40% Claim Slashed",
          riskBadgeColor: "red",
          note: "If shop or warehouse stock worth ₹1 Crore is insured for ₹75 Lakhs, every single partial loss claim (even a ₹5 Lakh water damage) is reduced by 25% under the statutory Average Clause.",
          solution: "Annual declaration policy with periodic stock fluctuation audits.",
        },
        {
          title: "Burglary 'Visible Forcible Entry' Requirement",
          risk: "Theft Claims Repudiated",
          riskBadgeColor: "red",
          note: "Standard burglary policies require physical evidence of broken doors, shattered glass, or violence. Thefts executed via key duplication or internal collusion are denied by default.",
          solution: "Comprehensive Business Package with smart cargo e-locks and employee dishonesty riders.",
        },
        {
          title: "STFI (Storm, Tempest, Flood & Inundation) Exclusions",
          risk: "Monsoon Basement Seepage Excluded",
          riskBadgeColor: "orange",
          note: "Monsoon stormwater seepage into basements or ground floor commercial godowns is routinely excluded unless comprehensive STFI perils are endorsed.",
          solution: "Specific flood and inundation endorsement with zero sub-limit deductibles.",
        },
        {
          title: "Premises Public Liability for Visitors & Clients",
          risk: "Direct Personal Business Lawsuit",
          riskBadgeColor: "amber",
          note: "Slip, fall, or equipment injury to a customer or delivery agent inside your premises creates direct civil liability without Commercial Public Liability cover.",
          solution: "Integrate Public Liability cover with commercial package insurance.",
        },
      ],
    };
  }

  // DEFAULT: PRIVATE CAR (Dynamic by vehicle age and goal)
  if (age === "new") {
    return {
      score: goal === "zero-dep" ? 64 : 52,
      riskLevel: "SIGNIFICANT INVOICE & DEPRECIATION EXPOSURE",
      riskClass: "text-amber-600 bg-amber-50 border-amber-200",
      progressBarColor: "bg-amber-500",
      headline: "New Private Car (< 2 Years) · Total Loss Gap & Consumables Traps",
      estimatedLoss: "₹25,000 to ₹2,50,000 on major accidental loss",
      traps: [
        {
          title: "Return-to-Invoice (RTI) Gap on Total Loss / Theft",
          risk: "15%–20% Ex-Showroom & Road Tax Loss",
          riskBadgeColor: "red",
          note: "If a new car is stolen or suffers total loss in an accident, insurers pay only the depreciated IDV, losing you road taxes, registration fees, and showroom price differences.",
          solution: "Bind Return-to-Invoice (RTI) add-on to guarantee full on-road invoice replacement.",
        },
        {
          title: "Zero-Depreciation with Full Consumables Waiver",
          risk: "₹8,000–₹18,000 Out-of-Pocket per Repair",
          riskBadgeColor: "orange",
          note: "Even with Nil-Dep, insurance surveyors deduct the full cost of engine oils, transmission fluids, coolants, nuts, and A/C gas unless Consumables cover is bound.",
          solution: "Bundle Zero-Depreciation with Consumables cover.",
        },
        {
          title: "Monsoon Water Ingress (Hydrostatic Engine Seizure)",
          risk: "Complete Engine Replacement Denied",
          riskBadgeColor: "red",
          note: "Driving through waterlogged streets causes water ingress into cylinders, fracturing connecting rods. Standard insurance rejects this as consequential damage.",
          solution: "Add Engine Protector with Hydrostatic Lock endorsement.",
        },
        {
          title: "Verbal Right-of-Way Dispute with Third Parties",
          risk: "50% Contributory Negligence Deduction",
          riskBadgeColor: "amber",
          note: "In intersection collisions, surveyors allocate 50% mutual blame if third party disputes responsibility, costing you half your repair settlement and wiping out your NCB.",
          solution: "Install an AI dashcam to provide objective 1080p speed-stamped video evidence.",
        },
      ],
    };
  }

  if (age === "mid") {
    return {
      score: 42,
      riskLevel: "HIGH AGE DEPRECIATION & NO-CLAIM-BONUS TRAPS",
      riskClass: "text-red-600 bg-red-50 border-red-200",
      progressBarColor: "bg-red-500",
      headline: "Private Car (2 to 5 Years) · NCB Wipeout & IDV Deflation Traps",
      estimatedLoss: "₹35,000 to ₹1,20,000 on surveyor assessment",
      traps: [
        {
          title: "NCB Wipeout Trap on Minor Scratches",
          risk: "Loss of 50% Renewal Discount (₹15k–₹35k)",
          riskBadgeColor: "red",
          note: "Filing a single minor bumper claim of ₹6,000 completely resets your hard-earned 50% No Claim Bonus, costing you thousands more at renewal.",
          solution: "Add NCB Protection endorsement allowing up to two claims without bonus reset.",
        },
        {
          title: "Underwriter IDV Sizing Deflation",
          risk: "Artificially Lower Total Loss Payout",
          riskBadgeColor: "orange",
          note: "Insurers frequently deflate IDV by 25%–35% to present attractive low premiums, severely under-protecting your asset if a major accident occurs.",
          solution: "Independent IDV audit by Insure Audit Expert matching realistic vehicle market valuation.",
        },
        {
          title: "Plastic, Rubber & Metal 30%–50% Parts Depreciation",
          risk: "Half of Parts Cost Borne by Owner",
          riskBadgeColor: "red",
          note: "As vehicles pass 3 years, surveyors apply aggressive age depreciation on replacement parts unless confirmed with continuing Nil-Dep cover.",
          solution: "Renew Zero-Depreciation before your current policy lapses.",
        },
        {
          title: "Contested Collision Liability & Fault Dispute",
          risk: "30–45 Days Claim Investigation Delay",
          riskBadgeColor: "amber",
          note: "Without dashcam footage, surveyors initiate third-party cross-investigations that delay garage repairs for weeks.",
          solution: "Deploy an AI dashcam to expedite surveyor claim inspection with objective recorded proof.",
        },
      ],
    };
  }

  // Age === 'old' (> 5 Years)
  return {
    score: 29,
    riskLevel: "CRITICAL POLICY OBSOLESCENCE & SALVAGE DEDUCTION",
    riskClass: "text-red-700 bg-red-50 border-red-200",
    progressBarColor: "bg-red-600",
    headline: "Private Car (> 5 Years) · Nil-Dep Cutoff & High Salvage Deductions",
    estimatedLoss: "50% or more of total repair bill",
    traps: [
      {
        title: "Zero-Depreciation Eligibility Cutoff",
        risk: "Full 50% Out-of-Pocket on Parts",
        riskBadgeColor: "red",
        note: "Most major underwriters refuse Zero-Depreciation riders for cars older than 5 years, forcing owners to pay 50% on plastics, 30% on fiberglass, and 40% on metal parts.",
        solution: "Insure Audit Expert identifies specialized insurers that still offer Nil-Dep on cars up to 7 years.",
      },
      {
        title: "Aggressive Salvage Deduction on Major Repairs",
        risk: "Surveyor Slashes 30%–40% on Damaged Parts",
        riskBadgeColor: "red",
        note: "Surveyors deduct the estimated scrap value of damaged parts directly from your claim payout, leaving you to sell scrap parts yourself.",
        solution: "Independent surveyor review to challenge arbitrary salvage valuations.",
      },
      {
        title: "Electrical & Wiring Short-Circuit Wear-and-Tear Exclusion",
        risk: "Total Repudiation of Wiring Fires",
        riskBadgeColor: "orange",
        note: "On older cars, engine bay fires or electrical short-circuits are routinely rejected as 'gradual wear-and-tear' rather than accidental damage.",
        solution: "Policy clause verification ensuring electrical fire accidental coverage.",
      },
      {
        title: "Uncorroborated Road Accident Dispute",
        risk: "Severe Own-Damage Deduction",
        riskBadgeColor: "amber",
        note: "Third-party claimants target older cars, assuming lack of evidence. Full-HD dashcam footage is essential to establish absolute innocence.",
        solution: "Install an AI dashcam for objective tamper-resistant proof.",
      },
    ],
  };
}

export function PolicyBlindspotQuiz({ className = "" }: { className?: string }) {
  const [vehicleType, setVehicleType] = useState<VehicleCategory>("car");
  const [vehicleAge, setVehicleAge] = useState<VehicleAge>("mid");
  const [priority, setPriority] = useState<ProtectionGoal>("zero-dep");

  // Dynamically compute full audit report on every selection change
  const audit = computePolicyAudit(vehicleType, vehicleAge, priority);

  return (
    <div className={`rounded-3xl border border-ink/10 bg-white p-6 sm:p-10 shadow-xl ${className}`}>
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-brand">
          Interactive Policy Auditor · Insurtech Benchmark
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-night mt-1">
          Find Your Insurance Coverage Blindspots
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-ink/70">
          Most insurance policies leave vehicle and commercial owners vulnerable to surveyor claim deductions. Select your vehicle profile below to reveal exact hidden rejection traps.
        </p>
      </div>

      {/* Step Controls - 3 Interactive Filters */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {/* Step 1: Category */}
        <div className="bg-cloud/50 rounded-2xl p-4 border border-ink/8">
          <label className="text-xs font-bold text-night block mb-2 flex items-center justify-between">
            <span>1. Asset Category</span>
            <span className="text-[10px] font-mono text-brand font-bold uppercase">Dynamic</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setVehicleType("car")}
              className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                vehicleType === "car"
                  ? "bg-brand text-white shadow-xs"
                  : "bg-white text-ink/70 hover:bg-cloud border border-ink/5"
              }`}
            >
              <Car className="w-3.5 h-3.5" /> Private Car
            </button>
            <button
              type="button"
              onClick={() => setVehicleType("gcv")}
              className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                vehicleType === "gcv"
                  ? "bg-brand text-white shadow-xs"
                  : "bg-white text-ink/70 hover:bg-cloud border border-ink/5"
              }`}
            >
              <Truck className="w-3.5 h-3.5" /> GCV / Truck
            </button>
            <button
              type="button"
              onClick={() => setVehicleType("bike")}
              className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                vehicleType === "bike"
                  ? "bg-brand text-white shadow-xs"
                  : "bg-white text-ink/70 hover:bg-cloud border border-ink/5"
              }`}
            >
              <Bike className="w-3.5 h-3.5" /> Two-Wheeler
            </button>
            <button
              type="button"
              onClick={() => setVehicleType("msme")}
              className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                vehicleType === "msme"
                  ? "bg-brand text-white shadow-xs"
                  : "bg-white text-ink/70 hover:bg-cloud border border-ink/5"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" /> MSME Asset
            </button>
          </div>
        </div>

        {/* Step 2: Vehicle Age */}
        <div className="bg-cloud/50 rounded-2xl p-4 border border-ink/8">
          <label className="text-xs font-bold text-night block mb-2 flex items-center justify-between">
            <span>2. Asset Age / Vintage</span>
            <span className="text-[10px] font-mono text-brand font-bold uppercase">Dynamic</span>
          </label>
          <div className="space-y-1.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setVehicleAge("new")}
              className={`w-full p-2.5 rounded-xl transition cursor-pointer text-left px-3 ${
                vehicleAge === "new"
                  ? "bg-brand text-white shadow-xs"
                  : "bg-white text-ink/70 hover:bg-cloud border border-ink/5"
              }`}
            >
              Brand New / Under 2 Years
            </button>
            <button
              type="button"
              onClick={() => setVehicleAge("mid")}
              className={`w-full p-2.5 rounded-xl transition cursor-pointer text-left px-3 ${
                vehicleAge === "mid"
                  ? "bg-brand text-white shadow-xs"
                  : "bg-white text-ink/70 hover:bg-cloud border border-ink/5"
              }`}
            >
              2 to 5 Years Old
            </button>
            <button
              type="button"
              onClick={() => setVehicleAge("old")}
              className={`w-full p-2.5 rounded-xl transition cursor-pointer text-left px-3 ${
                vehicleAge === "old"
                  ? "bg-brand text-white shadow-xs"
                  : "bg-white text-ink/70 hover:bg-cloud border border-ink/5"
              }`}
            >
              Above 5 Years Old
            </button>
          </div>
        </div>

        {/* Step 3: Priority Goal */}
        <div className="bg-cloud/50 rounded-2xl p-4 border border-ink/8">
          <label className="text-xs font-bold text-night block mb-2 flex items-center justify-between">
            <span>3. Primary Concern</span>
            <span className="text-[10px] font-mono text-brand font-bold uppercase">Dynamic</span>
          </label>
          <div className="space-y-1.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setPriority("zero-dep")}
              className={`w-full p-2.5 rounded-xl transition cursor-pointer text-left px-3 ${
                priority === "zero-dep"
                  ? "bg-brand text-white shadow-xs"
                  : "bg-white text-ink/70 hover:bg-cloud border border-ink/5"
              }`}
            >
              Zero Out-of-Pocket Deduction
            </button>
            <button
              type="button"
              onClick={() => setPriority("fast-claim")}
              className={`w-full p-2.5 rounded-xl transition cursor-pointer text-left px-3 ${
                priority === "fast-claim"
                  ? "bg-brand text-white shadow-xs"
                  : "bg-white text-ink/70 hover:bg-cloud border border-ink/5"
              }`}
            >
              Dispute-Free 48h Settlement
            </button>
            <button
              type="button"
              onClick={() => setPriority("commercial")}
              className={`w-full p-2.5 rounded-xl transition cursor-pointer text-left px-3 ${
                priority === "commercial"
                  ? "bg-brand text-white shadow-xs"
                  : "bg-white text-ink/70 hover:bg-cloud border border-ink/5"
              }`}
            >
              Fleet &amp; Driver Liability Protection
            </button>
          </div>
        </div>
      </div>

      {/* Generated Audit Report Card - DYNAMICALLY RECALCULATES ON EVERY CLICK */}
      <div className="rounded-2xl border-2 border-brand/30 bg-gradient-to-br from-brand-soft/60 via-white to-cloud/40 p-6 sm:p-8 transition-all duration-300">
        {/* Top Header & Live Health Meter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-brand/20">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${audit.riskClass}`}>
                {audit.riskLevel}
              </span>
              <span className="text-xs font-mono text-ink/50">Simulated Loss: {audit.estimatedLoss}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-night">
              {audit.headline}
            </h4>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Health Meter Gauge */}
            <div className="bg-white border border-ink/10 rounded-2xl p-3.5 shadow-xs text-center min-w-[130px]">
              <span className="text-[10px] font-mono uppercase text-ink/50 block font-bold">Policy Protection</span>
              <div className="text-2xl font-extrabold font-mono text-night tabular-nums mt-0.5">
                {audit.score}<span className="text-xs text-ink/40">/100</span>
              </div>
              <div className="w-full bg-ink/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${audit.progressBarColor}`}
                  style={{ width: `${audit.score}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => openQuoteModal({ category: vehicleType === "msme" ? "car" : vehicleType })}
              className="sheen bg-brand hover:bg-brand-deep text-white font-bold text-xs sm:text-sm px-6 py-4 rounded-xl transition cursor-pointer inline-flex items-center gap-1.5 shadow-md shrink-0"
            >
              Request Free Policy Audit →
            </button>
          </div>
        </div>

        {/* 4 Dynamically Generated Traps */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {audit.traps.map((trap, idx) => (
            <div key={trap.title} className="bg-white rounded-2xl p-5 border border-ink/8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-brand bg-brand-soft px-2 py-0.5 rounded-md">
                    Trap 0{idx + 1}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                      trap.riskBadgeColor === "red"
                        ? "text-red-700 bg-red-50 border-red-200"
                        : trap.riskBadgeColor === "orange"
                        ? "text-orange-700 bg-orange-50 border-orange-200"
                        : "text-amber-700 bg-amber-50 border-amber-200"
                    }`}
                  >
                    {trap.risk}
                  </span>
                </div>
                <h5 className="font-extrabold text-sm text-night leading-snug">{trap.title}</h5>
                <p className="mt-2 text-xs text-ink/70 leading-relaxed">{trap.note}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-ink/8 text-xs">
                <span className="font-bold text-night block mb-0.5 flex items-center gap-1 text-[11px] uppercase tracking-wide text-brand">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand" /> Recommended Fix:
                </span>
                <span className="text-ink/80 text-[11.5px] leading-relaxed">{trap.solution}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
