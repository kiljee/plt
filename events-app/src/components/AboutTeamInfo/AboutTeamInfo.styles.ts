export const ABOUT_TEAM_INFO = {
  root: "relative w-full overflow-hidden",
  inner:
    "relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:gap-12 lg:px-[100px] lg:py-[70px]",
  content:
    "relative flex flex-1 flex-col items-start gap-6 min-w-0 max-w-[557px] z-10",
  decorativeSvg:
    "absolute left-0 top-0 w-[200px] opacity-60 -rotate-[135deg] pointer-events-none sm:w-[250px] lg:left-[7%] lg:w-[307px]",
  title:
    "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] font-normal text-3xl sm:text-4xl lg:text-[48px] leading-[1.1] text-[#000914]",
  body:
    "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] font-normal text-base leading-[29px] text-[#000914] max-w-[490px]",
  linkWrap: "flex flex-col items-start",
  link:
    "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] text-xs leading-[18px] tracking-[5px] uppercase text-[#5CA2BC] hover:opacity-80 transition-opacity",
  linkUnderline: "mt-0.5 h-px w-[55%] bg-[#5CA2BC]",
  imageWrapper:
    "relative w-full flex-shrink-0 overflow-hidden order-first lg:order-last lg:w-[50%] lg:max-w-[600px] aspect-[600/435]",
  image: "object-cover w-full h-full",
} as const
