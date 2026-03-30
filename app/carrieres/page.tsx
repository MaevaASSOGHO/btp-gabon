"use client";

import { useEffect, useRef, useState } from "react";

// ═══════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════
function useInView(threshold = 0.05) {
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

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

// ═══════════════════════════════════════════════════════════
// ANIMATED WRAPPERS
// ═══════════════════════════════════════════════════════════
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function FadeLeft({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function FadeRight({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// DEADLINE BADGE
// ═══════════════════════════════════════════════════════════
function DeadlineBadge({ deadline }: { deadline: string }) {
  const now = new Date();
  const due = new Date(deadline);
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const expired = diffDays < 0;
  const urgent = !expired && diffDays <= 7;
  const formatted = due.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  if (expired) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-400 line-through">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-none" />
        Expiré · {formatted}
      </span>
    );
  }
  if (urgent) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-none" />
        {diffDays === 0 ? "Dernier jour" : `J-${diffDays} · ${formatted}`}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-none" />
      Jusqu&apos;au {formatted}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
// DATA  — dates dans le futur (2 ans après aujourd'hui)
// ═══════════════════════════════════════════════════════════
function futureDate(months: number) {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split("T")[0];
}

const JOBS = [
  {
    slug: "ingenieur-genie-civil",
    title: "Ingénieur Génie Civil",
    department: "Travaux",
    location: "Libreville",
    type: "CDI" as const,
    level: "Confirmé (5+ ans)",
    deadline: futureDate(3),
    summary: "Pilotage technique d'ouvrages d'art et de structures béton armé. Études d'exécution et suivi de chantier.",
    featured: true,
  },
  {
    slug: "chef-de-chantier-batiment",
    title: "Chef de Chantier Bâtiment",
    department: "Travaux",
    location: "Libreville",
    type: "CDI" as const,
    level: "Confirmé (3+ ans)",
    deadline: futureDate(2),
    summary: "Coordination et supervision des équipes sur chantier, gestion du planning d'avancement et interface avec le maître d'ouvrage.",
    featured: true,
  },
  {
    slug: "conducteur-travaux-routes",
    title: "Conducteur de Travaux — Routes",
    department: "Travaux",
    location: "Port-Gentil",
    type: "CDI" as const,
    level: "Confirmé (4+ ans)",
    deadline: futureDate(4),
    summary: "Gestion technique et administrative de chantiers de voirie et d'infrastructures routières en province.",
    featured: false,
  },
  {
    slug: "technicien-electricite",
    title: "Technicien Électricité HT/BT",
    department: "Électricité",
    location: "Libreville",
    type: "CDI" as const,
    level: "Junior à confirmé",
    deadline: futureDate(1),
    summary: "Réalisation et maintenance des installations électriques haute et basse tension sur les chantiers.",
    featured: false,
  },
  {
    slug: "responsable-qhse",
    title: "Responsable QHSE",
    department: "Qualité & Sécurité",
    location: "Libreville",
    type: "CDI" as const,
    level: "Confirmé (5+ ans)",
    deadline: futureDate(3),
    summary: "Déploiement du système de management QHSE sur l'ensemble des chantiers et préparation des audits ISO.",
    featured: true,
  },
  {
    slug: "comptable-principal",
    title: "Comptable Principal",
    department: "Finance & Gestion",
    location: "Libreville",
    type: "CDI" as const,
    level: "Confirmé (4+ ans)",
    deadline: futureDate(2),
    summary: "Tenue de la comptabilité générale et analytique, préparation des états financiers.",
    featured: false,
  },
  {
    slug: "assistant-production-stage",
    title: "Assistant(e) de Production",
    department: "Travaux",
    location: "Libreville",
    type: "Stage" as const,
    level: "Bac+3 minimum",
    deadline: futureDate(5),
    summary: "Stage de fin d'études : suivi de planning, coordination administrative et reporting chantier.",
    featured: false,
  },
  {
    slug: "ingenieur-etudes-prix",
    title: "Ingénieur Études & Prix",
    department: "Commercial",
    location: "Libreville",
    type: "CDI" as const,
    level: "Confirmé (3+ ans)",
    deadline: futureDate(4),
    summary: "Élaboration des offres techniques et financières en réponse aux appels d'offres publics et privés.",
    featured: false,
  },
];

const DEPARTMENTS = ["Tous", "Travaux", "Électricité", "Qualité & Sécurité", "Finance & Gestion", "Commercial"];
const TYPES = ["Tous types", "CDI", "CDD", "Stage", "Alternance"];
const NAV_LINKS = [
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services", sub: "Nos engagements", subHref: "/services#engagements" },
  { label: "Projets", href: "/projets", sub: "Actualités", subHref: "/projets#actualites" },
  { label: "Carrières", href: "/carrieres" },
];

// ═══════════════════════════════════════════════════════════
// JOB CARD
// ═══════════════════════════════════════════════════════════
function JobCard({ job, delay = 0 }: { job: typeof JOBS[number]; delay?: number }) {
  const expired = new Date(job.deadline) < new Date();
  return (
    <FadeUp delay={delay}>
      <a
        href={`/carrieres/${job.slug}`}
        className={`group block bg-white rounded-2xl border transition-all duration-300 ${
          expired
            ? "border-gray-100 opacity-50 pointer-events-none"
            : "border-gray-100 hover:border-[#C8A96E]/60 hover:shadow-xl hover:-translate-y-1"
        }`}
      >
        <div className="p-6">
          {/* Top row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  job.type === "CDI" ? "bg-[#0B2545]/10 text-[#0B2545]" :
                  job.type === "Stage" ? "bg-amber-50 text-amber-700" :
                  "bg-blue-50 text-blue-700"
                }`}>{job.type}</span>
                <span className="text-gray-300 text-xs">·</span>
                <span className="text-gray-400 text-xs font-medium">{job.department}</span>
              </div>
              <h3 className="font-black text-lg leading-tight text-[#0B2545] group-hover:text-[#C8A96E] transition-colors duration-300">
                {job.title}
              </h3>
            </div>
            <div className="w-10 h-10 bg-[#F7F9FC] group-hover:bg-[#C8A96E] rounded-full flex items-center justify-center transition-all duration-300 flex-none">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">{job.summary}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-gray-400 text-xs">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </span>
            <span className="text-gray-200">·</span>
            <span>{job.level}</span>
          </div>

          <DeadlineBadge deadline={job.deadline} />
        </div>
      </a>
    </FadeUp>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════
export default function CareersPage() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [activeDept, setActiveDept] = useState("Tous");
  const [activeType, setActiveType] = useState("Tous types");

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    setTimeout(() => setRevealed(true), 400);
  }, []);

  const featured = JOBS.filter((j) => j.featured);
  const now = new Date();
  const filtered = JOBS
    .filter((j) => (activeDept === "Tous" || j.department === activeDept) && (activeType === "Tous types" || j.type === activeType))
    .sort((a, b) => {
      const aExp = new Date(a.deadline) < now;
      const bExp = new Date(b.deadline) < now;
      if (aExp && !bExp) return 1;
      if (!aExp && bExp) return -1;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

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
                <a href={link.href} className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-[#C8A96E] ${scrolled ? "text-[#0B2545]" : "text-white"} ${link.label === "Carrières" ? "text-[#C8A96E]" : ""}`}>
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
            {[0, 1, 2].map((i) => <span key={i} className={`block w-6 h-0.5 ${scrolled ? "bg-[#0B2545]" : "bg-white"}`} />)}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-[#0B2545] px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((l) => <a key={l.label} href={l.href} className="text-white font-semibold uppercase tracking-wider text-sm">{l.label}</a>)}
            <a href="/contact" className="mt-2 px-6 py-3 bg-[#C8A96E] text-white text-sm font-bold uppercase tracking-wider rounded-lg text-center">Nous contacter</a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
        <div className={`absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${revealed ? "scale-100" : "scale-110"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80" alt="Carrières AKIBA BTP" className="w-full h-full object-cover" />
        </div>
        <div className={`absolute inset-x-0 top-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-top ${revealed ? "h-0" : "h-1/2"}`} />
        <div className={`absolute inset-x-0 bottom-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-bottom ${revealed ? "h-0" : "h-1/2"}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/85 via-[#0B2545]/40 to-[#0B2545]/20 z-10" />

        <div className={`absolute top-28 left-6 md:left-12 z-10 transition-all duration-700 delay-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest">
            <a href="/" className="hover:text-[#C8A96E] transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-[#C8A96E]">Carrières</span>
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-20 px-6 text-center">
          <div className={`transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.3em]">AKIBA BTP · Gabon</span>
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">Carrières</h1>
            <p className="mt-5 text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
              Rejoignez une équipe qui construit l&apos;avenir du Gabon. Des opportunités à la hauteur de votre ambition.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-white/70 text-sm">
              <span><span className="text-[#C8A96E] font-black text-xl">{JOBS.length}</span> postes ouverts</span>
              <span className="text-white/30">·</span>
              <span><span className="text-[#C8A96E] font-black text-xl">200+</span> collaborateurs</span>
              <span className="text-white/30">·</span>
              <span><span className="text-[#C8A96E] font-black text-xl">6</span> métiers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── POURQUOI NOUS REJOINDRE ── */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeLeft>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
                <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Pourquoi nous rejoindre</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0B2545] leading-tight">
                Construisez votre<br /><span className="text-[#C8A96E]">carrière avec nous.</span>
              </h2>
              <FadeUp delay={150} className="mt-6">
                <p className="text-gray-600 leading-relaxed text-lg">Chez AKIBA BTP, chaque collaborateur est un bâtisseur. Nous croyons que les meilleurs ouvrages naissent de la rencontre entre des talents passionnés et une entreprise qui leur fait confiance.</p>
              </FadeUp>
              <FadeUp delay={250} className="mt-4">
                <p className="text-gray-600 leading-relaxed">Nous investissons continuellement dans la formation et l&apos;évolution interne. Ici, votre progression n&apos;est pas une promesse — c&apos;est une réalité que nos collaborateurs vivent au quotidien.</p>
              </FadeUp>
            </FadeLeft>
            <FadeRight>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "📈", title: "Évolution rapide", desc: "70% de nos managers sont issus de la promotion interne" },
                  { icon: "🎓", title: "Formation continue", desc: "Budget formation dédié et accès aux certifications métier" },
                  { icon: "🌍", title: "Projets d'envergure", desc: "Travaillez sur des ouvrages qui marquent le territoire" },
                  { icon: "🤝", title: "Esprit d'équipe", desc: "Une culture d'entreprise bienveillante et exigeante" },
                  { icon: "💰", title: "Rémunération compétitive", desc: "Salaires du marché + primes de performance" },
                  { icon: "🏥", title: "Couverture sociale", desc: "Mutuelle santé, assurance accident et CNPS" },
                ].map((item, i) => (
                  <FadeUp key={item.title} delay={i * 80}>
                    <div className="group p-5 rounded-xl border border-gray-100 hover:border-[#C8A96E]/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                      <h4 className="font-black text-[#0B2545] text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ── POSTES EN VEDETTE ── */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Recherches prioritaires</span>
            </div>
            <h2 className="text-4xl font-black text-[#0B2545] mb-10">Postes en vedette.</h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((job, i) => (
              <FadeUp key={job.slug} delay={i * 100}>
                <a href={`/carrieres/${job.slug}`} className="group relative block bg-[#0B2545] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-32 h-32 border border-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
                  <div className="p-8 relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C8A96E]/20 text-[#C8A96E]">{job.type}</span>
                      <div className="w-9 h-9 bg-white/10 group-hover:bg-[#C8A96E] rounded-full flex items-center justify-center transition-all duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="font-black text-white text-xl leading-tight mb-2 group-hover:text-[#C8A96E] transition-colors duration-300">{job.title}</h3>
                    <p className="text-blue-300 text-xs uppercase tracking-widest mb-4">{job.department} · {job.location}</p>
                    <p className="text-blue-200 text-sm leading-relaxed mb-6 line-clamp-2">{job.summary}</p>
                    <DeadlineBadge deadline={job.deadline} />
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOUTES LES OFFRES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-0.5 bg-[#C8A96E]" />
                  <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Toutes nos offres</span>
                </div>
                <h2 className="text-4xl font-black text-[#0B2545]">Explorer les postes.</h2>
              </div>
              <p className="text-gray-400 text-sm">{filtered.length} offre{filtered.length > 1 ? "s" : ""}</p>
            </div>
          </FadeUp>

          {/* Filtres */}
          <FadeUp delay={100}>
            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex flex-wrap gap-2">
                {DEPARTMENTS.map((d) => (
                  <button key={d} onClick={() => setActiveDept(d)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeDept === d ? "bg-[#0B2545] text-white" : "bg-[#F7F9FC] text-gray-500 hover:bg-[#0B2545]/10 hover:text-[#0B2545]"}`}
                  >{d}</button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button key={t} onClick={() => setActiveType(t)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeType === t ? "bg-[#C8A96E] text-white" : "bg-[#F7F9FC] text-gray-500 hover:bg-[#C8A96E]/20 hover:text-[#C8A96E]"}`}
                  >{t}</button>
                ))}
              </div>
            </div>
          </FadeUp>

          {filtered.length === 0 ? (
            <FadeUp>
              <div className="text-center py-20 text-gray-400">
                <div className="text-5xl mb-4">🔍</div>
                <p className="font-semibold">Aucune offre ne correspond à vos filtres.</p>
                <button onClick={() => { setActiveDept("Tous"); setActiveType("Tous types"); }} className="mt-4 text-[#C8A96E] text-sm font-bold hover:underline">Réinitialiser</button>
              </div>
            </FadeUp>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((job, i) => <JobCard key={job.slug} job={job} delay={i * 60} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── PROCESSUS DE RECRUTEMENT ── */}
      <section className="py-28 bg-[#0B2545] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 border border-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
                <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Comment postuler</span>
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
              </div>
              <h2 className="text-4xl font-black text-white mt-2">Notre processus de recrutement.</h2>
              <p className="mt-4 text-blue-200">Simple, transparent et respectueux de votre temps.</p>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: "📋", title: "Candidature en ligne", desc: "Déposez votre CV et lettre de motivation via le formulaire de l'offre." },
              { step: "02", icon: "📞", title: "Pré-sélection", desc: "Notre équipe RH vous contacte sous 5 jours ouvrés pour un premier échange." },
              { step: "03", icon: "🤝", title: "Entretien", desc: "Rencontre avec le responsable RH et le manager pour évaluer votre profil." },
              { step: "04", icon: "✅", title: "Offre & intégration", desc: "Remise de l'offre d'emploi et accompagnement lors de votre prise de poste." },
            ].map((item, i) => (
              <FadeUp key={item.step} delay={i * 100}>
                <div className="group text-center p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-[#C8A96E]/40">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <div className="text-[#C8A96E] font-black text-sm mb-2">{item.step}</div>
                  <h3 className="font-black text-white mb-3">{item.title}</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CANDIDATURE SPONTANÉE ── */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp>
            <div className="bg-white rounded-3xl p-10 md:p-14 border border-gray-100 shadow-xl text-center">
              <div className="w-16 h-16 bg-[#C8A96E]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📨</span>
              </div>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
                <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Candidature spontanée</span>
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
              </div>
              <h2 className="text-3xl font-black text-[#0B2545] mt-2 mb-4">Vous ne trouvez pas votre poste idéal ?</h2>
              <p className="text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
                Envoyez-nous votre CV. Nous étudions toutes les candidatures spontanées et revenons vers vous dès qu&apos;une opportunité correspond à votre profil.
              </p>
              <a href="mailto:recrutement@akibabtp.ga?subject=Candidature spontanée — AKIBA BTP"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#0B2545] text-white font-black uppercase tracking-wider rounded-xl hover:bg-[#C8A96E] transition-all duration-300 group"
              >
                Envoyer ma candidature
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <p className="mt-5 text-gray-400 text-sm">recrutement@akibabtp.ga · Réponse sous 10 jours ouvrés</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#C8A96E]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-black text-white">Des questions sur nos opportunités ?</h2>
            <p className="mt-4 text-white/80 text-lg">Notre équipe RH est disponible pour vous renseigner.</p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a href="/contact" className="px-8 py-4 bg-white text-[#0B2545] font-black uppercase tracking-wider rounded-lg hover:bg-[#0B2545] hover:text-white transition-all duration-300">Nous contacter</a>
              <a href="/a-propos" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:text-[#0B2545] transition-all duration-300">À propos d&apos;AKIBA</a>
            </div>
          </FadeUp>
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
                {[["Accueil", "/"], ["À propos", "/a-propos"], ["Services", "/services"], ["Projets", "/projets"], ["Carrières", "/carrieres"]].map(([l, h]) => (
                  <li key={l}><a href={h} className="text-gray-400 hover:text-[#C8A96E] transition-colors text-sm">{l}</a></li>
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

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');`}</style>
    </main>
  );
}
