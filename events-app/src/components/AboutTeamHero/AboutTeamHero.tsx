"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ABOUT_TEAM_HERO } from "./AboutTeamHero.styles"

interface AboutTeamHeroProps {
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
      <span className={ABOUT_TEAM_HERO.accent}>{accentWord}</span>
      {parts[1]}
    </>
  )
}

export const AboutTeamHero = ({
  title,
  accentWord,
  body,
  imageSrc,
  imageAlt,
  decorativeSvgSrc,
  headingId = "team-hero-heading",
}: AboutTeamHeroProps) => (
  <motion.article
    className={ABOUT_TEAM_HERO.root}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5 }}
  >
    <motion.figure
      className={ABOUT_TEAM_HERO.imageWrapper}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={467}
        height={480}
        className={ABOUT_TEAM_HERO.image}
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 467px"
      />
    </motion.figure>

    <motion.div
      className={ABOUT_TEAM_HERO.content}
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      {decorativeSvgSrc && (
        <Image
          src={decorativeSvgSrc}
          alt=""
          aria-hidden
          width={438}
          height={255}
          className={ABOUT_TEAM_HERO.decorativeSvg}
          unoptimized
        />
      )}
      <h2 id={headingId} className={ABOUT_TEAM_HERO.title}>
        {renderTitle(title, accentWord)}
      </h2>
      <p className={ABOUT_TEAM_HERO.body}>{body}</p>
    </motion.div>
  </motion.article>
)
