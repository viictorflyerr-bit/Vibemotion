"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CircleHelp, CircleUserRound, Clock3, Headphones, LogOut, Mail,
  Menu, MessageCircle, PackageCheck, ShoppingBag, X,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useCart } from "@/components/cart-provider";
import { catalogConfig } from "@/lib/catalog-data";

const nav = [
  ["Início", "/"],
  ["Suporte", "/suporte"],
  ["Tutoriais", "/#tutoriais"],
  ["Pedidos", "/pedidos"],
];

const faqItems = [
  ["Como recebo os vídeos depois do pedido?", "Após a confirmação, o atendimento continua pelo WhatsApp com os dados do pedido e as orientações de entrega."],
  ["Posso usar os visuais em qualquer telão?", "Sim. Os arquivos são preparados em formato de vídeo e podem ser usados em computadores, controladoras e softwares compatíveis."],
  ["Como acompanho um pedido pendente?", "Abra o seu Perfil para consultar os pedidos. Se precisar agilizar a conferência, envie o número do pedido pelo WhatsApp."],
  ["Posso pedir ajuda para escolher um visual?", "Pode. Informe o estilo musical, o tipo de evento e o resultado que procura para receber uma orientação mais precisa."],
];

function Brand() {
  return <Link href="/" aria-label="Vibe Motion"><Image src="/header-logo.png" alt="Vibe Motion" width={220} height={70} className="h-16 w-auto object-contain" priority /></Link>;
}

