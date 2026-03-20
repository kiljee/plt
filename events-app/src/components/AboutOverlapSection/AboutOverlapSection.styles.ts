export const ABOUT_OVERLAP_SECTION = {
  root:
    "relative w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 px-4 sm:px-8 lg:px-[100px] py-12 sm:py-16 lg:py-[87px] min-h-[500px] lg:min-h-[550px]",
  imageWrapper:
    "relative flex-shrink-0 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[603px] lg:h-[603px] lg:-mt-[140px] rounded-full overflow-hidden",
  image:
    "object-cover w-full h-full",
  content:
    "relative flex flex-col items-start gap-6 flex-1 min-w-0 max-w-[519px] lg:-mt-[140px]",
  title:
    "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] font-normal text-3xl sm:text-4xl lg:text-[48px] lg:leading-[54px] leading-[1.1] text-[#000914]",
  accent:
    "font-[family-name:var(--font-caveat),'Caveat',cursive] font-semibold text-[1.4em]",
  body:
    "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] font-normal text-base lg:text-[20px] leading-[29px] text-[#000914] max-w-[482px] whitespace-pre-line",
  decorativeSvg:
    "w-full max-w-[519px] h-auto pointer-events-none",
} as const
