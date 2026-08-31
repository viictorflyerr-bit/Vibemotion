"use client";

import {
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, CircleUserRound, ListChecks, LogOut, Menu, Play, Search, ShoppingBag, X } from "lucide-react";
import { categories, formatPrice, products, type Product } from "@/lib/catalog-data";
import { useAuth } from "@/components/auth-provider";
import { useCart } from "@/components/cart-provider";

const nav = [["Início", "/"], ["Comunidade", "/comunidade"], ["Tutoriais", "/#tutoriais"], ["Animações diferentes", "/#animacoes-diferentes"]];
const filterItems = [
  { id: "recent", name: "Adicionados recentemente" },
  { id: "variados", name: "Variados" },
  { id: "forro-piseiro-sertanejo", name: "Forró, Piseiro e Sertanejo" },
  { id: "futurista", name: "Futurista" },
  { id: "amor-paixao-romance", name: "Amor, Paixão e Romance" },
  { id: "las-vegas", name: "Las Vegas" },
  { id: "boteco", name: "Boteco" },
  { id: "eletronica-dj", name: "Eletrônica / DJ" },
  { id: "letreiros", name: "Letreiros" },
  { id: "rock", name: "Rock" },
  { id: "e-os-guri-rs", name: "É os Guri - Rio Grande do Sul" },
  { id: "pagode", name: "Pagode - Samba" },
  { id: "retro-baile", name: "Retrô/Baile" },
  { id: "sao-joao", name: "São João" },
  { id: "copa-do-mundo", name: "Copa do Mundo" },
];
const orderedCategories = filterItems
  .filter((item) => item.id !== "recent")
  .map((item) => categories.find((category) => category.id === item.id))
  .filter((category): category is (typeof categories)[number] => category !== undefined);
const recentCategory = {
  id: "recent",
  name: "Adicionados recentemente",
  description: "Os visuais mais recentes do catálogo.",
};

const recentCardNames = [
  "Amor Iluminado",
  "Carro do Patrão",
  "Paredão de Som",
  "Show Noturno",
  "Neon Cyberpunk",
  "Paredão de Som",
  "Sala do Vaqueiro",
  "Na Mesa do DJ",
];

const recentProducts = products.slice(0, recentCardNames.length).map((product, index) => ({
  ...product,
  categoryId: "recent",
  title: recentCardNames[index],
}));

