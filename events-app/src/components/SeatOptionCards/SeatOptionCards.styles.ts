export const SEAT_OPTION_CARDS_STYLES = {
  grid: "flex w-full flex-col gap-2",
  gridCompact: "flex w-full flex-col gap-1",
  card: "flex w-full flex-col gap-1",
  cardCompact: "flex w-full flex-col gap-0.5",
  person: "text-[13px] font-medium leading-none text-[#000914]",
  personCompact: "text-[11px] font-medium leading-none text-[#000914]",
  options: "flex w-full min-w-0 items-stretch gap-1 sm:gap-1.5",
  option:
    "flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-start gap-0.5 rounded-none border border-[#D7E3E8] bg-white px-1 pt-1.5 pb-1 text-center",
  optionSelected:
    "flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-start gap-0.5 rounded-none border border-[#5CA2BC] bg-[#5CA2BC] px-1 pt-1.5 pb-1 text-center",
  optionCompact:
    "flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-start gap-0 rounded-none border border-[#D7E3E8] bg-white px-0.5 pt-1 pb-0.5 text-center",
  optionSelectedCompact:
    "flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-start gap-0 rounded-none border border-[#5CA2BC] bg-[#5CA2BC] px-0.5 pt-1 pb-0.5 text-center",
  price: "w-full text-center text-[13px] font-semibold leading-none text-[#5CA2BC]",
  priceSelected: "w-full text-center text-[13px] font-semibold leading-none text-white",
  priceCompact: "w-full text-center text-[11px] font-semibold leading-none text-[#5CA2BC]",
  priceSelectedCompact: "w-full text-center text-[11px] font-semibold leading-none text-white",
  currency: "text-[10px] font-medium leading-none",
  currencyCompact: "text-[9px] font-medium leading-none",
  label: "line-clamp-2 w-full text-center text-[12px] leading-tight text-[#000914]",
  labelSelected: "line-clamp-2 w-full text-center text-[12px] leading-tight text-white",
  labelCompact: "line-clamp-2 w-full text-center text-[10px] leading-none text-[#000914]",
  labelSelectedCompact: "line-clamp-2 w-full text-center text-[10px] leading-none text-white",
  toggle:
    "flex w-full items-center gap-2 bg-transparent py-0.5 text-left",
  toggleSummary: "min-w-0 flex-1 truncate text-[11px] text-[#5CA2BC]",
  chevron: "ml-auto h-3 w-3 shrink-0 text-[#5CA2BC]",
  chevronOpen: "ml-auto h-3 w-3 shrink-0 rotate-90 text-[#5CA2BC]",
} as const;
