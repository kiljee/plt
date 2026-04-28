"use client";

import { useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/sr";
import type { EventItem } from "@/types/event";
import { CalendarAgendaItem } from "./CalendarAgendaItem";
import { MOBILE_MONTH_AGENDA } from "./MobileMonthAgenda.styles";

dayjs.extend(utc)

interface MobileMonthAgendaProps {
  eventsByDay: Map<string, EventItem[]>;
}

export const MobileMonthAgenda = ({
  eventsByDay,
}: MobileMonthAgendaProps) => {
  const grouped = useMemo(() => {
    return [...eventsByDay.entries()]
      .filter(([, list]) => list.length > 0)
      .sort(([da], [db]) => da.localeCompare(db))
  }, [eventsByDay])

  if (grouped.length === 0) return null

  return (
    <div className={MOBILE_MONTH_AGENDA.root}>
      {grouped.map(([dateKey, list]) => {
        const formatted = dayjs.utc(dateKey).locale("sr").format("dddd, D. MMMM")
        const heading = formatted.charAt(0).toUpperCase() + formatted.slice(1)
        return (
          <section
            key={dateKey}
            className={MOBILE_MONTH_AGENDA.daySection}
            aria-label={heading}
          >
            <h3 className={MOBILE_MONTH_AGENDA.dayHeading}>{heading}</h3>
            <ul className={MOBILE_MONTH_AGENDA.eventStack}>
              {list.map((ev) => (
                <li key={ev.id}>
                  <CalendarAgendaItem event={ev} />
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
