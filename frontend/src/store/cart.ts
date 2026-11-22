import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { SALE_MODE } from '../config/mode';

export interface CartItem {
  productId: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  add: (productId: string, qty: number) => void;
  /** qty <= 0 удаляет позицию */
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

/** Корзина хранится в браузере. У опта и розницы корзины раздельные — цены разные. */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (productId, qty) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === productId);
          return {
            items: existing
              ? s.items.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i))
              : [...s.items, { productId, qty }],
          };
        }),
      setQty: (productId, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.productId !== productId)
              : s.items.map((i) => (i.productId === productId ? { ...i, qty } : i)),
        })),
      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: `mixshop-cart-${SALE_MODE}`,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/** Количество позиций (не штук) — для значка корзины. */
export const useCartCount = () => useCartStore((s) => s.items.length);

export const useCartQty = (productId: string) =>
  useCartStore((s) => s.items.find((i) => i.productId === productId)?.qty ?? 0);
