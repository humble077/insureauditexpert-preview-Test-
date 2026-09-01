import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  HelpCircle,
  MessageSquare,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  FileCheck,
  ChevronDown,
  ArrowRight,
  Headphones,
  Car,
  Truck,
  FileQuestion,
  ExternalLink,
  Smartphone,
  Video,
  Mic,
  Trash2,
  Shield,
  Sliders,
  Check,
  Copy,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      {
        title:
          "Support & Sahayata Kendra | Insure Audit Expert & Insure Track App",
      },
      {
        name: "description",
        content:
          "Policy audit, claim filing, rejection assistance, GPS tracking aur Insure Track Mobile App support ke liye hamari 24x7 Hinglish support team se sampark karein.",
      },
      {
        name: "keywords",
        content:
          "Insure Audit Expert support, insurance claim sahayata, Insure Track app help, LustreX app support, claim rejection helpline, policy audit Delhi helpdesk",
      },
      {
        property: "og:title",
        content: "Support & Sahayata Kendra | Insure Audit Expert & Insure Track",
      },
      {
        property: "og:description",
        content:
          "Claim rejection, free policy audit, GPS tracking aur Insure Track mobile app ke liye 24x7 Hinglish customer sahayata.",
      },
      { property: "og:url", content: `${SITE_URL}/support` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/support` }],
  }),
  component: SupportPage,
});

const SUPPORT_CHANNELS = [
  {
    icon: MessageSquare,
    badge: "Fastest 24x7",
    badgeColor: "bg-brand text-white",
    title: "WhatsApp Sahayata Desk",
    hinglishDesc:
      "Policy photo bhejein, claim rejection par instant advice paayein ya surveyor report discuss karein.",
    timing: "24x7 Active · Reply in ~15 Mins",
    actionText: "Chat on WhatsApp",
    actionHref:
      "https://wa.me/918700515288?text=Namaste%20InsureAuditExpert,%20mujhe%20sahayata%20chahiye",
    primary: true,
  },
  {
    icon: PhoneCall,
    badge: "Direct Calling",
    badgeColor: "bg-brand-deep text-white",
    title: "Direct Expert Call",
    hinglishDesc:
      "Senior policy auditor aur legal claim specialists se seedha phone par baat karke salaah lein.",
    timing: "Mon – Sat · 9:30 AM to 6:30 PM",
    actionText: "+91 8700515288 / 9217955477",
    actionHref: "tel:+918700515288",
    primary: false,
  },
  {
    icon: Mail,
    badge: "Official Desk",
    badgeColor: "bg-accent-yellow text-night font-bold",
    title: "Support & Grievance Mail",
    hinglishDesc:
      "Detailed rejection documents, audit files ya Insure Track app data deletion ke liye email karein.",
    timing: "support@insureauditexpert.com",
    actionText: "Email Support Desk",
    actionHref: "mailto:support@insureauditexpert.com",
    primary: false,
  },
  {
    icon: MapPin,
    badge: "In-Person Visit",
    badgeColor: "bg-ink/10 text-ink",
    title: "Delhi Head Office",
    hinglishDesc:
      "Face-to-face policy audit consultation ya document submission ke liye hamare office padharein.",
    timing: "B-3/91, Krishna Nagar, Safdarjung Enclave, New Delhi - 110029",
    actionText: "View on Google Maps",
    actionHref:
      "https://maps.google.com/?q=B-3/91+Krishna+Nagar+Safdarjung+Enclave+New+Delhi+110029",
    primary: false,
  },
];

const FAQS = [
  {
    q: "Mera insurance claim reject ho gaya hai, kya aap meri sahayata kar sakte hain?",
    a: "Haan, bilkul! Hamari legal aur IRDAI audit team aapke rejection letter aur policy wording ka 100% free review karti hai. Agar rejection wrongful ya ambiguous clause ke karan hui hai, toh hum Insurance Company aur Insurance Ombudsman ke samne proper appeal/grievance represent karne me poori madad karte hain.",
  },
  {
    q: "Free Policy Audit ke liye mujhe kaun-kaun se documents bhejne honge?",
    a: "Aapko bas apni current active insurance policy ka PDF ya clear photo WhatsApp (+91 8700515288) ya is portal par upload karna hoga. Hum 24 ghante ke andar hidden deductions, zero-dep exclusions aur premium optimization gaps ki detailed report provide karte hain.",
  },
  {
    q: "AI Dashcam aur GPS Tracker install karne par meri gaadi ki warranty khatam hogi kya?",
    a: "Nahi! Hamare devices zero wiring-cut OBD-II plug-and-play technology par work karte hain. Isme vehicle ki original factory wiring me koi chhed-chhad ya cut nahi kiya jata, isliye aapki vehicle warranty 100% intact aur safe rehti hai.",
  },
  {
    q: "20 KM Branch Radius physical claim assistance ka kya matlab hai?",
    a: "Safdarjung Enclave (New Delhi) office ke 20 KM ke daayre mein kisi accident ya major breakdown ke samay hamara authorized surveyor physical spot verification aur spot documentation me aapki madad ke liye on-ground pahunchta hai.",
  },
  {
    q: "Insure Audit Expert aur PBPartners ka aapas mein kya relation hai?",
    a: "Insure Audit Expert ek technology aur risk audit firm hai (Alexfintech Risk & Solutions OPC Pvt. Ltd.). Hamare customers ko IRDAI approved standard rates par policies dilwane ke liye hum PBPartners (Policybazaar Insurance Brokers Pvt. Ltd.) ke authorized channel partner ke roop mein operate karte hain.",
  },
  {
    q: "Commercial vehicle ya School Bus fleet ka audit kaise karwayein?",
    a: "Agar aapke paas 5 ya 500 gaadiyon ka fleet hai, toh aap hamare Fleet Manager se seedha sampark kar sakte hain. Hum bulk policy audit, GPS live tracking integration aur driver safety monitoring setup karte hain.",
  },
];

const APP_FAQS = [
  {
    q: "I don't have login credentials (Login details nahi hain, account kaise banayein?)",
    a: "Insure Track accounts seedha aapke fleet administrator dwara create kiye jaate hain — app ke andar koi public sign-up nahi hota. Apne fleet admin se login credentials maangein ya support@insureauditexpert.com par likhein.",
  },
  {
    q: "The map is blank, or my vehicles are missing (Map blank aa raha hai ya gaadiyan nahi dikh rahi hain?)",
    a: "Pehle check karein ki aapke fleet ki kam se kam ek gaadi telematics data bhej rahi ho aur aapka account sahi fleet se mapped ho. Location permission optional hai — yeh sirf map ko aapki khud ki position par center karne ke liye hoti hai. Android settings: Settings → Apps → Insure Track → Permissions → Location.",
  },
  {
    q: "Vehicle positions look out of date (Gaadi ki position purani ya offline dikh rahi hai?)",
    a: "Gaadi ki position tabhi update hoti hai jab gaadi me laga GPS/Dashcam device network report bhejta hai. Agar gaadi offline dikh rahi hai, toh device ki power supply aur SIM/network connectivity apne fleet administrator se verify karwayein.",
  },
  {
    q: "I'm not receiving notifications (Mobile par alerts aur notifications nahi aa rahe hain?)",
    a: "Check karein ki mobile settings me notifications allow hain: Settings → Apps → Insure Track → Notifications. Agar aapne app reinstall kiya hai, toh ek baar Sign Out karke dubara Sign In karein taaki device token refresh ho sake.",
  },
  {
    q: "I can't see the camera, or the intercom won't connect (Camera footage nahi dikh rahi ya voice intercom connect nahi ho raha?)",
    a: "Live camera aur two-way intercom sirf unhi gaadiyon me kaam karta hai jinme camera hardware fitted hai aur gaadi online ho. Intercom ke liye phone ki microphone permission zaroori hai: Settings → Apps → Insure Track → Permissions → Microphone.",
  },
  {
    q: "Where do downloaded video clips go? (Download ki gayi dashcam clips kahan save hoti hain?)",
    a: "App se download ki gayi video clips seedha aapke device ki Gallery / Downloads folder me save hoti hain. App sirf clips save karta hai — aapke phone ki purani photos ya videos ko kabhi read nahi karta.",
  },
  {
    q: "The app only shows two screens (App me sirf Dashboard aur Live Map hi dikh raha hai?)",
    a: "Haan, yeh bilkul expected aur normal hai. Insure Track ko clean aur fast rakhne ke liye banaya gaya hai — isme Fleet Dashboard aur Live Map views shamil hain. Aapko kya dikhega yeh aapke fleet administrator dwara assign kiye gaye role par depend karta hai.",
  },
  {
    q: "How do I delete my account or my data? (Mera app account aur data delete kaise karwayein?)",
    a: "Apne registered email address se info@insureauditexpert.com par deletion request email karein. Hum aapki request acknowledge karenge, fleet administrator aur LustreX ke sath coordinate karke account aur associated telematics data delete karenge. Poori jankari ke liye Privacy Policy ka Section 07 padhein.",
  },
];

function SupportPage() {
  const [ticketCategory, setTicketCategory] = useState("claim-support");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    policyOrVehicleNo: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openAppFaq, setOpenAppFaq] = useState<number | null>(null);
  const [copiedDeletionEmail, setCopiedDeletionEmail] = useState(false);

  const handleCopyDeletionEmail = () => {
    navigator.clipboard.writeText("info@insureauditexpert.com");
    setCopiedDeletionEmail(true);
    setTimeout(() => setCopiedDeletionEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-soft/80 via-cloud to-paper pt-14 pb-16 md:pt-20 md:pb-24 border-b border-ink/5">
        <div className="max-w-[1240px] mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-ink/60 mb-6">
            <Link to="/" className="hover:text-brand transition">
              Home
            </Link>
            <span className="text-ink/30">/</span>
            <span className="text-brand font-bold">Sahayata &amp; Support Kendra</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white border border-brand/25 text-brand text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs mb-5">
              <Headphones className="w-3.5 h-3.5" /> 24x7 Customer Sahayata &amp; Claim Helpdesk
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-night leading-[1.12] tracking-tight">
              Aapki Har Zaroorat Mein <span className="text-brand">Hum Hain Aapke Saath</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-ink/75 leading-relaxed font-medium">
              Policy audit, wrongful claim rejection, renewal reminder ya AI dashcam tracking me koi bhi pareshani ho — hamari certified expert team aapko Hinglish aur English dono me transparent support dene ke liye hamesha taiyaar hai.
            </p>
          </div>

          {/* SLA Badges */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "15 Min Response", desc: "WhatsApp initial reply SLA" },
              { title: "24-Hour Audit", desc: "Quick policy gap report" },
              { title: "Dedicated RM", desc: "Personal case manager" },
              { title: "Zero Service Fee", desc: "Basic audit 100% complimentary" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur border border-ink/8 rounded-xl p-4 shadow-xs"
              >
                <div className="text-sm font-extrabold text-brand-deep">{item.title}</div>
                <div className="text-xs text-ink/65 mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Support Channels */}
      <section className="py-16 bg-paper">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-night">
              Apni Pasand Ka Support Channel Chunein
            </h2>
            <p className="text-sm text-ink/70 mt-2">
              Chaahe WhatsApp par chat karni ho ya direct expert se phone par baat — hum har jagah uplabdh hain.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUPPORT_CHANNELS.map((ch, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 border ${
                  ch.primary
                    ? "bg-gradient-to-b from-brand-soft/50 to-white border-brand shadow-md hover:shadow-lg hover:-translate-y-1"
                    : "bg-white border-ink/10 shadow-xs hover:shadow-md hover:border-brand/40 hover:-translate-y-1"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl grid place-items-center ${
                        ch.primary ? "bg-brand text-white" : "bg-cloud text-brand-deep"
                      }`}
                    >
                      <ch.icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[10.5px] font-extrabold uppercase px-2.5 py-1 rounded-full ${ch.badgeColor}`}
                    >
                      {ch.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-night">{ch.title}</h3>
                  <p className="mt-2 text-xs sm:text-[13px] text-ink/70 leading-relaxed font-normal">
                    {ch.hinglishDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/8">
                  <div className="text-[11px] text-ink/60 font-medium mb-3">{ch.timing}</div>
                  <a
                    href={ch.actionHref}
                    target={ch.actionHref.startsWith("http") ? "_blank" : undefined}
                    rel={ch.actionHref.startsWith("http") ? "noreferrer" : undefined}
                    className={`inline-flex items-center justify-center gap-1.5 w-full text-xs font-bold py-2.5 px-4 rounded-xl transition ${
                      ch.primary
                        ? "bg-brand hover:bg-brand-deep text-white shadow-xs"
                        : "bg-cloud hover:bg-brand-soft text-brand-deep hover:text-brand"
                    }`}
                  >
                    {ch.actionText} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Support Request Form */}
      <section className="py-16 bg-cloud/50 border-y border-ink/8">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="bg-white border border-ink/10 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Online Ticket / Callback Request
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-night mt-1">
                  Hamare Certified Expert Se Callback Paayein
                </h2>
                <p className="text-xs sm:text-sm text-ink/70 mt-3 leading-relaxed">
                  Apni policy number ya problem details neeche likhein. Hamara claim &amp; audit manager agle 15–30 minutes me aapse sampark karega.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-soft grid place-items-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-brand" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-night">
                        100% Free Consultation
                      </h3>
                      <p className="text-[11.5px] text-ink/65">
                        Basic audit aur rejection assessment ka koi charge nahi hai.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-soft grid place-items-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-brand" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-night">
                        Bank-Grade Privacy
                      </h3>
                      <p className="text-[11.5px] text-ink/65">
                        Aapke documents kisi teesre paksh telemarketer ko share nahi kiye jaate.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-soft grid place-items-center shrink-0">
                      <FileCheck className="w-4 h-4 text-brand" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-night">
                        IRDAI &amp; PBPartners Compliant
                      </h3>
                      <p className="text-[11.5px] text-ink/65">
                        Standard legal processes ke sath transparent advice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="lg:col-span-7 bg-cloud/40 p-6 sm:p-8 rounded-2xl border border-ink/8">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-brand-soft text-brand grid place-items-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-extrabold text-night">
                      Dhanyawad! Request Darj Ho Gayi Hai
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/75 mt-2 max-w-md mx-auto">
                      Hamare claim audit specialist <strong>{formData.name}</strong> ji ko agle 15–30 minutes mein call karenge.
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: "",
                            phone: "",
                            email: "",
                            policyOrVehicleNo: "",
                            message: "",
                          });
                        }}
                        className="text-xs font-bold text-brand hover:underline"
                      >
                        Doosri Request Bhejein
                      </button>
                      <span>·</span>
                      <a
                        href={`https://wa.me/918700515288?text=Hello,%20I%20just%20submitted%20a%20support%20request%20for%20${encodeURIComponent(
                          formData.name || "Customer",
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-brand-deep hover:underline inline-flex items-center gap-1"
                      >
                        WhatsApp Par Follow-up Karein <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Category Selector */}
                    <div>
                      <label className="block text-xs font-bold text-night mb-2">
                        Sahayata Ka Prakar (Category)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: "claim-support", label: "Claim Rejection" },
                          { id: "policy-audit", label: "Free Policy Audit" },
                          { id: "tech-support", label: "Dashcam / App Help" },
                          { id: "renewal-help", label: "Renewal Help" },
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setTicketCategory(cat.id)}
                            className={`text-xs font-bold py-2.5 px-3 rounded-xl border transition text-center ${
                              ticketCategory === cat.id
                                ? "bg-brand text-white border-brand shadow-xs"
                                : "bg-white text-ink/75 border-ink/12 hover:border-brand/40"
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-night mb-1">
                          Aapka Poora Name *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-ink/15 focus:outline-none focus:border-brand bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-night mb-1">
                          Mobile / WhatsApp Number *
                        </label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="e.g. 9876543210"
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-ink/15 focus:outline-none focus:border-brand bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-night mb-1">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="e.g. rajesh@gmail.com"
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-ink/15 focus:outline-none focus:border-brand bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-night mb-1">
                          Policy / Vehicle Number (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.policyOrVehicleNo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              policyOrVehicleNo: e.target.value,
                            })
                          }
                          placeholder="e.g. DL01AB1234"
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-ink/15 focus:outline-none focus:border-brand bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-night mb-1">
                        Aapki Pareshani Ya Sawal (Message in Hinglish or English)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="e.g. Meri car ka bumper claim surveyor ne reject kar diya hai, kripya audit report banayein..."
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-ink/15 focus:outline-none focus:border-brand bg-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-deep text-white text-sm font-bold py-3.5 rounded-xl transition shadow-md hover:shadow-lg"
                    >
                      <Send className="w-4 h-4" /> Sahayata Request Bhejein (Submit)
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* General Hinglish FAQ Section */}
      <section className="py-16 bg-paper">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand">
              Aapke Sawal, Hamare Jawab
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-night mt-1">
              Frequently Asked Questions (General FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-ink/70 mt-1.5">
              Insure Audit Expert ki services, claims aur safety technology ke bare mein aam sawal.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-ink/10 rounded-2xl overflow-hidden bg-white transition shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-night hover:text-brand transition"
                  >
                    <span className="text-sm sm:text-base leading-snug">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-brand shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-ink/75 leading-relaxed font-medium border-t border-ink/6 pt-4 bg-cloud/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dedicated Insure Track Mobile App Support Section (Hinglish) */}
      <section id="insure-track-support" className="py-16 bg-gradient-to-b from-cloud/60 via-brand-soft/20 to-paper border-t border-ink/8">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-white border-2 border-brand/25 rounded-3xl p-7 sm:p-10 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink/10">
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-brand text-white grid place-items-center shrink-0 shadow-xs">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-brand">
                    Mobile App Helpdesk
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-night mt-0.5">
                    Insure Track Mobile App — Support
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-deep font-bold mt-0.5">
                    Insure Track Mobile App ke liye takneeki sahayata aur FAQs
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-brand-soft text-brand text-xs font-bold px-3 py-1.5 rounded-full self-start sm:self-auto">
                <ShieldCheck className="w-4 h-4" /> Android &amp; iOS App Desk
              </span>
            </div>

            <p className="mt-6 text-xs sm:text-sm text-ink/80 leading-relaxed font-medium">
              <strong>Insure Track</strong> mobile application authorized fleet administrators aur vehicle operators ko live vehicle map, route tracking aur fleet dashboard provide karta hai. Agar aapka sawaal neeche listed nahi hai, toh hamare WhatsApp par ya <a href="mailto:support@insureauditexpert.com" className="text-brand font-bold hover:underline">support@insureauditexpert.com</a> par likhein.
            </p>

            {/* App FAQs Accordion */}
            <div className="mt-8 space-y-3">
              {APP_FAQS.map((faq, index) => {
                const isOpen = openAppFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-ink/10 rounded-2xl overflow-hidden bg-cloud/30 hover:border-brand/30 transition shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenAppFaq(isOpen ? null : index)}
                      className="w-full text-left p-4.5 sm:p-5 flex items-center justify-between gap-4 font-bold text-night hover:text-brand transition"
                    >
                      <span className="text-xs sm:text-sm leading-snug">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-brand shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-[13px] text-ink/75 leading-relaxed font-medium border-t border-ink/6 pt-3 bg-white">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick App Action Banners */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="bg-brand-soft/40 border border-brand/20 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-night flex items-center gap-2">
                    <Trash2 className="w-4 h-4 text-brand" /> Account Ya Data Delete Karwana?
                  </h3>
                  <p className="text-xs text-ink/70 mt-1.5 leading-relaxed">
                    Apne registered email se <strong>info@insureauditexpert.com</strong> par request bhejein. Hum aapke fleet admin aur LustreX ke sath data deletion confirm karenge.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-brand/15 flex items-center justify-between gap-3">
                  <a
                    href="mailto:info@insureauditexpert.com?subject=Insure%20Track%20Account%20Deletion%20Request&body=Hello%20InsureAuditExpert%20Team,%0A%0APlease%20delete%20my%20Insure%20Track%20mobile%20app%20account%20and%20associated%20data.%0A%0ARegistered%20Phone:%20%0AFleet%20Name:%20%0A%0AThank%20you."
                    onClick={() => {
                      navigator.clipboard?.writeText("info@insureauditexpert.com");
                      setCopiedDeletionEmail(true);
                      setTimeout(() => setCopiedDeletionEmail(false), 3000);
                    }}
                    className="text-xs font-bold bg-brand hover:bg-brand-deep text-white px-3.5 py-2 rounded-xl transition inline-flex items-center gap-1.5 shadow-2xs active:scale-95"
                  >
                    {copiedDeletionEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-accent-yellow" />
                        <span>Email Copied &amp; Opening...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Deletion Mail</span>
                      </>
                    )}
                  </a>
                  <Link
                    to="/privacy-policy"
                    hash="insure-track-app"
                    className="text-[11.5px] font-bold text-brand-deep hover:underline"
                  >
                    Section 07 Details →
                  </Link>
                </div>
              </div>

              <div className="bg-cloud/70 border border-ink/10 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-night flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-brand" /> App Me Koi Bug Ya Error?
                  </h3>
                  <p className="text-xs text-ink/70 mt-1.5 leading-relaxed">
                    Screenshot WhatsApp desk (+91 8700515288) par bhejein taaki hamari technical team immediate resolve kar sake.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-ink/10">
                  <a
                    href="https://wa.me/918700515288?text=Hello%20InsureAuditExpert,%20Insure%20Track%20app%20me%20ek%20issue%20hai"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-brand hover:underline inline-flex items-center gap-1"
                  >
                    Chat on WhatsApp <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Still Have Questions Banner */}
      <section className="py-10 bg-paper">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-night text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-center sm:text-left">
            <div>
              <span className="text-accent-yellow text-xs font-extrabold uppercase tracking-wider">
                24x7 Priority Support
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold mt-1">
                Bina Kisi Jhijhak Direct Hamari Team Se Baat Karein
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1.5 max-w-md">
                Chaahe claims ho, policy audit ho ya Insure Track app — hum hamesha madad ke liye uplabdh hain.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="https://wa.me/918700515288?text=Namaste%20InsureAuditExpert,%20mujhe%20sahayata%20chahiye"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-brand hover:bg-white hover:text-night text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow-md"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp (24x7)
              </a>
              <a
                href="tel:+918700515288"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition border border-white/15"
              >
                <PhoneCall className="w-4 h-4 text-accent-yellow" /> Call Expert
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
