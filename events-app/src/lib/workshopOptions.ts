import type { WorkshopOption } from "@/types/event";
import { formatPrice } from "@/lib/price";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const parseWorkshopOptions = (raw: unknown): WorkshopOption[] => {
  const value = (() => {
    if (typeof raw !== "string") return raw;
    if (!raw.trim()) return [];
    try {
      return JSON.parse(raw) as unknown;
    } catch {
      return [];
    }
  })();
  if (!Array.isArray(value)) return [];
  const options: WorkshopOption[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    const id = typeof item.id === "string" ? item.id.trim() : "";
    const label = typeof item.label === "string" ? item.label.trim() : "";
    const price = typeof item.price === "number" ? item.price : Number(item.price);
    if (!id || !label || !Number.isInteger(price) || price < 0) continue;
    options.push({ id, label, price });
  }
  return options;
};

export const alignOptionIds = (
  optionIds: string[] | undefined,
  seats: number,
  firstOptionId?: string,
): string[] => {
  if (!firstOptionId || seats < 1) return [];
  const next = (optionIds ?? []).filter((id) => id.length > 0).slice(0, seats);
  while (next.length < seats) next.push(firstOptionId);
  return next;
};

export const selectedOptionsTotal = (
  price: number,
  seats: number,
  options: WorkshopOption[] | undefined,
  optionIds: string[] | undefined,
): number => {
  const list = options ?? [];
  if (list.length === 0) return price * seats;
  const ids = alignOptionIds(optionIds, seats, list[0]?.id);
  const priceById = new Map(list.map((option) => [option.id, option.price]));
  const fallback = list[0]?.price ?? 0;
  return ids.reduce((sum, id) => sum + (priceById.get(id) ?? fallback), 0);
};

export const formatEventListPrice = (
  price: number,
  currency: string,
  options: WorkshopOption[],
): string => {
  if (options.length === 0) return formatPrice(price, currency);
  const amounts = options.map((option) => option.price);
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);
  if (min !== max) return `od ${min.toLocaleString("sr-RS")} ${currency}`;
  return formatPrice(min, currency);
};
