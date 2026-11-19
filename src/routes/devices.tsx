import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Camera,
  Radio,
  Lock,
  Thermometer,
  Fuel,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Phone,
  MessageCircle,
} from "lucide-react";
import { PageShell } from "@/components/site-shell";
import { openDeviceEnquiryModal } from "@/components/device-enquiry-dialog";
import { Reveal, Tilt, Magnetic } from "@/lib/motion";
import { BlueprintField, DrawUnderline, Spotlight } from "@/components/graphics";
import { DeviceInspector } from "@/components/interactive-showcase";

export const Route = createFileRoute("/devices")({
  validateSearch: (search: Record<string, unknown>): { device?: string } => ({
    device: typeof search.device === "string" ? search.device : "all",
  }),
  head: () => ({
    meta: [
      { title: "Vehicle Safety Devices & Telematics Hardware | Insure Audit Expert" },
      {
        name: "description",
        content:
          "Enquire independently about vehicle safety hardware: Dashcams, AIS-140 GPS devices, E-Locks, Cold Chain Heat Sensors, Fuel Rod Sensors, and GPS ID Cards. Transparent enquiry-based pricing.",
      },
      {
        name: "keywords",
        content:
          "dashcam India, AIS-140 GPS devices, smart e-lock cargo, fuel level rod sensors, cold chain temperature sensors, GPS ID cards, standalone vehicle hardware",
      },
    ],
  }),
  component: DevicesPage,
});

const DEVICE_CATALOG = [
  {
    id: "dashcam",
    name: "AI Dashcams",
    categoryKey: "Dashcams",
    icon: Camera,
    badge: "Accident Video Evidence",
    desc: "Forward-facing and dual-channel high-definition cameras with built-in G-sensor collision locking to safeguard video proof during road accidents and traffic disputes.",
    keyPoints: [
      "Objective collision footage for surveyor assessment",
      "Available as an independent technology add-on or purchased standalone from Alxsure Tech Hub",
      "Applicable software subscription & SIM connectivity apply for cloud backups and live viewing",
      "Zero wire-cutting installation preserving manufacturer vehicle warranty",
    ],
  },
  {
    id: "ais-140",
    name: "AIS-140 GPS Devices",
    categoryKey: "AIS-140 GPS Devices",
    icon: Radio,
    badge: "Government Mandated Telematics",
    desc: "Ministry of Road Transport & Highways (MoRTH) compliant vehicle location tracking device (VLTD) with emergency panic button integration.",
    keyPoints: [
      "Standalone regulatory device offering — NOT an insurance combination",
      "Emergency panic button with dual IP server connectivity",
      "Internal battery backup supporting continuous location reporting during power disconnect",
      "Subject to applicable telematics software platform & certified M2M eSIM subscription",
    ],
  },
  {
    id: "e-lock",
    name: "Smart E-Locks",
    categoryKey: "E-Locks",
    icon: Lock,
    badge: "Cargo & Container Security",
    desc: "Heavy-duty electronic smart padlock with remote GPS tracking and tamper alarms, engineered to secure container doors and logistics trucks during transit.",
    keyPoints: [
      "Authorized geofenced remote unlock and RFID card access",
      "Instant real-time alert on unauthorized cutting or tampering attempt",
      "Ruggedized weather-resistant IP67 casing suitable for long-haul routes",
      "Enquiry-based volume pricing; software platform subscription required",
    ],
  },
  {
    id: "heat-sensor",
    name: "Cold Chain Heat Sensors",
    categoryKey: "Heat Sensors",
    icon: Thermometer,
    badge: "Temperature & Perishables",
    desc: "Wireless BLE and wired temperature logging sensors engineered for refrigerated trucks, pharmaceutical logistics, and dairy supply chains.",
    keyPoints: [
      "Continuous cold-chain temperature telemetry with excursion alerts",
      "Proof of temperature compliance logs for quality audits & delivery handovers",
      "Integrates directly with the centralized Fleet Command Center",
      "Enquiry-based pricing; active telematics subscription required",
    ],
  },
  {
    id: "fuel-sensor",
    name: "Fuel Rod Level Sensors",
    categoryKey: "Fuel Rod Sensors",
    icon: Fuel,
    badge: "Pilferage Detection",
    desc: "High-precision capacitive fuel level sensor rods installed directly into commercial vehicle diesel tanks to record exact consumption and fuel theft.",
    keyPoints: [
      "Instant alert when rapid fuel level drop (theft/pilferage) is detected",
      "Accurate refueling volume timestamps matched with fuel station receipts",
      "Reduces unauthorized fuel drainage across long-haul transport routes",
      "Hardware and installation priced by tank depth; platform subscription applies",
    ],
  },
  {
    id: "gps-id-card",
    name: "GPS ID Cards",
    categoryKey: "GPS ID Cards",
    icon: CreditCard,
    badge: "Personnel & Child Safety",
    desc: "Slim, lightweight badge-style wearable GPS trackers for school children, security guards, delivery personnel, and warehouse workforce.",
    keyPoints: [
      "Built-in SOS emergency panic button triggers immediate SMS and calling",
      "Real-time location reporting and geofenced safe-zone alerts",
      "Compact card format worn comfortably with standard lanyards",
      "Enquiry-based pricing; periodic connectivity subscription required",
    ],
  },
];

