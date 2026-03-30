"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────
export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function usePageReveal() {
  const [revealed, setRevealed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 100);
    const t2 = setTimeout(() => setRevealed(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return { revealed, loaded };
}

export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// ─────────────────────────────────────────────
// ANIMATED WRAPPERS
// ─────────────────────────────────────────────
export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.05);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function FadeLeft({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.05);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function FadeRight({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.05);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// SECTION LABEL (petite ligne dorée + texte)
// ─────────────────────────────────────────────
export function SectionLabel({
  children,
  centered = false,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}>
      <div className="w-10 h-0.5 bg-[#C8A96E]" />
      <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">
        {children}
      </span>
      {centered && <div className="w-10 h-0.5 bg-[#C8A96E]" />}
    </div>
  );
}

// ─────────────────────────────────────────────
// HERO SECTION (photo + volets révélation)
// ─────────────────────────────────────────────
export function PageHero({
  image,
  title,
  subtitle,
  breadcrumb,
  children,
}: {
  image: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
  children?: React.ReactNode;
}) {
  const { revealed, loaded } = usePageReveal();

  return (
    <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
      {/* Image */}
      <div
        className={`absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${revealed ? "scale-100" : "scale-110"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Volets */}
      <div className={`absolute inset-x-0 top-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-top ${revealed ? "h-0" : "h-1/2"}`} />
      <div className={`absolute inset-x-0 bottom-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-bottom ${revealed ? "h-0" : "h-1/2"}`} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/85 via-[#0B2545]/40 to-[#0B2545]/20 z-10" />

      {/* Breadcrumb */}
      <div className={`absolute top-28 left-6 md:left-12 z-10 transition-all duration-700 delay-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest">
          <a href="/" className="hover:text-[#C8A96E] transition-colors">Accueil</a>
          <span>/</span>
          <span className="text-[#C8A96E]">{breadcrumb}</span>
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-20 px-6 text-center">
        <div className={`transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <SectionLabel centered>AKIBA BTP · Gabon</SectionLabel>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────
const NAV_LINKS = [
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services", sub: "Nos engagements", subHref: "/services#engagements" },
  { label: "Projets", href: "/projets", sub: "Actualités", subHref: "/projets#actualites" },
  { label: "Carrières", href: "/carrieres" },
];

export function SiteHeader({ activePage = "" }: { activePage?: string }) {
  const scrolled = useScrolled();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#0B2545] rounded-lg flex items-center justify-center group-hover:bg-[#C8A96E] transition-colors duration-300">
            <span className="text-white font-black text-lg">A</span>
          </div>
          <div>
            <span className={`font-black text-xl tracking-tight transition-colors duration-300 ${scrolled ? "text-[#0B2545]" : "text-white"}`}>AKIBA BTP</span>
            <div className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${scrolled ? "text-[#C8A96E]" : "text-blue-200"}`}>Gabon</div>
          </div>
        </a>

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="relative"
              onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href={link.href}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-[#C8A96E]
                  ${scrolled ? "text-[#0B2545]" : "text-white"}
                  ${link.label === activePage ? "text-[#C8A96E]" : ""}`}
              >
                {link.label}
              </a>
              {link.sub && activeDropdown === link.label && (
                <div className="absolute top-full left-0 mt-3 bg-white rounded-xl shadow-2xl py-2 min-w-[180px] border border-gray-100">
                  <a href={link.subHref} className="block px-5 py-3 text-sm text-[#0B2545] hover:bg-[#0B2545] hover:text-white transition-colors duration-200 font-medium">{link.sub}</a>
                </div>
              )}
            </div>
          ))}
          <a href="/contact" className="ml-4 px-6 py-3 bg-[#C8A96E] text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-[#0B2545] transition-all duration-300">
            Nous contacter
          </a>
        </nav>

        {/* Burger */}
        <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {[0, 1, 2].map((i) => (<span key={i} className={`block w-6 h-0.5 ${scrolled ? "bg-[#0B2545]" : "bg-white"}`} />))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0B2545] px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="text-white font-semibold uppercase tracking-wider text-sm">{link.label}</a>
          ))}
          <a href="/contact" className="mt-2 px-6 py-3 bg-[#C8A96E] text-white text-sm font-bold uppercase tracking-wider rounded-lg text-center">Nous contacter</a>
        </div>
      )}
    </header>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
const FOOTER_SERVICES = ["Génie Civil", "Bâtiment & Construction", "Routes & Infrastructures", "Aménagement Urbain", "Travaux Électriques", "Plomberie & Réseaux"];
const FOOTER_NAV = [["Accueil", "/"], ["À propos", "/a-propos"], ["Services", "/services"], ["Projets", "/projets"], ["Carrières", "/carrieres"]];

export function SiteFooter() {
  return (
    <footer className="bg-[#071829] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#C8A96E] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">A</span>
              </div>
              <div>
                <div className="font-black text-xl">AKIBA BTP</div>
                <div className="text-xs text-[#C8A96E] uppercase tracking-widest">Gabon</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bâtisseurs d&apos;ouvrages durables au service du développement gabonais depuis 2006.
            </p>
            <div className="flex gap-3 mt-6">
              {["f", "in", "ig"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 border border-white/20 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400 hover:bg-[#C8A96E] hover:border-[#C8A96E] hover:text-white transition-all duration-300">{s}</a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">Navigation</h4>
            <ul className="space-y-3">
              {FOOTER_NAV.map(([label, href]) => (
                <li key={label}><a href={href} className="text-gray-400 hover:text-[#C8A96E] transition-colors text-sm">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">Nos services</h4>
            <ul className="space-y-3">
              {FOOTER_SERVICES.map((s) => (
                <li key={s}><a href="/services" className="text-gray-400 hover:text-[#C8A96E] transition-colors text-sm">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3"><span className="text-[#C8A96E]">📍</span><span>Boulevard Triomphal, Libreville, Gabon</span></li>
              <li className="flex gap-3"><span className="text-[#C8A96E]">📞</span><a href="tel:+24101000000" className="hover:text-white transition-colors">+241 01 00 00 00</a></li>
              <li className="flex gap-3"><span className="text-[#C8A96E]">✉️</span><a href="mailto:contact@akibabtp.ga" className="hover:text-white transition-colors">contact@akibabtp.ga</a></li>
              <li className="flex gap-3"><span className="text-[#C8A96E]">🕐</span><span>Lun–Ven : 07h30 – 17h00</span></li>
            </ul>
            <a href="/contact" className="mt-6 inline-block px-6 py-3 bg-[#C8A96E] text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:text-[#0B2545] transition-all duration-300">
              Nous écrire →
            </a>
          </div>
        </div>

        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2024 AKIBA BTP Gabon. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#C8A96E] transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-[#C8A96E] transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// CTA BANNER
// ─────────────────────────────────────────────
export function CtaBanner({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  color = "gold",
}: {
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  color?: "gold" | "navy";
}) {
  const isGold = color === "gold";
  return (
    <section className={`py-20 ${isGold ? "bg-[#C8A96E]" : "bg-[#0B2545]"}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">{title}</h2>
          {subtitle && <p className={`mt-4 text-lg ${isGold ? "text-white/80" : "text-blue-200"}`}>{subtitle}</p>}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a href={primaryHref}
              className={`px-8 py-4 font-black uppercase tracking-wider rounded-lg transition-all duration-300 ${isGold ? "bg-white text-[#0B2545] hover:bg-[#0B2545] hover:text-white" : "bg-[#C8A96E] text-white hover:bg-white hover:text-[#0B2545]"}`}
            >
              {primaryLabel}
            </a>
            {secondaryLabel && secondaryHref && (
              <a href={secondaryHref}
                className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:text-[#0B2545] transition-all duration-300"
              >
                {secondaryLabel}
              </a>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export const GLOBAL_STYLE = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');`;
