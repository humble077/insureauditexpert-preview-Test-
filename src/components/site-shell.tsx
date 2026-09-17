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
      <div className="bg-accent-yellow text-night text-[13px] sm:text-[13.5px] font-bold overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5"/> Smart Audit. Safe Drive. Guaranteed Protection. · AI Dashcam &amp; G-Sensor · Zero Wiring-Cut Tracking · 24x7 Claim Support (08065604804 / 08065604805)
            </span>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white/98 backdrop-blur border-b border-ink/8 shadow-2xs">
        <div className="max-w-[1240px] mx-auto px-6 h-[68px] flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img src={logoUrl} alt="Insure Audit Expert — Smart Audit. Safe Drive. Guaranteed Protection." className="h-10 w-auto transition-transform group-hover:scale-105"/>
            <span className="hidden md:block leading-tight">
              <span className="block text-[16px] font-extrabold text-night tracking-tight">Insure Audit Expert</span>
              <span className="hidden 2xl:block text-[11px] font-bold tracking-wide text-brand uppercase">Smart Audit. Safe Drive. Guaranteed Protection.</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[14px] xl:text-[15px] font-semibold text-ink/85 whitespace-nowrap">
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
          <div className="flex items-center gap-3">
            <Link
              to="/support"
              className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-bold text-brand hover:text-brand-deep bg-brand-soft px-3 py-2 rounded-lg transition"
            >
              <MessageCircle className="w-4 h-4" /> Support
            </Link>
            <Magnetic strength={0.22}>
              <Link to="/insurance" className="sheen inline-flex items-center gap-2 bg-night hover:bg-brand text-white font-bold text-[13.5px] px-4 py-2.5 rounded-xl transition-colors shrink-0 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-accent-yellow"/> <span className="hidden sm:inline">Get Quote</span>
              </Link>
            </Magnetic>
          </div>
        </div>
        <div className="lg:hidden border-t border-ink/5 overflow-x-auto bg-white">
          <div className="flex items-center gap-5 px-6 py-2.5 text-[13.5px] font-semibold text-ink/80 whitespace-nowrap">
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
  { to: "/#insure-track-app", label: "Insure Track™ App (iOS / Android)" },
  { to: "/fleet-safety", label: "Fleet Safety Program" },
  { to: "/school-bus-safety", label: "School Bus & Child Safety" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-night text-white/80 pt-20 pb-12">
      <div className="max-w-[1240px] mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <div className="mb-4 inline-block bg-white/95 rounded-xl p-3 shadow-xs">
            <img src={logoUrl} alt="Insure Audit Expert" className="h-14 w-auto"/>
          </div>
          <p className="text-[14px] font-bold text-accent-yellow tracking-wide">Smart Audit. Safe Drive. Guaranteed Protection.</p>
          <p className="mt-3 text-[14px] leading-relaxed text-white/75">
            A Risk Management &amp; Vehicle Safety Program — professional policy audits, AI dashcam with G-sensor, and smart live tracking installed without cutting a single wire.
          </p>
          <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-accent-yellow block">
              Download Insure Track:
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
          <h5 className="text-[17px] font-bold text-white mb-4 tracking-wide">Insurance &amp; Programs</h5>
          <ul className="space-y-2.5 text-[14.5px]">
            {PROGRAM_LINKS.map((s) => (
              <li key={s.label}><Link to={s.to} className="link-sweep hover:text-brand transition text-white/80 hover:text-white">{s.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-[17px] font-bold text-white mb-4 tracking-wide">Quick Links</h5>
          <ul className="space-y-2.5 text-[14.5px]">
            <li><Link to="/" className="hover:text-brand transition text-white/80 hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand transition text-white/80 hover:text-white">About Us</Link></li>
            <li><Link to="/support" className="hover:text-brand transition text-white/80 hover:text-white">Support Helpdesk</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-brand transition text-white/80 hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/blogs" className="hover:text-brand transition text-white/80 hover:text-white">Knowledge Hub</Link></li>
            <li><Link to="/contact" className="hover:text-brand transition text-white/80 hover:text-white">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-[17px] font-bold text-white mb-4 tracking-wide">Get In Touch</h5>
          <ul className="space-y-3 text-[14.5px]">
            <li className="flex items-start gap-2.5 text-white/80"><MapPin className="w-4 h-4 text-brand shrink-0 mt-1"/> <a href="https://www.google.com/maps/place/28%C2%B033'39.5%22N+77%C2%B011'31.7%22E/@28.5608467,77.1920417,20.64z/data=!4m4!3m3!8m2!3d28.5609581!4d77.1921258?hl=en&entry=ttu&g_ep=EgoyMDI2MDgzMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="hover:text-white transition">B-5/55, Safdarjung Enclave, New Delhi - 110029</a></li>
            <li className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-brand shrink-0"/> <a href="tel:08065604804" className="text-white/80 hover:text-white transition">08065604804 / 08065604805</a></li>
            <li className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-brand shrink-0"/> <a href="mailto:info@insureauditexpert.com" className="text-white/80 hover:text-white transition">info@insureauditexpert.com</a></li>
            <li className="flex items-center gap-2.5 text-white/80"><Clock className="w-4 h-4 text-brand shrink-0"/> Mon – Sat · 9:30 AM – 6:30 PM</li>
            <li className="flex items-center gap-2.5 pt-1"><MessageCircle className="w-4 h-4 text-brand shrink-0"/> <a href="https://wa.me/918700515288" target="_blank" rel="noreferrer" className="hover:underline font-bold text-accent-yellow">WhatsApp Us (24x7 Support)</a></li>
          </ul>
        </div>
      </div>



      <div className="max-w-[1240px] mx-auto px-6 mt-14">
        <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-6 text-[13.5px] sm:text-[14px] leading-relaxed text-white/70 space-y-3">
          <h6 className="text-white font-bold text-[14px] uppercase tracking-wider text-accent-yellow">Regulatory &amp; Transparency Disclosure</h6>
          <p>
            <strong className="text-white">Insure Audit Expert</strong> is a brand owned and managed by <strong className="text-white">Alxsure Tech Hub (OPC) Pvt. Ltd.</strong>
          </p>
          <p>
            <strong className="text-white">Insure Audit Expert</strong> is a technology, risk-audit and vehicle-safety service provider. We do not underwrite or issue insurance policies. All insurance products are arranged and issued through our licensed distribution partner <strong className="text-white">PBPartners (Policybazaar Insurance Brokers Pvt. Ltd.)</strong> and other IRDAI-registered insurers and brokers. Policies are issued at <strong className="text-white">standard insurance rates</strong> as filed with and approved by IRDAI.
          </p>
          <p>
            Our AI dashcam, live-tracking device and professional audit services are offered as a <strong className="text-white">Complimentary Tech Membership</strong> bundled with our risk-management program. This membership is a technology and safety service — it is not a rebate, cashback, cash discount or inducement of any kind, and no part of the insurance premium or commission is returned to the customer. Insurance is the subject matter of solicitation.
          </p>
          <p>
            Our <strong className="text-white">Insure Track</strong> mobile application is managed by <strong className="text-white">LustreX Technologies</strong>, who provides complete software infrastructure, technical maintenance, and ongoing assistance for any application or software-related queries and issues.
          </p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[13.5px] text-white/60">
        <span>© {new Date().getFullYear()} Insure Audit Expert · Alxsure Tech Hub (OPC) Pvt. Ltd. · All rights reserved</span>
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-white/80">
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
