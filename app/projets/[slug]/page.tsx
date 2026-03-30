"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
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

function AnimatedParagraph({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.05);
  return (
    <div ref={ref} className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function AnimatedFromLeft({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.05);
  return (
    <div ref={ref} className={`transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function AnimatedFromRight({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.05);
  return (
    <div ref={ref} className={`transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── DATA (same as projects-page, ideally from shared lib) ───────────────────
const NAV_LINKS = [
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services", sub: "Nos engagements", subHref: "/services#engagements" },
  { label: "Projets", href: "/projets", sub: "Actualités", subHref: "/projets#actualites" },
  { label: "Carrières", href: "/carrieres" },
];

// Mock: in real app use params.slug to fetch from data/API
const PROJECT = {
  slug: "pont-de-ntoum",
  title: "Pont de Ntoum",
  category: "Génie Civil",
  location: "Ntoum, Estuaire",
  year: "2023",
  duration: "18 mois",
  budget: "4,2 Mds FCFA",
  surface: "320 ml",
  client: "Ministère des Travaux Publics",
  status: "Livré",
  description: `Le Pont de Ntoum est l'un des ouvrages les plus emblématiques réalisés par AKIBA BTP. Franchissant la rivière Ntoum sur 320 mètres linéaires, ce pont en béton précontraint représente une avancée majeure pour la mobilité dans la province de l'Estuaire.

Le chantier a débuté en janvier 2022 après une phase d'études géotechniques approfondies révélant des sols complexes nécessitant la mise en place de fondations profondes sur pieux forés. Trente-deux pieux de 1,20 mètre de diamètre ont été réalisés jusqu'à une profondeur de 28 mètres pour garantir la stabilité de l'ouvrage.

Le tablier en béton précontraint de 320 mètres a été coulé par plots successifs de 40 mètres, selon une méthode de construction sur cintre autolanceur permettant de minimiser l'impact sur la navigation fluviale. Au total, 8 500 tonnes de béton et 950 tonnes d'acier de précontrainte ont été mis en œuvre.

La livraison de l'ouvrage en juillet 2023 a permis de réduire de 45 minutes le trajet entre Libreville et Ntoum en supprimant le bac qui assurait auparavant la traversée. Le pont est dimensionné pour supporter le trafic lourd (convois de 80 tonnes) et est équipé d'un éclairage LED solaire et d'un système de surveillance structurale en temps réel.`,
  gallery: [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=90",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=90",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=90",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=90",
    "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1400&q=90",
    "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1400&q=90",
  ],
  stats: [
    { label: "Durée des travaux", value: "18 mois" },
    { label: "Budget", value: "4,2 Mds FCFA" },
    { label: "Longueur", value: "320 ml" },
    { label: "Béton mis en œuvre", value: "8 500 t" },
    { label: "Pieux forés", value: "32" },
    { label: "Acier précontrainte", value: "950 t" },
  ],
  relatedProjects: [
    { slug: "route-nationale-n1", title: "Route Nationale N1", category: "Routes & Infrastructures", cover: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80" },
    { slug: "complexe-ministeriel-libreville", title: "Complexe Ministériel", category: "Bâtiment & Construction", cover: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80" },
    { slug: "hopital-oyem", title: "Hôpital Régional d'Oyem", category: "Bâtiment & Construction", cover: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80" },
  ],
};

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={onClose}>
      {/* Close */}
      <button className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10" onClick={onClose}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-semibold">
        {index + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        className="absolute left-4 md:left-8 w-14 h-14 bg-white/10 hover:bg-[#C8A96E] rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 hover:scale-110"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image */}
      <div className="w-full max-w-5xl mx-16 max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[index]} alt={`Photo ${index + 1}`} className="w-full h-full object-contain rounded-xl max-h-[85vh]" />
      </div>

      {/* Next */}
      <button
        className="absolute right-4 md:right-8 w-14 h-14 bg-white/10 hover:bg-[#C8A96E] rounded-full flex items-center justify-center text-white transition-all duration-300 z-10 hover:scale-110"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Thumbnails */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((img, i) => (
          <button key={i} onClick={(e) => { e.stopPropagation(); }}
            className={`w-12 h-8 rounded overflow-hidden border-2 transition-all duration-200 ${i === index ? "border-[#C8A96E] scale-110" : "border-transparent opacity-50 hover:opacity-80"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hero slider
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroTransitioning, setHeroTransitioning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const project = PROJECT;

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 100);
    const t2 = setTimeout(() => setRevealed(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance hero
  useEffect(() => {
    const timer = setInterval(() => { changeHero((heroIndex + 1) % project.gallery.length); }, 5000);
    return () => clearInterval(timer);
  }, [heroIndex, project.gallery.length]);

  const changeHero = useCallback((newIndex: number) => {
    if (heroTransitioning) return;
    setHeroTransitioning(true);
    setTimeout(() => {
      setHeroIndex(newIndex);
      setHeroTransitioning(false);
    }, 400);
  }, [heroTransitioning]);

  const heroPrev = () => changeHero((heroIndex - 1 + project.gallery.length) % project.gallery.length);
  const heroNext = () => changeHero((heroIndex + 1) % project.gallery.length);

  const openLightbox = (i: number) => { setLightboxIndex(i); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const lbPrev = () => setLightboxIndex((i) => (i - 1 + project.gallery.length) % project.gallery.length);
  const lbNext = () => setLightboxIndex((i) => (i + 1) % project.gallery.length);

  return (
    <main className="font-['Outfit',sans-serif] bg-white text-[#0B2545] overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#0B2545] rounded-lg flex items-center justify-center group-hover:bg-[#C8A96E] transition-colors duration-300">
              <span className="text-white font-black text-lg">A</span>
            </div>
            <div>
              <span className={`font-black text-xl tracking-tight transition-colors duration-300 ${scrolled ? "text-[#0B2545]" : "text-white"}`}>AKIBA BTP</span>
              <div className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${scrolled ? "text-[#C8A96E]" : "text-blue-200"}`}>Gabon</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative"
                onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a href={link.href} className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-[#C8A96E] ${scrolled ? "text-[#0B2545]" : "text-white"} ${link.label === "Projets" ? "text-[#C8A96E]" : ""}`}>
                  {link.label}
                </a>
                {link.sub && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-3 bg-white rounded-xl shadow-2xl py-2 min-w-[180px] border border-gray-100">
                    <a href={link.subHref} className="block px-5 py-3 text-sm text-[#0B2545] hover:bg-[#0B2545] hover:text-white transition-colors duration-200 font-medium">{link.sub}</a>
                  </div>
                )}
              </div>
            ))}
            <a href="/contact" className="ml-4 px-6 py-3 bg-[#C8A96E] text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-[#0B2545] transition-all duration-300">Nous contacter</a>
          </nav>
          <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {[0, 1, 2].map((i) => (<span key={i} className={`block w-6 h-0.5 ${scrolled ? "bg-[#0B2545]" : "bg-white"}`} />))}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-[#0B2545] px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (<a key={link.label} href={link.href} className="text-white font-semibold uppercase tracking-wider text-sm">{link.label}</a>))}
            <a href="/contact" className="mt-2 px-6 py-3 bg-[#C8A96E] text-white text-sm font-bold uppercase tracking-wider rounded-lg text-center">Nous contacter</a>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════
          HERO SLIDER — IMAGES DE LA GALERIE
      ══════════════════════════════════════════ */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* Volets révélation au chargement */}
        <div className={`absolute inset-x-0 top-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-top ${revealed ? "h-0" : "h-1/2"}`} />
        <div className={`absolute inset-x-0 bottom-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-bottom ${revealed ? "h-0" : "h-1/2"}`} />

        {/* Images slider */}
        {project.gallery.map((img, i) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-700 ${i === heroIndex ? (heroTransitioning ? "opacity-0" : "opacity-100") : "opacity-0"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={`${project.title} — photo ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0B2545]/30 to-[#0B2545]/10 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545]/50 to-transparent z-10" />

        {/* Contenu hero */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-20 px-6 md:px-16">
          <div className={`max-w-3xl transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest mb-6">
              <a href="/" className="hover:text-[#C8A96E] transition-colors">Accueil</a>
              <span>/</span>
              <a href="/projets" className="hover:text-[#C8A96E] transition-colors">Projets</a>
              <span>/</span>
              <span className="text-[#C8A96E]">{project.title}</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">{project.category} · {project.location}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">{project.title}</h1>
            <div className="mt-5 flex flex-wrap gap-4">
              <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${project.status === "Livré" ? "bg-green-500 text-white" : "bg-[#C8A96E] text-white"}`}>
                {project.status}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-white/10 text-white backdrop-blur-sm">{project.year}</span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-white/10 text-white backdrop-blur-sm">{project.client}</span>
            </div>
          </div>
        </div>

        {/* Flèche GAUCHE */}
        <button
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/10 hover:bg-[#C8A96E] rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm hover:scale-110"
          onClick={heroPrev}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Flèche DROITE */}
        <button
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/10 hover:bg-[#C8A96E] rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm hover:scale-110"
          onClick={heroNext}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicateurs slider */}
        <div className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-end gap-2">
          <div className="text-white/50 text-xs uppercase tracking-widest mb-1">
            {String(heroIndex + 1).padStart(2, "0")} / {String(project.gallery.length).padStart(2, "0")}
          </div>
          <div className="flex gap-2">
            {project.gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => changeHero(i)}
                className={`transition-all duration-300 rounded-full ${i === heroIndex ? "w-8 h-2 bg-[#C8A96E]" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </div>

        {/* Barre de progression */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-10">
          <div
            className="h-full bg-[#C8A96E] transition-all duration-300"
            style={{ width: `${((heroIndex + 1) / project.gallery.length) * 100}%` }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATISTIQUES DU PROJET
      ══════════════════════════════════════════ */}
      <section className="bg-[#0B2545] py-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-white/10">
            {project.stats.map((stat, i) => (
              <AnimatedParagraph key={stat.label} delay={i * 80}>
                <div className="py-8 px-6 text-center group hover:bg-white/5 transition-colors duration-300">
                  <div className="text-2xl md:text-3xl font-black text-white group-hover:text-[#C8A96E] transition-colors duration-300 leading-none">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-blue-300 font-medium">{stat.label}</div>
                </div>
              </AnimatedParagraph>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DESCRIPTION & INFOS PROJET
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">

            {/* Description longue */}
            <div className="lg:col-span-2">
              <AnimatedParagraph>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-0.5 bg-[#C8A96E]" />
                  <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Description du projet</span>
                </div>
                <h2 className="text-4xl font-black text-[#0B2545] leading-tight mb-8">
                  {project.title}
                </h2>
              </AnimatedParagraph>

              {project.description.split("\n\n").map((paragraph, i) => (
                <AnimatedParagraph key={i} delay={i * 120} className="mb-6">
                  <p className="text-gray-600 leading-relaxed text-lg">{paragraph}</p>
                </AnimatedParagraph>
              ))}
            </div>

            {/* Fiche technique */}
            <AnimatedFromRight delay={200}>
              <div className="lg:sticky lg:top-28">
                <div className="bg-[#F7F9FC] rounded-2xl p-8 border border-gray-100">
                  <h3 className="font-black text-[#0B2545] text-lg mb-6 pb-4 border-b border-gray-200">Fiche technique</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Maître d'ouvrage", value: project.client },
                      { label: "Catégorie", value: project.category },
                      { label: "Localisation", value: project.location },
                      { label: "Année de livraison", value: project.year },
                      { label: "Durée des travaux", value: project.duration },
                      { label: "Budget", value: project.budget },
                      { label: "Surface / Emprise", value: project.surface },
                      { label: "Statut", value: project.status },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-400 text-sm">{item.label}</span>
                        <span className="font-bold text-[#0B2545] text-sm text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="/contact"
                    className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#0B2545] text-white font-bold uppercase tracking-wider rounded-xl hover:bg-[#C8A96E] transition-all duration-300 text-sm group"
                  >
                    Projet similaire ?
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </AnimatedFromRight>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GALERIE PHOTOS (GRILLE CLIQUABLE)
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedParagraph>
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-0.5 bg-[#C8A96E]" />
                  <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Galerie</span>
                </div>
                <h2 className="text-3xl font-black text-[#0B2545]">Photos du chantier.</h2>
              </div>
              <span className="text-gray-400 text-sm">{project.gallery.length} photos · cliquer pour agrandir</span>
            </div>
          </AnimatedParagraph>

          {/* Grille masonry-like */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.gallery.map((img, i) => (
              <AnimatedParagraph key={img} delay={i * 60}>
                <div
                  className={`group relative overflow-hidden rounded-xl cursor-zoom-in ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                  onClick={() => openLightbox(i)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${project.title} — photo ${i + 1}`}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i === 0 ? "h-80 md:h-full md:min-h-[400px]" : "h-48 md:h-52"}`}
                  />
                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-[#0B2545]/0 group-hover:bg-[#0B2545]/40 transition-all duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                      <svg className="w-5 h-5 text-[#0B2545]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                  {/* Numéro */}
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </AnimatedParagraph>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJETS SIMILAIRES
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedParagraph>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Voir aussi</span>
            </div>
            <h2 className="text-3xl font-black text-[#0B2545] mb-10">Autres projets.</h2>
          </AnimatedParagraph>
          <div className="grid md:grid-cols-3 gap-6">
            {project.relatedProjects.map((related, i) => (
              <AnimatedParagraph key={related.slug} delay={i * 100}>
                <a href={`/projets/${related.slug}`} className="group block">
                  <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="h-52 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={related.cover} alt={related.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-5 bg-white">
                      <div className="text-[#C8A96E] text-[10px] font-bold uppercase tracking-widest mb-1.5">{related.category}</div>
                      <h3 className="font-black text-[#0B2545] group-hover:text-[#C8A96E] transition-colors duration-300">{related.title}</h3>
                    </div>
                  </div>
                </a>
              </AnimatedParagraph>
            ))}
          </div>
          <AnimatedParagraph delay={300}>
            <div className="text-center mt-10">
              <a href="/projets" className="inline-flex items-center gap-2 text-[#0B2545] font-bold uppercase tracking-wider text-sm hover:text-[#C8A96E] transition-colors duration-300 group">
                Voir tous les projets
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </AnimatedParagraph>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#C8A96E]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedParagraph>
            <h2 className="text-3xl md:text-4xl font-black text-white">Un projet similaire à réaliser ?</h2>
            <p className="mt-4 text-white/80 text-lg">Partagez votre besoin, nous vous répondons en 72h avec une proposition chiffrée.</p>
            <a href="/contact" className="mt-8 inline-flex items-center gap-3 px-10 py-5 bg-white text-[#0B2545] font-black uppercase tracking-wider rounded-lg hover:bg-[#0B2545] hover:text-white transition-all duration-300 group">
              Demander un devis
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </AnimatedParagraph>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#071829] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#C8A96E] rounded-lg flex items-center justify-center"><span className="text-white font-black text-lg">A</span></div>
                <div><div className="font-black text-xl">AKIBA BTP</div><div className="text-xs text-[#C8A96E] uppercase tracking-widest">Gabon</div></div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">Bâtisseurs d&apos;ouvrages durables au service du développement gabonais depuis 2006.</p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">Navigation</h4>
              <ul className="space-y-3">
                {[["Accueil", "/"], ["À propos", "/a-propos"], ["Services", "/services"], ["Projets", "/projets"], ["Carrières", "/carrieres"]].map(([label, href]) => (
                  <li key={label}><a href={href} className="text-gray-400 hover:text-[#C8A96E] transition-colors text-sm">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">Services</h4>
              <ul className="space-y-3">
                {["Génie Civil", "Bâtiment & Construction", "Routes & Infrastructures", "Aménagement Urbain", "Travaux Électriques", "Plomberie & Réseaux"].map((s) => (
                  <li key={s}><a href="/services" className="text-gray-400 hover:text-[#C8A96E] transition-colors text-sm">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">Contact</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3"><span className="text-[#C8A96E]">📍</span><span>Boulevard Triomphal, Libreville, Gabon</span></li>
                <li className="flex gap-3"><span className="text-[#C8A96E]">📞</span><a href="tel:+24101000000" className="hover:text-white">+241 01 00 00 00</a></li>
                <li className="flex gap-3"><span className="text-[#C8A96E]">✉️</span><a href="mailto:contact@akibabtp.ga" className="hover:text-white">contact@akibabtp.ga</a></li>
              </ul>
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

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && (
        <Lightbox
          images={project.gallery}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={lbPrev}
          onNext={lbNext}
        />
      )}

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');`}</style>
    </main>
  );
}
