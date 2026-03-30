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
// DATA
// ═══════════════════════════════════════════════════════════
const NAV_LINKS = [
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services", sub: "Nos engagements", subHref: "/services#engagements" },
  { label: "Projets", href: "/projets", sub: "Actualités", subHref: "/projets#actualites" },
  { label: "Carrières", href: "/carrieres" },
];

const SUBJECT_OPTIONS = [
  { value: "devis", label: "Demande de devis", icon: "📋", description: "Obtenir une estimation pour votre projet" },
  { value: "info", label: "Informations complémentaires", icon: "💬", description: "En savoir plus sur nos services" },
  { value: "partenariat", label: "Partenariat & collaboration", icon: "🤝", description: "Proposer une collaboration" },
  { value: "recrutement", label: "Question RH / recrutement", icon: "👥", description: "Candidature ou question RH" },
  { value: "autre", label: "Autre demande", icon: "📩", description: "Tout autre sujet" },
];

type FormState = {
  subject: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

// ═══════════════════════════════════════════════════════════
// INPUT COMPONENT
// ═══════════════════════════════════════════════════════════
function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
        {label} {required && <span className="text-[#C8A96E]">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#C8A96E] focus:outline-none focus:ring-2 focus:ring-[#C8A96E]/20 text-sm text-[#0B2545] transition-all duration-200 bg-white placeholder:text-gray-300";

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════
export default function ContactPage() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState<FormState>({
    subject: "",
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    setTimeout(() => setRevealed(true), 400);
  }, []);

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erreur serveur");
      }

      setStatus("success");
      setForm({ subject: "", firstName: "", lastName: "", company: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  };

  const selectedSubject = SUBJECT_OPTIONS.find((o) => o.value === form.subject);

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
                <a href={link.href} className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-[#C8A96E] ${scrolled ? "text-[#0B2545]" : "text-white"}`}>
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
      <section className="relative h-[65vh] min-h-[500px] w-full overflow-hidden">
        <div className={`absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${revealed ? "scale-100" : "scale-110"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" alt="Contact AKIBA BTP" className="w-full h-full object-cover" />
        </div>
        <div className={`absolute inset-x-0 top-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-top ${revealed ? "h-0" : "h-1/2"}`} />
        <div className={`absolute inset-x-0 bottom-0 bg-[#0B2545] z-20 transition-all duration-[1.1s] ease-[cubic-bezier(0.76,0,0.24,1)] origin-bottom ${revealed ? "h-0" : "h-1/2"}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/85 via-[#0B2545]/40 to-[#0B2545]/20 z-10" />

        <div className={`absolute top-28 left-6 md:left-12 z-10 transition-all duration-700 delay-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest">
            <a href="/" className="hover:text-[#C8A96E] transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-[#C8A96E]">Contact</span>
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 px-6 text-center">
          <div className={`transition-all duration-1000 delay-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.3em]">AKIBA BTP · Gabon</span>
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight">Contactez-nous</h1>
            <p className="mt-4 text-lg text-blue-100 max-w-lg mx-auto leading-relaxed">
              Une question, un projet, une opportunité ? Notre équipe vous répond sous 48h ouvrées.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTENU PRINCIPAL ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-16 items-start">

            {/* ── FORMULAIRE (3/5) ── */}
            <div className="lg:col-span-3">
              <FadeLeft>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-0.5 bg-[#C8A96E]" />
                  <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Formulaire de contact</span>
                </div>
                <h2 className="text-4xl font-black text-[#0B2545] mb-8">Écrivez-nous.</h2>
              </FadeLeft>

              {status === "success" ? (
                <FadeUp>
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-black text-[#0B2545] text-2xl mb-3">Message envoyé !</h3>
                    <p className="text-gray-500 leading-relaxed mb-6">Merci pour votre message. Notre équipe vous répondra dans les 48 heures ouvrées.</p>
                    <button onClick={() => setStatus("idle")}
                      className="px-8 py-3 bg-[#0B2545] text-white font-bold uppercase tracking-wider rounded-xl hover:bg-[#C8A96E] transition-all duration-300 text-sm"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                </FadeUp>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* OBJET — sélecteur visuel */}
                  <FadeUp delay={100}>
                    <Field label="Objet de votre message" required>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                        {SUBJECT_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, subject: opt.value }))}
                            className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                              form.subject === opt.value
                                ? "border-[#C8A96E] bg-[#C8A96E]/5 shadow-md"
                                : "border-gray-100 hover:border-gray-300 bg-white"
                            }`}
                          >
                            <span className="text-xl flex-none mt-0.5">{opt.icon}</span>
                            <div>
                              <div className={`font-bold text-sm ${form.subject === opt.value ? "text-[#C8A96E]" : "text-[#0B2545]"}`}>
                                {opt.label}
                              </div>
                              <div className="text-gray-400 text-xs mt-0.5 leading-snug">{opt.description}</div>
                            </div>
                            {form.subject === opt.value && (
                              <div className="ml-auto flex-none">
                                <div className="w-5 h-5 rounded-full bg-[#C8A96E] flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                      {/* Confirmation objet sélectionné */}
                      {selectedSubject && (
                        <div className="mt-3 flex items-center gap-2 text-[#C8A96E] text-xs font-semibold">
                          <span>{selectedSubject.icon}</span>
                          <span>Objet sélectionné : {selectedSubject.label}</span>
                        </div>
                      )}
                    </Field>
                  </FadeUp>

                  {/* Nom & Prénom */}
                  <FadeUp delay={150}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Prénom" required>
                        <input required type="text" value={form.firstName} onChange={set("firstName")}
                          placeholder="Jean-Baptiste" className={inputClass} />
                      </Field>
                      <Field label="Nom" required>
                        <input required type="text" value={form.lastName} onChange={set("lastName")}
                          placeholder="Moundounga" className={inputClass} />
                      </Field>
                    </div>
                  </FadeUp>

                  {/* Entreprise */}
                  <FadeUp delay={200}>
                    <Field label="Entreprise / Organisation">
                      <input type="text" value={form.company} onChange={set("company")}
                        placeholder="Nom de votre entreprise (optionnel)" className={inputClass} />
                    </Field>
                  </FadeUp>

                  {/* Email & Téléphone */}
                  <FadeUp delay={250}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Adresse email" required>
                        <input required type="email" value={form.email} onChange={set("email")}
                          placeholder="votre@email.com" className={inputClass} />
                      </Field>
                      <Field label="Numéro de téléphone">
                        <input type="tel" value={form.phone} onChange={set("phone")}
                          placeholder="+241 06 00 00 00" className={inputClass} />
                      </Field>
                    </div>
                  </FadeUp>

                  {/* Message */}
                  <FadeUp delay={300}>
                    <Field label="Votre message" required>
                      <textarea required rows={6} value={form.message} onChange={set("message")}
                        placeholder={
                          form.subject === "devis"
                            ? "Décrivez votre projet : nature des travaux, localisation, superficie, délai souhaité..."
                            : form.subject === "recrutement"
                            ? "Présentez votre profil et le type de poste recherché..."
                            : "Décrivez votre demande en détail..."
                        }
                        className={`${inputClass} resize-none`}
                      />
                      <div className="mt-1.5 text-right text-xs text-gray-300">{form.message.length} caractères</div>
                    </Field>
                  </FadeUp>

                  {/* Erreur */}
                  {status === "error" && (
                    <FadeUp>
                      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                        <svg className="w-5 h-5 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {errorMsg || "Une erreur est survenue. Veuillez réessayer."}
                      </div>
                    </FadeUp>
                  )}

                  {/* Submit */}
                  <FadeUp delay={350}>
                    <button
                      type="submit"
                      disabled={status === "loading" || !form.subject}
                      className="w-full py-5 bg-[#0B2545] text-white font-black uppercase tracking-wider rounded-xl hover:bg-[#C8A96E] transition-all duration-300 text-sm flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </button>
                    {!form.subject && (
                      <p className="text-center text-xs text-gray-400 mt-2">Veuillez sélectionner un objet avant d&apos;envoyer.</p>
                    )}
                    <p className="text-center text-xs text-gray-400 mt-3">
                      Vos données sont utilisées uniquement pour répondre à votre demande. Aucun démarchage commercial.
                    </p>
                  </FadeUp>
                </form>
              )}
            </div>

            {/* ── INFOS CONTACT (2/5) ── */}
            <div className="lg:col-span-2">
              <FadeRight delay={200}>
                <div className="lg:sticky lg:top-28 space-y-6">

                  {/* Coordonnées */}
                  <div className="bg-[#0B2545] rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 border border-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="relative z-10">
                      <h3 className="font-black text-xl mb-6">Nos coordonnées</h3>
                      <div className="space-y-5">
                        {[
                          {
                            icon: (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            ),
                            label: "Adresse",
                            value: "Boulevard Triomphal Omar Bongo\nLibreville, Gabon",
                          },
                          {
                            icon: (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            ),
                            label: "Téléphone",
                            value: "+241 01 00 00 00\n+241 06 00 00 00",
                            href: "tel:+24101000000",
                          },
                          {
                            icon: (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            ),
                            label: "Email général",
                            value: "contact@akibabtp.ga",
                            href: "mailto:contact@akibabtp.ga",
                          },
                          {
                            icon: (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            ),
                            label: "Horaires",
                            value: "Lundi – Vendredi\n07h30 – 17h00",
                          },
                        ].map((item) => (
                          <div key={item.label} className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-[#C8A96E]/20 rounded-xl flex items-center justify-center flex-none text-[#C8A96E]">
                              {item.icon}
                            </div>
                            <div>
                              <div className="text-xs text-blue-300 uppercase tracking-widest font-semibold mb-1">{item.label}</div>
                              {item.href ? (
                                <a href={item.href} className="text-sm text-white/90 hover:text-[#C8A96E] transition-colors leading-relaxed whitespace-pre-line">
                                  {item.value}
                                </a>
                              ) : (
                                <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line">{item.value}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Emails dédiés */}
                  <div className="bg-[#F7F9FC] rounded-2xl p-6 border border-gray-100">
                    <h3 className="font-black text-[#0B2545] mb-4">Contacts directs</h3>
                    <div className="space-y-3">
                      {[
                        { role: "Devis & projets", email: "devis@akibabtp.ga", icon: "📋" },
                        { role: "Ressources humaines", email: "recrutement@akibabtp.ga", icon: "👥" },
                        { role: "Partenariats", email: "partenariats@akibabtp.ga", icon: "🤝" },
                      ].map((c) => (
                        <a key={c.email} href={`mailto:${c.email}`}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group border border-transparent hover:border-gray-100"
                        >
                          <span className="text-xl">{c.icon}</span>
                          <div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">{c.role}</div>
                            <div className="text-sm font-bold text-[#0B2545] group-hover:text-[#C8A96E] transition-colors">{c.email}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Délai de réponse */}
                  <div className="bg-[#C8A96E]/10 rounded-2xl p-6 border border-[#C8A96E]/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[#0B2545] font-black text-sm">Délai de réponse garanti</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Toutes les demandes reçues avant 16h sont traitées le jour même. Les autres reçoivent une réponse dans les <strong>48 heures ouvrées</strong>.
                    </p>
                  </div>
                </div>
              </FadeRight>
            </div>
          </div>
        </div>
      </section>

      {/* ── CARTE / LOCALISATION ── */}
      <section className="bg-[#F7F9FC] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-[#C8A96E]" />
              <span className="text-[#C8A96E] text-sm font-semibold uppercase tracking-[0.25em]">Nous trouver</span>
            </div>
            <h2 className="text-3xl font-black text-[#0B2545] mb-8">Notre siège social.</h2>
          </FadeUp>
          <FadeUp delay={100}>
            <div className="rounded-2xl overflow-hidden shadow-xl h-80 bg-[#0B2545] relative flex items-center justify-center">
              {/* Placeholder carte — remplace par un vrai composant Google Maps ou Mapbox */}
              <div className="text-center text-white/60">
                <svg className="w-12 h-12 mx-auto mb-3 text-[#C8A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="font-bold text-white">Boulevard Triomphal Omar Bongo</p>
                <p className="text-sm mt-1">Libreville, Gabon</p>
                <a
                  href="https://maps.google.com/?q=Libreville,Gabon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-6 py-2.5 bg-[#C8A96E] text-white text-sm font-bold rounded-lg hover:bg-white hover:text-[#0B2545] transition-all duration-300"
                >
                  Ouvrir dans Google Maps →
                </a>
              </div>
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
