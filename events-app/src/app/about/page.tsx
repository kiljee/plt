import type { Metadata } from "next"
import { AboutSection } from "@/components/AboutSection/AboutSection"
import { AboutHero } from "@/components/AboutHero/AboutHero"
import { AboutFeatureCard } from "@/components/AboutFeatureCard/AboutFeatureCard"
import { AboutTeamHero } from "@/components/AboutTeamHero/AboutTeamHero"
import { TeamMemberCarousel } from "@/components/TeamMemberCarousel/TeamMemberCarousel"
import { COLORS } from "@/lib/colors"
import { FEATURE_ICONS } from "./featureIcons"
import { ABOUT } from "./AboutPage.styles"

const SITE_URL = "https://paleto.rs"

export const metadata: Metadata = {
  title: "O nama | Paleto – Kreativni atelje Beograd i Novi Sad",
  description:
    "Upoznajte Paleto tim. Radionice slikarstva, keramike i tim building u Beogradu i Novom Sadu. Ilustracije na venčanjima, kursevi i privatne proslave.",
  keywords: [
    "Paleto",
    "radionice Beograd",
    "radionice Novi Sad",
    "slikarske radionice",
    "tim building",
    "kreativni atelje",
    "ilustracije venčanja",
  ],
  openGraph: {
    title: "O nama | Paleto – Kreativni atelje Beograd i Novi Sad",
    description:
      "Upoznajte Paleto tim. Radionice slikarstva, keramike i tim building u Beogradu i Novom Sadu.",
    url: `${SITE_URL}/about`,
    siteName: "Paleto",
    locale: "sr_RS",
    type: "website",
  },
}

const FEATURES = [
  {
    title: "Povežite svoj tim kroz umetnost",
    desc: "Timski building radionice koje stvaraju zajedništvo.",
  },
  {
    title: "Istražite različite tehnike",
    desc: "Slikarstvo, crtanje i kreativne tehnike za sve nivoe.",
  },
  {
    title: "Ilustracije gostiju uživo na venčanjima",
    desc: "Jedinstvena usluga ilustrovanja vašeg posebnog dana.",
  },
  {
    title: "Različite tehnike, zajednička inspiracija",
    desc: "Od akvarela do akrila – svako pronalazi svoj izraz.",
  },
  {
    title: "Proslavite svoj poseban dan sa nama",
    desc: "Radionice prilagođene vašim proslavama i događajima.",
  },
] as const

const TEAM_HERO = {
  title: "Tim Koji Pokreće Magiju",
  body:
    "Naš tim je grupa strastvenih umetnika i instruktora posvećenih tome da svako radionice učini zabavnim i inspirišućim iskustvom. Zajedno stvaramo prostor gde kreativnost cveta.",
  imageSrc: "/team-hero.jpg",
  imageAlt: "Paleto tim u ateljeu",
} as const

const TEAM_MEMBERS = [
  {
    name: "Lia Mojsilovic",
    role: "Instruktor",
    imageSrc: "/team-lia.jpg",
    imageAlt: "Lia Mojsilovic",
  },
  {
    name: "Danijela Vignjevic",
    role: "Osnivač Paleta",
    imageSrc: "/team-danijela.jpg",
    imageAlt: "Danijela Vignjevic",
  },
  {
    name: "Tanja Tomic",
    role: "Akademski slikar",
    imageSrc: "/team-tanja.jpg",
    imageAlt: "Tanja Tomic",
  },
] as const

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Paleto",
  description:
    "Kreativni atelje za radionice slikarstva, keramike, tim building i ilustracije u Beogradu i Novom Sadu.",
  url: SITE_URL,
  sameAs: [],
}

const TEAM_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Person",
        name: "Lia Mojsilovic",
        jobTitle: "Instruktor",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Person",
        name: "Danijela Vignjevic",
        jobTitle: "Osnivač Paleta",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Person",
        name: "Tanja Tomic",
        jobTitle: "Akademski slikar",
      },
    },
  ],
}

export default function AboutPage() {
  return (
    <main className="relative w-full min-h-screen flex flex-col" role="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TEAM_JSON_LD) }}
      />

      <AboutSection ariaLabelledBy="hero-heading">
        <AboutHero
          title="Iza Umetnosti: Ko smo mi?"
          accentWord="Umetnosti"
          imageSrc="/about-hero.jpg"
          headingId="hero-heading"
        />
      </AboutSection>

      <AboutSection
        backgroundColor={COLORS.background.aboutFeatures}
        ariaLabelledBy="features-heading"
      >
        <h2 id="features-heading" className="sr-only">
          Naše usluge
        </h2>
        <div className={ABOUT.features}>
          {FEATURES.map(({ title, desc }, i) => (
            <AboutFeatureCard
              key={i}
              title={title}
              description={desc}
              icon={FEATURE_ICONS[i]}
              index={i}
            />
          ))}
        </div>
      </AboutSection>

      <AboutSection
        backgroundColor={COLORS.background.aboutTeam}
        ariaLabelledBy="team-hero-heading"
      >
        <AboutTeamHero
          title={TEAM_HERO.title}
          body={TEAM_HERO.body}
          imageSrc={TEAM_HERO.imageSrc}
          imageAlt={TEAM_HERO.imageAlt}
          headingId="team-hero-heading"
        />
      </AboutSection>

      <AboutSection
        backgroundColor={COLORS.background.white}
        ariaLabelledBy="team-members-heading"
      >
        <TeamMemberCarousel
          title="Članovi Paleto tima"
          accentWord="Paleto"
          subheading="Meet Our Instructors – Discover the talented individuals behind our workshops, each bringing their unique expertise and passion to guide you on your creative journey."
          members={[...TEAM_MEMBERS]}
          headingId="team-members-heading"
        />
      </AboutSection>
    </main>
  )
}
