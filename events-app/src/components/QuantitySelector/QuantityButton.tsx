import { QUANTITY_SELECTOR_STYLES } from "@/components/QuantitySelector/QuantitySelector.styles";

type QuantityButtonVariant = "decrement" | "increment";

interface QuantityButtonProps {
  variant: QuantityButtonVariant;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const QuantityButton = ({
  variant,
  disabled,
  onClick,
  children,
}: QuantityButtonProps) => {
  const variantClass =
    variant === "decrement"
      ? QUANTITY_SELECTOR_STYLES.button.decrement
      : QUANTITY_SELECTOR_STYLES.button.increment;

  const ariaLabel = variant === "decrement" ? "Smanji količinu" : "Povećaj količinu";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${QUANTITY_SELECTOR_STYLES.button.base} ${variantClass} ${QUANTITY_SELECTOR_STYLES.button.size}`}
    >
      {children}
    </button>
  );
};
