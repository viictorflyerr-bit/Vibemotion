"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Check,
  ChevronDown,
  BookOpen,
  CalendarClock,
  Copy,
  DollarSign,
  Film,
  Grid3X3,
  Infinity,
  Mail,
  Menu,
  MonitorPlay,
  Play,
  ShieldCheck,
  ShoppingBag,
  Star,
  Tv,
  X,
  Zap,
} from "lucide-react";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { BuyButton } from "@/components/buy-button";
import {
  benefits,
  comments,
  faqs,
  metrics,
  navItems,
  offerItems,
  packs,
  siteConfig,
  steps,
  testimonials,
  usageCards,
} from "@/lib/site-data";

const sectionLabel = "text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#35C8FF]";

function Logo() {
  return (
    <a href="#inicio" className="group flex items-center gap-2 outline-none">
      <span className="grid h-8 w-8 place-items-center rounded-[6px] border border-[#35C8FF]/35 bg-[#087EFF]/20 text-[#35C8FF] shadow-[0_0_24px_rgba(8,126,255,.24)]">
        <Zap aria-hidden="true" className="h-4 w-4 fill-[#35C8FF]/30" />
      </span>
      <span className="leading-none">
        <span className="block text-sm font-black uppercase tracking-[0.12em] text-white">
          Vibe
        </span>
        <span className="block text-[0.62rem] font-black uppercase tracking-[0.28em] text-[#35C8FF]">
          Motion
        </span>
      </span>
    </a>
  );
}

function HeaderLogo() {
  return (
    <a
      href="#inicio"
      aria-label="VIBE MOTION"
      className="block outline-none focus-visible:ring-2 focus-visible:ring-[#35C8FF]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/header-logo.png"
        alt="VIBE MOTION"
        width={220}
        height={70}
        className="h-16 w-auto object-contain sm:h-20"
      />
    </a>
  );
}

function useScrolled(offset = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}

function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(10);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-50 mx-auto w-full border-b border-transparent transition-all duration-300 ease-out md:rounded-[8px] md:border",
        scrolled && !open
          ? "border-cyan-100/12 bg-[#05070A]/72 shadow-[0_18px_60px_rgba(0,0,0,.32)] backdrop-blur-xl md:top-4 md:max-w-5xl"
          : "max-w-full bg-[#05070A]/88 backdrop-blur-xl",
        open ? "bg-[#05070A]/96" : "",
      ].join(" ")}
    >
      <nav
        className={[
          "mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 transition-all duration-300 ease-out sm:px-6 lg:px-8",
          scrolled ? "md:h-16 md:max-w-5xl md:px-3" : "",
        ].join(" ")}
      >
        <HeaderLogo />

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.16em] text-cyan-50/62 transition hover:bg-white/[0.045] hover:text-[#35C8FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35C8FF]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <BuyButton compact>Garantir acesso</BuyButton>
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="grid h-10 w-10 place-items-center rounded-full border border-cyan-100/16 bg-white/[0.045] text-white transition hover:border-[#35C8FF]/50 hover:text-[#35C8FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35C8FF] lg:hidden"
        >
          {open ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </nav>

      <div
        className={[
          "fixed inset-x-0 bottom-0 top-20 z-50 overflow-hidden border-y border-cyan-100/10 bg-[#05070A]/96 backdrop-blur-xl transition lg:hidden",
          open ? "block" : "hidden",
        ].join(" ")}
      >
        <div className="flex h-full w-full flex-col justify-between gap-6 p-4">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[8px] border border-cyan-100/10 bg-white/[0.04] px-4 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-[#35C8FF]/40 hover:text-[#35C8FF]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="border-t border-cyan-100/10 pt-4">
            <BuyButton className="w-full">Garantir acesso</BuyButton>
            <p className="mt-4 text-xs leading-6 text-cyan-50/45">
              Compra processada em checkout externo. O acesso chega no e-mail
              usado na compra.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSocialProof() {
  const avatars = [
    "/avatars/artist-01.svg",
    "/avatars/artist-02.svg",
    "/avatars/artist-03.svg",
    "/avatars/artist-04.svg",
  ];

  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-3">
        {avatars.map((avatar, index) => (
          <Image
            key={avatar}
            src={avatar}
            alt={`Artista ${index + 1}`}
            width={42}
            height={42}
            className="h-10 w-10 rounded-full border-2 border-[#05070A] bg-[#101827] object-cover"
          />
        ))}
      </div>
      <div>
        <div className="flex text-[#35C8FF]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              aria-hidden="true"
              className="h-4 w-4 fill-current"
            />
          ))}
        </div>
        <p className="mt-1 whitespace-nowrap font-mono text-[0.68rem] font-black uppercase tracking-[0.12em] text-cyan-50/48 sm:text-xs sm:tracking-[0.16em]">
          Mais de {siteConfig.videoCount} artistas já utilizaram
        </p>
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  lines,
  center = true,
}: {
  eyebrow: string;
  lines: Array<string | React.ReactNode>;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-4xl text-center" : "max-w-2xl"}>
      <p className={sectionLabel}>{eyebrow}</p>
      <h2 className="display-font mt-3 text-balance text-4xl font-black uppercase leading-[0.9] tracking-normal text-white sm:text-5xl lg:text-6xl">
        {lines.map((line, index) => (
          <span className="title-wrap block" key={index}>
            <span className="title-line block">{line}</span>
          </span>
        ))}
      </h2>
    </div>
  );
}

