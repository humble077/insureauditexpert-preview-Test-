import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------
   Motion primitives — mechanical, precise easing (60fps.fr / anime.js /
   fleetx.ai inspired). No runtime animation library: IntersectionObserver
   + rAF + CSS custom properties only, so it stays fast and SSR-safe.
------------------------------------------------------------------- */

export const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(threshold = 0.18, once = true) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    // Immediate check: if it's already in (or above) the viewport, show it now.
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) setShown(true);
    };
    check();

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) setShown(false);
      },
      { threshold: Math.min(threshold, 0.05), rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);

    // Safety net: never leave content invisible.
    const t = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) setShown(true);
    }, 1200);

    window.addEventListener("scroll", check, { passive: true, capture: true });
    const poll = window.setInterval(check, 300);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
      window.clearInterval(poll);
      window.removeEventListener("scroll", check, { capture: true } as any);
    };
  }, [threshold, once]);
  return { ref, shown };
}


type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** up | left | right | clip | blur | scale */
  variant?: "up" | "left" | "right" | "clip" | "blur" | "scale";
  duration?: number;
};

const FROM: Record<NonNullable<RevealProps["variant"]>, string> = {
  up: "translate3d(0,30px,0)",
  left: "translate3d(-34px,0,0)",
  right: "translate3d(34px,0,0)",
  clip: "translate3d(0,18px,0)",
  blur: "translate3d(0,14px,0)",
  scale: "scale(0.965)",
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
  duration = 760,
}: RevealProps) {
  const { ref, shown } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : FROM[variant],
        filter: variant === "blur" && !shown ? "blur(10px)" : "none",
        clipPath:
          variant === "clip"
            ? shown
              ? "inset(0 0 0% 0)"
              : "inset(0 0 100% 0)"
            : undefined,
        willChange: "opacity, transform",
        transition: [
          `opacity ${duration}ms ${EASE} ${delay}ms`,
          `transform ${duration + 90}ms ${EASE} ${delay}ms`,
          `filter ${duration}ms ${EASE} ${delay}ms`,
          `clip-path ${duration + 160}ms ${EASE} ${delay}ms`,
        ].join(", "),
      }}
    >
      {children}
    </div>
  );
}

/** anime.js-style per-character stagger. Words never break across lines. */
export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 26,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "div";
}) {
  const { ref, shown } = useInView<HTMLSpanElement>(0.2);
  const words = text.split(" ");
  let n = 0;
  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={`${w}-${wi}`} className="inline-block whitespace-nowrap" aria-hidden>
          {[...w].map((ch, ci) => {
            const i = n++;
            return (
              <span key={ci} className="inline-block overflow-hidden align-bottom">
                <span
                  className="inline-block"
                  style={{
                    opacity: shown ? 1 : 0,
                    transform: shown ? "none" : "translateY(0.9em) rotate(4deg)",
                    transition: `opacity 520ms ${EASE} ${delay + i * stagger}ms, transform 700ms ${EASE} ${delay + i * stagger}ms`,
                  }}
                >
                  {ch}
                </span>
              </span>
            );
          })}
          {wi < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}

/** Scroll progress 0→1 of the whole document. */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

/** Progress 0→1 of an element travelling through the viewport. */
export function useElementProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        setP(total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, p };
}

/** Scroll direction helper: 'down' | 'up' | null (initial). */
export function useScrollDirection() {
  const [dir, setDir] = useState<"down" | "up" | null>(null);
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    let pending: "down" | "up" | null = null;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y !== last) {
          pending = y > last ? "down" : "up";
          last = y;
          setDir(pending);
        }
      });
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return dir;
}

/** Magnetic hover — the element leans toward the cursor and snaps back. */
export function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const leave = () => {
      el.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength, reduced]);
  return (
    <span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ transition: `transform 520ms ${EASE}` }}
    >
      {children}
    </span>
  );
}

