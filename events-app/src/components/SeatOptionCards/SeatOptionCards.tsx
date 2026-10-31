"use client";

import type { WorkshopOption } from "@/types/event";
import { SEAT_OPTION_CARDS_STYLES } from "@/components/SeatOptionCards/SeatOptionCards.styles";

interface SeatOptionCardsProps {
  groupKey: string;
  options: WorkshopOption[];
  selectedIds: string[];
  currency: string;
  compact?: boolean;
  collapsible?: boolean;
  openIndex?: number | null;
  onToggle?: (index: number) => void;
  onSelect: (index: number, optionId: string) => void;
}

export const SeatOptionCards = ({
  groupKey,
  options,
  selectedIds,
  currency,
  compact = false,
  collapsible = false,
  openIndex = null,
  onToggle,
  onSelect,
}: SeatOptionCardsProps) => {
  if (options.length === 0 || selectedIds.length === 0) return null;

  const gridClass = compact
    ? SEAT_OPTION_CARDS_STYLES.gridCompact
    : SEAT_OPTION_CARDS_STYLES.grid;
  const cardClass = compact
    ? SEAT_OPTION_CARDS_STYLES.cardCompact
    : SEAT_OPTION_CARDS_STYLES.card;
  const personClass = compact
    ? SEAT_OPTION_CARDS_STYLES.personCompact
    : SEAT_OPTION_CARDS_STYLES.person;
  const optionClass = compact
    ? SEAT_OPTION_CARDS_STYLES.optionCompact
    : SEAT_OPTION_CARDS_STYLES.option;
  const optionSelectedClass = compact
    ? SEAT_OPTION_CARDS_STYLES.optionSelectedCompact
    : SEAT_OPTION_CARDS_STYLES.optionSelected;
  const priceClass = compact
    ? SEAT_OPTION_CARDS_STYLES.priceCompact
    : SEAT_OPTION_CARDS_STYLES.price;
  const priceSelectedClass = compact
    ? SEAT_OPTION_CARDS_STYLES.priceSelectedCompact
    : SEAT_OPTION_CARDS_STYLES.priceSelected;
  const currencyClass = compact
    ? SEAT_OPTION_CARDS_STYLES.currencyCompact
    : SEAT_OPTION_CARDS_STYLES.currency;
  const labelClass = compact
    ? SEAT_OPTION_CARDS_STYLES.labelCompact
    : SEAT_OPTION_CARDS_STYLES.label;
  const labelSelectedClass = compact
    ? SEAT_OPTION_CARDS_STYLES.labelSelectedCompact
    : SEAT_OPTION_CARDS_STYLES.labelSelected;

  return (
    <div className={gridClass}>
      {selectedIds.map((selectedId, index) => (
        <div key={`${groupKey}-${index}`} className={cardClass}>
          {collapsible ? (
            <button
              type="button"
              className={SEAT_OPTION_CARDS_STYLES.toggle}
              aria-expanded={openIndex === index}
              onClick={() => onToggle?.(index)}
            >
              <span className={personClass}>Gost {index + 1}</span>
              <span className={SEAT_OPTION_CARDS_STYLES.toggleSummary}>
                {options.find((option) => option.id === selectedId)?.label}
              </span>
              <svg
                viewBox="0 0 12 12"
                className={
                  openIndex === index
                    ? SEAT_OPTION_CARDS_STYLES.chevronOpen
                    : SEAT_OPTION_CARDS_STYLES.chevron
                }
                aria-hidden
              >
                <path
                  d="M4.5 2.5 L8 6 L4.5 9.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            </button>
          ) : (
            <p className={personClass}>Gost {index + 1}</p>
          )}
          {(!collapsible || openIndex === index) && (
          <div className={SEAT_OPTION_CARDS_STYLES.options}>
            {options.map((option) => {
              const isSelected = option.id === selectedId;
              const amount =
                option.price <= 0 ? "Besplatno" : option.price.toLocaleString("sr-RS");
              return (
                <label
                  key={option.id}
                  className={isSelected ? optionSelectedClass : optionClass}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name={`${groupKey}-seat-${index}`}
                    checked={isSelected}
                    onChange={() => onSelect(index, option.id)}
                  />
                  <span
                    className={isSelected ? priceSelectedClass : priceClass}
                  >
                    {amount}
                    {option.price > 0 && (
                      <span className={currencyClass}>
                        {" "}
                        {currency}
                      </span>
                    )}
                  </span>
                  <span
                    className={isSelected ? labelSelectedClass : labelClass}
                  >
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
          )}
        </div>
      ))}
    </div>
  );
};
