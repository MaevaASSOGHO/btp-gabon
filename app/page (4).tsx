"use client";

import { useEffect, useRef, useState } from "react";

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface Service {
  title: string;
  description: string;
  icon: string;
  image: string;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface Client {
  name: string;
  initials: string;
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "À propos", href: "/a-propos" },
  {
    label: "Services",
    href: "/services",
    sub: "Nos engagements",
    subHref: "/services#engagements",
  },
  {
    label: "Projets",
    href: "/projets",
    sub: "Actualités",
    subHref: "/projets#actualites",
  },
  { label: "Carrières", href: "/carrieres" },
];

const SERVICES: Service[] = [
  {
    title: "Génie Civil",
    description:
      "Conception et réalisation d'ouvrages d'art, fondations et structures béton armé.",
    icon: "🏗",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
  {
    title: "Bâtiment & Construction",
    description:
      "Construction neuve, réhabilitation et extension de bâtiments résidentiels et commerciaux.",
    icon: "🏢",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  {
    title: "Routes & Infrastructures",
    description:
      "Création et réfection de voiries, pistes, parkings et infrastructures routières.",
    icon: "🛣",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80",
  },
  {
    title: "Aménagement Urbain",
    description:
      "Espaces publics, parcs, mobilier urbain et aménagements paysagers sur mesure.",
    icon: "🌆",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
  },
  {
    title: "Travaux Électriques",
    description:
      "Installations électriques HT/BT, éclairage public, tableaux de distribution.",
    icon: "⚡",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80",
  },
  {
    title: "Plomberie & Réseaux",
    description:
      "Réseaux d'eau potable, assainissement, adduction et travaux de canalisation.",
    icon: "🔧",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
];

const STATS: Stat[] = [
  { value: 18, suffix: "+", label: "Années d'expérience" },
  { value: 320, suffix: "+", label: "Projets réalisés" },
  { value: 95, suffix: "%", label: "Clients satisfaits" },
  { value: 12, suffix: "", label: "Villes au Gabon" },
];

const CLIENTS: Client[] = [
  { name: "République Gabonaise", initials: "RG" },
  { name: "SEEG Gabon", initials: "SG" },
  { name: "Olam Gabon", initials: "OG" },
  { name: "Total Gabon", initials: "TG" },
  { name: "Comilog", initials: "CM" },
  { name: "BGFIBank", initials: "BG" },
  { name: "Setrag", initials: "ST" },
  { name: "Ministère BTP", initials: "MB" },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useInView(threshold = 0.2) {
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

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function StatCard({ stat, animate }: { stat: Stat; animate: boolean }) {
  const count = useCountUp(stat.value, 2200, animate);
  return (
    <div className="text-center">
      <div className="text-5xl font-black text-[#0B2545] tracking-tight">
        {count}
        <span className="text-[#C8A96E]">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-sm uppercase tracking-[0.2em] text-gray-500 font-medium">
        {stat.label}
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-[#0B2545]/30">
      <div className="relative h-72 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-[#0B2545]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="text-3xl mb-2">{service.icon}</div>
          <h3 className="text-xl font-bold text-white">{service.title}</h3>
          <p className="mt-2 text-sm text-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const statsSection = useInView(0.3);
  const aboutSection = useInView(0.2);
  const servicesSection = useInView(0.1);

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
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#0B2545] rounded-lg flex items-center justify-center group-hover:bg-[#C8A96E] transition-colors duration-300">
              <span className="text-white font-black text-lg">A</span>
            </div>
            <div>
              <span
                className={`font-black text-xl tracking-tight transition-colors duration-300 ${scrolled ? "text-[#0B2545]" : "text-white"}`}
              >
                AKIBA BTP
              </span>
              <div
                className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${scrolled ? "text-[#C8A96E]" : "text-blue-200"}`}
              >
                Gabon
              </div>
            </div>
          </a>

          {/* Nav desktop */}
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
                  }`}
                >
                  {link.label}
                </a>
                {link.sub && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-3 bg-white rounded-xl shadow-2xl py-2 min-w-[180px] border border-gray-100">
                    <a
                      href={link.subHref}
                      className="block px-5 py-3 text-sm text-[#0B2545] hover:bg-[#0B2545] hover:text-white transition-colors duration-200 font-medium"
                    >
                      {link.sub}
                    </a>
                  </div>
                )}
              </div>
            ))}
            <a
              href="/contact"
              className="ml-4 px-6 py-3 bg-[#C8A96E] text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-[#0B2545] transition-all duration-300 hover:shadow-lg hover:shadow-[#0B2545]/30"
            >
              Nous contacter
            </a>
          </nav>

          {/* Burger mobile */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-[#0B2545]" : "bg-white"}`}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0B2545] px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white font-semibold uppercase tracking-wider text-sm"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact"
              className="mt-2 px-6 py-3 bg-[#C8A96E] text-white text-sm font-bold uppercase tracking-wider rounded-lg text-center"
            >
              Nous contacter
            </a>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════
          HERO — VIDÉO PLEIN ÉCRAN
      ══════════════════════════════════════════ */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Vidéo background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80"
        >
          {/* Remplace src par ton fichier vidéo */}
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Filtre overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545]/85 via-[#0B2545]/60 to-[#0B2545]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/60 via-transparent to-transparent" />

        {/* Contenu hero */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-0.5 bg-[#C8A96E]" />
                <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.3em]">
                  Depuis 2006 · Libreville, Gabon
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
                Bâtisseurs
                <br />
                <span className="text-[#C8A96E]">d&apos;avenir</span>
                <br />
                au Gabon.
              </h1>
              <p className="mt-6 text-lg text-blue-100 leading-relaxed max-w-xl">
                AKIBA BTP conçoit et réalise des infrastructures durables qui
                façonnent le paysage gabonais. Excellence technique,
                engagement local, résultats concrets.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/projets"
                  className="px-8 py-4 bg-[#C8A96E] text-white font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:text-[#0B2545] transition-all duration-300"
                >
                  Voir nos projets
                </a>
                <a
                  href="/a-propos"
                  className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:text-[#0B2545] transition-all duration-300"
                >
                  Qui sommes-nous
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Flèche scroll droite */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3">
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-white/60" />
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-white rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="w-px h-24 bg-gradient-to-b from-white/60 to-transparent" />
        </div>

        {/* Scroll indicator bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs uppercase tracking-[0.3em]">
            Défiler
          </span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          QUI SOMMES-NOUS
      ══════════════════════════════════════════ */}
      <section
        ref={aboutSection.ref}
        className="py-28 bg-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div
              className={`relative transition-all duration-1000 ${aboutSection.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`}
            >
              <div className="relative  overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="Équipe AKIBA BTP sur chantier"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/50 to-transparent" />
              </div>
              {/* Badge flottant */}
              <div className="absolute -bottom-6 -right-6 bg-[#C8A96E] text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-black leading-none">18</div>
                <div className="text-xs uppercase tracking-widest mt-1 font-semibold">
                  Ans d&apos;expertise
                </div>
              </div>
              {/* Décoration */}
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-[#0B2545]/10 rounded-2xl -z-10" />
            </div>

            {/* Texte */}
            <div
              className={`transition-all duration-1000 delay-200 ${aboutSection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-[#C8A96E]" />
                <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">
                  Qui sommes-nous
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0B2545] leading-tight">
                Un acteur majeur
                <br />
                du BTP gabonais.
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                Fondée en 2006 à Libreville, AKIBA BTP s&apos;est imposée comme
                une référence incontournable dans le secteur du bâtiment et des
                travaux publics au Gabon.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Forts d&apos;une équipe de plus de 200 collaborateurs
                qualifiés et d&apos;un parc matériel moderne, nous intervenons
                sur des projets d&apos;envergure pour le compte de l&apos;État,
                des collectivités et des opérateurs privés. Notre engagement :
                livrer des ouvrages durables, dans les délais et au meilleur
                coût.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/a-propos"
                  className="inline-flex items-center gap-3 px-8 py-4 text-[#0B2545] font-bold uppercase tracking-wider rounded-lg hover:bg-[#C8A96E] transition-all duration-300 group"
                >
                  En savoir plus
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section
        ref={servicesSection.ref}
        className="py-28 bg-[#F7F9FC]"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header section */}
          <div
            className={`max-w-2xl mb-16 transition-all duration-1000 ${servicesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">
                Nos expertises
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0B2545] leading-tight">
              Des solutions complètes
              <br />
              pour chaque projet.
            </h2>
            <p className="mt-5 text-gray-600 leading-relaxed text-lg">
              De la conception à la livraison, AKIBA BTP maîtrise l&apos;ensemble
              des corps de métier du BTP. Une offre intégrée qui vous garantit
              cohérence, qualité et sérénité tout au long de votre projet.
            </p>
            <a
              href="/services"
              className="mt-6 inline-flex items-center gap-2 text-[#0B2545] font-bold uppercase tracking-wider text-sm hover:text-[#C8A96E] transition-colors duration-300 group"
            >
              Tous nos services
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          {/* Grille services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`transition-all duration-700 ${servicesSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CHIFFRES CLÉS
      ══════════════════════════════════════════ */}
      <section
        ref={statsSection.ref}
        className="py-24 bg-white relative overflow-hidden"
      >
        {/* Décoration géométrique */}
        <div className="absolute top-0 right-0 w-96 h-96 border border-[#0B2545]/5 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-[#0B2545]/5 rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">
                AKIBA en chiffres
              </span>
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
            </div>
            <h2 className="text-4xl font-black text-[#0B2545]">
              18 ans de confiance bâtie projet après projet.
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {STATS.map((stat) => (
              <StatCard
                key={stat.label}
                stat={stat}
                animate={statsSection.inView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CALL TO ACTION — DEVIS
      ══════════════════════════════════════════ */}
      <section className="relative py-40 overflow-hidden">
        {/* Image fond */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1600&q=80"
          alt="Chantier de construction"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0B2545]/80" />
        {/* Diagonale décorative */}
        <div className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, rgba(11,37,69,0.95) 0%, rgba(11,37,69,0.7) 50%, rgba(200,169,110,0.3) 100%)"
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-0.5 bg-[#C8A96E]" />
            <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">
              Votre projet
            </span>
            <div className="w-10 h-0.5 bg-[#C8A96E]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Parlons de votre
            <br />
            <span className="text-[#C8A96E]">prochain chantier.</span>
          </h2>
          <p className="mt-6 text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Que vous soyez un particulier, une entreprise ou une institution
            publique, notre équipe est à votre écoute pour étudier votre
            projet et vous proposer une offre sur mesure.
          </p>
          <a
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 px-10 py-5 bg-[#C8A96E] text-white font-black uppercase tracking-wider rounded-lg text-lg hover:bg-white hover:text-[#0B2545] transition-all duration-300 hover:shadow-2xl hover:shadow-[#C8A96E]/30 group"
          >
            Demander un devis gratuit
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NOS CLIENTS
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">
                Ils nous font confiance
              </span>
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
            </div>
            <h2 className="text-4xl font-black text-[#0B2545]">
              Nos partenaires & clients.
            </h2>
          </div>

          {/* Carousel infini */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
            <div className="flex overflow-hidden">
              <div
                className="flex gap-8 animate-[scroll_25s_linear_infinite]"
                style={{ width: "max-content" }}
              >
                {[...CLIENTS, ...CLIENTS].map((client, i) => (
                  <div
                    key={`${client.name}-${i}`}
                    className="flex-none w-44 h-20 bg-[#F7F9FC] rounded-xl flex items-center justify-center gap-3 border border-gray-100 hover:border-[#C8A96E]/50 hover:shadow-md transition-all duration-300 group cursor-default"
                  >
                    <div className="w-8 h-8 bg-[#0B2545] group-hover:bg-[#C8A96E] rounded-lg flex items-center justify-center transition-colors duration-300">
                      <span className="text-white text-xs font-black">
                        {client.initials}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#0B2545] leading-tight">
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="bg-[#071829] text-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#C8A96E] rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-lg">A</span>
                </div>
                <div>
                  <div className="font-black text-xl">AKIBA BTP</div>
                  <div className="text-xs text-[#C8A96E] uppercase tracking-widest">
                    Gabon
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Bâtisseurs d&apos;ouvrages durables au service du développement
                gabonais depuis 2006.
              </p>
              <div className="flex gap-3 mt-6">
                {["f", "in", "ig"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-9 h-9 border border-white/20 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400 hover:bg-[#C8A96E] hover:border-[#C8A96E] hover:text-white transition-all duration-300"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">
                Navigation
              </h4>
              <ul className="space-y-3">
                {[
                  ["Accueil", "/"],
                  ["À propos", "/a-propos"],
                  ["Services", "/services"],
                  ["Projets", "/projets"],
                  ["Actualités", "/projets#actualites"],
                  ["Carrières", "/carrieres"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-gray-400 hover:text-[#C8A96E] transition-colors text-sm"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">
                Nos services
              </h4>
              <ul className="space-y-3">
                {SERVICES.map((s) => (
                  <li key={s.title}>
                    <a
                      href="/services"
                      className="text-gray-400 hover:text-[#C8A96E] transition-colors text-sm"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#C8A96E] mb-5">
                Contact
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3">
                  <span className="text-[#C8A96E] mt-0.5">📍</span>
                  <span>Boulevard Triomphal, Libreville, Gabon</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C8A96E]">📞</span>
                  <a href="tel:+24101000000" className="hover:text-white transition-colors">
                    +241 01 00 00 00
                  </a>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C8A96E]">✉️</span>
                  <a href="mailto:contact@akibabtp.ga" className="hover:text-white transition-colors">
                    contact@akibabtp.ga
                  </a>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C8A96E]">🕐</span>
                  <span>Lun–Ven : 07h30 – 17h00</span>
                </li>
              </ul>
              <a
                href="/contact"
                className="mt-6 inline-block px-6 py-3 bg-[#C8A96E] text-white text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-white hover:text-[#0B2545] transition-all duration-300"
              >
                Nous écrire →
              </a>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2024 AKIBA BTP Gabon. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#C8A96E] transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-[#C8A96E] transition-colors">
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Animation carousel CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
