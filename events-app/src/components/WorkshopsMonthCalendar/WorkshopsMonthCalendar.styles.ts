export const WORKSHOPS_MONTH_CALENDAR = {
  pageRoot: "min-h-screen bg-white",
  main: "mx-auto max-w-[1240px] px-2 py-4 sm:px-6 sm:py-8 lg:px-8",
  header: "mb-4 sm:mb-8",
  title:
    "mb-2 font-[family-name:var(--font-comfortaa)] text-xl font-bold text-[#000914] sm:mb-4 sm:text-3xl",
  intro:
    "max-w-3xl font-[family-name:var(--font-geist-sans)] text-xs leading-relaxed text-[#212529] sm:text-base",
  locationBar: "mb-4 flex flex-wrap items-center gap-2 sm:mb-6 sm:gap-4",
  calendarWrap:
    "w-full overflow-x-auto [box-shadow:0px_4px_4px_rgba(0,0,0,0.04)]",
  calendarOuter:
    "box-border min-w-0 overflow-hidden rounded-md border border-[#E5E5E5] bg-white",
  navRow:
    "flex h-11 min-h-[44px] items-center justify-between rounded-t-md border-b border-[#E5E5E5] bg-[#EFF9FC] px-2 sm:h-[51px] sm:min-h-[51px] sm:px-4",
  navButton:
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-transparent text-[#5CA2BC] transition hover:bg-white/80 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#5CA2BC] sm:h-10 sm:w-10",
  navButtonIcon: "h-5 w-5 sm:h-6 sm:w-6",
  monthTitle:
    "font-[family-name:var(--font-comfortaa)] text-base font-bold capitalize text-[#5CA2BC] sm:text-2xl sm:leading-[27px]",
  weekdaysRow: "grid grid-cols-7 border-b border-[#E5E5E5] bg-white",
  weekdayCell:
    "flex h-[28px] items-center justify-center border-r border-[#E5E5E5] px-0.5 last:border-r-0 sm:h-[37px] sm:px-2",
  weekdayLabel:
    "font-[family-name:var(--font-comfortaa)] text-[10px] font-bold uppercase leading-none text-black sm:text-[12px] sm:leading-[13px]",
  grid: "grid grid-cols-7 overflow-hidden rounded-b-md bg-white",
  dayCell:
    "box-border flex flex-col items-stretch border-b border-r border-[#E5E5E5] bg-white last:border-r-0",
  dayCellEmpty: "min-h-[52px] p-1 sm:min-h-[136px] sm:p-2.5",
  dayCellWithEvents:
    "min-h-[88px] gap-0.5 p-1 sm:min-h-[136px] sm:gap-2 sm:p-2.5",
  dayNumber:
    "self-end font-[family-name:var(--font-geist-sans)] text-[11px] font-normal leading-none text-[#403F3F] sm:text-base sm:leading-4",
  dayNumberOutside: "text-[#E5E5E5]",
  eventsCol: "flex w-full min-w-0 flex-col gap-0.5 sm:gap-2",
  error: "rounded-lg bg-red-50 p-3 text-sm text-red-700",
  emptyHint: "py-8 text-center text-sm text-[#989B9C]",
} as const
