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
  error?: { message?: string };
}

export const PhoneInput = ({
  id,
  label,
  register,
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
        placeholder="Unesite broj telefona"
        value={register.value || ""}
        onChange={handleChange}
        autoComplete="tel"
        className={`${CHECKOUT_FORM_STYLES.input} ${error ? CHECKOUT_FORM_STYLES.inputError : ""}`}
      />
      {error?.message && (
        <span className={CHECKOUT_FORM_STYLES.errorMessage}>
          {String(error.message)}
        </span>
      )}
    </div>
  );
};
