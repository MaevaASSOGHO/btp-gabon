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
function DeadlineBadge({ deadline, size = "sm" }: { deadline: string; size?: "sm" | "md" }) {
  const now = new Date();
  const due = new Date(deadline);
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const expired = diffDays < 0;
  const urgent = !expired && diffDays <= 7;
  const formatted = due.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const base = size === "md"
    ? "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
    : "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold";

  if (expired) return (
    <span className={`${base} bg-gray-100 text-gray-400 line-through`}>
      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-none" />
      Expiré · {formatted}
    </span>
  );
  if (urgent) return (
    <span className={`${base} bg-red-50 text-red-600 animate-pulse`}>
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-none" />
      {diffDays === 0 ? "Dernier jour" : `J-${diffDays} · ${formatted}`}
    </span>
  );
  return (
    <span className={`${base} bg-green-50 text-green-700`}>
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-none" />
      Jusqu&apos;au {formatted}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
// DATA — in real app, fetch by params.slug
// ═══════════════════════════════════════════════════════════
function futureDate(months: number) {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split("T")[0];
}

const JOB = {
  slug: "ingenieur-genie-civil",
  title: "Ingénieur Génie Civil",
  department: "Travaux",
  location: "Libreville",
  type: "CDI",
  level: "Confirmé (5+ ans)",
  deadline: futureDate(3),
  summary: "Pilotage technique d'ouvrages d'art et de structures béton armé. Études d'exécution et suivi de chantier.",
  missions: [
    "Réaliser et superviser les études d'exécution (plans béton, notes de calcul, plans de ferraillage)",
    "Assurer la direction de travaux sur les chantiers de génie civil et ouvrages d'art",
    "Coordonner les équipes d'exécution (chefs de chantier, conducteurs d'engins, sous-traitants)",
    "Contrôler la conformité des travaux aux plans, cahiers des charges et normes en vigueur",
    "Rédiger les rapports d'avancement et les comptes rendus de réunions de chantier",
    "Gérer les interfaces avec le maître d'ouvrage, le maître d'œuvre et les organismes de contrôle",
    "Participer aux réunions de coordination et aux réceptions partielles et finales de travaux",
  ],
  profile: [
    "Diplôme d'ingénieur en Génie Civil, BTP ou équivalent (Bac+5)",
    "5 ans d'expérience minimum sur des projets de génie civil et/ou ouvrages d'art",
    "Maîtrise des logiciels CAO/DAO (AutoCAD, Revit) et de calcul de structure",
    "Bonne connaissance des normes EUROCODE et des règles de l'art en construction",
    "Capacité à manager des équipes pluridisciplinaires sur chantier",
    "Rigueur, sens de l'organisation et excellent relationnel",
    "Permis B requis — déplacements sur chantiers réguliers",
  ],
  offer: [
    "Contrat CDI — rémunération selon profil et expérience",
    "Véhicule de fonction ou indemnités kilométriques",
    "Mutuelle santé d'entreprise prise en charge à 70%",
    "Affiliation CNPS dès la prise de poste",
    "Prime de performance annuelle",
    "Plan de formation et accompagnement à la certification",
    "Téléphone professionnel",
  ],
  related: [
    { slug: "chef-de-chantier-batiment", title: "Chef de Chantier Bâtiment", department: "Travaux", type: "CDI", location: "Libreville", level: "Confirmé (3+ ans)", deadline: futureDate(2) },
    { slug: "conducteur-travaux-routes", title: "Conducteur de Travaux — Routes", department: "Travaux", type: "CDI", location: "Port-Gentil", level: "Confirmé (4+ ans)", deadline: futureDate(4) },
    { slug: "responsable-qhse", title: "Responsable QHSE", department: "Qualité & Sécurité", type: "CDI", location: "Libreville", level: "Confirmé (5+ ans)", deadline: futureDate(3) },
  ],
};

const NAV_LINKS = [
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services", sub: "Nos engagements", subHref: "/services#engagements" },
  { label: "Projets", href: "/projets", sub: "Actualités", subHref: "/projets#actualites" },
  { label: "Carrières", href: "/carrieres" },
];

// ═══════════════════════════════════════════════════════════
// APPLICATION FORM
// ═══════════════════════════════════════════════════════════
function ApplicationForm({ jobTitle }: { jobTitle: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-black text-[#0B2545] text-lg mb-2">Candidature envoyée !</h3>
        <p className="text-gray-400 text-sm">Notre équipe RH vous répondra sous 5 jours ouvrés.</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <input type="hidden" value={jobTitle} />
      {[
        { key: "name", label: "Nom complet *", type: "text", placeholder: "Jean-Baptiste Moundounga", required: true },
        { key: "email", label: "Email *", type: "email", placeholder: "votre@email.com", required: true },
        { key: "phone", label: "Téléphone", type: "tel", placeholder: "+241 06 00 00 00", required: false },
      ].map((field) => (
        <div key={field.key}>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">{field.label}</label>
          <input
            required={field.required}
            type={field.type}
            placeholder={field.placeholder}
            value={form[field.key as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C8A96E] focus:outline-none focus:ring-2 focus:ring-[#C8A96E]/20 text-sm transition-all duration-200"
          />
        </div>
      ))}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Message de motivation</label>
        <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Décrivez brièvement votre expérience et votre motivation..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C8A96E] focus:outline-none focus:ring-2 focus:ring-[#C8A96E]/20 text-sm transition-all duration-200 resize-none"
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">CV (PDF) *</label>
        <label htmlFor="cv-file" className="block w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#C8A96E]/50 transition-colors duration-200 text-center cursor-pointer">
          <input id="cv-file" type="file" accept=".pdf,.doc,.docx" className="hidden" />
          <span className="text-gray-400 text-sm">Glissez votre CV ici ou <span className="text-[#C8A96E] font-bold">parcourir</span></span>
        </label>
      </div>
      <button type="submit"
        className="w-full py-4 bg-[#0B2545] text-white font-black uppercase tracking-wider rounded-xl hover:bg-[#C8A96E] transition-all duration-300 text-sm flex items-center justify-center gap-2 group"
      >
        Envoyer ma candidature
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
      <p className="text-gray-400 text-xs text-center">Vos données sont utilisées uniquement dans le cadre de votre candidature.</p>
    </form>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════
export default function JobDetailPage() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const job = JOB;
  const expired = new Date(job.deadline) < new Date();

  return (
    <main className="font-['Outfit',sans-serif] bg-white text-[#0B2545] overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-[#0B2545]/90 backdrop-blur-sm py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#0B2545] rounded-lg flex items-center justify-center group-hover:bg-[#C8A96E] transition-colors duration-300 border border-white/20">
              <span className="text-white font-black text-lg">A</span>
            </div>
            <div>
              <span className={`font-black text-xl tracking-tight transition-colors duration-300 ${scrolled ? "text-[#0B2545]" : "text-white"}`}>AKIBA BTP</span>
              <div className="text-xs uppercase tracking-[0.2em] text-[#C8A96E]">Gabon</div>
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
            <a href="/contact" className="ml-4 px-6 py-3 bg-[#C8A96E] text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:text-[#0B2545] transition-all duration-300">Nous contacter</a>
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

      {/* ── HERO COMPACT ── */}
      <section className="relative pt-32 pb-16 bg-[#0B2545] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-white/5 rounded-full -translate-x-1/3 translate-y-1/3" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <FadeUp>
            <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest mb-8">
              <a href="/" className="hover:text-[#C8A96E] transition-colors">Accueil</a>
              <span>/</span>
              <a href="/carrieres" className="hover:text-[#C8A96E] transition-colors">Carrières</a>
              <span>/</span>
              <span className="text-[#C8A96E]">{job.title}</span>
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Titre & infos */}
            <div className="lg:col-span-2">
              <FadeUp>
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C8A96E]/20 text-[#C8A96E]">{job.type}</span>
                  <span className="text-white/30">·</span>
                  <span className="text-blue-300 text-xs font-medium uppercase tracking-wider">{job.department}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">{job.title}</h1>
                <p className="text-blue-200 leading-relaxed text-lg mb-6">{job.summary}</p>
              </FadeUp>
              <FadeUp delay={150}>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: "📍", label: job.location },
                    { icon: "💼", label: job.level },
                    { icon: "🏢", label: job.department },
                  ].map((m) => (
                    <span key={m.label} className="flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm">
                      {m.icon} {m.label}
                    </span>
                  ))}
                  <DeadlineBadge deadline={job.deadline} size="md" />
                </div>
              </FadeUp>
            </div>

            {/* Formulaire desktop dans le hero */}
            <FadeRight delay={200}>
              <div className="hidden lg:block bg-white rounded-2xl p-8 shadow-2xl">
                {expired ? (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-3">🔒</div>
                    <h3 className="font-black text-[#0B2545] mb-2">Offre expirée</h3>
                    <p className="text-gray-400 text-sm mb-5">Cette offre n&apos;est plus disponible.</p>
                    <a href="/carrieres" className="block w-full py-3 bg-[#0B2545] text-white text-sm font-bold uppercase tracking-wider rounded-xl text-center hover:bg-[#C8A96E] transition-all duration-300">Voir les offres</a>
                  </div>
                ) : (
                  <>
                    <h3 className="font-black text-[#0B2545] text-lg mb-1">Postuler maintenant</h3>
                    <p className="text-gray-400 text-xs mb-6">Réponse garantie sous 5 jours ouvrés</p>
                    <ApplicationForm jobTitle={job.title} />
                  </>
                )}
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ── CONTENU DÉTAIL ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">

            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-16">

              {/* Missions */}
              <div>
                <FadeUp>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-0.5 bg-[#C8A96E]" />
                    <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Vos responsabilités</span>
                  </div>
                  <h2 className="text-3xl font-black text-[#0B2545] mb-6">Missions du poste.</h2>
                </FadeUp>
                <div className="space-y-2">
                  {job.missions.map((m, i) => (
                    <FadeUp key={m} delay={i * 60}>
                      <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#F7F9FC] transition-colors duration-200 group">
                        <div className="w-6 h-6 rounded-full bg-[#C8A96E]/10 group-hover:bg-[#C8A96E]/20 flex items-center justify-center flex-none mt-0.5 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]" />
                        </div>
                        <span className="text-gray-600 leading-relaxed">{m}</span>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>

              {/* Profil */}
              <div>
                <FadeUp>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-0.5 bg-[#C8A96E]" />
                    <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Ce que nous recherchons</span>
                  </div>
                  <h2 className="text-3xl font-black text-[#0B2545] mb-6">Profil idéal.</h2>
                </FadeUp>
                <div className="space-y-2">
                  {job.profile.map((p, i) => (
                    <FadeUp key={p} delay={i * 60}>
                      <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#F7F9FC] transition-colors duration-200 group">
                        <div className="w-6 h-6 rounded-full bg-[#0B2545]/5 group-hover:bg-[#0B2545]/10 flex items-center justify-center flex-none mt-0.5 transition-colors">
                          <svg className="w-3 h-3 text-[#0B2545]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-600 leading-relaxed">{p}</span>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>

              {/* Offre */}
              <div>
                <FadeUp>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-0.5 bg-[#C8A96E]" />
                    <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Ce que nous offrons</span>
                  </div>
                  <h2 className="text-3xl font-black text-[#0B2545] mb-6">Conditions & avantages.</h2>
                </FadeUp>
                <div className="grid sm:grid-cols-2 gap-3">
                  {job.offer.map((o, i) => (
                    <FadeUp key={o} delay={i * 60}>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F7F9FC] border border-gray-100 hover:border-[#C8A96E]/30 transition-colors duration-200">
                        <span className="text-[#C8A96E] mt-0.5 flex-none">✦</span>
                        <span className="text-gray-600 text-sm leading-relaxed">{o}</span>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>

              {/* Formulaire mobile */}
              <div className="lg:hidden">
                <FadeUp>
                  <div className="bg-[#F7F9FC] rounded-2xl p-8 border border-gray-100">
                    {expired ? (
                      <div className="text-center py-4">
                        <div className="text-4xl mb-3">🔒</div>
                        <h3 className="font-black text-[#0B2545] mb-2">Offre expirée</h3>
                        <p className="text-gray-400 text-sm mb-5">Cette offre n&apos;est plus disponible.</p>
                        <a href="/carrieres" className="block w-full py-3 bg-[#0B2545] text-white text-sm font-bold uppercase tracking-wider rounded-xl text-center hover:bg-[#C8A96E] transition-all">Voir les offres</a>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-black text-[#0B2545] text-lg mb-1">Postuler à ce poste</h3>
                        <p className="text-gray-400 text-xs mb-6">Réponse sous 5 jours ouvrés</p>
                        <ApplicationForm jobTitle={job.title} />
                      </>
                    )}
                  </div>
                </FadeUp>
              </div>
            </div>

            {/* Sidebar sticky */}
            <FadeRight delay={200}>
              <div className="hidden lg:block lg:sticky lg:top-28 space-y-5">

                {/* Fiche récap */}
                <div className="bg-[#F7F9FC] rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-black text-[#0B2545] mb-4 pb-3 border-b border-gray-200">Récapitulatif du poste</h4>
                  <div className="space-y-3">
                    {[
                      { label: "Titre", value: job.title },
                      { label: "Contrat", value: job.type },
                      { label: "Lieu", value: job.location },
                      { label: "Département", value: job.department },
                      { label: "Niveau", value: job.level },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between gap-3 py-2 border-b border-gray-100 last:border-0">
                        <span className="text-gray-400 text-xs">{row.label}</span>
                        <span className="font-bold text-[#0B2545] text-xs text-right">{row.value}</span>
                      </div>
                    ))}
                    <div className="pt-2">
                      <span className="text-gray-400 text-xs block mb-2">Date limite de candidature</span>
                      <DeadlineBadge deadline={job.deadline} size="md" />
                    </div>
                  </div>
                </div>

                {/* Partage */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-black text-[#0B2545] text-sm mb-4">Partager cette offre</h4>
                  <div className="flex gap-2">
                    {[
                      { label: "LinkedIn", bg: "#0077B5" },
                      { label: "WhatsApp", bg: "#25D366" },
                      { label: "Email", bg: "#C8A96E" },
                    ].map((s) => (
                      <button key={s.label} style={{ background: s.bg }}
                        className="flex-1 py-2 rounded-lg text-xs font-bold text-white hover:opacity-80 hover:scale-105 transition-all duration-200"
                      >{s.label}</button>
                    ))}
                  </div>
                </div>

                {/* Retour aux offres */}
                <a href="/carrieres" className="flex items-center gap-2 text-gray-400 hover:text-[#0B2545] text-sm font-semibold transition-colors duration-200 group">
                  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Retour aux offres
                </a>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ── AUTRES POSTES ── */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Voir aussi</span>
            </div>
            <h2 className="text-3xl font-black text-[#0B2545] mb-10">Autres opportunités.</h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-5">
            {job.related.map((r, i) => {
              const rExpired = new Date(r.deadline) < new Date();
              return (
                <FadeUp key={r.slug} delay={i * 100}>
                  <a href={rExpired ? undefined : `/carrieres/${r.slug}`}
                    className={`group block bg-white rounded-2xl border p-6 transition-all duration-300 ${rExpired ? "border-gray-100 opacity-50 pointer-events-none" : "border-gray-100 hover:border-[#C8A96E]/50 hover:shadow-xl hover:-translate-y-1"}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0B2545]/10 text-[#0B2545]">{r.type}</span>
                      {!rExpired && (
                        <div className="w-8 h-8 bg-[#F7F9FC] group-hover:bg-[#C8A96E] rounded-full flex items-center justify-center transition-all duration-300">
                          <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className={`font-black text-base leading-tight mb-2 transition-colors duration-300 ${rExpired ? "text-gray-400" : "text-[#0B2545] group-hover:text-[#C8A96E]"}`}>{r.title}</h3>
                    <div className="text-gray-400 text-xs mb-3">📍 {r.location} · {r.level}</div>
                    <DeadlineBadge deadline={r.deadline} />
                  </a>
                </FadeUp>
              );
            })}
          </div>
          <FadeUp delay={300}>
            <div className="text-center mt-10">
              <a href="/carrieres" className="inline-flex items-center gap-2 text-[#0B2545] font-bold uppercase tracking-wider text-sm hover:text-[#C8A96E] transition-colors group">
                Toutes nos offres
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0B2545]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-black text-white">Pas encore prêt à postuler ?</h2>
            <p className="mt-4 text-blue-200 text-lg">Envoyez-nous votre CV en candidature spontanée.</p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a href="mailto:recrutement@akibabtp.ga" className="px-8 py-4 bg-[#C8A96E] text-white font-black uppercase tracking-wider rounded-lg hover:bg-white hover:text-[#0B2545] transition-all duration-300">Candidature spontanée</a>
              <a href="/carrieres" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:text-[#0B2545] transition-all duration-300">Retour aux offres</a>
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
