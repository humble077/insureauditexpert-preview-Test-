import { Link, useLocation } from "@tanstack/react-router";
import { Phone, Mail, Clock, MapPin, Sparkles, ShieldCheck, MessageCircle, ChevronUp } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import { ScrollProgressBar, Magnetic, CursorGlow, useAutoReveal } from "@/lib/motion";
import logoUrl from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Home", short: "Home" },
  { to: "/insurance", label: "Insurance Plans", short: "Insurance" },
  { to: "/risk-audit", label: "Risk Audit", short: "Risk Audit" },
  { to: "/ai-dashcam-tracking", label: "AI Dashcam & Tracking", short: "Dashcam & Tracking" },
  { to: "/fleet-safety", label: "Fleet Safety", short: "Fleet" },
  { to: "/school-bus-safety", label: "School Bus & Child Safety", short: "School Bus" },
  { to: "/about", label: "About Us", short: "About" },
  { to: "/support", label: "Support", short: "Support" },
  { to: "/contact", label: "Contact Us", short: "Contact" },
] as const;


export function SiteHeader() {
  return (
    <>
      <ScrollProgressBar />
      <CursorGlow />
      <div className="bg-accent-yellow text-night text-[12px] font-semibold overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3"/> Smart Audit. Safe Drive. Guaranteed Protection. · AI Dashcam &amp; G-Sensor · Zero Wiring-Cut Tracking · 24x7 Claim Support (+91 8700515288)
            </span>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-ink/5">
        <div className="max-w-[1240px] mx-auto px-6 h-[60px] flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img src={logoUrl} alt="Insure Audit Expert — Smart Audit. Safe Drive. Guaranteed Protection." className="h-9 w-auto transition-transform group-hover:scale-105"/>
            <span className="hidden md:block leading-tight">
              <span className="block text-[14px] font-extrabold text-night">Insure Audit Expert</span>
              <span className="hidden 2xl:block text-[10px] font-semibold tracking-wide text-brand uppercase">Smart Audit. Safe Drive. Guaranteed Protection.</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-3 xl:gap-4 text-[12px] xl:text-[12.5px] font-semibold text-ink/80 whitespace-nowrap">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-brand font-bold" }}
                className="relative py-1 hover:text-brand transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-brand after:transition-all hover:after:w-full"
              >
                {n.short}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/support"
              className="hidden sm:inline-flex items-center gap-1 text-[11.5px] font-bold text-brand hover:text-brand-deep bg-brand-soft px-2.5 py-1.5 rounded-md transition"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Support
            </Link>
            <Magnetic strength={0.22}>
              <Link to="/insurance" className="sheen inline-flex items-center gap-1.5 bg-night hover:bg-brand text-white font-bold text-[12px] px-3 xl:px-4 py-2 rounded-md transition-colors shrink-0">
                <ShieldCheck className="w-3.5 h-3.5"/> <span className="hidden 2xl:inline">Get Insurance&nbsp;</span>Quote
              </Link>
            </Magnetic>
          </div>
        </div>
        <div className="lg:hidden border-t border-ink/5 overflow-x-auto">
          <div className="flex items-center gap-4 px-6 py-2 text-[12px] font-semibold text-ink/80 whitespace-nowrap">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} activeProps={{ className: "text-brand font-bold" }} className="hover:text-brand transition">{n.label}</Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}

