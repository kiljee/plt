import { create } from "zustand";
import type { CartItem, CartEvent } from "@/types/cart";

interface CartState {
  items: CartItem[];
  addItem: (event: CartEvent, seats: number) => void;
  removeItem: (eventId: string) => void;
  updateSeats: (eventId: string, seats: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (event, seats) => {
    set((state) => {
      const existing = state.items.find((i) => i.eventId === event.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.eventId === event.id
              ? { ...i, seats: Math.min(i.seats + seats, 99) }
              : i,
          ),
        };
      }
      return {
        items: [...state.items, { eventId: event.id, event, seats }],
      };
    });
  },

  removeItem: (eventId) => {
    set((state) => ({
      items: state.items.filter((i) => i.eventId !== eventId),
    }));
  },

  updateSeats: (eventId, seats) => {
    if (seats < 1) return;
    set((state) => ({
      items: state.items.map((i) =>
        i.eventId === eventId ? { ...i, seats: Math.min(seats, 99) } : i,
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  totalItems: () =>
    get().items.reduce((sum, i) => sum + i.seats, 0),

  getTotalPrice: () =>
    get().items.reduce((sum, i) => sum + i.event.price * i.seats, 0),
}));
