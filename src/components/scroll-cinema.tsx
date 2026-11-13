import { useEffect, useRef, useState, type ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Camera, MapPin, ShieldCheck, Radio, Sparkles, Pause, Play } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/motion";

export type CinemaBeat = {
  icon: ComponentType<{ className?: string }>;
  stepNumber: string;
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
    stepNumber: "01",
    kicker: "Pillar 01 · Live Drive",
    title: "Har trip record hoti hai.",
    body: "Full-HD loop recording with night-vision clarity. Raat ke andhere mein bhi number plates crystal clear readable rehti hain — dispute-free proof.",
  },
  {
    icon: MapPin,
    stepNumber: "02",
    kicker: "Pillar 02 · Smart Track",
    title: "Har location live dikhti hai.",
    body: "Zero wiring-cut GPS tracking. Live speed, playback route history aur harsh-braking alerts seedha aapke mobile phone par aate hain.",
  },
  {
    icon: ShieldCheck,
    stepNumber: "03",
    kicker: "Pillar 03 · Instant Claim Proof",
    title: "Impact par footage instant lock.",
    body: "G-sensor collision ya jhatka detect karte hi evidence clip ko permanently lock kar deta hai — surveyor aur insurance company ke samne solid proof.",
  },
];

/**
 * Wishlink-Style Full-Screen Evidence Showcase:
 * - 100% full-bleed background video with dark vignettes (NO blank screen or empty height).
 * - Left-side vertical step navigator (01, 02, 03) that automatically cycles & switches on click or scroll.
 * - Zero empty scroll gaps or sticky clipping bugs.
 */
