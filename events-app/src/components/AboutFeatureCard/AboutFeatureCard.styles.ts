export const ABOUT_FEATURE_CARD = {
  root: "flex flex-col justify-center items-center gap-2.5 w-full max-w-[200px]",
  iconWrapper:
    "flex items-center justify-center shrink-0 text-[var(--color-primary)] [&_svg]:w-10 [&_svg]:h-10 sm:[&_svg]:w-12 sm:[&_svg]:h-12",
  title:
    "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] font-bold text-base sm:text-lg leading-tight text-[#000914] text-center",
  desc:
    "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] font-normal text-sm sm:text-base leading-[1.4] text-center text-[rgba(0,9,20,0.5)] max-w-[195px]",
} as const
