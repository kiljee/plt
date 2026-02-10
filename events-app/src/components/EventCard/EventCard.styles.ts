import { COLORS } from "@/lib/colors";

export const EVENT_CARD_STYLES = {
  card: {
    container: "flex flex-col w-[289px] h-[526px]",
    wrapper: "flex flex-col justify-end items-end w-[289px] h-[526px]",
  },
  
  image: {
    container: "w-[289px] h-[357px] bg-cover bg-center bg-no-repeat",
    overlay: "absolute inset-0 bg-black/10", // subtle overlay for better text readability
  },
  
  content: {
    container: "flex flex-col justify-center items-end p-4 gap-6 w-[289px] h-[169px] border-0 border-r border-b border-l border-solid",
    inner: "flex flex-col items-start gap-2 w-[249px]",
  },
  
  title: {
    base: "w-[249px]",
    available: "font-semibold", // font-weight: 600
    soldOut: "font-normal", // font-weight: 400
    text: "text-xl leading-[22px] tracking-[0.5px]",
  },
  

  priceContainer: "flex flex-row justify-center items-center w-[249px] h-4 gap-[10px]",
  
  price: "w-[249px] h-4 flex items-center text-base leading-4 flex-1",
  
  button: {
    base: "box-border w-[249px] h-[41px] border border-solid relative",
    available: "",
    soldOut: "bg-transparent",
  },
  
  buttonText: {
    base: "absolute w-[131.64px] h-[15px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center text-[10px] leading-[18px] tracking-[5px] uppercase font-normal",
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