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
  grid: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
  card: "flex flex-col overflow-hidden rounded-lg border border-[#F6F2F4] bg-white shadow-sm",
  cardImage:
    "aspect-[4/3] w-full bg-zinc-200 object-cover",
  cardBadge:
    "absolute left-3 top-3 rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white",
  cardBody: "flex flex-1 flex-col p-4",
  cardDate: "text-sm text-zinc-500",
  cardTitle: "mt-1 font-semibold text-zinc-900",
  cardPrice: "mt-2 text-sm font-medium text-zinc-700",
  cardButton:
    "mt-4 w-full rounded-lg bg-[#2D9CDB] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2480b8] focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] focus:ring-offset-2",
  cardButtonDisabled:
    "mt-4 w-full rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-500 cursor-not-allowed",
  error: "rounded-lg bg-red-50 p-4 text-red-700",
  empty: "py-12 text-center text-zinc-500",
} as const;
