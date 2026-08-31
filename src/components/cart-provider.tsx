"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "@/components/auth-provider";
import type { CartItem } from "@/lib/catalog-data";
import { getProductById } from "@/lib/catalog-data";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  floatingCartVisible: boolean;
  isSelected: (productId: string) => boolean;
  addItem: (productId: string) => boolean;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  dismissFloatingCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "vibe-motion-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, hydrated: authHydrated } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [floatingCartVisible, setFloatingCartVisible] = useState(false);
  const [floatingCartDismissed, setFloatingCartDismissed] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const stored = window.localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored) as CartItem[];
          setItems(parsed.filter((item) => getProductById(item.productId)));
        }
      } catch {
        setItems([]);
      } finally {
        setHydrated(true);
      }
    });
  }, []);

  useEffect(() => {
    if (authHydrated && !user) {
      queueMicrotask(() => {
        setItems([]);
        setFloatingCartVisible(false);
        setFloatingCartDismissed(false);
        window.localStorage.removeItem(storageKey);
      });
    }
  }, [authHydrated, user]);

  useEffect(() => {
    if (hydrated && user) {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [hydrated, items, user]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product?.price ?? 0) * item.quantity;
    }, 0);

    return {
      items,
      count,
      subtotal,
      floatingCartVisible,
      isSelected: (productId) =>
        items.some((item) => item.productId === productId),
      addItem: (productId) => {
        if (!user) {
          return false;
        }

        setItems((current) => {
          if (current.some((item) => item.productId === productId)) {
            return current;
          }

          if (!floatingCartDismissed) {
            setFloatingCartVisible(true);
          }

          return [...current, { productId, quantity: 1 }];
        });

        return true;
      },
      removeItem: (productId) =>
        setItems((current) =>
          current.filter((item) => item.productId !== productId),
        ),
      clearCart: () => {
        setItems([]);
        setFloatingCartVisible(false);
      },
      dismissFloatingCart: () => {
        setFloatingCartVisible(false);
        setFloatingCartDismissed(true);
      },
    };
  }, [floatingCartDismissed, floatingCartVisible, items, user]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}