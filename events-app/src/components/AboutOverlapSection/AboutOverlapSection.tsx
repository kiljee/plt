"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ABOUT_OVERLAP_SECTION } from "./AboutOverlapSection.styles"

interface AboutOverlapSectionProps {
  title: string
  accentWord?: string
  body: string
  imageSrc: string
  imageAlt: string
  decorativeSvgSrc?: string
  headingId?: string
}

const renderTitle = (title: string, accentWord?: string) => {
  if (!accentWord || !title.includes(accentWord)) return title
  const parts = title.split(accentWord)
  return (
    <>
      {parts[0]}
      <span className={ABOUT_OVERLAP_SECTION.accent}>{accentWord}</span>
      {parts[1]}
    </>
  )
}

export const AboutOverlapSection = ({
  title,
  accentWord,
  body,
  imageSrc,
  imageAlt,
  decorativeSvgSrc,
  headingId = "overlap-section-heading",
}: AboutOverlapSectionProps) => (
  <motion.article
    className={ABOUT_OVERLAP_SECTION.root}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5 }}
  >
    <motion.figure
      className={ABOUT_OVERLAP_SECTION.imageWrapper}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={603}
        height={603}
        className={ABOUT_OVERLAP_SECTION.image}
        loading="lazy"
        sizes="(max-width: 640px) 280px, (max-width: 1024px) 400px, 603px"
      />
    </motion.figure>

    <motion.div
      className={ABOUT_OVERLAP_SECTION.content}
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <h2 id={headingId} className={ABOUT_OVERLAP_SECTION.title}>
        {renderTitle(title, accentWord)}
      </h2>
      <p className={ABOUT_OVERLAP_SECTION.body}>{body}</p>
      {decorativeSvgSrc && (
        <Image
          src={decorativeSvgSrc}
          alt=""
          aria-hidden
          width={519}
          height={336}
          className={ABOUT_OVERLAP_SECTION.decorativeSvg}
          unoptimized
        />
      )}
    </motion.div>
  </motion.article>
)