export function ScrollCinema({
  sources = [
    { src: "/media/road-loop.webm", type: "video/webm" },
    { src: "/media/road-loop.mp4", type: "video/mp4" },
  ],
  poster = "/media/road-poster.jpg",
  badge = "Live Evidence Reel",
  beats = DEFAULT_BEATS,
  ctaTo = "/ai-dashcam-tracking",
  ctaLabel = "Dekhein kaise kaam karta hai",
}: Props) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(48);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduced = usePrefersReducedMotion();

  // Smooth auto-cycle between steps every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % beats.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, beats.length]);

  // Realistic dynamic CANbus / GPS telematics speed simulation
  useEffect(() => {
    let target = 51;

    // Shift the driver's target cruise speed every 2.2s between 43 and 54 km/h
    const targetTimer = setInterval(() => {
      target = Math.floor(43 + Math.random() * 12);
    }, 2200);

    // Smoothly tick the speedometer towards target speed every 480ms
    const speedTimer = setInterval(() => {
      setSpeed((prev) => {
        const diff = target - prev;
        if (diff === 0) {
          // Subtle road micro-jitter when holding steady
          const jitter = Math.random() < 0.5 ? (Math.random() < 0.5 ? 1 : -1) : 0;
          return Math.max(42, Math.min(56, prev + jitter));
        }
        const step = Math.abs(diff) >= 3 ? 2 : 1;
        const next = prev + Math.sign(diff) * step;
        return Math.max(42, Math.min(56, next));
      });
    }, 480);

    return () => {
      clearInterval(targetTimer);
      clearInterval(speedTimer);
    };
  }, []);

  return (
    <section
      className="relative min-h-[580px] sm:min-h-[640px] md:min-h-[820px] lg:min-h-[880px] bg-night text-white overflow-hidden flex flex-col justify-between py-5 sm:py-8 md:py-16 lg:py-20 border-y border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-no-autoreveal
    >
      {/* 1. FULL-SCREEN BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        poster={poster}
        muted
        playsInline
        preload="auto"
        autoPlay
        loop
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover z-0 opacity-90 md:opacity-85"
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>

      {/* Cinematic Vignettes: Desktop gets side gradient, Mobile gets bottom gradient so video stays bright & clear */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-night/95 via-night/80 to-night/25 z-[1] pointer-events-none" />
      <div className="md:hidden absolute inset-0 bg-gradient-to-t from-night via-night/40 to-black/30 z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-night/60 z-[1] pointer-events-none" />

      {/* Top HUD Bar */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 bg-night/80 backdrop-blur-md border border-white/20 text-accent-yellow text-[10.5px] sm:text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-md">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {badge}
          </span>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="inline-flex items-center gap-1 text-[10.5px] sm:text-xs font-mono text-white/70 hover:text-white bg-black/40 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full border border-white/15 transition"
          >
            {isPaused ? <Play className="w-3 h-3 text-brand" /> : <Pause className="w-3 h-3 text-accent-yellow" />}
            <span className="hidden sm:inline">{isPaused ? "Paused" : "Auto-playing"}</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/15 text-[10.5px] sm:text-xs font-mono text-white/90 shadow-md">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-red-400 font-bold">REC</span>
          <span className="text-white/60 hidden sm:inline">1080P</span>
          <span className="text-accent-yellow ml-1 sm:ml-2 flex items-center gap-1.5 font-mono">
            <Radio className="w-3 h-3 text-brand animate-pulse" />
            <span className="font-bold tabular-nums inline-block min-w-[18px] text-right text-accent-yellow">
              {speed}
            </span>
            <span className="text-[10px] sm:text-[11px] text-accent-yellow/90">KM/H</span>
          </span>
        </div>
      </div>

      {/* Main Content Area: Desktop is centered 2-column, Mobile is clean bottom drawer overlay */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full relative z-10 mt-auto md:my-auto py-2 md:py-8">
        <div className="max-w-2xl">
          {/* Wishlink Headline (Hidden on ultra-small mobile to prevent video clutter, prominent on desktop) */}
          <div className="mb-3 sm:mb-4 md:mb-8">
            <h2 className="text-[20px] sm:text-[28px] md:text-[44px] lg:text-[50px] font-extrabold text-white tracking-tight leading-[1.1]">
              Har Trip Record. <span className="text-accent-yellow">Har Location Live.</span>
            </h2>
            <p className="hidden sm:block mt-1 sm:mt-2 text-[13px] sm:text-[16px] text-white/80 font-medium">
              In just 03 easy steps &amp; intelligent protection pillars
            </p>
          </div>

          {/* Mobile Horizontal Pill Stepper (< md) */}
          <div className="flex md:hidden items-center gap-1.5 mb-2.5 overflow-x-auto pb-0.5 scrollbar-none">
            {beats.map((b, i) => {
              const on = i === active;
              const stepNum = b.stepNumber || String(i + 1).padStart(2, "0");
              return (
                <button
                  key={b.title || i}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setIsPaused(true);
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold font-mono transition-all shrink-0 ${
                    on
                      ? "bg-accent-yellow text-night shadow-md ring-2 ring-accent-yellow/40 font-extrabold"
                      : "bg-black/60 text-white/80 border border-white/20 backdrop-blur-md"
                  }`}
                >
                  <span>{stepNum}</span>
                  <span className="truncate max-w-[85px]">{b.kicker.split("·")[1]?.trim() || b.kicker}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop & Mobile Step Layout */}
          <div className="flex gap-4 md:gap-8 items-start">
            {/* Desktop Vertical Step Rail (Hidden on mobile) */}
            <div className="hidden md:flex flex-col items-center gap-3 pt-1 shrink-0">
              {beats.map((b, i) => {
                const on = i === active;
                const stepNum = b.stepNumber || String(i + 1).padStart(2, "0");
                return (
                  <div key={b.title || i} className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setActive(i);
                        setIsPaused(true);
                      }}
                      className={`transition-all duration-300 rounded-full flex items-center justify-center font-mono font-bold text-xs cursor-pointer ${
                        on
                          ? "w-10 h-10 bg-accent-yellow text-night shadow-xl ring-4 ring-accent-yellow/30 scale-110"
                          : "w-8 h-8 bg-white/15 text-white/60 hover:bg-white/30 hover:text-white"
                      }`}
                    >
                      {stepNum}
                    </button>
                    {i < beats.length - 1 && (
                      <div
                        className={`w-0.5 h-8 transition-colors duration-300 my-1.5 ${
                          i < active ? "bg-accent-yellow" : "bg-white/20"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Dynamic Step Content Card */}
            <div className="relative min-h-[140px] sm:min-h-[160px] md:min-h-[190px] flex-1 bg-night/80 md:bg-night/85 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl p-3.5 sm:p-5 md:p-7 shadow-2xl">
              {beats.map((b, i) => {
                const on = i === active;
                return (
                  <div
                    key={b.title || i}
                    className={`transition-all duration-500 ease-out ${
                      on
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-3 pointer-events-none absolute inset-0 p-3.5 sm:p-5 md:p-7"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-accent-yellow/20 border border-accent-yellow/40 grid place-items-center text-accent-yellow shrink-0">
                        <b.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-accent-yellow font-mono truncate">
                        {b.kicker}
                      </span>
                    </div>

                    <h3 className="text-[15px] sm:text-[20px] md:text-[26px] font-extrabold text-white leading-tight">
                      {b.title}
                    </h3>

                    <p className="mt-1 sm:mt-2 text-[12px] sm:text-[14.5px] text-white/85 leading-relaxed font-normal line-clamp-2 md:line-clamp-none">
                      {b.body}
                    </p>

                    {/* Step Progress Line */}
                    <div className="mt-2.5 sm:mt-3 flex items-center justify-between gap-3 pt-2 border-t border-white/10 text-[10px] sm:text-xs font-mono text-white/60">
                      <span>Pillar {i + 1} of {beats.length}</span>
                      <div className="flex items-center gap-1.5">
                        {beats.map((_, dotIdx) => (
                          <span
                            key={dotIdx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              dotIdx === active ? "w-4 sm:w-5 bg-accent-yellow" : "w-1.5 bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Wishlink Pill Bar */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 w-full relative z-10 mt-2 sm:mt-4">
        <div className="bg-white/95 backdrop-blur-md text-night rounded-xl sm:rounded-full px-3.5 sm:px-8 py-2 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 shadow-2xl border border-white/40">
          <span className="text-[11.5px] sm:text-[14px] font-bold text-night text-center sm:text-left truncate">
            Complimentary AI Dashcam &amp; GPS with Safety Membership
          </span>
          <Link
            to={ctaTo as "/ai-dashcam-tracking"}
            className="sheen inline-flex items-center justify-center gap-1.5 bg-night hover:bg-brand text-white font-bold text-[11.5px] sm:text-[13px] px-4 sm:px-6 py-1.5 sm:py-2 rounded-full transition shrink-0 shadow-sm w-full sm:w-auto"
          >
            {ctaLabel} <ArrowRight className="w-3.5 h-3.5 text-accent-yellow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
