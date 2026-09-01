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
} from "lucide-react";
import { PageShell } from "@/components/site-shell";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      {
        title:
          "Support & Sahayata Kendra | Insure Audit Expert — 24x7 Claim & Policy Help",
      },
      {
        name: "description",
        content:
          "Insure Audit Expert ka official Support aur Sahayata Kendra. Policy audit, claim rejection review, AI dashcam installation aur renewal assistance ke liye turant connect karein.",
      },
      {
        name: "keywords",
        content:
          "Insure Audit Expert support, insurance claim sahayata, insurance customer care Delhi, claim rejection help, AI dashcam support, policy audit helpdesk",
      },
      {
        property: "og:title",
        content:
          "Support & Sahayata Kendra | Insure Audit Expert — Aapki Madad Ke Liye Hamesha Taiyaar",
      },
      {
        property: "og:description",
        content:
          "Policy audit, claim filing, rejection assistance aur tracking support ke liye hamari Hinglish support team se sampark karein.",
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
    badge: "Fastest Response",
    badgeColor: "bg-brand/10 text-brand",
    title: "Instant WhatsApp Desk",
    hinglishDesc:
      "Aapke chote-bade sawal, document sharing ya claim status ke liye direct WhatsApp par expert se chat karein.",
    timing: "Available 24x7 (Avg. Reply: 2-5 Mins)",
    actionText: "Chat on WhatsApp",
    actionHref:
      "https://wa.me/918700515288?text=Namaste%20InsureAuditExpert,%20mujhe%20support%20chahiye",
    primary: true,
  },
  {
    icon: PhoneCall,
    badge: "Direct Calling",
    badgeColor: "bg-brand-deep/10 text-brand-deep",
    title: "Dedicated Calling Line",
    hinglishDesc:
      "Direct senior insurance auditor ya claim specialist se phone par seedhi baat karein.",
    timing: "Mon - Sat: 9:30 AM to 6:30 PM",
    actionText: "+91 87005 15288 / 92179 55477",
    actionHref: "tel:+918700515288",
    primary: false,
  },
  {
    icon: Mail,
    badge: "Official Desk",
    badgeColor: "bg-accent-yellow/20 text-night",
    title: "Email & Grievance Support",
    hinglishDesc:
      "Complex policy papers, claim rejection notices ya formal grievances ke liye email likhein.",
    timing: "Response within 24 business hours",
    actionText: "support@insureauditexpert.com",
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
    timing: "B-3/91 Krishna Nagar, Safdarjung Enclave, Delhi",
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
                  <div className="text-[11px] font-semibold text-ink/60 mb-2.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand" /> {ch.timing}
                  </div>
                  <a
                    href={ch.actionHref}
                    target={ch.actionHref.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 text-xs font-bold py-2.5 px-4 rounded-xl transition ${
                      ch.primary
                        ? "bg-brand hover:bg-brand-deep text-white shadow-xs"
                        : "bg-cloud hover:bg-brand hover:text-white text-night"
                    }`}
                  >
                    {ch.actionText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Support Ticket / Callback Form */}
      <section className="py-16 bg-cloud/70 border-y border-ink/8">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Online Sahayata Form
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-night leading-tight">
                Hamein Apni Query Ya Problem Batayein
              </h2>
              <p className="mt-3 text-sm text-ink/75 leading-relaxed font-medium">
                Apna vivaran (details) submit karein. Hamara case manager 15 minute ke bheetar aapse WhatsApp ya Phone par sampark karega.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-ink/8">
                  <FileCheck className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-night">Policy Document Ready?</h3>
                    <p className="text-xs text-ink/65 mt-0.5">
                      Aap form ke baad directly WhatsApp par PDF ya photo bhej sakte hain.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-ink/8">
                  <ShieldCheck className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-night">100% Privacy Assured</h3>
                    <p className="text-xs text-ink/65 mt-0.5">
                      Aapka contact number kisi bhi spam call ya telemarketing list me nahi jayega.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Box */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-ink/10 rounded-2xl p-6 sm:p-8 shadow-sm">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-brand/10 text-brand rounded-full grid place-items-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-night">
                      Aapka Request Mil Gaya Hai!
                    </h3>
                    <p className="text-sm text-ink/70 mt-2 max-w-md mx-auto">
                      Dhanyawad <strong>{formData.name}</strong> ji. Hamari expert team aapke number <strong>{formData.phone}</strong> par turant connect karegi.
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <a
                        href={`https://wa.me/918700515288?text=Namaste,%20Maine%20abhi%20support%20form%20submit%20kiya%20hai.%20Name:%20${encodeURIComponent(
                          formData.name
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition shadow-xs"
                      >
                        <MessageSquare className="w-4 h-4" /> Open in WhatsApp Now
                      </a>
                      <button
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
                        className="text-xs sm:text-sm font-bold text-ink/70 hover:text-night px-4 py-3"
                      >
                        Dusra query submit karein
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-night mb-1.5">
                        Aapko kis vishay (category) me sahayata chahiye? *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { id: "claim-support", label: "Claim Sahayata" },
                          { id: "policy-audit", label: "Free Policy Audit" },
                          { id: "dashcam-tracking", label: "AI Dashcam / GPS" },
                          { id: "renewal-help", label: "Renewal Assistance" },
                          { id: "fleet-bus", label: "Fleet / School Bus" },
                          { id: "other", label: "Anya (Other Query)" },
                        ].map((cat) => (
                          <button
                            type="button"
                            key={cat.id}
                            onClick={() => setTicketCategory(cat.id)}
                            className={`text-xs font-bold py-2.5 px-3 rounded-xl border text-center transition ${
                              ticketCategory === cat.id
                                ? "bg-brand text-white border-brand shadow-xs"
                                : "bg-cloud/50 border-ink/10 text-ink/80 hover:border-brand/40"
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
                          Aapka Poora Naam (Full Name) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Rahul Sharma"
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-ink/15 focus:outline-none focus:border-brand bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-night mb-1">
                          WhatsApp / Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
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
                          placeholder="e.g. rahul@gmail.com"
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-ink/15 focus:outline-none focus:border-brand bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-night mb-1">
                          Vehicle / Policy No. (Optional)
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
                          placeholder="e.g. DL 01 AB 1234"
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

      {/* Hinglish FAQ Section */}
      <section className="py-16 bg-paper">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand">
              Aapke Sawal, Hamare Jawab
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-night mt-1">
              Frequently Asked Questions (FAQ)
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

          {/* Still have questions banner */}
          <div className="mt-12 bg-brand-soft/70 border border-brand/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-lg font-extrabold text-night">
                Kya aapka sawal yahan nahi mila?
              </h3>
              <p className="text-xs sm:text-sm text-ink/70 mt-1">
                Aap bina jhijhak hamare expert se direct WhatsApp par pooch sakte hain.
              </p>
            </div>
            <a
              href="https://wa.me/918700515288?text=Namaste%20InsureAuditExpert,%20mera%20ek%20sawal%20hai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition shadow-xs shrink-0"
            >
              <MessageSquare className="w-4 h-4" /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
