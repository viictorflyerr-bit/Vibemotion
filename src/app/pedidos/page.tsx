"use client";

import { type FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  CircleCheck,
  CircleUserRound,
  Clock3,
  FileText,
  LogOut,
  Menu,
  Mail,
  Send,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useCart } from "@/components/cart-provider";

const nav = [
  ["Início", "/"],
  ["Suporte", "/suporte"],
  ["Tutoriais", "/#tutoriais"],
  ["Pedidos", "/pedidos"],
];

const inputClass = "font-tektur mt-2 h-12 w-full border border-white/[.11] bg-[#090C10] px-4 text-xs text-white outline-none transition placeholder:text-white/25 focus:border-[#35C8FF]/70";
const labelClass = "font-tektur text-[.56rem] font-black uppercase tracking-[.14em] text-white/55";

function Brand() {
  return <Link href="/" aria-label="Vibe Motion"><Image src="/header-logo.png" alt="Vibe Motion" width={220} height={70} className="h-16 w-auto object-contain" priority /></Link>;
}

export default function PedidosPage() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { user, displayName, logout } = useAuth();
  const { count } = useCart();

  async function exit() {
    await logout();
    window.location.href = "/";
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    setSending(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Não foi possível enviar o pedido.");
      }

      setFeedback({
        type: "success",
        message: result.message || "Pedido enviado com sucesso para o atendimento.",
      });
      form.reset();
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "Não foi possível enviar o pedido agora.",
      });
    } finally {
      setSending(false);
    }
  }

  return <div className="min-h-screen overflow-x-hidden bg-[#07090C] text-white">
    <header className="sticky top-0 z-50 border-b border-white/[.07] bg-[#07090C]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1220px] items-center gap-7 px-4 sm:px-6">
        <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center text-[#35C8FF] lg:hidden" aria-label="Abrir menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        <div className="hidden lg:block"><Brand /></div>
        <nav className="hidden h-full lg:flex">
          {nav.map(([label, href], index) => <Link key={href} href={href} className={"font-tektur flex h-full items-center border-b-2 px-4 text-[.68rem] font-black uppercase tracking-[.1em] transition " + (index === 3 ? "border-[#35C8FF] text-[#35C8FF]" : "border-transparent text-white/55 hover:text-white")}>{label}</Link>)}
        </nav>
        <div className="mx-auto lg:hidden"><Brand /></div>
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          {user ? <><Link href="/perfil" className="font-tektur inline-flex h-10 max-w-52 items-center gap-2 rounded-full border border-white/14 px-4 text-[.65rem] font-black uppercase text-white"><CircleUserRound className="h-4 w-4" /><span className="truncate">{displayName}</span></Link><button onClick={exit} className="grid h-10 w-10 place-items-center text-white/40 transition hover:text-[#35C8FF]" aria-label="Sair"><LogOut className="h-4 w-4" /></button></> : <Link href="/entrar" className="font-tektur inline-flex h-10 items-center gap-2 rounded-full border border-white/14 px-4 text-[.65rem] font-black uppercase text-white"><CircleUserRound className="h-4 w-4" />Entrar</Link>}
          <Link href="/pedido" className="shine-button font-tektur relative h-10 gap-2 px-4 text-[.65rem] font-black uppercase"><ShoppingBag className="h-4 w-4" />Carrinho{count ? <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[.58rem] text-[#05070A]">{count}</span> : null}</Link>
        </div>
        <Link href="/pedido" className="relative grid h-10 w-10 place-items-center lg:hidden" aria-label="Carrinho"><ShoppingBag className="h-5 w-5" />{count ? <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#35C8FF] px-1 text-[.5rem] font-black text-[#05070A]">{count}</span> : null}</Link>
      </div>

      {open ? <nav className="absolute inset-x-0 top-[72px] min-h-[calc(100vh-72px)] bg-[#07090C] p-5 lg:hidden">
        <div className="grid gap-1">{nav.map(([label, href], index) => <Link key={href} href={href} onClick={() => setOpen(false)} className={"font-tektur flex h-14 items-center border-b border-l-2 border-white/[.08] pl-4 text-sm font-black uppercase tracking-[.1em] transition " + (index === 3 ? "border-l-[#35C8FF] bg-[#35C8FF]/8 text-[#35C8FF]" : "border-l-transparent text-white")}>{label}</Link>)}</div>
        <div className="mt-8 grid gap-3">
          {user ? <><Link href="/perfil" onClick={() => setOpen(false)} className="font-tektur flex h-12 items-center justify-center gap-2 rounded-full border border-white/14 text-xs font-black uppercase"><CircleUserRound className="h-4 w-4" />{displayName}</Link><button onClick={exit} className="font-tektur flex h-12 items-center justify-center gap-2 text-xs font-black uppercase text-white/55"><LogOut className="h-4 w-4" />Sair</button></> : <><Link href="/entrar" onClick={() => setOpen(false)} className="font-tektur flex h-12 items-center justify-center gap-2 rounded-full border border-white/14 text-xs font-black uppercase"><CircleUserRound className="h-4 w-4" />Entrar</Link><Link href="/cadastro" onClick={() => setOpen(false)} className="font-tektur flex h-12 items-center justify-center text-xs font-black uppercase text-[#35C8FF]">Criar conta</Link></>}
          <Link href="/pedido" onClick={() => setOpen(false)} className="shine-button font-tektur h-12 gap-2 text-xs font-black uppercase"><ShoppingBag className="h-4 w-4" />Carrinho</Link>
        </div>
      </nav> : null}
    </header>

    <main className="catalog-hero-grid relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_5%,rgba(53,200,255,.18),transparent_38%)]" />
      <div className="relative mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
        <section className="lg:sticky lg:top-28">
          <p className="font-tektur text-[.6rem] font-black uppercase tracking-[.32em] text-[#35C8FF]">Criação sob medida</p>
          <h1 className="font-versa mt-5 text-4xl font-black uppercase leading-[.92] sm:text-6xl">Peça um<span className="block text-[#35C8FF]">arquivo novo</span></h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/50">Não encontrou o visual que precisa? Envie sua ideia, referências e prazo. Nossa equipe analisará o pedido e responderá com a disponibilidade e o orçamento.</p>

          <div className="mt-9 grid gap-3">
            <article className="flex gap-4 border border-white/[.08] bg-[#0C0F13]/80 p-4"><span className="font-tektur grid h-9 w-9 shrink-0 place-items-center bg-[#35C8FF] text-[.62rem] font-black text-[#05070A]">01</span><div><h2 className="font-tektur text-xs font-black uppercase">Descreva a ideia</h2><p className="mt-1 text-sm leading-6 text-white/40">Conte o estilo, a música e como deseja o arquivo.</p></div></article>
            <article className="flex gap-4 border border-white/[.08] bg-[#0C0F13]/80 p-4"><span className="font-tektur grid h-9 w-9 shrink-0 place-items-center bg-[#35C8FF] text-[.62rem] font-black text-[#05070A]">02</span><div><h2 className="font-tektur text-xs font-black uppercase">Envie referências</h2><p className="mt-1 text-sm leading-6 text-white/40">Adicione um link para mostrar o resultado esperado.</p></div></article>
            <article className="flex gap-4 border border-white/[.08] bg-[#0C0F13]/80 p-4"><span className="font-tektur grid h-9 w-9 shrink-0 place-items-center bg-[#35C8FF] text-[.62rem] font-black text-[#05070A]">03</span><div><h2 className="font-tektur text-xs font-black uppercase">Receba a resposta</h2><p className="mt-1 text-sm leading-6 text-white/40">O atendimento confirma prazo e orçamento pelo contato informado.</p></div></article>
          </div>

          <div className="mt-5 flex items-center gap-3 text-xs text-white/38"><Clock3 className="h-4 w-4 text-[#35C8FF]" /><span>Análise do pedido feita pelo atendimento.</span></div>
        </section>

        <section id="formulario-pedido" className="border border-white/[.1] bg-[#0D1014]/95 p-5 shadow-[0_28px_90px_rgba(0,0,0,.4)] sm:p-8">
          <div className="flex items-start gap-4 border-b border-white/[.08] pb-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#35C8FF]/12 text-[#35C8FF]"><FileText className="h-5 w-5" /></span>
            <div><p className="font-tektur text-[.54rem] font-black uppercase tracking-[.18em] text-[#35C8FF]">Formulário de solicitação</p><h2 className="font-tektur mt-1 text-lg font-black uppercase sm:text-xl">Detalhes do novo arquivo</h2></div>
          </div>

          <form onSubmit={submitRequest} className="mt-7 grid gap-5">
            <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>Nome completo<input name="name" defaultValue={user ? displayName : ""} required placeholder="SEU NOME" className={inputClass} /></label>
              <label className={labelClass}>WhatsApp<input name="whatsapp" type="tel" required placeholder="(00) 00000-0000" className={inputClass} /></label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>E-mail opcional<input name="email" type="email" placeholder="SEU@EMAIL.COM" className={inputClass} /></label>
              <label className={labelClass}>Tipo de arquivo<select name="fileType" required defaultValue="" className={inputClass}><option value="" disabled>SELECIONE</option><option>Vídeo para telão</option><option>Abertura personalizada</option><option>Loop visual</option><option>Letreiro ou logo animado</option><option>Outro arquivo</option></select></label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>Nome da música ou projeto<input name="projectName" required placeholder="NOME DO PROJETO" className={inputClass} /></label>
              <label className={labelClass}>Ritmo ou estilo<input name="style" required placeholder="EX.: FORRÓ, DJ, SERTANEJO" className={inputClass} /></label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>Data do evento opcional<input name="eventDate" type="date" className={inputClass} /></label>
              <label className={labelClass}>Link de referência opcional<input name="reference" type="url" placeholder="HTTPS://..." className={inputClass} /></label>
            </div>

            <label className={labelClass}>Explique como deseja o arquivo<textarea name="description" required rows={6} placeholder="DESCREVA AS CORES, TEXTOS, ELEMENTOS, DURAÇÃO E OUTROS DETALHES IMPORTANTES..." className="font-tektur mt-2 w-full resize-y border border-white/[.11] bg-[#090C10] p-4 text-xs leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-[#35C8FF]/70" /></label>

            <div className="border border-[#35C8FF]/20 bg-[#35C8FF]/[.05] p-4">
              <p className="flex items-start gap-3 text-xs leading-5 text-white/48"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#35C8FF]" />O envio deste formulário não gera cobrança automática. O valor e o prazo serão informados após a análise.</p>
            </div>

            <button type="submit" disabled={sending} className="shine-button font-tektur flex min-h-13 w-full items-center justify-center gap-3 px-6 text-[.68rem] font-black uppercase tracking-[.1em] disabled:cursor-not-allowed disabled:opacity-60"><Send className="h-4 w-4" />{sending ? "Enviando..." : "Enviar pedido por e-mail"}</button>
            {feedback ? <div role="status" className={"flex items-start gap-3 border p-4 text-sm leading-6 " + (feedback.type === "success" ? "border-emerald-400/30 bg-emerald-400/[.07] text-emerald-100" : "border-red-400/30 bg-red-400/[.07] text-red-100")}>{feedback.type === "success" ? <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" /> : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />}<span>{feedback.message}</span></div> : null}
            <p className="flex items-center justify-center gap-2 text-center text-xs text-white/32"><Mail className="h-4 w-4" />O pedido será entregue diretamente no Gmail do atendimento.</p>
          </form>
        </section>
      </div>
    </main>

    <footer className="border-t border-white/[.07] bg-[#06080A] px-4 py-9 sm:px-6"><div className="font-tektur mx-auto flex max-w-[1220px] flex-col gap-3 text-[.52rem] font-bold uppercase tracking-[.1em] text-white/28 sm:flex-row sm:justify-between"><span>© 2026 Vibe Motion. Todos os direitos reservados.</span><span>Arquivos visuais para grandes palcos.</span></div></footer>
  </div>;
}
