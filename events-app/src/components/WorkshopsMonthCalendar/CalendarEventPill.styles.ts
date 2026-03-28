export const CALENDAR_EVENT_PILL = {
  link: "flex w-full min-w-0 items-stretch gap-1.5 rounded-md p-1.5 transition hover:opacity-95 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#5CA2BC]/50 sm:gap-2.5 sm:px-2 sm:py-1.5",
  imageColumn:
    "flex w-[52px] shrink-0 flex-col items-stretch gap-0.5 sm:w-[72px] sm:gap-1",
  imageWrap:
    "relative aspect-square w-full shrink-0 overflow-hidden rounded",
  badgeStack:
    "pointer-events-none absolute left-0.5 top-0.5 z-10 flex max-w-[calc(100%-6px)] flex-col items-start gap-px sm:left-1 sm:top-1",
  overlayBadge:
    "flex w-fit max-w-full items-center bg-white px-0.5 py-px shadow-sm sm:px-1 sm:py-0.5",
  overlayBadgeText:
    "font-[family-name:var(--font-geist-sans)] text-[7px] font-semibold leading-none sm:text-[8px]",
  textCol: "flex min-w-0 flex-1 flex-col justify-center",
  textLine:
    "line-clamp-2 overflow-hidden font-[family-name:var(--font-geist-sans)] text-[8px] font-normal leading-snug text-[#403F3F] sm:text-[9px] sm:leading-tight",
  cityTag:
    "w-full shrink-0 rounded px-0.5 py-0.5 text-center text-[7px] font-semibold leading-tight shadow-sm sm:px-1 sm:py-0.5 sm:text-[8px]",
} as const;