function Brand() {
  return <Link href="/" className="block" aria-label="Vibe Motion"><Image src="/header-logo.png" alt="Vibe Motion" width={220} height={70} className="h-16 w-auto object-contain" priority /></Link>;
}
function Header({ showAll, showTutorials }: { showAll: () => void; showTutorials: () => void }) {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { user, displayName, logout } = useAuth();
  async function exit() { await logout(); window.location.href = "/"; }
  function openHome(event: ReactMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setOpen(false);
    showAll();
  }
  function openTutorials(event: ReactMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setOpen(false);
    showTutorials();
  }
  return <header className="sticky top-0 z-50 border-b border-white/[.07] bg-[#07090C]/95 backdrop-blur-xl">
    <div className="mx-auto flex h-[72px] max-w-[1220px] items-center gap-7 px-4 sm:px-6">
      <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center text-[#35C8FF] lg:hidden" aria-label="Abrir menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      <div className="hidden lg:block"><Brand /></div>
      <nav className="hidden h-full lg:flex">{nav.map(([label, href], index) => <Link key={href} href={href} onClick={index === 0 ? openHome : index === 2 ? openTutorials : undefined} className={`font-tektur flex h-full items-center border-b-2 px-4 text-[.68rem] font-black uppercase tracking-[.1em] transition ${index === 0 ? "border-[#35C8FF] text-[#35C8FF]" : "border-transparent text-white/55 hover:text-white"}`}>{label}</Link>)}</nav>
      <div className="mx-auto lg:hidden"><Brand /></div>
      <div className="ml-auto hidden items-center gap-3 lg:flex">{user ? <><Link href="/perfil" className="font-tektur inline-flex h-10 max-w-52 items-center gap-2 rounded-full border border-white/14 px-4 text-[.65rem] font-black uppercase text-white transition hover:border-[#35C8FF]/50 hover:text-[#35C8FF]"><CircleUserRound className="h-4 w-4"/><span className="truncate">{displayName}</span></Link><button onClick={exit} className="grid h-10 w-10 place-items-center rounded-full text-white/40 transition hover:bg-[#35C8FF]/10 hover:text-white" aria-label="Sair"><LogOut className="h-4 w-4"/></button></> : <Link href="/entrar" className="font-tektur inline-flex h-10 items-center gap-2 rounded-full border border-white/14 px-4 text-[.65rem] font-black uppercase tracking-[.12em] text-white transition hover:border-[#35C8FF]/50 hover:text-[#35C8FF]"><CircleUserRound className="h-4 w-4"/>Entrar</Link>}<Link href="/pedido" className="shine-button font-tektur relative h-10 gap-2 px-4 text-[.65rem] font-black uppercase tracking-[.12em]" aria-label={`Carrinho com ${count} itens`}><ShoppingBag className="h-4 w-4"/>Carrinho{count ? <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[.58rem] font-black text-[#05070A]">{count}</span> : null}</Link></div>
      <Link href="/pedido" className="relative grid h-10 w-10 place-items-center lg:hidden" aria-label="Carrinho"><ShoppingBag className="h-5 w-5"/>{count ? <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#35C8FF] px-1 text-[.5rem] font-black text-[#05070A]">{count}</span> : null}</Link>
    </div>
    {open ? <nav className="absolute inset-x-0 top-[72px] min-h-[calc(100vh-72px)] bg-[#07090C] p-5 lg:hidden"><div className="grid gap-1">{nav.map(([label, href], index) => <Link key={href} href={href} onClick={index === 0 ? openHome : index === 2 ? openTutorials : () => setOpen(false)} className="font-tektur flex h-14 items-center border-b border-white/[.08] text-sm font-black uppercase tracking-[.1em] text-white">{label}</Link>)}</div><div className="mt-8 grid gap-3">{user ? <><Link href="/perfil" onClick={() => setOpen(false)} className="font-tektur flex h-12 items-center justify-center gap-2 rounded-full border border-white/14 text-xs font-black uppercase text-white"><CircleUserRound className="h-4 w-4"/>{displayName}</Link><button onClick={exit} className="font-tektur flex h-12 items-center justify-center gap-2 text-xs font-black uppercase text-white/55"><LogOut className="h-4 w-4"/>Sair</button></> : <><Link href="/entrar" onClick={() => setOpen(false)} className="font-tektur flex h-12 items-center justify-center gap-2 rounded-full border border-white/14 text-xs font-black uppercase text-white"><CircleUserRound className="h-4 w-4"/>Entrar</Link><Link href="/cadastro" onClick={() => setOpen(false)} className="font-tektur flex h-12 items-center justify-center text-xs font-black uppercase text-[#35C8FF]">Criar conta</Link></>}<Link href="/pedido" onClick={() => setOpen(false)} className="shine-button font-tektur h-12 gap-2 text-xs font-black uppercase"><ShoppingBag className="h-4 w-4"/>Carrinho{count ? <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[.58rem] text-[#05070A]">{count}</span> : null}</Link></div></nav> : null}
  </header>;
}

function Hero({ query, change }: { query: string; change: (value: string) => void }) {
  return <section className="catalog-hero-grid relative overflow-hidden border-b border-white/[.06] px-4 py-12 text-center sm:px-6 sm:py-16"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(8,126,255,.2),transparent_50%)]"/><div className="relative mx-auto max-w-[760px]"><p className="font-tektur text-[.6rem] font-black uppercase tracking-[.34em] text-[#35C8FF]">Biblioteca visual premium</p><h1 className="font-versa mt-4 text-4xl font-black uppercase leading-[.92] sm:text-6xl">Nosso <span className="text-[#35C8FF]">catálogo</span></h1><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/48 sm:text-base">Loops, aberturas e animações prontas para transformar o telão do seu show em presença de palco.</p><label className="mx-auto mt-7 flex h-12 max-w-xl items-center gap-3 border border-white/10 bg-[#0B0E12]/90 px-4 focus-within:border-[#35C8FF]/60"><Search className="h-4 w-4 shrink-0 text-[#35C8FF]"/><input value={query} onChange={(e) => change(e.target.value)} placeholder="BUSQUE POR NOME, ESTILO OU CATEGORIA" className="font-tektur min-w-0 flex-1 bg-transparent text-[.65rem] font-bold uppercase tracking-[.08em] outline-none placeholder:text-white/28"/></label></div></section>;
}

function CategoryFocus({ category, count, showAll }: { category: (typeof categories)[number]; count: number; showAll: () => void }) {
  return <section className="border-b border-white/[.06] bg-[#101112] px-4 py-9 sm:px-6 sm:py-12"><div className="mx-auto max-w-[1220px]"><button onClick={showAll} className="font-tektur flex items-center gap-2 text-[.58rem] font-bold uppercase tracking-[.14em] text-white/48 transition hover:text-[#35C8FF]"><ArrowLeft className="h-3.5 w-3.5"/>Voltar ao catálogo</button><h1 className="font-tektur mt-6 text-3xl font-black uppercase leading-none sm:text-5xl">{category.name}</h1><p className="font-tektur mt-3 text-[.65rem] font-black uppercase tracking-[.12em] text-[#35C8FF]">{count} opções de alto impacto</p></div></section>;
}
const tutorialItems = [
  { title: "Vídeo para telão pelo celular", image: "/posters/device-library.svg" },
  { title: "Vídeo para telão pelo computador", image: "/youtube-media.png" },
  { title: "Efeito de loop", image: "/posters/pack-06.svg" },
];

function TutorialsView() {
  const [selected, setSelected] = useState(0);
  const progress = Math.round(((selected + 1) / tutorialItems.length) * 100);
  return <section id="tutoriais" className="min-h-[calc(100vh-72px)] bg-[#090B0E] px-4 py-10 sm:px-6 sm:py-14"><div className="mx-auto max-w-[1220px]"><div className="flex flex-col gap-6 border-b border-white/[.08] pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-tektur text-[.58rem] font-black uppercase tracking-[.32em] text-[#35C8FF]">Passo a passo</p><h1 className="font-versa mt-3 text-3xl font-black uppercase sm:text-5xl">Central de tutoriais</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/48 sm:text-base">Veja como fazer o seu vídeo para o telão. Escolha o tutorial que você precisa.</p></div><div className="flex min-w-52 items-center gap-3 rounded-2xl border border-white/[.09] bg-white/[.03] px-5 py-4"><ListChecks className="h-5 w-5 text-[#35C8FF]"/><div><p className="font-tektur text-[.48rem] font-bold uppercase tracking-[.15em] text-white/35">Seu progresso</p><p className="font-tektur mt-1 text-xs font-black">{selected + 1} de {tutorialItems.length} aulas ({progress}%)</p></div></div></div><div className="mt-8 grid gap-4 md:grid-cols-3">{tutorialItems.map((tutorial, index) => { const active = selected === index; return <button key={tutorial.title} onClick={() => setSelected(index)} aria-pressed={active} className={`group overflow-hidden rounded-2xl border bg-[#0D1015] text-left transition ${active ? "border-[#35C8FF] shadow-[0_15px_45px_rgba(53,200,255,.12)]" : "border-white/[.09] hover:border-white/25"}`}><div className="relative overflow-hidden"><Image src={tutorial.image} alt="" width={720} height={420} className="aspect-video w-full object-cover opacity-65 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-85"/><span className={`absolute right-4 top-4 grid h-5 w-5 place-items-center rounded-full border ${active ? "border-[#35C8FF] bg-[#35C8FF] text-[#05070A]" : "border-white/60 bg-black/35"}`}>{active ? <Check className="h-3 w-3"/> : null}</span><span className="absolute inset-0 grid place-items-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-[#35C8FF] text-[#05070A] shadow-[0_10px_30px_rgba(53,200,255,.3)]"><Play className="ml-1 h-5 w-5 fill-current"/></span></span></div><div className="p-4"><p className="font-tektur text-[.52rem] font-bold uppercase tracking-[.15em] text-white/40">Aula em vídeo</p><h2 className="font-tektur mt-2 text-sm font-black text-white">{tutorial.title}</h2></div></button>; })}</div></div></section>;
}
function Filters({ active, choose }: { active: string; choose: (value: string) => void }) {
  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ pointerId: -1, startX: 0, scrollLeft: 0, moved: false });

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const rail = railRef.current;
    if (!rail) return;
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: rail.scrollLeft,
      moved: false,
    };
  }

  function moveDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    if (!rail || drag.current.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.current.startX;
    if (Math.abs(distance) > 4 && !drag.current.moved) {
      drag.current.moved = true;
      rail.setPointerCapture(event.pointerId);
    }
    if (!drag.current.moved) return;
    rail.scrollLeft = drag.current.scrollLeft - distance;
    event.preventDefault();
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    if (!rail || drag.current.pointerId !== event.pointerId) return;
    if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    drag.current.pointerId = -1;
  }

  function blockClickAfterDrag(event: ReactMouseEvent<HTMLDivElement>) {
    if (!drag.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.moved = false;
  }

  return <section id="categorias" className="sticky top-[72px] z-40 border-b border-white/[.07] bg-[#101112]/95 py-4 backdrop-blur-xl">
    <div
      ref={railRef}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={blockClickAfterDrag}
      onDragStart={(event) => event.preventDefault()}
      className="mx-auto flex max-w-[1220px] cursor-grab select-none gap-2.5 overflow-x-auto px-4 active:cursor-grabbing sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ touchAction: "pan-y" }}
      aria-label="Categorias do catálogo"
    >
      {filterItems.map((item) => <button key={item.id} onClick={() => choose(item.id)} aria-pressed={active === item.id} className={`font-tektur shrink-0 rounded-full border px-4 py-2.5 text-[.58rem] font-medium uppercase tracking-[.12em] transition ${active === item.id ? "border-[#35C8FF] bg-[#35C8FF] text-[#05070A]" : "border-white/[.13] bg-white/[.015] text-white/65 hover:border-white/30 hover:text-white"}`}>{item.name}</button>)}
    </div>
  </section>;
}

function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { user, hydrated } = useAuth();
  const { addItem, isSelected } = useCart();
  const selected = isSelected(product.id);

  function handleAddItem() {
    if (!hydrated) return;

    if (!user) {
      router.push(
        "/entrar?returnTo=" + encodeURIComponent("/") + "&reason=cart",
      );
      return;
    }

    addItem(product.id);
  }

  return (
    <article className="group min-w-0 border border-white/[.07] bg-[#0D0F12] transition duration-300 hover:-translate-y-1 hover:border-[#35C8FF]/45 hover:shadow-[0_18px_45px_rgba(8,126,255,.12)]">
      <div className="relative overflow-hidden bg-[#111721]">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={720}
          height={420}
          className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width:560px) 50vw, (max-width:920px) 33vw, 25vw"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <button
          type="button"
          className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/60 text-white transition group-hover:bg-[#35C8FF] group-hover:text-[#05070A]"
          aria-label={`Assistir ${product.title}`}
        >
          <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
        </button>
        <span className="font-tektur absolute bottom-2 right-2 bg-black/70 px-2 py-1 text-[.5rem] font-bold uppercase tracking-[.12em] text-white/70">
          Full HD
        </span>
      </div>
      <div className="p-3">
        <p className="font-tektur text-[.5rem] font-bold uppercase tracking-[.17em] text-[#35C8FF]">
          {product.code}
        </p>
        <h3 className="font-tektur mt-1.5 truncate text-[.73rem] font-black uppercase text-white">
          {product.title}
        </h3>
        <button
          type="button"
          disabled={selected || !hydrated}
          onClick={handleAddItem}
          className={`font-tektur mt-3 flex h-9 w-full items-center justify-between px-3 text-[.58rem] font-black uppercase tracking-[.08em] transition ${
            selected
              ? "border border-[#35C8FF]/35 bg-[#35C8FF]/10 text-[#35C8FF]"
              : "bg-[#35C8FF] text-[#05070A] hover:bg-white"
          }`}
        >
          <span>{selected ? "Adicionado" : "Adicionar"}</span>
          <span>{formatPrice(product.price)}</span>
        </button>
      </div>
    </article>
  );
}

function Category({ category, items, showHeading = true }: { category: (typeof categories)[number]; items: Product[]; showHeading?: boolean }) {
  if (!items.length) return null;
  return <section id={category.id} className="scroll-mt-40 border-b border-white/[.045] px-4 py-8 sm:px-6 sm:py-10"><div className="mx-auto max-w-[1220px]">{showHeading ? <div className="mb-5"><h2 className="font-tektur text-lg font-black uppercase sm:text-xl">{category.name}</h2><p className="font-tektur mt-1 text-[.55rem] font-bold uppercase tracking-[.12em] text-[#35C8FF]">{items.length} modelos disponíveis</p></div> : null}<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{items.map((item) => <ProductCard key={item.id} product={item}/>)}</div></div></section>;
}
function Steps() {
  const items = [["01", "Escolha um visual", "Navegue pelo catálogo e encontre o modelo que combina com seu show."], ["02", "Monte seu pedido", "Adicione os visuais. Sua seleção fica salva enquanto você navega."], ["03", "Finalize pelo WhatsApp", "Revise os itens, informe os dados e envie o pedido ao atendimento."]];
  return <section id="como-funciona" className="border-b border-white/[.06] px-4 py-12 sm:px-6"><div className="mx-auto max-w-[1220px]"><p className="font-tektur text-[.58rem] font-black uppercase tracking-[.28em] text-[#35C8FF]">Passo a passo</p><h2 className="font-versa mt-3 text-2xl font-black uppercase sm:text-4xl">Como funciona</h2><div className="mt-7 grid gap-3 md:grid-cols-3">{items.map(([number,title,text]) => <article key={number} className="border border-white/[.08] bg-[#0D0F12] p-5"><span className="font-tektur inline-grid h-8 min-w-8 place-items-center bg-[#35C8FF] px-2 text-[.6rem] font-black text-[#05070A]">{number}</span><h3 className="font-tektur mt-5 text-sm font-black uppercase">{title}</h3><p className="mt-3 text-sm leading-6 text-white/45">{text}</p></article>)}</div></div></section>;
}

function Footer() {
  return <footer id="suporte" className="bg-[#06080A] px-4 pb-12 pt-12 sm:px-6"><div className="mx-auto max-w-[1220px] text-center"><div className="inline-flex"><Brand/></div><p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-white/48">A biblioteca de visuais 3D para artistas e produtores que querem transformar qualquer telão em presença de palco.</p><nav className="font-tektur mt-7 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[.6rem] font-black uppercase tracking-[.12em] text-white/62"><a href="mailto:suporte.vibemotion@gmail.com">Suporte</a><Link href="/#como-funciona">Como funciona</Link><Link href="/entrar">Minha conta</Link><Link href="/pedido">Pedido</Link></nav><div className="font-tektur mt-12 flex flex-col gap-3 border-t border-white/[.08] pt-5 text-[.52rem] font-bold uppercase tracking-[.1em] text-white/28 sm:flex-row sm:justify-between"><span>2026 Vibe Motion. Todos os direitos reservados.</span><span>Conteúdo digital para grandes palcos.</span></div></div></footer>;
}

function CartNotice() {
  const { count, subtotal, floatingCartVisible, dismissFloatingCart } = useCart();
  if (!count || !floatingCartVisible) return null;
  return <div className="fixed inset-x-0 bottom-4 z-[70] px-3"><div className="mx-auto flex max-w-xl items-center justify-between gap-3 border border-[#35C8FF]/35 bg-[#0C1117]/96 p-3 shadow-2xl backdrop-blur-xl"><div className="min-w-0"><p className="font-tektur truncate text-[.62rem] font-black uppercase">{count} {count === 1 ? "visual selecionado" : "visuais selecionados"}</p><p className="mt-1 font-mono text-xs font-black text-[#35C8FF]">{formatPrice(subtotal)}</p></div><div className="flex gap-2"><Link href="/pedido" className="font-tektur bg-[#35C8FF] px-4 py-3 text-[.58rem] font-black uppercase text-[#05070A]">Finalizar</Link><button onClick={dismissFloatingCart} className="grid h-10 w-10 place-items-center border border-white/10" aria-label="Fechar"><X className="h-4 w-4"/></button></div></div></div>;
}

export function CatalogPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");
  const [tutorialsOpen, setTutorialsOpen] = useState(false);
  const search = query.trim().toLocaleLowerCase("pt-BR");
  const filtered = useMemo(() => {
    const sourceProducts = active === "recent"
      ? recentProducts
      : active === "all"
        ? [...recentProducts, ...products]
        : products;
    return sourceProducts.filter((product) => {
      if (active !== "recent" && active !== "all" && product.categoryId !== active) return false;
      const categoryName = product.categoryId === "recent"
        ? recentCategory.name
        : categories.find((item) => item.id === product.categoryId)?.name ?? "";
      return !search || `${product.title} ${product.code} ${categoryName}`.toLocaleLowerCase("pt-BR").includes(search);
    });
  }, [active, search]);
  const shownCategories = active === "recent"
    ? [recentCategory]
    : active === "all"
      ? [recentCategory, ...orderedCategories]
      : categories.filter((item) => item.id === active);
  const focusedCategory = active === "recent" ? recentCategory : categories.find((item) => item.id === active);
  function showAll() { setTutorialsOpen(false); setQuery(""); setActive("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function chooseCategory(value: string) { setTutorialsOpen(false); setQuery(""); setActive(value); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function showTutorials() { setTutorialsOpen(true); window.scrollTo({ top: 0, behavior: "smooth" }); }
  return <div className="min-h-screen overflow-x-hidden bg-[#07090C] text-white"><Header showAll={showAll} showTutorials={showTutorials}/><main>{tutorialsOpen ? <TutorialsView/> : <>{focusedCategory ? <CategoryFocus category={focusedCategory} count={filtered.length} showAll={showAll}/> : <Hero query={query} change={setQuery}/>}<Filters active={active} choose={chooseCategory}/><div id="catalogo">{filtered.length ? shownCategories.map((category) => <Category key={category.id} category={category} items={filtered.filter((item) => item.categoryId === category.id)} showHeading={active === "all"}/>) : <div className="grid min-h-72 place-items-center border-b border-white/[.06] text-center"><div><Search className="mx-auto h-7 w-7 text-[#35C8FF]"/><p className="font-tektur mt-4 text-sm font-black uppercase">Nenhum visual encontrado</p><button onClick={showAll} className="font-tektur mt-4 text-[.6rem] font-black uppercase text-[#35C8FF]">Limpar filtros</button></div></div>}</div><Steps/></>}</main><Footer/><CartNotice/></div>;
}





