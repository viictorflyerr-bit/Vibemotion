"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Box, LogOut, Trash2 } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useOrders } from "@/components/order-provider";
import { formatCurrency } from "@/lib/catalog-data";
import { getOrderAction, orderStatusCopy } from "@/lib/order-utils";
import type { Order } from "@/lib/catalog-data";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function OrderCard({
  order,
  onDelete,
}: {
  order: Order;
  onDelete: (orderId: string) => void;
}) {
  const status = orderStatusCopy[order.status];
  const action = getOrderAction(order);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const canDelete =
    order.status === "pending" || order.status === "payment_pending";

  return (
    <article className="hover-border-card rounded-[10px] border border-cyan-100/10 bg-[#1B1D20] p-5 transition">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-cyan-100/10 pb-4">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-[#35C8FF]">
            Pedido #{order.shortId}
          </p>
          <time className="mt-2 block text-sm text-cyan-50/55">
            {formatDate(order.createdAt)}
          </time>
        </div>
        <span
          className={`rounded-full border px-3 py-1 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <p className="font-mono text-[0.68rem] font-black uppercase tracking-[0.16em] text-cyan-50/38">
          Itens
        </p>
        {order.items.map((item) => (
          <div
            key={`${order.id}-${item.productId}`}
            className="flex gap-3 rounded-[8px] bg-[#101214] p-3"
          >
            {item.thumbnail ? (
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={96}
                height={54}
                className="aspect-video w-20 rounded-[6px] object-cover"
              />
            ) : null}
            <div>
              <h3 className="text-sm font-black uppercase text-white">
                {item.quantity}x {item.title}
              </h3>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-cyan-50/42">
                {item.productCode} · {item.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-[8px] border border-cyan-100/10 bg-white/[0.03] p-3">
          <span className="block text-cyan-50/45">Total</span>
          <strong className="mt-1 block text-lg text-white">
            {formatCurrency(order.total)}
          </strong>
        </div>
        <div className="rounded-[8px] border border-cyan-100/10 bg-white/[0.03] p-3">
          <span className="block text-cyan-50/45">Você economizou</span>
          <strong className="mt-1 block text-lg text-[#35C8FF]">
            {formatCurrency(order.totalSavings)}
          </strong>
        </div>
      </div>

      <div className="mt-5 rounded-[8px] bg-[#101214] p-4">
        <p className="font-mono text-xs font-black uppercase tracking-[0.14em] text-white">
          Entrega digital
        </p>
        <p className="mt-2 text-sm leading-6 text-cyan-50/62">
          {status.message}
        </p>
      </div>

      {action ? (
        <Link
          href={action.href}
          className="shine-button mt-5 min-h-11 px-5 text-xs uppercase tracking-[0.14em]"
        >
          {action.label}
        </Link>
      ) : null}

      {canDelete ? (
        confirmingDelete ? (
          <div className="mt-5 rounded-[8px] border border-red-400/25 bg-red-400/[0.06] p-4">
            <p className="text-sm font-bold text-white">
              Excluir este pedido pendente?
            </p>
            <p className="mt-1 text-xs leading-5 text-cyan-50/50">
              O pedido será removido do seu perfil.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onDelete(order.id)}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[7px] bg-red-500 px-4 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-red-400"
              >
                <Trash2 aria-hidden="true" className="h-4 w-4" />
                Sim, excluir
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className="min-h-10 rounded-[7px] border border-cyan-100/14 px-4 text-xs font-black uppercase tracking-[0.1em] text-cyan-50/70 transition hover:border-white/30 hover:text-white"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border border-red-400/25 px-4 text-xs font-black uppercase tracking-[0.1em] text-red-300 transition hover:border-red-400/55 hover:bg-red-400/[0.07] hover:text-red-200"
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
            Excluir pedido pendente
          </button>
        )
      ) : null}
    </article>
  );
}

export default function PerfilPage() {
  const router = useRouter();
  const { user, hydrated, displayName, logout } = useAuth();
  const { orders, deletePendingOrder } = useOrders();

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/entrar?returnTo=/perfil");
    }
  }, [hydrated, router, user]);

  if (!hydrated || !user) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#05070A] px-4 text-white">
        <p className="font-mono text-sm uppercase tracking-[0.18em] text-[#35C8FF]">
          Carregando perfil...
        </p>
      </main>
    );
  }

  const initial = (displayName || user.email).charAt(0).toUpperCase();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#05070A] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-cyan-50/55 transition hover:text-[#35C8FF]"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Voltar ao catálogo
        </Link>

        <section className="mt-8 rounded-[10px] border border-cyan-100/10 bg-[#1B1D20] p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="grid h-20 w-20 place-items-center rounded-full border border-[#35C8FF]/40 bg-[#087EFF]/18 text-3xl font-black text-[#35C8FF] shadow-[0_0_30px_rgba(8,126,255,.18)]">
                {initial}
              </div>
              <div>
                <h1 className="display-font text-4xl font-black uppercase leading-none text-white">
                  Meu Perfil
                </h1>
                <p className="mt-3 text-sm text-cyan-50/62">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border border-cyan-100/14 px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-[#35C8FF]/55 hover:text-[#35C8FF]"
            >
              <LogOut aria-hidden="true" className="h-4 w-4" />
              Sair
            </button>
          </div>

          <div className="my-8 h-px bg-cyan-100/10" />

          <h2 className="text-xl font-black uppercase tracking-[0.08em]">
            Meus Pedidos
          </h2>

          {orders.length === 0 ? (
            <div className="mt-7 grid min-h-64 place-items-center rounded-[10px] border border-cyan-100/10 bg-[#101214] p-8 text-center">
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#35C8FF]/35 bg-[#087EFF]/16 text-[#35C8FF]">
                  <Box aria-hidden="true" className="h-8 w-8" />
                </div>
                <p className="mt-6 text-lg font-bold text-cyan-50/76">
                  Você ainda não possui nenhum conteúdo adquirido.
                </p>
                <Link
                  href="/"
                  className="shine-button mt-7 min-h-12 px-6 text-xs uppercase tracking-[0.14em]"
                >
                  Visitar catálogo
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onDelete={deletePendingOrder}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
