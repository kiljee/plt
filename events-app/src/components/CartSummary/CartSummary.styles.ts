import { COLORS } from "@/lib/colors";

export const CART_SUMMARY_STYLES = {
  root: "flex flex-col gap-0 w-full pt-4",
  divider: "w-full h-px bg-[#D9D9D9] border-0 my-0",
  title:
    "font-[var(--font-comfortaa)] font-bold text-2xl leading-[27px] text-[#000914]",
  row: "flex flex-row justify-between items-center gap-3 py-3",
  label:
    "font-[var(--font-comfortaa)] text-base font-normal leading-4 tracking-[0.5px] text-[#000914]",
  value:
    "font-[var(--font-comfortaa)] text-base font-normal leading-[22px] tracking-[0.5px] text-[#000914]",
  totalRow: "flex flex-row justify-between items-center gap-3 py-3",
  totalLabel:
    "font-[var(--font-comfortaa)] font-bold text-xl leading-[22px] tracking-[0.5px] text-[#000914]",
  totalValue:
    "font-[var(--font-comfortaa)] font-bold text-xl leading-[22px] tracking-[0.5px] text-[#000914]",
  submitButton:
    `flex flex-row justify-center items-center py-3 px-[90px] gap-2.5 w-full bg-[${COLORS.primary}] hover:bg-[${COLORS.primaryHover}] border border-[${COLORS.primaryBorder}] font-[var(--font-geist-sans)] text-xs font-normal leading-3 tracking-[5px] uppercase text-white rounded mt-4 cursor-pointer transition-colors`,
  submitButtonActive:
    `flex flex-row justify-center items-center py-3 px-[90px] gap-2.5 w-full bg-[${COLORS.primary}] hover:bg-[${COLORS.primaryHover}] border border-[${COLORS.primaryBorder}] font-[var(--font-geist-sans)] text-xs font-normal leading-3 tracking-[5px] uppercase text-white rounded mt-4 cursor-pointer transition-colors`,
  submitButtonError:
    "flex flex-row justify-center items-center py-3 px-[90px] gap-2.5 w-full bg-red-500 border border-red-600 font-[var(--font-geist-sans)] text-xs font-normal leading-3 tracking-[5px] uppercase text-white rounded mt-4",
  rootErrorMessage:
    "mt-2 font-[var(--font-geist-sans)] text-sm text-red-600",
  termsRow:
    "flex flex-col gap-2 mt-3",
  errorMessage:
    "font-[var(--font-geist-sans)] text-xs leading-3 text-red-500",
  footer: "flex flex-row justify-center items-center mt-3",
  footerText:
    "font-[var(--font-geist-sans)] text-xs leading-3 text-[#989B9C] text-center",
  questionIcon:
    "w-4 h-4 text-[#5F6368] inline-block align-middle ml-1",
} as const;
