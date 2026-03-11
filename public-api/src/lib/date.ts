import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

export const formatDateForSlug = (date: Date | string): string =>
  dayjs.utc(date).format("DD-MM-YYYY");

export const formatEventDateTime = (date: Date | string, startTime: string): string => {
  const dateStr = dayjs.utc(date).format("DD.MM.YYYY.");
  const time = startTime?.trim() || "—";
  return `${dateStr} u ${time}`;
};

export const formatOrderDate = (date: Date | string): string =>
  dayjs.utc(date).format("DD.MM YYYY. - HH:mm");
