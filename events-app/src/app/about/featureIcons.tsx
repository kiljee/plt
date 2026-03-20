import Image from "next/image"

const ICON_SIZE = 48

export const FEATURE_ICONS = [
  <Image key="puzzle" src="/Puzzle_Game.svg" alt="" aria-hidden width={ICON_SIZE} height={ICON_SIZE} unoptimized />,
  <Image key="painting" src="/painting-accessory_16995115 1.svg" alt="" aria-hidden width={ICON_SIZE} height={ICON_SIZE} unoptimized />,
  <Image key="paper" src="/paper-stack_16995118 1.png" alt="" aria-hidden width={ICON_SIZE} height={ICON_SIZE} />,
  <Image key="art" src="/art-design_16995186 1.svg" alt="" aria-hidden width={ICON_SIZE} height={ICON_SIZE} unoptimized />,
  <Image key="decoration" src="/decoration_16995049 1.svg" alt="" aria-hidden width={ICON_SIZE} height={ICON_SIZE} unoptimized />,
] as const
