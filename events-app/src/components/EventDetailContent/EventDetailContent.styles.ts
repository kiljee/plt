export const EVENT_DETAIL_STYLES = {
  section: "relative min-h-screen overflow-hidden bg-white",
  
  decorativeElement: "absolute -right-32 -top-16 opacity-30 rotate-[-135deg] w-72 h-72 bg-slate-100 rounded-3xl hidden lg:block",
  
  container: "relative mx-auto flex flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:gap-20 lg:px-8 lg:py-10",
  containerInner: "max-w-7xl",
  
  imageSection: "w-full lg:w-[446px] lg:flex-none",
  
  contentSection: "flex w-full flex-col gap-6 lg:w-[640px]",
  
  title: {
    wrapper: "flex justify-center px-4",
    text: "text-center text-2xl font-normal leading-tight text-[#000914] sm:text-3xl lg:text-5xl lg:leading-[48px]",
    font: "font-sans", // Will be overridden by inline style
  },
  
  price: {
    wrapper: "px-4",
    text: "text-xl font-bold tracking-wide text-[#5CA2BC] sm:text-2xl lg:text-3xl lg:leading-[33px]",
    font: "font-serif", // Will be overridden by inline style
  },
  
  description: {
    wrapper: "px-4",
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