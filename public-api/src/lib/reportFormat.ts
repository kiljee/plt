import dayjs from "dayjs";

export const MONTH_NAMES = [
  "Januar",
  "Februar",
  "Mart",
  "April",
  "Maj",
  "Jun",
  "Jul",
  "Avgust",
  "Septembar",
  "Oktobar",
  "Novembar",
  "Decembar",
] as const;

export interface MonthOption {
  value: string;
  label: string;
}

export const formatMonthLabel = (month: string): string => {
  const parsed = dayjs(`${month}-01`);
  if (!parsed.isValid()) return month;
  return `${MONTH_NAMES[parsed.month()] ?? ""} ${parsed.year()}`;
};

export const getMonthOptions = (count: number): MonthOption[] => {
  const current = dayjs().startOf("month");
  return Array.from({ length: count }, (_, index) => {
    const value = current.subtract(index, "month").format("YYYY-MM");
    return { value, label: formatMonthLabel(value) };
  });
};

export const formatMoney = (amount: number, currency: string): string =>
  `${amount.toLocaleString("sr-RS")} ${currency}`;
