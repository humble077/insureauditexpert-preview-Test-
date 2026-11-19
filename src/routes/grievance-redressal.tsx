import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Building2,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  FileText,
  Scale,
  CheckCircle2,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";

const SITE_URL = "https://audacious-audit-spark.lovable.app";

export const Route = createFileRoute("/grievance-redressal")({
  head: () => ({
    meta: [
      {
        title: "Grievance Redressal Policy & Escalation Matrix | Insure Audit Expert",
      },
      {
        name: "description",
        content:
          "Official Grievance Redressal mechanism for Insure Audit Expert customers. Multi-tier escalation path including POSP desk, PBPartners broker grievance officer, IRDAI Bima Bharosa, and Insurance Ombudsman.",
      },
      {
        name: "keywords",
        content:
          "Insure Audit Expert grievance redressal, IRDAI complaint escalation, Bima Bharosa portal, insurance ombudsman Delhi, PBPartners grievance officer, policyholder complaint",
      },
      {
        property: "og:title",
        content: "Grievance Redressal Mechanism — Insure Audit Expert",
      },
      {
        property: "og:description",
        content:
          "Transparent, multi-tier policyholder grievance escalation matrix aligned with IRDAI Protection of Policyholders' Interests regulations.",
      },
      { property: "og:url", content: `${SITE_URL}/grievance-redressal` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/grievance-redressal` }],
  }),
  component: GrievanceRedressalPage,
});

function GrievanceRedressalPage() {
  return (
    <PageShell>
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-soft/60 via-paper to-paper pt-12 pb-16 border-b border-ink/8">
        <div className="max-w-[1240px] mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-ink/60 mb-6">
            <Link to="/" className="hover:text-brand transition">
              Home
            </Link>
            <span className="text-ink/30">/</span>
            <span className="text-brand font-bold">Grievance Redressal</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white border border-brand/20 text-brand text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-2xs mb-4">
              <Scale className="w-3.5 h-3.5" /> IRDAI Aligned Consumer Protection
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-night leading-tight tracking-tight">
              Grievance Redressal Mechanism
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ink/75 leading-relaxed">
              At <strong>Insure Audit Expert</strong>, policyholder satisfaction and regulatory integrity are our utmost priorities. We maintain a structured, multi-tier escalation mechanism in full compliance with the <strong>Insurance Regulatory and Development Authority of India (IRDAI)</strong> guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Tiers */}
      <section className="py-16 bg-paper">
        <div className="max-w-[1240px] mx-auto px-6 grid lg:grid-cols-12 gap-12">
          {/* Main 4-Tier Escalation Path */}
          <div className="lg:col-span-8 space-y-8">
            <div className="border-b border-ink/10 pb-4">
              <h2 className="text-2xl font-extrabold text-night">4-Tier Resolution Escalation Matrix</h2>
              <p className="mt-1 text-sm text-ink/65">
                If you have an inquiry, feedback, or grievance regarding insurance solicitation, service assistance, or telematics hardware, please follow the structured hierarchy below:
              </p>
            </div>

            {/* Level 1: Internal Customer Care Desk */}
            <div className="bg-white rounded-3xl border-2 border-brand/30 p-7 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block bg-brand text-white text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full">
                  Level 01 · First Response
                </span>
                <span className="text-xs font-semibold text-brand flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> SLA: Acknowledgement in 24 hrs
                </span>
              </div>
              <h3 className="text-xl font-bold text-night">Insure Audit Expert Customer Care Desk</h3>
              <p className="mt-2 text-sm text-ink/75 leading-relaxed">
                For prompt resolution of any service queries, policy documentation assistance, or hardware support, reach out to our dedicated frontline customer care team:
              </p>
              <div className="mt-5 grid sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-cloud/50 border border-ink/8 space-y-1.5">
                  <span className="text-ink/50 text-[11px] font-bold uppercase tracking-wider block">Primary Business Phone</span>
                  <a href="tel:7042733002" className="font-extrabold text-night hover:text-brand transition block text-sm">
                    7042733002 / 7042733005
                  </a>
                  <span className="text-ink/60 text-xs block">Helpline: 08065604804</span>
                </div>
                <div className="p-4 rounded-2xl bg-cloud/50 border border-ink/8 space-y-1.5">
                  <span className="text-ink/50 text-[11px] font-bold uppercase tracking-wider block">Official Support Email</span>
                  <a href="mailto:info@insureauditexpert.com" className="font-extrabold text-brand hover:underline block text-sm">
                    info@insureauditexpert.com
                  </a>
                  <span className="text-ink/60 text-xs block">Grievance Desk: grievance@insureauditexpert.com</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-ink/60">
                Operating Hours: Monday to Saturday, 9:30 AM to 6:30 PM (Except National Holidays).
              </p>
            </div>

            {/* Level 2: Licensed Broker Partner Grievance Officer */}
            <div className="bg-white rounded-3xl border border-ink/10 p-7 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block bg-cloud text-ink/70 border border-ink/10 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full">
                  Level 02 · Broker Escalation
                </span>
                <span className="text-xs font-semibold text-ink/50 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> SLA: Resolution in 7-14 Days
                </span>
              </div>
              <h3 className="text-xl font-bold text-night">Principal Broker: PBPartners Grievance Cell</h3>
              <p className="mt-2 text-sm text-ink/75 leading-relaxed">
                If your grievance regarding policy issuance, quotation accuracy, or insurance solicitation is not resolved satisfactorily at Level 1 within 7 business days, you may escalate to our licensed principal broker:
              </p>
              <div className="mt-4 p-5 rounded-2xl bg-cloud/40 border border-ink/8 space-y-2 text-xs sm:text-sm">
                <div className="font-bold text-night">Policybazaar Insurance Brokers Private Limited (PBPartners)</div>
                <div className="text-ink/70">IRDAI Broker License No. 742 · Direct Broker (Life &amp; General)</div>
                <div className="text-ink/70">Authorized Channel Partner POS Code: <strong className="text-night font-mono">IP461548</strong></div>
                <div className="pt-2 text-ink/70">
                  PBPartners Grievance Email: <a href="mailto:grievance@pbpartners.com" className="text-brand font-semibold hover:underline">grievance@pbpartners.com</a> / <a href="mailto:care@pbpartners.com" className="text-brand font-semibold hover:underline">care@pbpartners.com</a>
                </div>
              </div>
            </div>

            {/* Level 3: Insurer GRO & IRDAI Bima Bharosa */}
            <div className="bg-white rounded-3xl border border-ink/10 p-7 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block bg-cloud text-ink/70 border border-ink/10 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full">
                  Level 03 · Regulatory Escalation
                </span>
                <span className="text-xs font-semibold text-amber-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> IRDAI Statutory Portal
                </span>
              </div>
              <h3 className="text-xl font-bold text-night">Insurer Grievance Officer &amp; IRDAI Bima Bharosa</h3>
              <p className="mt-2 text-sm text-ink/75 leading-relaxed">
                Underwriting decisions, policy terms, and claim repudiations are under the direct statutory authority of the underwriting insurance company. Every insurer has an appointed Grievance Redressal Officer (GRO).
              </p>
              <div className="mt-4 p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3 text-xs sm:text-sm text-amber-950">
                <div className="font-bold text-amber-900 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-amber-700" /> IRDAI Bima Bharosa (Integrated Grievance Management System)
                </div>
                <p>
                  If a grievance is not resolved by the insurer or broker within 15 days, policyholders can register their complaint directly with the regulator through the online <strong>Bima Bharosa Portal</strong>:
                </p>
                <div className="space-y-1">
                  <div><strong>Portal:</strong> <a href="https://bimabharosa.irdai.gov.in" target="_blank" rel="noreferrer" className="text-brand font-bold hover:underline">https://bimabharosa.irdai.gov.in ↗</a></div>
                  <div><strong>IRDAI Toll-Free Helpline:</strong> 155255 / 1800 4254 732</div>
                  <div><strong>IRDAI Email:</strong> complaints@irdai.gov.in</div>
                </div>
              </div>
            </div>

            {/* Level 4: Insurance Ombudsman */}
            <div className="bg-white rounded-3xl border border-ink/10 p-7 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block bg-cloud text-ink/70 border border-ink/10 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full">
                  Level 04 · Quasi-Judicial
                </span>
                <span className="text-xs font-semibold text-ink/50">Insurance Ombudsman Rules, 2017</span>
              </div>
              <h3 className="text-xl font-bold text-night">Office of the Insurance Ombudsman</h3>
              <p className="mt-2 text-sm text-ink/75 leading-relaxed">
                Under the Insurance Ombudsman Rules 2017, the Ombudsman provides an independent, cost-free, and expeditious forum for resolving disputes regarding:
              </p>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm text-ink/75 list-disc list-inside">
                <li>Total or partial repudiation of claims by an insurer</li>
                <li>Disputes over premium paid or payable in terms of the policy contract</li>
                <li>Misrepresentation of policy terms and conditions in policy document</li>
                <li>Delay in settlement of claims beyond the stipulated timeline</li>
                <li>Non-issuance of insurance policy document after receipt of premium</li>
              </ul>
              <div className="mt-4 p-4 rounded-2xl bg-cloud/50 border border-ink/8 text-xs text-ink/70">
                <strong>Delhi Ombudsman Office:</strong> 2/2 A, Universal Insurance Building, Asaf Ali Road, New Delhi - 110002 · Email: <a href="mailto:bimalokpal.delhi@cioins.co.in" className="text-brand hover:underline">bimalokpal.delhi@cioins.co.in</a>. Policyholders may approach the Ombudsman within one year from the date of receipt of the decision of the insurer.
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-ink/10 p-6 shadow-xs space-y-4">
              <h3 className="font-extrabold text-night text-base">Register a Grievance</h3>
              <p className="text-xs text-ink/70 leading-relaxed">
                Please quote your Policy Number, Vehicle Registration, or Order ID when contacting our grievance desk.
              </p>
              <div className="space-y-3 pt-2 border-t border-ink/8 text-xs sm:text-sm">
                <div>
                  <span className="text-[11px] font-bold uppercase text-ink/50 block">Customer Helpline</span>
                  <a href="tel:7042733002" className="font-bold text-night hover:text-brand">
                    7042733002 / 7042733005
                  </a>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-ink/50 block">Grievance Desk Email</span>
                  <a href="mailto:info@insureauditexpert.com" className="font-bold text-brand hover:underline">
                    info@insureauditexpert.com
                  </a>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-ink/50 block">Corporate Office</span>
                  <span className="text-ink/80 text-xs">
                    B-5/55, Safdarjung Enclave, New Delhi - 110029
                  </span>
                </div>
              </div>
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand text-white font-bold text-xs py-3 rounded-xl hover:bg-brand-deep transition mt-2"
              >
                Submit Written Grievance Online →
              </Link>
            </div>

            <div className="bg-night text-white rounded-3xl p-6 space-y-4">
              <h4 className="font-bold text-accent-yellow text-xs uppercase tracking-wider">Statutory Transparency</h4>
              <p className="text-xs text-white/75 leading-relaxed">
                All insurance policies arranged through our platform follow strict IRDAI regulations. No rebates or premium discounts are offered in compliance with Section 41 of the Insurance Act, 1938. Telematics devices are sold independently by Alxsure Tech Hub (OPC) Pvt. Ltd.
              </p>
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2 text-xs">
                <Link to="/privacy-policy" className="text-accent-yellow hover:underline">
                  Privacy Policy &amp; Data Rights →
                </Link>
                <Link to="/terms-and-conditions" className="text-accent-yellow hover:underline">
                  Terms &amp; Conditions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
