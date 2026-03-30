"use client";

import { useEffect, useRef, useState } from "react";

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
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services", sub: "Nos engagements", subHref: "/services#engagements" },
  { label: "Projets", href: "/projets", sub: "Actualités", subHref: "/projets#actualites" },
  { label: "Carrières", href: "/carrieres" },
];

export const PROJECTS = [
  {
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
    description: "Conception et réalisation d'un pont en béton précontraint de 320 mètres linéaires, franchissant la rivière Ntoum. Ouvrage de première importance pour désenclaver la région et réduire les temps de trajet entre Libreville et l'intérieur du pays.",
    cover: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=90",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=90",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=90",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=90",
      "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1200&q=90",
    ],
    featured: true,
  },
  {
    slug: "complexe-ministeriel-libreville",
    title: "Complexe Ministériel",
    category: "Bâtiment & Construction",
    location: "Libreville, Estuaire",
    year: "2022",
    duration: "24 mois",
    budget: "7,8 Mds FCFA",
    surface: "12 500 m²",
    client: "Présidence de la République",
    status: "Livré",
    description: "Construction d'un complexe administratif de 12 500 m² comprenant des bureaux, des salles de conférence, un parking souterrain sur deux niveaux et des espaces verts paysagers. Réalisation en conception-construction avec intégration de systèmes de gestion technique centralisée.",
    cover: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=90",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=90",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=90",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=90",
    ],
    featured: true,
  },
  {
    slug: "route-nationale-n1",
    title: "Route Nationale N1 — Lot 3",
    category: "Routes & Infrastructures",
    location: "Owendo–Ntoum",
    year: "2023",
    duration: "14 mois",
    budget: "5,1 Mds FCFA",
    surface: "42 km",
    client: "Agence Nationale des Grands Travaux",
    status: "Livré",
    description: "Réhabilitation et élargissement de 42 kilomètres de la Route Nationale N1 entre Owendo et Ntoum. Travaux comprenant la reprise de la plateforme, la mise en œuvre d'une nouvelle couche de roulement en enrobé bitumineux, la réfection du drainage et la mise en place d'une signalisation neuve.",
    cover: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=90",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=90",
      "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1200&q=90",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=90",
    ],
    featured: false,
  },
  {
    slug: "residence-oyome",
    title: "Résidence Oyomé",
    category: "Bâtiment & Construction",
    location: "Libreville, Estuaire",
    year: "2022",
    duration: "20 mois",
    budget: "3,4 Mds FCFA",
    surface: "8 200 m²",
    client: "Promoteur privé",
    status: "Livré",
    description: "Construction d'un ensemble résidentiel de standing comprenant 64 logements répartis en 4 bâtiments R+4, une piscine, des espaces verts et un parking en sous-sol. Finitions haut de gamme, menuiseries aluminium et systèmes domotiques intégrés.",
    cover: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=90",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=90",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=90",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=90",
    ],
    featured: false,
  },
  {
    slug: "amenagement-port-gentil",
    title: "Front de Mer — Port-Gentil",
    category: "Aménagement Urbain",
    location: "Port-Gentil, Ogooué-Maritime",
    year: "2021",
    duration: "16 mois",
    budget: "2,9 Mds FCFA",
    surface: "3,2 km",
    client: "Mairie de Port-Gentil",
    status: "Livré",
    description: "Réaménagement complet du front de mer de Port-Gentil sur 3,2 kilomètres : promenade piétonne en bois composite, pistes cyclables, mobilier urbain, éclairage à LED, végétalisation et création de zones de repos et de jeux pour enfants.",
    cover: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=90",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=90",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=90",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=90",
    ],
    featured: false,
  },
  {
    slug: "adduction-eau-franceville",
    title: "Adduction d'Eau — Franceville",
    category: "Plomberie & Réseaux",
    location: "Franceville, Haut-Ogooué",
    year: "2021",
    duration: "12 mois",
    budget: "1,8 Md FCFA",
    surface: "68 km réseau",
    client: "SEEG Gabon",
    status: "Livré",
    description: "Pose de 68 kilomètres de canalisations d'eau potable, construction d'une station de pompage principale et de deux réservoirs surélevés de 500 m³ chacun. Le projet a permis l'alimentation en eau potable de 35 000 habitants supplémentaires dans les quartiers périphériques de Franceville.",
    cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=90",
      "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1200&q=90",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=90",
    ],
    featured: false,
  },
  {
    slug: "eclairage-public-libreville",
    title: "Éclairage Public — Libreville",
    category: "Travaux Électriques",
    location: "Libreville, Estuaire",
    year: "2020",
    duration: "10 mois",
    budget: "1,2 Md FCFA",
    surface: "120 km voirie",
    client: "Mairie de Libreville",
    status: "Livré",
    description: "Installation de 4 200 candélabres LED sur 120 kilomètres de voirie librévilloise. Remplacement du parc d'éclairage vétuste par des équipements basse consommation télécommandés, permettant une réduction de 65 % de la facture énergétique de la ville.",
    cover: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&q=90",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=90",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=90",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=90",
    ],
    featured: false,
  },
  {
    slug: "hopital-oyem",
    title: "Hôpital Régional d'Oyem",
    category: "Bâtiment & Construction",
    location: "Oyem, Woleu-Ntem",
    year: "2024",
    duration: "28 mois",
    budget: "9,5 Mds FCFA",
    surface: "18 000 m²",
    client: "Ministère de la Santé",
    status: "En cours",
    description: "Construction d'un hôpital régional de référence de 250 lits sur 18 000 m². Projet comprenant un bloc opératoire de 6 salles, un service d'urgences, une unité de soins intensifs, un laboratoire et des bâtiments d'hospitalisation. Mise aux normes OMS et intégration de panneaux solaires pour l'autonomie énergétique.",
    cover: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200&q=90",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=90",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=90",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=90",
    ],
    featured: true,
  },
];

