export const EVENT_DETAILS_STYLES = {
  container: "flex flex-col gap-2 lg:gap-2",
  responsive: "w-full",
  
  item: {
    wrapper: "flex flex-col justify-center",
    responsive: "gap-3 lg:gap-[12px]",
    width: "w-full ",
    widthLocation: "w-full ", // Special width for location item
    height: "min-h-[22px]",
  },
  
  label: " tracking-wide text-[#000914]",
  labelResponsive: "text-sm lg:text-base lg:leading-[22px]",
  labelWidth: "w-full ",
  labelWidthLocation: "w-full ", // Special width for location
} as const;