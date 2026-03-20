"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { ABOUT_CTA_BANNER } from "./AboutCtaBanner.styles"

interface AboutCtaBannerProps {
  title: string
  body: string
  backgroundSrc: string
  backgroundAlt: string
  ctaLabel: string
  ctaHref: string
  headingId?: string
}

export const AboutCtaBanner = ({
  title,
  body,
  backgroundSrc,
  backgroundAlt,
  ctaLabel,
  ctaHref,
  headingId = "cta-banner-heading",
}: AboutCtaBannerProps) => (
  <div className={ABOUT_CTA_BANNER.root}>
    <Image
      src={backgroundSrc}
      alt={backgroundAlt}
      fill
      className={ABOUT_CTA_BANNER.backgroundImage}
      loading="lazy"
      sizes="100vw"
    />
    <div className={ABOUT_CTA_BANNER.overlay} />

    <motion.div
      className={ABOUT_CTA_BANNER.content}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-6">
        <h2 id={headingId} className={ABOUT_CTA_BANNER.title}>
          {title}
        </h2>
        <p className={ABOUT_CTA_BANNER.body}>{body}</p>
      </div>
      <Link href={ctaHref} className={ABOUT_CTA_BANNER.link}>
        {ctaLabel}
      </Link>
    </motion.div>
  </div>
)
