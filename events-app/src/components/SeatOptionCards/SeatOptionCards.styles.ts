export const SEAT_OPTION_CARDS_STYLES = {
  grid: "flex w-full flex-col gap-2",
  card: "flex w-full flex-col gap-1",
  person: "text-[13px] font-medium leading-none text-[#000914]",
  options: "flex min-w-0 gap-1.5",
  option:
    "flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-md border border-[#D7E3E8] bg-white px-2 py-1.5 text-center",
  optionSelected:
    "flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-md border border-[#5CA2BC] bg-[#5CA2BC] px-2 py-1.5 text-center",
  price: "text-[13px] font-semibold leading-none text-[#5CA2BC]",
  priceSelected: "text-[13px] font-semibold leading-none text-white",
  label: "text-[12px] leading-tight text-[#000914]",
  labelSelected: "text-[12px] leading-tight text-white",
} as const;
