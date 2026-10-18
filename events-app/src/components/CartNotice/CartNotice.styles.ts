export const CART_NOTICE_STYLES = {
  root: "flex w-full items-start gap-3 rounded-lg border-2 border-red-500 bg-red-50 p-4 text-left shadow-sm",
  icon: "h-6 w-6 shrink-0 text-red-600",
  content: "flex min-w-0 flex-col gap-1",
  title:
    "font-[var(--font-comfortaa)] text-base font-bold leading-snug text-red-700",
  message:
    "font-[var(--font-geist-sans)] text-sm leading-relaxed text-red-700",
} as const;
