import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
  Smartphone,
  Mic,
  Video,
  Radio,
  Trash2,
  XCircle,
  Check,
  Sliders,
  Server,
  AlertTriangle,
  Copy,
  ExternalLink,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Insure Audit Expert & Insure Track App" },
      {
        name: "description",
        content:
          "InsureAuditExpert.com aur Insure Track Mobile App ki Privacy Policy. Data collection, live intercom microphone streaming, fleet telematics, security aur Google Play Data Safety ki poori jankari.",
      },
      {
        name: "keywords",
        content:
          "Insure Audit Expert privacy policy, Insure Track app privacy Hinglish, LustreX Technologies, Google Play data safety, fleet telematics privacy, dashcam video privacy, intercom audio privacy",
      },
      { property: "og:title", content: "Privacy Policy | Insure Audit Expert & Insure Track" },
      {
        property: "og:description",
        content:
          "InsureAuditExpert.com aur Insure Track Mobile App par aapki privacy hamari top priority hai. Janein hum aapka data kaise collect, use aur protect karte hain.",
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
    englishSubtitle: "Information We Collect (Website & Audit Services)",
    icon: Database,
    description:
      "Jab aap hamari website visit karte hain ya Free Insurance Audit ke liye register karte hain, toh hum nimnlikhit jankari collect karte hain:",
    points: [
      {
        label: "Personal Identification (Pehchan Jankari)",
        desc: "Aapka poora Name, Email Address, Phone Number, aur Physical Address.",
      },
      {
        label: "Insurance Policy Data (Policy Ki Copy)",
        desc: "Jab aap Free Audit ke liye policy upload karte hain, toh hum policy number, coverage limits, IDV values, premium amount, deductibles, aur nominee/beneficiary details collect karte hain.",
      },
      {
        label: "Location Data (Spot Claim Eligibility)",
        desc: "Hamare Safdarjung Enclave (New Delhi) branch ke 20 KM radius ke andar physical spot claim assistance ki eligibility check karne ke liye.",
      },
      {
        label: "Consent & LOA Documents (Sehmati Patra)",
        desc: "Digital ya physical signatures aur Letter of Authorization (LOA) jo insurance companies ya IRDAI / Insurance Ombudsman ke samne aapka representation karne ke liye zaroori hote hain.",
      },
    ],
  },
  {
    id: "data-usage",
    number: "02",
    title: "Aapke Data Ka Upyog Kaise Hota Hai?",
    englishSubtitle: "How We Use Your Information",
    icon: FileText,
    description:
      "Hum collect kiye gaye data ka upyog strictly nimnlikhit official uddeshyon ke liye karte hain:",
    points: [
      {
        label: "Expert Policy Audit (Gahan Janch)",
        desc: "Aapke current insurance coverage ka deep audit karna, hidden clauses, zero-dep gaps, aur sub-limits ko pakad kar report taiyar karna.",
      },
      {
        label: "Personalized Recommendations (Sahi Plan Ki Salah)",
        desc: "Hamare licensed partner PBPartners (Policybazaar Insurance Brokers Pvt. Ltd.) aur IRDAI approved insurers ke tailored plans suggest karna.",
      },
      {
        label: "Claim Assistance & Representation (Claim Me Sahayata)",
        desc: "Claim process ko manage karna, surveyor ke sath coordination, aur galat claim rejection ke khilaf grievance appeal lead karna.",
      },
      {
        label: "Safety Tech Membership (Device Management)",
        desc: "Aapke account ko 'InsureAudit Expert Safety Club' aur Dashcam/GPS device warranty ke tehat smoothly manage karna.",
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
      "Aapka data hamare paas 100% surakshit hai. Hum transparency aur trust ke sath kaam karte hain:",
    points: [
      {
        label: "Channel Partner Disclosure",
        desc: "PBPartners (Policybazaar Insurance Brokers Pvt. Ltd.) ke authorized Channel Partner ke roop mein, jab aap 'Buy Now' links use karte hain toh relevant policy data unke secure portal ke madhyam se process hota hai.",
      },
      {
        label: "Regulatory & Legal Sharing (Kanooni Jarurat Par)",
        desc: "Hum aapka data Insurance Companies, IRDAI, ya Insurance Ombudsman ke sath sirf aapki explicit LOA sehmati se aur strictly claim settlement ke liye hi share karte hain.",
      },
      {
        label: "Strict No-Data-Selling (Data Na Bechne Ka Vada)",
        desc: "Hum aapki personal information kisi bhi third-party telemarketing ya advertising agency ko na toh bechte (sell) hain, na rent karte hain, aur na trade karte hain.",
      },
    ],
  },
  {
    id: "data-security",
    number: "04",
    title: "Data Security & Storage (Bank-Grade Suraksha)",
    englishSubtitle: "Data Suraksha Aur Cloud Bhandaran",
    icon: Lock,
    description:
      "Aapke uploaded documents aur sensitive records ko protect karne ke liye hum industry-standard bank-grade encryption use karte hain (Yeh section Website aur Insure Track App dono par barabar lagu hota hai):",
    points: [
      {
        label: "256-bit SSL/TLS Encryption",
        desc: "Data transit aur rest dono states mein bank-grade encryption (HTTPS/WSS) ke sath fully encrypted rehta hai.",
      },
      {
        label: "Restricted Access Control (Pratibandhit Pahunch)",
        desc: "Aapka policy data sirf authorized certified audit experts aur legal claim specialists hi access kar sakte hain.",
      },
      {
        label: "Zero Storage of Payment Info (No Card Storage)",
        desc: "Hum credit card, debit card ya net banking passwords kabhi store nahi karte. Saare payments RBI authorized gateways dwara hote hain.",
      },
    ],
  },
  {
    id: "consent",
    number: "05",
    title: "Aapki Sehmati (Your Consent)",
    englishSubtitle: "User Consent & Authorization",
    icon: UserCheck,
    description:
      "Apni policy upload karke ya hamari services ke liye register karke, aap is Privacy Policy ke tehat data collection aur usage ke liye apni sehmati pradan karte hain.",
    points: [
      {
        label: "Claim Representation Consent (LOA)",
        desc: "Insurer ya Ombudsman ke samne aapki taraf se appeal karne ke liye ek alag Letter of Authorization (LOA) mandatory hoga.",
      },
      {
        label: "Opt-Out Option (Khabron Se Bahar Nikalna)",
        desc: "Aap kisi bhi samay hamare reminder notifications ya communications se opt-out kar sakte hain.",
      },
    ],
  },
  {
    id: "your-rights",
    number: "06",
    title: "Aapke Adhikar (Your Rights)",
    englishSubtitle: "User Rights & Data Control",
    icon: Eye,
    description: "Ek user ke roop mein aapke paas nimnlikhit poore adhikar hain (Website aur Insure Track Mobile App dono ke liye):",
    points: [
      {
        label: "Data Access (Data Dekhne Ka Adhikar)",
        desc: "Aap hamare paas maujood apne personal data ki copy kisi bhi samay request kar sakte hain.",
      },
      {
        label: "Data Rectification (Sudhar Karwane Ka Adhikar)",
        desc: "Agar koi document ya contact details galat hain, toh aap unhe correct karwa sakte hain.",
      },
      {
        label: "Data Deletion (Right to be Forgotten)",
        desc: "Aap hamare active databases se apna account aur policy data delete karne ki request bhej sakte hain (info@insureauditexpert.com par email karein).",
      },
    ],
  },
];

const DATA_SAFETY_ROWS = [
  {
    type: "Audio — Voice or sound recordings (Live Intercom)",
    collected: "Haan (Yes)",
    shared: "Haan (Yes)",
    note: "Live intercom streaming gaadi ke cabin tak; app isko KABHI record ya store NAHI karta.",
  },
  {
    type: "Device or other IDs (Device Pehchan)",
    collected: "Haan (Yes)",
    shared: "Haan (Yes)",
    note: "FCM push token aur device identifier taaki safety notifications deliver ho sakein.",
  },
  {
    type: "Personal info — Name, Email, Phone",
    collected: "Haan (Yes)",
    shared: "Haan (Yes)",
    note: "Fleet operator account login aur session verification ke liye.",
  },
  {
    type: "App activity / Fleet Telematics Data",
    collected: "Haan (Yes)",
    shared: "Haan (Yes)",
    note: "Gaadi ki live position, movement status, route aur speed tracking.",
  },
  {
    type: "Photos and Videos (Dashcam Footage)",
    collected: "Haan (Yes)",
    shared: "Haan (Yes)",
    note: "Camera-fitted vehicles se footage retrieve karke app me dekhne aur download karne ke liye.",
  },
  {
    type: "Device Location (Aapke Phone Ki GPS)",
    collected: "Nahi (No)",
    shared: "—",
    note: "Sirf aapke phone par on-device use hota hai map center karne ke liye; server par KABHI transmit nahi hota.",
  },
  {
    type: "Financial info (Banking / Card Info)",
    collected: "Nahi (No)",
    shared: "—",
    note: "App me koi payments ya billing feature nahi hai.",
  },
  {
    type: "Crash logs / Diagnostics",
    collected: "Nahi (No)",
    shared: "—",
    note: "App me koi crash reporter SDK ya third-party tracking nahi hai.",
  },
];

function PrivacyPolicyPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("info@insureauditexpert.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

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
                <Shield className="w-3.5 h-3.5" /> InsureAuditExpert.com &amp; Insure Track App Policy
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-night leading-[1.12] tracking-tight">
                Privacy Policy <span className="text-brand">— Website &amp; Insure Track Mobile App</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-ink/75 leading-relaxed font-medium">
                <strong>InsureAuditExpert.com</strong> (&quot;Hum&quot;, &quot;Humari&quot;, ya &quot;Us&quot;) par aapki privacy hamari sabse badi zimmedari hai. Yeh policy transparent tarike se batati hai ki hum hamari website, audit services aur <strong>Insure Track mobile application</strong> ke madhyam se data kaise collect, use aur bank-grade security ke sath protect karte hain.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#policy-details"
                  className="inline-flex items-center gap-2 bg-night hover:bg-brand text-white text-sm font-bold px-6 py-3 rounded-xl transition shadow-md hover:shadow-lg"
                >
                  <FileText className="w-4 h-4" /> Poori Policy Padhein
                </a>
                <a
                  href="#insure-track-app"
                  className="inline-flex items-center gap-2 bg-brand-soft text-brand-deep hover:bg-brand hover:text-white text-sm font-bold px-5 py-3 rounded-xl transition shadow-xs"
                >
                  <Smartphone className="w-4 h-4" /> Section 07: Insure Track App
                </a>
                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 bg-white border border-ink/15 hover:border-brand text-night hover:text-brand text-sm font-bold px-5 py-3 rounded-xl transition shadow-xs"
                >
                  <HelpCircle className="w-4 h-4 text-brand" /> Sahayata Kendra
                </Link>
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
                    <p className="text-[11px] text-ink/60">Updated: March 2026</p>
                  </div>
                </div>
                <div className="space-y-3 text-xs text-ink/80">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span><strong>100% Data Encryption:</strong> 256-bit bank grade security (HTTPS/WSS).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span><strong>Zero Telemarketing Sale:</strong> Hum aapka number ya data kabhi nahi bechte.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span><strong>Insure Track App Covered:</strong> Google Play Data Safety compliant.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <span><strong>Full Rights:</strong> Copy mangne, sudhar karne ya delete karwane ka poora adhikar.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections 01 to 06 */}
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

            {/* Section 07: Insure Track Mobile Application (Hinglish) */}
            <div
              id="insure-track-app"
              className="bg-white border-2 border-brand/30 rounded-3xl p-7 sm:p-10 shadow-md relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-brand text-white grid place-items-center shrink-0 shadow-sm">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-brand">
                      Section 07 · Mobile Application Policy
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-night mt-0.5">
                      Insure Track Mobile Application
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-deep font-bold mt-0.5">
                      Insure Track Mobile App — Data Collection, Microphone Intercom &amp; Permissions
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 bg-brand-soft text-brand text-xs font-bold px-3 py-1.5 rounded-full self-start sm:self-auto">
                  <ShieldCheck className="w-4 h-4" /> Google Play Data Safety Compliant
                </span>
              </div>

              <div className="mt-6 text-sm sm:text-[15px] text-ink/80 leading-relaxed space-y-4 font-medium">
                <p>
                  <strong>Insure Track</strong> mobile application is website se ek alag dedicated service hai. Is application ko <strong>LustreX Technologies Private Limited</strong> (&quot;LustreX&quot;) dwara publish aur operate kiya jata hai aur yeh hamare registered customers ke authorized fleet administrators aur vehicle operators ke liye uplabdh karwayi gayi hai. App mein koi public sign-up nahi hota — accounts seedha aapke fleet administrator dwara generate kiye jaate hain.
                </p>
                <p>
                  App ke madhyam se aane wala data LustreX ke secure infrastructure <code className="bg-cloud text-brand-deep px-2 py-0.5 rounded font-mono text-xs font-bold">tracx.in</code> par transmit aur process hota hai. <strong>Section 04 (Data Security)</strong> aur <strong>Section 06 (Your Rights)</strong> is mobile app par bhi poori tarah barabar lagu hote hain.
                </p>
              </div>

              {/* Sub-sections */}
              <div className="mt-8 space-y-8">
                {/* 1. What the app collects */}
                <div>
                  <h3 className="text-lg font-bold text-night flex items-center gap-2 mb-4">
                    <Server className="w-5 h-5 text-brand" /> App Kaunsa Data Collect Karti Hai? (What the App Collects)
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-[13.5px]">
                    <div className="bg-cloud/70 border border-ink/8 rounded-xl p-4">
                      <div className="font-bold text-night mb-1 text-sm flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-brand" /> Account Information (Khaata Jankari)
                      </div>
                      <p className="text-ink/70 leading-relaxed">
                        Aapka Name, Email Address, aur Mobile Phone Number, jo app mein sign-in aur identity verification ke liye use hota hai.
                      </p>
                    </div>

                    <div className="bg-cloud/70 border border-ink/8 rounded-xl p-4">
                      <div className="font-bold text-night mb-1 text-sm flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-brand" /> Session Identifiers (Surakshit Session Tokens)
                      </div>
                      <p className="text-ink/70 leading-relaxed">
                        User ID, Company Identifier, aur encrypted authentication tokens jo aapko app me securely logged-in rakhte hain.
                      </p>
                    </div>

                    <div className="bg-cloud/70 border border-ink/8 rounded-xl p-4">
                      <div className="font-bold text-night mb-1 text-sm flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-brand" /> Push Notification Token &amp; Device ID
                      </div>
                      <p className="text-ink/70 leading-relaxed">
                        Firebase Cloud Messaging (Android) ya Apple Push Notification service (iOS) dwara issue kiya gaya token, taaki aapke mobile par instant alerts deliver ho sakein.
                      </p>
                    </div>

                    <div className="bg-cloud/70 border border-ink/8 rounded-xl p-4">
                      <div className="font-bold text-night mb-1 text-sm flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-brand" /> Fleet &amp; Vehicle Data (Gaadiyon Ka Telematics Data)
                      </div>
                      <p className="text-ink/70 leading-relaxed">
                        Gaadiyon ki live GPS positions, movement status, speed, aur aapke authorized fleet sites ki jankari.
                      </p>
                    </div>

                    <div className="bg-cloud/70 border border-ink/8 rounded-xl p-4">
                      <div className="font-bold text-night mb-1 text-sm flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-brand" /> Camera Footage (Dashcam Video)
                      </div>
                      <p className="text-ink/70 leading-relaxed">
                        Jin gaadiyon me camera hardware laga hai, wahan se recorded video app me live dekhne ke liye retrieve hoti hai. Agar aap koi clip download karte hain toh woh aapke phone ki gallery me save hoti hai. App aapke phone ki pehle se maujood photos ya media files ko bilkul read nahi karti.
                      </p>
                    </div>

                    <div className="bg-cloud/70 border border-ink/8 rounded-xl p-4">
                      <div className="font-bold text-night mb-1 text-sm flex items-center gap-1.5">
                        <Mic className="w-4 h-4 text-brand" /> Microphone Audio — Live Intercom (Do-Tarfa Voice Channel)
                      </div>
                      <p className="text-ink/70 leading-relaxed">
                        Two-way audio hardware wali gaadiyon me, app cabin ke sath live voice call open kar sakti hai. Call ke dauran aapka microphone stream hota hai taaki driver aapki baat sun sake. <strong>Yeh audio seedha gaadi tak transmit hoti hai — app is audio ko KABHI BHI record ya store NAHI karti.</strong> Microphone sirf tabhi active hota hai jab call chal rahi ho.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Location & What it does not collect */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-brand-soft/40 border border-brand/20 rounded-2xl p-6">
                    <h3 className="text-base font-bold text-night flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-brand" /> Aapke Device Ki Location (Your Device&apos;s Location)
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                      Jab aap location permission allow karte hain, toh app aapke phone ki position <strong>sirf tabhi read karti hai jab aap app USE kar rahe hote hain</strong> (foreground me). Iska purpose sirf map ko aapke aas-paas center karna aur nazdeeki vehicles/sites ko highlight karna hota hai.
                    </p>
                    <div className="mt-3 bg-white/80 border border-brand/20 rounded-xl p-3 text-xs text-brand-deep font-semibold">
                      ✓ Yeh data sirf aapke device par use hota hai — hamare servers par transmit NAHI hota, store NAHI hota, aur kisi ke sath share NAHI hota.
                    </div>
                    <p className="mt-2 text-[11.5px] text-ink/60">
                      *(Dhyan dein: Yeh website ke Section 01 mein bataye gaye 20 KM Branch Radius spot-claim eligibility rule se poori tarah alag hai).
                    </p>
                  </div>

                  <div className="bg-cloud/60 border border-ink/10 rounded-2xl p-6">
                    <h3 className="text-base font-bold text-night flex items-center gap-2 mb-2">
                      <XCircle className="w-5 h-5 text-accent-coral" /> App Kya Collect NAHI Karti? (What App Does NOT Collect)
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                      App aapka koi bhi Health Data, Contacts, Calendars, Payment Info, ya Advertising IDs collect <strong>NAHI</strong> karti.
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs text-ink/70">
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand" /> Phone ki photos ya files read nahi ki jaati</li>
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand" /> Koi advertising ya telemarketing SDK shaamil nahi hai</li>
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand" /> Koi third-party analytics ya crash-reporting service nahi hai</li>
                    </ul>
                  </div>
                </div>

                {/* 3. Note about drivers & Managing permissions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-ink/10 rounded-2xl p-6">
                    <h3 className="text-base font-bold text-night flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-accent-yellow" /> Drivers Ke Baare Mein Mahatvapurna Jankari (A Note About Drivers)
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
                      Camera footage aur intercom audio mein gaadi ke driver shaamil hote hain. In features ke upyog par fleet operator hi <strong>Data Controller</strong> hota hai. Fleet operator ki legal zimmedari hai ki woh apne drivers ko soochit kare ki gaadi me camera aur two-way audio device laga hai aur applicable workplace privacy laws ka poora paalan kare.
                    </p>
                  </div>

                  <div className="bg-white border border-ink/10 rounded-2xl p-6">
                    <h3 className="text-base font-bold text-night flex items-center gap-2 mb-2">
                      <Sliders className="w-5 h-5 text-brand" /> App Permissions Ko Manage Karna (Managing Permissions)
                    </h3>
                    <div className="text-xs sm:text-sm text-ink/75 space-y-2">
                      <p>
                        <strong>Android:</strong> Settings → Apps → Insure Track → Permissions. Notifications ke liye: Settings → Apps → Insure Track → Notifications.
                      </p>
                      <p>
                        <strong>iOS:</strong> Settings → Privacy &amp; Security (Location Services, Microphone). Notifications: Settings → Notifications → Insure Track.
                      </p>
                      <p className="text-[11.5px] text-ink/60 mt-1">
                        Microphone permission deny karne par sirf live intercom disable hoga, baaki poora app normal tarike se kaam karta rahega.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Deleting app account and data */}
                <div className="bg-cloud/80 border border-ink/12 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-night flex items-center gap-2">
                      <Trash2 className="w-5 h-5 text-brand" /> App Account Aur Data Delete Karwana (Account &amp; Data Deletion)
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-ink/70 max-w-2xl leading-relaxed">
                      App accounts fleet administrator dwara create kiye jaate hain. Apna account aur juda hua data delete karwane ke liye apne registered email se <strong>info@insureauditexpert.com</strong> par request bhejein. Hum aapki request acknowledge karenge, fleet admin aur LustreX ke sath coordinate karke deletion confirm karenge.
                    </p>
                  </div>
                  <a
                    href="mailto:info@insureauditexpert.com?subject=Insure%20Track%20Account%20Deletion%20Request&body=Hello%20InsureAuditExpert%20Team,%0A%0APlease%20delete%20my%20Insure%20Track%20mobile%20app%20account%20and%20associated%20data.%0A%0ARegistered%20Phone:%20%0AFleet%20Name:%20%0A%0AThank%20you."
                    onClick={() => {
                      navigator.clipboard?.writeText("info@insureauditexpert.com");
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 3000);
                    }}
                    className="inline-flex items-center gap-2 bg-night hover:bg-brand text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition shadow-xs hover:shadow-md shrink-0 active:scale-95"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-accent-yellow" />
                        <span>Email Copied &amp; Opening...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>Deletion Request Bhejein</span>
                      </>
                    )}
                  </a>
                </div>

                {/* 5. Google Play Data Safety Table in Hinglish */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-base font-bold text-night flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-brand" /> Google Play Data Safety Form Declarations
                    </h3>
                    <span className="text-[11px] font-bold text-brand bg-brand-soft px-2.5 py-1 rounded-full">
                      All data transit mein encrypted rehta hai (HTTPS/WSS)
                    </span>
                  </div>

                  <div className="overflow-x-auto border border-ink/10 rounded-2xl bg-white">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-cloud/80 text-night font-bold border-b border-ink/10">
                        <tr>
                          <th className="p-3.5">Data Type (Prakar)</th>
                          <th className="p-3.5">Collected? (Collect Hota Hai?)</th>
                          <th className="p-3.5">Shared? (Share Hota Hai?)</th>
                          <th className="p-3.5">Purpose / Explanation (Karan &amp; Details)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink/6 text-ink/80">
                        {DATA_SAFETY_ROWS.map((r, i) => (
                          <tr key={i} className="hover:bg-cloud/30 transition">
                            <td className="p-3.5 font-medium text-night">{r.type}</td>
                            <td className="p-3.5">
                              <span
                                className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                                  r.collected.includes("Haan")
                                    ? "bg-brand/10 text-brand"
                                    : "bg-ink/10 text-ink/60"
                                }`}
                              >
                                {r.collected}
                              </span>
                            </td>
                            <td className="p-3.5 font-semibold text-ink/70">{r.shared}</td>
                            <td className="p-3.5 text-xs text-ink/65">{r.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 08: Contact Information / Compliance Officer */}
            <div
              id="compliance-officer"
              className="bg-gradient-to-br from-brand-deep to-night text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden"
            >
              <div className="relative z-10 max-w-3xl">
                <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-accent-yellow text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                  <ShieldCheck className="w-4 h-4" /> Section 08 · Grievance &amp; Compliance Desk
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold">
                  8. Contact Information &amp; Grievance Redressal (Sahayata Aur Shikayat Nivaran)
                </h2>
                <p className="mt-3 text-white/80 text-sm sm:text-base leading-relaxed">
                  Agar aapke paas is Privacy Policy, Data Safety declarations, ya Insure Track App se sambandhit koi sawaal hai, ya aap apne personal data rights (access, correction, deletion) exercise karna chahte hain, toh hamare Compliance Officer se sampark karein:
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-5">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-accent-yellow" />
                      <h3 className="font-bold text-sm">Official Email Address</h3>
                    </div>
                    <p className="text-xs text-white/70 mb-2">Queries, shikayat aur app data deletion ke liye</p>
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
                      B-3/91, Krishna Nagar, Safdarjung Enclave, New Delhi - 110029, India
                    </p>
                    <p className="text-xs text-white/60 mt-1">
                      (Near Safdarjung Hospital &amp; AIIMS metro corridor · Pan-India Fleet &amp; Claim Support)
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
              <Sparkles className="w-4 h-4" /> Free Audit Book Karein
            </Link>
            <Link
              to="/support"
              className="inline-flex items-center gap-2 bg-white border border-ink/15 hover:border-brand text-night hover:text-brand font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition"
            >
              Sahayata Kendra <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
