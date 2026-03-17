import { formatDateForSlug } from "./date"

const SERBIAN_TO_LATIN: Record<string, string> = {
  ć: "c",
  Ć: "c",
  č: "c",
  Č: "c",
  š: "s",
  Š: "s",
  ž: "z",
  Ž: "z",
  đ: "d",
  Đ: "d",
}

const toPlainLatin = (s: string): string =>
  Array.from(s, (c) => SERBIAN_TO_LATIN[c] ?? c).join("")

export const slugify = (s: string): string =>
  toPlainLatin(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

export const eventToSlug = (title: string, date: Date | string): string => {
  const formatted = formatDateForSlug(date)
  const base = slugify(title)
  return `${base}-${formatted}`
}
