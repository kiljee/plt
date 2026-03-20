export const TEAM_MEMBER_CARD = {
  root: "flex flex-col items-center gap-2 shrink-0 w-[130px] sm:w-[150px] lg:w-[140px]",
  imageWrapper:
    "relative w-[120px] h-[120px] sm:w-[130px] sm:h-[130px] lg:w-[125px] lg:h-[125px] rounded-full overflow-hidden",
  image: "object-cover w-full h-full",
  name:
    "font-[family-name:var(--font-caveat),'Caveat',cursive] font-semibold text-xl sm:text-2xl text-[#000914] text-center leading-tight",
  role:
    "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] font-normal text-sm text-[rgba(0,9,20,0.6)]",
} as const
