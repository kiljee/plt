import type { ReservationFollowUp } from "@/types/reservation";

export const RESERVATION_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
} as const;

export type ReservationDecisionVariant = "extend" | "cancel";

export type ReservationDecisionPhase =
  | "loading"
  | "ready"
  | "success"
  | "invalid"
  | "unavailable";

export interface ReservationDecisionScreen {
  title: string;
  lead: string;
  actionLabel?: string;
}

export const formatSeatLabel = (seats: number): string => {
  const mod10 = seats % 10;
  const mod100 = seats % 100;
  if (mod10 === 1 && mod100 !== 11) return `${seats} mesto`;
  return `${seats} mesta`;
};

export const screenForReservationDecision = (
  variant: ReservationDecisionVariant,
  phase: ReservationDecisionPhase,
  data: ReservationFollowUp | null,
): ReservationDecisionScreen => {
  if (phase === "loading") {
    return { title: "Učitavanje", lead: "Proveravamo rezervaciju." };
  }
  if (phase === "unavailable") {
    return {
      title: "Stranica trenutno nije dostupna",
      lead: "Pokušajte ponovo za koji trenutak.",
    };
  }
  if (phase === "invalid" || !data) {
    return {
      title: "Link nije važeći",
      lead: "Proverite da li ste otvorili ceo link iz mejla.",
    };
  }
  if (phase === "success" && variant === "extend") {
    return {
      title: "Rok je produžen",
      lead: "Sačekaćemo još 24 sata. Ako uplata stigne, rezervaciju ćemo potvrditi. Novi mejl za ovo pitanje neće stići.",
    };
  }
  if (phase === "success") {
    return {
      title: "Rezervacija je otkazana",
      lead: "Mesto je slobodno. Ako se predomislite, možete ponovo rezervisati na sajtu.",
    };
  }
  if (data.status === RESERVATION_STATUS.CONFIRMED) {
    return {
      title: "Rezervacija je već potvrđena",
      lead: "Nije potrebno da produžavate rok niti da odustajete ovde.",
    };
  }
  if (data.status === RESERVATION_STATUS.CANCELLED) {
    return {
      title: "Rezervacija je već otkazana",
      lead: "Mesto je oslobođeno. Ako želite da učestvujete, napravite novu rezervaciju na sajtu.",
    };
  }
  if (!data.followUpSent) {
    return {
      title: "Link još nije aktivan",
      lead: "Ovaj link počinje da važi kada vam pošaljemo mejl, 48 sati nakon rezervacije, ako ona još uvek nije potvrđena.",
    };
  }
  if (variant === "extend" && data.extended) {
    return {
      title: "Rok je već produžen",
      lead: "Dodatnih 24 sati je već uključeno. Novi mejl za ovo pitanje ne stiže.",
    };
  }
  if (variant === "extend" && data.eventPassed) {
    return {
      title: "Termin radionice je prošao",
      lead: "Rok se više ne može produžiti.",
    };
  }
  if (variant === "extend" && data.canExtend) {
    return {
      title: "Rezervacija još nije potvrđena",
      lead: "Prošlo je 48 sati od rezervacije. Ako vam treba još vremena, možemo sačekati još 24 sata. Posle toga vas nećemo ponovo pitati.",
      actionLabel: "Produži za 24h",
    };
  }
  if (variant === "cancel" && data.canCancel) {
    return {
      title: "Odustajete od rezervacije?",
      lead: "Ako odustanete, rezervacija se otkazuje i mesto se oslobađa.",
      actionLabel: "Odustajem",
    };
  }
  return {
    title: "Rezervacija se ne može menjati",
    lead: "Ovaj link više nije aktivan.",
  };
};
