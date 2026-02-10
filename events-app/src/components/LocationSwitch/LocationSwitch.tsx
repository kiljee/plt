import Link from "next/link";
import type { EventLocation } from "@/types/event";
import { LOCATION_SWITCH } from "./LocationSwitch.styles";

const LOCATIONS: { value: EventLocation; label: string }[] = [
  { value: "BELGRADE", label: "Beograd" },
  { value: "NOVI_SAD", label: "Novi Sad" },
];

interface LocationSwitchProps {
  current: EventLocation;
}

export const LocationSwitch = ({ current }: LocationSwitchProps) => {
  return (
    <div className={LOCATION_SWITCH.root} role="tablist" aria-label="Lokacija">
      {LOCATIONS.map(({ value, label }) => (
        <Link
          key={value}
          href={value === "BELGRADE" ? "/" : `/?location=${value}`}
          scroll={false}
          role="tab"
          aria-selected={current === value}
          className={`${LOCATION_SWITCH.link} ${
            current === value ? LOCATION_SWITCH.linkActive : LOCATION_SWITCH.linkInactive
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
