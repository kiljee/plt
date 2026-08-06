export const formatReservationCode = (reservationId: string): string =>
  reservationId.replace(/-/g, "").slice(0, 8).toUpperCase();

export type ReservationShareItem = {
  id: string;
  name?: string | null;
  email?: string;
  phone?: string | null;
  seats?: number;
  status?: string;
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Nepotvrđena",
  CONFIRMED: "Potvrđena",
  CANCELLED: "Otkazana",
};

export const buildReservationsListShareText = (params: {
  eventTitle?: string | null;
  eventDate?: string | null;
  reservations: ReservationShareItem[];
}): string => {
  const header = [params.eventTitle, params.eventDate].filter(Boolean).join(" — ");
  const lines: string[] = [];

  if (header) lines.push(header, "");

  if (params.reservations.length === 0) {
    lines.push("Nema rezervacija.");
    return lines.join("\n");
  }

  params.reservations.forEach((r, index) => {
    const seats = r.seats ?? 1;
    const status = r.status ? STATUS_LABELS[r.status] ?? r.status : null;
    lines.push(
      `${index + 1}. ${r.name ?? "—"}`,
      `   Šifra: ${formatReservationCode(r.id)}`,
      `   Mesta: ${seats}${status ? ` · ${status}` : ""}`,
    );
    if (r.email) lines.push(`   Email: ${r.email}`);
    if (r.phone) lines.push(`   Telefon: ${r.phone}`);
    if (index < params.reservations.length - 1) lines.push("");
  });

  return lines.join("\n");
};
