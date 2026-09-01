import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/motion";
import { INDIA_OUTLINE } from "@/lib/india-path";

/* ------------------------------------------------------------------ */
/* Blueprint field — a soft engineering grid with drifting brand glow   */
/* ------------------------------------------------------------------ */
export function BlueprintField({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const line = tone === "dark" ? "rgba(255,255,255,0.07)" : "rgba(10,27,61,0.06)";
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 grid-drift"
        style={{
          backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 78%)",
        }}
      />
      <span className="glow-orb glow-orb-a" />
      <span className="glow-orb glow-orb-b" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hand-drawn underline that draws itself when scrolled into view      */
/* ------------------------------------------------------------------ */
export function DrawUnderline({
  children,
  color = "var(--accent-yellow)",
}: {
  children: ReactNode;
  color?: string;
}) {
  const { ref, shown: inView } = useInView<HTMLSpanElement>(0.4);
  return (
    <span ref={ref} className="relative inline-block">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 220 14"
        preserveAspectRatio="none"
        className="absolute -bottom-2 left-0 h-[10px] w-full overflow-visible"
      >
        <path
          d="M2 9.5C38 4.2 78 3 112 5.4c30 2.1 62 4.3 106 1.1"
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: inView ? 0 : 1,
            transition: "stroke-dashoffset 900ms cubic-bezier(0.16,1,0.3,1) 120ms",
          }}
        />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Coverage map — route draws itself, a vehicle dot runs the corridor  */
/* ------------------------------------------------------------------ */
const NODES: { x: number; y: number; label: string; left?: boolean }[] = [
  { x: 133, y: 140, label: "Delhi NCR", left: true },
  { x: 116, y: 163, label: "Jaipur", left: true },
  { x: 178, y: 164, label: "Lucknow" },
  { x: 77, y: 214, label: "Ahmedabad", left: true },
  { x: 156, y: 239, label: "Nagpur" },
  { x: 267, y: 221, label: "Kolkata" },
  { x: 81, y: 265, label: "Mumbai", left: true },
  { x: 148, y: 287, label: "Hyderabad" },
  { x: 137, y: 342, label: "Bengaluru", left: true },
  { x: 170, y: 341, label: "Chennai" },
];


/* Real India outline lives in src/lib/india-path.ts */

const ROUTE =
  "M133 140 C126 149 118 156 116 163 C104 182 88 200 77 214 C77 232 79 250 81 265";
const ROUTE_2 =
  "M133 140 C148 148 166 156 178 164 C210 182 246 204 267 221";
const ROUTE_3 =
  "M81 265 C104 270 132 276 148 287 C152 310 144 330 137 342 C150 344 161 343 170 341";



export function CoverageMap({ className = "" }: { className?: string }) {
  const { ref, shown: inView } = useInView<HTMLDivElement>(0.25);
  const reduced = usePrefersReducedMotion();
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg viewBox="0 0 400 420" className="w-full h-auto" role="img" aria-label="Pan-India service corridors">
        <defs>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand)" />
            <stop offset="100%" stopColor="var(--accent-yellow)" />
          </linearGradient>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="indiaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.04" />
          </linearGradient>
          <clipPath id="indiaClip">
            <path d={INDIA_OUTLINE} />
          </clipPath>
        </defs>

        {/* India landmass */}
        <path
          d={INDIA_OUTLINE}
          fill="url(#indiaFill)"
          stroke="var(--brand)"
          strokeOpacity="0.55"
          strokeWidth="1.6"
          strokeLinejoin="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: inView ? 0 : 1,
            transition: "stroke-dashoffset 2200ms cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* latitude rails, clipped to the landmass */}
        <g clipPath="url(#indiaClip)">
          {[70, 100, 130, 160, 190, 220, 250, 280, 310, 340, 370].map((y) => (
            <line key={y} x1="40" x2="360" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.09" strokeWidth="1" />
          ))}
          {[80, 110, 140, 170, 200, 230, 260, 290, 320].map((x) => (
            <line key={x} y1="40" y2="400" x1={x} x2={x} stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />
          ))}
        </g>


        {[ROUTE, ROUTE_2, ROUTE_3].map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: inView ? 0 : 1,
              transition: `stroke-dashoffset 1600ms cubic-bezier(0.16,1,0.3,1) ${i * 260}ms`,
            }}
          />
        ))}

        {/* travelling vehicle pulse */}
        {!reduced && (
          <circle r="4.5" fill="var(--accent-yellow)">
            <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE} rotate="auto" />
            <animate attributeName="opacity" values="0;1;1;0" dur="7s" repeatCount="indefinite" />
          </circle>
        )}

        {NODES.map((n, i) => (
          <g
            key={n.label}
            onMouseEnter={() => setHover(n.label)}
            onMouseLeave={() => setHover(null)}
            style={{
              opacity: inView ? 1 : 0,
              transition: `opacity 600ms ease ${400 + i * 90}ms`,
              cursor: "default",
            }}
          >
            <circle cx={n.x} cy={n.y} r="18" fill="url(#nodeGlow)" />
            <circle cx={n.x} cy={n.y} r="4" fill="var(--brand)" />
            <circle
              cx={n.x}
              cy={n.y}
              r="4"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="1.2"
              className={reduced ? "" : "node-ping"}
              style={{ animationDelay: `${i * 400}ms` }}
            />
            <text
              x={n.left ? n.x - 9 : n.x + 10}
              textAnchor={n.left ? "end" : "start"}
              y={n.y + 4}
              fontSize="9.5"
              fontWeight={hover === n.label ? 800 : 600}
              fill="currentColor"
              opacity={hover === n.label ? 0.95 : 0.5}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Signal rings — device transmitting; used beside dashcam/GPS copy    */
/* ------------------------------------------------------------------ */
export function SignalRings({ label = "LIVE", className = "" }: { label?: string; className?: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div aria-hidden className={`relative grid place-items-center ${className}`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`absolute rounded-full border border-brand/35 ${reduced ? "" : "ring-pulse"}`}
          style={{ width: 96, height: 96, animationDelay: `${i * 900}ms` }}
        />
      ))}
      <span className="relative z-10 rounded-full bg-brand text-white text-[10px] font-bold tracking-[0.18em] px-3 py-1.5">
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Spotlight card — cursor-tracked highlight, no library needed        */
/* ------------------------------------------------------------------ */
export function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);
  return (
    <div ref={ref} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Proof meter — animated bar chart of claim outcomes                  */
/* ------------------------------------------------------------------ */
export function ProofMeter({
  rows,
  className = "",
}: {
  rows: { label: string; value: number; note?: string }[];
  className?: string;
}) {
  const { ref, shown: inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={`space-y-5 ${className}`}>
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[13px] font-semibold">{r.label}</span>
            <span className="font-mono text-[12px] opacity-70">{r.value}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-current/10 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: inView ? `${r.value}%` : "0%",
                background: "linear-gradient(90deg, var(--brand), var(--accent-yellow))",
                transition: `width 1200ms cubic-bezier(0.16,1,0.3,1) ${i * 140}ms`,
              }}
            />
          </div>
          {r.note && <p className="mt-1.5 text-[11.5px] opacity-55">{r.note}</p>}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Classic ornaments — gilded rules, kickers and framed reveals        */
/* ------------------------------------------------------------------ */
export function Ornament({ className = "" }: { className?: string }) {
  const { ref, shown } = useInView<HTMLDivElement>(0.4);
  return (
    <div ref={ref} aria-hidden className={`ornament ${className}`} style={{ opacity: shown ? 1 : 0, transition: "opacity 700ms ease" }}>
      <span style={{ transform: shown ? "scaleX(1)" : "scaleX(0)", transformOrigin: "right", transition: "transform 900ms cubic-bezier(0.16,1,0.3,1)" }} />
      <i />
      <span style={{ transform: shown ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 900ms cubic-bezier(0.16,1,0.3,1)" }} />
    </div>
  );
}

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, shown } = useInView<HTMLSpanElement>(0.4);
  return (
    <span
      ref={ref}
      className={`kicker-classic ${className}`}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(8px)",
        transition: "opacity 700ms ease, transform 800ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </span>
  );
}

export function GoldRule({ className = "" }: { className?: string }) {
  const { ref, shown } = useInView<HTMLDivElement>(0.3);
  return (
    <div
      ref={ref}
      aria-hidden
      className={`h-px ${className}`}
      style={{
        background: "linear-gradient(90deg, transparent, var(--accent-yellow), transparent)",
        transform: shown ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 1200ms cubic-bezier(0.16,1,0.3,1)",
      }}
    />
  );
}

/* Cinematic curtain unveil for imagery — wipes open with a slow zoom */
export function Unveil({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useInView<HTMLDivElement>(0.2);
  const reduced = usePrefersReducedMotion();
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="unveil-inner h-full w-full"
        style={
          reduced
            ? undefined
            : {
                clipPath: shown ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                transform: shown ? "scale(1)" : "scale(1.12)",
                transition: `clip-path 1100ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
              }
        }
      >
        {children}
      </div>
    </div>
  );
}
