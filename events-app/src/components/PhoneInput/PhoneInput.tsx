"use client";

import { useCallback } from "react";
import PhoneInputComponent from "react-phone-number-input";
import type { UseFormRegisterReturn } from "react-hook-form";
import { CHECKOUT_FORM_STYLES } from "@/components/CheckoutForm/CheckoutForm.styles";
import "react-phone-number-input/style.css";

interface PhoneInputProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  value?: string;
  error?: { message?: string };
}

export const PhoneInput = ({
  id,
  label,
  register,
  value = "",
  error,
}: PhoneInputProps) => {
  const handleChange = useCallback(
    (value: string | undefined) => {
      const event = {
        target: {
          name: register.name,
          value: value || "",
        },
      };
      register.onChange(event);
    },
    [register]
  );

  return (
    <div className={CHECKOUT_FORM_STYLES.inputGroup}>
      <label className={CHECKOUT_FORM_STYLES.label} htmlFor={id}>
        {label}
      </label>
      <PhoneInputComponent
        id={id}
        name={register.name}
        defaultCountry="RS"
        placeholder="6X XXX XXXX"
        value={value}
        onChange={handleChange}
        autoComplete="tel"
        className={`${CHECKOUT_FORM_STYLES.input} ${CHECKOUT_FORM_STYLES.inputFocusWithin} ${error ? CHECKOUT_FORM_STYLES.inputError : ""} ${error ? CHECKOUT_FORM_STYLES.inputErrorFocusWithin : ""}`}
      />
      {error?.message && (
        <span className={CHECKOUT_FORM_STYLES.errorMessage}>
          {String(error.message)}
        </span>
      )}
    </div>
  );
};
