import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Smartphone,
  Radio,
  MapPin,
  ShieldCheck,
  Zap,
  Gauge,
  Video,
  Clock,
  Bell,
  Search,
  Layers,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Sliders,
  QrCode,
  Compass,
  Car,
  Activity,
  Power,
  RotateCcw,
  Moon,
  Info,
  Navigation,
  Crosshair,
  Grid,
} from "lucide-react";
import { Reveal, Tilt, Spotlight, Magnetic } from "@/lib/motion";
import { BlueprintField, DrawUnderline, Kicker, Ornament } from "@/components/graphics";

export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.insuretrack.app";
export const APP_STORE_URL = "https://apps.apple.com/in/app/insure-track/id6808179223";

/* ---------- SVG Official App Store Badges ---------- */
export function AppleAppStoreBadge({ className = "h-12" }: { className?: string }) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Download Insure Track on Apple App Store"
      className={`inline-flex items-center gap-3 bg-night hover:bg-black text-white px-5 py-3 rounded-xl border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group ${className}`}
    >
      <svg className="w-7 h-7 fill-current shrink-0 text-white" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.02.62-2.66 1.37-.57.66-.99 1.73-.86 2.76 1.02.08 2.06-.52 2.6-1.28z" />
      </svg>
      <div className="text-left leading-none">
        <div className="text-[10px] uppercase font-semibold text-white/70 tracking-wider">Download on the</div>
        <div className="text-[15px] font-bold text-white tracking-tight mt-0.5 font-display">App Store</div>
      </div>
    </a>
  );
}

export function GooglePlayBadge({ className = "h-12" }: { className?: string }) {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Get Insure Track on Google Play Store"
      className={`inline-flex items-center gap-3 bg-night hover:bg-black text-white px-5 py-3 rounded-xl border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group ${className}`}
    >
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
        <path fill="#EA4335" d="M3.6 1.69L13.1 11.2 3.6 20.7c-.5-.4-.8-1.1-.8-2V3.7c0-.9.3-1.6.8-2.01z" />
        <path fill="#4285F4" d="M16.5 7.8L3.6 1.69l9.5 9.51 3.4-3.4z" />
        <path fill="#FBBC04" d="M16.5 14.6l-3.4-3.4-9.5 9.5 12.9-6.1z" />
        <path fill="#34A853" d="M21.2 10.4l-4.7-2.6-3.4 3.4 3.4 3.4 4.7-2.6c.8-.4.8-1.2 0-1.6z" />
      </svg>
      <div className="text-left leading-none">
        <div className="text-[10px] uppercase font-semibold text-white/70 tracking-wider">GET IT ON</div>
        <div className="text-[15px] font-bold text-white tracking-tight mt-0.5 font-display">Google Play</div>
      </div>
    </a>
  );
}

/* ---------- Sanitized Fleet Demo Data (NO personal vehicle plates) ---------- */
const ANONYMOUS_FLEET = [
  {
    id: "UNIT-01",
    title: "Commercial Bus #1",
    type: "AI Dashcam + Live GPS",
    loc: "Delhi - Agra Express Highway (NH 19)",
    speed: "54 km/h",
    ignition: "ON",
    dist: "184 km",
    status: "Online",
    signal: "Strong 4G",
    hasDashcam: true,
  },
  {
    id: "UNIT-02",
    title: "Executive Car #2",
    type: "AI Dashcam Unit",
    loc: "Safdarjung Enclave, New Delhi",
    speed: "0 km/h",
    ignition: "OFF",
    dist: "42 km",
    status: "Parked",
    signal: "Strong 4G",
    hasDashcam: true,
  },
  {
    id: "UNIT-03",
    title: "Fleet Carrier #3",
    type: "Zero-Wire GPS Tracker",
    loc: "National Highway 75, Gwalior Bypass",
    speed: "62 km/h",
    ignition: "ON",
    dist: "278 km",
    status: "Online",
    signal: "Good 4G",
    hasDashcam: false,
  },
];