const PROGRAM_LINKS = [
  { to: "/insurance", label: "Car & Vehicle Insurance" },
  { to: "/insurance", label: "Commercial Vehicle Insurance" },
  { to: "/insurance", label: "Health Insurance" },
  { to: "/risk-audit", label: "Professional Risk Audit" },
  { to: "/ai-dashcam-tracking", label: "AI Dashcam & G-Sensor" },
  { to: "/ai-dashcam-tracking", label: "Smart Live Tracking" },
  { to: "/fleet-safety", label: "Fleet Safety Program" },
  { to: "/school-bus-safety", label: "School Bus & Child Safety" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-night text-white/75 pt-20 pb-10">
      <div className="max-w-[1240px] mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <div className="mb-4 inline-block bg-white/95 rounded-xl p-3">
            <img src={logoUrl} alt="Insure Audit Expert" className="h-14 w-auto"/>
          </div>
          <p className="text-[13px] font-semibold text-accent-yellow tracking-wide">Smart Audit. Safe Drive. Guaranteed Protection.</p>
          <p className="mt-3 text-sm leading-relaxed">
            A Risk Management &amp; Vehicle Safety Program — professional policy audits, AI dashcam with G-sensor, and smart live tracking installed without cutting a single wire.
          </p>
        </div>
        <div>
          <h5 className="text-white font-bold mb-4">Insurance &amp; Programs</h5>
          <ul className="space-y-2 text-sm">
            {PROGRAM_LINKS.map((s) => (
              <li key={s.label}><Link to={s.to} className="link-sweep hover:text-brand transition">{s.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-4">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brand transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand transition">About Us</Link></li>
            <li><Link to="/support" className="hover:text-brand transition">Support</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-brand transition">Privacy Policy</Link></li>
            <li><Link to="/blogs" className="hover:text-brand transition">Knowledge Hub</Link></li>
            <li><Link to="/contact" className="hover:text-brand transition">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-4">Get In Touch</h5>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5"/> B-3/91 Krishna Nagar, Safdarjung Enclave, Delhi-110029</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-brand"/> <a href="tel:+918700515288" className="hover:text-brand">+91 8700515288 / 9217955477</a></li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand"/> <a href="mailto:info@insureauditexpert.com" className="hover:text-brand">info@insureauditexpert.com</a></li>
            <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand"/> Mon – Sat · 9:30 AM – 6:30 PM</li>
            <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-brand"/> <a href="https://wa.me/918700515288" target="_blank" rel="noreferrer" className="hover:text-brand font-semibold text-brand">WhatsApp Us (24x7)</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 mt-14">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-[12.5px] leading-relaxed text-white/60 space-y-3">
          <h6 className="text-white/85 font-bold text-[13px] uppercase tracking-wider">Regulatory &amp; Transparency Disclosure</h6>
          <p>
            Insure Audit Expert is a brand owned and managed by <strong className="text-white/80">Alexfintech Risk &amp; Solutions OPC Pvt. Ltd.</strong>
          </p>
          <p>
            Insure Audit Expert is a technology, risk-audit and vehicle-safety service provider. We do not underwrite or issue insurance policies. All insurance products are arranged and issued through our licensed distribution partner <strong className="text-white/80">PBPartners (Policybazaar Insurance Brokers Pvt. Ltd.)</strong> and other IRDAI-registered insurers and brokers. Policies are issued at <strong className="text-white/80">standard insurance rates</strong> as filed with and approved by IRDAI.
          </p>
          <p>
            Our AI dashcam, live-tracking device and professional audit services are offered as a <strong className="text-white/80">Complimentary Tech Membership</strong> bundled with our risk-management program. This membership is a technology and safety service — it is not a rebate, cashback, cash discount or inducement of any kind, and no part of the insurance premium or commission is returned to the customer. Insurance is the subject matter of solicitation.
          </p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <span>© {new Date().getFullYear()} Insure Audit Expert · Alexfintech Risk &amp; Solutions OPC Pvt. Ltd. · All rights reserved</span>
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-white/70">
          <Link to="/privacy-policy" className="hover:text-white transition font-medium hover:underline underline-offset-4">Privacy Policy</Link>
          <span>·</span>
          <Link to="/support" className="hover:text-white transition font-medium hover:underline underline-offset-4">Support</Link>
          <span>·</span>
          <Link to="/contact" className="hover:text-white transition font-medium hover:underline underline-offset-4">Contact Us</Link>
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
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-night/90 backdrop-blur text-white grid place-items-center shadow-2xl hover:bg-brand active:scale-95 transition-all z-40"
    >
      <ChevronUp className="w-5 h-5"/>
    </button>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useAutoReveal(pathname);
  return (
    <div className="min-h-screen bg-paper text-ink font-body" id="top">
      <SiteHeader />
      {children}
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
