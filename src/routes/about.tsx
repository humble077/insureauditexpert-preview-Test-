import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, BarChart3, Brain, Shield, Sparkles, Users } from "lucide-react";
import { PageShell } from "@/components/site-shell";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Insure Audit Expert | AI Insurance Audit Firm, New Delhi" },
      { name: "description", content: "Insure Audit Expert is India's AI powered insurance audit & renewal recovery firm — Delhi HQ, 50+ certified experts, 10,000+ policies audited and ₹312 Cr+ premium optimized for brokers, fleet owners and corporates." },
      { name: "keywords", content: "about insure audit expert, insurance audit firm India, AI insurance company Delhi, insurance renewal recovery, certified insurance auditors, IRDAI insurance experts" },
      { property: "og:title", content: "About Insure Audit Expert | AI Insurance Audit Firm, New Delhi" },
      { property: "og:description", content: "Mission, story and team behind India's AI powered insurance audit and renewal recovery platform." },
      { property: "og:url", content: `${SITE_URL}/about` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Brain, label: "AI First", desc: "Har process AI se start hota hai — speed aur accuracy ke liye." },
  { icon: Shield, label: "Data Security", desc: "Bank-grade encryption aur strict NDAs har client ke liye." },
  { icon: Users, label: "Customer Obsession", desc: "Dedicated relationship manager har account ke liye." },
  { icon: Award, label: "Domain Expertise", desc: "Certified insurance experts aur surveyors in-house." },
];

const MILESTONES = [
  { year: "2019", title: "Foundation", desc: "Insure Audit Expert ki shuruat — manual audit framework ke saath." },
  { year: "2021", title: "AI Platform Launch", desc: "First AI based policy audit aur renewal engine launch ki." },
  { year: "2022", title: "WhatsApp Automation", desc: "End-to-end WhatsApp automation suite live." },
  { year: "2024", title: "10,000+ Policies", desc: "Pan-India 500+ corporate clients aur 10K+ policies audited." },
];

function AboutPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-b from-brand-soft/60 to-paper py-20">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4"/> Our Story
            </span>
            <h1 className="mt-6 text-[44px] sm:text-[58px] leading-[1.05] font-extrabold text-night">
              Insurance ko <span className="italic text-brand">transparent</span> aur <span className="italic text-brand-deep">predictable</span> banane ka mission.
            </h1>
            <p className="mt-5 text-[17px] text-ink/70 leading-relaxed">
              Insure Audit Expert ek Risk Management &amp; Vehicle Safety brand hai, jise <strong>Alxsure Tech Hub (OPC) Pvt. Ltd.</strong> own aur manage karti hai. New Delhi headquartered, hum individuals, fleets aur schools ko professional policy audit, AI dashcam aur smart live tracking ke through complete clarity aur control dete hain.
            </p>
            <p className="mt-4 text-[15.5px] text-ink/65 leading-relaxed">
              Hum insurance underwrite ya issue nahi karte. All policies are arranged through our licensed partner PBPartners (Policybazaar Insurance Brokers Pvt. Ltd.) as an authorized POSP Channel Partner (POS Code: IP461548) at standard IRDAI-approved rates. Hamari technology aur telematics hardware services Alxsure Tech Hub (OPC) Pvt. Ltd. dwara independently offer ki jaati hain without any rebate or premium inducement (Section 41 compliant).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "10,000+", v: "Policies Audited" },
              { k: "₹312 Cr+", v: "Premium Optimized" },
              { k: "500+", v: "Corporate Clients" },
              { k: "95%+", v: "Renewal Accuracy" },
            ].map((s) => (
              <div key={s.v} className="bg-white border border-ink/8 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition hover:-translate-y-1">
                <div className="text-[32px] font-extrabold text-brand-deep leading-none">{s.k}</div>
                <div className="mt-2 text-[12.5px] font-semibold text-ink/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <h2 className="text-[36px] sm:text-[44px] font-extrabold text-night text-center">Hamari Core Values</h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div key={v.label} className="bg-white border border-ink/8 rounded-2xl p-6 hover:border-brand hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-xl bg-brand-soft grid place-items-center mb-4">
                  <v.icon className="w-6 h-6 text-brand"/>
                </div>
                <h3 className="text-[17px] font-bold text-night">{v.label}</h3>
                <p className="mt-2 text-[13.5px] text-ink/65 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cloud py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <h2 className="text-[36px] sm:text-[44px] font-extrabold text-night text-center">Journey till date</h2>
          <div className="mt-12 grid md:grid-cols-4 gap-5">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="relative bg-white rounded-2xl p-6 border border-ink/8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-brand text-white grid place-items-center font-extrabold text-sm">{i + 1}</span>
                  <span className="text-[11px] font-bold text-brand tracking-widest">{m.year}</span>
                </div>
                <h3 className="text-[16px] font-bold text-night">{m.title}</h3>
                <p className="mt-1.5 text-[13px] text-ink/65 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-deep text-white py-20">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-[36px] sm:text-[44px] font-extrabold">Let's audit your books together.</h2>
            <p className="mt-4 text-white/80 max-w-md">Hamari team aapki insurance portfolio ka complete audit sirf 24 ghante mein deliver karti hai.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-accent-yellow text-night font-bold px-7 py-4 rounded-full hover:bg-white transition">
              Book Free Audit <ArrowRight className="w-4 h-4"/>
            </Link>
            <Link to="/risk-audit" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 font-bold px-7 py-4 rounded-full transition">
              <BarChart3 className="w-4 h-4"/> Explore Risk Audit
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
