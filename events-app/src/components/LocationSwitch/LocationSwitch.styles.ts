export const LOCATION_SWITCH = {
  root:
    "inline-flex flex-wrap rounded-md border border-[#F6F2F4] bg-white p-0.5 shadow-sm",
  link:
    "inline-flex shrink-0 items-center justify-center rounded-sm px-2.5 py-2 text-xs font-medium outline-none transition-[background-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:duration-150 motion-reduce:transition-colors focus-visible:ring-1 focus-visible:ring-[#2D9CDB]/40 focus-visible:ring-offset-1 sm:px-4 sm:py-2 sm:text-sm",
  tabPress: "active:scale-[0.985] motion-reduce:active:scale-100",
  linkActive:
    "bg-[#2D9CDB] text-white shadow-[0_1px_2px_rgba(45,156,219,0.35)]",
  linkInactive:
    "text-[#5BA4B8] hover:bg-[#F6F2F4]/85",
  standaloneOuter:
    "inline-block shrink-0 rounded-md border border-[#F6F2F4] bg-white p-0.5 align-middle shadow-sm outline-none transition-[box-shadow,transform] duration-200 ease-out focus-visible:ring-1 focus-visible:ring-[#2D9CDB]/40 focus-visible:ring-offset-1 active:scale-[0.99] motion-reduce:active:scale-100",
} as const;

export const LOCATION_BAR_STANDALONE_INNER_INACTIVE = `${LOCATION_SWITCH.link} ${LOCATION_SWITCH.linkInactive} gap-1.5`;
