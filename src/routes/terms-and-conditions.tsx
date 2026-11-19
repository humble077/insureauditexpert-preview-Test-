import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Shield,
  FileText,
  AlertTriangle,
  Scale,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Building2,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      {
        title: "Terms & Conditions | IRDAI Compliance & User Agreement — Insure Audit Expert",
      },
      {
        name: "description",
        content:
          "Terms and Conditions governing the use of InsureAuditExpert.com, policy audit services, telematics hardware, and insurance solicitation under POSP partner PBPartners (POS Code: IP461548). Section 41 compliant.",
      },
      {
        name: "keywords",
        content:
          "Insure Audit Expert terms, IRDAI compliance terms, POSP channel partner agreement, Section 41 Insurance Act, telematics hardware terms, Alxsure Tech Hub terms",
      },
      {
        property: "og:title",
        content: "Terms & Conditions — Insure Audit Expert & Alxsure Tech Hub",
      },
      {
        property: "og:description",
        content:
          "Official user agreement, regulatory disclosure, Section 41 anti-rebate compliance, and commercial terms for Insure Audit Expert.",
      },
      { property: "og:url", content: `${SITE_URL}/terms-and-conditions` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms-and-conditions` }],
  }),
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  return (
    <PageShell>
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-brand-soft/60 via-paper to-paper pt-12 pb-16 border-b border-ink/8">
        <div className="max-w-[1240px] mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-ink/60 mb-6">
            <Link to="/" className="hover:text-brand transition">
              Home
            </Link>
            <span className="text-ink/30">/</span>
            <span className="text-brand font-bold">Terms &amp; Conditions</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-2xs mb-4">
              <Scale className="w-3.5 h-3.5" /> Legal &amp; Regulatory Agreement
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-night leading-tight tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ink/75 leading-relaxed">
              Please read these Terms and Conditions carefully. They govern your access to and use of{" "}
              <strong>InsureAuditExpert.com</strong>, our risk audit advisory, and the independent telematics hardware and software offerings of{" "}
              <strong>Alxsure Tech Hub (OPC) Pvt. Ltd.</strong>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-ink/60 font-semibold">
              <span>Effective Date: November 2026</span>
              <span>·</span>
              <span>Version: 3.2 (IRDAI &amp; Section 41 Aligned)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-paper">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-12 gap-12">
          {/* Main Document Body */}
          <div className="lg:col-span-8 space-y-12 text-ink/80 text-[15px] leading-relaxed">
            {/* Section 1 */}
            <div className="bg-white rounded-3xl border border-ink/10 p-8 shadow-xs">
              <div className="flex items-center gap-3 text-brand font-bold text-xs uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4" /> Section 01
              </div>
              <h2 className="text-2xl font-extrabold text-night">Corporate Identity &amp; Channel Status</h2>
              <div className="mt-4 space-y-3.5 text-sm sm:text-base">
                <p>
                  <strong>Insure Audit Expert</strong> is a commercial brand wholly owned and operated by{" "}
                  <strong>Alxsure Tech Hub (OPC) Pvt. Ltd.</strong>, incorporated under the Companies Act, 2013, with its registered corporate office at B-5/55, Safdarjung Enclave, New Delhi - 110029, India.
                </p>
                <p>
                  Insure Audit Expert operates as an <strong>Authorized POSP Channel Partner</strong> under{" "}
                  <strong>PBPartners (Policybazaar Insurance Brokers Private Limited)</strong>, holding registered POS Code:{" "}
                  <strong className="text-night font-mono">IP461548</strong>. All insurance policies facilitated through this platform are solicited, serviced, and underwritten through PBPartners and IRDAI-registered insurance carriers.
                </p>
              </div>
            </div>

            {/* Section 2: Statutory Compliance */}
            <div className="bg-white rounded-3xl border border-ink/10 p-8 shadow-xs">
              <div className="flex items-center gap-3 text-brand font-bold text-xs uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4 text-brand" /> Section 02
              </div>
              <h2 className="text-2xl font-extrabold text-night">
                Prohibition of Rebates (Section 41, Insurance Act, 1938)
              </h2>
              <div className="mt-4 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed space-y-3">
                <div className="font-bold uppercase tracking-wider text-amber-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" /> Statutory Mandate: Section 41
                </div>
                <p className="italic">
                  &ldquo;No person shall allow or offer to allow, either directly or indirectly, as an inducement to any person to take out or renew or continue an insurance in respect of any kind of risk relating to lives or property in India, any rebate of the whole or part of the commission payable or any rebate of the premium shown on the policy, nor shall any person taking out or renewing or continuing a policy accept any rebate, except such rebate as may be allowed in accordance with the published prospectuses or tables of the insurer.&rdquo;
                </p>
                <p className="font-semibold">
                  Any person making default in complying with the provisions of Section 41 is punishable under law with a penalty which may extend to ten lakh rupees (₹10,00,000).
                </p>
              </div>
              <p className="mt-4 text-sm sm:text-base">
                In strict adherence to Section 41, <strong>Insure Audit Expert provides no rebates, commission kickbacks, premium cashbacks, or unauthorized discounts</strong>. All insurance premiums are calculated and billed at the standard, exact filed rates approved by the Insurance Regulatory and Development Authority of India (IRDAI).
              </p>
            </div>

            {/* Section 3: Separation of Tech and Insurance */}
            <div className="bg-white rounded-3xl border border-ink/10 p-8 shadow-xs">
              <div className="flex items-center gap-3 text-brand font-bold text-xs uppercase tracking-wider mb-2">
                <Scale className="w-4 h-4" /> Section 03
              </div>
              <h2 className="text-2xl font-extrabold text-night">
                Clear Separation of Insurance &amp; Telematics Offerings
              </h2>
              <div className="mt-4 space-y-3.5 text-sm sm:text-base">
                <p>
                  To maintain complete commercial and regulatory transparency:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-1" />
                    <span>
                      <strong>Independent Commercial Offerings:</strong> AI Dashcams, AIS-140 GPS tracking devices, IoT fuel/temperature sensors, and software telemetry subscriptions are independent technology products manufactured or procured and distributed separately by <strong>Alxsure Tech Hub (OPC) Pvt. Ltd.</strong> under independent commercial invoices.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-1" />
                    <span>
                      <strong>No Freebie Inducement:</strong> Telematics hardware is not a free gift, rebate, or illegal inducement conditioned on the purchase of insurance. Customers may purchase insurance policies independently at standard IRDAI rates without opting for any hardware or telematics subscription.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-1" />
                    <span>
                      <strong>Separate Contracts:</strong> Insurance policy contracts are issued directly between the policyholder and the underwriting insurance company. Hardware purchase, warranty, SIM connectivity, and cloud software services are subject to separate end-user technology agreements with Alxsure Tech Hub (OPC) Pvt. Ltd.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 4: Role & Limits in Claims */}
            <div className="bg-white rounded-3xl border border-ink/10 p-8 shadow-xs">
              <div className="flex items-center gap-3 text-brand font-bold text-xs uppercase tracking-wider mb-2">
                <Shield className="w-4 h-4" /> Section 04
              </div>
              <h2 className="text-2xl font-extrabold text-night">Underwriting &amp; Claim Settlement Boundaries</h2>
              <div className="mt-4 space-y-3.5 text-sm sm:text-base">
                <p>
                  Insure Audit Expert does not underwrite risk, issue policies, or settle claims. Risk assessment, policy terms, endorsement acceptance, and claim settlement are the sole legal responsibility and statutory discretion of the respective IRDAI-registered insurance underwriters.
                </p>
                <p>
                  <strong>Dashcam Evidence Role:</strong> While AI Dashcam footage and G-sensor telemetry provide objective, speed-stamped, and tamper-resistant supporting records of an incident, such footage serves as <em>supporting evidence for surveyor assessment</em>. Submission of dashcam evidence does not guarantee or determine claim approval by the insurer.
                </p>
              </div>
            </div>

            {/* Section 5: Software Application */}
            <div className="bg-white rounded-3xl border border-ink/10 p-8 shadow-xs">
              <div className="flex items-center gap-3 text-brand font-bold text-xs uppercase tracking-wider mb-2">
                <FileText className="w-4 h-4" /> Section 05
              </div>
              <h2 className="text-2xl font-extrabold text-night">Insure Track App &amp; Software Infrastructure</h2>
              <div className="mt-4 space-y-3.5 text-sm sm:text-base">
                <p>
                  Our proprietary fleet management and live vehicle tracking application, <strong>Insure Track</strong> (available on Google Play Store and Apple App Store), is maintained in partnership with <strong>LustreX Technologies</strong>, who provides cloud server infrastructure, technical maintenance, and ongoing API connectivity.
                </p>
                <p>
                  App users must adhere to authorized fleet tracking guidelines and privacy protocols. Telematics data is processed in accordance with our <Link to="/privacy-policy" className="text-brand font-semibold hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </div>

            {/* Section 6: Jurisdiction */}
            <div className="bg-white rounded-3xl border border-ink/10 p-8 shadow-xs">
              <div className="flex items-center gap-3 text-brand font-bold text-xs uppercase tracking-wider mb-2">
                <Scale className="w-4 h-4" /> Section 06
              </div>
              <h2 className="text-2xl font-extrabold text-night">Governing Law &amp; Jurisdiction</h2>
              <div className="mt-4 space-y-3 text-sm sm:text-base">
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of India, including the Insurance Act, 1938, the IRDAI Act, 1999, and the Information Technology Act, 2000.
                </p>
                <p>
                  Any disputes or controversies arising out of or related to these terms shall be subject to the exclusive jurisdiction of the competent courts of law situated in <strong>New Delhi, India</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Summary Card */}
            <div className="bg-cloud/60 rounded-3xl border border-ink/10 p-6 space-y-4">
              <h3 className="font-extrabold text-night text-base uppercase tracking-wider">Compliance Highlights</h3>
              <ul className="space-y-3 text-xs sm:text-[13px] text-ink/75">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span>Authorized POSP Partner (PBPartners)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span>POS Code: IP461548</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span>Section 41 Anti-Rebate Strict Adherence</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span>Standard IRDAI Filed Rates Only</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span>Independent Telematics Hardware Billing</span>
                </li>
              </ul>
            </div>

            {/* Contact Card */}
            <div className="bg-night text-white rounded-3xl p-6 space-y-4">
              <h3 className="font-bold text-accent-yellow text-sm uppercase tracking-wider">Official Inquiries</h3>
              <div className="space-y-3 text-xs sm:text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand shrink-0" />
                  <a href="tel:7042733002" className="hover:text-white transition">
                    7042733002 / 7042733005
                  </a>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-4 h-4 text-brand shrink-0" />
                  <span>Helpline: 08065604804 / 08065604805</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand shrink-0" />
                  <a href="mailto:info@insureauditexpert.com" className="hover:text-white transition">
                    info@insureauditexpert.com
                  </a>
                </div>
                <div className="flex items-start gap-2 pt-2 border-t border-white/10">
                  <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span>B-5/55, Safdarjung Enclave, New Delhi - 110029</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/grievance-redressal"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold text-xs py-2.5 rounded-xl transition"
                >
                  Grievance Redressal Mechanism <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
