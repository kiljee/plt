export const CALENDAR_EVENT_PILL = {
  link: "flex w-full min-w-0 items-center gap-0.5 rounded p-0.5 transition hover:opacity-95 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#5CA2BC]/50 sm:items-stretch sm:gap-2.5 sm:rounded-md sm:px-2 sm:py-1.5",
  imageColumn:
    "hidden sm:flex w-[72px] shrink-0 flex-col items-stretch gap-1",
  imageWrap:
    "relative aspect-square w-full shrink-0 overflow-hidden rounded",
  badgeStack:
    "pointer-events-none absolute left-1 top-1 z-10 flex max-w-[calc(100%-6px)] flex-col items-start gap-px",
  overlayBadge:
    "flex w-fit max-w-full items-center bg-white px-1 py-0.5 shadow-sm",
  overlayBadgeText:
    "font-[family-name:var(--font-geist-sans)] text-[8px] font-semibold leading-none",
  textCol: "flex min-w-0 flex-1 flex-col justify-center gap-px",
  mobileTime:
    "block truncate font-[family-name:var(--font-geist-sans)] text-[7px] font-semibold leading-none opacity-80 sm:hidden",
  mobileFull:
    "block truncate font-[family-name:var(--font-geist-sans)] text-[6px] font-bold uppercase leading-none opacity-70 sm:hidden",
  textLine:
    "line-clamp-2 overflow-hidden font-[family-name:var(--font-geist-sans)] text-[7px] font-medium leading-tight text-[#403F3F] sm:text-[9px] sm:font-normal sm:leading-tight",
  cityTag:
    "hidden sm:block w-full shrink-0 rounded px-1 py-0.5 text-center text-[8px] font-semibold leading-tight shadow-sm",
} as const
