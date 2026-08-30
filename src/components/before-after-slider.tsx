import Image from "next/image";

const panels = [
  {
    label: "Antes",
    title: "Sem visual",
    description: "Telão parado, repetitivo e sem impacto para quem está assistindo.",
    image: "/posters/before.svg",
    alt: "Palco antes, com telão simples e pouco impacto visual",
    highlight: false,
  },
  {
    label: "Depois",
    title: "Com seu telão",
    description: "Visual profissional para prender atenção, gerar gravações e elevar o palco.",
    image: "/posters/after.svg",
    alt: "Palco depois, com visual profissional da VIBE MOTION no telão",
    highlight: true,
  },
];

export function BeforeAfterSlider() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="text-center">
        <p className="text-[0.68rem] font-black uppercase tracking-[0.34em] text-[#35C8FF]">
          A diferença na prática
        </p>
        <h2 className="display-font mt-4 text-balance text-5xl font-black uppercase leading-[0.9] text-white sm:text-6xl lg:text-7xl">
          Antes <span className="mx-1 text-white/32 sm:mx-3">×</span>{" "}
          <span className="text-[#35C8FF]">Depois</span>
        </h2>
        <p className="mt-4 font-mono text-xs font-black uppercase tracking-[0.3em] text-cyan-50/42 sm:text-sm">
          Veja o que muda no palco
        </p>
      </div>

      <div className="mt-11 grid gap-6 lg:grid-cols-2">
        {panels.map((panel) => (
          <article key={panel.label} className="group">
            <div
              className={[
                "relative overflow-hidden rounded-[8px] border bg-[#080D16] transition duration-500",
                panel.highlight
                  ? "border-[#087EFF] shadow-[0_0_44px_rgba(8,126,255,.24)]"
                  : "border-cyan-100/16 opacity-82",
              ].join(" ")}
            >
              <Image
                src={panel.image}
                alt={panel.alt}
                width={1200}
                height={525}
                className={[
                  "aspect-[16/7] w-full object-cover transition duration-700 group-hover:scale-[1.025]",
                  panel.highlight ? "" : "grayscale-[35%] brightness-75",
                ].join(" ")}
                sizes="(max-width: 1024px) 92vw, 600px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-white/[0.03]" />
            </div>

            <div className="mt-4 flex items-start gap-4 px-1">
              <span
                className={[
                  "mt-1 h-3 w-3 shrink-0 rounded-full",
                  panel.highlight
                    ? "bg-[#35C8FF] shadow-[0_0_18px_rgba(53,200,255,.9)]"
                    : "bg-white/22",
                ].join(" ")}
                aria-hidden="true"
              />
              <div>
                <p
                  className={[
                    "font-mono text-sm font-black uppercase tracking-[0.22em]",
                    panel.highlight ? "text-[#35C8FF]" : "text-cyan-50/42",
                  ].join(" ")}
                >
                  {panel.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-cyan-50/58">
                  {panel.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
