import type { Metadata } from "next"
import { AboutSection } from "@/components/AboutSection/AboutSection"
import { AboutHero } from "@/components/AboutHero/AboutHero"
import { AboutFeatureCard } from "@/components/AboutFeatureCard/AboutFeatureCard"
import { AboutTeamHero } from "@/components/AboutTeamHero/AboutTeamHero"
import { AboutTeamInfo } from "@/components/AboutTeamInfo/AboutTeamInfo"
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
    title: "Radionice",
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
  title: "Mesto za radionice i proslave u Novom Sadu i Beogradu",
  body:
    "Paleto je kreativni atelje i prostor za radionice, proslave i posebne događaje, u kome se ljudi okupljaju da stvaraju, eksperimentišu i provedu vreme na drugačiji način. Kod nas možete doći na radionicu slikanja, napraviti svoju šolju od keramike, organizovati rođendan, devojačko veče ili team building, a sve uz opuštenu atmosferu, kreativni proces i druženje.",
  imageSrc: "/druga.png",
  imageAlt: "Paleto atelje",
  decorativeSvgSrc: "/treca.svg",
} as const

const TEAM_INFO = {
  title: "Tim koji pokreće magiju",
  body:
    "Tim strastvenih umetnika, iskusnih instruktora i kreativnih ljudi, posvećenih tome da svaka radionica bude zabavno i inspirativno iskustvo. Verujemo da kreativnost pripada svima, zato smo stvorili prijatan prostor u kome možete da istražujete, učite i slobodno se izražavate. Bilo da prvi put uzimate četkicu u ruke ili usavršavate svoju tehniku, tu smo da vas podržimo i vodimo na svakom koraku!",
  imageSrc: "/cetvrta.png",
  imageAlt: "Paleto radionica",
} as const

const TEAM_MEMBERS = [
  {
    name: "Lia Mojsilovic",
    role: "Instruktor",
    imageSrc: "/lia.png",
    imageAlt: "Lia Mojsilovic",
  },
  {
    name: "Danijela Vignjevic",
    role: "Osnivač Paleta",
    imageSrc: "/daca.png",
    imageAlt: "Danijela Vignjevic",
  },
  {
    name: "Tanja Tomic",
    role: "Akademski slikar",
    imageSrc: "/jana.png",
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
          imageSrc="/prva.png"
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
        backgroundColor={COLORS.background.aboutHero}
        ariaLabelledBy="team-hero-heading"
      >
        <AboutTeamHero
          title={TEAM_HERO.title}
          body={TEAM_HERO.body}
          imageSrc={TEAM_HERO.imageSrc}
          imageAlt={TEAM_HERO.imageAlt}
          decorativeSvgSrc={TEAM_HERO.decorativeSvgSrc}
          headingId="team-hero-heading"
        />
      </AboutSection>

      <AboutSection
        backgroundColor={COLORS.background.aboutTeam}
        ariaLabelledBy="team-info-heading"
      >
        <AboutTeamInfo
          title={TEAM_INFO.title}
          body={TEAM_INFO.body}
          imageSrc={TEAM_INFO.imageSrc}
          imageAlt={TEAM_INFO.imageAlt}
          headingId="team-info-heading"
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
