export const EVENT_DETAIL_STYLES = {
  section: "relative min-h-screen overflow-hidden bg-white",

  pageWrap:
    "relative mx-auto flex w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8 lg:py-10",
  pageWrapInner:
    "flex w-full flex-col gap-3 lg:items-center",
  backRow: "w-full shrink-0 lg:w-full lg:max-w-[1166px]",
  backLink:
    "inline-flex w-fit max-w-full items-center gap-1.5 text-sm font-medium text-[#5CA2BC] underline-offset-2 decoration-transparent transition-colors hover:text-[#4a8fa3] hover:underline",
  backLinkIcon: "h-3.5 w-3.5 shrink-0 opacity-90",

  decorativeElement:
    "absolute -right-32 -top-16 opacity-30 rotate-[-135deg] w-72 h-72 bg-slate-100 rounded-3xl hidden lg:block",

  columns:
    "flex w-full flex-col gap-8 lg:max-w-[1166px] lg:flex-row lg:gap-20",
  
  imageSection: "w-full lg:w-[446px] lg:flex-none lg:shrink-0",
  
  contentSection: "flex w-full flex-col gap-3 lg:w-[640px] lg:shrink-0",
  
  title: {
    wrapper: "flex justify-start px-4",
    text: "text-left text-2xl font-normal leading-tight text-[#000914] sm:text-3xl lg:text-5xl lg:leading-[48px]",
    font: "font-sans",
  },

  price: {
    wrapper: "px-4",
    text: "text-xl font-bold tracking-wide text-[#5CA2BC] sm:text-2xl lg:text-3xl lg:leading-[33px]",
    font: "font-serif", // Will be overridden by inline style
  },

  description: {
    wrapper: "px-4 mt-2",
    text: "text-xs font-normal uppercase tracking-widest text-[#212529] lg:text-[10px] lg:leading-[10px]",
  },
  
  quantitySection: "px-4",
  
  placesLeft: {
    wrapper: "px-4",
    text: "text-sm font-semibold tracking-wide text-[#000914] sm:text-base lg:text-base lg:leading-[22px]",
  },
  
  successMessage: "mx-4 rounded-lg bg-emerald-50 p-4 text-emerald-800",
  
  orderSection: "px-4",
  
  detailsSection: "px-4",
  
  policySection: "px-4",

} as const;