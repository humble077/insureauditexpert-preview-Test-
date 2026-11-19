import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Car,
  Bike,
  Truck,
  Bus,
  ShieldCheck,
  Camera,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Lock,
  Phone,
  MessageCircle,
  FileSearch,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { openQuoteModal } from "@/components/quote-dialog";
import { openDeviceEnquiryModal } from "@/components/device-enquiry-dialog";
import { Reveal, Tilt, Magnetic, SplitText } from "@/lib/motion";
import { BlueprintField, DrawUnderline, Spotlight } from "@/components/graphics";

export const Route = createFileRoute("/motor-insurance")({
  validateSearch: (search: Record<string, unknown>): { tab?: string } => ({
    tab: typeof search.tab === "string" ? search.tab : "private-car",
  }),
  head: () => ({
    meta: [
      { title: "Motor Insurance Solutions | Car, Bike, GCV & Fleet — Insure Audit Expert" },
      {
        name: "description",
        content:
          "Compare and buy motor insurance for private cars, bikes, commercial vehicles, trucks, taxis, school buses, and pickups at standard IRDAI rates. Choose between standard IRDAI policies or our policy with optional independent telemetry add-on.",
      },
      {
        name: "keywords",
        content:
          "motor insurance India, car insurance Policybazaar, commercial vehicle insurance, bike insurance instant quote, truck insurance, school bus passenger liability, policy independent telemetry add-on, vehicle safety dashcam",
      },
    ],
  }),
  component: MotorInsurancePage,
});

const TABS = [
  { id: "private-car", label: "Private Cars", icon: Car, pb: true },
  { id: "bike", label: "Bikes / 2-Wheelers", icon: Bike, pb: true },
  { id: "commercial-vehicle", label: "Commercial (GCV)", icon: Truck, pb: true },
  { id: "truck", label: "Heavy Trucks", icon: Truck, pb: true },
  { id: "auto-taxi", label: "Auto & Taxi / Cabs", icon: Car, pb: false },
  { id: "school-bus", label: "School Buses (PCV)", icon: Bus, pb: false },
  { id: "tempo-pickup", label: "Tempos & Pickups", icon: Truck, pb: true },
  { id: "with-dashcam", label: "Option A: Policy & Telemetry", icon: Camera, special: true },
  { id: "standard", label: "Option B: Standard Motor", icon: ShieldCheck },
];

