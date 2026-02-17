"use client";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Controller, useFormContext } from "react-hook-form";
import { CheckboxStyles } from "./Checkbox.styles";

const CheckIcon = () => (
  <svg
    className={CheckboxStyles.checkIcon}
    viewBox="0 0 12 10"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 5l3 3 7-7" />
  </svg>
);

interface CheckboxProps {
  id: string;
  name: string;
  label: React.ReactNode;
  hasError?: boolean;
}

export const Checkbox = ({
  id,
  name,
  label,
  hasError = false,
}: CheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={CheckboxStyles.wrapper}>
          <RadixCheckbox.Root
            id={id}
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked === true)}
            onBlur={field.onBlur}
            className={`${CheckboxStyles.root} ${hasError ? CheckboxStyles.rootError : ""}`}
          >
            <RadixCheckbox.Indicator className={CheckboxStyles.indicator}>
              <CheckIcon />
            </RadixCheckbox.Indicator>
          </RadixCheckbox.Root>
          <label htmlFor={id} className={CheckboxStyles.label}>
            {label}
          </label>
        </div>
      )}
    />
  );
};
