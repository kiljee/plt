export const CART_PAGE_STYLES = {
  form: "contents",
  section: "relative min-h-screen bg-white",
  container:
    "mx-auto max-w-[1184px] px-4 py-8 flex flex-col gap-8 lg:flex-row lg:gap-[79px] lg:items-start lg:py-14",
  formColumn: "flex flex-col gap-8 w-full lg:max-w-[640px] lg:flex-1",
  summaryColumn: "flex flex-col gap-5 w-full lg:max-w-[465px] lg:flex-shrink-0",
  title: "font-[var(--font-comfortaa)] font-bold text-2xl leading-[27px] text-[#000914]",
  itemsList: "flex flex-col",
  divider: "w-full h-px bg-[#D9D9D9] border-0",
  emptyState: "py-12 text-center font-[var(--font-comfortaa)] text-[#989B9C]",
  successMessage:
    "rounded-lg bg-emerald-50 p-4 text-emerald-800 font-[var(--font-comfortaa)]",
  successContainer:
    "mx-auto max-w-[1184px] px-4 py-8 flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center",
  successTitle:
    "font-[var(--font-comfortaa)] font-bold text-2xl leading-[27px] text-[#000914]",
  successSubtitle:
    "font-[var(--font-geist-sans)] text-base text-[#5F6368]",
  backButton:
    "inline-flex items-center justify-center py-3 px-8 bg-[#5CA2BC] text-white font-[var(--font-geist-sans)] text-sm tracking-[2px] uppercase rounded hover:bg-[#4a8fa9] transition-colors",
} as const;
