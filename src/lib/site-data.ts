export const siteConfig = {
  brand: "VIBE MOTION",
  tagline: "Biblioteca audiovisual para shows, telões e palcos.",
  price: "R$ 37",
  previousPrice: "R$ 67",
  videoCount: 739,
  packCount: 42,
  guarantee: "Garantia configurável pela plataforma de pagamento",
  license:
    "Uso comercial para apresentações próprias e trabalhos de clientes, conforme os termos da licença do produto.",
  formats: "MP4, loops e artes visuais em alta qualidade",
  accessType: "Acesso digital enviado para o e-mail usado na compra",
  checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "",
  checkoutTarget:
    process.env.NEXT_PUBLIC_CHECKOUT_TARGET === "_self" ? "_self" : "_blank",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5584993571294",
};

export const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "O que você recebe", href: "#recebe" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Dúvidas", href: "#faq" },
];

export const metrics = [
  { value: 739, suffix: "+", label: "modelos prontos" },
  { value: 42, suffix: "+", label: "packs organizados" },
  { value: 100, suffix: "%", label: "acesso digital" },
  { value: 24, suffix: "h", label: "para começar" },
];

export const comments = [
  "Usei no show de sábado e o palco pareceu outro.",
  "As aberturas salvaram meu repertório visual.",
  "Baixei, joguei no software do telão e funcionou direto.",
  "Cliente achou que eu tinha contratado uma produtora.",
  "Muito material para variar o show sem repetir tela.",
  "O visual ficou com cara de turnê grande.",
];

export const steps = [
  {
    number: "01",
    title: "Garanta o acesso",
    body: "R$ 37. Pagamento confirmado, acesso liberado pela plataforma. Sem espera.",
  },
  {
    number: "02",
    title: "Escolha o modelo",
    body: "Entra na plataforma, navega pela biblioteca e escolhe o visual que combina com o seu show.",
  },
  {
    number: "03",
    title: "Gera e vai pro palco",
    body: "Copia o modelo, cola no gerador e em minutos tem um visual 3D profissional pronto pra usar.",
  },
];

export const packs = [
  { title: "Aberturas para shows", image: "/posters/pack-01.svg" },
  { title: "Loops abstratos", image: "/posters/pack-02.svg" },
  { title: "Fundos animados", image: "/posters/pack-03.svg" },
  { title: "Contagens regressivas", image: "/posters/pack-04.svg" },
  { title: "Visuais eletrônicos", image: "/posters/pack-05.svg" },
  { title: "Sertanejo", image: "/posters/pack-06.svg" },
  { title: "Gospel", image: "/posters/pack-07.svg" },
  { title: "Funk", image: "/posters/pack-08.svg" },
  { title: "Rock", image: "/posters/pack-09.svg" },
  { title: "Pagode", image: "/posters/pack-10.svg" },
  { title: "Eventos corporativos", image: "/posters/pack-11.svg" },
  { title: "Datas comemorativas", image: "/posters/pack-12.svg" },
];

export const usageCards = [
  {
    number: "01",
    title: "Crie seus próprios visuais",
    body: "Acesse a biblioteca, escolha o modelo e gere o visual para o seu show na hora.",
  },
  {
    number: "02",
    title: "Atenda cantores da sua região",
    body: "Ofereça o serviço para outros artistas e cobre pelo visual entregue.",
  },
  {
    number: "03",
    title: "Recupere com 1 cliente",
    body: "Um único serviço já paga o investimento de R$ 37 e ainda sobra.",
  },
  {
    number: "04",
    title: "Sem limite de uso",
    body: "Paga uma vez e usa para quantos shows e clientes quiser, para sempre.",
  },
];

export const benefits = [
  {
    icon: "infinity",
    title: "Visuais que ninguém mais tem",
    body: "Uma biblioteca de modelos 3D exclusivos. Enquanto todo mundo usa os mesmos loops gratuitos, o seu show vai se destacar.",
  },
  {
    icon: "copy",
    title: "Copie, cole, gere",
    body: "Sem edição, sem programa caro. Você escolhe o modelo, cola no gerador e o visual 3D aparece na hora.",
  },
  {
    icon: "money",
    title: "Renda extra também",
    body: "Você pode usar no seu show e ainda oferecer o serviço para outros cantores da sua região. R$ 37 que se paga sozinho.",
  },
  {
    icon: "screen",
    title: "Qualquer telão, qualquer palco",
    body: "Tela de LED, projetor, palco grande ou pequeno. Os modelos geram visuais para qualquer formato de telão.",
  },
  {
    icon: "zap",
    title: "Do zero ao visual em minutos",
    body: "Sem experiência, sem programa de edição. O tempo entre o acesso e o primeiro visual pronto é de minutos.",
  },
];

export const offerItems = [
  "Biblioteca completa de visuais 3D exclusivos",
  "Acesso imediato após o pagamento",
  "Novos modelos toda semana",
  "Pode usar em shows, festas e eventos",
  "Pode oferecer o serviço para outros cantores e cobrar por isso",
  "Paga uma vez e acessa para sempre",
];

export const testimonials = [
  {
    name: "Caio Martins",
    role: "Produtor musical",
    quote:
      "Montei o visual de três apresentações em uma tarde. A diferença no telão ficou absurda.",
    avatar: "CM",
  },
  {
    name: "Lara Nogueira",
    role: "Técnica de LED",
    quote:
      "Os packs vieram organizados e fáceis de adaptar para cada cliente. Economizou muita edição.",
    avatar: "LN",
  },
  {
    name: "Bruno Reis",
    role: "Cantor",
    quote:
      "O show ficou com identidade. O público gravou muito mais vídeos do palco.",
    avatar: "BR",
  },
  {
    name: "Nina Alves",
    role: "Diretora de eventos",
    quote:
      "A biblioteca virou meu atalho para entregar algo bonito sem esperar uma produtora.",
    avatar: "NA",
  },
];

export const faqs = [
  {
    question: "O que é a Vibe Motion?",
    answer:
      "É uma plataforma com modelos exclusivos que você usa para gerar seus próprios visuais 3D para telão. Sem edição, sem programa caro, sem complicação.",
  },
  {
    question: "Preciso entender de edição de vídeo?",
    answer:
      "Não. Você copia o modelo da plataforma, cola no gerador e o visual aparece pronto. Se precisar, o suporte ajuda em cada passo.",
  },
  {
    question: "Quanto tempo leva pra ter o primeiro visual?",
    answer:
      "Minutos. Depois que o acesso é liberado, você entra, escolhe um modelo, cola no gerador e já tem um visual 3D pronto.",
  },
  {
    question: "Posso oferecer o serviço para outros cantores?",
    answer:
      "Sim. Você usa a plataforma para gerar os visuais, entrega para o cantor e cobra pelo serviço. Uma renda extra sem precisar de nenhum investimento a mais.",
  },
  {
    question: "Que gerador eu uso?",
    answer:
      "Os modelos funcionam com os principais geradores de vídeo disponíveis. Se precisar, o suporte orienta você no uso.",
  },
  {
    question: "Acesso vence depois de algum tempo?",
    answer:
	  "Não. Você paga R$ 37 uma vez e acessa para sempre, incluindo todos os novos modelos que forem adicionados.",
  },
  {
    question: "E se eu tiver dúvida depois de comprar?",
    answer:
      "Tem suporte. Você não fica sem resposta.",
  },
  {
    question: "O pagamento é seguro?",
    answer:
      "Sim. O pagamento acontece no ambiente externo da Kiwify ou Cakto. O site não coleta dados de cartão.",
  },
];
