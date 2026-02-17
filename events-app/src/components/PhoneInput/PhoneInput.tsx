"use client";

import { useCallback } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { CHECKOUT_FORM_STYLES } from "@/components/CheckoutForm/CheckoutForm.styles";
import { formatSerbianMobile } from "@/lib/phone";

const PLACEHOLDER = "06x xxx xxxx";

interface PhoneInputProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: { message?: string };
}

export const PhoneInput = ({
  id,
  label,
  register,
  error,
}: PhoneInputProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatSerbianMobile(e.target.value);
      e.target.value = formatted;
      register.onChange(e);
    },
    [register]
  );

  return (
    <div className={CHECKOUT_FORM_STYLES.inputGroup}>
      <label className={CHECKOUT_FORM_STYLES.label} htmlFor={id}>
        {label}
      </label>
      <input
        {...register}
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder={PLACEHOLDER}
        className={`${CHECKOUT_FORM_STYLES.input} ${error ? CHECKOUT_FORM_STYLES.inputError : ""}`}
        onChange={handleChange}
      />
      {error?.message && (
        <span className={CHECKOUT_FORM_STYLES.errorMessage}>
          {String(error.message)}
        </span>
      )}
    </div>
  );
};
