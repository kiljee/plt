import dayjs from "dayjs";

export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const eventToSlug = (title: string, date: string): string => {
  const d = dayjs(date);
  const formatted = d.format("DD-MM-YYYY");
  const base = slugify(title);
  return `${base}-${formatted}`;
};

export const CITY_SLUGS = ["beograd", "novi-sad"] as const;
export type CitySlug = (typeof CITY_SLUGS)[number];

export const locationToCitySlug = (
  location: "BELGRADE" | "NOVI_SAD",
): CitySlug =>
  location === "NOVI_SAD" ? "novi-sad" : "beograd";

export const citySlugToLocation = (
  city: string,
): "BELGRADE" | "NOVI_SAD" | null => {
  if (city === "novi-sad") return "NOVI_SAD";
  if (city === "beograd") return "BELGRADE";
  return null;
};
