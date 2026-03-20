export const ABOUT_CTA_BANNER = {
  root:
    "relative w-full h-[400px] sm:h-[480px] lg:h-[565px] overflow-hidden",
  backgroundImage:
    "absolute inset-0 w-full h-full object-cover",
  overlay:
    "absolute inset-0 bg-black/30",
  content:
    "relative z-10 flex flex-col justify-center items-start gap-8 sm:gap-10 lg:gap-[46px] h-full max-w-[800px] px-6 sm:px-12 lg:px-[130px]",
  title:
    "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] font-normal text-3xl sm:text-4xl lg:text-[48px] lg:leading-[54px] leading-[1.1] text-white",
  body:
    "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] font-normal text-base lg:text-[20px] leading-[29px] text-white max-w-[700px]",
  link:
    "inline-flex justify-center items-center px-12 sm:px-[90px] py-[13px] bg-[#5CA2BC] border border-[rgba(92,162,188,0.6)] font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] text-[10px] leading-[18px] tracking-[5px] uppercase text-white hover:opacity-90 transition-opacity",
} as const
