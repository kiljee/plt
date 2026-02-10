export const HEADER = {
  root:
    "box-border grid w-full max-w-[1440px] mx-auto grid-cols-[1fr_auto_1fr] items-center gap-2.5 border-b border-[#F6F2F4] bg-white px-4 py-5 sm:px-6 md:pl-[60px] md:pr-[25px] md:py-5",
  navLeft: "hidden items-center gap-2.5 md:flex",
  navRight: "hidden items-center justify-end gap-2.5 md:flex",
  navLink:
    "text-sm font-medium uppercase tracking-wide text-[#5BA4B8] transition-colors hover:text-[#4a8a9a] focus:outline-none focus:ring-2 focus:ring-[#5BA4B8]/30 focus:ring-offset-2",
  logoLink: "flex shrink-0 focus:outline-none focus:ring-2 focus:ring-[#5BA4B8]/30 focus:ring-offset-2 rounded",
  logoText: "text-xl font-semibold tracking-tight sm:text-2xl",
  logoPale: "text-[#2D9CDB]",
  logoTo: "text-[#C77DBB]",
  right: "flex items-center justify-end gap-2.5",
  mobileMenuButton:
    "flex h-10 w-10 items-center justify-center rounded-md text-[#5BA4B8] hover:bg-[#F6F2F4] focus:outline-none focus:ring-2 focus:ring-[#5BA4B8]/30 md:hidden",
  mobileMenuIcon: "h-6 w-6",
  mobileNav:
    "absolute left-0 right-0 top-full z-50 flex flex-col gap-1 border-b border-[#F6F2F4] bg-white py-2 shadow-md md:hidden",
  mobileNavLink:
    "px-4 py-3 text-sm font-medium uppercase tracking-wide text-[#5BA4B8] hover:bg-[#F6F2F4]",
} as const;
