export const QUANTITY_SELECTOR_STYLES = {
  container: "flex flex-col gap-2",
  
  label: "font-[var(--font-geist-sans)] text-xs font-normal tracking-wide text-[#212529] lg:text-[13px] lg:leading-[13px]",
  
  selector: {
    wrapper: "flex items-center justify-between border border-[rgba(92,162,188,0.6)]",
    responsive: "w-full max-w-[200px] px-4 py-3 lg:w-[142px] lg:px-[18px] lg:py-[11px]",
    gap: "gap-2 lg:gap-[10px]",
  },
  
  button: {
    base: "font-[var(--font-geist-sans)] flex items-center justify-center font-thin uppercase tracking-[5px] text-[#5CA2BC] transition-opacity disabled:opacity-50",
    decrement: "text-lg lg:text-[22px] lg:leading-[18px] lg:font-[300]",
    increment: "text-lg lg:text-[22px] lg:leading-[18px] lg:font-[300]",
    size: "h-6 w-6 lg:h-[18px] lg:w-[13px]",
  },
  
  value: "font-[var(--font-geist-sans)] flex items-center justify-center text-sm font-normal uppercase tracking-[5px] text-[#5CA2BC] lg:text-base lg:leading-[18px]",
} as const;