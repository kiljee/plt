"use client";

import { motion, AnimatePresence } from "motion/react";
import { ORDER_BUTTON_STYLES } from "./OrderButton.styles";

interface OrderButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  soldOut?: boolean;
  label?: string;
  success?: boolean;
  capped?: boolean;
}

const SHAKE_KEYFRAMES = [0, -8, 8, -8, 8, 0];

export const OrderButton = ({
  onClick,
  disabled = false,
  loading = false,
  soldOut = false,
  label,
  success = false,
  capped = false,
}: OrderButtonProps) => (
  <motion.button
    type="button"
    onClick={onClick}
    disabled={disabled || loading}
    className={`${ORDER_BUTTON_STYLES.button} ${ORDER_BUTTON_STYLES.responsive} relative overflow-hidden`}
    style={{ fontFamily: "var(--font-geist-sans), 'Inter', sans-serif" }}
    whileHover={!(disabled || loading) ? { scale: 1.02 } : undefined}
    whileTap={!(disabled || loading) ? { scale: 0.98 } : undefined}
    animate={capped ? { x: SHAKE_KEYFRAMES } : { x: 0 }}
    transition={capped ? { duration: 0.5, x: { times: [0, 0.2, 0.4, 0.6, 0.8, 1] } } : {}}
  >
    <AnimatePresence mode="wait">
      {success ? (
        <motion.span
          key="success"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center gap-2"
        >
          <span aria-hidden>✓</span>
          Dodato!
        </motion.span>
      ) : (
        <motion.span
          key="label"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {loading ? "OBRADA…" : soldOut ? "Rasprodato" : label ?? "DODAJ"}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
);