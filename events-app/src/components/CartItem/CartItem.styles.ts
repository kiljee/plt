export const CART_ITEM_STYLES = {
  root: "flex flex-row items-center gap-5 w-full py-4",
  imageWrapper:
    "grid shrink-0 w-[100px] h-[100px] rounded-[6px] overflow-hidden border border-[#5CA2BC] bg-[#F4F4F4]",
  image: "col-start-1 row-start-1 w-full h-full object-cover",
  badge:
    "col-start-1 row-start-1 justify-self-end self-start flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#5F6368] text-white font-[var(--font-comfortaa)] font-semibold text-base leading-[18px] tracking-[0.5px] -mt-3 mr-1",
  content: "flex flex-col justify-center gap-0.5 flex-1 min-w-0",
  titleRow: "flex flex-row justify-between items-start gap-3",
  title:
    "font-[var(--font-comfortaa)] text-xs font-normal leading-[22px] tracking-[0.5px] text-[#000914]",
  price:
    "font-[var(--font-comfortaa)] text-xs font-normal leading-[22px] tracking-[0.5px] text-[#000914] shrink-0",
  meta: "font-[var(--font-geist-sans)] text-[10px] font-normal leading-[11px] tracking-[0.5px] text-[#989B9C]",
  removeButton:
    "mt-1 text-left font-[var(--font-geist-sans)] text-[10px] text-[#DC0000] hover:underline",
} as const;
