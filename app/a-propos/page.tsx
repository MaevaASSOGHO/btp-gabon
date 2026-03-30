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

// ─── ANIMATED TEXT ───────────────────────────────────────────────────────────
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

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services", sub: "Nos engagements", subHref: "/services#engagements" },
  { label: "Projets", href: "/projets", sub: "Actualités", subHref: "/projets#actualites" },
  { label: "Carrières", href: "/carrieres" },
];

const VALUES = [
  {
    icon: "◈",
    title: "Excellence",
    description:
      "Chaque ouvrage que nous livrons reflète notre exigence absolue en matière de qualité technique et de finition. Nous ne faisons aucune concession sur les standards.",
  },
  {
    icon: "◉",
    title: "Intégrité",
    description:
      "La transparence et l'honnêteté guident chacune de nos relations — avec nos clients, nos partenaires, nos fournisseurs et nos équipes.",
  },
  {
    icon: "◎",
    title: "Innovation",
    description:
      "Nous investissons en continu dans les nouvelles technologies de construction et dans la formation de nos équipes pour rester à la pointe.",
  },
  {
    icon: "◆",
    title: "Durabilité",
    description:
      "Construire aujourd'hui en pensant à demain : nos chantiers intègrent systématiquement des critères environnementaux et de responsabilité sociale.",
  },
];

const COMMITMENTS = [
  {
    number: "01",
    title: "Respect des délais",
    description:
      "Nous planifions rigoureusement chaque phase de production pour tenir nos engagements calendaires, quelles que soient les contraintes terrain.",
  },
  {
    number: "02",
    title: "Maîtrise des coûts",
    description:
      "Nos devis détaillés et notre suivi budgétaire en temps réel garantissent à nos clients une parfaite visibilité financière tout au long du projet.",
  },
  {
    number: "03",
    title: "Sécurité sur les chantiers",
    description:
      "La sécurité de nos collaborateurs et sous-traitants est une priorité absolue. Nous appliquons les normes HSQE les plus strictes sur l'ensemble de nos sites.",
  },
  {
    number: "04",
    title: "Proximité locale",
    description:
      "En tant qu'entreprise gabonaise, nous privilégions les fournisseurs locaux, formons nos talents sur place et participons activement au développement économique du pays.",
  },
  {
    number: "05",
    title: "Service après livraison",
    description:
      "Notre relation client ne s'arrête pas à la réception des travaux. Nous assurons un suivi post-livraison et répondons présents en cas de besoin.",
  },
  {
    number: "06",
    title: "Communication transparente",
    description:
      "Des reportings réguliers, des réunions de chantier structurées et un interlocuteur dédié : vous êtes informé à chaque étape de votre projet.",
  },
];

