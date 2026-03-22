export const EVENT_CALENDAR = {
  root: "min-h-screen bg-white",
  main: "mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8",
  header: "mb-5 sm:mb-8",
  title: "mb-3 text-2xl font-bold text-zinc-900 sm:mb-4 sm:text-3xl lg:text-4xl",
  intro: "max-w-3xl text-sm text-zinc-600 leading-relaxed sm:text-base",
  locationBar: "mb-4 flex flex-wrap items-center gap-2 sm:mb-6 sm:gap-4",
  countBar: "mb-6",
  filterBar:
    "mb-6 flex flex-col gap-3 border-b border-[#F6F2F4] pb-4 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4",
  filterLabel: "flex items-center gap-2 text-xs text-zinc-600 sm:text-sm",
  filterIcon: "h-4 w-4 shrink-0 text-[#5BA4B8] sm:h-5 sm:w-5",
  calendarToggle:
    "inline-flex items-center gap-2 rounded-lg border border-[#F6F2F4] bg-white px-2.5 py-1.5 text-xs font-medium text-[#5BA4B8] sm:px-3 sm:py-2 sm:text-sm",
  sortWrap: "flex items-center gap-2 text-xs text-zinc-600 sm:text-sm",
  sortSelect:
    "rounded-md border border-[#F6F2F4] bg-white px-2.5 py-1.5 text-[#5BA4B8] text-xs focus:border-[#2D9CDB] focus:outline-none focus:ring-1 focus:ring-[#2D9CDB] sm:px-3 sm:py-2 sm:text-sm",
  count: "text-xs text-zinc-500 sm:text-sm",
  grid:
    "grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-5",
  error: "rounded-lg bg-red-50 p-3 text-sm text-red-700 sm:p-4",
  empty: "py-8 text-center text-sm text-zinc-500 sm:py-12",
} as const;
