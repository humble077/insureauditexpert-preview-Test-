import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SplitText, Magnetic, Reveal, useInView, EASE } from "@/lib/motion";

/* ------------------------------------------------------------------
   INSTITUTIONAL MASTHEAD HERO
   Centred, full-width, hairline-ruled. No left-text / right-picture split.
------------------------------------------------------------------- */

const COVERS = [
  { id: "car", label: "Private Car" },
  { id: "cv", label: "Commercial Vehicle" },
  { id: "fleet", label: "Fleet & Taxi" },
  { id: "bus", label: "School Bus" },
  { id: "health", label: "Health" },
] as const;

const RAIL = [
  { k: "Policies audited", v: "10,400+" },
  { k: "Devices installed", v: "4,200+" },
  { k: "Fleet & corporate clients", v: "500+" },
  { k: "Incident support desk", v: "24×7" },
];

const PARTNERS = [
  { name: "PBPartners", domain: "pbpartners.com" },
  { name: "ICICI Lombard", domain: "icicilombard.com" },
  { name: "HDFC ERGO", domain: "hdfcergo.com" },
  { name: "Tata AIG", domain: "tataaig.com" },
  { name: "Bajaj Allianz", domain: "bajajallianz.com" },
  { name: "Reliance General", domain: "reliancegeneral.co.in" },
  { name: "SBI General", domain: "sbigeneral.in" },
  { name: "Care Health", domain: "careinsurance.com" },
  { name: "New India Assurance", domain: "newindia.co.in" },
];

const LOGO_TOKEN = import.meta.env.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY;

function PartnerLogo({ name, domain }: { name: string; domain: string }) {
  return (
    <span className="px-8 py-4 flex items-center gap-2.5 whitespace-nowrap border-r border-ink/10">
      {LOGO_TOKEN ? (
        <img
          src={`https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&size=64&format=png&fallback=monogram`}
          alt={`${name} logo`}
          loading="lazy"
          className="h-7 w-7 rounded-sm object-contain"
        />
      ) : null}
      <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink/55">{name}</span>
    </span>
  );
}

/** Highlight rule that draws itself left-to-right once the headline lands. */
function Underline() {
  const { ref, shown } = useInView<HTMLSpanElement>(0.4);
  return (
    <span
      ref={ref}
      className="absolute left-0 right-0 bottom-[0.1em] h-[0.18em] bg-accent-yellow/60 origin-left"
      style={{
        transform: `scaleX(${shown ? 1 : 0})`,
        transition: `transform 900ms ${EASE} 1150ms`,
      }}
    />
  );
}

function useCycle(length: number, ms: number) {
  const [i, setI] = useState(0);
  const paused = useRef(false);
  const locked = useRef(false);
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current && !locked.current) setI((n) => (n + 1) % length);
    }, ms);
    return () => clearInterval(id);
  }, [length, ms]);
  return { i, setI, paused, locked };
}