const CATEGORIES = ["Tous", "Génie Civil", "Bâtiment & Construction", "Routes & Infrastructures", "Aménagement Urbain", "Travaux Électriques", "Plomberie & Réseaux"];

const NEWS = [
  { date: "15 Mars 2024", title: "AKIBA BTP remporte l'appel d'offres pour la construction du nouveau lycée de Mouila", category: "Contrats", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80" },
  { date: "02 Février 2024", title: "L'hôpital d'Oyem : avancement des travaux à 65% — livraison prévue pour décembre 2024", category: "Chantier", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" },
  { date: "18 Janvier 2024", title: "AKIBA BTP obtient la certification ISO 45001 pour la santé et sécurité au travail", category: "Certification", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80" },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Tous");

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

  const filtered = activeCategory === "Tous"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const featured = PROJECTS.filter((p) => p.featured);

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
            {[0, 1, 2].map((i) => (<span key={i} className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-[#0B2545]" : "bg-white"}`} />))}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-[#0B2545] px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (<a key={link.label} href={link.href} className="text-white font-semibold uppercase tracking-wider text-sm">{link.label}</a>))}
            <a href="/contact" className="mt-2 px-6 py-3 bg-[#C8A96E] text-white text-sm font-bold uppercase tracking-wider rounded-lg text-center">Nous contacter</a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
        <div className={`absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${revealed ? "scale-100" : "scale-110"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80" alt="Projets AKIBA BTP" className="w-full h-full object-cover" />
        </div>
        <div className={`absolute inset-x-0 top-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-top ${revealed ? "h-0" : "h-1/2"}`} />
        <div className={`absolute inset-x-0 bottom-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-bottom ${revealed ? "h-0" : "h-1/2"}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/85 via-[#0B2545]/40 to-[#0B2545]/20 z-10" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-20 px-6 text-center">
          <div className={`transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">Nos Projets</h1>
            <p className="mt-5 text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
              Des ouvrages qui témoignent de notre savoir-faire et de notre engagement.
            </p>
            {/* <div className="mt-6 flex flex-wrap justify-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-2"><span className="text-[#C8A96E] font-black text-xl">320+</span> projets réalisés</span>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-2"><span className="text-[#C8A96E] font-black text-xl">6</span> corps de métier</span>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-2"><span className="text-[#C8A96E] font-black text-xl">12</span> villes au Gabon</span>
            </div> */}
          </div>
        </div>
        <div className={`absolute top-28 left-6 md:left-12 z-10 transition-all duration-700 delay-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest">
            <a href="/" className="hover:text-[#C8A96E] transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-[#C8A96E]">Projets</span>
          </div>
        </div>
      </section>

      {/* ── PROJETS PHARES ── */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedParagraph>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">À la une</span>
            </div>
            <h2 className="text-4xl font-black text-[#0B2545] mb-12">Projets phares.</h2>
          </AnimatedParagraph>
          <div className="grid lg:grid-cols-3 gap-6">
            {featured.map((project, i) => (
              <AnimatedParagraph key={project.slug} delay={i * 100}>
                <a href={`/projets/${project.slug}`} className="group block relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-72 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.cover} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0B2545]/30 to-transparent" />
                    {/* Badge statut */}
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${project.status === "Livré" ? "bg-green-500 text-white" : "bg-[#C8A96E] text-white"}`}>
                      {project.status}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-[#C8A96E] text-xs font-semibold uppercase tracking-widest mb-2">{project.category} · {project.location}</div>
                      <h3 className="text-xl font-black text-white leading-tight">{project.title}</h3>
                      <div className="mt-3 flex items-center gap-2 text-white/60 text-sm">
                        <span>{project.year}</span>
                        <span>·</span>
                        <span>{project.duration}</span>
                        <span>·</span>
                        <span>{project.budget}</span>
                      </div>
                    </div>
                  </div>
                  {/* Flèche hover */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white/0 group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <svg className="w-4 h-4 text-[#0B2545]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </a>
              </AnimatedParagraph>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRILLE TOUS PROJETS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedParagraph>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-0.5 bg-[#C8A96E]" />
                  <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Toutes nos réalisations</span>
                </div>
                <h2 className="text-4xl font-black text-[#0B2545]">Explorer nos projets.</h2>
              </div>
              <p className="text-gray-400 text-sm">{filtered.length} projet{filtered.length > 1 ? "s" : ""}</p>
            </div>
          </AnimatedParagraph>

          {/* Filtres catégories */}
          <AnimatedParagraph delay={100}>
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-[#0B2545] text-white"
                      : "bg-[#F7F9FC] text-gray-500 hover:bg-[#0B2545]/10 hover:text-[#0B2545]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedParagraph>

          {/* Grille projets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((project, i) => (
              <AnimatedParagraph key={project.slug} delay={i * 60}>
                <a href={`/projets/${project.slug}`} className="group block">
                  <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="relative h-56 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={project.cover} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Badge statut */}
                      <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${project.status === "Livré" ? "bg-green-500 text-white" : "bg-[#C8A96E] text-white"}`}>
                        {project.status}
                      </div>
                      {/* Overlay hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-[#0B2545]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Info bas de carte */}
                    <div className="p-4 bg-white">
                      <div className="text-[#C8A96E] text-[10px] font-bold uppercase tracking-widest mb-1.5">{project.category}</div>
                      <h3 className="font-black text-[#0B2545] text-sm leading-tight group-hover:text-[#C8A96E] transition-colors duration-300">{project.title}</h3>
                      <div className="mt-2 flex items-center justify-between text-gray-400 text-[11px]">
                        <span>{project.location}</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </AnimatedParagraph>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTUALITÉS ── */}
      {/* <section id="actualites" className="py-24 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedParagraph>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Actualités</span>
            </div>
            <h2 className="text-4xl font-black text-[#0B2545] mb-12">Dernières nouvelles.</h2>
          </AnimatedParagraph>
          <div className="grid md:grid-cols-3 gap-6">
            {NEWS.map((item, i) => (
              <AnimatedParagraph key={item.title} delay={i * 100}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer">
                  <div className="relative h-48 overflow-hidden"> */}


                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {/* <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-[#C8A96E] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{item.date}</p>
                    <h3 className="font-black text-[#0B2545] leading-snug group-hover:text-[#C8A96E] transition-colors duration-300">{item.title}</h3>
                    <div className="mt-4 flex items-center gap-2 text-[#C8A96E] text-xs font-bold uppercase tracking-wider">
                      Lire la suite
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </AnimatedParagraph>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── CTA ── */}
      <section className="py-20 bg-[#C8A96E]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedParagraph>
            <h2 className="text-3xl md:text-4xl font-black text-white">Vous avez un projet à réaliser ?</h2>
            <p className="mt-4 text-white/80 text-lg">Notre équipe étudie votre dossier et vous propose une offre en 72h.</p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a href="/contact" className="px-8 py-4 bg-white text-[#0B2545] font-black uppercase tracking-wider rounded-lg hover:bg-[#0B2545] hover:text-white transition-all duration-300">Nous contacter</a>
              <a href="/services" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:text-[#0B2545] transition-all duration-300">Nos services</a>
            </div>
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
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">Projets récents</h4>
              <ul className="space-y-3">
                {PROJECTS.slice(0, 5).map((p) => (
                  <li key={p.slug}><a href={`/projets/${p.slug}`} className="text-gray-400 hover:text-[#C8A96E] transition-colors text-sm">{p.title}</a></li>
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

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');`}</style>
    </main>
  );
}
