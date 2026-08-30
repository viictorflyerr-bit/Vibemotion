"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { siteConfig } from "@/lib/site-data";

type BuyButtonProps = {
  className?: string;
  children?: React.ReactNode;
  compact?: boolean;
  showIcon?: boolean;
};

function isValidCheckoutUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function BuyButton({
  className,
  children = "Garantir acesso",
  compact = false,
  showIcon = true,
}: BuyButtonProps) {
  const [showWarning, setShowWarning] = useState(false);
  const isValid = useMemo(
    () => isValidCheckoutUrl(siteConfig.checkoutUrl),
    [],
  );

  return (
    <span className={clsx("inline-flex flex-col gap-2", className?.includes("w-full") ? "w-full items-stretch" : "items-start")}>
      <a
        href={isValid ? siteConfig.checkoutUrl : "#checkout-indisponivel"}
        target={siteConfig.checkoutTarget}
        rel={siteConfig.checkoutTarget === "_blank" ? "noreferrer" : undefined}
        onClick={(event) => {
          if (!isValid) {
            event.preventDefault();
            setShowWarning(true);
          }
        }}
        className={clsx(
          "group inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/25 bg-[#087EFF] font-black uppercase text-white shadow-[0_0_28px_rgba(8,126,255,.38)] outline-none transition hover:-translate-y-0.5 hover:bg-[#35C8FF] hover:text-[#05070A] focus-visible:ring-2 focus-visible:ring-[#35C8FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070A]",
          compact
            ? "min-h-9 px-4 text-[0.68rem] tracking-[0.14em]"
            : "min-h-12 px-6 text-xs tracking-[0.16em]",
          className,
        )}
      >
        {children}
        {showIcon ? (
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        ) : null}
      </a>
      {showWarning ? (
        <span className="max-w-64 text-xs leading-relaxed text-cyan-100/70">
          Configure NEXT_PUBLIC_CHECKOUT_URL para ativar o redirecionamento.
        </span>
      ) : null}
    </span>
  );
}
