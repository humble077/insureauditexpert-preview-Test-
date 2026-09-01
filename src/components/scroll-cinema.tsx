import { useEffect, useRef, useState, type ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Camera, MapPin, ShieldCheck } from "lucide-react";
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
    body: "Full-HD front recording, night-vision clarity. Number plate raat mein bhi readable.",
  },
  {
    icon: MapPin,
    kicker: "00:07 · Track",
    title: "Har location live dikhti hai.",
    body: "Zero wiring-cut GPS. Speed, route aur harsh-driving alerts seedha aapke mobile par.",
  },
  {
    icon: ShieldCheck,
    kicker: "00:14 · Claim",
    title: "Impact par footage lock.",
    body: "G-sensor collision detect karta hai aur clip overwrite nahi hoti — surveyor ke liye clean proof.",
  },
];

/**
 * Scroll-scrubbed film strip: the video timeline is driven by scroll position
 * while captions cut in and out like an edited sequence.
 */
export function ScrollCinema({
  sources = [
    { src: "/media/road-loop.webm", type: "video/webm" },
    { src: "/media/road-loop.mp4", type: "video/mp4" },
  ],
  poster,
  badge = "Evidence Reel",
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
      current += (target - current) * 0.12;
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

  /** Pause the clip when the section is off-screen so it never fights for bandwidth. */
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
    <div ref={wrapRef} className="relative h-[320vh] bg-night" data-no-autoreveal>
      <div className="sticky top-0 h-screen overflow-hidden">
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
            transform: `translate3d(0, ${(p - 0.5) * -4}%, 0) scale(1.06)`,
            filter: "saturate(1.02) contrast(1.02)",
          }}
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/70 to-night/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/60" />

        {/* scrub rail */}
        <div className="absolute left-6 right-6 bottom-5 sm:left-12 sm:right-12 z-10">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.22em] text-accent-yellow">
              REC {String(Math.round(p * 100)).padStart(3, "0")}%
            </span>
            <div className="relative h-[3px] flex-1 rounded-full bg-white/15">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-accent-yellow"
                style={{ width: `${p * 100}%` }}
              />
              {beats.map((b, i) => (
                <span
                  key={b.title}
                  className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
                  style={{
                    left: `${(i / beats.length) * 100}%`,
                    background: i <= active ? "var(--accent-yellow)" : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-full w-full max-w-[1240px] mx-auto px-5 sm:px-6 flex items-end sm:items-center pt-16 pb-28 sm:pb-32">
          <div className="w-full max-w-[300px] sm:max-w-[360px]">
            <span className="inline-flex items-center gap-2 bg-night/60 backdrop-blur border border-accent-yellow/40 text-accent-yellow text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              {badge}
            </span>
            <div className="mt-4 grid">
              {beats.map((b, i) => {
                const on = i === active;
                return (
                  <div
                    key={b.title}
                    className="col-start-1 row-start-1 rounded-xl border border-white/10 bg-night/35 backdrop-blur-sm p-4 transition-all duration-700"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: on ? "translate3d(0,0,0)" : `translate3d(0,${i < active ? -24 : 24}px,0)`,
                      filter: on ? "blur(0)" : "blur(6px)",
                      pointerEvents: on ? "auto" : "none",
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 shrink-0 rounded-lg bg-accent-yellow/15 border border-accent-yellow/30 grid place-items-center">
                        <b.icon className="w-4 h-4 text-accent-yellow" />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-white/55">{b.kicker}</span>
                    </div>
                    <h3 className="mt-3 text-[19px] sm:text-[22px] leading-[1.12] font-extrabold text-white">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-white/70 leading-snug">{b.body}</p>
                    <Link
                      to={ctaTo as "/contact"}
                      className="mt-4 inline-flex items-center gap-2 bg-accent-yellow text-night font-bold text-[12px] px-4 py-2 rounded-full hover:bg-white transition"
                    >
                      {ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
