"use client";

import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { formatPrice } from "@/lib/price";
import { CART_SUMMARY_STYLES } from "./CartSummary.styles";

interface CartSummaryProps {
  subtotal: number;
  total: number;
  totalItems: number;
  currency: string;
  formId?: string;
  onSubmit?: () => void;
  loading?: boolean;
}

const QuestionIcon = () => (
  <svg
    className={CART_SUMMARY_STYLES.questionIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

export const CartSummary = ({
  subtotal,
  total,
  totalItems,
  currency,
  formId,
  onSubmit,
  loading = false,
}: CartSummaryProps) => {
  const { watch, formState: { errors } } = useFormContext();
  const agreeTerms = watch("agreeTerms");
  const hasAgreeTermsError = !!errors.agreeTerms;
  const hasRootError = !!errors.root;
  console.log(hasRootError, agreeTerms, loading);
  const getButtonClassName = () => {
    if (hasRootError || agreeTerms ) return CART_SUMMARY_STYLES.submitButtonError;
    return CART_SUMMARY_STYLES.submitButtonActive ;
  };

  return (
  <div className={CART_SUMMARY_STYLES.root}>
    <div className={CART_SUMMARY_STYLES.divider} />
    <div className={CART_SUMMARY_STYLES.row}>
      <span className={CART_SUMMARY_STYLES.label}>
        Međuzbir · {totalItems} {totalItems === 1 ? "stavka" : "stavki"}
      </span>
      <span className={CART_SUMMARY_STYLES.value}>
        {formatPrice(subtotal, currency)}
      </span>
    </div>
    <div className={CART_SUMMARY_STYLES.row}>
      <span className="flex items-center gap-1">
        <span className={CART_SUMMARY_STYLES.label}>Dostava</span>
        <QuestionIcon />
      </span>
      <span className={CART_SUMMARY_STYLES.value}>Uključeno</span>
    </div>
    <div className={CART_SUMMARY_STYLES.totalRow}>
      <span className={CART_SUMMARY_STYLES.totalLabel}>Ukupno</span>
      <span className={CART_SUMMARY_STYLES.totalValue}>
        {formatPrice(total, currency)}
      </span>
    </div>

    <div className={CART_SUMMARY_STYLES.termsRow}>
      <Checkbox
        id="agree-terms"
        name="agreeTerms"
        hasError={hasAgreeTermsError}
        label="Potvrđujem da sam pročitao/la i prihvatam Uslove korišćenja i Politiku privatnosti."
      />
      {errors.agreeTerms && (
        <span className={CART_SUMMARY_STYLES.errorMessage}>
          {String(errors.agreeTerms.message ?? "")}
        </span>
      )}
    </div>

    <button
      type={formId ? "submit" : "button"}
      form={formId}
      onClick={!formId ? onSubmit : undefined}
      disabled={loading}
      className={getButtonClassName()}
    >
      {loading ? "OBRADA…" : "POTVRDI PORUDŽBINU"}
    </button>
    {errors.root && (
      <p className={CART_SUMMARY_STYLES.rootErrorMessage}>
        {errors.root.message}
      </p>
    )}
    <div className={CART_SUMMARY_STYLES.footer}>
      <span className={CART_SUMMARY_STYLES.footerText}>
        Preduzetnik nije u PDV sistemu.
      </span>
    </div>
  </div>
  );
};
