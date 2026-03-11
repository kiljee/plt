import { formatDateForSlug } from "./date";

export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const eventToSlug = (title: string, date: Date | string): string => {
  const formatted = formatDateForSlug(date);
  const base = slugify(title);
  return `${base}-${formatted}`;
};
