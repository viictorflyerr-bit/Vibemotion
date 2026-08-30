"use client";

import {useState} from "react";
import Link from "next/link";
import {LogOut,Menu,MessageCircle,ShoppingBag,Users,X} from "lucide-react";
import {useAuth} from "@/components/auth-provider";
import {useCart} from "@/components/cart-provider";
import {catalogConfig} from "@/lib/catalog-data";

const nav=[["Início","/"],["Comunidade","/comunidade"],["Tutoriais","/#tutoriais"],["Animações diferentes","/#animacoes-diferentes"]];

export default function ComunidadePage(){
 const [open,setOpen]=useState(false);
 const {user,displayName,logout}=useAuth();
 const {count}=useCart();
 const phone=catalogConfig.whatsappNumber.replace(/\D/g,"");
 const whatsappUrl=phone?`https://wa.me/${phone}`:"mailto:suporte.vibemotion@gmail.com";
 async function exit(){await logout();window.location.href="/"}
 return <div className="min-h-screen bg-[#07090C] text-white">
  <header className="border-b border-white/[.07] bg-[#0A0C0F]">
   <div className="mx-auto flex h-20 max-w-[1220px] items-center gap-5 px-4 sm:px-6">
    <button onClick={()=>setOpen(!open)} aria-label="Abrir menu" className="grid h-10 w-10 place-items-center text-[#35C8FF] lg:pointer-events-none">{open?<X className="h-5 w-5"/>:<Menu className="h-5 w-5"/>}</button>
    <nav className="hidden h-full items-center lg:flex">{nav.map(([label,href],index)=><Link key={href} href={href} className={`font-tektur flex h-full items-center border-b-2 px-4 text-[.7rem] font-black uppercase tracking-[.1em] transition ${index===1?"border-[#35C8FF] text-[#35C8FF]":"border-transparent text-white/58 hover:text-white"}`}>{label}</Link>)}</nav>
    <div className="ml-auto hidden items-center gap-2 border-l border-white/10 pl-5 lg:flex">{user?<><Link href="/perfil" className="font-tektur max-w-48 truncate text-[.62rem] font-bold uppercase text-white/45 hover:text-[#35C8FF]">{displayName}</Link><button onClick={exit} aria-label="Sair" className="grid h-9 w-9 place-items-center text-white/38 hover:text-[#35C8FF]"><LogOut className="h-4 w-4"/></button></>:<Link href="/entrar" className="font-tektur text-[.62rem] font-bold uppercase text-white/48 hover:text-[#35C8FF]">Entrar</Link>}</div>
    <Link href="/pedido" className="relative ml-auto grid h-10 w-10 place-items-center text-white lg:hidden"><ShoppingBag className="h-5 w-5"/>{count?<span className="absolute right-0 top-0 rounded-full bg-[#35C8FF] px-1 text-[.5rem] font-black text-[#05070A]">{count}</span>:null}</Link>
   </div>
   {open?<nav className="grid border-t border-white/[.07] bg-[#080A0D] p-4 lg:hidden">{nav.map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)} className="font-tektur flex h-14 items-center border-b border-white/[.08] text-xs font-black uppercase tracking-[.1em]">{label}</Link>)}</nav>:null}
  </header>

  <main>
   <section className="catalog-hero-grid relative grid min-h-[475px] place-items-center overflow-hidden border-b border-white/[.06] px-4 py-14 text-center sm:px-6">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(8,126,255,.22),transparent_48%)]"/>
    <div className="relative mx-auto max-w-[760px]">
     <p className="font-tektur text-[.62rem] font-black uppercase tracking-[.34em] text-[#35C8FF]">Comunidade</p>
     <h1 className="font-versa mt-5 text-4xl font-black uppercase leading-[.93] sm:text-6xl lg:text-7xl">Troque ideia com<span className="block text-[#35C8FF]">quem já usa</span></h1>
     <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/52 sm:text-lg">Entre no nosso grupo do WhatsApp para tirar dúvidas, ver o que outros artistas e produtores estão criando e ficar por dentro das novidades do catálogo.</p>
     <a href={whatsappUrl} target="_blank" rel="noreferrer" className="font-tektur mx-auto mt-8 inline-flex min-h-12 items-center justify-center gap-3 bg-[#35C8FF] px-7 text-[.68rem] font-black uppercase tracking-[.1em] text-[#05070A] transition hover:bg-white"><MessageCircle className="h-4 w-4"/>Entrar no grupo do WhatsApp</a>
     <p className="font-tektur mt-6 flex items-center justify-center gap-2 text-[.6rem] font-bold uppercase tracking-[.1em] text-white/34"><Users className="h-4 w-4 text-[#35C8FF]"/>Artistas, DJs e produtores trocando ideia todo dia</p>
    </div>
   </section>
  </main>

  <footer className="bg-[#06080A] px-4 pb-12 pt-11 sm:px-6"><div className="mx-auto max-w-[1220px] text-center"><p className="mx-auto max-w-lg text-sm leading-6 text-white/50">A maior biblioteca de visuais 3D para artistas e produtores que não aceitam o básico. O palco é seu.</p><nav className="font-tektur mt-7 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[.58rem] font-black uppercase tracking-[.12em] text-white/62"><a href="mailto:suporte.vibemotion@gmail.com">Suporte</a><Link href="/#como-funciona">FAQ</Link><Link href="/">Privacidade</Link><a href="mailto:suporte.vibemotion@gmail.com">Contato</a></nav><div className="font-tektur mt-12 flex flex-col gap-3 border-t border-white/[.08] pt-5 text-[.5rem] font-bold uppercase tracking-[.1em] text-white/28 sm:flex-row sm:justify-between"><span>© 2026 Vibe Motion. Todos os direitos reservados.</span><span>Conteúdo digital para grandes palcos.</span></div></div></footer>

 </div>
}

