export const HEADER = {
  root:
    "sticky top-0 z-10 w-full border-b border-[#F6F2F4] bg-white z-11",
  inner:
    "mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-2.5 md:px-6 md:pl-[60px] md:pr-[25px] md:py-5",
  navLeft: "hidden items-center gap-2.5 md:flex",
  navRight: "hidden items-center justify-end gap-5 md:flex",
  navLink:
    "text-sm font-medium uppercase tracking-wide text-[#5BA4B8] transition-colors hover:text-[#4a8a9a] focus:outline-none focus:ring-2 focus:ring-[#5BA4B8]/30 focus:ring-offset-2",
  logoLink:
    "flex shrink-0 rounded transition-transform duration-200 ease-out hover:scale-105 focus:outline-none",
  logoText: "text-lg font-semibold tracking-tight sm:text-xl md:text-2xl",
  logoPale: "text-[#2D9CDB]",
  logoTo: "text-[#C77DBB]",
  right: "flex items-center justify-end gap-1",
  cartBadge:
    "absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#5CA2BC] px-1 text-[10px] font-medium text-white",
  cartBadgeMobile: "ml-1 inline-flex  h-4 min-w-4 mb-0.5 items-center justify-center rounded-full bg-[#5CA2BC]  text-[10px] font-medium text-white",
  mobileCartLink:
    "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[#5BA4B8] hover:bg-[#F6F2F4] focus:outline-none focus:ring-2 focus:ring-[#5BA4B8]/30 md:hidden",
  mobileCartIcon: "h-5 w-5",
  mobileCartBadge:
    "absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#5CA2BC] px-1 text-[10px] font-medium text-white",
  mobileMenuButton:
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[#5BA4B8] hover:bg-[#F6F2F4] focus:outline-none focus:ring-2 focus:ring-[#5BA4B8]/30 md:hidden",
  mobileMenuIcon: "h-5 w-5",
  mobileNav:
    "absolute left-0 right-0 top-full z-50 flex flex-col border-b border-[#F6F2F4] bg-white py-2 shadow-lg md:hidden",
  mobileNavLink:
    "flex items-center px-4 py-3 text-sm font-medium uppercase tracking-wide text-[#5BA4B8] hover:bg-[#F6F2F4]",
} as const;
