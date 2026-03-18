import { COLORS } from "@/lib/colors";

export const EVENT_CARD_STYLES = {
  card: {
    container: "flex h-full w-full flex-col",
    wrapper: "flex min-h-0 flex-1 flex-col cursor-pointer",
  },
  image: {
    container:
      "relative aspect-[4/4] w-full shrink-0 overflow-hidden bg-cover bg-center bg-no-repeat",
  },
  dateBadge: {
    wrapper: "absolute left-2.5 top-2.5 z-10 flex items-center bg-white px-2.5 py-1.5 shadow-sm",
    text: "whitespace-nowrap text-xs font-semibold leading-none",
  },
  content: {
    container:
      "flex flex-1 flex-col border-0 border-r border-b border-l border-solid px-2.5 py-2.5 sm:px-3 sm:py-3",
    inner: "flex w-full flex-col items-start gap-1.5 min-w-0 pb-3",
  },
  title: {
    base: "w-full min-w-0 line-clamp-2 min-h-[2rem] sm:min-h-[3.25rem]",
    available: "font-semibold",
    soldOut: "font-normal",
    text: "text-sm leading-tight tracking-[0.5px] sm:text-lg sm:leading-[26px]",
  },
  infoRow: "flex w-full items-center gap-1.5 text-xs leading-4 sm:text-sm sm:leading-5",
  infoIcon: "h-3.5 w-3.5 shrink-0",
  button: {
    base: "box-border relative w-full min-h-[36px] shrink-0 border border-solid mt-auto",
    available: "",
    soldOut: "bg-transparent",
  },
  buttonText: {
    base:
      "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center text-[9px] leading-[18px] tracking-[2px] uppercase font-normal sm:text-[10px] sm:tracking-[3px]",
    available: "",
    soldOut: "",
  },
} as const;

// CSS custom properties that will be applied via style attribute
export const EVENT_CARD_CSS = {
  colors: {
    background: COLORS.background.white,
    textPrimary: COLORS.text.primary,
    textWhite: COLORS.text.white,
    primary: COLORS.primary,
    primaryBorder: COLORS.primaryBorder,
  },
} as const;