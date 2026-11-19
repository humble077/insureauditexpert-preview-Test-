import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  ChevronUp,
  ChevronDown,
  Lock,
  Menu,
  X,
  Car,
  Bike,
  Truck,
  Bus,
  Shield,
  HeartPulse,
  Building2,
  Camera,
  Radio,
  Thermometer,
  Fuel,
  CreditCard,
  LayoutDashboard,
  ExternalLink,
  HelpCircle,
  FileSearch,
} from "lucide-react";
import { useState, useEffect, type ReactNode, useRef } from "react";
import { ScrollProgressBar, Magnetic, CursorGlow, useAutoReveal } from "@/lib/motion";
import { openQuoteModal } from "@/components/quote-dialog";
import { openDeviceEnquiryModal } from "@/components/device-enquiry-dialog";
import { openDemoRequestModal } from "@/components/demo-request-dialog";
import logoUrl from "@/assets/logo.png";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <CursorGlow />

      {/* Top Banner with Verified Contact & Disclaimers */}
      <div className="bg-night text-white text-[11.5px] sm:text-[12.5px] border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-2 flex flex-col xl:flex-row items-center justify-between gap-2 text-center xl:text-left">
          <div className="flex flex-wrap items-center justify-center xl:justify-start gap-2 text-white/85">
            <span className="inline-flex items-center gap-1.5 text-accent-yellow font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Authorized POSP Channel Partner under PBPartners (Policybazaar Insurance Brokers Pvt Ltd) | POS Code: IP461548
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-white/70">IRDAI Standard Rates · Section 41 Compliant</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <a
              href="tel:7042733002"
              className="inline-flex items-center gap-1 text-white/95 hover:text-white transition"
            >
              <Phone className="w-3 h-3 text-brand" /> 7042733002 / 7042733005
            </a>
            <span className="text-white/30 hidden sm:inline">·</span>
            <a
              href="tel:08065604804"
              className="inline-flex items-center gap-1 text-white/75 hover:text-white transition hidden md:inline-flex"
            >
              08065604804
            </a>
            <span className="text-white/30">·</span>
            <a
              href="https://wa.me/918700515288"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition font-bold"
            >
              <MessageCircle className="w-3 h-3" /> WhatsApp (+91 87005 15288)
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Main Navigation */}
      <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-ink/8 shadow-2xs">
        <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between gap-4" ref={dropdownRef}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src={logoUrl}
              alt="Insure Audit Expert"
              className="h-10 sm:h-11 w-auto transition-transform group-hover:scale-105"
            />
            <span className="hidden xl:block leading-tight">
              <span className="block text-[16px] font-extrabold text-night tracking-tight">
                Insure Audit Expert
              </span>
              <span className="block text-[10.5px] font-bold tracking-wide text-brand uppercase">
                Audit · Safety · Fleet Telematics
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[14px] font-semibold text-night/85">
            {/* Home */}
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-brand font-bold bg-brand-soft/60" }}
              className="px-3 py-2 rounded-lg hover:text-brand hover:bg-cloud/70 transition"
            >
              Home
            </Link>

            {/* Insurance Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "insurance" ? null : "insurance")}
                onMouseEnter={() => setActiveDropdown("insurance")}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg transition cursor-pointer ${
                  activeDropdown === "insurance" || location.pathname.includes("insurance")
                    ? "text-brand font-bold bg-brand-soft/60"
                    : "hover:text-brand hover:bg-cloud/70"
                }`}
              >
                Insurance <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === "insurance" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 top-full pt-2 w-[680px] animate-reveal"
                >
                  <div className="bg-white rounded-2xl border border-ink/10 shadow-2xl p-5 grid grid-cols-3 gap-5">
                    {/* Motor Insurance */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand mb-3 pb-1 border-b border-ink/8">
                        <Car className="w-3.5 h-3.5" /> Motor Insurance
                      </div>
                      <div className="space-y-1 text-[13px]">
                        <Link
                          to="/motor-insurance"
                          search={{ tab: "private-car" }}
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Private Cars <span className="text-[10px] text-brand font-bold">PB Instant</span>
                        </Link>
                        <Link
                          to="/motor-insurance"
                          search={{ tab: "bike" }}
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Bikes / Two-Wheelers <span className="text-[10px] text-brand font-bold">PB Instant</span>
                        </Link>
                        <Link
                          to="/motor-insurance"
                          search={{ tab: "commercial-vehicle" }}
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Commercial Vehicles (GCV) <span className="text-[10px] text-brand font-bold">PB Instant</span>
                        </Link>
                        <Link
                          to="/motor-insurance"
                          search={{ tab: "truck" }}
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Trucks &amp; Multi-Axle
                        </Link>
                        <Link
                          to="/motor-insurance"
                          search={{ tab: "auto-taxi" }}
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Auto &amp; Taxi / Cabs <span className="text-[10px] text-amber-600 font-bold">Assisted</span>
                        </Link>
                        <Link
                          to="/motor-insurance"
                          search={{ tab: "school-bus" }}
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          School Buses &amp; PCV
                        </Link>
                        <Link
                          to="/motor-insurance"
                          search={{ tab: "tempo-pickup" }}
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          4-Wheeler Tempos &amp; Pickups
                        </Link>
                        <div className="pt-2 border-t border-ink/8 mt-1 space-y-1">
                          <Link
                            to="/motor-insurance"
                            search={{ tab: "with-dashcam" }}
                            className="block p-1.5 rounded-lg bg-accent-yellow/15 hover:bg-accent-yellow/25 text-night font-bold text-[12px]"
                          >
                            ⭐ Option A: Policy &amp; Telemetry Add-On
                          </Link>
                          <Link
                            to="/motor-insurance"
                            search={{ tab: "standard" }}
                            className="block p-1.5 rounded-lg hover:bg-cloud text-ink/70 text-[12px]"
                          >
                            Option B: Standard Motor Policy
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Health Insurance */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 mb-3 pb-1 border-b border-ink/8">
                        <HeartPulse className="w-3.5 h-3.5" /> Health Insurance
                      </div>
                      <div className="space-y-1 text-[13px]">
                        <Link
                          to="/health-insurance"
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Individual Health
                        </Link>
                        <Link
                          to="/health-insurance"
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Family Floater
                        </Link>
                        <Link
                          to="/health-insurance"
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Senior Citizen Health
                        </Link>
                        <Link
                          to="/health-insurance"
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Group Health Insurance
                        </Link>
                        <Link
                          to="/health-insurance"
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Corporate Health Plans
                        </Link>
                        <div className="p-2.5 mt-3 rounded-xl bg-cloud/60 text-[11px] text-ink/65 leading-relaxed">
                          Room rent capping audit &amp; waiting period clarity before policy purchase.
                        </div>
                      </div>
                    </div>

                    {/* MSME Insurance */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 pb-1 border-b border-ink/8">
                        <Building2 className="w-3.5 h-3.5" /> MSME Insurance
                      </div>
                      <div className="space-y-1 text-[13px]">
                        <Link
                          to="/msme-insurance"
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Shop &amp; Establishment
                        </Link>
                        <Link
                          to="/msme-insurance"
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Fire &amp; Special Perils
                        </Link>
                        <Link
                          to="/msme-insurance"
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Property Insurance
                        </Link>
                        <Link
                          to="/msme-insurance"
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Burglary Insurance
                        </Link>
                        <Link
                          to="/msme-insurance"
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Public Liability
                        </Link>
                        <Link
                          to="/msme-insurance"
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Employee Group Cover
                        </Link>
                        <Link
                          to="/msme-insurance"
                          className="block p-1.5 rounded-lg hover:bg-cloud text-ink/80 hover:text-night font-medium"
                        >
                          Business Package Policy
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tracking Software Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "tracking" ? null : "tracking")}
                onMouseEnter={() => setActiveDropdown("tracking")}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg transition cursor-pointer ${
                  activeDropdown === "tracking" || location.pathname.includes("tracking")
                    ? "text-brand font-bold bg-brand-soft/60"
                    : "hover:text-brand hover:bg-cloud/70"
                }`}
              >
                Tracking Software <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === "tracking" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 top-full pt-2 w-[340px] animate-reveal"
                >
                  <div className="bg-white rounded-2xl border border-ink/10 shadow-2xl p-4 space-y-1 text-[13px]">
                    <Link
                      to="/tracking-solutions"
                      className="block p-2.5 rounded-xl hover:bg-cloud transition"
                    >
                      <div className="font-bold text-night">Fleet Tracking Overview</div>
                      <div className="text-[11.5px] text-ink/60">Live GPS, driver behavior &amp; alerts</div>
                    </Link>
                    <a
                      href="https://insureauditexpert.tech/command-center"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-night text-white hover:bg-brand transition"
                    >
                      <div>
                        <div className="font-bold">Access Command Center ↗</div>
                        <div className="text-[11px] text-white/70">Enterprise fleet management portal</div>
                      </div>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDropdown(null);
                        openDemoRequestModal();
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-brand-soft hover:text-brand transition font-bold"
                    >
                      Request a Demo →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Devices Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === "devices" ? null : "devices")}
                onMouseEnter={() => setActiveDropdown("devices")}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg transition cursor-pointer ${
                  activeDropdown === "devices" || location.pathname.includes("devices")
                    ? "text-brand font-bold bg-brand-soft/60"
                    : "hover:text-brand hover:bg-cloud/70"
                }`}
              >
                Devices <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {activeDropdown === "devices" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 top-full pt-2 w-[340px] animate-reveal"
                >
                  <div className="bg-white rounded-2xl border border-ink/10 shadow-2xl p-4 space-y-1 text-[13px]">
                    <Link
                      to="/devices"
                      search={{ device: "dashcam" }}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-cloud text-ink/80 hover:text-night font-medium"
                    >
                      <Camera className="w-4 h-4 text-brand" /> AI Dashcams &amp; Video Telematics
                    </Link>
                    <Link
                      to="/devices"
                      search={{ device: "ais-140" }}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-cloud text-ink/80 hover:text-night font-medium"
                    >
                      <Radio className="w-4 h-4 text-brand" /> AIS-140 GPS (Govt Mandated)
                    </Link>
                    <Link
                      to="/devices"
                      search={{ device: "e-lock" }}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-cloud text-ink/80 hover:text-night font-medium"
                    >
                      <Lock className="w-4 h-4 text-brand" /> Smart E-Locks for Cargo
                    </Link>
                    <Link
                      to="/devices"
                      search={{ device: "heat-sensor" }}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-cloud text-ink/80 hover:text-night font-medium"
                    >
                      <Thermometer className="w-4 h-4 text-brand" /> Cold Chain Heat Sensors
                    </Link>
                    <Link
                      to="/devices"
                      search={{ device: "fuel-sensor" }}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-cloud text-ink/80 hover:text-night font-medium"
                    >
                      <Fuel className="w-4 h-4 text-brand" /> Fuel Rod Level Sensors
                    </Link>
                    <Link
                      to="/devices"
                      search={{ device: "gps-id-card" }}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-cloud text-ink/80 hover:text-night font-medium"
                    >
                      <CreditCard className="w-4 h-4 text-brand" /> GPS ID Cards
                    </Link>
                    <div className="pt-2 border-t border-ink/8">
                      <Link
                        to="/devices"
                        className="block text-center text-xs font-bold text-brand hover:underline p-1"
                      >
                        Explore All 6 Devices →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Claim Assistance */}
            <Link
              to="/claim-assistance"
              activeProps={{ className: "text-brand font-bold bg-brand-soft/60" }}
              className="px-3 py-2 rounded-lg hover:text-brand hover:bg-cloud/70 transition"
            >
              Claim Assistance
            </Link>

            {/* About Us */}
            <Link
              to="/about"
              activeProps={{ className: "text-brand font-bold bg-brand-soft/60" }}
              className="px-3 py-2 rounded-lg hover:text-brand hover:bg-cloud/70 transition"
            >
              About Us
            </Link>

            {/* Resources / Blogs */}
            <Link
              to="/blogs"
              activeProps={{ className: "text-brand font-bold bg-brand-soft/60" }}
              className="px-3 py-2 rounded-lg hover:text-brand hover:bg-cloud/70 transition"
            >
              Resources / Blogs
            </Link>

            {/* Contact Us */}
            <Link
              to="/contact"
              activeProps={{ className: "text-brand font-bold bg-brand-soft/60" }}
              className="px-3 py-2 rounded-lg hover:text-brand hover:bg-cloud/70 transition"
            >
              Contact Us
            </Link>
          </nav>

          {/* Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Magnetic strength={0.2}>
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="sheen inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white font-bold text-[13.5px] px-4 py-2.5 rounded-xl transition-colors shrink-0 shadow-xs cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-accent-yellow" /> Get Quote
              </button>
            </Magnetic>

            {/* Hamburger Button for Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-night hover:bg-cloud transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-ink/10 bg-white max-h-[85vh] overflow-y-auto px-6 py-5 space-y-4 animate-reveal shadow-xl">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold text-night hover:text-brand py-1"
            >
              Home
            </Link>

            {/* Mobile Insurance Accordion */}
            <div className="space-y-2 border-t border-ink/8 pt-3">
              <div className="font-extrabold text-sm uppercase tracking-wider text-brand">
                Insurance Solutions
              </div>
              <div className="grid grid-cols-2 gap-2 text-[13px] pl-2 font-medium text-ink/80">
                <Link to="/motor-insurance" search={{ tab: "private-car" }} onClick={() => setMobileMenuOpen(false)} className="py-1">Private Cars (PB)</Link>
                <Link to="/motor-insurance" search={{ tab: "bike" }} onClick={() => setMobileMenuOpen(false)} className="py-1">Bikes (PB)</Link>
                <Link to="/motor-insurance" search={{ tab: "commercial-vehicle" }} onClick={() => setMobileMenuOpen(false)} className="py-1">Commercial GCV (PB)</Link>
                <Link to="/motor-insurance" search={{ tab: "truck" }} onClick={() => setMobileMenuOpen(false)} className="py-1">Trucks</Link>
                <Link to="/motor-insurance" search={{ tab: "auto-taxi" }} onClick={() => setMobileMenuOpen(false)} className="py-1">Auto &amp; Taxi</Link>
                <Link to="/motor-insurance" search={{ tab: "school-bus" }} onClick={() => setMobileMenuOpen(false)} className="py-1">School Buses</Link>
                <Link to="/health-insurance" onClick={() => setMobileMenuOpen(false)} className="py-1 text-rose-600 font-bold">Health Insurance</Link>
                <Link to="/msme-insurance" onClick={() => setMobileMenuOpen(false)} className="py-1 text-blue-700 font-bold">MSME Insurance</Link>
              </div>
            </div>

            {/* Mobile Tracking Software */}
            <div className="space-y-2 border-t border-ink/8 pt-3">
              <div className="font-extrabold text-sm uppercase tracking-wider text-night">
                Tracking Software
              </div>
              <div className="space-y-2 pl-2 text-[13.5px]">
                <Link to="/tracking-solutions" onClick={() => setMobileMenuOpen(false)} className="block text-ink/80 hover:text-brand font-medium">
                  Fleet Tracking Platform
                </Link>
                <a
                  href="https://insureauditexpert.tech/command-center"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-brand font-bold"
                >
                  Access Command Center ↗
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openDemoRequestModal();
                  }}
                  className="block text-left text-amber-700 font-bold"
                >
                  Request a Demo
                </button>
              </div>
            </div>

            {/* Mobile Devices */}
            <div className="space-y-2 border-t border-ink/8 pt-3">
              <div className="font-extrabold text-sm uppercase tracking-wider text-night">
                Devices
              </div>
              <div className="grid grid-cols-2 gap-2 text-[13px] pl-2 font-medium text-ink/80">
                <Link to="/devices" search={{ device: "dashcam" }} onClick={() => setMobileMenuOpen(false)}>Dashcams</Link>
                <Link to="/devices" search={{ device: "ais-140" }} onClick={() => setMobileMenuOpen(false)}>AIS-140 GPS</Link>
                <Link to="/devices" search={{ device: "e-lock" }} onClick={() => setMobileMenuOpen(false)}>E-Locks</Link>
                <Link to="/devices" search={{ device: "heat-sensor" }} onClick={() => setMobileMenuOpen(false)}>Heat Sensors</Link>
                <Link to="/devices" search={{ device: "fuel-sensor" }} onClick={() => setMobileMenuOpen(false)}>Fuel Sensors</Link>
                <Link to="/devices" search={{ device: "gps-id-card" }} onClick={() => setMobileMenuOpen(false)}>GPS ID Cards</Link>
              </div>
            </div>

            {/* Other Mobile Links */}
            <div className="space-y-2 border-t border-ink/8 pt-3 text-[14.5px] font-semibold text-night">
              <Link to="/claim-assistance" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand">Claim Assistance</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand">About Us</Link>
              <Link to="/blogs" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand">Resources / Blogs</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand">Contact Us</Link>
              <Link to="/support" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-brand">Support Helpdesk</Link>
            </div>

            <div className="pt-3 border-t border-ink/8">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="w-full bg-brand text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-accent-yellow" /> Get Audited Quote
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-night text-white/80 pt-16 pb-12">
      <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-white p-1 shadow-md shrink-0 flex items-center justify-center">
              <img src={logoUrl} alt="Insure Audit Expert" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="text-white font-extrabold text-[17px] leading-tight tracking-tight">
                Insure Audit Expert
              </div>
              <div className="text-accent-yellow text-[10.5px] font-bold tracking-wide uppercase mt-0.5">
                Audit · Safety · Telematics
              </div>
            </div>
          </div>
          <p className="text-[14px] font-bold text-accent-yellow tracking-wide">
            Smarter Insurance. Safer Vehicles. Smarter Fleets.
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-white/75">
            A Risk Management &amp; Vehicle Safety Program — independent policy audits, AI dashcams, and intelligent live telematics installed without cutting a single wire.
          </p>
          <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-accent-yellow block">
              Download Insure Track App:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://play.google.com/store/apps/details?id=com.insuretrack.app"
                target="_blank"
                rel="noreferrer"
                className="text-[12px] bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5"
              >
                <span>▶ Google Play</span>
              </a>
              <a
                href="https://apps.apple.com/in/app/insure-track/id6808179223"
                target="_blank"
                rel="noreferrer"
                className="text-[12px] bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5"
              >
                <span> App Store</span>
              </a>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-[16px] font-bold text-white mb-4 tracking-wide">Insurance Solutions</h5>
          <ul className="space-y-2.5 text-[14px]">
            <li><Link to="/motor-insurance" search={{ tab: "private-car" }} className="hover:text-white transition">Private Car Insurance (PB Instant)</Link></li>
            <li><Link to="/motor-insurance" search={{ tab: "bike" }} className="hover:text-white transition">Bike &amp; Two-Wheeler Insurance</Link></li>
            <li><Link to="/motor-insurance" search={{ tab: "commercial-vehicle" }} className="hover:text-white transition">Commercial Goods Carrier (GCV)</Link></li>
            <li><Link to="/motor-insurance" search={{ tab: "truck" }} className="hover:text-white transition">Heavy Trucks &amp; Multi-Axle</Link></li>
            <li><Link to="/motor-insurance" search={{ tab: "auto-taxi" }} className="hover:text-white transition">Auto &amp; Taxi / Cabs</Link></li>
            <li><Link to="/motor-insurance" search={{ tab: "school-bus" }} className="hover:text-white transition">School Bus &amp; Child Safety</Link></li>
            <li><Link to="/health-insurance" className="hover:text-white transition">Health Insurance Plans</Link></li>
            <li><Link to="/msme-insurance" className="hover:text-white transition">MSME &amp; Business Package</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-[16px] font-bold text-white mb-4 tracking-wide">Safety &amp; Technology</h5>
          <ul className="space-y-2.5 text-[14px]">
            <li><Link to="/tracking-solutions" className="hover:text-white transition">Fleet Tracking Platform</Link></li>
            <li><a href="https://insureauditexpert.tech/command-center" target="_blank" rel="noreferrer" className="text-accent-yellow hover:underline transition">Command Center Portal ↗</a></li>
            <li><Link to="/devices" search={{ device: "dashcam" }} className="hover:text-white transition">AI Dashcam &amp; Evidence Dossier</Link></li>
            <li><Link to="/devices" search={{ device: "ais-140" }} className="hover:text-white transition">AIS-140 GPS Devices</Link></li>
            <li><Link to="/devices" search={{ device: "e-lock" }} className="hover:text-white transition">Smart E-Locks</Link></li>
            <li><Link to="/devices" search={{ device: "heat-sensor" }} className="hover:text-white transition">Cold Chain Heat Sensors</Link></li>
            <li><Link to="/devices" search={{ device: "fuel-sensor" }} className="hover:text-white transition">Fuel Rod Level Sensors</Link></li>
            <li><Link to="/claim-assistance" className="hover:text-white transition">Claim Assistance Desk</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-[16px] font-bold text-white mb-4 tracking-wide">Get In Touch</h5>
          <ul className="space-y-3 text-[14px]">
            <li className="flex items-start gap-2.5 text-white/80">
              <MapPin className="w-4 h-4 text-brand shrink-0 mt-1" />
              <a
                href="https://www.google.com/maps/place/28%C2%B033'39.5%22N+77%C2%B011'31.7%22E/@28.5608467,77.1920417,20.64z/data=!4m4!3m3!8m2!3d28.5609581!4d77.1921258?hl=en&entry=ttu&g_ep=EgoyMDI2MDgzMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                B-5/55, Safdarjung Enclave, New Delhi - 110029
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-brand shrink-0 mt-1" />
              <div>
                <div className="text-white font-bold">
                  <a href="tel:7042733002" className="hover:text-accent-yellow transition">7042733002</a> /{" "}
                  <a href="tel:7042733005" className="hover:text-accent-yellow transition">7042733005</a>
                </div>
                <div className="text-white/60 text-xs mt-0.5">
                  Helpline: <a href="tel:08065604804" className="hover:text-white transition">08065604804</a> /{" "}
                  <a href="tel:08065604805" className="hover:text-white transition">08065604805</a>
                </div>
              </div>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand shrink-0" />
              <a href="mailto:info@insureauditexpert.com" className="text-white/80 hover:text-white transition">
                info@insureauditexpert.com
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-white/80">
              <Clock className="w-4 h-4 text-brand shrink-0" /> Mon – Sat · 9:30 AM – 6:30 PM
            </li>
            <li className="flex items-center gap-2.5 pt-1">
              <MessageCircle className="w-4 h-4 text-brand shrink-0" />
              <a
                href="https://wa.me/918700515288"
                target="_blank"
                rel="noreferrer"
                className="hover:underline font-bold text-accent-yellow"
              >
                WhatsApp Desk (24x7 Assistance): +91 87005 15288
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mandatory Statutory Disclaimer & Regulatory Disclosure Box */}
      <div className="max-w-[1280px] mx-auto px-6 mt-12">
        <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 text-[13px] leading-relaxed text-white/75 space-y-3.5 shadow-sm">
          <div className="flex items-center gap-2 text-accent-yellow font-bold text-[13.5px] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-accent-yellow" /> Statutory Disclaimer &amp; Regulatory Disclosure
          </div>
          <p className="font-semibold text-white leading-relaxed text-[13.5px]">
            Insurance is the subject matter of solicitation. All motor, health, and MSME insurance policies are solicited and serviced through our licensed partner PBPartners (Policybazaar Insurance Brokers Private Limited). Insure Audit Expert operates as an authorized POSP channel partner (POS Code: IP461548). Telematics devices, AI dashcams, and fleet tracking software are independent technology products offered by Alxsure Tech Hub (OPC) Pvt Ltd.
          </p>
          <p>
            <strong className="text-white">Section 41 of the Insurance Act, 1938 (Prohibition of Rebates):</strong> No person shall allow or offer to allow, either directly or indirectly, as an inducement to any person to take out or renew or continue an insurance in respect of any kind of risk relating to lives or property in India, any rebate of the whole or part of the commission payable or any rebate of the premium shown on the policy, nor shall any person taking out or renewing or continuing a policy accept any rebate, except such rebate as may be allowed in accordance with the published prospectuses or tables of the insurer. Any person making default in complying with the provisions of this section shall be liable for penalty which may extend to ten lakh rupees (₹10,00,000).
          </p>
          <p>
            <strong className="text-white">Commercial &amp; Technical Independence:</strong> Insure Audit Expert is a brand owned and managed by <strong className="text-white">Alxsure Tech Hub (OPC) Pvt. Ltd.</strong> AI Dashcams, GPS/AIS-140 tracking hardware, sensor equipment, and fleet telemetry platform subscriptions are separate technology offerings provided under independent commercial invoices and terms. Hardware purchases and telematics subscriptions are completely independent of insurance policy purchase and do not influence policy issuance, premium rates, or surveyor claim assessment decisions.
          </p>
          <p>
            Our <strong className="text-white">Insure Track</strong> mobile application is managed by{" "}
            <strong className="text-white">LustreX Technologies</strong>, who provides complete software infrastructure, technical maintenance, and ongoing assistance for any application or software-related queries.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1280px] mx-auto px-6 mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11.5px] sm:text-xs md:text-[13px] text-white/60">
        <span className="flex items-center gap-1.5 whitespace-nowrap text-center md:text-left">
          © {new Date().getFullYear()} Insure Audit Expert · Alxsure Tech Hub (OPC) Pvt. Ltd.
          <Link
            to="/leads"
            title="Internal Staff Access (PIN Protected)"
            className="text-white/20 hover:text-white/60 transition ml-1 p-0.5 inline-flex items-center"
            aria-label="Staff Portal"
          >
            <Lock className="w-3 h-3 opacity-25 hover:opacity-100 transition-opacity" />
          </Link>
        </span>
        <div className="flex items-center flex-nowrap gap-2 sm:gap-3 lg:gap-4 text-white/80 shrink-0 whitespace-nowrap justify-center md:justify-end">
          <Link to="/privacy-policy" className="hover:text-white transition font-medium hover:underline underline-offset-4 whitespace-nowrap">Privacy</Link>
          <span className="text-white/30">·</span>
          <Link to="/terms-and-conditions" className="hover:text-white transition font-medium hover:underline underline-offset-4 whitespace-nowrap">Terms</Link>
          <span className="text-white/30">·</span>
          <Link to="/grievance-redressal" className="hover:text-white transition font-medium hover:underline underline-offset-4 whitespace-nowrap">Grievance</Link>
          <span className="text-white/30">·</span>
          <Link to="/support" className="hover:text-white transition font-medium hover:underline underline-offset-4 whitespace-nowrap">Support</Link>
          <span className="text-white/30">·</span>
          <Link to="/contact" className="hover:text-white transition font-medium hover:underline underline-offset-4 whitespace-nowrap">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 450);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-night/90 backdrop-blur text-white grid place-items-center shadow-2xl hover:bg-brand active:scale-95 transition-all z-40 cursor-pointer"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useAutoReveal(pathname);

  // Secret keyboard shortcut: Ctrl + Shift + L or Cmd + Shift + L
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "L" || e.key === "l")) {
        e.preventDefault();
        navigate({ to: "/leads" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-paper text-ink font-body" id="top">
      <SiteHeader />
      {children}
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
