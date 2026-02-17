"use client";

import { QuantityButton } from "@/components/QuantitySelector/QuantityButton";
import { QUANTITY_SELECTOR_STYLES } from "@/components/QuantitySelector/QuantitySelector.styles";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  label?: string;
  showLabel?: boolean;
}

const SELECTOR_CLASS_NAME = [
  QUANTITY_SELECTOR_STYLES.selector.wrapper,
  QUANTITY_SELECTOR_STYLES.selector.responsive,
  QUANTITY_SELECTOR_STYLES.selector.gap,
].join(" ");

export const QuantitySelector = ({
  value,
  min = 1,
  max = 99,
  onChange,
  label = "Količina",
  showLabel = true,
}: QuantitySelectorProps) => {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className={QUANTITY_SELECTOR_STYLES.container}>
      {showLabel && (
        <div className="flex flex-col gap-2">
          <span className={QUANTITY_SELECTOR_STYLES.label}>
            {label} ({value} u korpi)
          </span>
        </div>
      )}
      
      <div className={SELECTOR_CLASS_NAME}>
        <QuantityButton
          variant="decrement"
          onClick={handleDecrement}
          disabled={value <= min}
        >
          −
        </QuantityButton>
        
        <span className={QUANTITY_SELECTOR_STYLES.value}>
          {value}
        </span>
        
        <QuantityButton
          variant="increment"
          onClick={handleIncrement}
          disabled={value >= max}
        >
          +
        </QuantityButton>
      </div>
    </div>
  );
};