export const POLICY_INFO_STYLES = {
  container: "flex flex-col gap-5",
  responsive: "w-full lg:w-[640px]",
  height: "lg:h-[320px]",
  
  content: {
    wrapper: "space-y-5",
    responsive: "w-full lg:w-[608px]",
  },
  
  text: "font-normal leading-relaxed text-[#000914]",
  textResponsive: "text-sm lg:text-base lg:leading-[26px]",
  textEmphasis: "font-bold",
  
  link: "underline text-[#5CA2BC] hover:text-[#4a8ba3]",
} as const;