import { useEffect, useRef, useState, type ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Camera, MapPin, ShieldCheck, Radio } from "lucide-react";
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
    kicker: "00:02 · Drive",
    title: "Har trip record hoti hai.",
    body: "Full-HD front recording with night-vision clarity. Raat ke andhere mein bhi number plate crystal clear readable rehti hai.",
  },
  {
    icon: MapPin,
    kicker: "00:07 · Track",
    title: "Har location live dikhti hai.",
    body: "Zero wiring-cut GPS tracking. Live speed, route history aur harsh-driving alerts seedha aapke mobile phone par.",
  },
  {
    icon: ShieldCheck,
    kicker: "00:14 · Claim",
    title: "Impact par footage instant lock.",
    body: "G-sensor collision ya jhatka detect karte hi evidence clip ko permanently lock kar deta hai — surveyor aur police ke samne solid video proof.",
  },
];

/**
 * Full-screen scroll-scrubbed evidence reel:
 * Video fully covers the entire screen, smoothly scrubbed as user scrolls,
 * with real-time HUD telemetry and synchronized cinematic captions.
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
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [p, setP] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    let target = 0;
    let current = 0;

    const measure = () => {
      const r = wrap.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      target = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
    };

    const loop = () => {
      current += (target - current) * 0.14;
      setP(current);
      raf = requestAnimationFrame(loop);
    };

    measure();
    current = target;
    raf = requestAnimationFrame(loop);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  /** Pause video when completely off-screen */
  useEffect(() => {
    const wrap = wrapRef.current;
    const v = videoRef.current;
    if (!wrap || !v || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.01 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [reduced]);

  const active = Math.min(beats.length - 1, Math.floor(p * beats.length * 0.999));

  return (
    <div ref={wrapRef} className="relative h-[175vh] sm:h-[190vh] bg-night" data-no-autoreveal>
      {/* Sticky Full-Screen Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Full-Cover Background Video */}
        <video
          ref={videoRef}
          poster={poster}
          muted
          playsInline
          preload="auto"
          autoPlay
          loop
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            transform: `translate3d(0, ${(p - 0.5) * -6}%, 0) scale(1.08)`,
            filter: "saturate(1.05) contrast(1.03)",
          }}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>

        {/* Cinematic Vignettes & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-night/65 to-night/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/60" />

        {/* Top HUD Telemetry Bar */}
        <div className="absolute top-6 left-6 right-6 sm:left-12 sm:right-12 z-20 flex items-center justify-between pointer-events-none text-xs font-mono tracking-wider text-white/90">
          <div className="flex items-center gap-2.5 bg-night/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-400 font-bold">● REC LIVE</span>
            <span className="text-white/60 hidden sm:inline">1080P · 60FPS</span>
          </div>
          <div className="flex items-center gap-2 bg-night/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-accent-yellow shadow-md">
            <Radio className="w-3.5 h-3.5 text-brand" />
            <span className="font-bold">GPS: 48 KM/H</span>
          </div>
        </div>

        {/* Bottom HUD Scrub Progress Rail */}
        <div className="absolute left-6 right-6 bottom-6 sm:left-12 sm:right-12 z-20">
          <div className="max-w-[1240px] mx-auto flex items-center gap-4 bg-night/70 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-lg">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-accent-yellow shrink-0">
              TIMELINE {String(Math.round(p * 100)).padStart(3, "0")}%
            </span>
            <div className="relative h-2 flex-1 rounded-full bg-white/15 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand to-accent-yellow transition-all duration-150"
                style={{ width: `${Math.max(4, p * 100)}%` }}
              />
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs font-mono text-white/60">
              <span>G-SENSOR: <strong className="text-brand">ARMED</strong></span>
              <span>LOCK: <strong className="text-accent-yellow">ACTIVE</strong></span>
            </div>
          </div>
        </div>

        {/* Main Content Overlay Card */}
        <div className="relative h-full w-full max-w-[1240px] mx-auto px-6 flex items-center pt-16 pb-24 z-10">
          <div className="w-full max-w-lg lg:max-w-xl">
            <span className="inline-flex items-center gap-2 bg-night/85 backdrop-blur-md border border-accent-yellow/40 text-accent-yellow text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-md">
              {badge}
            </span>

            {/* Captions Frame */}
            <div className="mt-5 grid">
              {beats.map((b, i) => {
                const on = i === active;
                return (
                  <div
                    key={b.title}
                    className="col-start-1 row-start-1 rounded-2xl border border-white/15 bg-night/75 backdrop-blur-md p-6 sm:p-8 shadow-2xl transition-all duration-700"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: on ? "translate3d(0,0,0)" : `translate3d(0,${i < active ? -28 : 28}px,0)`,
                      filter: on ? "blur(0)" : "blur(8px)",
                      pointerEvents: on ? "auto" : "none",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 shrink-0 rounded-xl bg-accent-yellow/20 border border-accent-yellow/40 grid place-items-center text-accent-yellow">
                        <b.icon className="w-5 h-5" />
                      </span>
                      <span className="font-mono text-xs font-bold tracking-[0.2em] text-accent-yellow">
                        {b.kicker}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[26px] sm:text-[34px] lg:text-[38px] leading-[1.12] font-extrabold text-white tracking-tight">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-[15px] sm:text-[16px] text-white/80 leading-relaxed font-normal">
                      {b.body}
                    </p>

                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                      <Link
                        to={ctaTo as "/ai-dashcam-tracking"}
                        className="sheen inline-flex items-center gap-2 bg-accent-yellow hover:bg-white text-night font-bold text-[14px] px-6 py-3 rounded-full transition shadow-md"
                      >
                        {ctaLabel} <ArrowRight className="w-4 h-4" />
                      </Link>
                      <span className="text-xs text-white/50 font-mono hidden sm:inline">
                        Scroll to explore next beat ↓
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