const TEAM = [
  { name: "Jean-Baptiste Moundounga", role: "Directeur Général", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80" },
  { name: "Carine Ondo", role: "Directrice Administrative", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80" },
  { name: "Pierre Nzamba", role: "Directeur Technique", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
  { name: "Mariette Bouanga", role: "Responsable Qualité", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80" },
  { name: "Rodrigue Essono", role: "Chef de Projet Senior", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80" },
  { name: "Adèle Mihindou", role: "Responsable RH", image: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=300&q=80" },
  { name: "François Bekale", role: "Ingénieur Génie Civil", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" },
  { name: "Solange Koumba", role: "Cheffe de Chantier", image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=300&q=80" },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const directorSection = useInView(0.2);
  const valuesSection = useInView(0.1);
  const commitmentsSection = useInView(0.1);
  const teamSection = useInView(0.1);

  useEffect(() => {
    // Page load animation sequence
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#0B2545] rounded-lg flex items-center justify-center group-hover:bg-[#C8A96E] transition-colors duration-300">
              <span className="text-white font-black text-lg">A</span>
            </div>
            <div>
              <span className={`font-black text-xl tracking-tight transition-colors duration-300 ${scrolled ? "text-[#0B2545]" : "text-white"}`}>
                AKIBA BTP
              </span>
              <div className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${scrolled ? "text-[#C8A96E]" : "text-blue-200"}`}>
                Gabon
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-[#C8A96E] ${
                    scrolled ? "text-[#0B2545]" : "text-white"
                  } ${link.label === "À propos" ? (scrolled ? "text-[#C8A96E]" : "text-[#C8A96E]") : ""}`}
                >
                  {link.label}
                </a>
                {link.sub && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-3 bg-white rounded-xl shadow-2xl py-2 min-w-[180px] border border-gray-100">
                    <a href={link.subHref} className="block px-5 py-3 text-sm text-[#0B2545] hover:bg-[#0B2545] hover:text-white transition-colors duration-200 font-medium">
                      {link.sub}
                    </a>
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
            <a href="/contact" className="mt-2 px-6 py-3 bg-[#C8A96E] text-white text-sm font-bold uppercase tracking-wider rounded-lg text-center">
              Nous contacter
            </a>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════
          HERO — PHOTO + REVEAL ANIMATION
      ══════════════════════════════════════════ */}
      <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">

        {/* Image de fond */}
        <div
          className={`absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "scale-100" : "scale-110"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80"
            alt="Chantier AKIBA BTP"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Volets de révélation : haut et bas partent depuis le centre */}
        <div
          className={`absolute inset-x-0 top-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-top ${
            revealed ? "h-0" : "h-1/2"
          }`}
          style={{ transitionDelay: revealed ? "0ms" : "0ms" }}
        />
        <div
          className={`absolute inset-x-0 bottom-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-bottom ${
            revealed ? "h-0" : "h-1/2"
          }`}
          style={{ transitionDelay: revealed ? "0ms" : "0ms" }}
        />

        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/80 via-[#0B2545]/40 to-[#0B2545]/20 z-10" />

        {/* Contenu */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-20 px-6 text-center">
          <div
            className={`transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
              À propos
            </h1>
            <p className="mt-5 text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
              Depuis 2006, nous construisons le Gabon de demain avec passion,
              rigueur et un engagement sans faille envers l&apos;excellence.
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div
          className={`absolute top-28 left-6 md:left-12 z-10 transition-all duration-700 delay-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest">
            <a href="/" className="hover:text-[#C8A96E] transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-[#C8A96E]">À propos</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VISION
      ══════════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* Texte vision */}
            <div>
              <AnimatedParagraph>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-0.5 bg-[#C8A96E]" />
                  <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">
                    Notre vision
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#0B2545] leading-tight">
                  Bâtir un Gabon
                  <br />
                  fort et durable.
                </h2>
              </AnimatedParagraph>

              <AnimatedParagraph delay={150} className="mt-8">
                <p className="text-gray-600 leading-relaxed text-lg">
                  AKIBA BTP est née d&apos;une conviction simple : le développement
                  d&apos;un pays passe par la qualité de ses infrastructures. Fondée
                  en 2006 à Libreville par des ingénieurs gabonais formés en
                  Europe et en Afrique, notre entreprise a grandi avec une seule
                  obsession — livrer des ouvrages qui durent.
                </p>
              </AnimatedParagraph>

              <AnimatedParagraph delay={250} className="mt-5">
                <p className="text-gray-600 leading-relaxed">
                  Aujourd&apos;hui, AKIBA BTP compte plus de 200 collaborateurs
                  répartis sur l&apos;ensemble du territoire gabonais. Notre parc
                  matériel moderne, nos certifications ISO et notre portefeuille
                  de références — routes, bâtiments, réseaux, ouvrages d&apos;art —
                  témoignent d&apos;une trajectoire de croissance continue fondée sur
                  la confiance de nos clients et la compétence de nos équipes.
                </p>
              </AnimatedParagraph>

              <AnimatedParagraph delay={350} className="mt-5">
                <p className="text-gray-600 leading-relaxed">
                  Notre vision pour demain : être l&apos;acteur de référence du BTP
                  en Afrique centrale, en portant haut les couleurs du
                  savoir-faire gabonais tout en intégrant les meilleures
                  pratiques mondiales en matière de construction durable et
                  responsable.
                </p>
              </AnimatedParagraph>
            </div>

            {/* Bloc chiffres vertical */}
            <div className="space-y-6 lg:pt-24">
              {[
                { val: "2006", label: "Année de fondation", desc: "À Libreville, par des ingénieurs gabonais" },
                { val: "200+", label: "Collaborateurs", desc: "Répartis sur tout le territoire national" },
                { val: "320+", label: "Projets livrés", desc: "Toutes catégories confondues depuis 18 ans" },
                { val: "ISO", label: "Certifiés", desc: "9001 Qualité · 14001 Environnement · 45001 SST" },
              ].map((item, i) => (
                <AnimatedParagraph key={item.val} delay={i * 100}>
                  <div className="flex items-start gap-5 p-5 rounded-xl border border-gray-100 hover:border-[#C8A96E]/40 hover:shadow-md transition-all duration-300 group">
                    <div className="text-3xl font-black text-[#C8A96E] min-w-[80px]">{item.val}</div>
                    <div>
                      <div className="font-bold text-[#0B2545] text-sm uppercase tracking-wider">{item.label}</div>
                      <div className="text-gray-500 text-sm mt-1">{item.desc}</div>
                    </div>
                  </div>
                </AnimatedParagraph>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MOT DU DIRECTEUR
      ══════════════════════════════════════════ */}
      <section ref={directorSection.ref} className="py-28 bg-[#F7F9FC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedParagraph>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">
                Le mot du directeur
              </span>
            </div>
          </AnimatedParagraph>

          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Photo directeur */}
            <div
              className={`lg:col-span-2 relative transition-all duration-1000 ${directorSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
            >
              {/* Fond décoratif de la section photo */}
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full bg-[#0B2545]/5 rounded-2xl" />
                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#C8A96E]/30 rounded-2xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ marginBottom: "-60px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                    alt="Jean-Baptiste Moundounga, Directeur Général"
                    className="w-full h-[480px] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="font-black text-white text-xl">Jean-Baptiste Moundounga</div>
                    <div className="text-[#C8A96E] text-sm font-semibold uppercase tracking-wider mt-1">
                      Directeur Général
                    </div>
                  </div>
                </div>
                {/* Badge qui déborde */}
                <div className="absolute -right-8 top-12 bg-[#C8A96E] text-white px-5 py-3 rounded-xl shadow-lg z-10">
                  <div className="text-2xl font-black">18</div>
                  <div className="text-xs uppercase tracking-widest">ans</div>
                </div>
              </div>
            </div>

            {/* Citation et texte */}
            <div
              className={`lg:col-span-3 pt-8 transition-all duration-1000 delay-200 ${directorSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
            >
              {/* Guillemet décoratif */}
              <div className="text-[120px] leading-none text-[#C8A96E]/20 font-black select-none -mb-8">
                &ldquo;
              </div>

              <AnimatedParagraph>
                <p className="text-2xl md:text-3xl font-bold text-[#0B2545] leading-relaxed italic">
                  Quand j&apos;ai fondé AKIBA BTP, je voulais prouver qu&apos;une
                  entreprise gabonaise pouvait rivaliser avec les plus grands
                  groupes internationaux — non pas en les imitant, mais en
                  portant notre propre vision de l&apos;excellence.
                </p>
              </AnimatedParagraph>

              <AnimatedParagraph delay={200} className="mt-8">
                <p className="text-gray-600 leading-relaxed">
                  Dix-huit ans plus tard, je suis fier de dire que nous y sommes
                  parvenus. Chaque pont, chaque route, chaque bâtiment que nous
                  livrons est le fruit du travail acharné de femmes et
                  d&apos;hommes extraordinaires qui partagent la même conviction :
                  construire bien, c&apos;est construire pour les générations
                  futures.
                </p>
              </AnimatedParagraph>

              <AnimatedParagraph delay={300} className="mt-5">
                <p className="text-gray-600 leading-relaxed">
                  Notre ambition ne s&apos;arrête pas aux frontières du Gabon. Avec
                  la solidité de nos fondations — humaines, techniques et
                  financières — nous regardons vers l&apos;Afrique centrale avec
                  confiance et détermination. AKIBA BTP n&apos;a pas fini de
                  construire.
                </p>
              </AnimatedParagraph>

              {/* Signature */}
              <AnimatedParagraph delay={400} className="mt-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-0.5 bg-[#C8A96E]" />
                  <div>
                    <div className="font-black text-[#0B2545]">Jean-Baptiste Moundounga</div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest mt-0.5">Fondateur & Directeur Général</div>
                  </div>
                </div>
              </AnimatedParagraph>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VALEURS
      ══════════════════════════════════════════ */}
      <section ref={valuesSection.ref} className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedParagraph>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
                <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">
                  Ce qui nous guide
                </span>
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0B2545] leading-tight">
                Nos valeurs fondamentales.
              </h2>
              <p className="mt-5 text-gray-500 leading-relaxed">
                Nos valeurs ne sont pas des mots sur un mur. Ce sont les
                principes qui orientent chacune de nos décisions, sur le
                chantier comme au bureau.
              </p>
            </div>
          </AnimatedParagraph>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => (
              <AnimatedParagraph key={value.title} delay={i * 100}>
                <div className="group p-8 rounded-2xl border border-gray-100 hover:border-[#C8A96E]/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                  <div className="text-4xl text-[#C8A96E] mb-5 group-hover:scale-110 transition-transform duration-300 font-black">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-black text-[#0B2545] mb-3">{value.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm flex-1">{value.description}</p>
                  <div className="mt-6 w-8 h-0.5 bg-[#C8A96E] group-hover:w-full transition-all duration-500" />
                </div>
              </AnimatedParagraph>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ENGAGEMENTS
      ══════════════════════════════════════════ */}
      <section ref={commitmentsSection.ref} className="py-28 bg-[#0B2545] relative overflow-hidden">
        {/* Déco */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] border border-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 border border-white/5 rounded-full -translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedParagraph>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
                <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">
                  Nos engagements
                </span>
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Ce que vous pouvez
                <br />
                attendre de nous.
              </h2>
              <p className="mt-5 text-blue-200 leading-relaxed">
                Travailler avec AKIBA BTP, c&apos;est bénéficier d&apos;un
                partenaire fiable, structuré et entièrement dévoué à la
                réussite de votre projet.
              </p>
            </div>
          </AnimatedParagraph>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {COMMITMENTS.map((item, i) => (
              <AnimatedParagraph key={item.number} delay={i * 80}>
                <div className="bg-[#0B2545] p-8 hover:bg-[#0d2d5e] transition-colors duration-300 group h-full">
                  <div className="text-5xl font-black text-white/10 group-hover:text-[#C8A96E]/30 transition-colors duration-300 mb-4 leading-none">
                    {item.number}
                  </div>
                  <h3 className="text-lg font-black text-white mb-3">{item.title}</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">{item.description}</p>
                  <div className="mt-6 w-8 h-0.5 bg-[#C8A96E]/40 group-hover:w-full group-hover:bg-[#C8A96E] transition-all duration-500" />
                </div>
              </AnimatedParagraph>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TIMELINE / HISTOIRE
      ══════════════════════════════════════════ */}


      {/* ══════════════════════════════════════════
          ÉQUIPE
      ══════════════════════════════════════════ */}
      <section ref={teamSection.ref} className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedParagraph>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
                <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">
                  Les hommes et femmes
                </span>
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0B2545] leading-tight">
                Notre équipe 
              </h2>
              <p className="mt-5 text-gray-500 leading-relaxed">
                Derrière chaque projet réussi, il y a des femmes et des hommes
                passionnés, compétents et engagés. Voici ceux qui portent
                AKIBA BTP au quotidien.
              </p>
            </div>
          </AnimatedParagraph>

          {/* Grille photos rondes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 max-w-4xl mx-auto">
            {TEAM.map((member, i) => (
              <AnimatedParagraph key={member.name} delay={i * 80}>
                <div className="flex flex-col items-center text-center group">
                  <div className="relative mb-4">
                    {/* Anneau décoratif */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#C8A96E]/0 group-hover:border-[#C8A96E]/60 transition-all duration-500 scale-100 group-hover:scale-110" />
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl group-hover:shadow-[#C8A96E]/20 transition-all duration-500 group-hover:scale-105">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Dot statut */}
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <h3 className="font-bold text-[#0B2545] text-sm leading-tight">{member.name}</h3>
                  <p className="text-[#C8A96E] text-xs uppercase tracking-wider mt-1 font-semibold">{member.role}</p>
                </div>
              </AnimatedParagraph>
            ))}
          </div>

          {/* Bouton rejoindre */}
          <AnimatedParagraph delay={400}>
            <div className="text-center mt-16">
              <p className="text-gray-500 mb-6 text-lg">
                Vous souhaitez rejoindre une équipe ambitieuse et construire
                votre carrière dans le BTP gabonais ?
              </p>
              <a
                href="/carrieres"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#0B2545] text-white font-black uppercase tracking-wider rounded-lg text-sm hover:bg-[#C8A96E] transition-all duration-300 hover:shadow-xl hover:shadow-[#0B2545]/20 group"
              >
                Nous rejoindre
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </AnimatedParagraph>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA CONTACT
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-[#C8A96E]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedParagraph>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Un projet à nous confier ?
            </h2>
            <p className="mt-4 text-white/80 text-lg">
              Notre équipe commerciale est disponible pour étudier votre
              dossier et vous proposer une solution adaptée.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a href="/contact" className="px-8 py-4 bg-white text-[#0B2545] font-black uppercase tracking-wider rounded-lg hover:bg-[#0B2545] hover:text-white transition-all duration-300">
                Nous contacter
              </a>
              <a href="/projets" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:text-[#0B2545] transition-all duration-300">
                Voir nos réalisations
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
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">Services</h4>
              <ul className="space-y-3">
                {["Génie Civil", "Bâtiment & Construction", "Routes & Infrastructures", "Aménagement Urbain", "Travaux Électriques", "Plomberie & Réseaux"].map((s) => (
                  <li key={s}>
                    <a href="/services" className="text-gray-400 hover:text-[#C8A96E] transition-colors text-sm">{s}</a>
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
      `}</style>
    </main>
  );
}
