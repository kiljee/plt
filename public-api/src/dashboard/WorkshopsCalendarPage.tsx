import type { EventInput } from "@fullcalendar/core";
import srLocale from "@fullcalendar/core/locales/sr.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminEventsForRange } from "wasp/client/operations";
import { Link } from "wasp/client/router";
import { Button } from "../components/ui/button";
import { EventStatus } from "../events/constants";
import type { AdminCalendarEventRow } from "../events/queriesCalendar";
import { useRequireAdmin } from "../hooks/useRequireAdmin";
import { useAddEventModal } from "../shared/context/AddEventModalContext";
import {
  EventLocation,
  type EventLocationType,
} from "../reservations/types";
import "./WorkshopsCalendarPage.css";

dayjs.extend(utc);
dayjs.extend(timezone);

const LOCATION_LABELS: Record<EventLocationType, string> = {
  [EventLocation.BELGRADE]: "Beograd",
  [EventLocation.NOVI_SAD]: "Novi Sad",
};

type LocationFilterValue = "all" | EventLocationType;

const LOCATION_FILTER_OPTIONS: {
  value: LocationFilterValue;
  label: string;
}[] = [
  { value: "all", label: "Sve lokacije" },
  { value: EventLocation.NOVI_SAD, label: LOCATION_LABELS[EventLocation.NOVI_SAD] },
  { value: EventLocation.BELGRADE, label: LOCATION_LABELS[EventLocation.BELGRADE] },
];

const padTime = (t: string | undefined): string => {
  if (!t || typeof t !== "string" || t.trim() === "") return "";
  const parts = t.trim().split(":");
  const h = parts[0] ?? "0";
  const m = (parts[1] ?? "0").slice(0, 2);
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
};

const EVENT_TEXT_COLOR = "#ffffff";

const pickColor = (ev: AdminCalendarEventRow): string => {
  if (ev.status === EventStatus.INACTIVE) return "#64748b";
  if (ev.location === EventLocation.NOVI_SAD) return "#0f766e";
  return "#1565c0";
};

const buildTimeRangeLabel = (
  dayStr: string,
  startHM: string,
  endHM: string,
): string => {
  const startShort = startHM.slice(0, 5);
  if (!endHM) {
    const endDt = dayjs
      .tz(`${dayStr} ${startHM}`, "YYYY-MM-DD HH:mm", "Europe/Belgrade")
      .add(2, "hour");
    return `${startShort}–${endDt.format("HH:mm")}h`;
  }
  return `${startShort}–${endHM.slice(0, 5)}h`;
};

const rowToFcEvent = (ev: AdminCalendarEventRow): EventInput => {
  const dayStr = dayjs.utc(ev.date).format("YYYY-MM-DD");
  const startHM = padTime(ev.startTime);
  const endHM = padTime(ev.endTime);
  const baseColor = pickColor(ev);

  if (!startHM) {
    return {
      id: ev.id,
      title: ev.title,
      start: dayStr,
      allDay: true,
      extendedProps: {
        location: ev.location,
        status: ev.status,
        timeRangeLabel: "Ceo dan",
        eventBg: baseColor,
        eventFg: EVENT_TEXT_COLOR,
      },
      backgroundColor: baseColor,
      borderColor: baseColor,
      textColor: EVENT_TEXT_COLOR,
    };
  }

  const startStr = dayjs
    .tz(`${dayStr} ${startHM}`, "YYYY-MM-DD HH:mm", "Europe/Belgrade")
    .format("YYYY-MM-DDTHH:mm:ss");

  const endStr = endHM
    ? dayjs
        .tz(`${dayStr} ${endHM}`, "YYYY-MM-DD HH:mm", "Europe/Belgrade")
        .format("YYYY-MM-DDTHH:mm:ss")
    : dayjs
        .tz(`${dayStr} ${startHM}`, "YYYY-MM-DD HH:mm", "Europe/Belgrade")
        .add(2, "hour")
        .format("YYYY-MM-DDTHH:mm:ss");

  const timeRangeLabel = buildTimeRangeLabel(dayStr, startHM, endHM);

  return {
    id: ev.id,
    title: ev.title,
    start: startStr,
    end: endStr,
    extendedProps: {
      location: ev.location,
      status: ev.status,
      timeRangeLabel,
      eventBg: baseColor,
      eventFg: EVENT_TEXT_COLOR,
    },
    backgroundColor: baseColor,
    borderColor: baseColor,
    textColor: EVENT_TEXT_COLOR,
  };
};

const renderEventContent = (arg: {
  event: { title: string; extendedProps: Record<string, unknown> };
}) => {
  const timeRangeLabel =
    typeof arg.event.extendedProps.timeRangeLabel === "string"
      ? arg.event.extendedProps.timeRangeLabel
      : "";
  const eventBg =
    typeof arg.event.extendedProps.eventBg === "string"
      ? arg.event.extendedProps.eventBg
      : "#1565c0";
  const eventFg =
    typeof arg.event.extendedProps.eventFg === "string"
      ? arg.event.extendedProps.eventFg
      : EVENT_TEXT_COLOR;
  return (
    <div
      className="fc-event-main-frame flex min-h-full w-full flex-col gap-0.5 overflow-hidden rounded border border-black/15 text-left leading-tight shadow-sm"
      style={{
        backgroundColor: eventBg,
        color: eventFg,
        padding: "3px 5px",
        boxSizing: "border-box",
      }}
    >
      {timeRangeLabel !== "" && (
        <div className="fc-event-time shrink-0 font-semibold opacity-95">
          {timeRangeLabel}
        </div>
      )}
      <div className="fc-event-title min-w-0 break-words font-medium">
        {arg.event.title}
      </div>
    </div>
  );
};

