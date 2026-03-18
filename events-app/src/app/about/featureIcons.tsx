import {
  Puzzle,
  Palette,
  Layers,
  Lightbulb,
  PartyPopper,
} from "lucide-react"

const ICON_CLASS = "text-[var(--color-primary)]"

export const FEATURE_ICONS = [
  <Puzzle key="puzzle" size={48} strokeWidth={1.5} className={ICON_CLASS} aria-hidden />,
  <Palette key="palette" size={48} strokeWidth={1.5} className={ICON_CLASS} aria-hidden />,
  <Layers key="layers" size={48} strokeWidth={1.5} className={ICON_CLASS} aria-hidden />,
  <Lightbulb key="lightbulb" size={48} strokeWidth={1.5} className={ICON_CLASS} aria-hidden />,
  <PartyPopper key="party" size={48} strokeWidth={1.5} className={ICON_CLASS} aria-hidden />,
] as const
