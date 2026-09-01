"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("overflow-y");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("overflow-y");
  }, [pathname]);

  return children;
}
