"use client"

import { motion } from "motion/react"
import { ABOUT_FEATURE_CARD } from "./AboutFeatureCard.styles"

interface AboutFeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  index?: number
}

const FLOAT_VARIANTS = {
  initial: { y: 0 },
  animate: (i: number) => ({
    y: [0, -6, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: i * 0.4,
    },
  }),
}

const ICON_HOVER = {
  scale: 1.15,
  rotate: [0, -8, 8, -4, 0],
  transition: { duration: 0.5, ease: "easeInOut" as const },
}

export const AboutFeatureCard = ({
  title,
  description,
  icon,
  index = 0,
}: AboutFeatureCardProps) => (
  <motion.article
    className={ABOUT_FEATURE_CARD.root}
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{
      duration: 0.5,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1],
    }}
    whileHover={{ y: -6, transition: { duration: 0.25 } }}
  >
    <motion.div
      className={ABOUT_FEATURE_CARD.iconWrapper}
      custom={index}
      variants={FLOAT_VARIANTS}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      whileHover={ICON_HOVER}
    >
      {icon}
    </motion.div>
    <motion.h3
      className={ABOUT_FEATURE_CARD.title}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
    >
      {title}
    </motion.h3>
    <motion.p
      className={ABOUT_FEATURE_CARD.desc}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
    >
      {description}
    </motion.p>
  </motion.article>
)
