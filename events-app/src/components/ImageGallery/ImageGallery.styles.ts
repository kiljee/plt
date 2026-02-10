export const IMAGE_GALLERY_STYLES = {
  container: "flex flex-col gap-4 lg:gap-6",
  
  mainImage: {
    wrapper: "relative overflow-hidden bg-slate-100",
    responsive: "aspect-[4/3] w-full lg:aspect-[446/600] lg:h-[600px] lg:w-[446px]",
  },
  
  thumbnails: {
    container: "flex gap-4 lg:gap-6",
    responsive: "w-full lg:h-[134px] lg:w-[446px]",
    button: "relative overflow-hidden bg-slate-100 transition-opacity",
    buttonActive: "opacity-100",
    buttonInactive: "opacity-70 hover:opacity-90",
    buttonSize: "aspect-square flex-1 lg:aspect-[133/134] lg:h-[134px] lg:w-[133px] lg:flex-none",
  },
} as const;