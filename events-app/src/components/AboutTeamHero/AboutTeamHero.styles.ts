export const ABOUT_TEAM_HERO = {
  root:
    "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-16 lg:py-20",
  content: "flex flex-col gap-4 order-2 lg:order-1",
  title:
    "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight text-[#000914]",
  body:
    "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] font-normal text-base sm:text-lg leading-relaxed text-[#212529]",
  imageWrapper: "relative aspect-[4/3] lg:aspect-[3/2] order-1 lg:order-2",
  image: "object-cover rounded-lg w-full h-full",
} as const
