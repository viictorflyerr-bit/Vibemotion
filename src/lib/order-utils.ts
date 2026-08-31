import {
  catalogConfig,
  formatCurrency,
  getCategoryById,
  getProductById,
  pricing,
  type CartItem,
  type CustomerOrderData,
  type Order,
  type OrderItem,
  type OrderStatus,
} from "@/lib/catalog-data";

export const orderStatusCopy: Record<
  OrderStatus,
  {
    label: string;
    message: string;
    className: string;
  }
> = {
  pending: {
    label: "Aguardando atendimento",
    message: "Aguardando atendimento para confirmar os dados do pedido.",
    className: "border-cyan-100/14 bg-cyan-100/7 text-cyan-50/72",
  },
  payment_pending: {
    label: "Pagamento pendente",
    message: "Aguardando confirmação de pagamento para liberar o material.",
    className: "border-[#087EFF]/35 bg-[#087EFF]/12 text-[#7FCAFF]",
  },
  paid: {
    label: "Pagamento confirmado",
    message: "Pagamento confirmado. Seu pedido entrou na fila de preparação.",
    className: "border-[#35C8FF]/35 bg-[#35C8FF]/12 text-[#B8EEFF]",
  },
  processing: {
    label: "Em preparação",
    message: "Pedido em preparação para entrega digital.",
    className: "border-[#35C8FF]/40 bg-[#35C8FF]/14 text-[#35C8FF]",
  },
  ready: {
    label: "Conteúdo pronto",
    message: "Conteúdo pronto. Acesse o link liberado para baixar os arquivos.",
    className: "border-[#087EFF]/55 bg-[#087EFF]/18 text-white",
  },
  delivered: {
    label: "Conteúdo entregue",
    message: "Conteúdo entregue. Fale com o suporte se precisar de ajuda.",
    className: "border-emerald-400/35 bg-emerald-400/12 text-emerald-200",
  },
  cancelled: {
    label: "Pedido cancelado",
    message: "Pedido cancelado. Fale com o suporte se isso não estiver correto.",
    className: "border-red-400/35 bg-red-400/10 text-red-200",
  },
};

export function calculateOrderItems(items: CartItem[]) {
  return items.reduce<OrderItem[]>((entries, item) => {
    const product = getProductById(item.productId);

    if (!product) {
      return entries;
    }

    const quantity = item.quantity;
    const category = getCategoryById(product.categoryId);
    const originalTotal = pricing.originalPrice * quantity;
    const currentTotal = pricing.currentPrice * quantity;

    entries.push({
      productId: product.id,
      productCode: product.code,
      title: product.title,
      category: category?.name ?? "Catálogo",
      quantity,
      originalUnitPrice: pricing.originalPrice,
      unitPrice: pricing.currentPrice,
      total: currentTotal,
      savings: originalTotal - currentTotal,
      thumbnail: product.thumbnail,
    });

    return entries;
  }, []);
}

export function calculateOrderTotals(items: CartItem[], addOnsTotal = 0) {
  const orderItems = calculateOrderItems(items);
  const quantity = orderItems.reduce((total, item) => total + item.quantity, 0);
  const originalSubtotal = quantity * pricing.originalPrice;
  const subtotal = quantity * pricing.currentPrice;
  const totalSavings = originalSubtotal - subtotal;

  return {
    items: orderItems,
    quantity,
    originalSubtotal,
    subtotal,
    totalSavings,
    discountPercentage:
      originalSubtotal > 0 ? (totalSavings / originalSubtotal) * 100 : 0,
    addOnsTotal,
    total: subtotal + addOnsTotal,
  };
}

export function createOrderRecord({
  userId,
  customerEmail,
  orderData,
  items,
  addOnsTotal,
}: {
  userId: string;
  customerEmail: string;
  orderData: CustomerOrderData;
  items: CartItem[];
  addOnsTotal: number;
}): Order {
  const totals = calculateOrderTotals(items, addOnsTotal);
  const now = new Date();
  const shortId = createShortId();

  return {
    id: `${now.getTime()}-${shortId}`,
    shortId,
    userId,
    customerName: orderData.name.trim(),
    customerEmail,
    artistName: orderData.artist.trim() || undefined,
    musicGenre: orderData.rhythm.trim() || undefined,
    notes: orderData.notes.trim() || undefined,
    items: totals.items,
    addOnsTotal: totals.addOnsTotal,
    originalSubtotal: totals.originalSubtotal,
    subtotal: totals.subtotal,
    totalSavings: totals.totalSavings,
    total: totals.total,
    status: "payment_pending",
    createdAt: now.toISOString(),
  };
}

export function buildWhatsAppMessage(order: Order) {
  const itemList = order.items
    .map((item, index) =>
      [
        `${index + 1}. *${item.title}*`,
        `   Código: ${item.productCode}`,
        `   Categoria: ${item.category}`,
        `   Quantidade: ${item.quantity}`,
        `   Valor: ${formatCurrency(item.total)}`,
      ].join("\n"),
    )
    .join("\n\n");

  const imageAddOn =
    order.addOnsTotal > 0
      ? `Sim (+${formatCurrency(order.addOnsTotal)})`
      : "Não";

  const messageParts = [
    "Olá, Vibe Motion! 👋",
    "",
    `Quero finalizar meu pedido *#${order.shortId}* com os dados abaixo:`,
    "",
    "*Dados preenchidos:*",
    `• Nome: ${order.customerName}`,
    `• E-mail: ${order.customerEmail}`,
    order.artistName ? `• Artista / banda: ${order.artistName}` : "",
    order.musicGenre ? `• Ritmo musical: ${order.musicGenre}` : "",
    "",
    "*Itens selecionados:*",
    itemList,
    "",
    `• Imagem/foto nos vídeos: ${imageAddOn}`,
    `• Total do pedido: *${formatCurrency(order.total)}*`,
  ].filter(Boolean);

  if (order.notes) {
    messageParts.push("", "*Observações:*", order.notes);
  }

  messageParts.push(
    "",
    "Por favor, confirme os próximos passos para pagamento e envio.",
  );

  return messageParts.join("\n");
}

export function buildWhatsAppUrl(order: Order) {
  const phone = getValidWhatsAppNumber();

  return `https://wa.me/${phone}?text=${encodeURIComponent(buildWhatsAppMessage(order))}`;
}

export function getValidWhatsAppNumber() {
  const phone = catalogConfig.whatsappNumber.trim();

  if (!/^\d+$/.test(phone)) {
    throw new Error("Configure NEXT_PUBLIC_WHATSAPP_NUMBER usando apenas dígitos.");
  }

  return phone;
}

export function getOrderAction(order: Order) {
  if ((order.status === "ready" || order.status === "delivered") && order.deliveryUrl) {
    return {
      label: order.status === "ready" ? "Acessar conteúdo" : "Baixar arquivos",
      href: order.deliveryUrl,
    };
  }

  if (order.supportUrl) {
    return {
      label: "Falar com o suporte",
      href: order.supportUrl,
    };
  }

  return null;
}

function createShortId() {
  const source =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}${Math.random()}`;

  return source.replace(/[^a-z0-9]/gi, "").slice(0, 6).toUpperCase();
}
