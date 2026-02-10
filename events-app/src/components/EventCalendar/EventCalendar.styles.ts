export const EVENT_CALENDAR = {
  root: "min-h-screen bg-white",
  main: "mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8",
  header: "mb-8",
  title: "mb-4 text-3xl font-bold text-zinc-900 sm:text-4xl",
  intro:
    "max-w-3xl text-zinc-600 leading-relaxed",
  locationBar: "mb-6 flex flex-wrap items-center justify-between gap-4",
  filterBar:
    "mb-8 flex flex-wrap items-center gap-4 border-b border-[#F6F2F4] pb-4",
  filterLabel: "flex items-center gap-2 text-sm text-zinc-600",
  filterIcon: "h-5 w-5 text-[#5BA4B8]",
  calendarToggle:
    "inline-flex items-center gap-2 rounded-lg border border-[#F6F2F4] bg-white px-3 py-2 text-sm font-medium text-[#5BA4B8]",
  sortWrap: "flex items-center gap-2 text-sm text-zinc-600",
  sortSelect:
    "rounded-md border border-[#F6F2F4] bg-white px-3 py-2 text-[#5BA4B8] focus:border-[#2D9CDB] focus:outline-none focus:ring-1 focus:ring-[#2D9CDB]",
  count: "text-sm text-zinc-500",
  grid: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-items-center",
  error: "rounded-lg bg-red-50 p-4 text-red-700",
  empty: "py-12 text-center text-zinc-500",
} as const;
