import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Bus, Camera, Car, Check, FileSearch, HeartPulse,
  MapPin, MessageCircle, ShieldCheck, Truck,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { ScrollCinema } from "@/components/scroll-cinema";
import svcAudit from "@/assets/svc-audit.jpg";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/insurance")({
  head: () => ({
    meta: [
      { title: "Buy Car, Commercial Vehicle & Health Insurance | Insure Audit Expert" },
      { name: "description", content: "Compare and buy motor, commercial vehicle, school bus, fleet and health insurance at standard IRDAI-approved rates through our licensed partners — and get an AI dashcam, live tracking and a professional policy audit as a complimentary tech membership." },
      { name: "keywords", content: "buy car insurance India, commercial vehicle insurance, taxi insurance, school bus insurance, fleet insurance India, health insurance plans, insurance with dashcam, standard insurance rates" },
      { property: "og:title", content: "Insurance Plans with a Built-In Safety Program | Insure Audit Expert" },
      { property: "og:description", content: "Motor, fleet, school bus and health insurance at standard rates — plus AI dashcam, live tracking and a policy audit." },
      { property: "og:url", content: `${SITE_URL}/insurance` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/insurance` }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Insurance Plans | Insure Audit Expert",
        url: `${SITE_URL}/insurance`,
        description: "Motor, commercial vehicle, school bus, fleet and health insurance arranged through IRDAI-registered partners at standard insurance rates.",
      }),
    }],
  }),
  component: InsurancePage,
});

const PLANS = [
  { icon: Car, t: "Private Car Insurance", d: "Comprehensive cover with correct IDV, zero-dep, engine protect aur roadside assistance — audited before you buy.", pts: ["IDV verified, not guessed", "Add-on gap report", "Cashless garage network"] },
  { icon: Truck, t: "Commercial Vehicle Insurance", d: "Goods carrier, pickup, tempo aur truck cover — GVW, permit aur route ke hisaab se sahi rating.", pts: ["Legal liability to driver", "Permit & fitness check", "Downtime-aware add-ons"] },
  { icon: Bus, t: "School Bus & Passenger Carrier", d: "Student aur passenger carrying vehicles ke liye statutory + passenger liability cover.", pts: ["Passenger liability sizing", "Statutory compliance check", "Driver documentation file"] },
  { icon: ShieldCheck, t: "Fleet & Taxi Insurance", d: "5 se 500+ gaadiyon ka fleet cover, single renewal calendar aur claims desk ke saath.", pts: ["One renewal calendar", "Claims desk support", "Driver-scoring linked risk"] },
  { icon: HeartPulse, t: "Health Insurance", d: "Family floater aur individual health plans — waiting period, room rent aur sub-limit clearly explained.", pts: ["Room-rent capping check", "Pre-existing timeline map", "Network hospital list"] },
];

const WHY_TECH = [
  { icon: Camera, t: "Video proof stops false claims", d: "Insurance ka sabse bada dispute hota hai 'kiski galti thi'. G-sensor locked dashcam footage aapki version ko sabit karti hai — claim faster settle hota hai aur galat claim aap par nahi chipakta." },
  { icon: MapPin, t: "GPS trail proves the facts", d: "Speed, route aur time ka verifiable record insurer ke surveyor ko dena matlab kam questions, kam delay. Theft case mein recovery chance bhi badhta hai." },
  { icon: FileSearch, t: "Audit kills the rejection reasons", d: "Zyada claims exclusion, galat IDV ya expired document ki wajah se reject hote hain — policy audit ye teeno gaps buy karne se pehle theek kar deta hai." },
];

function InsurancePage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-b from-brand-soft/70 to-paper py-20">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white border border-brand/20 text-brand text-[11.5px] font-bold uppercase tracking-[0.14em] px-4 py-2 rounded-full">
              <ShieldCheck className="w-4 h-4"/> Standard insurance rates · IRDAI-registered partners
            </span>
            <h1 className="mt-6 text-[40px] sm:text-[52px] leading-[1.06] font-extrabold text-night">
              Insurance jo sirf paper nahi — <span className="italic text-brand">proof</span> ke saath aata hai.
            </h1>
            <p className="mt-5 text-[17px] text-ink/70 leading-relaxed max-w-xl">
              Car, commercial vehicle, school bus, fleet aur health cover — sab standard insurance rates par, hamare licensed distribution partners ke through. Saath mein complimentary tech membership: AI dashcam, live tracking aur professional policy audit, taaki claim ke waqt aapke paas evidence ho.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold px-7 py-4 rounded-full transition shadow-[0_14px_34px_-12px_rgba(31,157,85,0.7)] hover:-translate-y-0.5">
                Get My Insurance Quote <ArrowRight className="w-4 h-4"/>
              </Link>
              <a href="https://wa.me/919876543210" className="inline-flex items-center gap-2 border border-ink/15 hover:border-brand hover:text-brand font-bold px-7 py-4 rounded-full transition">
                <MessageCircle className="w-4 h-4"/> WhatsApp for a quote
              </a>
            </div>
          </div>
          <img src={svcAudit} alt="Insurance policy audit and quote preparation" loading="lazy" className="rounded-3xl w-full h-[400px] object-cover shadow-2xl"/>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <h2 className="text-[34px] sm:text-[42px] font-extrabold text-night text-center">Jo cover aap khareed sakte hain</h2>
          <p className="mt-3 text-center text-ink/65 max-w-2xl mx-auto">Har quote se pehle hum aapki current policy ka audit karte hain — phir sahi cover recommend karte hain.</p>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div key={p.t} className="h-full bg-white rounded-3xl border border-ink/8 p-7 hover:shadow-xl hover:-translate-y-1.5 transition">
                <div className="w-14 h-14 rounded-2xl bg-brand-soft grid place-items-center mb-5"><p.icon className="w-7 h-7 text-brand"/></div>
                <h3 className="text-[19px] font-extrabold text-night">{p.t}</h3>
                <p className="mt-2.5 text-[14px] text-ink/65 leading-relaxed">{p.d}</p>
                <ul className="mt-5 space-y-2 text-[13px] text-ink/70">
                  {p.pts.map((x) => (
                    <li key={x} className="flex items-start gap-2"><Check className="w-4 h-4 text-brand mt-0.5 shrink-0"/>{x}</li>
                  ))}
                </ul>
                <Link to="/contact" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand">Get a quote <ArrowRight className="w-4 h-4"/></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wishlink Video & Pillar Showcase */}
      <ScrollCinema
        badge="Insurance Evidence Reel"
        beats={[
          {
            icon: Camera,
            stepNumber: "01",
            kicker: "Pillar 01 · Video Evidence",
            title: "Video proof stops false claims.",
            body: "G-sensor locked dashcam footage aapki version ko instantly sabit karti hai — surveyor claim fast pass karta hai aur false liability aap par nahi aati.",
          },
          {
            icon: MapPin,
            stepNumber: "02",
            kicker: "Pillar 02 · GPS Location Record",
            title: "GPS trail proves the facts.",
            body: "Exact speed, timestamped route aur location data surveyor aur police ke samne 100% indisputable evidence banata hai.",
          },
          {
            icon: FileSearch,
            stepNumber: "03",
            kicker: "Pillar 03 · Pre-Audit Protection",
            title: "Audit kills rejection reasons.",
            body: "Hidden policy exclusions, galat IDV aur expired add-on gaps policy buy karne se pehle hi audit karke fix kiye jaate hain.",
          },
        ]}
        ctaTo="/contact"
        ctaLabel="Get audited insurance quote"
      />

      <section className="py-20">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-[30px] sm:text-[38px] font-extrabold text-night">Quote lene ka process</h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-5 text-left">
            {[
              { n: "01", t: "Share vehicle & policy details", d: "Form ya WhatsApp par RC, current policy aur usage details bhejein." },
              { n: "02", t: "Free audit + quote comparison", d: "Hum exclusions, IDV aur add-ons audit karke partner insurers ke options bhejte hain." },
              { n: "03", t: "Policy issued + tech installed", d: "Policy licensed partner ke through standard rates par issue, dashcam & tracker 30 minute mein fit." },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-2xl border border-ink/8 p-6">
                <span className="text-[11px] font-bold tracking-widest text-brand">{s.n}</span>
                <h3 className="mt-1.5 text-[16px] font-bold text-night">{s.t}</h3>
                <p className="mt-2 text-[13.5px] text-ink/65 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[12.5px] text-ink/50 leading-relaxed">
            Insure Audit Expert does not underwrite or issue insurance. All policies are arranged and issued through our licensed distribution partner PBPartners (Policybazaar Insurance Brokers Pvt. Ltd.) and other IRDAI-registered insurers and brokers, at standard insurance rates. The dashcam, tracking device and audit are a Complimentary Tech Membership — a technology and safety service, not a rebate, cashback or discount. Insurance is the subject matter of solicitation.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
