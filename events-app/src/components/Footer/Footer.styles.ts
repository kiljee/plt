export const FOOTER_COLORS = {
  background: "#EFF6F8",
  logo: "#02B6E7",
  accent: "#3DA9D3",
  text: "#000914",
  link: "#5CA2BC",
  border: "rgba(92, 162, 188, 0.5)",
  legalSeparator: "rgba(0, 9, 20, 0.35)",
} as const;

export const FOOTER = {
  root: "w-full overflow-x-hidden",
  inner:
    "mx-auto w-full max-w-[90rem] flex flex-col gap-2 px-3 py-4 sm:px-5 sm:gap-3 sm:py-5 lg:px-8 lg:py-6 lg:gap-4",

  top: "grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 sm:items-start lg:gap-6",
  brand: "flex flex-col gap-1.5 max-w-[14rem] sm:max-w-[16rem]",
  centerCol: "flex sm:justify-center",
  logo: "h-8 w-auto sm:h-9 lg:h-10 scale-200",
  tagline:
    "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] text-xs leading-[1.25rem] sm:text-[0.8125rem] sm:leading-[1.375rem]",
  devLink: "hover:underline",

  social: "flex flex-row items-center gap-2",
  socialIcon: "size-5 shrink-0 sm:size-6",

  block: "flex flex-col gap-1.5 min-w-0",
  workshopLinks: "flex flex-col gap-0.5",
  workshopLink: "text-xs hover:underline sm:text-sm",
  heading:
    "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] text-base font-normal leading-none sm:text-lg lg:text-xl",
  contactList: "flex flex-col gap-1.5",
  contactItem: "flex flex-col",
  contactLabel:
    "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] text-xs leading-[1.5rem] font-medium sm:text-[0.8125rem] sm:leading-[1.6875rem]",
  contactValue:
    "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] text-xs leading-[1.5rem] sm:text-[0.8125rem] sm:leading-[1.6875rem]",
  addressLines:
    "font-[family-name:var(--font-comfortaa),'Comfortaa',sans-serif] text-xs leading-[1.5rem] sm:text-[0.8125rem] sm:leading-[1.6875rem]",

  bottom: "flex flex-col items-center justify-center gap-1 border-t pt-3 pb-1",
  legal: "flex flex-row flex-wrap items-center justify-center gap-1.5",
  legalLink:
    "font-[family-name:var(--font-geist-sans),'Neue Haas Unica',sans-serif] text-[0.6875rem] leading-5 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded sm:text-[0.75rem]",
  legalSep: "font-[family-name:var(--font-geist-sans)] text-[0.6rem] leading-5 select-none",
} as const;