/* ---------- Detailed Authentic Indian Map Layer matching App Store Screenshots ---------- */
function AuthenticMapCanvas({
  os,
  height = "h-48",
  showDetailedControls = false,
}: {
  os: "ios" | "android";
  height?: string;
  showDetailedControls?: boolean;
}) {
  return (
    <div className={`relative ${height} rounded-2xl overflow-hidden border border-white/10 bg-[#121c24] flex flex-col justify-between p-3 select-none`}>
      {/* High-fidelity Vector Map of Northern & Central India */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 340 220" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="terrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3436" />
            <stop offset="40%" stopColor="#182c2d" />
            <stop offset="100%" stopColor="#142129" />
          </linearGradient>
          <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Landmass Background */}
        <rect width="340" height="220" fill="url(#terrainGrad)" />

        {/* Ocean / Arabian Sea (bottom left corner) */}
        <path d="M 0,165 Q 40,160 50,220 L 0,220 Z" fill="#112233" opacity="0.9" />
        <path d="M 0,175 Q 35,170 45,220" fill="none" stroke="#2563eb" strokeWidth="1" opacity="0.4" />

        {/* State Boundaries (Delicate grey dashed lines) */}
        <path d="M 120,0 L 160,35 L 210,30 L 260,10" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.25" />
        <path d="M 160,35 L 140,90 L 170,120 L 190,160" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.25" />
        <path d="M 50,110 L 140,90 L 120,150 L 50,165" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.25" />
        <path d="M 140,90 L 250,95 L 300,140" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.25" />

        {/* Major River systems (Ganga & Narmada) */}
        <path d="M 170,15 Q 220,50 270,75 T 340,110" fill="none" stroke="#2563eb" strokeWidth="1.2" opacity="0.55" />
        <path d="M 120,145 Q 180,135 240,140" fill="none" stroke="#2563eb" strokeWidth="1" opacity="0.45" />

        {/* Major National Highway Corridors */}
        {/* NH48: Delhi -> Jaipur -> Udaipur -> Surat */}
        <path d="M 185,35 L 155,75 L 110,125 L 75,175" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
        {/* NH19: Delhi -> Agra -> Kanpur */}
        <path d="M 185,35 L 210,65 L 265,95" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        {/* Agra -> Gwalior -> Jhansi -> Bhopal */}
        <path d="M 210,65 L 225,100 L 205,145 L 170,160" fill="none" stroke="#d4a849" strokeWidth="1.6" strokeDasharray="3 2" opacity="0.8" />
        {/* Gujarat -> Indore -> Bhopal */}
        <path d="M 75,175 L 130,160 L 170,160 L 250,175" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.6" />

        {/* State Labels */}
        <text x="145" y="28" fill="#e2e8f0" opacity="0.4" fontSize="7.5" fontWeight="bold" letterSpacing="0.8">HARYANA</text>
        <text x="80" y="70" fill="#e2e8f0" opacity="0.4" fontSize="8" fontWeight="bold" letterSpacing="1">RAJASTHAN</text>
        <text x="235" y="60" fill="#e2e8f0" opacity="0.4" fontSize="8" fontWeight="bold" letterSpacing="1">UTTAR PRADESH</text>
        <text x="150" y="140" fill="#e2e8f0" opacity="0.35" fontSize="7.5" fontWeight="bold" letterSpacing="0.8">MADHYA PRADESH</text>
        <text x="45" y="150" fill="#e2e8f0" opacity="0.35" fontSize="7" fontWeight="bold" letterSpacing="0.8">GUJARAT</text>

        {/* City Nodes */}
        <g fill="#94a3b8" fontSize="6.5" fontWeight="600">
          <circle cx="185" cy="35" r="2.5" fill="#38bdf8" />
          <text x="175" y="30" fill="#ffffff" fontWeight="bold">Delhi NCR</text>

          <circle cx="155" cy="75" r="2" />
          <text x="140" y="73">Jaipur</text>

          <circle cx="95" cy="55" r="1.5" />
          <text x="80" y="53">Bikaner</text>

          <circle cx="210" cy="65" r="2" />
          <text x="215" y="65">Agra</text>

          <circle cx="265" cy="95" r="2" />
          <text x="250" y="105">Kanpur</text>

          <circle cx="110" cy="125" r="1.5" />
          <text x="95" y="132">Udaipur</text>

          <circle cx="170" cy="160" r="2" />
          <text x="175" y="160">Bhopal</text>

          <circle cx="130" cy="160" r="2" />
          <text x="125" y="170">Indore</text>

          <circle cx="75" cy="175" r="2" />
          <text x="80" y="180">Surat</text>

          <circle cx="250" cy="185" r="2" />
          <text x="240" y="195">Nagpur</text>
        </g>

        {/* Vehicle Badge 1 (Near Agra Corridor - Slender Vehicle Marker) */}
        <g transform="translate(202, 50)" filter="url(#badgeShadow)">
          <circle cx="5" cy="9" r="11" fill="#10b981" opacity="0.3" className="animate-ping" />
          {/* Slender Vehicle Marker Icon */}
          <rect x="0" y="0" width="10" height="18" rx="2.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.6" />
          <rect x="1.5" y="1.5" width="7" height="4" rx="1" fill="#f59e0b" />
          <rect x="2" y="6.5" width="6" height="6.5" rx="0.8" fill="#e2e8f0" />
          <circle cx="2" cy="15" r="0.9" fill="#334155" />
          <circle cx="8" cy="15" r="0.9" fill="#334155" />
        </g>

        {/* Vehicle Badge 2 (Near Kanpur/UP Corridor - Moving 62 km/h) */}
        <g transform="translate(252, 82)" filter="url(#badgeShadow)">
          <circle cx="5" cy="9" r="11" fill="#3b82f6" opacity="0.3" className="animate-ping" />
          <rect x="0" y="0" width="10" height="18" rx="2.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.6" />
          <rect x="1.5" y="1.5" width="7" height="4" rx="1" fill="#f59e0b" />
          <rect x="2" y="6.5" width="6" height="6.5" rx="0.8" fill="#e2e8f0" />
          <circle cx="2" cy="15" r="0.9" fill="#334155" />
          <circle cx="8" cy="15" r="0.9" fill="#334155" />
        </g>

        {/* Vehicle Badge 3 (Surat Coast Corridor - Parked) */}
        <g transform="translate(72, 162)" filter="url(#badgeShadow)">
          <rect x="0" y="0" width="10" height="18" rx="2.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.6" />
          <rect x="1.5" y="1.5" width="7" height="4" rx="1" fill="#64748b" />
          <rect x="2" y="6.5" width="6" height="6.5" rx="0.8" fill="#cbd5e1" />
          <circle cx="2" cy="15" r="0.9" fill="#334155" />
          <circle cx="8" cy="15" r="0.9" fill="#334155" />
        </g>
      </svg>

      {/* Top Floating Status Indicator */}
      <div className="relative z-10 flex items-start justify-between">
        <span className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[9.5px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Telemetry
        </span>

        {showDetailedControls && (
          <div className="flex gap-1.5">
            <span className="bg-black/75 backdrop-blur-md p-1.5 rounded-lg text-white/80 border border-white/10">
              <Search className="w-3 h-3" />
            </span>
            <span className="bg-black/75 backdrop-blur-md p-1.5 rounded-lg text-white/80 border border-white/10">
              <Layers className="w-3 h-3" />
            </span>
          </div>
        )}
      </div>

      {/* Bottom Floating Footer */}
      <div className="relative z-10 flex items-end justify-between">
        <div className="bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] text-white/80 font-mono border border-white/10 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow" />
          <span>India Fleet</span>
        </div>

        {/* View Fleet Blue Button */}
        <div className="bg-[#1976d2] hover:bg-[#1565c0] text-white font-bold text-[10px] px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1 border border-white/20">
          <span>View Fleet</span>
          <span className="text-[11px]">→</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Interactive Device Mockup Component ---------- */
function PhoneScreen({
  os,
  view,
}: {
  os: "ios" | "android";
  view: "command" | "fleet" | "map";
}) {
  return (
    <div className="w-full h-full bg-[#0c1017] text-white flex flex-col justify-between select-none overflow-hidden font-sans text-xs">
      {/* OS Status Bar */}
      <div className="pt-2.5 px-5 pb-1 flex items-center justify-between text-[11px] font-semibold text-white/80 shrink-0">
        {os === "ios" ? (
          <>
            <span className="font-bold tracking-tight">3:12</span>
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full border border-white/10 flex items-center justify-center gap-2 px-2 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-white/80 font-mono font-medium">InsureTrack</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px]">5G</span>
              <div className="w-5 h-2.5 rounded-xs border border-white/70 p-0.5 flex items-center">
                <div className="h-full w-4/5 bg-white rounded-2xs" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>3:12 PM</span>
              <span className="text-[8px] bg-white/15 px-1 rounded font-mono">VoLTE</span>
            </div>
            {/* Android Punch Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-white/10" />
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>4G+</span>
              <span className="text-emerald-400 font-mono font-bold">84%</span>
            </div>
          </>
        )}
      </div>

      {/* Screen Content Switcher */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 custom-scrollbar">
        {/* Header Strip matching screenshot */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-[16px] font-bold tracking-tight text-white flex items-center gap-1.5">
              {view === "command" && "Command Center"}
              {view === "fleet" && "Live Fleet Dashboard"}
              {view === "map" && "Live Map Telemetry"}
            </div>
            <div className="flex items-center gap-1.5 text-[10.5px] text-accent-yellow font-semibold mt-0.5">
              <span>✨ INSURE AUDIT EXPERT</span>
              <span className="text-white/40">·</span>
              <span className="text-white/60 font-normal">Updated just now ⟳</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-7 h-7 rounded-full bg-white/10 grid place-items-center text-white/80">
              <Bell className="w-3.5 h-3.5" />
            </span>
            <span className="w-7 h-7 rounded-full bg-white/10 grid place-items-center text-accent-yellow">
              <Moon className="w-3.5 h-3.5" />
            </span>
            <span className="w-7 h-7 rounded-full bg-brand-deep/80 border border-brand text-white font-bold grid place-items-center text-[10px]">
              I
            </span>
          </div>
        </div>

        {/* VIEW 1: COMMAND CENTER (Matching Screenshot 1 & 2) */}
        {view === "command" && (
          <>
            {/* 4 Summary Counter Tiles */}
            <div className="grid grid-cols-4 gap-1.5 bg-[#141b26] p-2 rounded-xl border border-white/8">
              <div className="text-center p-1">
                <div className="flex items-center justify-center gap-1 text-sky-400">
                  <Car className="w-3.5 h-3.5" />
                  <span className="font-extrabold text-[13px] text-white">3</span>
                </div>
                <div className="text-[9px] text-white/50 mt-0.5">Total</div>
              </div>
              <div className="text-center p-1 border-l border-white/8">
                <div className="flex items-center justify-center gap-1 text-emerald-400">
                  <Activity className="w-3.5 h-3.5" />
                  <span className="font-extrabold text-[13px] text-emerald-400">2</span>
                </div>
                <div className="text-[9px] text-white/50 mt-0.5">Online</div>
              </div>
              <div className="text-center p-1 border-l border-white/8">
                <div className="flex items-center justify-center gap-1 text-amber-400">
                  <Power className="w-3.5 h-3.5" />
                  <span className="font-extrabold text-[13px] text-white">0</span>
                </div>
                <div className="text-[9px] text-white/50 mt-0.5">Halted</div>
              </div>
              <div className="text-center p-1 border-l border-white/8">
                <div className="flex items-center justify-center gap-1 text-rose-400">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="font-extrabold text-[13px] text-rose-400">1</span>
                </div>
                <div className="text-[9px] text-white/50 mt-0.5">Offline</div>
              </div>
            </div>

            {/* Authentic Map Layer */}
            <AuthenticMapCanvas os={os} height="h-48" />

            {/* Quick Access Tiles (From Screenshot 1 & 2) */}
            <div>
              <div className="text-[10.5px] uppercase font-bold tracking-wider text-white/50 mb-1.5">Quick Access</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#141b26] p-2.5 rounded-xl border border-white/8 flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/20 grid place-items-center text-amber-400 shrink-0">
                    <Compass className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="font-bold text-[11px] text-white">Live Map</div>
                    <div className="text-[9px] text-amber-400 font-semibold">• 3 tracked</div>
                    <div className="text-[8.5px] text-white/40">Real-time GPS</div>
                  </div>
                </div>

                <div className="bg-[#141b26] p-2.5 rounded-xl border border-white/8 flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 grid place-items-center text-emerald-400 shrink-0">
                    <Gauge className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="font-bold text-[11px] text-white">Dashboard</div>
                    <div className="text-[9px] text-emerald-400 font-semibold">• 2 online</div>
                    <div className="text-[8.5px] text-white/40">Fleet overview</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* VIEW 2: FLEET LIST (Matching Screenshot 3 & 4 - ANONYMIZED) */}
        {view === "fleet" && (
          <>
            {/* Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-[10px]">
              <span className="bg-brand text-white font-bold px-2.5 py-1 rounded-md">All (3)</span>
              <span className="bg-white/10 text-white/80 px-2.5 py-1 rounded-md">Moving (2)</span>
              <span className="bg-white/10 text-white/80 px-2.5 py-1 rounded-md">Parked (1)</span>
            </div>

            {/* List Cards */}
            <div className="space-y-2">
              {ANONYMOUS_FLEET.map((f) => (
                <div key={f.id} className="bg-[#141b26] rounded-xl p-2.5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-brand-soft/20 grid place-items-center text-brand">
                        {f.hasDashcam ? <Video className="w-3.5 h-3.5" /> : <Car className="w-3.5 h-3.5" />}
                      </span>
                      <div>
                        <div className="font-bold text-[11px] text-white">{f.title}</div>
                        <div className="text-[9px] text-white/50">{f.type}</div>
                      </div>
                    </div>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                        f.status === "Online"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      ● {f.status}
                    </span>
                  </div>

                  <div className="text-[9.5px] text-white/70 flex items-center gap-1 bg-black/40 px-2 py-1 rounded">
                    <MapPin className="w-3 h-3 text-accent-yellow shrink-0" />
                    <span className="truncate">{f.loc}</span>
                  </div>

                  {/* Telemetry row */}
                  <div className="grid grid-cols-3 gap-1 text-center bg-white/5 py-1 rounded text-[9.5px]">
                    <div>
                      <span className="text-white/40 block text-[8px]">Speed</span>
                      <span className="font-bold text-white">{f.speed}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[8px]">Ignition</span>
                      <span className={`font-bold ${f.ignition === "ON" ? "text-emerald-400" : "text-rose-400"}`}>
                        {f.ignition}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[8px]">Distance</span>
                      <span className="font-bold text-white">{f.dist}</span>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9.5px]">
                    <span className="text-brand font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Live Tracking
                    </span>
                    <span className="text-accent-yellow font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Past History
                    </span>
                    {f.hasDashcam && (
                      <span className="text-sky-400 font-bold flex items-center gap-1">
                        <Video className="w-3 h-3" /> Video Clip
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* VIEW 3: LIVE MAP (Matching Screenshot 5) */}
        {view === "map" && (
          <div className="space-y-2">
            <AuthenticMapCanvas os={os} height="h-64" showDetailedControls={true} />

            {/* Bottom floating map actions from Screenshot 5 */}
            <div className="flex items-center justify-between gap-2 pt-1 text-[10px]">
              <div className="bg-[#1976d2] text-white px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 shadow">
                <Grid className="w-3 h-3" /> Clusters
              </div>
              <div className="flex items-center gap-1.5">
                <div className="bg-black/70 text-white/90 px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 border border-white/10">
                  <Search className="w-3 h-3 text-sky-400" /> Search
                </div>
                <div className="bg-black/70 text-white/90 px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 border border-white/10">
                  <Crosshair className="w-3 h-3 text-accent-yellow" /> Nearby
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar (Matching App Screens) */}
      <div className="border-t border-white/10 bg-[#0d131d] px-6 py-2.5 flex items-center justify-around text-white/60 shrink-0">
        <div className={`flex flex-col items-center gap-0.5 cursor-pointer ${view === "command" || view === "fleet" ? "text-brand font-bold" : ""}`}>
          <Gauge className="w-4 h-4" />
          <span className="text-[9px]">Dashboard</span>
        </div>
        <div className={`flex flex-col items-center gap-0.5 cursor-pointer ${view === "map" ? "text-brand font-bold" : ""}`}>
          <Compass className="w-4 h-4" />
          <span className="text-[9px]">Live Map</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   MAIN SHOWCASE SECTION COMPONENT
------------------------------------------------------------------- */
export function InsureTrackAppShowcase() {
  const [selectedOS, setSelectedOS] = useState<"ios" | "android">("ios");
  const [selectedView, setSelectedView] = useState<"command" | "fleet" | "map">("command");

  return (
    <section className="relative py-24 bg-night text-white overflow-hidden" id="insure-track-app">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-brand/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 rounded-full bg-accent-yellow/15 blur-3xl pointer-events-none" />
      <BlueprintField className="opacity-15" />

      <div className="relative max-w-[1240px] mx-auto px-6">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-accent-yellow text-[12px] font-bold uppercase tracking-[0.16em] px-4 py-1.5 rounded-full backdrop-blur-md">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Official Mobile Application
            </span>
            <h2 className="mt-4 text-[34px] sm:text-[46px] font-extrabold text-white leading-tight">
              Insure Track™ — <span className="text-accent-yellow italic">Aapki gaadi ka Command Center.</span>
            </h2>
            <Ornament className="mt-4" />
            <p className="mt-3 text-[15px] sm:text-[16px] text-white/75 leading-relaxed">
              Zero wiring-cut live tracking aur AI dashcam ka poora access seedha aapke smartphone par. Real-time location, past trip history, rash driving alerts aur incident video proof — iOS aur Android dono par available.
            </p>
          </div>
        </Reveal>

        {/* 2-Column Split: Features/Download & Interactive Phone Preview */}
        <div className="mt-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Left Column: Feature Highlights & Download Store Hub */}
          <div className="space-y-8">
            {/* 4 Feature Points */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Reveal delay={60}>
                <div className="h-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-brand/40 rounded-2xl p-5 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-brand/20 grid place-items-center text-brand mb-3">
                    <Radio className="w-5 h-5" />
                  </div>
                  <h3 className="text-[16px] font-bold text-white">5-Second Live GPS</h3>
                  <p className="mt-1.5 text-[13px] text-white/65 leading-relaxed">
                    Pinpoint live location update, speed gauge, aur stoppage timers pure India ke highways par.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="h-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-accent-yellow/40 rounded-2xl p-5 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-accent-yellow/20 grid place-items-center text-accent-yellow mb-3">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-[16px] font-bold text-white">Ignition &amp; Anti-Theft</h3>
                  <p className="mt-1.5 text-[13px] text-white/65 leading-relaxed">
                    Unauthorised vehicle movement, towing, ya unexpected ignition start hote hi instant push alerts.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="h-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-sky-400/40 rounded-2xl p-5 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 grid place-items-center text-sky-400 mb-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-[16px] font-bold text-white">90-Day Past Trip Replay</h3>
                  <p className="mt-1.5 text-[13px] text-white/65 leading-relaxed">
                    Pichli trips ka complete route playback, speed logs, aur idle time reports date-wise available.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <div className="h-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-400/40 rounded-2xl p-5 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 grid place-items-center text-emerald-400 mb-3">
                    <Video className="w-5 h-5" />
                  </div>
                  <h3 className="text-[16px] font-bold text-white">Dashcam Proof Export</h3>
                  <p className="mt-1.5 text-[13px] text-white/65 leading-relaxed">
                    Accident ya false claim ke time locked event video seedha insurance surveyor ke liye export karein.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Store Download Row with QR Code */}
            <Reveal delay={300}>
              <div className="bg-gradient-to-r from-white/[0.08] to-white/[0.03] border border-white/15 rounded-2xl p-6 backdrop-blur-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <div className="text-[17px] font-bold text-white">Insure Track App Download Karein</div>
                    <p className="text-[13px] text-white/65 mt-1">
                      Android (8.0+) aur iOS (13.0+) dono ke liye fully optimised.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <GooglePlayBadge />
                      <AppleAppStoreBadge />
                    </div>
                  </div>

                  {/* QR Scan Box */}
                  <div className="hidden md:flex items-center gap-3 bg-black/40 border border-white/10 p-3 rounded-xl shrink-0">
                    <div className="w-16 h-16 bg-white rounded-lg p-1.5 grid place-items-center">
                      <QrCode className="w-full h-full text-night" />
                    </div>
                    <div className="text-left">
                      <div className="text-[11px] font-bold text-accent-yellow uppercase tracking-wider">Scan to Install</div>
                      <div className="text-[10px] text-white/60 leading-tight mt-0.5">
                        Scan with camera to<br />open App / Play Store
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[12px] text-white/50">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Complimentary with Safety Membership
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent-yellow" /> 256-Bit Encrypted Vehicle Telemetry
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Dual-OS Smartphone Container */}
          <Reveal delay={150} variant="right">
            <div className="flex flex-col items-center">
              {/* Controls Bar: OS Switcher & Screen View Switcher */}
              <div className="w-full max-w-[340px] mb-4 space-y-2">
                {/* OS Toggle with Clean SVGs (No Emojis) */}
                <div className="bg-black/60 p-1 rounded-xl border border-white/15 flex items-center justify-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedOS("ios")}
                    className={`flex-1 py-2 rounded-lg text-[12.5px] font-bold flex items-center justify-center gap-2 transition-all ${
                      selectedOS === "ios" ? "bg-white text-night shadow-md" : "text-white/70 hover:text-white"
                    }`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.02.62-2.66 1.37-.57.66-.99 1.73-.86 2.76 1.02.08 2.06-.52 2.6-1.28z" />
                    </svg>
                    <span>iOS (Apple)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOS("android")}
                    className={`flex-1 py-2 rounded-lg text-[12.5px] font-bold flex items-center justify-center gap-2 transition-all ${
                      selectedOS === "android" ? "bg-brand text-white shadow-md" : "text-white/70 hover:text-white"
                    }`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.996-3.4572c.1557-.2698.0632-.6143-.2066-.77-.2698-.1557-.6143-.0632-.77.2066l-2.0241 3.5061c-1.4284-.652-3.0315-1.014-4.8768-1.014-1.8454 0-3.4484.362-4.8769 1.014L5.124 5.3008c-.1557-.2698-.5002-.3623-.77-.2066-.2699.1557-.3624.5002-.2066.77l1.996 3.4572C2.6849 11.2334.3333 15.2285.3333 19.897h23.3334c0-4.6685-2.3516-8.6636-5.7862-10.5756" />
                    </svg>
                    <span>Android (Google)</span>
                  </button>
                </div>

                {/* Screen View Switcher */}
                <div className="flex items-center justify-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSelectedView("command")}
                    className={`px-3 py-1 rounded-md transition ${
                      selectedView === "command" ? "bg-accent-yellow text-night font-bold" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Command Center
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedView("fleet")}
                    className={`px-3 py-1 rounded-md transition ${
                      selectedView === "fleet" ? "bg-accent-yellow text-night font-bold" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Fleet List
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedView("map")}
                    className={`px-3 py-1 rounded-md transition ${
                      selectedView === "map" ? "bg-accent-yellow text-night font-bold" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Live Map
                  </button>
                </div>
              </div>

              {/* Physical Phone Frame */}
              <Tilt max={6}>
                <div className="relative w-[310px] sm:w-[330px] h-[580px] sm:h-[610px] bg-[#1a2230] rounded-[44px] p-3 shadow-2xl border-4 border-[#334155] ring-1 ring-white/20">
                  {/* Phone Side Buttons */}
                  <div className="absolute -left-[7px] top-28 w-[3px] h-10 bg-slate-500 rounded-l-md" />
                  <div className="absolute -left-[7px] top-42 w-[3px] h-10 bg-slate-500 rounded-l-md" />
                  <div className="absolute -right-[7px] top-32 w-[3px] h-14 bg-slate-500 rounded-r-md" />

                  {/* Inner Screen Bezel */}
                  <div className="w-full h-full rounded-[34px] overflow-hidden border border-black/80 shadow-inner">
                    <PhoneScreen os={selectedOS} view={selectedView} />
                  </div>
                </div>
              </Tilt>

              <div className="mt-3 text-center text-[11.5px] text-white/50">
                <span>Interactive Live Preview · Toggle between iOS &amp; Android layouts above</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