function MotorInsurancePage() {
  const { tab: activeTab = "private-car" } = Route.useSearch();
  const [selectedTab, setSelectedTab] = useState(activeTab);

  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-soft/80 via-white to-cloud/30 py-16 lg:py-20 border-b border-ink/8 relative overflow-hidden">
        <BlueprintField tone="light" />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <Reveal variant="up">
              <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                <ShieldCheck className="w-4 h-4" /> IRDAI Standard Rates · Authorized POSP Partner (PBPartners POS: IP461548)
              </div>
              <h1 className="text-[34px] sm:text-[48px] font-extrabold text-night leading-[1.1]">
                <SplitText text="Motor Insurance Audited for" delay={40} stagger={22} className="block" />
                <DrawUnderline color="var(--brand)">
                  <span className="text-brand inline-block">
                    <SplitText text="Real Protection" delay={340} stagger={22} />
                  </span>
                </DrawUnderline>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-ink/75 leading-relaxed">
                Explore verified motor insurance plans across private cars, two-wheelers, commercial goods carriers, trucks, taxis, and school buses. Choose between our standard IRDAI motor policy or our policy with optional independent telemetry add-on.
              </p>
            </Reveal>
          </div>

          {/* Offer Comparison Highlight (Option A vs Option B) */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* Option A: Policy & Independent Technology Add-On */}
            <Reveal variant="left">
              <Tilt max={5}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="spin-border lift bg-white rounded-3xl border-2 border-brand/40 p-7 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
                    <div>
                      <div className="inline-block bg-accent-yellow/20 text-night text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
                        Option A · Policy &amp; Independent Technology Add-On
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand text-white grid place-items-center shadow-xs">
                          <Camera className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-night">Standard IRDAI Insurance with Optional Alxsure Tech Hub Telemetry</h3>
                          <span className="text-xs text-brand font-bold">Independent Hardware &amp; Telemetry Integration</span>
                        </div>
                      </div>
                      <p className="text-sm text-ink/75 leading-relaxed">
                        Purchase your motor insurance policy at standard IRDAI-approved rates through our licensed partner PBPartners. Separately, you can opt for AI Dashcams and vehicle telematics hardware offered independently by Alxsure Tech Hub (OPC) Pvt Ltd.
                      </p>
                      <ul className="mt-4 space-y-2.5 text-xs text-ink/80">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                          <span><strong>Insurance Sourcing:</strong> Policies are issued at standard IRDAI-approved rates through PBPartners (Policybazaar Insurance Brokers Pvt Ltd), with no unauthorized rebates or premium discounts.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                          <span><strong>Independent Hardware &amp; Subscription:</strong> AI Dashcams, GPS/AIS-140 devices, and telematics subscriptions are separate technology offerings provided by Alxsure Tech Hub (OPC) Pvt Ltd under independent commercial terms.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                          <span><strong>Objective Evidence Support:</strong> Dashcam G-sensor footage serves as objective supporting material during surveyor inspection and does not guarantee or determine claim approval by the insurer.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6 pt-5 border-t border-ink/8 flex items-center justify-between">
                      <span className="text-xs font-semibold text-ink/50">*IRDAI &amp; Section 41 Compliant</span>
                      <Magnetic strength={0.3}>
                        <button
                          type="button"
                          onClick={() => openQuoteModal({ category: "car" })}
                          className="sheen bg-brand hover:bg-brand-deep text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer inline-flex items-center gap-1.5 shadow-md"
                        >
                          Check Eligibility &amp; Quote →
                        </button>
                      </Magnetic>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>

            {/* Option B: Standard Motor Insurance */}
            <Reveal variant="right" delay={100}>
              <Tilt max={5}>
                <Spotlight className="h-full rounded-3xl">
                  <div className="lift bg-white rounded-3xl border border-ink/10 p-7 shadow-xs flex flex-col justify-between h-full hover:border-ink/20 transition">
                    <div>
                      <div className="inline-block bg-cloud text-ink/70 border border-ink/10 text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
                        Option B · Pure Policy
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-night text-white grid place-items-center shadow-xs">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-night">Option B: Standard Motor Insurance</h3>
                          <span className="text-xs text-ink/60 font-semibold">Pure Insurance Protection at Standard Rates</span>
                        </div>
                      </div>
                      <p className="text-sm text-ink/75 leading-relaxed">
                        Standard comprehensive, third-party, and own-damage policies across 20+ insurers without bundled hardware devices.
                      </p>
                      <ul className="mt-4 space-y-2.5 text-xs text-ink/80">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-night shrink-0 mt-0.5" />
                          <span><strong>Standard IRDAI Rates:</strong> Exact filed rates across licensed distribution partner PBPartners.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-night shrink-0 mt-0.5" />
                          <span><strong>No Hardware Bundled:</strong> Pure insurance policy for vehicle owners who already have cameras or do not require telematics.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-night shrink-0 mt-0.5" />
                          <span><strong>Independent Audit:</strong> Free policy review of IDV, zero-dep clauses, and NCB validity.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6 pt-5 border-t border-ink/8 flex items-center justify-between">
                      <span className="text-xs font-semibold text-ink/50">Instant online comparison</span>
                      <Magnetic strength={0.3}>
                        <button
                          type="button"
                          onClick={() => openQuoteModal({ category: "car" })}
                          className="bg-night hover:bg-brand text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                        >
                          Get Standard Quote →
                        </button>
                      </Magnetic>
                    </div>
                  </div>
                </Spotlight>
              </Tilt>
            </Reveal>
          </div>

          {/* Important Disclaimers Banner */}
          <div className="mt-6 bg-accent-yellow/15 border border-accent-yellow/40 rounded-2xl p-4 text-xs text-ink/80 leading-relaxed flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Regulatory Notice:</strong> AIS-140 GPS and telematics hardware are separate offerings from insurance policies. All insurance policies follow standard IRDAI-approved rates without unauthorized rebates or inducements (Section 41, Insurance Act 1938). Dashcams provide objective video evidence during assessment and dispute resolution, but do not imply or guarantee claim approval by the underwriter. All insurance products are underwritten by IRDAI-registered insurance companies.
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Category Tabs */}
      <section className="py-14 bg-white" id="categories">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-night">
                Select Your Vehicle Category
              </h2>
              <p className="mt-2 text-sm text-ink/65">
                Instant PBPartners quotes are available for Private Cars, Bikes, and Commercial GCV. Passenger vehicles and heavy commercial fleets use our assisted quote desk.
              </p>
            </div>
          </Reveal>

          {/* Tabs Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  selectedTab === t.id
                    ? "bg-brand text-white shadow-sm"
                    : "bg-cloud text-ink/70 hover:bg-cloud/80 hover:text-night"
                }`}
              >
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </div>

          {/* Tab Details */}
          <Reveal variant="up" delay={80}>
            <div className="bg-cloud/40 rounded-3xl border border-ink/8 p-8 max-w-4xl mx-auto shadow-sm">
              {selectedTab === "private-car" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-2xl font-bold text-night">Private Car Insurance</h3>
                    <span className="bg-brand-soft text-brand text-xs font-bold px-3 py-1 rounded-full">
                      Instant Policybazaar Comparison (20+ Insurers)
                    </span>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed">
                    Comprehensive coverage protecting your hatchback, sedan, or SUV against accidental damage, theft, fire, and third-party liabilities. Correct IDV calculation prevents under-insurance penalties during total loss claims.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs text-ink/80 pt-2">
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Zero Depreciation &amp; Engine Protect Add-ons</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ No Claim Bonus (NCB) Retention Protection</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Cashless Garage Network Pan-India</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Optional Alxsure Telemetry Add-On</div>
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <Magnetic strength={0.3}>
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "car" })}
                        className="bg-brand hover:bg-brand-deep text-white font-bold text-sm px-6 py-3 rounded-xl transition cursor-pointer inline-flex items-center gap-2 shadow-xs"
                      >
                        Get Instant Car Quote <ExternalLink className="w-4 h-4" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
              )}

              {selectedTab === "bike" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-2xl font-bold text-night">Two-Wheeler &amp; Bike Insurance</h3>
                    <span className="bg-brand-soft text-brand text-xs font-bold px-3 py-1 rounded-full">
                      Instant Policybazaar Issuance in 2 Minutes
                    </span>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed">
                    Protect your motorcycle, scooter, or superbike with instant renewal and comprehensive coverage. Zero inspection required for timely renewals.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs text-ink/80 pt-2">
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Comprehensive &amp; Standalone Own-Damage</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Mandatory ₹15 Lakh Personal Accident Cover</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Instant Policy Copy PDF on WhatsApp &amp; Email</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Third-Party Liability Up to Statutory Limit</div>
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <Magnetic strength={0.3}>
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "bike" })}
                        className="bg-brand hover:bg-brand-deep text-white font-bold text-sm px-6 py-3 rounded-xl transition cursor-pointer inline-flex items-center gap-2 shadow-xs"
                      >
                        Get Instant Bike Quote <ExternalLink className="w-4 h-4" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
              )}

              {selectedTab === "commercial-vehicle" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-2xl font-bold text-night">Commercial Goods Carrier (GCV)</h3>
                    <span className="bg-brand-soft text-brand text-xs font-bold px-3 py-1 rounded-full">
                      Instant PBPartners GCV Portal
                    </span>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed">
                    Goods carrying vehicles rated accurately by Gross Vehicle Weight (GVW), carrying capacity, and territorial permit limits. Includes IMT-23 liability and paid-driver protection.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs text-ink/80 pt-2">
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Light Commercial Vehicles (LCV) &amp; Heavy Goods</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Third-Party Property Damage (TPPD) Statutory Cover</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ IMT-23 Inclusions for Accidental Lamp/Tire Damage</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Direct Policybazaar Commercial Engine</div>
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <Magnetic strength={0.3}>
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "gcv" })}
                        className="bg-brand hover:bg-brand-deep text-white font-bold text-sm px-6 py-3 rounded-xl transition cursor-pointer inline-flex items-center gap-2 shadow-xs"
                      >
                        Get Instant GCV Quote <ExternalLink className="w-4 h-4" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
              )}

              {selectedTab === "truck" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-2xl font-bold text-night">Heavy Trucks &amp; Multi-Axle Vehicles</h3>
                    <span className="bg-brand-soft text-brand text-xs font-bold px-3 py-1 rounded-full">
                      Instant PBPartners GCV Portal
                    </span>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed">
                    Designed for 10-wheeler, 12-wheeler, 16-wheeler trucks, tippers, container haulers, and interstate logistics prime movers with national permit compliance.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs text-ink/80 pt-2">
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ National Permit Statutory Liability</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Overturning &amp; Transit Cargo Endorsements</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Fuel Rod &amp; GPS Telematics Integration Available</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Fast Policy Issuance on PBPartners</div>
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <Magnetic strength={0.3}>
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "gcv" })}
                        className="bg-brand hover:bg-brand-deep text-white font-bold text-sm px-6 py-3 rounded-xl transition cursor-pointer inline-flex items-center gap-2 shadow-xs"
                      >
                        Compare Truck Quotes <ExternalLink className="w-4 h-4" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
              )}

              {selectedTab === "auto-taxi" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-2xl font-bold text-night">Auto Rickshaw &amp; Taxi / Cab Fleet</h3>
                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                      Assisted Expert Quote Desk
                    </span>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed">
                    Passenger carrying commercial vehicles require statutory per-passenger legal liability, driver cover, and yellow-board commercial registration audits.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs text-ink/80 pt-2">
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Statutory Per-Passenger Seating Liability</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Aggregator (Ola/Uber) Compliant Cover</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Paid Driver &amp; Cleaner Liability Inclusions</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Dedicated Assisted Quote Formulation</div>
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <Magnetic strength={0.3}>
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "auto" })}
                        className="bg-night hover:bg-brand text-white font-bold text-sm px-6 py-3 rounded-xl transition cursor-pointer inline-flex items-center gap-2 shadow-xs"
                      >
                        Request Taxi Quote Proposal <ArrowRight className="w-4 h-4" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
              )}

              {selectedTab === "school-bus" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-2xl font-bold text-night">School Buses &amp; Passenger Carriers (PCV)</h3>
                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                      Institutional Compliance Desk
                    </span>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed">
                    School coaches, college staff buses, and intercity tourist buses require strict seating-capacity liabilities and mandatory AIS-140 compliance guidelines.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs text-ink/80 pt-2">
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ High Passenger Seating Capacity Liabilities</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ RTO School Bus Guidelines Compliance</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ AIS-140 Panic Button Telematics Available</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Institutional Billing &amp; Assisted Service</div>
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <Magnetic strength={0.3}>
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "bus" })}
                        className="bg-night hover:bg-brand text-white font-bold text-sm px-6 py-3 rounded-xl transition cursor-pointer inline-flex items-center gap-2 shadow-xs"
                      >
                        Request School Bus Quote <ArrowRight className="w-4 h-4" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
              )}

              {selectedTab === "tempo-pickup" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-2xl font-bold text-night">Four-Wheeler Tempos &amp; Pickups</h3>
                    <span className="bg-brand-soft text-brand text-xs font-bold px-3 py-1 rounded-full">
                      Instant Policybazaar GCV Portal
                    </span>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed">
                    Bolero Maxi Truck, Tata Ace (Chhota Hathi), Ashok Leyland Dost, and intra-city cargo pickups. Rated strictly by registered unladen/laden weights to avoid surveyor deductions.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs text-ink/80 pt-2">
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Accurate GVW Registration Sizing</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Paid Driver Legal Liability</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Instant Commercial Policy Comparison</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Quick Claims Coordination Support</div>
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <Magnetic strength={0.3}>
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "tempo" })}
                        className="bg-brand hover:bg-brand-deep text-white font-bold text-sm px-6 py-3 rounded-xl transition cursor-pointer inline-flex items-center gap-2 shadow-xs"
                      >
                        Get Pickup Quote <ExternalLink className="w-4 h-4" />
                      </button>
                    </Magnetic>
                  </div>
                </div>
              )}

              {selectedTab === "with-dashcam" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-2xl font-bold text-night">Option A: Policy &amp; Independent Telemetry Add-On</h3>
                    <span className="bg-accent-yellow/20 text-night text-xs font-bold px-3 py-1 rounded-full">
                      Independent Hardware &amp; Telemetry Integration
                    </span>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed">
                    Purchase your motor insurance policy at standard IRDAI-approved rates through our licensed partner PBPartners. Separately, you can opt for AI Dashcams and vehicle telematics hardware offered independently by Alxsure Tech Hub (OPC) Pvt Ltd under independent commercial terms.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs text-ink/80 pt-2">
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Policies Sourced at Standard IRDAI Filed Rates (No Rebates)</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ G-Sensor Collision Video Lock for Surveyor Evidence Support</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Zero Wire-Cutting Installation Preserves Vehicle Warranty</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Independent Hardware &amp; Telemetry Platform Invoicing</div>
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <Magnetic strength={0.3}>
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "car" })}
                        className="bg-brand hover:bg-brand-deep text-white font-bold text-sm px-6 py-3 rounded-xl transition cursor-pointer inline-flex items-center gap-2 shadow-xs"
                      >
                        Explore Policy &amp; Telemetry Options →
                      </button>
                    </Magnetic>
                  </div>
                </div>
              )}

              {selectedTab === "standard" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-2xl font-bold text-night">Standard Motor Insurance (No Bundled Hardware)</h3>
                    <span className="bg-cloud text-ink/70 text-xs font-bold px-3 py-1 rounded-full border border-ink/8">
                      Standard IRDAI Rates Across 20+ Insurers
                    </span>
                  </div>
                  <p className="text-sm text-ink/70 leading-relaxed">
                    Compare standard comprehensive and third-party insurance quotes with zero bundled hardware devices and zero recurring hardware subscriptions. Free independent policy audit of IDV and add-on riders.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs text-ink/80 pt-2">
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Pure Insurance Cover at IRDAI Approved Rates</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Zero Hardware Or Subscription Obligations</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ 20+ Insurers Compared Instantly on PBPartners</div>
                    <div className="bg-white p-3 rounded-xl border border-ink/6">✓ Expert Consultation on NCB and Deductibles</div>
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <Magnetic strength={0.3}>
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ category: "car" })}
                        className="bg-night hover:bg-brand text-white font-bold text-sm px-6 py-3 rounded-xl transition cursor-pointer inline-flex items-center gap-2 shadow-xs"
                      >
                        Compare Standard Motor Quotes →
                      </button>
                    </Magnetic>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
