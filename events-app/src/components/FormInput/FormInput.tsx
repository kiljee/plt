"use client";

import type { UseFormRegisterReturn } from "react-hook-form";
import { CHECKOUT_FORM_STYLES } from "@/components/CheckoutForm/CheckoutForm.styles";

interface FormInputProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  register: UseFormRegisterReturn;
  error?: { message?: string };
  optional?: boolean;
  className?: string;
}

export const FormInput = ({
  id,
  label,
  placeholder,
  type = "text",
  register,
  error,
  optional = false,
  className = "",
}: FormInputProps) => (
  <div className={`${CHECKOUT_FORM_STYLES.inputGroup} ${className}`}>
    <label className={CHECKOUT_FORM_STYLES.label} htmlFor={id}>
      {label}
      {optional && " (opciono)"}
    </label>
    <input
      {...register}
      id={id}
      type={type}
      className={`${CHECKOUT_FORM_STYLES.input} ${error ? CHECKOUT_FORM_STYLES.inputError : ""}`}
      placeholder={placeholder}
    />
    {error?.message && (
      <span className={CHECKOUT_FORM_STYLES.errorMessage}>
        {String(error.message)}
      </span>
    )}
  </div>
);
