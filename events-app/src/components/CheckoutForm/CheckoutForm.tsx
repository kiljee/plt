"use client";

import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "@/components/FormInput/FormInput";
import { PhoneInput } from "@/components/PhoneInput/PhoneInput";
import { isValidPhoneNumber } from "@/lib/phone";
import { EventLocation, LOCATION_LABELS } from "@/types/event";
import { CHECKOUT_FORM_STYLES } from "./CheckoutForm.styles";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  agreeTerms: boolean;
}

const checkoutSchema = yup.object({
  firstName: yup.string().optional().default(""),
  lastName: yup.string().optional().default(""),
  email: yup
    .string()
    .required("Unesite email adresu")
    .email("Unesite ispravnu email adresu (npr. primer@email.com)"),
  phone: yup
    .string()
    .required("Unesite broj telefona za kontakt")
    .test("valid-phone", "Unesite ispravan broj telefona", isValidPhoneNumber),
  address: yup.string().optional().default(""),
  postalCode: yup.string().optional().default(""),
  city: yup.string().optional().default(""),
  country: yup.string().optional().default(""),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "Morate prihvatiti uslove korišćenja da biste nastavili"),
});

interface CheckoutFormProps {
  id?: string;
  onSubmit: (data: CheckoutFormData) => void | Promise<void>;
  loading?: boolean;
}

const defaultValues: CheckoutFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  postalCode: "",
  city: "",
  country: "Serbia",
  agreeTerms: false,
};

export const CheckoutForm = ({
  id,
  onSubmit,
  loading = false,
}: CheckoutFormProps) => {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    setError,
  } = useForm<CheckoutFormData>({
    defaultValues,
    resolver: yupResolver(checkoutSchema) as Resolver<CheckoutFormData>,
  });

  const handleFormSubmit = async (data: CheckoutFormData) => {
    try {
      await onSubmit(data);
    } catch (err) {
      setError("root", {
        type: "manual",
        message: err instanceof Error ? err.message : "Greška pri slanju. Pokušajte ponovo.",
      });
    }
  };

  return (
    <form
      id={id}
      onSubmit={rhfHandleSubmit(handleFormSubmit)}
      className={CHECKOUT_FORM_STYLES.root}
    >
      <div className={CHECKOUT_FORM_STYLES.section}>
        <h3 className={CHECKOUT_FORM_STYLES.sectionTitle}>Kontakt podaci</h3>
        <div className={`${CHECKOUT_FORM_STYLES.row} flex-wrap`}>
          <FormInput
            id="firstName"
            label="Ime"
            placeholder="Ana"
            register={register("firstName")}
            className="flex-1 min-w-[200px]"
          />
          <FormInput
            id="lastName"
            label="Prezime"
            placeholder="Jovanović"
            register={register("lastName")}
            error={errors.lastName}
            className="flex-1 min-w-[200px]"
          />
        </div>
        <FormInput
          id="country"
          label="Država/Region"
          placeholder="Srbija"
          register={register("country")}
          optional
        />
        <FormInput
          id="address"
          label="Adresa"
          placeholder="Ulica i broj"
          register={register("address")}
          optional
        />
        <div className={CHECKOUT_FORM_STYLES.row}>
          <FormInput
            id="postalCode"
            label="Poštanski broj"
            placeholder="21000"
            register={register("postalCode")}
            optional
            className="flex-1"
          />
          <FormInput
            id="city"
            label="Grad"
            placeholder={LOCATION_LABELS[EventLocation.NOVI_SAD]}
            register={register("city")}
            optional
            className="flex-1"
          />
        </div>
        <PhoneInput
          id="phone"
          label="Broj telefona *"
          register={register("phone")}
          error={errors.phone}
        />
        <FormInput
          id="email"
          label="E-mail *"
          type="email"
          placeholder="ana.jovanovic@email.com"
          register={register("email")}
          error={errors.email}
        />
      </div>

      <div className={CHECKOUT_FORM_STYLES.section}>
        <h3 className={CHECKOUT_FORM_STYLES.sectionTitle}>Način plaćanja</h3>
        <div className="flex flex-col">
          <div className={CHECKOUT_FORM_STYLES.paymentOption}>
            <div className="flex flex-row items-center gap-2.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${CHECKOUT_FORM_STYLES.paymentRadioBorder}`}>
                <div className={`w-2 h-2 rounded-full ${CHECKOUT_FORM_STYLES.paymentRadioDot}`} />
              </div>
              <span className={`font-[var(--font-geist-sans)] text-xs leading-[11px] ${CHECKOUT_FORM_STYLES.paymentTextPrimary}`}>
                Plaćanje na žiro račun
              </span>
            </div>
            <span className={`font-[var(--font-geist-sans)] text-xs leading-3 ${CHECKOUT_FORM_STYLES.paymentTextMuted}`}>
              Paket će biti poslat nakon uplate na žiro račun.
            </span>
          </div>
          <div className={CHECKOUT_FORM_STYLES.paymentOptionInactive}>
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center gap-2.5">
                <div className={`w-5 h-5 rounded-full border ${CHECKOUT_FORM_STYLES.paymentInactiveBorder}`} />
                <span className={`font-[var(--font-geist-sans)] text-xs leading-[11px] ${CHECKOUT_FORM_STYLES.paymentInactiveText}`}>
                  Kreditna ili debitna kartica
                </span>
              </div>
              <span className={`font-[var(--font-geist-sans)] text-xs leading-3 ${CHECKOUT_FORM_STYLES.paymentTextMuted}`}>
                Uskoro!
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={CHECKOUT_FORM_STYLES.checkboxRow}>
        <input
          {...register("agreeTerms")}
          type="checkbox"
          id="agree-terms"
          className={`${CHECKOUT_FORM_STYLES.checkbox} ${errors.agreeTerms ? CHECKOUT_FORM_STYLES.checkboxError : ""}`}
        />
        <label htmlFor="agree-terms" className={CHECKOUT_FORM_STYLES.checkboxLabel}>
          Potvrđujem da sam pročitao/la i prihvatam Uslove korišćenja i Politiku
          privatnosti.
        </label>
        {errors.agreeTerms && (
          <span className={CHECKOUT_FORM_STYLES.errorMessage}>
            {errors.agreeTerms.message}
          </span>
        )}
      </div>

      {errors.root && (
        <p className={CHECKOUT_FORM_STYLES.errorMessage}>{errors.root.message}</p>
      )}
    </form>
  );
};