export const WorkshopsCalendarPage = () => {
  const { isLoading: isAuthLoading, isAdmin } = useRequireAdmin();
  const navigate = useNavigate();
  const calendarRef = useRef<InstanceType<typeof FullCalendar>>(null);
  const initialCalendarRef = useRef<{
    view: string;
    date: Date;
  } | null>(null);

  if (initialCalendarRef.current === null) {
    initialCalendarRef.current = { view: "dayGridMonth", date: new Date() };
  }

  const { view: fcInitialView, date: fcInitialDate } =
    initialCalendarRef.current;
  const { onSuccessRef } = useAddEventModal();
  const [locationFilter, setLocationFilter] =
    useState<LocationFilterValue>("all");

  const refetchCalendar = useCallback(() => {
    const api = calendarRef.current?.getApi();
    if (api) void api.refetchEvents();
  }, []);

  useEffect(() => {
    onSuccessRef.current = () => {
      refetchCalendar();
    };
    return () => {
      onSuccessRef.current = null;
    };
  }, [onSuccessRef, refetchCalendar]);

  const loadEvents = useCallback(
    async (info: { startStr: string; endStr: string }) => {
      const result = await getAdminEventsForRange({
        rangeStartIso: info.startStr,
        rangeEndIso: info.endStr,
        locationFilter:
          locationFilter === "all" ? undefined : locationFilter,
      });
      return result.events.map(rowToFcEvent);
    },
    [locationFilter],
  );

  if (isAuthLoading || !isAdmin) return null;

  return (
    <div className="google-calendar-page min-h-screen bg-[#f6f8fc] pb-8 pt-4">
      <div className="mx-auto max-w-[1600px] px-3 sm:px-4 lg:px-6">
        <header className="mb-4 flex flex-col gap-3 border-b border-[#e8eaed] bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-normal text-[#3c4043] sm:text-2xl">
              Kalendar radionica
            </h1>
            <p className="mt-0.5 text-sm text-[#70757a]">
              Kao u Google kalendaru — mesec, nedelja, dan i lista. Klik na
              događaj otvara radionicu.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {LOCATION_FILTER_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                type="button"
                size="sm"
                variant={locationFilter === opt.value ? "default" : "outline"}
                className={
                  locationFilter === opt.value
                    ? "bg-[#1a73e8] hover:bg-[#1557b0]"
                    : "border-[#dadce0] bg-white text-[#3c4043] hover:bg-[#f8f9fa]"
                }
                onClick={() => setLocationFilter(opt.value)}
              >
                {opt.label}
              </Button>
            ))}
            <Button
              asChild
              type="button"
              size="sm"
              variant="outline"
              className="border-[#dadce0] bg-white"
            >
              <Link to="/">← Lista radionica</Link>
            </Button>
          </div>
        </header>

        <div className="overflow-hidden rounded-lg border border-[#e8eaed] bg-white shadow-sm">
          <FullCalendar
            ref={calendarRef}
            key={locationFilter}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            initialView={fcInitialView}
            initialDate={fcInitialDate}
            locale={srLocale}
            timeZone="Europe/Belgrade"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            buttonText={{
              today: "Danas",
              month: "Mesec",
              week: "Nedelja",
              day: "Dan",
              list: "Lista",
            }}
            height="auto"
            contentHeight="calc(100vh - 14rem)"
            slotMinTime="07:00:00"
            slotMaxTime="23:00:00"
            allDaySlot={true}
            nowIndicator
            dayMaxEvents={3}
            moreLinkClick="popover"
            displayEventTime={false}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            events={loadEvents}
            eventContent={renderEventContent}
            eventClick={(info) => {
              info.jsEvent.preventDefault();
              const id = info.event.id;
              if (!id) return;
              navigate(`/radionica/${id}`);
            }}
            eventClassNames={(arg) =>
              arg.event.extendedProps.status === EventStatus.INACTIVE
                ? ["opacity-75"]
                : []
            }
            eventDidMount={(info) => {
              const loc = info.event.extendedProps.location as string;
              const label =
                loc === EventLocation.NOVI_SAD
                  ? LOCATION_LABELS[EventLocation.NOVI_SAD]
                  : LOCATION_LABELS[EventLocation.BELGRADE];
              const tr =
                typeof info.event.extendedProps.timeRangeLabel === "string"
                  ? info.event.extendedProps.timeRangeLabel
                  : "";
              info.el.title = tr
                ? `${tr} · ${info.event.title} — ${label}`
                : `${info.event.title} — ${label}`;
            }}
          />
        </div>
      </div>
    </div>
  );
};
