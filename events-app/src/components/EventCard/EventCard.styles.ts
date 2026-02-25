import { COLORS } from "@/lib/colors";

export const EVENT_CARD_STYLES = {
  card: {
    container:
      "flex w-full flex-col sm:max-w-[289px] sm:h-[526px] sm:w-[289px]",
    wrapper:
      "flex w-full flex-col justify-end items-end sm:max-w-[289px] sm:h-[526px] sm:w-[289px]",
  },
  image: {
    container:
      "aspect-[289/357] w-full shrink-0 bg-cover bg-center bg-no-repeat sm:h-[357px] sm:w-[289px]",
    overlay: "absolute inset-0 bg-black/10",
  },
  content: {
    container:
      "flex w-full flex-col justify-center items-end gap-4 border-0 border-r border-b border-l border-solid p-3 sm:min-h-[169px] sm:w-[289px] sm:gap-6 sm:p-4",
    inner: "flex w-full flex-col items-start gap-2 sm:max-w-[249px]",
  },
  title: {
    base: "w-full min-w-0 sm:w-[249px]",
    available: "font-semibold",
    soldOut: "font-normal",
    text: "text-base leading-tight tracking-[0.5px] sm:text-xl sm:leading-[22px]",
  },
  priceContainer: "flex w-full flex-row items-center gap-2 sm:w-[249px] sm:h-4",
  price: "flex flex-1 items-center text-sm leading-4 sm:text-base sm:w-[249px]",
  button: {
    base: "box-border relative w-full min-h-[41px] border border-solid sm:w-[249px] sm:h-[41px]",
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