"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCartStore } from "@/store/cart";
import type { BulkReservationRequest } from "@/types/reservation";
import { CartReceipt } from "@/components/CartReceipt/CartReceipt";
import { CheckoutFormFields, type CheckoutFormData } from "@/components/CheckoutForm/CheckoutFormFields";
import {
  checkoutSchema,
  checkoutDefaultValues,
} from "@/components/CheckoutForm/checkoutSchema";
import { CART_PAGE_STYLES } from "./CartPageContent.styles";

const FORM_ID = "checkout-form";

export const CartPageContent = () => {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const totalItems = useCartStore((s) => s.totalItems());
  const clearCart = useCartStore((s) => s.clearCart);
  const removeItem = useCartStore((s) => s.removeItem);

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const methods = useForm<CheckoutFormData>({
    defaultValues: checkoutDefaultValues,
    resolver: yupResolver(checkoutSchema) as never,
  });

  useEffect(() => {
    if (items.length === 0 && !orderSuccess) {
      router.replace("/");
    }
  }, [items.length, orderSuccess, router]);

  const currency = items[0]?.event.currency ?? "RSD";
  const subtotal = getTotalPrice();
  const total = subtotal;

  const handleFormSubmit = async (formData: CheckoutFormData) => {
    if (items.length === 0) return;
    methods.clearErrors("root");
    setLoading(true);

    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
      const url = `${base.replace(/\/$/, "")}/api/reservations/bulk`;

      const payload: BulkReservationRequest = {
        items: items.map((i) => ({ eventId: i.eventId, seats: i.seats })),
        email: formData.email.trim(),
        name: [formData.firstName, formData.lastName].filter(Boolean).join(" ") || undefined,
        phone: formData.phone.trim() || undefined,
      };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string })?.error ?? res.statusText);
      }

      clearCart();
      setOrderSuccess(true);
      router.refresh();
    } catch (err) {
      methods.setError("root", {
        type: "manual",
        message: err instanceof Error ? err.message : "Greška pri slanju. Pokušajte ponovo.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderSuccess) {
    return null;
  }

  if (orderSuccess) {
    return (
      <section className={CART_PAGE_STYLES.section}>
        <div className={CART_PAGE_STYLES.successContainer}>
          <h1 className={CART_PAGE_STYLES.successTitle}>
            Porudžbina je primljena
          </h1>
          <p className={CART_PAGE_STYLES.successSubtitle}>
            Na vašu email adresu smo poslali instrukcije za plaćanje.
          </p>
          <p className={CART_PAGE_STYLES.successBody}>
            Ako niste dobili mail, proverite spam folder ili{" "}
            <a
              href="mailto:info@paleto.rs"
              className={CART_PAGE_STYLES.successContact}
            >
              kontaktirajte nas
            </a>
            .
          </p>
          <Link href="/" className={CART_PAGE_STYLES.backButton}>
            Nazad na početnu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        id={FORM_ID}
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className={CART_PAGE_STYLES.form}
      >
        <section className={CART_PAGE_STYLES.section}>
          <div className={CART_PAGE_STYLES.container}>
            <div className={CART_PAGE_STYLES.formColumn}>
              <h1 className={CART_PAGE_STYLES.title}>Podaci za porudžbinu</h1>
              <CheckoutFormFields loading={loading} />
            </div>

            <div className={CART_PAGE_STYLES.summaryColumn}>
              <CartReceipt
                items={items}
                subtotal={subtotal}
                total={total}
                totalItems={totalItems}
                currency={currency}
                formId={FORM_ID}
                loading={loading}
                onRemove={removeItem}
              />
            </div>
          </div>
        </section>
      </form>
    </FormProvider>
  );
};
