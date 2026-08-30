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
    id: "sao-joao",
    name: "São João",
    description: "Aberturas, loops e palcos visuais para repertórios juninos.",
  },
  {
    id: "copa-do-mundo",
    name: "Copa do Mundo",
    description: "Conteúdos com energia de torcida, estádio e festa.",
  },
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
  "sao-joao": ["/posters/pack-06.svg", "/posters/pack-01.svg", "/posters/pack-03.svg", "/posters/pack-04.svg"],
  "copa-do-mundo": ["/posters/pack-11.svg", "/posters/pack-02.svg", "/posters/pack-05.svg", "/posters/pack-12.svg"],
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

const productNames: Record<string, string[]> = {
  "sao-joao": [
    "São João Animado",
    "São João Animado",
    "São João Iluminado",
    "Noite Junina",
    "São João na Cidade",
    "Vila de São João",
    "A Noite na Fogueira",
    "Feira Junina",
  ],
  "copa-do-mundo": [
    "No Estádio da Copa",
    "No Estádio",
    "Seleção em Campo",
    "A Copa é do Brasil",
  ],
  "forro-piseiro-sertanejo": [
    "Vaquejada Futurista",
    "Cavalgada de Interior",
    "Chapelão da Sertaneja",
    "Noite do Peão",
    "Janela da Paixão",
    "Na Fazenda",
    "No Rodeio",
    "Nós Somos da Roça",
  ],
  variados: [
    "Charmosa",
    "TV da Sala",
    "Noite Sensual",
    "É do Patrão",
    "Outdoor",
    "Tá Calor",
    "80s Vibes",
    "Carrossel Neon",
  ],
  "amor-paixao-romance": [
    "Amor na Cidade",
    "Amor Prateado",
    "Amor Floreado",
    "Amor Neon",
    "Nosso Amor",
    "Sonho de Amor",
    "Amor Futurista",
    "Amor Bonito",
  ],
  boteco: [
    "Boteco Iluminado",
    "Budega do Seu Zé",
    "Chegou Cerveja?",
    "Boteco Premium",
    "Boteco Neon",
    "Boteco Brasileiro",
    "Boteco do Zé",
  ],
  futurista: ["Cyber Stage", "Futuro Azul", "Laser Motion", "Portal LED"],
  pagode: [
    "Noite no Pagode",
    "Pagode nas Alturas",
    "Sunset de Verão",
    "Pagode na Praia",
    "Verão Chegou",
    "Pagode do Praieiro",
    "Tarde na Praia",
    "Clima Tropical",
  ],
  letreiros: ["Teatro dos Sonhos", "Letreiro Iluminado"],
  "e-os-guri-rs": ["Interior Gaúcho", "Porteira Gaúcha", "Fundo da Grota"],
  "las-vegas": [
    "Sorte em Vegas",
    "Sorte no Amor",
    "Las Vegas Iluminada",
    "Las Vegas Industrial",
    "Noite em Vegas",
  ],
  "eletronica-dj": [
    "Eletrorave",
    "Robô Galático",
    "Fone do DJ",
    "Vibe do DJ",
    "Na Mesa da DJ",
    "Tunel Neon",
    "Balada Noturna",
    "Na Mesa do DJ",
  ],
  rock: ["Rock no Porão", "Relógio do Rock", "Rockstar", "The Fire"],
  "retro-baile": ["Balada Retrô", "Retrô Vibes"],
};

export const products: Product[] = categories.flatMap((category, categoryIndex) => {
  const posters = categoryPosterMap[category.id] ?? ["/posters/pack-01.svg"];
  const names = productNames[category.id] ?? [category.name];

  return names.map((name, productIndex) => ({
    id: `${category.id}-${productIndex + 1}`,
    code: `VM-${String(categoryIndex + 1).padStart(2, "0")}${String(productIndex + 1).padStart(2, "0")}`,
    title: name,
    categoryId: category.id,
    price: pricing.currentPrice,
    thumbnail: posters[productIndex % posters.length],
  }));
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
