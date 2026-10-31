"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type {
  ReservationFollowUp,
  ReservationFollowUpError,
} from "@/types/reservation";
import { RESERVATION_DECISION_STYLES as styles } from "./ReservationDecision.styles";
import {
  formatSeatLabel,
  screenForReservationDecision,
  type ReservationDecisionPhase,
  type ReservationDecisionVariant,
} from "./reservationDecisionScreen";

interface ReservationDecisionProps {
  code: string;
  variant: ReservationDecisionVariant;
}

const isFollowUp = (value: unknown): value is ReservationFollowUp => {
  if (typeof value !== "object" || value === null) return false;
  return "eventTitle" in value && "status" in value;
};

export const ReservationDecision = ({
  code,
  variant,
}: ReservationDecisionProps) => {
  const [phase, setPhase] = useState<ReservationDecisionPhase>("loading");
  const [data, setData] = useState<ReservationFollowUp | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(
          `/api/reservations/follow-up?code=${encodeURIComponent(code)}`,
          { signal: controller.signal },
        );
        const body: unknown = await res.json().catch(() => ({}));
        if (!res.ok || !isFollowUp(body)) {
          setData(null);
          setPhase(res.status === 404 || res.status === 400 ? "invalid" : "unavailable");
          return;
        }
        setData(body);
        setPhase("ready");
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setData(null);
        setPhase("unavailable");
      }
    };

    void load();
    return () => controller.abort();
  }, [code]);

  const screen = screenForReservationDecision(variant, phase, data);
  const showDetails = phase === "ready" || phase === "success";

  const handleSubmit = useCallback(async () => {
    if (!screen.actionLabel || submitting) return;
    setSubmitting(true);
    try {
      const path =
        variant === "extend"
          ? "/api/reservations/extend"
          : "/api/reservations/cancel";
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (res.ok) {
        setPhase("success");
        return;
      }
      const body = (await res.json().catch(() => ({}))) as ReservationFollowUpError;
      if (body.reason === "invalid") {
        setData(null);
        setPhase("invalid");
        return;
      }
      const refresh = await fetch(
        `/api/reservations/follow-up?code=${encodeURIComponent(code)}`,
      );
      const refreshed: unknown = await refresh.json().catch(() => ({}));
      if (isFollowUp(refreshed)) {
        setData(refreshed);
        setPhase("ready");
        return;
      }
      setPhase("unavailable");
    } catch (err) {
      console.error(err);
      setPhase("unavailable");
    } finally {
      setSubmitting(false);
    }
  }, [code, screen.actionLabel, submitting, variant]);

  const handleClick = useCallback(() => {
    void handleSubmit();
  }, [handleSubmit]);

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Rezervacija {code.toUpperCase()}</p>
        <h1 className={styles.title}>{screen.title}</h1>
        <p className={styles.lead}>{screen.lead}</p>
        {showDetails && data && (
          <dl className={styles.details}>
            <div>
              <dt className={styles.detailLabel}>Radionica</dt>
              <dd className={styles.detailValue}>{data.eventTitle}</dd>
            </div>
            <div>
              <dt className={styles.detailLabel}>Termin</dt>
              <dd className={styles.detailValue}>{data.eventDateTime}</dd>
            </div>
            <div>
              <dt className={styles.detailLabel}>Grad</dt>
              <dd className={styles.detailValue}>{data.locationLabel}</dd>
            </div>
            <div>
              <dt className={styles.detailLabel}>Broj mesta</dt>
              <dd className={styles.detailValue}>{formatSeatLabel(data.seats)}</dd>
            </div>
          </dl>
        )}
        <div className={styles.actions}>
          {screen.actionLabel && (
            <button
              type="button"
              className={variant === "cancel" ? styles.cancelButton : styles.primaryButton}
              onClick={handleClick}
              disabled={submitting}
            >
              {submitting ? "Obrada…" : screen.actionLabel}
            </button>
          )}
          <Link href="/" className={styles.homeLink}>
            Nazad na sajt
          </Link>
        </div>
      </div>
    </section>
  );
};
