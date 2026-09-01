import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, FileSearch, ShieldAlert, ShieldCheck, Scale, ClipboardCheck, AlertTriangle } from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { ScrollCinema } from "@/components/scroll-cinema";
import { VIDEO, mp4 } from "@/lib/videos";
import svcAudit from "@/assets/svc-audit.jpg";

const AUDIT_BEATS = [
  { icon: FileSearch, kicker: "Slide 01 · Review", title: "Aapki policy line-by-line padhi jaati hai.", body: "Coverage, IDV, exclusions aur add-ons — sab kuch ek structured review sheet mein." },
  { icon: AlertTriangle, kicker: "Slide 02 · Gaps", title: "Gaps ko presentation mein dikhaya jaata hai.", body: "Kaunsa clause claim reject kara sakta hai — plain Hinglish mein, jargon ke bina." },
  { icon: ClipboardCheck, kicker: "Slide 03 · Action", title: "Ek clear action plan.", body: "Kya badalna hai, kis order mein aur kitna kharcha — written audit report ke saath." },
];

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/risk-audit")({
  head: () => ({
    meta: [
      { title: "Professional Vehicle Policy & Risk Audit | Insure Audit Expert" },
      { name: "description", content: "A line-by-line professional audit of your motor policy — hidden exclusions, IDV errors, missing add-ons and false-claim exposure identified before you need to claim. Part of the Insure Audit Expert Safety Membership." },
      { name: "keywords", content: "vehicle policy audit, motor insurance audit India, IDV check, insurance exclusion review, false claim protection, risk audit Delhi, claim rejection prevention" },
      { property: "og:title", content: "Professional Vehicle Policy & Risk Audit | Insure Audit Expert" },
      { property: "og:description", content: "Know exactly what your policy does not cover — before the claim, not after it." },
      { property: "og:url", content: `${SITE_URL}/risk-audit` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/risk-audit` }],
  }),
  component: RiskAuditPage,
});

const CHECKS = [
  { icon: ShieldAlert, title: "Hidden Exclusion Scan", desc: "Har clause padha jaata hai — consequential damage, driving-licence conditions, unnamed-driver limits aur wo exclusions jo claim ke time reject ki wajah bante hain." },
  { icon: Scale, title: "IDV & Sum-Insured Accuracy", desc: "Under-insured vehicle ka matlab hai under-paid claim. Hum IDV ko market value ke against verify karte hain aur mismatch flag karte hain." },
  { icon: ClipboardCheck, title: "Add-On Gap Report", desc: "Zero-depreciation, engine protect, RTI, consumables, roadside assistance — kya missing hai aur uski real-world cost kya hogi." },
  { icon: AlertTriangle, title: "False-Claim Exposure Review", desc: "Third-party fraudulent claims aur staged accidents ke against aapki documentary defence kitni strong hai — evidence readiness score ke saath." },
  { icon: FileSearch, title: "Document & Compliance Check", desc: "RC, PUC, fitness, permit aur licence validity — expiry dates track hoti hain taaki technical ground pe claim reject na ho." },
  { icon: ShieldCheck, title: "Written Audit Report", desc: "Ek plain-language report: findings, risk rating aur prioritised action plan. Koi jargon nahi, koi obligation nahi." },
];

const FLOW = [
  { n: "01", t: "Share Policy Copy", d: "Policy PDF, RC aur vehicle details WhatsApp par bhejein." },
  { n: "02", t: "Structured Audit", d: "Our auditors + AI engine clause-by-clause review karte hain." },
  { n: "03", t: "Risk Report", d: "Findings, exposure score aur corrective actions ki written report." },
  { n: "04", t: "Fix the Gaps", d: "Corrections aur cover arrangement licensed partner ke through, standard insurance rates par." },
];

function RiskAuditPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-b from-brand-soft/60 to-paper py-20">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
              <FileSearch className="w-4 h-4"/> Pillar 03 · Professional Policy Audit
            </span>
            <h1 className="mt-6 text-[42px] sm:text-[56px] leading-[1.05] font-extrabold text-night">
              Find the gaps <span className="italic text-brand">before</span> the claim finds you.
            </h1>
            <p className="mt-5 text-[17px] text-ink/70 leading-relaxed">
              Zyada tar vehicle owners ko apni policy ki exclusions tab pata chalti hain jab claim reject hota hai. Hamara professional risk audit aapki policy, documents aur on-road exposure ko pehle hi review karta hai — line by line.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold px-7 py-4 rounded-full transition">
                Request Free Risk Audit <ArrowRight className="w-4 h-4"/>
              </Link>
              <Link to="/ai-dashcam-tracking" className="inline-flex items-center gap-2 border border-ink/15 hover:border-brand font-bold px-7 py-4 rounded-full transition">
                Explore Tech Features
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src={svcAudit} alt="Professional insurance policy risk audit in progress" loading="lazy" className="rounded-3xl w-full h-[380px] object-cover shadow-2xl"/>
            <div className="absolute -bottom-6 left-6 bg-white rounded-2xl shadow-xl p-5 border border-ink/8">
              <div className="text-[28px] font-extrabold text-brand-deep leading-none">10,000+</div>
              <div className="text-[12px] font-semibold text-ink/65 mt-1">Policies audited across India</div>
            </div>
          </div>
        </div>
      </section>

      <ScrollCinema
        sources={mp4(VIDEO.audit)}
        badge="Audit Walkthrough"
        beats={AUDIT_BEATS}
        ctaTo="/contact"
        ctaLabel="Free risk audit lein"
      />

      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <h2 className="text-[34px] sm:text-[42px] font-extrabold text-night text-center">Audit mein kya check hota hai</h2>
          <p className="mt-3 text-center text-ink/65 max-w-2xl mx-auto">Six review layers — har ek us jagah target karti hai jahan claims sabse zyada fail hote hain.</p>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHECKS.map((c) => (
              <div key={c.title} className="bg-white border border-ink/8 rounded-2xl p-6 hover:border-brand hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-xl bg-brand-soft grid place-items-center mb-4"><c.icon className="w-6 h-6 text-brand"/></div>
                <h3 className="text-[17px] font-bold text-night">{c.title}</h3>
                <p className="mt-2 text-[13.5px] text-ink/65 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cloud py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <h2 className="text-[34px] sm:text-[42px] font-extrabold text-night text-center">Audit process</h2>
          <div className="mt-12 grid md:grid-cols-4 gap-5">
            {FLOW.map((f) => (
              <div key={f.n} className="bg-white rounded-2xl p-6 border border-ink/8">
                <span className="text-[11px] font-bold text-brand tracking-widest">{f.n}</span>
                <h3 className="mt-2 text-[16px] font-bold text-night">{f.t}</h3>
                <p className="mt-1.5 text-[13px] text-ink/65 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-white border border-ink/8 rounded-2xl p-6 max-w-3xl mx-auto">
            <ul className="grid sm:grid-cols-2 gap-3 text-[13.5px] text-ink/70">
              {["No obligation to buy anything", "Report within 24 working hours", "Policies arranged only at standard insurance rates", "Your documents stay confidential"].map((x) => (
                <li key={x} className="flex items-start gap-2"><Check className="w-4 h-4 text-brand mt-0.5 shrink-0"/>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