function DevicesPage() {
  const { device: filterDevice = "all" } = Route.useSearch();
  const [activeFilter, setActiveFilter] = useState(filterDevice);

  const displayedDevices =
    activeFilter === "all"
      ? DEVICE_CATALOG
      : DEVICE_CATALOG.filter((d) => d.id === activeFilter);

  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-soft/70 via-white to-cloud/30 py-16 lg:py-20 border-b border-ink/8 relative overflow-hidden">
        <BlueprintField tone="light" />
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <Reveal variant="up">
              <div className="inline-flex items-center gap-2 bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                <Sparkles className="w-4 h-4" /> Standalone Telematics &amp; Safety Hardware
              </div>
              <h1 className="text-[34px] sm:text-[48px] font-extrabold text-night leading-[1.1]">
                Vehicle Safety &amp; <DrawUnderline color="var(--brand)"><span className="text-brand">Tracking Hardware</span></DrawUnderline>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-ink/75 leading-relaxed">
                Explore our six specialized hardware devices. All devices can be enquired and purchased independently without buying insurance. Hardware pricing is enquiry-based; applicable software platform subscriptions and SIM connectivity charges apply where disclosed.
              </p>
            </Reveal>
          </div>

          {/* Important Disclosures Banner */}
          <Reveal variant="up" delay={100}>
            <div className="mt-8 bg-white border border-ink/10 rounded-2xl p-5 shadow-xs flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-[13px] text-ink/80 leading-relaxed">
                <strong className="text-night font-bold">Important Offer &amp; Compliance Clarification:</strong>
                <p className="mt-1">
                  • <strong>AIS-140 GPS is a standalone offering</strong> and is <strong>NOT</strong> an insurance combination product.
                  <br />
                  • <strong>Enquiry-Based Pricing:</strong> Hardware unit prices depend on fleet quantity, installation requirements, and vehicle specifications.
                  <br />
                  • <strong>Dashcam Evidentiary Role:</strong> Dashcams record supporting video evidence during accident investigations. They assist in proving facts, but do not imply or guarantee claim settlement by the insurance underwriter.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive 360° Exploded Device Inspector (Apple/Stripe Benchmark) */}
      <section className="py-12 bg-white border-b border-ink/8">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="up">
            <DeviceInspector />
          </Reveal>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-cloud/50 border-b border-ink/8 sticky top-[72px] z-30 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeFilter === "all"
                  ? "bg-night text-white"
                  : "bg-white text-ink/70 hover:bg-cloud border border-ink/10"
              }`}
            >
              All 6 Devices
            </button>
            {DEVICE_CATALOG.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveFilter(d.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeFilter === d.id
                    ? "bg-brand text-white"
                    : "bg-white text-ink/70 hover:bg-cloud border border-ink/10"
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>
          <Magnetic strength={0.3}>
            <button
              type="button"
              onClick={() => openDeviceEnquiryModal()}
              className="hidden sm:inline-flex items-center gap-1.5 bg-brand hover:bg-brand-deep text-white text-xs font-bold px-4 py-2 rounded-xl transition shrink-0 cursor-pointer shadow-xs"
            >
              Enquire Any Device →
            </button>
          </Magnetic>
        </div>
      </section>

      {/* Device Cards Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedDevices.map((d, i) => (
              <Reveal key={d.id} variant="scale" delay={i * 80}>
                <Tilt max={6}>
                  <Spotlight className="h-full rounded-3xl">
                    <div className="lift bg-white rounded-3xl border border-ink/10 p-7 shadow-xs flex flex-col justify-between h-full hover:border-brand/30 transition">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand grid place-items-center shadow-2xs">
                            <d.icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10.5px] font-extrabold uppercase tracking-wider bg-cloud text-ink/70 px-2.5 py-1 rounded-full border border-ink/8">
                            {d.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-night">{d.name}</h3>
                        <p className="mt-2 text-xs text-ink/75 leading-relaxed">{d.desc}</p>

                        <div className="mt-5 space-y-2 text-xs text-ink/80 pt-4 border-t border-ink/8">
                          {d.keyPoints.map((pt, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                              <span className="leading-snug">{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-7 pt-5 border-t border-ink/8 flex items-center justify-between gap-2">
                        <span className="text-[11.5px] font-bold text-ink/50">Custom Quote / Volume</span>
                        <Magnetic strength={0.3}>
                          <button
                            type="button"
                            onClick={() => openDeviceEnquiryModal({ device: d.categoryKey })}
                            className="bg-brand hover:bg-brand-deep text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                          >
                            Enquire Now →
                          </button>
                        </Magnetic>
                      </div>
                    </div>
                  </Spotlight>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