function MetricValue({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  return (
    <span
      data-counter
      data-target={value}
      data-suffix={suffix}
      className="font-mono text-3xl font-black text-[#05070A] sm:text-4xl"
    >
      0{suffix}
    </span>
  );
}

function PlayBadge() {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/15 backdrop-blur">
      <Play aria-hidden="true" className="ml-0.5 h-4 w-4 fill-white text-white" />
    </span>
  );
}

const benefitIcons = {
  infinity: Infinity,
  copy: Copy,
  money: DollarSign,
  screen: Tv,
  zap: Zap,
  book: BookOpen,
};

export function LandingPage() {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
      });

      gsap.utils.toArray<HTMLElement>(".title-line").forEach((line) => {
        gsap.from(line, {
          yPercent: 105,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: "top 88%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((item) => {
        gsap.from(item, {
          y: 36,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 86%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".thumb-card").forEach((item, index) => {
        gsap.from(item, {
          y: 34,
          opacity: 0,
          scale: 0.96,
          duration: 0.6,
          delay: (index % 4) * 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((counter) => {
        const target = Number(counter.dataset.target ?? 0);
        const suffix = counter.dataset.suffix ?? "";
        const state = { value: 0 };

        gsap.to(state, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 92%",
            once: true,
          },
          onUpdate: () => {
            counter.textContent = `${Math.round(state.value)}${suffix}`;
          },
        });
      });

      if (window.innerWidth >= 768) {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((item) => {
          gsap.to(item, {
            yPercent: Number(item.dataset.parallax ?? -8),
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scope} className="min-h-screen overflow-hidden bg-[#05070A] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_25%_8%,rgba(8,126,255,.28),transparent_34%),radial-gradient(circle_at_80%_22%,rgba(53,200,255,.16),transparent_28%),linear-gradient(180deg,#05070A_0%,#080D16_44%,#05070A_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 cinema-grid opacity-35" />

      <Header />

      <main id="inicio">
        <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
          <div className="absolute right-0 top-8 text-[18vw] font-black uppercase leading-none text-white/[0.025]">
           
          </div>
          <div className="absolute bottom-8 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#35C8FF]/40 to-transparent" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.86fr_1.14fr]">
            <div>
              <p className={`${sectionLabel} hero-reveal`}>Crie vídeos para telão no celular</p>
              <h1 className="display-font mt-3 text-balance text-4xl font-black uppercase leading-[0.9] tracking-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                <span className="hero-reveal block">Sem designer</span>
                <span className="hero-reveal block">e sem editor</span>
                <span className="hero-reveal block text-[#35C8FF]">de vídeo.</span>
              </h1>
              <p className="hero-reveal mt-6 max-w-xl text-base leading-8 text-cyan-50/72 sm:text-lg">
                Escolha o modelo, gere seu visual 3D em minutos e leve pro palco já no próximo show.
              </p>
              <div className="hero-reveal mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <BuyButton
                  showIcon={false}
                  className="min-h-12 w-[300px] max-w-full gap-3 border-[#087EFF]/80 bg-[#06111F]/95 px-[18px] text-white shadow-[inset_0_0_0_1px_rgba(53,200,255,.08),0_0_22px_rgba(8,126,255,.12)] hover:-translate-y-0 hover:border-[#35C8FF] hover:bg-[#07182A] hover:text-white sm:w-[300px]"
                >
                  <span className="font-mono text-sm font-black tracking-normal text-cyan-50/34 line-through decoration-cyan-50/34">
                    {siteConfig.previousPrice}
                  </span>
                  <span className="font-mono text-2xl font-black tracking-normal text-[#35C8FF]">
                    {siteConfig.price}
                  </span>
                  <span className="h-5 w-px bg-[#35C8FF]/34" aria-hidden="true" />
                  <span className="font-mono text-xs font-black tracking-[0.06em] text-white">
                    ACESSO VITALÍCIO
                  </span>
                </BuyButton>
              </div>
              <div className="hero-reveal mt-8">
                <HeroSocialProof />
              </div>
            </div>

            <div className="hero-reveal relative" data-parallax="-5">
              <div className="absolute -inset-6 rounded-full bg-[#087EFF]/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[8px] border border-cyan-200/20 bg-[#101827] shadow-[0_0_90px_rgba(8,126,255,.26)]">
                <Image
                  src="/posters/hero-stage.svg"
                  alt="Mockup de telão em show com visual VIBE MOTION"
                  width={1200}
                  height={720}
                  priority
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/88 to-transparent p-5">
                  <div>
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#35C8FF]">
                      Preview pack
                    </p>
                    <p className="mt-1 text-lg font-black uppercase leading-none">
                      Led Stage Opener
                    </p>
                  </div>
                  <PlayBadge />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#087EFF] px-4 py-7 text-[#05070A]">
          <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="section-reveal text-center">
                <MetricValue value={metric.value} suffix={metric.suffix} />
                <p className="mt-1 text-xs font-black uppercase tracking-[0.18em]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1fr]">
            <SectionTitle
              eyebrow="Impacto visual"
              center={false}
              lines={[
                "O público grava",
                <>
                  o que <span className="text-[#35C8FF]">impressiona.</span>
                </>,
              ]}
            />
            <div className="section-reveal max-w-2xl text-lg leading-9 text-cyan-50/72">
              <p>
                Um telão profissional aumenta o impacto do show, fortalece a
                identidade do artista e faz cada música parecer parte de um
                espetáculo pensado para ser lembrado.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["Palco mais forte", MonitorPlay],
                  ["Conteúdo pronto", Film],
                ].map(([label, Icon]) => {
                  const IconComponent = Icon as typeof MonitorPlay;
                  return (
                    <div
                      key={label as string}
                      className="rounded-[8px] border border-cyan-100/12 bg-white/[0.045] p-5"
                    >
                      <IconComponent aria-hidden="true" className="h-6 w-6 text-[#35C8FF]" />
                      <p className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-white">
                        {label as string}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="section-reveal">
            <BeforeAfterSlider />
          </div>
        </section>

        <section className="tech-lines px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_0.7fr]">
            <div>
              <SectionTitle
                eyebrow="VEJA NA PRÁTICA"
                center={false}
                lines={[
                  "Faça",
                  <>
                    você <span className="text-[#35C8FF]">mesmo.</span>
                  </>,
                ]}
              />
              <p className="section-reveal mt-6 max-w-xl text-lg leading-8 text-cyan-50/72">
                Neste vídeo mostramos o processo completo. Do modelo ao visual 3D pronto para o palco. Você vê na prática, sem enrolação. E o melhor: dá pra fazer tudo direto pelo celular, sem precisar de computador.
              </p>
              <div className="section-reveal mt-8">
                <BuyButton compact>Quero fazer igual</BuyButton>
              </div>
            </div>
            <div className="section-reveal relative mx-auto w-full max-w-sm" data-parallax="-7">
              <div className="absolute -inset-5 rounded-full bg-[#35C8FF]/15 blur-3xl" />
              <Image
                src="/posters/device-library.svg"
                alt="Mockup de celular acessando biblioteca de visuais"
                width={520}
                height={680}
                className="relative h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="SEM FILTRO"
            lines={[
              "Profissionais notam",
              <>
                quando o palco <span className="text-[#35C8FF]">evolui.</span>
              </>,
            ]}
          />
          <div className="mx-auto mt-9 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {comments.map((comment, index) => (
              <div
                key={comment}
                className="section-reveal rounded-[8px] border border-cyan-100/10 bg-[#101827]/70 p-4 text-sm leading-6 text-cyan-50/74"
              >
                <span className="font-mono text-xs font-black text-[#35C8FF]">
                  0{index + 1}
                </span>
                <p className="mt-2">{comment}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Passo a passo"
            lines={[
              "Como",
              <>
                <span className="text-[#35C8FF]">funciona</span>
              </>,
            ]}
          />
          <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="hover-border-card section-reveal overflow-hidden rounded-[8px] border border-cyan-100/12 bg-white/[0.055] p-6 transition duration-300"
              >
                <span className="grid h-10 w-10 place-items-center rounded-[6px] bg-[#087EFF] font-mono text-sm font-black text-white">
                  {step.number}
                </span>
                <h3 className="mt-8 text-xl font-black uppercase text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-cyan-50/62">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="recebe" className="px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Packs inclusos"
            lines={[
              "Veja o que",
              <>
                você <span className="text-[#35C8FF]">recebe</span>
              </>,
            ]}
          />
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packs.map((pack) => (
              <article
                key={pack.title}
                className="thumb-card group relative overflow-hidden rounded-[8px] border border-cyan-100/12 bg-[#101827]"
              >
                <Image
                  src={pack.image}
                  alt={`Miniatura do pack ${pack.title}`}
                  width={720}
                  height={420}
                  className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/84 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                  <div>
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#35C8FF]">
                      Pack visual
                    </p>
                    <h3 className="mt-1 text-lg font-black uppercase leading-none">
                      {pack.title}
                    </h3>
                  </div>
                  <PlayBadge />
                </div>
              </article>
            ))}
          </div>
          <div className="section-reveal mt-10 text-center">
            <BuyButton>Garantir acesso agora</BuyButton>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1fr]">
            <div>
              <SectionTitle
                eyebrow="SEGUNDO MECANISMO"
                center={false}
                lines={[
                  "Use no seu show",
                  <>
                    ou venda para <span className="text-[#35C8FF]">outros.</span>
                  </>,
                ]}
              />
              <p className="section-reveal mt-6 max-w-xl text-lg leading-8 text-cyan-50/72">
                O Seu Telão não é só para o seu palco. Qualquer cantor da sua região precisa de telão e você pode ser quem entrega isso. R$ 37 que se paga com um único cliente.
              </p>
              <div className="section-reveal mt-8">
                <BuyButton compact>Quero usar nos meus shows</BuyButton>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {usageCards.map((card) => (
                <div
                  key={card.number}
                  className="hover-border-card section-reveal relative min-h-44 overflow-hidden rounded-[14px] border border-cyan-100/14 bg-[#1B1D20]/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.04)] transition duration-300 sm:min-h-48 sm:p-7"
                >
                  <span className="font-mono text-base font-black text-[#35C8FF]">
                    {card.number}
                  </span>
                  <h3 className="mt-5 max-w-xs text-sm font-black uppercase leading-6 tracking-[0.1em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-base font-semibold leading-7 text-cyan-50/56">
                    {card.body}
                  </p>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-6 right-0 font-mono text-8xl font-black leading-none text-[#35C8FF]/7 sm:text-9xl"
                  >
                    {card.number}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cinema-grid px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.34em] text-[#35C8FF]">
              Por que investir
            </p>
            <h2 className="display-font mt-7 text-balance text-5xl font-black uppercase leading-[0.9] text-white sm:text-6xl lg:text-7xl">
              O que muda no
              <span className="mt-4 block text-[#35C8FF]">seu show</span>
            </h2>
          </div>
          <div className="mx-auto mt-14 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefitIcons[benefit.icon as keyof typeof benefitIcons];

              return (
              <div
                key={benefit.title}
                className="hover-border-card section-reveal overflow-hidden rounded-[14px] border border-cyan-100/14 bg-[#1B1D20]/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.04)] transition duration-300"
              >
                <div className="flex items-start gap-5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[12px] border border-[#35C8FF]/32 bg-[#087EFF]/12 text-[#35C8FF] shadow-[0_0_22px_rgba(8,126,255,.12)]">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-sm font-black uppercase leading-6 tracking-[0.08em] text-white">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-base font-semibold leading-7 text-cyan-50/56">
                      {benefit.body}
                    </p>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </section>

        <section className="cinema-grid px-4 py-20 sm:px-6 lg:px-8">
          <div className="hover-border-card section-reveal mx-auto max-w-2xl overflow-hidden rounded-[22px] border border-cyan-200/20 bg-[#1B1D20]/96 p-7 shadow-[0_0_90px_rgba(8,126,255,.18)] sm:p-10">
            <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
              <div>
                <p className="text-[0.68rem] font-black uppercase tracking-[0.34em] text-[#35C8FF]">
                  Acesso vitalício
                </p>
                <h2 className="display-font mt-4 text-3xl font-black uppercase leading-none text-white sm:text-5xl">
                  VIBE MOTION
                </h2>
              </div>
              <div className="text-right">
                {siteConfig.previousPrice ? (
                  <p className="font-mono text-sm text-cyan-50/28 line-through">
                    {siteConfig.previousPrice}
                  </p>
                ) : null}
                <div className="flex items-end justify-end gap-3">
                  <span className="display-font text-5xl font-black leading-none text-white sm:text-6xl">
                    R$
                  </span>
                  <span className="display-font text-6xl font-black leading-none text-[#35C8FF] sm:text-7xl">
                    37
                  </span>
                </div>
                <span className="mt-2 inline-flex rounded-[6px] border border-[#35C8FF]/45 bg-[#087EFF]/12 px-3 py-1 font-mono text-[0.68rem] font-black uppercase tracking-[0.12em] text-[#35C8FF]">
                  Você economiza R$30
                </span>
              </div>
            </div>

            <ul className="mt-10 space-y-4">
              {offerItems.map((item) => (
                <li key={item} className="flex gap-4 text-base font-semibold leading-7 text-cyan-50/72">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#35C8FF]/45 bg-[#087EFF]/12 text-[#35C8FF]">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-center font-mono text-[0.68rem] font-black uppercase tracking-[0.24em] text-cyan-50/35">
              GARANTA SUA VAGA AGORA
            </p>

            <div className="mt-5">
              <BuyButton
                showIcon={false}
                className="min-h-14 w-full gap-3 border-[#35C8FF]/70 bg-[#087EFF] px-5 text-center text-[#05070A] shadow-[0_18px_38px_rgba(8,126,255,.34)] hover:border-[#35C8FF] hover:bg-[#35C8FF] hover:text-[#05070A]"
              >
                <ShoppingBag aria-hidden="true" className="h-5 w-5" />
                <span className="font-mono text-sm font-black tracking-[0.12em]">
                  INVESTIR AGORA POR {siteConfig.price}
                </span>
              </BuyButton>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[0.68rem] font-black uppercase tracking-[0.12em] text-cyan-50/35">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#35C8FF]/60" />
                Pagamento seguro
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarClock aria-hidden="true" className="h-4 w-4 text-[#35C8FF]/60" />
                Acesso imediato
              </span>
            </div>
          </div>
        </section>

        <section id="depoimentos" className="px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Depoimentos"
            lines={[
              "O que estão",
              <>
                <span className="text-[#35C8FF]">dizendo</span>
              </>,
            ]}
          />
          <div className="mx-auto mt-10 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="section-reveal rounded-[8px] border border-cyan-100/12 bg-[#101827]/80 p-5"
              >
                <div className="flex text-[#35C8FF]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} aria-hidden="true" className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-cyan-50/72">
                  {testimonial.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#087EFF] font-mono text-xs font-black">
                    {testimonial.avatar}
                  </span>
                  <span>
                    <strong className="block text-sm uppercase">{testimonial.name}</strong>
                    <span className="text-xs text-cyan-50/45">{testimonial.role}</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="TIRE SUAS DÚVIDAS"
            lines={[
              "PERGUNTAS",
              <>
                <span className="text-[#35C8FF]">frequentes</span>
              </>,
            ]}
          />
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="section-reveal group rounded-[8px] border border-cyan-100/12 bg-white/[0.045] px-5 py-4"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-sm font-black uppercase tracking-[0.08em] text-white">
                  {faq.question}
                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-[#35C8FF] transition group-open:rotate-180"
                  />
                </summary>
                <p className="mt-4 text-sm leading-7 text-cyan-50/65">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="section-reveal mx-auto max-w-4xl text-center">
            <p className={sectionLabel}>NÃO DEIXA PRA AMANHÃ</p>
            <h2 className="display-font mt-4 text-balance text-5xl font-black uppercase leading-[0.9] sm:text-6xl">
              Seu próximo show <span className="text-[#35C8FF]">começa aqui.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-cyan-50/70">
             R$ 37 · Uma vez · Para sempre
            </p>
            <div className="mt-8 flex justify-center">
              <BuyButton>Garantir acesso</BuyButton>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-cyan-50/52">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#35C8FF]" />
                Compra segura
              </span>
              <span className="inline-flex items-center gap-2">
                <Mail aria-hidden="true" className="h-4 w-4 text-[#35C8FF]" />
                Acesso por e-mail
              </span>
              <span className="inline-flex items-center gap-2">
                <Grid3X3 aria-hidden="true" className="h-4 w-4 text-[#35C8FF]" />
                Biblioteca digital
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-cyan-100/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto_auto]">
          <div>
            <Logo />
            <p className="mt-5 max-w-md text-sm leading-7 text-cyan-50/55">
             A maior biblioteca de visuais 3D para artistas de forró, arrocha, sertanejo e muito mais. O palco é seu. O telão também.
            </p>
          </div>
          <div className="space-y-3 text-sm text-cyan-50/60">
            <p className="font-black uppercase tracking-[0.14em] text-white">Links</p>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="block hover:text-[#35C8FF]">
                {item.label}
              </a>
            ))}
          </div>
          <div className="space-y-3 text-sm text-cyan-50/60">
            <p className="font-black uppercase tracking-[0.14em] text-white">Suporte</p>
            <a href="#" className="block hover:text-[#35C8FF]">
              Termos de uso
            </a>
            <a href="#" className="block hover:text-[#35C8FF]">
              Política de privacidade
            </a>
            <a href="suporte.vibemotion@gmail.com" className="block hover:text-[#35C8FF]">
              suporte.vibemotion@gmail.com
            </a>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-cyan-100/10 pt-6 text-xs text-cyan-50/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 VIBE MOTION. Todos os direitos reservados.</p>
          <p>Checkout externo via Kiwify ou Cakto.</p>
        </div>
      </footer>
    </div>
  );
}
