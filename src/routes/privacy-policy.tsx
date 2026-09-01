import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  Database,
  Building2,
  Mail,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Eye,
  Shield,
  MessageSquare,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Insure Audit Expert" },
      {
        name: "description",
        content:
          "Privacy Policy of InsureAuditExpert.com. Learn how we collect, use, and protect your personal identification, policy data, and location information with bank-grade security.",
      },
      {
        name: "keywords",
        content:
          "Insure Audit Expert privacy policy, data security insurance, IRDAI privacy, PBPartners partner privacy, insurance policy data protection",
      },
      { property: "og:title", content: "Privacy Policy | Insure Audit Expert" },
      {
        property: "og:description",
        content:
          "InsureAuditExpert.com par aapki privacy hamari top priority hai. Yeh policy batati hai ki hum aapka data kaise collect, use aur protect karte hain.",
      },
      { property: "og:url", content: `${SITE_URL}/privacy-policy` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy-policy` }],
  }),
  component: PrivacyPolicyPage,
});

const POLICY_SECTIONS = [
  {
    id: "data-collection",
    number: "01",
    title: "Hum kaunsa data collect karte hain?",
    englishSubtitle: "Information We Collect",
    icon: Database,
    description:
      "Jab aap hamari website visit karte hain ya Free Insurance Audit ke liye register karte hain, toh hum nimnlikhit jankari collect karte hain:",
    points: [
      {
        label: "Personal Identification",
        desc: "Aapka poora Name, Email Address, Phone Number, aur Physical Address.",
      },
      {
        label: "Insurance Policy Data",
        desc: "Jab aap Free Audit ke liye policy upload karte hain, toh hum policy number, coverage limits, IDV values, premium amount, deductibles, aur beneficiary details collect karte hain.",
      },
      {
        label: "Location Data",
        desc: "Hamare 20 KM Branch Radius ke andar physical spot claim assistance ki eligibility determine karne ke liye.",
      },
      {
        label: "Consent Documents",
        desc: "Digital ya physical signatures aur Letter of Authorization (LOA) jo insurance companies ya regulatory bodies (IRDAI / Insurance Ombudsman) ke samne aapka representation karne ke liye aavashyak hote hain.",
      },
    ],
  },
  {
    id: "data-usage",
    number: "02",
    title: "How We Use Your Information",
    englishSubtitle: "Data Ka Upyog Kaise Hota Hai",
    icon: FileText,
    description:
      "Hum collect kiye gaye data ka upyog strictly nimnlikhit uddeshyon ke liye karte hain:",
    points: [
      {
        label: "Expert Policy Audit",
        desc: "Aapke current insurance coverage ka deep analysis karna, hidden clauses, zero-dep gaps, aur sub-limits ko identify karna.",
      },
      {
        label: "Personalized Recommendations",
        desc: "Hamare licensed distribution partner PBPartners (Policybazaar Insurance Brokers Pvt. Ltd.) aur IRDAI approved insurers ke through tailored plans suggest karna.",
      },
      {
        label: "Claim Assistance & Representation",
        desc: "Claim filing process ko manage karna, surveyor coordination, aur wrongful claim rejection ke khilaf grievance redressal represent karna.",
      },
      {
        label: "Membership Services",
        desc: "Aapke account ko 'InsureAudit Expert Club' aur Complimentary Safety Tech Membership ke tehat smoothly manage karna.",
      },
    ],
  },
  {
    id: "data-sharing",
    number: "03",
    title: "Data Sharing & Third-Party Disclosure",
    englishSubtitle: "Teesre Paksh Ke Saath Jankari Sajha Karna",
    icon: ShieldCheck,
    description:
      "Aapka data hamare paas poori tarah surakshit hai. Hum transparency aur trust ke sath kaam karte hain:",
    points: [
      {
        label: "Channel Partner Disclosure",
        desc: "PBPartners (Policybazaar Insurance Brokers Pvt. Ltd.) ke authorized Channel Partner ke roop mein, jab aap hamare 'Buy Now' links use karte hain toh certain data unke secure portal ke madhyam se process hota hai.",
      },
      {
        label: "Regulatory & Legal Compliance",
        desc: "Hum aapka data Insurance Companies, IRDAI (Insurance Regulatory and Development Authority of India), ya Insurance Ombudsman ke sath sirf aapki explicit sehmati (consent) se aur strictly claim settlement ya grievance redressal ke uddeshya se hi share karte hain.",
      },
      {
        label: "Strict No-Data-Selling Policy",
        desc: "Hum aapki personal information kisi bhi third-party telemarketing ya advertising agencies ko na toh bechte (sell) hain, na rent karte hain, aur na trade karte hain.",
      },
    ],
  },
  {
    id: "data-security",
    number: "04",
    title: "Data Security & Storage",
    englishSubtitle: "Data Suraksha Aur Cloud Bhandaran",
    icon: Lock,
    description:
      "Aapke uploaded insurance documents aur sensitive records ko protect karne ke liye hum industry-standard bank-grade encryption use karte hain:",
    points: [
      {
        label: "256-bit SSL/TLS Encryption",
        desc: "Transit aur rest dono states mein data bank-grade encryption ke saath encrypted rehta hai.",
      },
      {
        label: "Restricted Access Control",
        desc: "Aapka policy data sirf authorized certified audit experts aur legal claim specialists hi access kar sakte hain.",
      },
      {
        label: "Zero Storage of Payment Credentials",
        desc: "Hum credit card, debit card ya net banking passwords kabhi store nahi karte. Saare payments RBI authorized gateways se hote hain.",
      },
    ],
  },
  {
    id: "consent",
    number: "05",
    title: "Your Consent",
    englishSubtitle: "Aapki Sehmati",
    icon: UserCheck,
    description:
      "Apni policy upload karke ya hamari services ke liye register karke, aap is Privacy Policy ke tehat data collection aur usage ke liye apni sehmati pradan karte hain.",
    points: [
      {
        label: "Claim Representation Consent",
        desc: "Insurer ya Ombudsman ke samne aapki taraf se claim lead karne ke liye ek alag Letter of Authorization (LOA) ya specific digital consent mandatory hoga.",
      },
      {
        label: "Opt-Out Option",
        desc: "Aap kisi bhi samay hamare promotional communications ya reminder notifications se opt-out kar sakte hain.",
      },
    ],
  },
  {
    id: "your-rights",
    number: "06",
    title: "Your Rights",
    englishSubtitle: "Aapke Adhikar",
    icon: Eye,
    description: "Ek user ke roop mein aapke paas nimnlikhit poore adhikar hain:",
    points: [
      {
        label: "Data Access",
        desc: "Aap hamare paas maujood apne personal data ki copy request kar sakte hain.",
      },
      {
        label: "Data Rectification",
        desc: "Agar koi document ya contact details inaccurate hain, toh aap unhe correct karwa sakte hain.",
      },
      {
        label: "Data Deletion (Right to be Forgotten)",
        desc: "Aap hamare active databases se apna account aur policy data delete karne ki request bhej sakte hain.",
      },
    ],
  },
];

function PrivacyPolicyPage() {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-soft/70 via-cloud/50 to-paper pt-14 pb-16 md:pt-20 md:pb-24 border-b border-ink/5">
        <div className="max-w-[1240px] mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-ink/60 mb-6">
            <Link to="/" className="hover:text-brand transition">
              Home
            </Link>
            <span className="text-ink/30">/</span>
            <span className="text-brand font-bold">Privacy Policy</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 bg-white border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs mb-5">
                <Shield className="w-3.5 h-3.5" /> InsureAuditExpert.com Legal & Privacy
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-night leading-[1.12] tracking-tight">
                Privacy Policy <span className="text-brand">— Aapka Data, Hamari Zimmedari</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-ink/75 leading-relaxed font-medium">
                <strong>InsureAuditExpert.com</strong> (&quot;Hum&quot;, &quot;Humari&quot;, ya &quot;Us&quot;) par aapki privacy hamari top priority hai. Yeh policy batati hai ki hum aapka data kaise collect, use aur protect karte hain.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#policy-details"
                  className="inline-flex items-center gap-2 bg-night hover:bg-brand text-white text-sm font-bold px-6 py-3 rounded-xl transition shadow-md hover:shadow-lg"
                >
                  <FileText className="w-4 h-4" /> View Full Policy
                </a>
                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 bg-white border border-ink/15 hover:border-brand text-night hover:text-brand text-sm font-bold px-5 py-3 rounded-xl transition shadow-xs"
                >
                  <HelpCircle className="w-4 h-4 text-brand" /> Need Help? Sahayata Kendra
                </Link>
                <a
                  href="https://wa.me/918700515288?text=Hello%20InsureAuditExpert,%20I%20have%20a%20question%20regarding%20Privacy%20Policy"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-brand/10 hover:bg-brand/20 text-brand text-sm font-bold px-5 py-3 rounded-xl transition"
                >
                  <MessageSquare className="w-4 h-4" /> Talk to Privacy Officer
                </a>
              </div>
            </div>

            {/* Quick Highlights Box */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-brand/20 rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-brand-soft/60 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-soft grid place-items-center">
                    <ShieldCheck className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-night">Policy Highlights</h2>
                    <p className="text-[11px] text-ink/60">Updated: February 2026</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs text-ink/80">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span><strong>100% Data Encryption:</strong> 256-bit bank grade security.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span><strong>Zero Telemarketing Sale:</strong> We never sell your number or data.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span><strong>Explicit Representation Consent:</strong> LOA required before acting.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span><strong>Full Rights:</strong> Request copy, correction or deletion anytime.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section id="policy-details" className="py-16 bg-paper">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="space-y-12">
            {POLICY_SECTIONS.map((sec) => (
              <div
                key={sec.id}
                id={sec.id}
                className="bg-white border border-ink/10 rounded-2xl p-7 sm:p-9 shadow-xs hover:shadow-md transition duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink/8">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-soft grid place-items-center shrink-0">
                      <sec.icon className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-brand">
                        Section {sec.number} · {sec.englishSubtitle}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-night mt-0.5">
                        {sec.title}
                      </h2>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-sm sm:text-base text-ink/75 font-medium leading-relaxed">
                  {sec.description}
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {sec.points.map((pt) => (
                    <div
                      key={pt.label}
                      className="bg-cloud/60 border border-ink/6 rounded-xl p-4.5 hover:border-brand/40 transition"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                        <h3 className="text-sm font-bold text-night">{pt.label}</h3>
                      </div>
                      <p className="text-xs sm:text-[13px] text-ink/70 leading-relaxed pl-6">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Section 7: Contact Information / Compliance Officer */}
            <div
              id="compliance-officer"
              className="bg-gradient-to-br from-brand-deep to-night text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden"
            >
              <div className="relative z-10 max-w-3xl">
                <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-accent-yellow text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                  <ShieldCheck className="w-4 h-4" /> Section 07 · Grievance & Compliance Desk
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold">
                  7. Contact Information &amp; Grievance Redressal
                </h2>
                <p className="mt-3 text-white/80 text-sm sm:text-base leading-relaxed">
                  Agar aapke paas is Privacy Policy se sambandhit koi sawaal hai, ya aap apne personal data rights (access, correction, deletion) exercise karna chahte hain, toh hamare Compliance Officer se sampark karein:
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-5">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-accent-yellow" />
                      <h3 className="font-bold text-sm">Email Address</h3>
                    </div>
                    <p className="text-xs text-white/70 mb-2">Official correspondence &amp; grievance filing</p>
                    <a
                      href="mailto:info@insureauditexpert.com"
                      className="text-sm font-extrabold text-accent-yellow hover:underline"
                    >
                      info@insureauditexpert.com
                    </a>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-5 h-5 text-accent-yellow" />
                      <h3 className="font-bold text-sm">Direct Phone Numbers</h3>
                    </div>
                    <p className="text-xs text-white/70 mb-2">Mon - Sat: 9:30 AM to 6:30 PM</p>
                    <div className="text-sm font-extrabold text-white">
                      <a href="tel:+918700515288" className="hover:text-accent-yellow transition">
                        +91 8700515288
                      </a>{" "}
                      /{" "}
                      <a href="tel:+919217955477" className="hover:text-accent-yellow transition">
                        +91 9217955477
                      </a>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 sm:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-accent-yellow" />
                      <h3 className="font-bold text-sm">Registered &amp; Corporate Office</h3>
                    </div>
                    <p className="text-sm text-white/90 leading-relaxed font-medium">
                      B-3/91, Krishna Nagar / B-8 Safdarjung Enclave, New Delhi - 110029, India
                    </p>
                    <p className="text-xs text-white/60 mt-1">
                      (Near Safdarjung Hospital & AIIMS metro corridor · Pan-India Claim Support)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-cloud py-14 border-t border-ink/8">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-night">
              Aapki Policy Ka Free Risk &amp; Security Audit Karwayein
            </h2>
            <p className="text-xs sm:text-sm text-ink/70 mt-1">
              Hidden gaps aur claim rejection clauses se bachein. 24 ghante mein detailed audit report paayein.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow-md"
            >
              <Sparkles className="w-4 h-4" /> Book Free Audit
            </Link>
            <Link
              to="/support"
              className="inline-flex items-center gap-2 bg-white border border-ink/15 hover:border-brand text-night hover:text-brand font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition"
            >
              Support Center <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
