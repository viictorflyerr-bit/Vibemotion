"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "@/components/auth-provider";
import type { CartItem, CustomerOrderData, Order } from "@/lib/catalog-data";
import { createOrderRecord } from "@/lib/order-utils";

type CreateOrderInput = {
  orderData: CustomerOrderData;
  cartItems: CartItem[];
  addOnsTotal: number;
};

type OrderContextValue = {
  orders: Order[];
  createOrder: (input: CreateOrderInput) => Order;
};

const OrderContext = createContext<OrderContextValue | null>(null);
const storageKey = "vibe-motion-orders";

function readOrders() {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? (JSON.parse(stored) as Order[]) : [];
  } catch {
    return [];
  }
}

function writeOrders(orders: Order[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(orders));
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const { user, hydrated } = useAuth();
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (hydrated) {
      queueMicrotask(() => {
        setAllOrders(readOrders());
      });
    }
  }, [hydrated]);

  const createOrder = useCallback(
    ({ orderData, cartItems, addOnsTotal }: CreateOrderInput) => {
      if (!user) {
        throw new Error("Faça login para finalizar o pedido.");
      }

      const order = createOrderRecord({
        userId: user.id,
        customerEmail: user.email,
        orderData,
        items: cartItems,
        addOnsTotal,
      });

      setAllOrders((current) => {
        const nextOrders = [order, ...current];
        writeOrders(nextOrders);
        return nextOrders;
      });

      return order;
    },
    [user],
  );

  const value = useMemo<OrderContextValue>(
    () => ({
      orders: user
        ? allOrders
            .filter((order) => order.userId === user.id)
            .sort(
              (left, right) =>
                new Date(right.createdAt).getTime() -
                new Date(left.createdAt).getTime(),
            )
        : [],
      createOrder,
    }),
    [allOrders, createOrder, user],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrders must be used inside OrderProvider");
  }

  return context;
}
