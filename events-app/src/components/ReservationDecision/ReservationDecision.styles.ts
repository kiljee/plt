export const RESERVATION_DECISION_STYLES = {
  page: "flex flex-1 items-center justify-center bg-[#F8F9FA] px-4 py-12 sm:py-16",
  card: "w-full max-w-lg rounded-lg border border-[#E5E5E5] bg-white px-6 py-8 sm:px-8 sm:py-10",
  eyebrow:
    "font-[var(--font-geist-sans)] text-xs font-medium uppercase tracking-[2px] text-[#5CA2BC]",
  title:
    "mt-3 font-[var(--font-comfortaa)] text-2xl font-bold leading-snug text-[#000914] sm:text-[1.75rem]",
  lead: "mt-3 font-[var(--font-geist-sans)] text-sm leading-relaxed text-[#212529] sm:text-base",
  details: "mt-6 space-y-3 border-t border-[#E5E5E5] pt-6",
  detailLabel:
    "font-[var(--font-geist-sans)] text-xs uppercase tracking-wide text-[#989B9C]",
  detailValue:
    "font-[var(--font-geist-sans)] text-sm font-medium text-[#000914]",
  actions: "mt-8 flex flex-col gap-3",
  primaryButton:
    "inline-flex items-center justify-center rounded bg-[#5CA2BC] px-6 py-3 font-[var(--font-geist-sans)] text-sm uppercase tracking-[2px] text-white transition-colors hover:bg-[#4a8fa9] disabled:cursor-not-allowed disabled:opacity-50",
  cancelButton:
    "inline-flex items-center justify-center rounded border border-[#DC0000] bg-white px-6 py-3 font-[var(--font-geist-sans)] text-sm uppercase tracking-[2px] text-[#DC0000] transition-colors hover:bg-[#DC0000]/5 disabled:cursor-not-allowed disabled:opacity-50",
  homeLink:
    "text-center font-[var(--font-geist-sans)] text-sm text-[#5CA2BC] underline-offset-2 hover:underline",
} as const;
