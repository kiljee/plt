export const WORKSHOPS_MONTH_CALENDAR = {
  pageRoot: "min-h-screen bg-white",
  main: "mx-auto max-w-[1240px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8",
  header: "mb-5 sm:mb-8",
  title: "mb-3 font-[family-name:var(--font-comfortaa)] text-2xl font-bold text-[#000914] sm:mb-4 sm:text-3xl",
  intro:
    "max-w-3xl font-[family-name:var(--font-geist-sans)] text-sm leading-relaxed text-[#212529] sm:text-base",
  locationBar: "mb-6 flex flex-wrap items-center gap-2 sm:gap-4",
  calendarWrap:
    "w-full overflow-x-auto [box-shadow:0px_4px_4px_rgba(0,0,0,0.04)]",
  calendarOuter:
    "box-border min-w-[min(100%,1240px)] overflow-hidden rounded-md border border-[#E5E5E5] bg-white",
  navRow:
    "flex h-[51px] min-h-[51px] items-center justify-between border-b border-[#E5E5E5] rounded-t-md bg-[#EFF9FC] px-4",
  navButton:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-transparent text-[#5CA2BC] transition hover:bg-white/80 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#5CA2BC]",
  navButtonIcon: "h-6 w-6",
  monthTitle:
    "font-[family-name:var(--font-comfortaa)] text-xl font-bold capitalize text-[#5CA2BC] sm:text-2xl sm:leading-[27px]",
  weekdaysRow:
    "grid grid-cols-7 border-b border-[#E5E5E5] bg-white",
  weekdayCell:
    "flex h-[37px] items-center justify-center border-r border-[#E5E5E5] last:border-r-0 px-2",
  weekdayLabel:
    "font-[family-name:var(--font-comfortaa)] text-[12px] font-bold uppercase leading-[13px] text-black",
  grid: "grid grid-cols-7 bg-white rounded-b-md overflow-hidden",
  dayCell:
    "box-border flex min-h-[112px] flex-col items-stretch gap-1.5 border-b border-r border-[#E5E5E5] p-2 last:border-r-0 sm:min-h-[136px] sm:gap-2 sm:p-2.5",
  dayCellMuted: "bg-white",
  dayNumber:
    "self-end font-[family-name:var(--font-geist-sans)] text-base font-normal leading-4 text-[#403F3F]",
  dayNumberOutside: "text-[#E5E5E5]",
  eventsCol: "flex w-full min-w-0 flex-col gap-1.5 sm:gap-2",
  error: "rounded-lg bg-red-50 p-3 text-sm text-red-700",
  emptyHint: "py-8 text-center text-sm text-[#989B9C]",
} as const;
