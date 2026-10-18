export const RESERVATION_REPORT_STYLES = {
  page: "min-h-screen bg-background",
  container: "mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8",
  topBar:
    "flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b pb-3",
  titleBlock: "flex min-w-0 items-baseline gap-2.5",
  title: "text-xl font-semibold tracking-tight",
  subtitle: "w-[190px] shrink-0 truncate text-sm text-muted-foreground",
  controlsRow:
    "flex min-h-[61px] flex-wrap items-center justify-center gap-x-3 gap-y-2 border-b px-1 py-3",
  controlsDivider: "hidden h-6 w-px bg-border sm:block",
  fetchingSlot: "flex w-[122px] shrink-0 items-center justify-start",
  fetchingBadge:
    "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs text-muted-foreground",
  fetchingBadgeHidden:
    "invisible inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs text-muted-foreground",
  fetchingSpinner: "h-3.5 w-3.5 shrink-0 animate-spin text-primary",
  loadingBarTrack: "h-0.5 w-full bg-transparent",
  loadingBarFill: "h-full w-full animate-pulse bg-primary/70",
  toolbar: "flex items-center justify-center gap-1.5",
  monthSelect:
    "h-9 w-[190px] shrink-0 rounded-md border border-input bg-background px-3 text-center text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-ring",
  navButton:
    "h-9 w-9 shrink-0 border border-input bg-background text-foreground shadow-sm hover:bg-muted",
  currentMonthButton: "ml-1 h-9 shrink-0 whitespace-nowrap shadow-sm",
  locationFilter:
    "inline-flex items-center gap-0.5 rounded-lg border bg-muted/40 p-1 shadow-sm",
  locationButton:
    "inline-flex h-7 items-center gap-1.5 rounded-md px-3 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground",
  locationButtonActive:
    "inline-flex h-7 items-center gap-1.5 rounded-md bg-primary px-3 text-[13px] font-medium text-primary-foreground shadow-sm",
  locationCount:
    "min-w-[30px] rounded-full bg-foreground/10 px-1.5 text-center text-[11px] tabular-nums",
  content: "min-h-[560px] space-y-4 pt-4 transition-opacity duration-200",
  contentFetching: "pointer-events-none opacity-60",
  kpiStrip:
    "grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border lg:grid-cols-4",
  kpiCell: "bg-background px-4 py-3",
  kpiLabel:
    "text-[11px] font-medium uppercase tracking-wide text-muted-foreground",
  kpiValue: "mt-0.5 text-xl font-semibold tabular-nums tracking-tight",
  kpiHint: "mt-0.5 truncate text-xs text-muted-foreground",
  progress: "mt-2 h-1 w-full overflow-hidden rounded-full accent-primary",
  dataGrid: "grid items-start gap-4 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
  panel:
    "min-h-[325px] min-w-0 rounded-lg border bg-background xl:min-h-[365px]",
  chartPanel:
    "min-h-[325px] min-w-0 rounded-lg border bg-background xl:sticky xl:top-20 xl:min-h-[365px]",
  panelHeader:
    "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 border-b px-4 py-2.5",
  panelTitle: "text-sm font-medium",
  panelDescription: "text-xs text-muted-foreground",
  panelBody: "p-3",
  chartWrap: "h-[260px] w-full min-w-0 xl:h-[300px]",
  tableWrap: "overflow-x-auto",
  loadingState: "py-16 text-center text-sm text-muted-foreground",
  errorState:
    "flex flex-col items-center gap-3 rounded-lg border py-12 text-center text-sm text-muted-foreground",
  skeletonStrip: "h-[100px] animate-pulse rounded-lg border bg-muted/40",
  skeletonPanel:
    "h-[325px] animate-pulse rounded-lg border bg-muted/40 xl:h-[365px]",
} as const;
