import { create } from "zustand";

export type WorkshopOrigin = "calendar" | "events";

type WorkshopNavigationState = {
  origin: WorkshopOrigin | null;
  returnHref: string | null;
  setWorkshopEntry: (origin: WorkshopOrigin, returnHref: string) => void;
  clearWorkshopEntry: () => void;
};

export const useWorkshopNavigationStore = create<WorkshopNavigationState>((set) => ({
  origin: null,
  returnHref: null,
  setWorkshopEntry: (origin, returnHref) => set({ origin, returnHref }),
  clearWorkshopEntry: () => set({ origin: null, returnHref: null }),
}));

export const captureEventsListingReturnHref = (): string => {
  if (typeof window === "undefined") return "/";
  const path = `${window.location.pathname}${window.location.search}`;
  return path.length === 0 ? "/" : path;
};

export const workshopBackLabel = (
  origin: WorkshopOrigin,
): "Nazad na kalendar" | "Nazad na događaje" =>
  origin === "calendar" ? "Nazad na kalendar" : "Nazad na događaje";
