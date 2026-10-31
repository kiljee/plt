"use client";

import type { WorkshopOption } from "@/types/event";
import { formatPrice } from "@/lib/price";
import { SEAT_OPTION_CARDS_STYLES } from "@/components/SeatOptionCards/SeatOptionCards.styles";

interface SeatOptionCardsProps {
  groupKey: string;
  options: WorkshopOption[];
  selectedIds: string[];
  currency: string;
  onSelect: (index: number, optionId: string) => void;
}

export const SeatOptionCards = ({
  groupKey,
  options,
  selectedIds,
  currency,
  onSelect,
}: SeatOptionCardsProps) => {
  if (options.length === 0 || selectedIds.length === 0) return null;

  return (
    <div className={SEAT_OPTION_CARDS_STYLES.grid}>
      {selectedIds.map((selectedId, index) => (
        <div key={`${groupKey}-${index}`} className={SEAT_OPTION_CARDS_STYLES.card}>
          <p className={SEAT_OPTION_CARDS_STYLES.person}>Gost {index + 1}</p>
          <div className={SEAT_OPTION_CARDS_STYLES.options}>
            {options.map((option) => {
              const isSelected = option.id === selectedId;
              return (
                <label
                  key={option.id}
                  className={
                    isSelected
                      ? SEAT_OPTION_CARDS_STYLES.optionSelected
                      : SEAT_OPTION_CARDS_STYLES.option
                  }
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name={`${groupKey}-seat-${index}`}
                    checked={isSelected}
                    onChange={() => onSelect(index, option.id)}
                  />
                  <span
                    className={
                      isSelected
                        ? SEAT_OPTION_CARDS_STYLES.priceSelected
                        : SEAT_OPTION_CARDS_STYLES.price
                    }
                  >
                    {formatPrice(option.price, currency)}
                  </span>
                  <span
                    className={
                      isSelected
                        ? SEAT_OPTION_CARDS_STYLES.labelSelected
                        : SEAT_OPTION_CARDS_STYLES.label
                    }
                  >
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
