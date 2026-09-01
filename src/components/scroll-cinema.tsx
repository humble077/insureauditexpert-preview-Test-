import { useEffect, useRef, useState, type ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Camera, MapPin, ShieldCheck, Play, Pause, Disc, Radio } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/motion";

export type CinemaBeat = {
  icon: ComponentType<{ className?: string }>;
  kicker: string;
  title: string;
  body: string;
};

type Props = {
  /** Video sources in preference order */
  sources?: { src: string; type: string }[];
  poster?: string;
  badge?: string;
  beats?: CinemaBeat[];
  ctaTo?: string;
  ctaLabel?: string;
};

const DEFAULT_BEATS: CinemaBeat[] = [
  {
    icon: Camera,
    kicker: "Pillar 01 · Drive",
    title: "Har trip record hoti hai.",
    body: "Full-HD loop front recording with night-vision clarity. Raat mein bhi vehicle number plates crystal clear readable rehti hain.",
  },
  {
    icon: MapPin,
    kicker: "Pillar 02 · Track",
    title: "Har location live dikhti hai.",
    body: "Zero wiring-cut GPS tracking. Live speed, playback route history aur harsh-braking alerts seedha aapke mobile phone par.",
  },
  {
    icon: ShieldCheck,
    kicker: "Pillar 03 · Claim",
    title: "Impact par footage instant lock.",
    body: "G-sensor collision ya jhatka detect karte hi evidence clip ko permanently lock kar deta hai — surveyor aur police ke samne solid proof.",
  },
];

export function ScrollCinema({
  sources = [
    { src: "/media/road-loop.webm", type: "video/webm" },
    { src: "/media/road-loop.mp4", type: "video/mp4" },
  ],
  poster = "/media/road-poster.jpg",
  badge = "Live Evidence Reel",
  beats = DEFAULT_BEATS,
  ctaTo = "/ai-dashcam-tracking",
  ctaLabel = "Dekhein Kaise Kaam Karta Hai",
}: Props) {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduced = usePrefersReducedMotion();

  // Auto-advance tabs smoothly every 5 seconds if not paused
  useEffect(() => {
    if (!isPlaying || reduced) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % beats.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, reduced, beats.length]);

  return (
    <section className="py-14 sm:py-20 bg-night text-white relative overflow-hidden" data-no-autoreveal>
      {/* Subtle background radial glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-deep/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-accent-yellow text-[12px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
              <Disc className="w-3.5 h-3.5 animate-spin" /> {badge}
            </span>
            <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-extrabold text-white tracking-tight leading-[1.08]">
              Har Trip Record. Har Location Live.
            </h2>
            <p className="mt-2 text-[15px] sm:text-[16px] text-white/70 max-w-2xl">
              Real-time dashcam footage aur live GPS telematics — incident ke waqt aapki baat ko 100% video proof ke saath support karta hai.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg transition"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "Auto-playing" : "Paused"}</span>
            </button>
          </div>
        </div>

        {/* Evidence Cinema Theater Frame */}
        <div className="rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-md overflow-hidden shadow-2xl grid lg:grid-cols-[1.25fr_1fr]">
          {/* Left: Video / Live HUD Player */}
          <div className="relative min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] bg-black/80 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              poster={poster}
              muted
              playsInline
              preload="auto"
              autoPlay
              loop
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-85"
            >
              {sources.map((s) => (
                <source key={s.src} src={s.src} type={s.type} />
              ))}
            </video>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-night/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-night/40 via-transparent to-transparent pointer-events-none" />

            {/* Top HUD Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none text-[11px] font-mono tracking-wider text-white/90">
              <div className="flex items-center gap-2 bg-night/80 backdrop-blur px-3 py-1 rounded-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-400 font-bold">● REC</span>
                <span className="text-white/60">1080P · 60FPS</span>
              </div>
              <div className="flex items-center gap-2 bg-night/80 backdrop-blur px-3 py-1 rounded-md border border-white/10 text-accent-yellow">
                <Radio className="w-3.5 h-3.5 text-brand" />
                <span>GPS LIVE · 48 KM/H</span>
              </div>
            </div>

            {/* Bottom HUD Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none text-[11px] font-mono text-white/80">
              <div className="bg-night/80 backdrop-blur px-3 py-1.5 rounded-md border border-white/10">
                <span className="text-white/50">G-SENSOR: </span>
                <span className="text-brand font-bold">ARMED (0.02G)</span>
              </div>
              <div className="bg-night/80 backdrop-blur px-3 py-1.5 rounded-md border border-white/10">
                <span className="text-white/50">STORAGE: </span>
                <span className="text-accent-yellow font-bold">LOCK PROTECTED</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Beat Cards */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-night/60">
            <div className="space-y-3">
              {beats.map((b, i) => {
                const on = i === active;
                return (
                  <button
                    key={b.title}
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setIsPlaying(false);
                    }}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border ${
                      on
                        ? "bg-white/10 border-accent-yellow/50 shadow-lg"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-9 h-9 rounded-xl grid place-items-center transition-colors ${
                            on ? "bg-accent-yellow text-night font-bold shadow-xs" : "bg-white/10 text-white/70"
                          }`}
                        >
                          <b.icon className="w-4 h-4" />
                        </span>
                        <span className="text-[12px] font-bold uppercase tracking-wider text-accent-yellow font-mono">
                          {b.kicker}
                        </span>
                      </div>
                      {on && (
                        <span className="text-[11px] font-bold text-brand bg-brand-soft/20 border border-brand/40 px-2.5 py-0.5 rounded-full">
                          Active Reel
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2.5 text-[17px] sm:text-[19px] font-bold text-white leading-snug">
                      {b.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-white/75 leading-relaxed font-normal">
                      {b.body}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Bottom CTA Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/10">
              <div className="text-[12px] text-white/60">
                <span>Free installation with Membership</span>
              </div>
              <Link
                to={ctaTo as "/ai-dashcam-tracking"}
                className="sheen inline-flex items-center justify-center gap-2 bg-accent-yellow hover:bg-white text-night font-bold text-[14px] px-6 py-3 rounded-xl transition shadow-md"
              >
                {ctaLabel} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
