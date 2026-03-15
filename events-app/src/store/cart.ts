import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartEvent } from "@/types/cart";

const CART_STORAGE_KEY = "paleto-cart";

export type AddToCartResult = { added: number; capped: boolean };

interface CartState {
  items: CartItem[];
  addItem: (event: CartEvent, seats: number) => AddToCartResult;
  removeItem: (eventId: string) => void;
  updateSeats: (eventId: string, seats: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (event, seats) => {
        const maxForEvent = event.placesLeft ?? 99;
        let result: AddToCartResult = { added: 0, capped: false };
        set((state) => {
          const existing = state.items.find((i) => i.eventId === event.id);
          const currentSeats = existing?.seats ?? 0;
          const maxWeCanAdd = Math.max(0, maxForEvent - currentSeats);
          const toAdd = Math.min(seats, maxWeCanAdd);
          result = { added: toAdd, capped: seats > toAdd };
          if (toAdd <= 0) return state;
          const eventWithPlaces: CartEvent = { ...event, placesLeft: maxForEvent };
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.eventId === event.id
                  ? { ...i, event: eventWithPlaces, seats: currentSeats + toAdd }
                  : i,
              ),
            };
          }
          return {
            items: [...state.items, { eventId: event.id, event: eventWithPlaces, seats: toAdd }],
          };
        });
        return result;
      },

      removeItem: (eventId) => {
        set((state) => ({
          items: state.items.filter((i) => i.eventId !== eventId),
        }));
      },

      updateSeats: (eventId, seats) => {
        if (seats < 1) return;
        set((state) => ({
          items: state.items.map((i) => {
            if (i.eventId !== eventId) return i;
            const maxSeats = i.event.placesLeft ?? 99;
            return { ...i, seats: Math.min(seats, maxSeats) };
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.seats, 0),

      getTotalPrice: () =>
        get().items.reduce((sum, i) => sum + i.event.price * i.seats, 0),
    }),
    {
      name: CART_STORAGE_KEY,
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
