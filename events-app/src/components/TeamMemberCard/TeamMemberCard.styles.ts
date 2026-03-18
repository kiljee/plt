export const TEAM_MEMBER_CARD = {
  root: "flex flex-col items-center gap-2 shrink-0 w-[180px] sm:w-[200px]",
  imageWrapper:
    "relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] rounded-full overflow-hidden",
  image: "object-cover w-full h-full",
  name:
    "font-[family-name:var(--font-caveat),'Caveat',cursive] font-semibold text-xl sm:text-2xl text-[#000914]",
  role:
    "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] font-normal text-sm text-[rgba(0,9,20,0.6)]",
} as const
