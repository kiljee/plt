export const CALENDAR_AGENDA_ITEM = {
  link:
    "flex min-h-[64px] w-full touch-manipulation items-stretch gap-1.5 rounded-lg border px-2 py-1.5 active:scale-[0.99] active:opacity-95 motion-reduce:active:scale-100 shadow-sm transition-[transform,opacity] duration-150 ease-out sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2 sm:items-center",
  thumbWrap:
    "relative shrink-0 overflow-hidden rounded-md border border-[#E5E5E5] bg-[#F8F9FA] size-[60px] sm:size-20",
  thumbImage:
    "object-cover",
  body: "flex min-h-0 min-w-0 flex-1 flex-col justify-center pr-0.5 sm:justify-center",
  topRow:
    "mb-0.5 flex flex-wrap items-center gap-2 gap-y-1",
  timeLabel:
    "font-[family-name:var(--font-geist-sans)] text-[13px] font-semibold leading-none",
  locationTag:
    "inline-flex shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none",
  titleRow:
    "flex flex-wrap items-start gap-2 gap-y-1",
  titleText:
    "min-w-0 flex-1 font-[family-name:var(--font-geist-sans)] text-[14px] font-medium leading-snug",
  badgeFull:
    "shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase leading-none",
  chevronIcon:
    "h-5 w-5 shrink-0 self-center text-[#5CA2BC] opacity-80",
} as const
