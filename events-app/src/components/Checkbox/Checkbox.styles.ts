export const CheckboxStyles = {
  wrapper:
    "flex flex-row items-start gap-3 cursor-pointer",
  root:
    "w-4 h-4 shrink-0 rounded border-2 border-[#5CA2BC] flex items-center justify-center data-[state=checked]:bg-[#5CA2BC] data-[state=checked]:border-[#5CA2BC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5CA2BC] focus:ring-offset-0",
  rootError:
    "border-red-500",
  indicator:
    "text-white flex items-center justify-center",
  checkIcon:
    "w-2.5 h-2.5",
  label:
    "font-[var(--font-geist-sans)] text-xs leading-4 text-[#000914] cursor-pointer",
} as const;
