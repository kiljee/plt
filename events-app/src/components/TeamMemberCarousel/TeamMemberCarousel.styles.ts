export const TEAM_MEMBER_CAROUSEL = {
  root: "flex flex-col items-center max-w-6xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-16",
  title:
    "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] font-bold text-2xl sm:text-3xl text-[#000914] text-center mb-2",
  accent:
    "font-[family-name:var(--font-caveat),'Caveat',cursive] font-semibold text-[1.8em]",
  subheading:
    "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] font-normal text-sm sm:text-base text-[rgba(0,9,20,0.6)] text-center max-w-2xl mb-8",
  carouselWrapper:
    "relative flex items-center w-full max-w-[700px] lg:max-w-[900px]",
  track:
    "flex flex-wrap justify-center gap-6 sm:gap-8 py-4 px-2 w-full lg:flex-nowrap lg:overflow-x-auto lg:scroll-smooth lg:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
  arrow:
    "absolute top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[#D9D9D9] text-[#000914] shadow-sm hover:bg-white hover:shadow-md transition-all cursor-pointer disabled:opacity-20 disabled:cursor-default",
  arrowLeft: "-left-5 sm:-left-6",
  arrowRight: "-right-5 sm:-right-6",
  arrowIcon: "w-4 h-4 sm:w-5 sm:h-5",
} as const
