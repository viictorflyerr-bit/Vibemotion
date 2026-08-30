"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Send, Trash2 } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useCart } from "@/components/cart-provider";
import { useOrders } from "@/components/order-provider";
import {
  catalogConfig,
  formatCurrency,
  getCategoryById,
  getProductById,
  type CustomerOrderData,
} from "@/lib/catalog-data";
import {
  buildWhatsAppUrl,
  calculateOrderTotals,
  getValidWhatsAppNumber,
} from "@/lib/order-utils";

const initialOrderData: CustomerOrderData = {
  name: "",
  artist: "",
  rhythm: "",
  contact: "",
  notes: "",
  wantsImageAddOn: false,
};

function Header() {
  return (
    <header className="border-b border-cyan-100/10 bg-[#05070A]/88 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3 text-white">
          <ArrowLeft aria-hidden="true" className="h-5 w-5 text-cyan-50/55" />
          <span className="text-2xl font-black">Resumo do Pedido</span>
        </Link>
        <Link
          href="/"
          className="rounded-full border border-cyan-100/14 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-cyan-50/70 transition hover:border-[#35C8FF]/50 hover:text-[#35C8FF]"
        >
          Voltar ao catálogo
        </Link>
      </div>
    </header>
  );
}

export default function PedidoPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const { items, removeItem, clearCart } = useCart();
  const [orderData, setOrderData] = useState(initialOrderData);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const selectedProducts = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProductById(item.productId);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter(Boolean),
    [items],
  );

  const quantity = items.reduce((total, item) => total + item.quantity, 0);
  const addOnTotal = orderData.wantsImageAddOn
    ? catalogConfig.imageAddOn.price * quantity
    : 0;
  const totals = calculateOrderTotals(items, addOnTotal);

  const handleCheckout = () => {
    setError("");

    if (!user) {
      router.push(`/entrar?returnTo=${encodeURIComponent("/pedido")}`);
      return;
    }

    if (!orderData.name.trim() || !orderData.artist.trim() || !orderData.rhythm.trim()) {
      setError("Preencha nome, artista/banda e ritmo musical para finalizar.");
      return;
    }

    try {
      getValidWhatsAppNumber();
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Configure o WhatsApp para finalizar.",
      );
      return;
    }

    setIsCreating(true);

    try {
      const order = createOrder({
        orderData,
        cartItems: items,
        addOnsTotal: addOnTotal,
      });
      const whatsappUrl = buildWhatsAppUrl(order);

      clearCart();
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Não foi possível criar o pedido. Tente novamente.",
      );
      setIsCreating(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#05070A] text-white">
        <Header />
        <main className="grid min-h-[70vh] place-items-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-black">Seu Pedido</h1>
            <p className="mt-5 text-lg text-cyan-50/65">
              Você ainda não selecionou nenhum conteúdo.
            </p>
            <Link
              href="/"
              className="shine-button mt-8 min-h-12 px-6 text-sm uppercase tracking-[0.12em]"
            >
              Voltar ao catálogo
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070A] text-white">
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-black">
                Itens Selecionados ({items.length})
              </h2>
              <button
                type="button"
                onClick={clearCart}
                className="font-mono text-xs font-black uppercase tracking-[0.16em] text-cyan-50/40 transition hover:text-[#35C8FF]"
              >
                Limpar tudo
              </button>
            </div>
            <div className="space-y-4">
              {selectedProducts.map((entry) => {
                if (!entry) return null;
                const category = getCategoryById(entry.product.categoryId);

                return (
                  <article
                    key={entry.product.id}
                    className="grid gap-4 rounded-[10px] border border-cyan-100/10 bg-[#1B1D20] p-4 sm:grid-cols-[112px_1fr_auto]"
                  >
                    <Image
                      src={entry.product.thumbnail}
                      alt={entry.product.title}
                      width={160}
                      height={96}
                      className="aspect-video w-full rounded-[6px] object-cover sm:w-28"
                    />
                    <div>
                      <h3 className="text-lg font-black uppercase">
                        {entry.product.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-cyan-50/38">
                        {entry.product.code}
                      </p>
                      <p className="mt-5 text-sm text-cyan-50/55">
                        {category?.name}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <button
                        type="button"
                        onClick={() => removeItem(entry.product.id)}
                        className="text-cyan-50/42 transition hover:text-[#35C8FF]"
                        aria-label={`Remover ${entry.product.title}`}
                      >
                        <Trash2 aria-hidden="true" className="h-5 w-5" />
                      </button>
                      <div className="text-right">
                        <p className="font-mono text-xs text-cyan-50/35 line-through">
                          {formatCurrency(totals.items.find((item) => item.productId === entry.product.id)?.originalUnitPrice ?? 0)}
                        </p>
                        <p className="font-mono text-lg font-black text-white">
                          {formatCurrency(entry.product.price)}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="rounded-[10px] border border-cyan-100/10 bg-[#202123] p-6 shadow-[0_24px_80px_rgba(0,0,0,.28)]">
            <h2 className="text-xl font-black">Status do Pedido</h2>
            <div className="mt-7 space-y-5">
              {[
                ["name", "Seu nome", "Ex: João Silva"],
                ["artist", "Artista / banda", "Ex: Wesley Safadão"],
                ["rhythm", "Ritmo musical", "Ex: Forró, Sertanejo, Rock"],
              ].map(([key, label, placeholder]) => (
                <label key={key} className="block">
                  <span className="font-mono text-[0.68rem] font-black uppercase tracking-[0.16em] text-cyan-50/38">
                    {label}
                  </span>
                  <input
                    value={String(orderData[key as keyof CustomerOrderData])}
                    onChange={(event) =>
                      setOrderData((current) => ({
                        ...current,
                        [key]: event.target.value,
                      }))
                    }
                    placeholder={placeholder}
                    className="mt-2 h-12 w-full rounded-[7px] border border-transparent bg-[#141516] px-4 text-sm text-white outline-none transition placeholder:text-cyan-50/38 focus:border-[#35C8FF]/60"
                  />
                </label>
              ))}
              <label className="mt-8 flex min-h-24 items-center gap-3 rounded-[10px] bg-[#141516] p-4">
                <input
                  type="checkbox"
                  checked={orderData.wantsImageAddOn}
                  onChange={(event) =>
                    setOrderData((current) => ({
                      ...current,
                      wantsImageAddOn: event.target.checked,
                    }))
                  }
                  className="h-5 w-5 accent-[#35C8FF]"
                />
                <span className="flex flex-1 flex-wrap items-center justify-between gap-3 text-sm font-black leading-5 text-white">
                  <span className="max-w-36">
                    Deseja adicionar imagem/foto aos vídeos?
                  </span>
                  <span className="rounded-[6px] bg-[#087EFF]/22 px-3 py-2 font-mono text-xs text-[#35C8FF]">
                    + {formatCurrency(catalogConfig.imageAddOn.price)} / cada
                  </span>
                </span>
              </label>
            </div>

            <div className="mt-12 flex min-h-16 items-center justify-between rounded-[10px] border border-[#087EFF]/45 bg-[#121416] px-4 shadow-[0_0_28px_rgba(8,126,255,.1)]">
              <span className="text-sm font-black uppercase tracking-[0.04em] text-white">
                Total
              </span>
              <strong className="font-mono text-3xl font-black text-[#35C8FF]">
                {formatCurrency(totals.total)}
              </strong>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCreating}
              className="shine-button mt-8 min-h-12 w-full px-5 text-sm uppercase tracking-[0.06em] shadow-[0_16px_38px_rgba(8,126,255,.28)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCreating ? (
                <Loader2 aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send aria-hidden="true" className="order-last ml-2 h-4 w-4" />
              )}
              {isCreating ? "Criando pedido..." : "Finalizar pedido (WhatsApp)"}
            </button>
            <p className="mt-5 text-center font-mono text-[0.68rem] font-black uppercase tracking-[0.18em] text-cyan-50/35">
              Cadastrar pedido e enviar
            </p>
            {error ? (
              <p className="mt-3 text-xs leading-6 text-[#35C8FF]">{error}</p>
            ) : null}
          </aside>
        </div>
      </main>
    </div>
  );
}
