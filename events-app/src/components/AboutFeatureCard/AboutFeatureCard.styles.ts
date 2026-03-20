export const ABOUT_FEATURE_CARD = {
  root:
    "flex flex-col items-center gap-2 w-full max-w-[260px] min-w-[180px]",
  iconWrapper:
    "flex items-center justify-center shrink-0 h-14 text-[var(--color-primary)] [&_svg]:w-10 [&_svg]:h-10 [&_svg]:shrink-0 sm:[&_svg]:w-12 sm:[&_svg]:h-12",
  title:
    "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] font-bold text-sm sm:text-base leading-tight text-[#000914] text-center h-10 flex items-center justify-center",
  desc:
    "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] font-normal text-xs sm:text-sm leading-[1.35] text-center text-[rgba(0,9,20,0.5)]",
} as const
