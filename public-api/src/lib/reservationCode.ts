export const formatReservationCode = (reservationId: string): string =>
  reservationId.replace(/-/g, "").slice(0, 8).toUpperCase();

export type ReservationShareItem = {
  id: string;
  name?: string | null;
  email?: string;
  phone?: string | null;
  seats?: number;
  status?: string;
  amountPaid?: number | null;
  price?: number | null;
  currency?: string | null;
  expectedAmount?: number | null;
  optionSummary?: string | null;
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Nepotvrđena",
  CONFIRMED: "Potvrđena",
  CANCELLED: "Otkazana",
};

const DEFAULT_CURRENCY = "RSD";

type PaymentState = "paid" | "partial" | "unpaid" | "free" | "unknown";

type PaymentInfo = {
  state: PaymentState;
  paidAmount: number;
  expectedAmount: number | null;
  currency: string;
  line: string;
};

const formatShareMoney = (amount: number, currency: string): string =>
  `${amount.toLocaleString("sr-RS")} ${currency}`;

const pluralize = (count: number, forms: [string, string, string]): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return forms[1];
  }
  return forms[2];
};

const getPaymentInfo = (reservation: ReservationShareItem): PaymentInfo => {
  const seats = reservation.seats ?? 1;
  const paidAmount = reservation.amountPaid ?? 0;
  const currency = reservation.currency ?? DEFAULT_CURRENCY;

  const storedExpected =
    typeof reservation.expectedAmount === "number"
      ? reservation.expectedAmount
      : null;

  if (reservation.price == null && storedExpected == null) {
    if (paidAmount > 0) {
      return {
        state: "paid",
        paidAmount,
        expectedAmount: null,
        currency,
        line: `Plaćanje: Uplaćeno ${formatShareMoney(paidAmount, currency)}`,
      };
    }
    return {
      state: "unknown",
      paidAmount,
      expectedAmount: null,
      currency,
      line: "Plaćanje: Nema evidentirane uplate",
    };
  }

  const expectedAmount = storedExpected ?? (reservation.price ?? 0) * seats;

  if (expectedAmount === 0) {
    return {
      state: "free",
      paidAmount,
      expectedAmount,
      currency,
      line: "Plaćanje: Besplatno",
    };
  }

  if (paidAmount >= expectedAmount) {
    return {
      state: "paid",
      paidAmount,
      expectedAmount,
      currency,
      line: `Plaćanje: Plaćeno (${formatShareMoney(paidAmount, currency)})`,
    };
  }

  if (paidAmount > 0) {
    return {
      state: "partial",
      paidAmount,
      expectedAmount,
      currency,
      line: `Plaćanje: Delimično — uplaćeno ${formatShareMoney(paidAmount, currency)} od ${formatShareMoney(expectedAmount, currency)} (fali ${formatShareMoney(expectedAmount - paidAmount, currency)})`,
    };
  }

  return {
    state: "unpaid",
    paidAmount,
    expectedAmount,
    currency,
    line: `Plaćanje: Nije plaćeno (za uplatu ${formatShareMoney(expectedAmount, currency)})`,
  };
};

export const buildReservationsListShareText = (params: {
  eventTitle?: string | null;
  eventDate?: string | null;
  reservations: ReservationShareItem[];
  includePayments?: boolean;
}): string => {
  const includePayments = params.includePayments ?? false;
  const header = [params.eventTitle, params.eventDate]
    .filter(Boolean)
    .join(" — ");
  const lines: string[] = [];

  if (header) lines.push(header);

  if (params.reservations.length === 0) {
    if (header) lines.push("");
    lines.push("Nema rezervacija.");
    return lines.join("\n");
  }

  if (!includePayments) {
    if (header) lines.push("");
    params.reservations.forEach((reservation, index) => {
      const seats = reservation.seats ?? 1;
      const status = reservation.status
        ? (STATUS_LABELS[reservation.status] ?? reservation.status)
        : null;
      lines.push(
        `${index + 1}. ${reservation.name ?? "—"}`,
        `   Mesta: ${seats}${status ? ` · ${status}` : ""}`,
      );
      if (reservation.optionSummary) {
        lines.push(`   Opcije: ${reservation.optionSummary}`);
      }
      if (reservation.phone) lines.push(`   Telefon: ${reservation.phone}`);
      if (index < params.reservations.length - 1) lines.push("");
    });
    return lines.join("\n");
  }

  const paymentInfos = params.reservations.map(getPaymentInfo);
  const totalSeats = params.reservations.reduce(
    (sum, reservation) => sum + (reservation.seats ?? 1),
    0,
  );
  const paidCount = paymentInfos.filter((info) => info.state === "paid").length;
  const partialCount = paymentInfos.filter(
    (info) => info.state === "partial",
  ).length;
  const unpaidCount = paymentInfos.filter(
    (info) => info.state === "unpaid" || info.state === "unknown",
  ).length;
  const knownExpected = paymentInfos.filter(
    (info) => info.expectedAmount !== null,
  );
  const expectedTotal = knownExpected.reduce(
    (sum, info) => sum + (info.expectedAmount ?? 0),
    0,
  );
  const paidTotal = paymentInfos.reduce(
    (sum, info) => sum + info.paidAmount,
    0,
  );
  const summaryCurrency = paymentInfos[0]?.currency ?? DEFAULT_CURRENCY;

  lines.push(
    "",
    `Ukupno: ${params.reservations.length} ${pluralize(params.reservations.length, ["rezervacija", "rezervacije", "rezervacija"])} · ${totalSeats} ${pluralize(totalSeats, ["mesto", "mesta", "mesta"])}`,
    `Plaćeno: ${paidCount} · Delimično: ${partialCount} · Nije plaćeno: ${unpaidCount}`,
  );
  if (knownExpected.length > 0) {
    lines.push(
      `Uplaćeno: ${formatShareMoney(paidTotal, summaryCurrency)} od ${formatShareMoney(expectedTotal, summaryCurrency)}`,
    );
  }
  lines.push("");

  params.reservations.forEach((reservation, index) => {
    const seats = reservation.seats ?? 1;
    const status = reservation.status
      ? (STATUS_LABELS[reservation.status] ?? reservation.status)
      : null;
    const payment = paymentInfos[index];
    const payer = reservation.name ?? reservation.email;

    lines.push(
      `${index + 1}. ${reservation.name ?? "—"}`,
      `   Šifra: ${formatReservationCode(reservation.id)}`,
      `   Mesta: ${seats}${status ? ` · ${status}` : ""}`,
    );
    if (reservation.optionSummary) {
      lines.push(`   Opcije: ${reservation.optionSummary}`);
    }
    if (reservation.email) lines.push(`   Email: ${reservation.email}`);
    if (reservation.phone) lines.push(`   Telefon: ${reservation.phone}`);
    if (payment) {
      lines.push(`   ${payment.line}`);
      if ((payment.state === "paid" || payment.state === "partial") && payer) {
        lines.push(`   Uplata od: ${payer}`);
      }
    }
    if (index < params.reservations.length - 1) lines.push("");
  });

  return lines.join("\n");
};
