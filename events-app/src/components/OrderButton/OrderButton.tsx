"use client";

import { ORDER_BUTTON_STYLES } from "./OrderButton.styles";

interface OrderButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const OrderButton = ({
  onClick,
  disabled = false,
  loading = false,
}: OrderButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled || loading}
    className={`${ORDER_BUTTON_STYLES.button} ${ORDER_BUTTON_STYLES.responsive}`}
    style={{ fontFamily: "var(--font-geist-sans), 'Inter', sans-serif" }}
  >
    {loading ? "OBRADA…" : "ORDER NOW"}
  </button>
);