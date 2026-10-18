export const RESERVATION_REPORT_STYLES = {
  page: "min-h-screen bg-background",
  container: "mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8",
  topBar:
    "flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b pb-3",
  titleBlock: "flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-0.5",
  title: "text-xl font-semibold tracking-tight",
  subtitle: "min-w-0 truncate text-sm text-muted-foreground",
  controlsRow:
    "flex flex-col items-stretch gap-2 border-b py-3 sm:min-h-[61px] sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-3 sm:gap-y-2 sm:px-1",
  controlsDivider: "hidden h-6 w-px bg-border sm:block",
  fetchingSlot:
    "hidden shrink-0 items-center justify-start sm:flex sm:w-[122px]",
  fetchingBadge:
    "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs text-muted-foreground",
  fetchingBadgeHidden:
    "invisible inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs text-muted-foreground",
  fetchingSpinner: "h-3.5 w-3.5 shrink-0 animate-spin text-primary",
  loadingBarTrack: "h-0.5 w-full bg-transparent",
  loadingBarFill: "h-full w-full animate-pulse bg-primary/70",
  toolbar:
    "flex w-full flex-wrap items-center justify-center gap-1.5 sm:w-auto sm:flex-nowrap",
  monthSelect:
    "h-9 min-w-0 flex-1 shrink-0 rounded-md border border-input bg-background px-2 text-center text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-ring sm:w-[190px] sm:flex-none sm:px-3",
  navButton:
    "h-9 w-9 shrink-0 border border-input bg-background text-foreground shadow-sm hover:bg-muted",
  currentMonthButton: "ml-0 h-9 shrink-0 whitespace-nowrap shadow-sm sm:ml-1",
  locationFilter:
    "flex w-full items-center gap-0.5 rounded-lg border bg-muted/40 p-1 shadow-sm sm:inline-flex sm:w-auto",
  locationButton:
    "inline-flex h-7 flex-1 items-center justify-center gap-1 rounded-md px-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground sm:flex-none sm:gap-1.5 sm:px-3 sm:text-[13px]",
  locationButtonActive:
    "inline-flex h-7 flex-1 items-center justify-center gap-1 rounded-md bg-primary px-1.5 text-xs font-medium text-primary-foreground shadow-sm sm:flex-none sm:gap-1.5 sm:px-3 sm:text-[13px]",
  locationCount:
    "min-w-[24px] rounded-full bg-foreground/10 px-1 text-center text-[11px] tabular-nums sm:min-w-[30px] sm:px-1.5",
  content: "space-y-4 pt-4 transition-opacity duration-200 sm:min-h-[560px]",
  contentFetching: "pointer-events-none opacity-60",
  kpiStrip:
    "grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border lg:grid-cols-4",
  kpiCell: "min-w-0 bg-background px-3 py-3 sm:px-4",
  kpiLabel:
    "text-[11px] font-medium uppercase tracking-wide text-muted-foreground",
  kpiValue:
    "mt-0.5 break-words text-lg font-semibold tabular-nums tracking-tight sm:text-xl",
  kpiHint: "mt-0.5 text-xs leading-snug text-muted-foreground",
  progress: "mt-2 h-1 w-full overflow-hidden rounded-full accent-primary",
  dataGrid: "grid items-start gap-4 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
  panel: "min-w-0 rounded-lg border bg-background xl:min-h-[365px]",
  chartPanel:
    "min-w-0 rounded-lg border bg-background xl:sticky xl:top-20 xl:min-h-[365px]",
  panelHeader:
    "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 border-b px-3 py-2.5 sm:px-4",
  panelTitle: "text-sm font-medium",
  panelDescription: "text-xs text-muted-foreground",
  panelBody: "p-3",
  chartWrap: "h-[240px] w-full min-w-0 sm:h-[260px] xl:h-[300px]",
  tableWrap: "",
  loadingState: "py-16 text-center text-sm text-muted-foreground",
  errorState:
    "flex flex-col items-center gap-3 rounded-lg border px-4 py-12 text-center text-sm text-muted-foreground",
  skeletonStrip:
    "h-[132px] animate-pulse rounded-lg border bg-muted/40 sm:h-[100px]",
  skeletonPanel:
    "h-[280px] animate-pulse rounded-lg border bg-muted/40 sm:h-[325px] xl:h-[365px]",
} as const;
