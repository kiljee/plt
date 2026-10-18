import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ReservationReportWorkshopRow } from "../reservations/reportQueries";

const MAX_WORKSHOPS = 8;
const MAX_TITLE_LENGTH = 22;
const CHART_1 = "hsl(var(--chart-1))";
const CHART_2 = "hsl(var(--chart-2))";

interface ReservationReportChartProps {
  rows: ReservationReportWorkshopRow[];
}

const truncateTitle = (title: string): string =>
  title.length > MAX_TITLE_LENGTH
    ? `${title.slice(0, MAX_TITLE_LENGTH - 1)}…`
    : title;

export const ReservationReportChart = ({
  rows,
}: ReservationReportChartProps) => {
  const data = [...rows]
    .sort((a, b) => b.reservationCount - a.reservationCount)
    .slice(0, MAX_WORKSHOPS)
    .map((row) => ({ ...row, shortTitle: truncateTitle(row.title) }));

  if (data.length === 0) {
    return (
      <p className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Nema podataka za grafikon u izabranom mesecu.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
        <YAxis
          type="category"
          dataKey="shortTitle"
          width={150}
          tick={{ fontSize: 11 }}
        />
        <Tooltip
          formatter={(value, name) => [value, name]}
          labelFormatter={(_, payload) => payload?.[0]?.payload?.title ?? ""}
        />
        <Legend />
        <Bar
          name="Rezervacije"
          dataKey="reservationCount"
          fill={CHART_1}
          radius={[0, 4, 4, 0]}
        />
        <Bar
          name="Karte"
          dataKey="seatsSum"
          fill={CHART_2}
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
