"use client";

import type { CartItem as CartItemType } from "@/types/cart";
import { CartItem } from "@/components/CartItem/CartItem";
import { CartSummary } from "@/components/CartSummary/CartSummary";
import { CART_RECEIPT_STYLES } from "./CartReceipt.styles";

const ZIGZAG_TOP_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cpath d='M0 0 L10 12 L20 0 Z' fill='%23FFFFFF'/%3E%3C/svg%3E";
const ZIGZAG_BOTTOM_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cpath d='M0 12 L10 0 L20 12 Z' fill='%23FFFFFF'/%3E%3C/svg%3E";

interface CartReceiptProps {
  items: CartItemType[];
  subtotal: number;
  total: number;
  totalItems: number;
  currency: string;
  formId?: string;
  loading?: boolean;
  onRemove: (eventId: string) => void;
}

export const CartReceipt = ({
  items,
  subtotal,
  total,
  totalItems,
  currency,
  formId,
  loading = false,
  onRemove,
}: CartReceiptProps) => (
  <div className={CART_RECEIPT_STYLES.wrapper}>
    <div
      className={CART_RECEIPT_STYLES.zigzagTop}
      style={{
        backgroundImage: `url("${ZIGZAG_TOP_SVG}")`,
        backgroundSize: "20px 12px",
      }}
    />
    <div className={CART_RECEIPT_STYLES.content}>
      <h2 className={CART_RECEIPT_STYLES.title}>Detalji događaja</h2>
      <div className={CART_RECEIPT_STYLES.itemsList}>
        {items.map((item, index) => (
          <div key={item.eventId}>
            {index > 0 && <div className={CART_RECEIPT_STYLES.divider} />}
            <CartItem
              item={item}
              maxSeats={99}
              onRemove={() => onRemove(item.eventId)}
            />
          </div>
        ))}
      </div>
      <CartSummary
        subtotal={subtotal}
        total={total}
        totalItems={totalItems}
        currency={currency}
        formId={formId}
        loading={loading}
      />
    </div>
    <div
      className={CART_RECEIPT_STYLES.zigzagBottom}
      style={{
        backgroundImage: `url("${ZIGZAG_BOTTOM_SVG}")`,
        backgroundSize: "20px 12px",
      }}
    />
  </div>
);
