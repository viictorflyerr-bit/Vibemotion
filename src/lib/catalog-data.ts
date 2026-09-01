import { siteConfig, testimonials } from "@/lib/site-data";

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  code: string;
  title: string;
  categoryId: string;
  price: number;
  thumbnail: string;
  previewUrl?: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CustomerOrderData = {
  name: string;
  artist: string;
  rhythm: string;
  contact: string;
  notes: string;
  wantsImageAddOn: boolean;
};

export type AddOn = {
  id: string;
  label: string;
  price: number;
};

export type OrderStatus =
  | "pending"
  | "payment_pending"
  | "paid"
  | "processing"
  | "ready"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  productId: string;
  productCode: string;
  title: string;
  category: string;
  quantity: number;
  originalUnitPrice: number;
  unitPrice: number;
  total: number;
  savings: number;
  thumbnail?: string;
};

export type Order = {
  id: string;
  shortId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  artistName?: string;
  musicGenre?: string;
  notes?: string;
  items: OrderItem[];
  addOnsTotal: number;
  originalSubtotal: number;
  subtotal: number;
  totalSavings: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  deliveryUrl?: string;
  supportUrl?: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export const pricing = {
  originalPrice: 67,
  currentPrice: 37,
  savingsPerItem: 30,
  discountPercentage: 44.78,
};

export const catalogConfig = {
  checkoutUrl: siteConfig.checkoutUrl,
  checkoutTarget: siteConfig.checkoutTarget,
  whatsappNumber: siteConfig.whatsappNumber,
  currency: "R$",
  imageAddOn: {
    id: "image-customization",
    label: "Adicionar imagem/foto aos vídeos",
    price: 10,
  } satisfies AddOn,
};

export const catalogNav = [
  { label: "Início", href: "/" },
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Categorias", href: "/#categorias" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Suporte", href: "/#suporte" },
];

export const categories: Category[] = [
  {
    id: "forro-piseiro-sertanejo",
    name: "Forró, Piseiro e Sertanejo",
    description: "Visuais para artistas de palco popular e shows ao vivo.",
  },
  {
    id: "variados",
    name: "Variados",
    description: "Packs versáteis para diferentes momentos da apresentação.",
  },
  {
    id: "amor-paixao-romance",
    name: "Amor, Paixão e Romance",
    description: "Ambientes visuais para músicas românticas e momentos lentos.",
  },
  {
    id: "boteco",
    name: "Boteco",
    description: "Cenas de mesa, bar, neon e clima de resenha.",
  },
  {
    id: "futurista",
    name: "Futurista",
    description: "Loops tecnológicos, LED, sci-fi e alto contraste.",
  },
  {
    id: "pagode",
    name: "Pagode - Samba",
    description: "Conteúdos para roda, samba, palco e festa.",
  },
  {
    id: "letreiros",
    name: "Letreiros",
    description: "Telas de impacto com tipografia e presença de palco.",
  },
  {
    id: "e-os-guri-rs",
    name: "É os Guri - Rio Grande do Sul",
    description: "Visuais com clima regional e energia de show do sul.",
  },
  {
    id: "las-vegas",
    name: "Las Vegas",
    description: "Neon, cassinos e noites vibrantes para o telão.",
  },
  {
    id: "eletronica-dj",
    name: "Eletrônica / DJ",
    description: "Visuais pulsantes para pistas, DJs e festivais.",
  },
  {
    id: "rock",
    name: "Rock",
    description: "Texturas intensas, guitarras e energia de palco.",
  },
  {
    id: "retro-baile",
    name: "Retrô/Baile",
    description: "Cores e referências clássicas para bailes e festas.",
  },
];

const categoryPosterMap: Record<string, string[]> = {
  "forro-piseiro-sertanejo": ["/posters/pack-06.svg", "/posters/pack-10.svg", "/posters/pack-01.svg", "/posters/pack-03.svg"],
  variados: ["/posters/pack-01.svg", "/posters/pack-02.svg", "/posters/pack-03.svg", "/posters/pack-04.svg"],
  "amor-paixao-romance": ["/posters/pack-12.svg", "/posters/pack-02.svg", "/posters/pack-10.svg", "/posters/pack-07.svg"],
  boteco: ["/posters/pack-08.svg", "/posters/pack-09.svg", "/posters/pack-11.svg"],
  futurista: ["/posters/pack-05.svg", "/posters/pack-02.svg", "/posters/pack-03.svg", "/posters/pack-04.svg"],
  pagode: ["/posters/pack-10.svg", "/posters/pack-01.svg"],
  letreiros: ["/posters/pack-11.svg", "/posters/pack-03.svg"],
  "e-os-guri-rs": ["/posters/pack-06.svg", "/posters/pack-09.svg"],
  "las-vegas": ["/posters/pack-08.svg", "/posters/pack-05.svg", "/posters/pack-02.svg"],
  "eletronica-dj": ["/posters/pack-05.svg", "/posters/pack-02.svg", "/posters/pack-03.svg"],
  rock: ["/posters/pack-03.svg", "/posters/pack-11.svg"],
  "retro-baile": ["/posters/pack-07.svg", "/posters/pack-10.svg"],
};

const numberedCategoryCoverFolders: Record<string, string> = {
  "forro-piseiro-sertanejo": "forro-piseiro",
  futurista: "futurista",
  "amor-paixao-romance": "amor-paixao-romance",
  "las-vegas": "las-vegas",
  boteco: "boteco",
  "eletronica-dj": "eletronica-dj",
  letreiros: "letreiros",
  rock: "rock",
  "e-os-guri-rs": "e-os-guri-rs",
  pagode: "pagode",
  "retro-baile": "retro-baile",
};

const productNames: Record<string, string[]> = {
  variados: [
    "CHARMOSA",
    "TV DA SALA",
    "NOITE SENSUAL",
    "É DO PATRÃO",
    "SUNSET DE VERÃO",
    "CARRO E PAREDÃO",
    "PAREDÃO NO GALPÃO",
    "BAILE DE FAVELA",
    "GAME ANOS 80",
    "NA RODA GIGANTE",
    "RADIANTE DOURADO",
    "OUTDOOR",
    "TÁ CALOR",
    "80S VIBES",
    "CARROSSEL NEON",
    "FESTA DE PAREDÃO",
    "REALEZA DA MÚSICA",
    "MÚSICA E PAREDÃO",
    "PAREDÃO DE SOM",
    "PAREDÃO DE SOM",
    "CARRO DO PATRÃO",
  ],
  "forro-piseiro-sertanejo": [
    "VAQUEJADA FUTURISTA",
    "CAVALGADA DE INTERIOR",
    "CHAPELÃO DA SERTANEJA",
    "NOITE DO PEÃO",
    "Vaquejada de interior",
    "ACORDEON MAGNÍFICO",
    "SANFONAS INDUSTRIAIS",
    "CURRAL ILUMINADO",
    "FAZENDA DO AGRO",
    "FESTA COM CAVALOS",
    "FESTA COM CAVALOS PELA NOITE",
    "JANELA DA PAIXÃO",
    "NA FAZENDA",
    "NO RODEIO",
    "SALOON AMERICANO",
    "CAVALGADA DO MATUTO",
    "XILOGRAVURA NORDESTINA",
    "NO INTERIOR",
    "FORRÓ DE INTERIOR",
    "SALA DO VAQUEIRO",
    "SHOW NOTURNO",
  ],
  futurista: [
    "RETROFUTURISTA ANOS 80",
    "NEON FUTURISTA",
    "PC ERROR",
    "PALCO FUTURISTA",
    "NA TELEVISÃO",
    "PALCO ALARANJADO",
    "TUNEL ROXO",
    "PALCO GRADIENTE",
    "PALCO VERDE",
    "NEON CYBERPUNK",
  ],
  "amor-paixao-romance": [
    "AMOR NA CIDADE",
    "AMOR PRATEADO",
    "AMOR FLOREADO",
    "AMOR NEON",
    "AMOR CROMADO",
    "AMOR BRILHANTE",
    "NOSSO AMOR",
    "SONHO DE AMOR",
    "AMOR FUTURISTA",
    "AMOR BONITO",
    "AMOR ILUMINADO",
  ],
  "las-vegas": [
    "SORTE EM VEGAS",
    "SORTE NO AMOR",
    "LAS VEGAS ILUMINADA",
    "LAS VEGAS INDUSTRIAL",
    "NOITE EM VEGAS",
  ],
  boteco: [
    "BOTECO ILUMINADO",
    "BUDEGA DO SEU ZÉ",
    "CHEGOU CERVEJA?",
    "BOTECO PREMIUM",
    "BOTECO NEON",
    "BOTECO BRASILEIRO",
    "BOTECO DO ZÉ",
  ],
  "eletronica-dj": [
    "ELETRORAVE",
    "ROBÔ GALÁTICO",
    "FONE DO DJ",
    "VIBE DO DJ",
    "TV DO DJ",
    "SALA DE MONITORAMENTO",
    "NA MESA DA DJ",
    "TUNEL NEON",
  ],
  letreiros: [
    "TEATRO DOS SONHOS",
    "LETREIRO ILUMINADO",
  ],
  rock: [
    "ROCK NO PORÃO",
    "RELÓGIO DO ROCK",
    "ROCKSTAR",
    "THE FIRE",
  ],
  "e-os-guri-rs": [
    "INTERIOR GAUCHO",
    "PORTEIRA GAUCHA",
    "FUNDO DA GROTA",
  ],
  pagode: [
    "NOITE NO PAGODE",
    "PAGODE NAS ALTURAS",
    "SUNSET DE VERÃO",
    "PAGODE NA PRAIA",
    "PAGODE TROPICAL",
    "TROPICAL VIBES",
    "VERÃO CHEGOU",
    "PAGODE DO PRAIEIRO",
    "TARDE NA PRAIA",
    "CLIMA TROPICAL",
    "PAGODIN",
  ],
  "retro-baile": [
    "BALADA RETRÔ",
    "RETRÔ VIBES",
  ],
};

export const products: Product[] = categories.flatMap((category, categoryIndex) => {
  const posters = categoryPosterMap[category.id] ?? ["/posters/pack-01.svg"];
  const names = productNames[category.id] ?? [category.name];
  const numberedCoverFolder = numberedCategoryCoverFolders[category.id];

  return names.map((name, productIndex) => {
    const code = `VM-${String(categoryIndex + 1).padStart(2, "0")}${String(productIndex + 1).padStart(2, "0")}`;

    return {
      id: `${category.id}-${productIndex + 1}`,
      code,
      title: name,
      categoryId: category.id,
      price: pricing.currentPrice,
      thumbnail: category.id === "variados"
        ? `/catalog/variados/${code}.jpeg`
        : numberedCoverFolder
          ? `/catalog/${numberedCoverFolder}/${String(productIndex + 1).padStart(2, "0")}.jpeg`
          : posters[productIndex % posters.length],
    };
  });
});

export const infoStrip = [
  "Arquivos digitais",
  "Alta resolução",
  "Conteúdos prontos para uso",
  "Entrega após confirmação",
  "Suporte disponível",
];

export const catalogTestimonials: Testimonial[] = testimonials;

export function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export const formatPrice = formatCurrency;

export function getCategoryById(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}
