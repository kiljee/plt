import { COLORS } from "@/lib/colors";

export const EVENT_CARD_STYLES = {
  card: {
    container: "flex h-full w-full flex-col",
    wrapper: "flex min-h-0 flex-1 flex-col",
  },
  image: {
    container:
      "relative aspect-[289/357] w-full shrink-0 overflow-hidden bg-cover bg-center bg-no-repeat",
    overlay: "absolute inset-0 bg-black/10",
  },
  content: {
    container:
      "flex min-h-[152px] flex-1 flex-col justify-between border-0 border-r border-b border-l border-solid p-3 sm:p-4",
    inner: "flex w-full flex-col items-start gap-2 min-w-0",
  },
  title: {
    base: "w-full min-w-0 line-clamp-2",
    available: "font-semibold",
    soldOut: "font-normal",
    text: "text-base leading-tight tracking-[0.5px] sm:text-xl sm:leading-[22px]",
  },
  priceContainer: "flex w-full flex-row items-center gap-2",
  price: "flex flex-1 items-center text-sm leading-4 sm:text-base",
  priceCity: "font-normal",
  button: {
    base: "box-border relative w-full min-h-[41px] border border-solid",
    available: "",
    soldOut: "bg-transparent",
  },
  buttonText: {
    base:
      "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center text-[10px] leading-[18px] tracking-[5px] uppercase font-normal",
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