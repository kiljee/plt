import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartEvent } from "@/types/cart";
import { alignOptionIds, selectedOptionsTotal } from "@/lib/workshopOptions";

const CART_STORAGE_KEY = "paleto-cart";

export type AddToCartResult = { added: number; capped: boolean };

interface CartState {
  items: CartItem[];
  addItem: (
    event: CartEvent,
    seats: number,
    optionIds?: string[],
  ) => AddToCartResult;
  removeItem: (eventId: string) => void;
  updateSeats: (eventId: string, seats: number) => void;
  updateOption: (eventId: string, index: number, optionId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  getTotalPrice: () => number;
}

const optionIdsForSeats = (
  event: CartEvent,
  seats: number,
  optionIds?: string[],
): string[] => alignOptionIds(optionIds, seats, event.options?.[0]?.id);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (event, seats, optionIds) => {
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
          const addedIds = optionIdsForSeats(eventWithPlaces, toAdd, optionIds);
          if (existing) {
            const currentIds = optionIdsForSeats(
              eventWithPlaces,
              currentSeats,
              existing.optionIds,
            );
            return {
              items: state.items.map((i) =>
                i.eventId === event.id
                  ? {
                      ...i,
                      event: eventWithPlaces,
                      seats: currentSeats + toAdd,
                      optionIds: [...currentIds, ...addedIds],
                    }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                eventId: event.id,
                event: eventWithPlaces,
                seats: toAdd,
                optionIds: addedIds,
              },
            ],
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
          items: state.items.map((item) => {
            if (item.eventId !== eventId) return item;
            const maxSeats = item.event.placesLeft ?? 99;
            const nextSeats = Math.min(seats, maxSeats);
            return {
              ...item,
              seats: nextSeats,
              optionIds: optionIdsForSeats(item.event, nextSeats, item.optionIds),
            };
          }),
        }));
      },

      updateOption: (eventId, index, optionId) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.eventId !== eventId) return item;
            const optionIds = optionIdsForSeats(
              item.event,
              item.seats,
              item.optionIds,
            );
            if (index < 0 || index >= optionIds.length) return item;
            return {
              ...item,
              optionIds: optionIds.map((id, currentIndex) =>
                currentIndex === index ? optionId : id,
              ),
            };
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.seats, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (sum, item) =>
            sum +
            selectedOptionsTotal(
              item.event.price,
              item.seats,
              item.event.options,
              item.optionIds,
            ),
          0,
        ),
    }),
    {
      name: CART_STORAGE_KEY,
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
