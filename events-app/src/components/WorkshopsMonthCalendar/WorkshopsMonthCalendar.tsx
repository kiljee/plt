"use client"

import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import "dayjs/locale/sr"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { COLORS } from "@/lib/colors"
import { useCalendarMonth, buildCalendarHref } from "@/hooks/useCalendarMonth"
import { LocationSwitch } from "@/components/LocationSwitch/LocationSwitch"
import { CalendarEventPill } from "./CalendarEventPill"
import { WORKSHOPS_MONTH_CALENDAR } from "./WorkshopsMonthCalendar.styles"

dayjs.extend(utc)
dayjs.locale("sr")

const INTRO_TEXT =
  "Sve radionice uključuju stručno vođstvo, neophodan materijal i neograničena pića. Grupe su male, kako bismo svakom učesniku posvetili individualnu pažnju. Na slikarskim radionicama učesnici biraju sopstvenu temu, uz podršku tokom celog procesa stvaranja."

const WEEKDAYS = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"] as const

const CHIP_BG: readonly string[] = [
  COLORS.calendar.chipBlue,
  COLORS.calendar.chipGreen,
  COLORS.calendar.chipPeach,
  COLORS.calendar.chipLavender,
  COLORS.calendar.chipPink,
]

const chipColorForId = (id: string): string => {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i)) % CHIP_BG.length
  return CHIP_BG[h] ?? COLORS.calendar.chipBlue
}

const utcMonthFirst = (year: number, month: number): dayjs.Dayjs =>
  dayjs.utc(`${year}-${String(month).padStart(2, "0")}-01`)

const buildMonthWeeks = (year: number, month: number) => {
  const monthStart = utcMonthFirst(year, month)
  const monthEnd = monthStart.endOf("month")
  const startOffset = (monthStart.day() + 6) % 7
  const gridStart = monthStart.subtract(startOffset, "day")
  const endOffset = (monthEnd.day() + 6) % 7
  const trailing = (6 - endOffset) % 7
  const gridEnd = monthEnd.add(trailing, "day")

  const days: dayjs.Dayjs[] = []
  let cur = gridStart
  while (cur.isBefore(gridEnd) || cur.isSame(gridEnd, "day")) {
    days.push(cur)
    cur = cur.add(1, "day")
  }
  const weeks: dayjs.Dayjs[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  return { weeks }
}

export const WorkshopsMonthCalendar = () => {
  const router = useRouter()
  const { year, month, location, eventsByDay, loading, error } = useCalendarMonth()

  const { weeks } = useMemo(() => buildMonthWeeks(year, month), [year, month])

  const monthTitle = useMemo(() => {
    const raw = utcMonthFirst(year, month).locale("sr").format("MMMM YYYY")
    return raw.charAt(0).toUpperCase() + raw.slice(1)
  }, [year, month])

  const goPrevMonth = useCallback(() => {
    const d = utcMonthFirst(year, month).subtract(1, "month")
    router.push(buildCalendarHref(d.year(), d.month() + 1, location))
  }, [year, month, location, router])

  const goNextMonth = useCallback(() => {
    const d = utcMonthFirst(year, month).add(1, "month")
    router.push(buildCalendarHref(d.year(), d.month() + 1, location))
  }, [year, month, location, router])

  const hrefForLocation = useCallback(
    (value: typeof location) => buildCalendarHref(year, month, value),
    [year, month],
  )

  return (
    <div className={WORKSHOPS_MONTH_CALENDAR.pageRoot}>
      <div className={WORKSHOPS_MONTH_CALENDAR.main}>
        <header className={WORKSHOPS_MONTH_CALENDAR.header}>
          <h1 className={WORKSHOPS_MONTH_CALENDAR.title}>Kalendar radionica</h1>
          <p className={WORKSHOPS_MONTH_CALENDAR.intro}>{INTRO_TEXT}</p>
        </header>

        <div className={WORKSHOPS_MONTH_CALENDAR.locationBar}>
          <LocationSwitch current={location} buildHref={hrefForLocation} />
        </div>

        {error && <p className={WORKSHOPS_MONTH_CALENDAR.error}>{error}</p>}

        <div className={WORKSHOPS_MONTH_CALENDAR.calendarWrap}>
          <div className={WORKSHOPS_MONTH_CALENDAR.calendarOuter}>
            <div className={WORKSHOPS_MONTH_CALENDAR.navRow}>
              <button
                type="button"
                className={WORKSHOPS_MONTH_CALENDAR.navButton}
                aria-label="Prethodni mesec"
                onClick={goPrevMonth}
              >
                <ChevronLeft className={WORKSHOPS_MONTH_CALENDAR.navButtonIcon} strokeWidth={2} />
              </button>
              <h2 className={WORKSHOPS_MONTH_CALENDAR.monthTitle}>{monthTitle}</h2>
              <button
                type="button"
                className={WORKSHOPS_MONTH_CALENDAR.navButton}
                aria-label="Sledeći mesec"
                onClick={goNextMonth}
              >
                <ChevronRight className={WORKSHOPS_MONTH_CALENDAR.navButtonIcon} strokeWidth={2} />
              </button>
            </div>

            <div className={WORKSHOPS_MONTH_CALENDAR.weekdaysRow} role="row">
              {WEEKDAYS.map((label) => (
                <div key={label} className={WORKSHOPS_MONTH_CALENDAR.weekdayCell} role="columnheader">
                  <span className={WORKSHOPS_MONTH_CALENDAR.weekdayLabel}>{label}</span>
                </div>
              ))}
            </div>

            {weeks.map((week, wi) => (
              <div
                key={week[0]?.format("YYYY-MM-DD") ?? wi}
                className={`${WORKSHOPS_MONTH_CALENDAR.grid} ${wi === weeks.length - 1 ? "rounded-b-md" : ""}`}
              >
                {week.map((day) => {
                  const inMonth = day.year() === year && day.month() + 1 === month
                  const key = day.format("YYYY-MM-DD")
                  const dayEvents = eventsByDay.get(key) ?? []
                  return (
                    <div
                      key={key}
                      className={`${WORKSHOPS_MONTH_CALENDAR.dayCell} ${WORKSHOPS_MONTH_CALENDAR.dayCellMuted}`}
                    >
                      <span
                        className={`${WORKSHOPS_MONTH_CALENDAR.dayNumber} ${
                          inMonth ? "" : WORKSHOPS_MONTH_CALENDAR.dayNumberOutside
                        }`}
                      >
                        {day.date()}
                      </span>
                      <div className={WORKSHOPS_MONTH_CALENDAR.eventsCol}>
                        {dayEvents.map((ev) => (
                          <CalendarEventPill
                            key={ev.id}
                            event={ev}
                            backgroundColor={chipColorForId(ev.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {!loading && !error && eventsByDay.size === 0 && (
          <p className={WORKSHOPS_MONTH_CALENDAR.emptyHint}>Nema radionica u ovom mesecu.</p>
        )}
        {loading && <p className={WORKSHOPS_MONTH_CALENDAR.emptyHint}>Učitavanje…</p>}
      </div>
    </div>
  )
}