export function MastheadHero() {
  const { i, setI, paused, locked } = useCycle(COVERS.length, 3200);
  const [reg, setReg] = useState("");
  const navigate = useNavigate();

  return (
    <section className="relative bg-paper text-ink">
      {/* statutory strip */}
      <div className="border-b border-ink/10 bg-cloud/40">
        <div className="max-w-[1240px] mx-auto px-6 h-9 flex items-center justify-between gap-4 text-[11.5px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/60">
          <span>Alxsure Tech Hub (OPC) Pvt. Ltd. · New Delhi</span>
          <span className="hidden md:inline">Insurance arranged through IRDAI-registered partners · Standard rates only</span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6">
        {/* masthead */}
        <div className="pt-14 pb-10 text-center">
          <span className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.24em] text-brand bg-brand-soft px-4 py-1.5 rounded-full animate-reveal">
            <ShieldCheck className="w-4 h-4" /> Smart Audit · Safe Drive · Guaranteed Protection
          </span>

          <h1 className="mt-7 mx-auto max-w-5xl font-display font-extrabold text-night leading-[1.02] tracking-[-0.03em] text-[42px] sm:text-[62px] lg:text-[76px]">
            <SplitText text="Insurance that is audited" delay={120} stagger={22} />
            <span className="block">
              <SplitText text="before it is" delay={620} stagger={22} />{" "}
              <span className="relative inline-block">
                <span className="relative z-10">
                  <SplitText text="sold." delay={900} stagger={28} />
                </span>
                <Underline />
              </span>
            </span>
          </h1>

          <Reveal delay={260} variant="blur">
            <p className="mt-7 mx-auto max-w-2xl text-[17px] sm:text-[18.5px] leading-relaxed text-ink/70 font-normal">
              Motor, commercial vehicle, fleet, school bus aur health cover — standard IRDAI-approved
              rates par, licensed partners ke through. Har policy ke saath clause-by-clause audit,
              AI dashcam evidence aur zero wiring-cut live tracking.
            </p>
          </Reveal>
        </div>

        {/* cover selector — hairline tab rail */}
        <div
          className="border-y border-ink/10"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {COVERS.map((c, n) => {
              const on = n === i;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onMouseEnter={() => {
                    if (!locked.current) setI(n);
                  }}
                  onFocus={() => {
                    if (!locked.current) setI(n);
                  }}
                  onClick={() => {
                    locked.current = true;
                    setI(n);
                  }}
                  className={`relative flex items-center justify-center text-center min-h-[58px] px-3 py-4 text-[13.5px] sm:text-[14px] font-bold uppercase tracking-[0.08em] border-r last:border-r-0 border-ink/10 transition-colors ${
                    on ? "text-night bg-brand-soft/30" : "text-ink/60 hover:text-ink/90"
                  }`}
                >
                  {c.label}
                  <span
                    className="absolute left-0 bottom-[-1px] h-[3px] bg-brand transition-all duration-500"
                    style={{ width: on ? "100%" : "0%" }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* quote bar */}
        <div className="py-8">
          <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-stretch gap-2">
            <div className="flex-1 flex items-center border border-ink/15 bg-white rounded-xl focus-within:border-brand transition shadow-2xs">
              <span className="px-4 text-[12px] font-bold uppercase tracking-[0.14em] text-brand border-r border-ink/10 py-4 bg-cloud/50 rounded-l-xl">
                {COVERS[i].label}
              </span>
              <input
                value={reg}
                onChange={(e) => setReg(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    navigate({
                      to: "/contact",
                      search: { cover: COVERS[i].id, reg: reg.trim() || undefined },
                      hash: "quote",
                    });
                  }
                }}
                placeholder="Enter vehicle number — DL 3C AB 1234"
                aria-label="Vehicle registration number"
                className="flex-1 bg-transparent outline-none px-4 py-4 text-[15px] sm:text-[16px] tracking-[0.06em] placeholder:text-ink/35 font-medium"
              />
            </div>
            <Magnetic strength={0.2} className="sm:shrink-0">
              <button
                type="button"
                onClick={() =>
                  navigate({
                    to: "/contact",
                    search: { cover: COVERS[i].id, reg: reg.trim() || undefined },
                    hash: "quote",
                  })
                }
                className="sheen group w-full inline-flex items-center justify-center gap-2 bg-night hover:bg-brand text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-colors shadow-xs"
              >
                Get quote{" "}
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </Magnetic>
          </div>
          <p className="mt-3 text-center text-[13.5px] text-ink/60">
            No spam calls. Prefer a review first?{" "}
            <Link to="/contact" className="text-brand font-bold hover:underline">
              Book the complimentary policy audit
            </Link>
            .
          </p>
        </div>

        {/* credential rail */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-ink/10">
          {RAIL.map((r, n) => (
            <Reveal
              key={r.k}
              delay={n * 110}
              variant="clip"
              className={`px-5 py-7 border-ink/10 ${n % 2 === 0 ? "border-r" : ""} ${
                n < 2 ? "border-b lg:border-b-0" : ""
              } lg:border-r lg:last:border-r-0`}
            >
              <div className="font-display text-[32px] sm:text-[36px] font-extrabold text-night leading-none tabular-nums">
                {r.v}
              </div>
              <div className="mt-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-ink/55">
                <span className="relative grid place-items-center w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-brand/60 animate-ping-ring" />
                  <span className="w-2 h-2 rounded-full bg-brand" />
                </span>
                {r.k}
              </div>
            </Reveal>
          ))}
        </div>
      </div>


      {/* partner ledger */}
      <div className="border-y border-ink/10 bg-cloud/60 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {PARTNERS.map((p) => (
                <PartnerLogo key={`${dup}-${p.domain}`} name={p.name} domain={p.domain} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
