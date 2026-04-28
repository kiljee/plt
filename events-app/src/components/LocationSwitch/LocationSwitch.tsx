import Link from "next/link";
import { EventLocation, LOCATION_LABELS } from "@/types/event";
import { LOCATION_SWITCH } from "./LocationSwitch.styles";

type LocationFilter = EventLocation | undefined;

const ALL_OPTION = { value: undefined as LocationFilter, label: "Sve" };
const LOCATIONS: { value: LocationFilter; label: string }[] = [
  ALL_OPTION,
  { value: EventLocation.BELGRADE, label: LOCATION_LABELS[EventLocation.BELGRADE] },
  { value: EventLocation.NOVI_SAD, label: LOCATION_LABELS[EventLocation.NOVI_SAD] },
];

interface LocationSwitchProps {
  current: LocationFilter;
  buildHref?: (value: LocationFilter) => string;
}

const defaultHrefForLocation = (value: LocationFilter): string => {
  if (value === undefined) return "/";
  return `/?location=${encodeURIComponent(value)}`;
};

export const LocationSwitch = ({ current, buildHref = defaultHrefForLocation }: LocationSwitchProps) => {
  return (
    <div className={LOCATION_SWITCH.root} role="tablist" aria-label="Lokacija">
      {LOCATIONS.map(({ value, label }) => (
        <Link
          key={label}
          href={buildHref(value)}
          scroll={false}
          role="tab"
          aria-selected={current === value}
          className={`${LOCATION_SWITCH.link} ${LOCATION_SWITCH.tabPress} ${
            current === value ? LOCATION_SWITCH.linkActive : LOCATION_SWITCH.linkInactive
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