export default function SuportePage() {
  const [open, setOpen] = useState(false);
  const { user, displayName, logout } = useAuth();
  const { count } = useCart();
  const phone = catalogConfig.whatsappNumber.replace(/\D/g, "");
  const customer = user ? displayName : "visitante";
  const message = encodeURIComponent("Olá! Preciso de ajuda com a Vibe Motion. Meu nome é " + customer + ".");
  const whatsappUrl = phone ? "https://wa.me/" + phone + "?text=" + message : "mailto:suporte.vibemotion@gmail.com";

  async function exit() {
    await logout();
    window.location.href = "/";
  }

  return <div className="min-h-screen overflow-x-hidden bg-[#07090C] text-white">
    <header className="sticky top-0 z-50 border-b border-white/[.07] bg-[#07090C]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1220px] items-center gap-7 px-4 sm:px-6">
        <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center text-[#35C8FF] lg:hidden" aria-label="Abrir menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        <div className="hidden lg:block"><Brand /></div>
        <nav className="hidden h-full lg:flex">
          {nav.map(([label, href], index) => <Link key={href} href={href} className={"font-tektur flex h-full items-center border-b-2 px-4 text-[.68rem] font-black uppercase tracking-[.1em] transition " + (index === 1 ? "border-[#35C8FF] text-[#35C8FF]" : "border-transparent text-white/55 hover:text-white")}>{label}</Link>)}
        </nav>
        <div className="mx-auto lg:hidden"><Brand /></div>
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          {user ? <><Link href="/perfil" className="font-tektur inline-flex h-10 max-w-52 items-center gap-2 rounded-full border border-white/14 px-4 text-[.65rem] font-black uppercase text-white"><CircleUserRound className="h-4 w-4" /><span className="truncate">{displayName}</span></Link><button onClick={exit} className="grid h-10 w-10 place-items-center text-white/40" aria-label="Sair"><LogOut className="h-4 w-4" /></button></> : <Link href="/entrar" className="font-tektur inline-flex h-10 items-center gap-2 rounded-full border border-white/14 px-4 text-[.65rem] font-black uppercase text-white"><CircleUserRound className="h-4 w-4" />Entrar</Link>}
          <Link href="/pedido" className="shine-button font-tektur relative h-10 gap-2 px-4 text-[.65rem] font-black uppercase"><ShoppingBag className="h-4 w-4" />Carrinho{count ? <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[.58rem] text-[#05070A]">{count}</span> : null}</Link>
        </div>
        <Link href="/pedido" className="relative grid h-10 w-10 place-items-center lg:hidden" aria-label="Carrinho"><ShoppingBag className="h-5 w-5" />{count ? <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#35C8FF] px-1 text-[.5rem] font-black text-[#05070A]">{count}</span> : null}</Link>
      </div>
      {open ? <nav className="absolute inset-x-0 top-[72px] min-h-[calc(100vh-72px)] bg-[#07090C] p-5 lg:hidden">
        <div className="grid gap-1">{nav.map(([label, href], index) => <Link key={href} href={href} onClick={() => setOpen(false)} className={"font-tektur flex h-14 items-center border-b border-l-2 border-white/[.08] pl-4 text-sm font-black uppercase tracking-[.1em] transition " + (index === 1 ? "border-l-[#35C8FF] bg-[#35C8FF]/8 text-[#35C8FF]" : "border-l-transparent text-white")}>{label}</Link>)}</div>
        <div className="mt-8 grid gap-3">
          {user ? <><Link href="/perfil" onClick={() => setOpen(false)} className="font-tektur flex h-12 items-center justify-center gap-2 rounded-full border border-white/14 text-xs font-black uppercase"><CircleUserRound className="h-4 w-4" />{displayName}</Link><button onClick={exit} className="font-tektur flex h-12 items-center justify-center gap-2 text-xs font-black uppercase text-white/55"><LogOut className="h-4 w-4" />Sair</button></> : <><Link href="/entrar" onClick={() => setOpen(false)} className="font-tektur flex h-12 items-center justify-center gap-2 rounded-full border border-white/14 text-xs font-black uppercase"><CircleUserRound className="h-4 w-4" />Entrar</Link><Link href="/cadastro" onClick={() => setOpen(false)} className="font-tektur flex h-12 items-center justify-center text-xs font-black uppercase text-[#35C8FF]">Criar conta</Link></>}
          <Link href="/pedido" onClick={() => setOpen(false)} className="shine-button font-tektur h-12 gap-2 text-xs font-black uppercase"><ShoppingBag className="h-4 w-4" />Carrinho</Link>
        </div>
      </nav> : null}
    </header>

    <main>
      <section className="catalog-hero-grid relative overflow-hidden border-b border-white/[.07] px-4 py-14 sm:px-6 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_15%,rgba(53,200,255,.18),transparent_42%)]" />
        <div className="relative mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="font-tektur text-[.6rem] font-black uppercase tracking-[.34em] text-[#35C8FF]">Atendimento Vibe Motion</p>
            <h1 className="font-versa mt-5 max-w-3xl text-4xl font-black uppercase leading-[.92] sm:text-6xl lg:text-7xl">Como podemos<span className="block text-[#35C8FF]">ajudar?</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/52 sm:text-lg">Tire dúvidas sobre pedidos, pagamentos, downloads e uso dos visuais. Escolha o canal mais fácil para você.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="font-tektur inline-flex min-h-12 items-center justify-center gap-3 bg-[#35C8FF] px-7 text-[.68rem] font-black uppercase tracking-[.1em] text-[#05070A] transition hover:bg-white"><MessageCircle className="h-4 w-4" />Chamar no WhatsApp</a>
              <Link href="/perfil" className="font-tektur inline-flex min-h-12 items-center justify-center gap-3 border border-white/14 px-7 text-[.68rem] font-black uppercase tracking-[.1em] transition hover:border-[#35C8FF]/60 hover:text-[#35C8FF]"><PackageCheck className="h-4 w-4" />Ver meus pedidos</Link>
            </div>
          </div>

          <div className="border border-white/[.1] bg-[#0D1014]/92 p-5 shadow-[0_25px_80px_rgba(0,0,0,.35)] sm:p-7">
            <div className="flex items-center gap-4 border-b border-white/[.08] pb-5"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#35C8FF]/12 text-[#35C8FF]"><Headphones className="h-5 w-5" /></span><div><p className="font-tektur text-[.55rem] font-black uppercase tracking-[.18em] text-white/38">Central de atendimento</p><p className="font-tektur mt-1 text-sm font-black uppercase">Fale com a nossa equipe</p></div></div>
            <div className="mt-5 grid gap-3">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 border border-white/[.08] bg-white/[.025] p-4 transition hover:border-[#35C8FF]/45 hover:bg-[#35C8FF]/[.06]"><MessageCircle className="h-5 w-5 text-[#35C8FF]" /><div><p className="font-tektur text-[.65rem] font-black uppercase">WhatsApp</p><p className="mt-1 text-xs text-white/42">Atendimento rápido para dúvidas e pedidos</p></div></a>
              <a href="mailto:suporte.vibemotion@gmail.com?subject=Suporte%20Vibe%20Motion" className="flex items-center gap-4 border border-white/[.08] bg-white/[.025] p-4 transition hover:border-[#35C8FF]/45 hover:bg-[#35C8FF]/[.06]"><Mail className="h-5 w-5 text-[#35C8FF]" /><div><p className="font-tektur text-[.65rem] font-black uppercase">E-mail</p><p className="mt-1 text-xs text-white/42">suporte.vibemotion@gmail.com</p></div></a>
              <div className="flex items-center gap-4 border border-white/[.08] bg-white/[.025] p-4"><Clock3 className="h-5 w-5 text-[#35C8FF]" /><div><p className="font-tektur text-[.65rem] font-black uppercase">Horário</p><p className="mt-1 text-xs text-white/42">Segunda a sábado, das 9h às 18h</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-[.72fr_1.28fr]">
          <div><span className="grid h-11 w-11 place-items-center rounded-full border border-[#35C8FF]/35 text-[#35C8FF]"><CircleHelp className="h-5 w-5" /></span><p className="font-tektur mt-5 text-[.58rem] font-black uppercase tracking-[.28em] text-[#35C8FF]">Respostas rápidas</p><h2 className="font-versa mt-3 text-3xl font-black uppercase sm:text-5xl">Dúvidas frequentes</h2><p className="mt-4 max-w-sm text-sm leading-6 text-white/45">Confira as respostas mais procuradas. Se ainda precisar, nossa equipe está a um clique.</p></div>
          <div className="divide-y divide-white/[.08] border-y border-white/[.08]">
            {faqItems.map(([question, answer], index) => <details key={question} className="group py-1"><summary className="font-tektur flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-sm font-black uppercase"><span className="flex items-center gap-4"><span className="text-[.55rem] text-[#35C8FF]">{String(index + 1).padStart(2, "0")}</span>{question}</span><span className="text-xl font-light text-[#35C8FF] transition group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-6 pl-10 text-sm leading-7 text-white/48">{answer}</p></details>)}
          </div>
        </div>
      </section>
    </main>

    <footer className="border-t border-white/[.07] bg-[#06080A] px-4 py-9 sm:px-6"><div className="font-tektur mx-auto flex max-w-[1220px] flex-col gap-3 text-[.52rem] font-bold uppercase tracking-[.1em] text-white/28 sm:flex-row sm:justify-between"><span>© 2026 Vibe Motion. Todos os direitos reservados.</span><span>Suporte para grandes palcos.</span></div></footer>
  </div>;
}
