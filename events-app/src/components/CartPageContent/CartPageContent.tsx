"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCartStore } from "@/store/cart";
import type {
  BulkReservationErrorResponse,
  BulkReservationRequest,
} from "@/types/reservation";
import {
  CartNotice,
  type CartNoticeProps,
} from "@/components/CartNotice/CartNotice";
import { CartReceipt } from "@/components/CartReceipt/CartReceipt";
import { CheckoutFormFields, type CheckoutFormData } from "@/components/CheckoutForm/CheckoutFormFields";
import {
  checkoutSchema,
  checkoutDefaultValues,
} from "@/components/CheckoutForm/checkoutSchema";
import { CART_PAGE_STYLES } from "./CartPageContent.styles";

const FORM_ID = "checkout-form";
const EVENT_NOT_ACTIVE_CODE = "EVENT_NOT_ACTIVE";
const EVENT_SOLD_OUT_CODE = "EVENT_SOLD_OUT";
const EVENT_NOT_ENOUGH_SEATS_CODE = "EVENT_NOT_ENOUGH_SEATS";

export const CartPageContent = () => {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const totalItems = useCartStore((s) => s.totalItems());
  const clearCart = useCartStore((s) => s.clearCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateSeats = useCartStore((s) => s.updateSeats);

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [cartNotice, setCartNotice] = useState<CartNoticeProps | null>(null);

  const methods = useForm<CheckoutFormData>({
    defaultValues: checkoutDefaultValues,
    resolver: yupResolver(checkoutSchema) as never,
  });

  useEffect(() => {
    if (items.length === 0 && !orderSuccess && !cartNotice) {
      router.replace("/");
    }
  }, [items.length, orderSuccess, cartNotice, router]);

  const currency = items[0]?.event.currency ?? "RSD";
  const subtotal = getTotalPrice();
  const total = subtotal;

  const handleFormSubmit = async (formData: CheckoutFormData) => {
    if (items.length === 0) return;
    methods.clearErrors("root");
    setCartNotice(null);
    setLoading(true);

    try {
      const payload: BulkReservationRequest = {
        items: items.map((i) => ({ eventId: i.eventId, seats: i.seats })),
        email: formData.email.trim(),
        name: [formData.firstName, formData.lastName].filter(Boolean).join(" ") || undefined,
        phone: formData.phone.trim() || undefined,
      };
      const res = await fetch("/api/reservations/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res
          .json()
          .catch(() => ({}))) as BulkReservationErrorResponse;
        const message = data?.error ?? res.statusText;
        const noticeItem = data?.eventId
          ? items.find((i) => i.eventId === data.eventId)
          : undefined;
        const noticeTitle = noticeItem?.event.title;
        const quotedTitle = noticeTitle ? `„${noticeTitle}“` : "Radionica";
        if (
          data?.eventId &&
          (data.code === EVENT_NOT_ACTIVE_CODE ||
            data.code === EVENT_SOLD_OUT_CODE)
        ) {
          removeItem(data.eventId);
          setCartNotice(
            data.code === EVENT_NOT_ACTIVE_CODE
              ? {
                  title:
                    "Radionica nije aktivna — rezervacija nije napravljena",
                  message: `${quotedTitle} je u međuvremenu deaktivirana dok je bila u vašoj korpi, pa je uklonjena iz korpe. Niste rezervisali mesto za ovu radionicu.`,
                }
              : {
                  title:
                    "Radionica je rasprodata — rezervacija nije napravljena",
                  message: `${quotedTitle} je u međuvremenu rasprodata dok je bila u vašoj korpi, pa je uklonjena iz korpe. Niste rezervisali mesto za ovu radionicu.`,
                },
          );
          return;
        }
        if (
          data?.eventId &&
          data.code === EVENT_NOT_ENOUGH_SEATS_CODE &&
          typeof data.availableSeats === "number" &&
          data.availableSeats > 0
        ) {
          updateSeats(data.eventId, data.availableSeats);
          setCartNotice({
            title: "Rezervacija nije napravljena — nema dovoljno mesta",
            message: `Za ${quotedTitle} je ostalo još samo ${data.availableSeats} ${data.availableSeats === 1 ? "mesto" : "mesta"}, pa je količina u korpi smanjena na ${data.availableSeats}. Proverite porudžbinu i potvrdite ponovo.`,
          });
          return;
        }
        throw new Error(message);
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

  if (items.length === 0 && cartNotice) {
    return (
      <section className={CART_PAGE_STYLES.section}>
        <div className={CART_PAGE_STYLES.successContainer}>
          <div className={CART_PAGE_STYLES.noticeWrap}>
            <CartNotice title={cartNotice.title} message={cartNotice.message} />
          </div>
          <Link href="/" className={CART_PAGE_STYLES.backButton}>
            Nazad na početnu
          </Link>
        </div>
      </section>
    );
  }

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
              {cartNotice ? (
                <CartNotice
                  title={cartNotice.title}
                  message={cartNotice.message}
                />
              ) : null}
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
