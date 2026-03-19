export const ABOUT_TEAM_HERO = {
  root:
    "relative flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 w-full max-w-[1440px] min-h-[min(743px,80vh)] mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20",
  imageWrapper:
    "relative w-full flex-shrink-0 order-1 lg:order-1 lg:max-w-[467px] aspect-[467/480] overflow-hidden",
  image: "object-cover w-full h-full",
  content:
    "relative flex flex-col items-start gap-6 order-2 lg:order-2 flex-1 min-w-0 max-w-[557px] overflow-visible",
  decorativeSvg:
    "absolute right-0 top-0 w-[280px] lg:w-[438px] h-auto -rotate-[177.61deg] opacity-80 pointer-events-none -translate-y-24 translate-x-16",
  title:
    "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] font-normal z-10 text-3xl sm:text-4xl lg:text-[48px] leading-[1.1] text-[#000914]",
  body:
    "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] z-10 font-normal text-base leading-[29px] text-[#000914] max-w-[490px]",
} as const
