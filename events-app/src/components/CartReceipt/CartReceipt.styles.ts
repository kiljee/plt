export const CART_RECEIPT_STYLES = {
  wrapper:
    "w-full max-w-[465px] flex flex-col overflow-hidden rounded-lg",
  zigzagTop:
    "h-3 w-full bg-[#F4F4F4] bg-[length:20px_12px] bg-repeat-x bg-[position:0_0] flex-shrink-0",
  zigzagBottom:
    "h-3 w-full bg-[#F4F4F4] bg-[length:20px_12px] bg-repeat-x bg-[position:0_0] flex-shrink-0",
  content: "flex flex-col bg-[#F4F4F4] px-5 py-6 flex-1",
  title:
    "font-[var(--font-comfortaa)] font-bold text-2xl leading-[27px] text-[#000914] text-center mb-6",
  itemsList: "flex flex-col",
  divider: "w-full h-px bg-[#D9D9D9] border-0 my-0",
} as const;
