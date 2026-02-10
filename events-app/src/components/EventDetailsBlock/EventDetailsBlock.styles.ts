export const EVENT_DETAILS_STYLES = {
  container: "flex flex-col gap-4 lg:gap-6",
  responsive: "w-full lg:w-[392px]",
  
  item: {
    wrapper: "flex flex-col justify-center px-4",
    responsive: "gap-3 lg:gap-[12px]",
    width: "w-full lg:w-[254px]",
    widthLocation: "w-full lg:w-[392px]", // Special width for location item
    height: "min-h-[22px]",
  },
  
  label: "font-bold tracking-wide text-[#000914]",
  labelResponsive: "text-sm lg:text-base lg:leading-[22px]",
  labelWidth: "w-full lg:w-[222px]",
  labelWidthLocation: "w-full lg:w-[360px]", // Special width for location
} as const;