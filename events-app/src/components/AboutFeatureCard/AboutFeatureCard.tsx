"use client"

import { motion } from "motion/react"
import { Sparkles } from "lucide-react"
import { ABOUT_FEATURE_CARD } from "./AboutFeatureCard.styles"

interface AboutFeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  index?: number
}

const PLACEHOLDER_ICON = (
  <Sparkles size={48} strokeWidth={1.5} className="text-[var(--color-primary)]" aria-hidden />
)

export const AboutFeatureCard = ({
  title,
  description,
  icon,
  index = 0,
}: AboutFeatureCardProps) => (
  <motion.article
    className={ABOUT_FEATURE_CARD.root}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.45, delay: index * 0.06 }}
    whileHover={{ y: -6, transition: { duration: 0.2 } }}
  >
    <div className={ABOUT_FEATURE_CARD.iconWrapper}>{icon ?? PLACEHOLDER_ICON}</div>
    <h3 className={ABOUT_FEATURE_CARD.title}>{title}</h3>
    <p className={ABOUT_FEATURE_CARD.desc}>{description}</p>
  </motion.article>
)
