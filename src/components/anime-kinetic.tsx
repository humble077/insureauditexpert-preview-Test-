import { useEffect, useRef, useState, useCallback } from "react";
import {
  ShieldCheck,
  Video,
  Activity,
  Zap,
  CheckCircle2,
  RotateCcw,
  Lock,
  Radio,
  Play,
  Pause,
  FastForward,
  Navigation,
  Gauge,
  Fuel,
  Thermometer,
  Truck,
  Sparkles,
  MapPin,
} from "lucide-react";
import { useInView, usePrefersReducedMotion } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* 1. Kinetic Matrix Grid (Staggered 2D ripple matrix)                */
/* ------------------------------------------------------------------ */
export function KineticMatrixGrid({
  rows = 6,
  cols = 16,
  tone = "light",
  className = "",
}: {
  rows?: number;
  cols?: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNodes, setActiveNodes] = useState<Record<string, number>>({});
  const reduced = usePrefersReducedMotion();

  // Trigger ripple from coordinates (cx, cy)
  const triggerRipple = useCallback(
    (cx: number, cy: number) => {
      if (reduced) return;
      const now = Date.now();
      const updates: Record<string, number> = {};

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dist = Math.hypot(c - cx, r - cy);
          const delay = Math.round(dist * 40); // 40ms stagger per unit distance
          updates[`${r}-${c}`] = now + delay;
        }
      }

      setActiveNodes(updates);
    },
    [rows, cols, reduced],
  );

  // Periodic automatic ambient wave
  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      const rx = Math.floor(Math.random() * cols);
      const ry = Math.floor(Math.random() * rows);
      triggerRipple(rx, ry);
    }, 4500);

    return () => clearInterval(interval);
  }, [cols, rows, triggerRipple, reduced]);

  // Handle cursor hover over a cell
  const handleCellHover = (r: number, c: number) => {
    triggerRipple(c, r);
  };

  const isDark = tone === "dark";
  const baseDotClass = isDark
    ? "bg-white/15 hover:bg-accent-yellow"
    : "bg-night/15 hover:bg-brand";

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-auto ${className}`}
      aria-hidden="true"
    >
      <div
        className="grid gap-2 sm:gap-2.5 p-3 rounded-2xl"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const key = `${r}-${c}`;
            const triggerTime = activeNodes[key];
            const now = Date.now();
            const isPulsing = triggerTime && now >= triggerTime && now - triggerTime < 700;

            return (
              <span
                key={key}
                onMouseEnter={() => handleCellHover(r, c)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 cursor-crosshair ${baseDotClass} ${
                  isPulsing ? "kinetic-dot-active !bg-accent-yellow shadow-md" : ""
                }`}
                style={{
                  transitionDelay: triggerTime ? `${Math.max(0, triggerTime - now)}ms` : "0ms",
                }}
              />
            );
          }),
        )}
      </div>
      <div className="text-center mt-1">
        <span
          className={`text-[10px] tracking-widest font-mono uppercase font-bold opacity-60 ${
            isDark ? "text-white" : "text-ink"
          }`}
        >
          Interactive Telematics Matrix · Hover or Tap to Ping
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Interactive Incident Shockwave & Video Lock Simulator            */
/* ------------------------------------------------------------------ */
export function IncidentShockwaveSimulator({ className = "" }: { className?: string }) {
  const [isTriggered, setIsTriggered] = useState(false);
  const [speed, setSpeed] = useState(68);
  const [gForce, setGForce] = useState(0.14);
  const [evidenceLocked, setEvidenceLocked] = useState(false);
  const [stepTimer, setStepTimer] = useState(0);

  // Simulation runner
  const triggerImpact = () => {
    if (isTriggered) return;
    setIsTriggered(true);
    setGForce(2.84);
    setSpeed(36);

    // Timeline of mechanical events
    setTimeout(() => {
      setSpeed(14);
    }, 400);

    setTimeout(() => {
      setSpeed(0);
      setEvidenceLocked(true);
    }, 900);

    // Auto-countdown to reset
    setStepTimer(6);
  };

  useEffect(() => {
    if (stepTimer <= 0) {
      if (isTriggered) {
        setIsTriggered(false);
        setEvidenceLocked(false);
        setSpeed(68);
        setGForce(0.14);
      }
      return;
    }

    const t = setInterval(() => {
      setStepTimer((s) => s - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [stepTimer, isTriggered]);

  return (
    <div
      className={`rounded-3xl border border-white/15 bg-gradient-to-br from-night via-night-deep to-brand-deep text-white p-6 sm:p-8 shadow-2xl relative overflow-hidden ${className}`}
    >
      {/* Decorative high-tech grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono tracking-widest text-emerald-400 font-bold uppercase">
            {isTriggered ? "CRITICAL TELEMATICS EVENT" : "TELEMATICS STREAM LIVE"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-white/60">
          <Radio className="w-3.5 h-3.5 text-accent-yellow animate-pulse" />
          <span>OBD-II CANbus Connected (No Wire-Cut)</span>
        </div>
      </div>

      {/* Middle Interactive Stage */}
      <div className="grid lg:grid-cols-12 gap-8 my-8 items-center relative z-10">
        {/* Radar & Shockwave Area */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-white/15 bg-night-soft/60 flex items-center justify-center overflow-visible">
            {/* Radar scanner sweep line */}
            <div className="absolute inset-0 rounded-full radar-sweep pointer-events-none overflow-hidden">
              <div
                className="w-1/2 h-1/2 absolute top-0 right-0 origin-bottom-left"
                style={{
                  background:
                    "conic-gradient(from 180deg at 0% 100%, rgba(245,166,35,0.4) 0deg, transparent 75deg)",
                }}
              />
            </div>

            {/* Shockwave Rings when impact triggered */}
            {isTriggered && (
              <>
                <div className="absolute w-28 h-28 rounded-full border-2 border-red-500 anime-shockwave" />
                <div
                  className="absolute w-28 h-28 rounded-full border-2 border-accent-yellow anime-shockwave"
                  style={{ animationDelay: "350ms" }}
                />
                <div
                  className="absolute w-28 h-28 rounded-full border-2 border-white anime-shockwave"
                  style={{ animationDelay: "700ms" }}
                />
              </>
            )}

            {/* Concentric distance rings */}
            <div className="absolute w-36 h-36 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute w-20 h-20 rounded-full border border-white/15 pointer-events-none" />

            {/* Center Vehicle Blip */}
            <div
              className={`relative z-20 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                isTriggered
                  ? "bg-red-500 text-white scale-110 shadow-red-500/50"
                  : "bg-brand text-white shadow-brand/40"
              }`}
            >
              {evidenceLocked ? (
                <Lock className="w-6 h-6 animate-bounce" />
              ) : (
                <Activity className="w-6 h-6 animate-pulse" />
              )}
            </div>
          </div>
          <span className="text-[11px] font-mono text-white/50 mt-3 text-center">
            {isTriggered ? "💥 G-Sensor Threshold Breach Detected" : "Vehicle Heading: 034° NE · Steady"}
          </span>
        </div>

        {/* Real-time Telemetry Readout */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Speed Gauge */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <span className="text-[11px] font-mono text-white/50 uppercase block">Vehicle Speed</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold font-mono tabular-nums text-white">
                  {speed}
                </span>
                <span className="text-xs font-mono text-white/60">km/h</span>
              </div>
            </div>

            {/* G-Sensor Gauge */}
            <div
              className={`border rounded-2xl p-4 backdrop-blur-sm transition-all duration-300 ${
                isTriggered
                  ? "bg-red-500/20 border-red-500/50"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <span className="text-[11px] font-mono text-white/50 uppercase block">Tri-Axial G-Force</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span
                  className={`text-3xl font-extrabold font-mono tabular-nums ${
                    isTriggered ? "text-red-400" : "text-accent-yellow"
                  }`}
                >
                  {gForce}
                </span>
                <span className="text-xs font-mono text-white/60">G</span>
              </div>
            </div>

            {/* Video Buffer Status */}
            <div className="col-span-2 sm:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <span className="text-[11px] font-mono text-white/50 uppercase block">Video Buffer</span>
              <div className="mt-1 flex items-center gap-1.5 text-sm font-bold font-mono">
                <Video className="w-4 h-4 text-emerald-400" />
                <span className={evidenceLocked ? "text-accent-yellow" : "text-emerald-400"}>
                  {evidenceLocked ? "LOCKED (30s)" : "1080p DUAL"}
                </span>
              </div>
            </div>
          </div>

          {/* Dossier status box */}
          <div
            className={`p-4 rounded-2xl border transition-all duration-500 ${
              evidenceLocked
                ? "bg-amber-500/15 border-amber-500/40 text-amber-200"
                : "bg-white/5 border-white/10 text-white/70"
            }`}
          >
            <div className="flex items-start gap-3">
              <ShieldCheck
                className={`w-5 h-5 mt-0.5 shrink-0 ${
                  evidenceLocked ? "text-accent-yellow" : "text-white/40"
                }`}
              />
              <div className="text-xs leading-relaxed">
                {evidenceLocked ? (
                  <div>
                    <strong className="text-white block font-mono text-[13px] mb-1">
                      🔒 Tamper-Proof Evidence File Sealed
                    </strong>
                    Instant G-sensor trigger locked 15s pre-impact and 15s post-impact video to protected partition. Auto-synchronized to Insure Audit Expert claim dossier. Surveyor dispute risk minimized.
                  </div>
                ) : (
                  <div>
                    <strong className="text-white block font-mono text-[13px] mb-1">
                      Continuous Overwrite Protection Ready
                    </strong>
                    The complimentary dashcam hardware monitors 3-axis deceleration 100 times per second. In any collision or harsh impact, footage is automatically preserved from overwrite.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Trigger Button */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={isTriggered}
              onClick={triggerImpact}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                isTriggered
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 text-white hover:scale-105 active:scale-95 shadow-red-500/30"
              }`}
            >
              <Zap className="w-4 h-4 text-accent-yellow" />
              {isTriggered ? `Simulating Incident (${stepTimer}s)` : "Simulate Sudden Impact / G-Event"}
            </button>

            {isTriggered && (
              <button
                type="button"
                onClick={() => {
                  setStepTimer(0);
                }}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Demo
              </button>
            )}

            <span className="text-[11px] font-mono text-white/40 ml-auto">
              Precision Telematics Engine · Real-time CANbus Telemetry
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Highway Corridor & 90-Day Trip Replay Simulator                */
/* ------------------------------------------------------------------ */
export function GpsMotionPathReplay({
  className = "",
}: {
  className?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<0.5 | 1 | 2 | 4>(1);
  const [progress, setProgress] = useState(0.0);
  const [vehiclePos, setVehiclePos] = useState({ x: 100, y: 160, angle: 0 });
  const [totalLength, setTotalLength] = useState(1000);
  const pathRef = useRef<SVGPathElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Closed-loop aerodynamic round-trip highway track:
  // Outbound (Top): Delhi Depot (100, 160) -> Jaipur (490, 85) -> Mumbai Port (915, 235)
  // Turnaround: Sweeps around coastal docks
  // Return (Bottom): Mumbai -> Vadodara (490, 335) -> Rewari -> Returns to Delhi Depot (100, 160)
  const PATH_DATA =
    "M 100 160 C 220 65, 360 55, 490 85 C 630 115, 760 75, 880 160 C 945 205, 945 265, 880 305 C 760 365, 630 315, 490 335 C 360 355, 220 325, 100 240 C 45 198, 45 160, 100 160 Z";

  const WAYPOINTS = [
    {
      pct: 0.0,
      code: "01",
      shortName: "DELHI DEPOT",
      subLabel: "START · 0 KM",
      label: "Delhi Central Logistics Hub",
      time: "08:00 AM",
      leg: "Outbound Leg",
      note: "0 KM · Departure Geofence Cleared",
      km: 0,
      x: 100,
      y: 160,
      labelOffsetY: -36, // Placed ABOVE outbound highway
    },
    {
      pct: 0.24,
      code: "02",
      shortName: "JAIPUR HUB",
      subLabel: "235 KM",
      label: "Jaipur Northern Freight Ring",
      time: "12:30 PM",
      leg: "Outbound Leg",
      note: "235 KM · Highway Fastag Debited",
      km: 235,
      x: 490,
      y: 85,
      labelOffsetY: -36, // Placed ABOVE highway
    },
    {
      pct: 0.50,
      code: "03",
      shortName: "MUMBAI PORT",
      subLabel: "486 KM (TURN)",
      label: "Mumbai Port Terminal",
      time: "07:00 PM",
      leg: "Turnaround Hub",
      note: "486 KM · Cargo Delivered & Return Sealed",
      km: 486,
      x: 915,
      y: 235,
      labelOffsetY: 38, // Placed BELOW coastal sweep
    },
    {
      pct: 0.76,
      code: "04",
      shortName: "VADODARA HUB",
      subLabel: "738 KM",
      label: "Vadodara Express Corridor",
      time: "01:30 AM",
      leg: "Return Leg",
      note: "738 KM · Night Driver Score: 99%",
      km: 738,
      x: 490,
      y: 335,
      labelOffsetY: 36, // Placed BELOW return highway
    },
    {
      pct: 1.0,
      code: "05",
      shortName: "DELHI DEPOT",
      subLabel: "RETURN · 972 KM",
      label: "Delhi Central Depot",
      time: "07:30 AM",
      leg: "Safe Return",
      note: "972 KM · Round-Trip Complete · Audit Locked",
      km: 972,
      x: 100,
      y: 160,
      labelOffsetY: 38, // Placed BELOW inbound highway - zero overlap with Station 01
    },
  ];

  // Update vehicle position and tangent angle based on current progress
  const updatePosition = useCallback((p: number) => {
    if (!pathRef.current) return;
    const len = totalLength || pathRef.current.getTotalLength();
    const currentDist = Math.max(0, Math.min(len, p * len));
    const pt = pathRef.current.getPointAtLength(currentDist);

    // Compute tangent angle for natural vehicle banking along curve
    const delta = 2;
    const pPrev = pathRef.current.getPointAtLength(Math.max(0, currentDist - delta));
    const pNext = pathRef.current.getPointAtLength(Math.min(len, currentDist + delta));
    const angle = Math.atan2(pNext.y - pPrev.y, pNext.x - pPrev.x) * (180 / Math.PI);

    setVehiclePos({ x: pt.x, y: pt.y, angle });
  }, [totalLength]);

  // Measure path on mount
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setTotalLength(len);
      updatePosition(progress);
    }
  }, [updatePosition, progress]);

  // Continuous animation loop: completes 1 whole round-trip and then automatically pauses!
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = performance.now();
      return;
    }

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = currentTime;

      // Full 972 KM round-trip duration: 32 seconds at 1x (relaxed pace), 64s at 0.5x, 16s at 2x, 8s at 4x
      const cycleDuration = 32 / speedMultiplier;
      const step = dt / cycleDuration;

      setProgress((prev) => {
        const next = prev + step;
        if (next >= 1) {
          // 1 WHOLE ROUND-TRIP COMPLETED: Automatically pause and land at 100%
          updatePosition(1);
          setIsPlaying(false);
          return 1;
        }
        updatePosition(next);
        return next;
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, speedMultiplier, updatePosition]);

  // Handle manual scrubbing along the track
  const handleScrub = (val: number) => {
    setProgress(val);
    updatePosition(val);
    lastTimeRef.current = performance.now();
  };

  // Play / Pause / Replay Handler
  const handlePlayToggle = () => {
    if (progress >= 1) {
      // Re-start from 0 on completion
      setProgress(0);
      updatePosition(0);
      lastTimeRef.current = performance.now();
      setIsPlaying(true);
    } else {
      lastTimeRef.current = performance.now();
      setIsPlaying(!isPlaying);
    }
  };

  // Dynamic Telemetry Computed from Progress (Total Round-Trip = 972 KM)
  const currentKm = Math.round(progress * 972);
  const isOutbound = progress < 0.5;
  const isNearHub =
    progress < 0.05 ||
    (progress > 0.22 && progress < 0.26) ||
    (progress > 0.48 && progress < 0.52) ||
    (progress > 0.74 && progress < 0.78) ||
    progress > 0.98;
  const currentSpeed = isNearHub
    ? progress >= 1
      ? 0
      : 36
    : Math.round(62 + Math.sin(progress * Math.PI * 6) * 14);

  // Fuel level simulates real-world journey: drains to 54% at Mumbai, refueled to 96% for return leg, ends at 62%
  const fuelPercent =
    progress < 0.5
      ? Math.max(54, Math.round(98 - progress * 88))
      : Math.max(62, Math.round(96 - (progress - 0.5) * 68));

  const tempReading = (-18.2 + Math.sin(progress * 12) * 0.3).toFixed(1);

  // Active waypoint identifier
  const activeWp = WAYPOINTS.reduce(
    (prev, curr) => (progress >= curr.pct ? curr : prev),
    WAYPOINTS[0],
  );

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      <div className="rounded-3xl border border-white/15 bg-night text-white shadow-2xl overflow-hidden relative">
        {/* Subtle Radar Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top Cockpit Header */}
        <div className="relative z-10 px-5 sm:px-8 py-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-brand/20 border border-brand/40 grid place-items-center text-brand">
              <Navigation className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent-yellow">
                  Round-Trip Telematics Replay
                </span>
                <span className={`w-2 h-2 rounded-full ${progress >= 1 ? "bg-emerald-400" : isPlaying ? "bg-emerald-400 animate-ping" : "bg-accent-yellow"}`} />
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                  {progress >= 1 ? "Round-Trip Finished · Auto-Paused" : isOutbound ? "Outbound: Delhi → Mumbai" : "Return Leg: Mumbai → Delhi"}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                NH44 National Freight Circuit · 972 KM Complete Round Trip
              </h4>
            </div>
          </div>

          {/* Vehicle Metadata Badge */}
          <div className="flex items-center gap-2 font-mono text-xs bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl">
            <Truck className="w-4 h-4 text-brand" />
            <span className="text-white font-bold">GCV #DL-01-4426</span>
            <span className="text-white/40">|</span>
            <span className="text-accent-yellow font-bold">12 GNSS Locks</span>
          </div>
        </div>

        {/* The SVG Canvas: Vehicle Tracking along Closed Round-Trip Loop */}
        <div className="relative z-10 p-4 sm:p-8 overflow-hidden bg-gradient-to-b from-night via-night/95 to-night/80">
          <svg
            viewBox="0 0 1000 400"
            className="w-full h-auto max-h-[400px] overflow-visible select-none"
          >
            <defs>
              {/* Glowing Green/Gold GPS Trail Gradient */}
              <linearGradient id="gpsTrailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1f9d55" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#1f9d55" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="1" />
              </linearGradient>

              {/* Headlight Radar Cone Gradient */}
              <linearGradient id="headlightCone" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
              </linearGradient>

              {/* Neon Glow Filter */}
              <filter id="gpsGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Outer Road Rail / Ground Corridor Boundary */}
            <path
              d={PATH_DATA}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 2. Asphalt Highway Track */}
            <path
              d={PATH_DATA}
              fill="none"
              stroke="#070c14"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 3. Center Dashed Lane Divider */}
            <path
              d={PATH_DATA}
              fill="none"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="1.8"
              strokeDasharray="8 10"
            />

            {/* 4. Active GPS Breadcrumb Trail (Drawn behind vehicle up to current progress) */}
            <path
              ref={pathRef}
              d={PATH_DATA}
              fill="none"
              stroke="url(#gpsTrailGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray={totalLength}
              strokeDashoffset={totalLength * (1 - progress)}
              filter="url(#gpsGlow)"
            />

            {/* Direction Arrows on Highway */}
            <g opacity="0.3" fill="none" stroke="#fff" strokeWidth="1.5">
              <path d="M 480 82 L 490 85 L 480 88" />
              <path d="M 500 338 L 490 335 L 500 332" />
            </g>

            {/* 5. Fixed Waypoints along the Round-Trip */}
            {WAYPOINTS.map((wp, i) => {
              const isReached = progress >= wp.pct;
              const isActive = activeWp.code === wp.code;
              return (
                <g key={i} transform={`translate(${wp.x}, ${wp.y})`}>
                  {/* Waypoint Pulsing Ring */}
                  {isReached && (
                    <circle
                      r="16"
                      fill="none"
                      stroke={isActive ? "#fbbf24" : "#22c55e"}
                      strokeWidth="1.5"
                      opacity="0.45"
                      className="animate-ping"
                    />
                  )}
                  {/* Waypoint Base Pin */}
                  <circle
                    r="9"
                    fill={isActive ? "#fbbf24" : isReached ? "#22c55e" : "#0f172a"}
                    stroke={isActive ? "#ffffff" : isReached ? "#4ade80" : "rgba(255,255,255,0.35)"}
                    strokeWidth="2"
                    className="transition-colors duration-300"
                  />
                  <text
                    x="0"
                    y="3.2"
                    textAnchor="middle"
                    fill={isActive || isReached ? "#000000" : "#ffffff"}
                    fontSize="8.5"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontWeight="900"
                    style={{ textRendering: "geometricPrecision" }}
                  >
                    {wp.code}
                  </text>

                  {/* Waypoint Crisp Floating Label Badge */}
                  <g transform={`translate(0, ${wp.labelOffsetY})`}>
                    <rect
                      x="-65"
                      y="-14"
                      width="130"
                      height="28"
                      rx="6"
                      fill="#050a12"
                      stroke={isActive ? "#fbbf24" : isReached ? "#22c55e" : "rgba(255,255,255,0.22)"}
                      strokeWidth={isActive ? "2" : "1.2"}
                      style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.85))" }}
                    />
                    <text
                      x="0"
                      y="-1"
                      textAnchor="middle"
                      fill={isActive ? "#fbbf24" : isReached ? "#4ade80" : "#ffffff"}
                      fontSize="10"
                      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                      fontWeight="800"
                      letterSpacing="0.4px"
                      style={{ textRendering: "geometricPrecision" }}
                    >
                      {wp.shortName}
                    </text>
                    <text
                      x="0"
                      y="9.5"
                      textAnchor="middle"
                      fill={isActive ? "#fef08a" : isReached ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)"}
                      fontSize="7.5"
                      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                      fontWeight="700"
                      style={{ textRendering: "geometricPrecision" }}
                    >
                      {wp.subLabel}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* 6. Dynamic Vehicle Marker (Follows SVG Path with Exact Tangent Angle) */}
            <g
              transform={`translate(${vehiclePos.x}, ${vehiclePos.y}) rotate(${vehiclePos.angle})`}
              className="transition-transform duration-75 ease-linear pointer-events-none"
            >
              {/* Radar Forward Headlight Fan */}
              <polygon
                points="0,0 52,-18 52,18"
                fill="url(#headlightCone)"
                opacity="0.75"
              />

              {/* Pulsing Emerald Radar Target Ring */}
              <circle
                r="18"
                fill="none"
                stroke="#1f9d55"
                strokeWidth="1.5"
                opacity="0.35"
                className="animate-ping"
              />

              {/* Vehicle Chassis Icon Pill */}
              <rect
                x="-12"
                y="-7"
                width="24"
                height="14"
                rx="4"
                fill="#1f9d55"
                stroke="#4ade80"
                strokeWidth="1.5"
                filter="url(#gpsGlow)"
              />

              {/* Windshield / Cab Glass */}
              <rect
                x="4"
                y="-4.5"
                width="6"
                height="9"
                rx="1.5"
                fill="#070c14"
              />

              {/* LED Headlights */}
              <circle cx="12" cy="-4" r="1.5" fill="#fef08a" />
              <circle cx="12" cy="4" r="1.5" fill="#fef08a" />
            </g>
          </svg>

          {/* Current Waypoint Alert / Completion Strip */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-yellow shrink-0" />
              <span className="text-white/60">Milestone:</span>
              <strong className="text-white">{activeWp.label}</strong>
              <span className="text-accent-yellow">({activeWp.note})</span>
            </div>
            {progress >= 1 ? (
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" /> 1 Whole Round-Trip Finished · Auto-Paused
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> {isOutbound ? "Outbound Corridor Active" : "Inbound Return Corridor Active"}
              </div>
            )}
          </div>

          {/* 5-Station Milestone Rail (100% Native Subpixel ClearType Sharpness) */}
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {WAYPOINTS.map((wp) => {
              const isPast = progress >= wp.pct;
              const isCurrent = activeWp.code === wp.code;
              return (
                <div
                  key={wp.code}
                  className={`p-2.5 rounded-xl border transition-all text-left ${
                    isCurrent
                      ? "bg-brand/20 border-accent-yellow shadow-md ring-1 ring-accent-yellow/40"
                      : isPast
                      ? "bg-white/10 border-emerald-500/40"
                      : "bg-white/5 border-white/10 opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isCurrent
                          ? "bg-accent-yellow text-night"
                          : isPast
                          ? "bg-emerald-500 text-night"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      STATION {wp.code}
                    </span>
                    <span className="text-[10px] font-mono text-white/60">{wp.time}</span>
                  </div>
                  <div className="mt-1.5 text-xs font-black text-white truncate tracking-tight">
                    {wp.shortName}
                  </div>
                  <div className="text-[10px] font-mono text-accent-yellow font-semibold truncate mt-0.5">
                    {wp.subLabel}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Controls & Real-Time Telemetry Dashboard */}
        <div className="relative z-10 px-5 sm:px-8 py-6 bg-black/40 border-t border-white/10">
          {/* Scrubber Slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-mono text-white/60 mb-2">
              <span>Scrub Round-Trip Route Playback</span>
              <span className="text-accent-yellow font-bold">
                {Math.round(progress * 100)}% Round-Trip Logged ({currentKm} / 972 KM)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.002"
              value={progress}
              onChange={(e) => handleScrub(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-brand"
            />
          </div>

          {/* Control Bar: Play / Pause / Replay, Speed Multiplier & Live Readouts */}
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            {/* Playback Buttons */}
            <div className="lg:col-span-4 flex items-center gap-2">
              <button
                type="button"
                onClick={handlePlayToggle}
                className={`px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-md ${
                  progress >= 1
                    ? "bg-emerald-600 hover:bg-emerald-700 ring-2 ring-emerald-400/40"
                    : "bg-brand hover:bg-brand-deep"
                }`}
              >
                {progress >= 1 ? (
                  <>
                    <RotateCcw className="w-4 h-4 text-accent-yellow" />
                    Replay Full Trip (972 KM)
                  </>
                ) : isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause Trip
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-accent-yellow" /> Resume Trip
                  </>
                )}
              </button>

              <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/10 text-xs font-mono">
                {([0.5, 1, 2, 4] as const).map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => {
                      setSpeedMultiplier(spd);
                      lastTimeRef.current = performance.now();
                    }}
                    className={`px-2 py-1 rounded-lg transition font-bold cursor-pointer ${
                      speedMultiplier === spd
                        ? "bg-accent-yellow text-night shadow-xs"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setProgress(0);
                  updatePosition(0);
                  lastTimeRef.current = performance.now();
                  setIsPlaying(false);
                }}
                title="Reset to Departure"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Live Telemetry Gauges */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-white/50 uppercase flex items-center justify-center gap-1">
                  <Gauge className="w-3 h-3 text-brand" /> Live Speed
                </span>
                <span className="text-base font-extrabold text-white mt-0.5 block tabular-nums">
                  {currentSpeed} <span className="text-[10px] font-normal text-white/60">KM/H</span>
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-white/50 uppercase flex items-center justify-center gap-1">
                  <Navigation className="w-3 h-3 text-accent-yellow" /> Total Distance
                </span>
                <span className="text-base font-extrabold text-white mt-0.5 block tabular-nums">
                  {currentKm} <span className="text-[10px] font-normal text-white/60">/ 972 KM</span>
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-white/50 uppercase flex items-center justify-center gap-1">
                  <Fuel className="w-3 h-3 text-emerald-400" /> Fuel Rod
                </span>
                <span className="text-base font-extrabold text-emerald-400 mt-0.5 block tabular-nums">
                  {fuelPercent}% <span className="text-[10px] font-normal text-white/60">Level</span>
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-white/50 uppercase flex items-center justify-center gap-1">
                  <Thermometer className="w-3 h-3 text-blue-400" /> Cold Chain
                </span>
                <span className="text-base font-extrabold text-blue-400 mt-0.5 block tabular-nums">
                  {tempReading}°C
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

