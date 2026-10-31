export const CART_ITEM_STYLES = {
  root: "flex w-full flex-col gap-1.5 py-2",
  main: "flex w-full flex-row items-start gap-3 sm:items-center sm:gap-5",
  imageWrapper:
    "block shrink-0 w-[100px] h-[100px] rounded-[6px] overflow-hidden border border-[#5CA2BC] bg-[#F4F4F4]",
  image: "w-full h-full object-cover",
  content: "flex flex-col justify-center gap-0.5 flex-1 min-w-0",
  quantity: "mt-1",
  options: "w-full",
  titleRow: "flex flex-row justify-between items-start gap-3",
  title:
    "min-w-0 font-[var(--font-comfortaa)] text-xs font-normal leading-[22px] tracking-[0.5px] text-[#000914]",
  price:
    "font-[var(--font-comfortaa)] text-xs font-normal leading-[22px] tracking-[0.5px] text-[#000914] shrink-0",
  cityLabel: "font-normal",
  meta: "font-[var(--font-geist-sans)] text-[10px] font-normal leading-[11px] tracking-[0.5px] text-[#989B9C]",
  removeButton:
    "mt-1 text-left font-[var(--font-geist-sans)] text-[10px] text-[#DC0000] hover:underline",
} as const;
