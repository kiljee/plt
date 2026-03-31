import { EventLocation } from "./types";

const BG = {
  [EventLocation.BELGRADE]: "#3D6B7E",
  [EventLocation.NOVI_SAD]: "#3D6F62",
} as const;

interface ReservationLocationCircleProps {
  location: string;
}

export const ReservationLocationCircle = ({
  location,
}: ReservationLocationCircleProps) => {
  const isNs = location === EventLocation.NOVI_SAD;
  const label = isNs ? "NS" : "B";
  const bg = isNs ? BG[EventLocation.NOVI_SAD] : BG[EventLocation.BELGRADE];
  const placeTitle = isNs ? "Novi Sad" : "Beograd";

  return (
    <span
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold leading-none text-white shadow-sm ring-1 ring-black/5"
      style={{ backgroundColor: bg }}
      title={placeTitle}
      aria-label={`Lokacija: ${placeTitle}`}
    >
      {label}
    </span>
  );
};
