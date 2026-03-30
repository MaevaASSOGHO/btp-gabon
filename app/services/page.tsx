"use client";

import { useEffect, useRef, useState } from "react";

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
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

function AnimatedParagraph({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);
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

function AnimatedFromLeft({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);
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

function AnimatedFromRight({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);
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

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services", sub: "Nos engagements", subHref: "/services#engagements" },
  { label: "Projets", href: "/projets", sub: "Actualités", subHref: "/projets#actualites" },
  { label: "Carrières", href: "/carrieres" },
];

const SERVICES = [
  {
    id: "genie-civil",
    number: "01",
    title: "Génie Civil",
    tagline: "Les fondations de tout grand projet.",
    description:
      "Notre département Génie Civil maîtrise l'ensemble du spectre des ouvrages structurels. Des études de sol à la livraison finale, nous concevons et réalisons des structures qui s'inscrivent dans le temps.",
    details: [
      "Fondations spéciales et pieux forés",
      "Structures béton armé et précontraint",
      "Ouvrages d'art : ponts, passerelles, viaducs",
      "Soutènements et terrassements complexes",
      "Réhabilitation et renforcement d'ouvrages existants",
      "Études de sol et ingénierie géotechnique",
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
    accent: "#1a3a5c",
  },
  {
    id: "batiment",
    number: "02",
    title: "Bâtiment & Construction",
    tagline: "Des espaces pensés pour durer et inspirer.",
    description:
      "De la villa individuelle aux complexes commerciaux, AKIBA BTP construit avec la même exigence. Nous intervenons en conception-réalisation ou en entreprise générale sur des projets de toute envergure.",
    details: [
      "Construction neuve résidentielle et commerciale",
      "Immeubles de bureaux et complexes industriels",
      "Hôtels, hôpitaux et bâtiments institutionnels",
      "Réhabilitation et rénovation lourde",
      "Façades et enveloppe du bâtiment",
      "Second œuvre, finitions et aménagements intérieurs",
    ],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
    accent: "#0B2545",
  },
  {
    id: "routes",
    number: "03",
    title: "Routes & Infrastructures",
    tagline: "Connecter les hommes et les territoires.",
    description:
      "Axes routiers nationaux, pistes de desserte rurale, échangeurs urbains — AKIBA BTP dispose du parc matériel et du savoir-faire pour réaliser tous vos projets de voirie, quelle qu'en soit la complexité.",
    details: [
      "Routes nationales, départementales et communales",
      "Pistes de desserte agricole et forestière",
      "Aménagement d'échangeurs et carrefours",
      "Signalisation horizontale et verticale",
      "Drainage et assainissement routier",
      "Entretien et réfection de chaussées",
    ],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=900&q=80",
    accent: "#1a3a5c",
  },
  {
    id: "amenagement",
    number: "04",
    title: "Aménagement Urbain",
    tagline: "Dessiner la ville de demain.",
    description:
      "Nos équipes d'aménagement urbain collaborent avec les collectivités et les promoteurs pour créer des espaces publics vivants, fonctionnels et esthétiques, en harmonie avec leur environnement.",
    details: [
      "Places publiques et espaces piétonniers",
      "Parcs, jardins et espaces verts",
      "Mobilier urbain et éclairage public",
      "Aménagement de berges et fronts de mer",
      "Zones d'activité et parcs industriels",
      "Revêtements décoratifs et pavages",
    ],
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80",
    accent: "#0B2545",
  },
  {
    id: "electrique",
    number: "05",
    title: "Travaux Électriques",
    tagline: "L'énergie au service du développement.",
    description:
      "Notre division électrique intervient sur l'ensemble de la chaîne, de la production à la distribution finale. Nous réalisons des installations conformes aux normes internationales et aux exigences du réseau gabonais.",
    details: [
      "Lignes haute et basse tension",
      "Postes de transformation et tableaux électriques",
      "Éclairage public et balisage",
      "Installations industrielles et tertiaires",
      "Groupes électrogènes et énergie de secours",
      "Systèmes photovoltaïques et énergies renouvelables",
    ],
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=900&q=80",
    accent: "#1a3a5c",
  },
  {
    id: "plomberie",
    number: "06",
    title: "Plomberie & Réseaux",
    tagline: "L'eau, ressource vitale, entre de bonnes mains.",
    description:
      "Adduction d'eau potable, réseaux d'assainissement, stations de pompage — AKIBA BTP maîtrise l'ensemble des travaux hydrauliques et de génie des réseaux pour les projets publics et privés.",
    details: [
      "Réseaux d'adduction d'eau potable",
      "Assainissement collectif et individuel",
      "Stations de pompage et châteaux d'eau",
      "Réseaux de distribution et branchements",
      "Forage et équipement de puits",
      "Plomberie sanitaire tous bâtiments",
    ],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    accent: "#0B2545",
  },
];

const PROCESS = [
  { step: "01", title: "Étude & devis", desc: "Analyse de vos besoins, visite de site, étude de faisabilité et remise d'une offre détaillée sous 72h." },
  { step: "02", title: "Conception", desc: "Plans d'exécution, études techniques, validation avec le maître d'ouvrage et obtention des autorisations." },
  { step: "03", title: "Réalisation", desc: "Mise en œuvre par nos équipes qualifiées avec suivi quotidien et reporting hebdomadaire au client." },
  { step: "04", title: "Contrôle qualité", desc: "Tests, vérifications et inspections à chaque phase clé pour garantir la conformité aux normes." },
  { step: "05", title: "Livraison", desc: "Réception officielle des travaux, remise des DOE et garantie de parfait achèvement d'un an." },
];

const ENGAGEMENTS = [
  { icon: "🏆", title: "Certifications ISO", desc: "ISO 9001 · 14001 · 45001 — notre triple certification atteste de notre engagement qualité, environnemental et sécurité." },
  { icon: "🌱", title: "Construction durable", desc: "Matériaux éco-responsables, gestion des déchets de chantier et réduction de notre empreinte carbone à chaque projet." },
  { icon: "🤝", title: "Sous-traitants locaux", desc: "Nous privilégions le tissu économique local en faisant appel à des entreprises gabonaises pour nos lots de sous-traitance." },
  { icon: "🛡", title: "Garantie décennale", desc: "Tous nos ouvrages bénéficient d'une garantie décennale conforme au droit gabonais de la construction." },
  { icon: "📋", title: "Traçabilité totale", desc: "Chaque chantier fait l'objet d'un journal de bord numérique consultable par le client en temps réel." },
  { icon: "⏱", title: "Délais garantis", desc: "Nos pénalités de retard contractuelles témoignent de notre confiance absolue en nos plannings de production." },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeService, setActiveService] = useState(0);

  const processSection = useInView(0.1);
  const engagementsSection = useInView(0.1);

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

  return (
    <main className="font-['Outfit',sans-serif] bg-white text-[#0B2545] overflow-x-hidden">

      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
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
                <a href={link.href}
                  className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-[#C8A96E] ${scrolled ? "text-[#0B2545]" : "text-white"} ${link.label === "Services" ? "text-[#C8A96E]" : ""}`}
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

          <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {[0, 1, 2].map((i) => (
              <span key={i} className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-[#0B2545]" : "bg-white"}`} />
            ))}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-[#0B2545] px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="text-white font-semibold uppercase tracking-wider text-sm">{link.label}</a>
            ))}
            <a href="/contact" className="mt-2 px-6 py-3 bg-[#C8A96E] text-white text-sm font-bold uppercase tracking-wider rounded-lg text-center">Nous contacter</a>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════
          HERO — PHOTO + REVEAL
      ══════════════════════════════════════════ */}
      <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
        <div className={`absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${revealed ? "scale-100" : "scale-110"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80"
            alt="Nos services AKIBA BTP"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Volets révélation */}
        <div className={`absolute inset-x-0 top-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-top ${revealed ? "h-0" : "h-1/2"}`} />
        <div className={`absolute inset-x-0 bottom-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-bottom ${revealed ? "h-0" : "h-1/2"}`} />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/85 via-[#0B2545]/40 to-[#0B2545]/20 z-10" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-20 px-6 text-center">
          <div className={`transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
              Nos Services
            </h1>
            <p className="mt-5 text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
              Des ouvrages réalisés avec excellence pour les générations futures.
            </p>
            {/* Ancres rapides */}
            {/* <div className="mt-8 flex flex-wrap justify-center gap-3">
              {SERVICES.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-4 py-2 border border-white/30 rounded-full text-white/80 text-xs font-semibold uppercase tracking-wider hover:border-[#C8A96E] hover:text-[#C8A96E] transition-all duration-300"
                >
                  {s.title}
                </a>
              ))}
            </div> */}
          </div>
        </div>

        <div className={`absolute top-28 left-6 md:left-12 z-10 transition-all duration-700 delay-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest">
            <a href="/" className="hover:text-[#C8A96E] transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-[#C8A96E]">Services</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INTRO — NAVIGATION SERVICES (TABS)
      ══════════════════════════════════════════ */}
      <section className="sticky top-[64px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {SERVICES.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActiveService(i)}
                className={`flex-none px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all duration-300 whitespace-nowrap ${
                  activeService === i
                    ? "border-[#C8A96E] text-[#C8A96E]"
                    : "border-transparent text-gray-400 hover:text-[#0B2545]"
                }`}
              >
                <span className="text-[#C8A96E] mr-2 opacity-60">{s.number}</span>
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES — ALTERNANCE GAUCHE / DROITE
      ══════════════════════════════════════════ */}
      {SERVICES.map((service, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={service.id}
            id={service.id}
            className={`py-28 ${isEven ? "bg-white" : "bg-[#F7F9FC]"} overflow-hidden`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? "lg:flex lg:flex-row-reverse" : ""}`}>

                {/* Image */}
                <AnimatedFromLeft delay={0} className={!isEven ? "lg:order-2" : ""}>
                  <div className="relative group">
                    {/* Numéro décoratif */}
                    <div className="absolute -top-8 -left-4 text-[120px] font-black text-[#0B2545]/5 leading-none select-none z-0 pointer-events-none">
                      {service.number}
                    </div>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl z-10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/50 to-transparent" />
                      {/* Tag numéro sur l'image */}
                      <div className="absolute top-6 left-6 bg-[#C8A96E] text-white px-4 py-2 rounded-lg">
                        <span className="font-black text-sm">{service.number}</span>
                      </div>
                    </div>
                    {/* Décoration coin */}
                    <div className={`absolute -bottom-4 ${isEven ? "-right-4" : "-left-4"} w-24 h-24 border-2 border-[#C8A96E]/20 rounded-xl -z-10`} />
                  </div>
                </AnimatedFromLeft>

                {/* Texte */}
                <AnimatedFromRight delay={150} className={!isEven ? "lg:order-1" : ""}>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-0.5 bg-[#C8A96E]" />
                      <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">
                        {service.number} — Expertise
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#0B2545] leading-tight">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-xl font-medium text-gray-400 italic">
                      {service.tagline}
                    </p>
                    <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                      {service.description}
                    </p>

                    {/* Liste des prestations */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.details.map((detail, di) => (
                        <AnimatedParagraph key={detail} delay={di * 60}>
                          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#0B2545]/5 transition-colors duration-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] mt-2 flex-none" />
                            <span className="text-sm text-gray-600 leading-relaxed">{detail}</span>
                          </div>
                        </AnimatedParagraph>
                      ))}
                    </div>

                    <AnimatedParagraph delay={400}>
                      <div className="mt-10 flex flex-wrap gap-4">
                        <a
                          href="/contact"
                          className="inline-flex items-center gap-3 px-8 py-4 bg-[#0B2545] text-white font-bold uppercase tracking-wider rounded-lg hover:bg-[#C8A96E] transition-all duration-300 group text-sm"
                        >
                          Demander un devis
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                        <a
                          href="/projets"
                          className="inline-flex items-center gap-2 px-8 py-4 border border-gray-200 text-[#0B2545] font-bold uppercase tracking-wider rounded-lg hover:border-[#C8A96E] hover:text-[#C8A96E] transition-all duration-300 text-sm"
                        >
                          Voir les projets
                        </a>
                      </div>
                    </AnimatedParagraph>
                  </div>
                </AnimatedFromRight>
              </div>
            </div>
          </section>
        );
      })}

      {/* ══════════════════════════════════════════
          NOTRE PROCESSUS
      ══════════════════════════════════════════ */}
      <section ref={processSection.ref} className="py-28 bg-[#0B2545] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] border border-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 border border-white/5 rounded-full -translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedParagraph>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
                <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Comment ça marche</span>
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Notre processus,
                <br />
                étape par étape.
              </h2>
              <p className="mt-5 text-blue-200 leading-relaxed">
                De la première prise de contact à la livraison de votre ouvrage,
                nous vous accompagnons avec rigueur et transparence à chaque
                étape du projet.
              </p>
            </div>
          </AnimatedParagraph>

          {/* Étapes avec ligne de connexion */}
          <div className="relative">
            {/* Ligne horizontale desktop */}
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-white/10" style={{ top: "40px" }} />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {PROCESS.map((step, i) => (
                <AnimatedParagraph key={step.step} delay={i * 120}>
                  <div className="flex flex-col items-center text-center group">
                    {/* Cercle numéro */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center bg-[#0B2545] group-hover:border-[#C8A96E] transition-all duration-500 group-hover:scale-110">
                        <span className="text-2xl font-black text-white/40 group-hover:text-[#C8A96E] transition-colors duration-500">{step.step}</span>
                      </div>
                      {/* Dot central */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[#C8A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100 transform" />
                      </div>
                    </div>
                    <h3 className="font-black text-white text-lg mb-3">{step.title}</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </AnimatedParagraph>
              ))}
            </div>
          </div>

          {/* CTA */}
          <AnimatedParagraph delay={600}>
            <div className="text-center mt-16">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#C8A96E] text-white font-black uppercase tracking-wider rounded-lg text-sm hover:bg-white hover:text-[#0B2545] transition-all duration-300 hover:shadow-2xl group"
              >
                Démarrer mon projet
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </AnimatedParagraph>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NOS ENGAGEMENTS
      ══════════════════════════════════════════ */}
      <section id="engagements" ref={engagementsSection.ref} className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedParagraph>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
                <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Nos engagements</span>
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0B2545] leading-tight">
                La qualité n&apos;est pas
                <br />
                une option.
              </h2>
              <p className="mt-5 text-gray-500 leading-relaxed">
                Au-delà de la technique, c&apos;est notre culture d&apos;entreprise qui
                fait la différence. Voici ce que nous nous engageons à vous
                offrir sur chaque projet, sans exception.
              </p>
            </div>
          </AnimatedParagraph>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGAGEMENTS.map((item, i) => (
              <AnimatedParagraph key={item.title} delay={i * 80}>
                <div className="group p-8 rounded-2xl border border-gray-100 hover:border-[#C8A96E]/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                  <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black text-[#0B2545] mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm flex-1">{item.desc}</p>
                  <div className="mt-6 w-8 h-0.5 bg-[#C8A96E] group-hover:w-full transition-all duration-500" />
                </div>
              </AnimatedParagraph>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BANDEAU DEVIS
      ══════════════════════════════════════════ */}
      <section className="relative py-40 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1600&q=80"
          alt="Chantier AKIBA BTP"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(11,37,69,0.95) 0%, rgba(11,37,69,0.7) 50%, rgba(200,169,110,0.3) 100%)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedParagraph>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Prêt à bâtir ?</span>
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Votre projet mérite
              <br />
              <span className="text-[#C8A96E]">les meilleurs.</span>
            </h2>
            <p className="mt-6 text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Nos équipes commerciales et techniques répondent à toutes vos
              demandes de devis sous 72 heures ouvrées.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#C8A96E] text-white font-black uppercase tracking-wider rounded-lg text-sm hover:bg-white hover:text-[#0B2545] transition-all duration-300 hover:shadow-2xl group"
              >
                Demander un devis gratuit
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="tel:+24101000000"
                className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white text-white font-black uppercase tracking-wider rounded-lg text-sm hover:bg-white hover:text-[#0B2545] transition-all duration-300"
              >
                📞 Nous appeler
              </a>
            </div>
          </AnimatedParagraph>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="bg-[#071829] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/10">
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
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">Navigation</h4>
              <ul className="space-y-3">
                {[["Accueil", "/"], ["À propos", "/a-propos"], ["Services", "/services"], ["Projets", "/projets"], ["Carrières", "/carrieres"]].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-gray-400 hover:text-[#C8A96E] transition-colors text-sm">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">Nos services</h4>
              <ul className="space-y-3">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-gray-400 hover:text-[#C8A96E] transition-colors text-sm">{s.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">Contact</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3"><span className="text-[#C8A96E]">📍</span><span>Boulevard Triomphal, Libreville, Gabon</span></li>
                <li className="flex gap-3"><span className="text-[#C8A96E]">📞</span><a href="tel:+24101000000" className="hover:text-white transition-colors">+241 01 00 00 00</a></li>
                <li className="flex gap-3"><span className="text-[#C8A96E]">✉️</span><a href="mailto:contact@akibabtp.ga" className="hover:text-white transition-colors">contact@akibabtp.ga</a></li>
                <li className="flex gap-3"><span className="text-[#C8A96E]">🕐</span><span>Lun–Ven : 07h30 – 17h00</span></li>
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
