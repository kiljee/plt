export const RESERVATION_REPORT_STYLES = {
  page: "min-h-screen bg-zinc-50/80",
  container: "mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8",
  layout: "grid gap-8 lg:grid-cols-[1fr_240px]",
  main: "min-w-0 space-y-6",
  headerRow: "flex flex-wrap items-start justify-between gap-4",
  title: "text-2xl font-semibold tracking-tight",
  subtitle: "mt-1 text-sm text-muted-foreground",
  fetchingBadge:
    "inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground",
  fetchingDot: "h-2 w-2 animate-pulse rounded-full bg-primary",
  toolbar:
    "flex flex-col gap-3 rounded-xl border bg-background p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between",
  toolbarGroup: "flex items-center gap-2",
  monthLabel:
    "text-xs font-medium uppercase tracking-wide text-muted-foreground",
  monthSelect:
    "h-9 min-w-[180px] flex-1 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring sm:flex-none",
  navButton: "shrink-0",
  currentMonthButton: "shrink-0 whitespace-nowrap",
  content: "space-y-6 transition-opacity duration-200",
  contentFetching: "pointer-events-none opacity-60",
  kpiGrid: "grid grid-cols-2 gap-3 xl:grid-cols-4",
  kpiCard: "rounded-xl border bg-background p-4 shadow-sm",
  kpiHeader: "flex items-center justify-between gap-2",
  kpiLabel: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
  kpiIcon: "h-4 w-4 text-muted-foreground",
  kpiValue: "mt-2 text-2xl font-semibold tabular-nums tracking-tight",
  kpiHint: "mt-1 text-xs text-muted-foreground",
  progress: "mt-3 h-2 w-full overflow-hidden rounded-full accent-primary",
  chartWrap: "h-[320px] w-full min-w-0",
  tableWrap: "overflow-x-auto rounded-md border",
  emptyState: "py-12 text-center text-sm text-muted-foreground",
  loadingState: "py-16 text-center text-sm text-muted-foreground",
  errorState:
    "flex flex-col items-center gap-3 py-12 text-center text-sm text-muted-foreground",
  skeletonGrid: "grid grid-cols-2 gap-3 xl:grid-cols-4",
  skeletonCard: "h-[118px] animate-pulse rounded-xl border bg-muted/40",
  skeletonBlock: "h-[380px] animate-pulse rounded-xl border bg-muted/40",
  asideCard: "sticky top-24",
  asideTitle:
    "text-sm font-medium uppercase tracking-wide text-muted-foreground",
} as const;
