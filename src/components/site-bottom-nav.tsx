import Link from "next/link";
import {CircleHelp,CircleUserRound,Grid2X2,Home} from "lucide-react";

const items=[
 {label:"Catálogo",href:"/",icon:Home},
 {label:"Suporte",href:"/suporte",icon:Grid2X2},
 {label:"Contato",href:"mailto:suporte.vibemotion@gmail.com",icon:CircleHelp},
 {label:"Perfil",href:"/perfil",icon:CircleUserRound},
];

export function SiteBottomNav(){
 return <nav aria-label="Navegação principal" className="border-y border-white/[.08] bg-[#101215] px-4">
  <div className="mx-auto grid h-[68px] max-w-lg grid-cols-4">
   {items.map(({label,href,icon:Icon},index)=><Link key={label} href={href} className={`font-tektur flex flex-col items-center justify-center gap-1 text-[.48rem] font-black uppercase tracking-[.05em] transition ${index===0?"text-[#35C8FF]":"text-white/40 hover:text-white"}`}><Icon className="h-4 w-4"/><span>{label}</span></Link>)}
  </div>
 </nav>
}
