export const CHECKOUT_FORM_STYLES = {
  root: "flex flex-col gap-8",
  section: "flex flex-col gap-3",
  sectionTitle:
    "font-[var(--font-comfortaa)] font-bold text-lg leading-[22px] tracking-[0.5px] text-[var(--color-text-primary)]",
  input:
    "box-border flex flex-row items-center py-2 px-4 gap-2.5 w-full border border-[var(--color-border-default)] rounded focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-[var(--font-geist-sans)] text-xs leading-3 text-[var(--color-text-primary)]",
  inputFocusWithin:
    "focus-within:border-[var(--color-primary)] focus-within:outline-none focus-within:ring-1 focus-within:ring-[var(--color-primary)]",
  inputError:
    "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]",
  inputErrorFocusWithin:
    "focus-within:border-[var(--color-error)] focus-within:ring-[var(--color-error)]",
  label:
    "font-[var(--font-geist-sans)] text-[10px] leading-[10px] text-[var(--color-text-label)]",
  inputGroup: "flex flex-col gap-1.5",
  row: "flex flex-row gap-3",
  errorMessage: "text-xs text-[var(--color-error)] mt-1",
  paymentOption:
    "flex flex-col justify-center items-start p-4 gap-1 border border-[var(--color-primary)] rounded-t bg-[var(--color-primary-light)]",
  paymentOptionInactive:
    "flex flex-col justify-center items-start p-4 gap-1 border border-[var(--color-border-default)] rounded-b",
  checkboxRow: "flex flex-row flex-wrap items-start gap-2.5",
  checkbox:
    "w-6 h-6 rounded border-2 border-[var(--color-primary)] accent-[var(--color-primary)]",
  checkboxLabel:
    "font-[var(--font-geist-sans)] text-xs leading-[11px] text-[var(--color-text-primary)]",
  checkboxError: "border-[var(--color-error)]",
  paymentRadioBorder:
    "border-2 border-[var(--color-primary)] bg-[var(--color-primary)]",
  paymentRadioDot: "bg-white",
  paymentTextPrimary: "text-[var(--color-text-primary)]",
  paymentTextMuted: "text-[var(--color-text-muted)]",
  paymentInactiveBorder: "border-[var(--color-border-light)]",
  paymentInactiveText: "text-[var(--color-text-disabled)]",
} as const;