/** Subtle instrument-panel tilt + cursor spotlight for cards. */
export function Tilt({
  children,
  className = "",
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateY(-3px)`;
    };
    const leave = () => {
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max, reduced]);
  return (
    <div
      ref={ref}
      className={`tilt-card h-full ${className}`}
      style={{ transition: `transform 620ms ${EASE}` }}
    >
      {children}
    </div>
  );
}

/** Odometer-style counter with mechanical ease-out. */
export function Counter({
  to,
  suffix = "",
  duration = 1700,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, shown } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!shown) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/** Thin document scroll indicator. */
export function ScrollProgressBar() {
  const p = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-brand origin-left"
        style={{ transform: `scaleX(${p})`, transition: "transform 90ms linear" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
   Extra flourishes: cursor spotlight, parallax, scramble text,
   gradient-sweep headings, ticking marquee and a site-wide
   auto-reveal observer.
------------------------------------------------------------------- */

/** Soft brand-coloured light that trails the cursor across the page. */
export function CursorGlow() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
    };
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);
  if (reduced) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="cursor-glow pointer-events-none fixed top-0 left-0 z-[5] hidden md:block h-[520px] w-[520px] rounded-full opacity-0"
      style={{ transition: "opacity 600ms ease" }}
    />
  );
}

/** Depth parallax: shifts the child as it travels through the viewport. */
export function Parallax({
  children,
  speed = 0.12,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${(-mid * speed).toFixed(2)}px, 0)`;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [speed, reduced]);
  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/*";

/** Terminal-style scramble that resolves into the real words in view. */
export function ScrambleText({
  text,
  className = "",
  speed = 34,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const { ref, shown } = useInView<HTMLSpanElement>(0.35);
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!shown || reduced) {
      setOut(text);
      return;
    }
    let frame = 0;
    let raf = 0;
    let last = 0;
    const total = text.length;
    const tick = (t: number) => {
      if (t - last >= speed) {
        last = t;
        frame += 1;
        const done = Math.floor(frame / 2);
        setOut(
          text
            .split("")
            .map((ch, i) => {
              if (i < done || ch === " ") return ch;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join(""),
        );
        if (done >= total) return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, text, speed, reduced]);
  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}

/** Endless ticker strip — pauses on hover. */
export function Ticker({
  items,
  className = "",
  duration = 26,
  reverse = false,
}: {
  items: ReactNode[];
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={`ticker ${className}`}>
      <div
        className="ticker-track"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((it, i) => (
          <span key={i} className="ticker-item">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Site-wide auto reveal. Staggers the direct children of every section
 * container that has not already been wrapped in a <Reveal>. Fails open:
 * everything is forced visible after a short timeout.
 */
export function useAutoReveal(dep?: unknown) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const targets: HTMLElement[] = [];
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>("section").forEach((section) => {
        section.querySelectorAll<HTMLElement>(":scope > div").forEach((container) => {
          Array.from(container.children).forEach((child, i) => {
            const el = child as HTMLElement;
            if (!(el instanceof HTMLElement)) return;
            if (el.dataset["autoreveal"] || el.closest("[data-no-autoreveal]")) return;
            if (el.getBoundingClientRect().height === 0) return;
            el.dataset["autoreveal"] = "1";
            el.style.setProperty("--ar-delay", `${Math.min(i, 6) * 70}ms`);
            el.classList.add("ar");
            targets.push(el);
          });
        });
      });

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("ar-in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.04, rootMargin: "0px 0px -4% 0px" },
      );
      targets.forEach((t) => {
        const r = t.getBoundingClientRect();
        if (r.top < window.innerHeight) t.classList.add("ar-in");
        else io.observe(t);
      });
      window.setTimeout(() => targets.forEach((t) => t.classList.add("ar-in")), 2200);
    });

    return () => {
      cancelAnimationFrame(raf);
      targets.forEach((t) => {
        t.classList.add("ar-in");
      });
    };
  }, [dep]);
}
