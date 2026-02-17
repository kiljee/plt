"use client";

import { ORDER_BUTTON_STYLES } from "./OrderButton.styles";

interface OrderButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  soldOut?: boolean;
  label?: string;
}

export const OrderButton = ({
  onClick,
  disabled = false,
  loading = false,
  soldOut = false,
  label,
}: OrderButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled || loading}
    className={`${ORDER_BUTTON_STYLES.button} ${ORDER_BUTTON_STYLES.responsive}`}
    style={{ fontFamily: "var(--font-geist-sans), 'Inter', sans-serif" }}
  >
    {loading ? "OBRADA…" : soldOut ? "Sold out" : label ?? "ORDER NOW"}
  </button>
);