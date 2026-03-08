export const PAGINATION = {
  root: "flex flex-wrap items-center justify-center gap-1 py-6 sm:gap-2 sm:py-8",
  list: "flex flex-wrap items-center justify-center gap-1 sm:gap-2",
  link:
    "inline-flex min-w-[2.25rem] items-center justify-center rounded-md border border-[#F6F2F4] bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-[#F6F2F4] focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/30 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:min-w-[2.5rem] sm:py-2 sm:text-sm",
  linkActive:
    "border-[#2D9CDB] bg-[#2D9CDB] text-white hover:bg-[#2D9CDB] hover:opacity-90",
  ellipsis:
    "inline-flex min-w-[2.25rem] items-center justify-center px-1 text-xs text-zinc-500 sm:min-w-[2.5rem] sm:text-sm",
} as const;
