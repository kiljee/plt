import type { Metadata } from "next"
import { AboutSection } from "@/components/AboutSection/AboutSection"
import { AboutHero } from "@/components/AboutHero/AboutHero"
import { AboutFeatureCard } from "@/components/AboutFeatureCard/AboutFeatureCard"
import { AboutTeamHero } from "@/components/AboutTeamHero/AboutTeamHero"
import { AboutTeamInfo } from "@/components/AboutTeamInfo/AboutTeamInfo"
import { TeamMemberCarousel } from "@/components/TeamMemberCarousel/TeamMemberCarousel"
import { AboutOverlapSection } from "@/components/AboutOverlapSection/AboutOverlapSection"
import { AboutCtaBanner } from "@/components/AboutCtaBanner/AboutCtaBanner"
import { COLORS } from "@/lib/colors"
import { FEATURE_ICONS } from "./featureIcons"
import { ABOUT } from "./AboutPage.styles"

const SITE_URL = "https://paleto.rs"
const ABOUT_URL = `${SITE_URL}/about`

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
    "radionice Novi Sad",
    "radionice slikanja",
    "keramičke radionice",
  ],
  alternates: {
    canonical: ABOUT_URL,
  },
  openGraph: {
    title: "O nama | Paleto – Kreativni atelje Beograd i Novi Sad",
    description:
      "Upoznajte Paleto tim. Radionice slikarstva, keramike i tim building u Beogradu i Novom Sadu. Ilustracije na venčanjima, kursevi i privatne proslave.",
    url: ABOUT_URL,
    siteName: "Paleto",
    locale: "sr_RS",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/prva.png`,
        width: 1200,
        height: 630,
        alt: "Paleto kreativni atelje – radionice i događaji",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "O nama | Paleto – Kreativni atelje Beograd i Novi Sad",
    description:
      "Upoznajte Paleto tim. Radionice slikarstva, keramike i tim building u Beogradu i Novom Sadu.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const FEATURES = [
  {
    title: "Team building",
    desc: "Timske radionice koje stvaraju zajedništvo."
  },
  {
    title: "Radionice za sve uzraste",
    desc: "Kreativno iskustvo za apsolutne početnike",
  },
  {
    title: "Ilustracije gostiju uživo na venčanjima",
    desc: "Jedinstvena usluga ilustrovanja vašeg posebnog dana.",
  },
  {
    title: "Kursevi",
    desc: "Programi koji omogućavaju istraživanje, usavršavanje i stvaranje u raznim umetničkim disciplinama.",
  },
  {
    title: "Privatne proslave",
    desc: "Proslavite svoj poseban dan sa nama.",
  },
] as const

const TEAM_HERO = {
  title: "Mesto za radionice i proslave u Novom Sadu i Beogradu",
  accentWord: "radionice",
  body:
    "Paleto je kreativni atelje i prostor za radionice, proslave i posebne događaje, u kome se ljudi okupljaju da stvaraju, eksperimentišu i provedu vreme na drugačiji način. Kod nas možete doći na radionicu slikanja, napraviti svoju šolju od keramike, organizovati rođendan, devojačko veče ili team building, a sve uz opuštenu atmosferu, kreativni proces i druženje.",
  imageSrc: "/druga.png",
  imageAlt: "Paleto kreativni atelje – prostor za radionice slikanja i keramike u Novom Sadu i Beogradu",
  decorativeSvgSrc: "/treca.svg",
} as const

const ORIGIN_STORY = {
  title: "Kako je Paleto nastao?",
  accentWord: "Paleto",
  body:
    "Pre radionica i ateljea postojao je samo jedan proizvod: ručno napravljen planer. Svaki planer bio je pravljen od početka do kraja ručno, od pažljivo biranog papira i materijala, sa ručnim vezom koji krasi korice. Nastajali su kao potpuno unikatne porudžbine. Tokom tog perioda nastale su desetine planera i svaki je imao svoju priču. I danas se često setimo ko ga je poručio, za koga je bio poklon i kojom prilikom je nastao. Nema dva ista, i to je od početka bila ideja Paleta.",
  imageSrc: "/daca1.png",
  imageAlt: "Danijela Vignjevic, osnivač Paleta",
  decorativeSvgSrc: "/deco.svg",
} as const

const TEAM_INFO = {
  title: "Tim koji pokreće magiju",
  body:
    "Tim strastvenih umetnika, iskusnih instruktora i kreativnih ljudi, posvećenih tome da svaka radionica bude zabavno i inspirativno iskustvo. Verujemo da kreativnost pripada svima, zato smo stvorili prijatan prostor u kome možete da istražujete, učite i slobodno se izražavate. Bilo da prvi put uzimate četkicu u ruke ili usavršavate svoju tehniku, tu smo da vas podržimo i vodimo na svakom koraku!",
  imageSrc: "/cetvrta.png",
  imageAlt: "Paleto radionica slikanja – učesnici na kreativnom radu",
} as const

const WORKSHOPS_ORIGIN = {
  title: "Od proizvoda do radionica",
  body:
    "Kako je zajednica oko brenda rasla, pojavila se želja da se proces stvaranja podeli sa drugima. Tako su nastale prve radionice: pažljivo organizovani kreativni susreti na kojima ljudi mogu da probaju novu tehniku, nauče nešto novo i naprave nešto svojim rukama. Tokom tih sati, učesnici potpuno zaboravljaju na telefone i uživaju u pravom, neposrednom iskustvu stvaranja.",
  imageSrc: "/peta.png",
  imageAlt:
    "Paleto radionice – učesnici na kreativnom radu i deljenju procesa stvaranja",
} as const

const CELEBRATIONS = {
  title: "Proslave i Posebni događaji",
  accentWord: "Posebni",
  body:
    "U našem prostoru organizuju se rođendani, devojačke večeri, team building događaji i različite privatne proslave, koje kombinuju druženje sa kreativnom aktivnošću.Svaka proslava je malo drugačija: nekada je to radionica slikanja, nekada izrada keramike, a nekada veče ručnog veza, čaja i druženja. Ideja je ista: da ljudi provedu vreme zajedno i naprave nešto što će im ostati kao uspomena.",
  imageSrc: "/sesta.png",
  imageAlt: "Paleto proslave – kreativni događaji i privatne proslave",
} as const

const TEAM_MEMBERS = [
  {
    name: "Lia Mojsilovic",
    role: "Instruktor",
    imageSrc: "/lia.png",
    imageAlt: "Lia Mojsilovic",
  },
  {
    name: "Anastasija Milivojevic",
    role: "Instruktor",
    imageSrc: "/jana.png",
    imageAlt: "Anastasija Milivojevic",
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
    imageSrc: "/IMG_2266.jpeg",
    imageAlt: "Tanja Tomic",
  },
  {
    name: "Jana Savić",
    role: "Akademski slikar",
    imageSrc: "/a645c1cb-6f92-473e-8cd7-886e9d4f81fb.jpeg",
    imageAlt: "Jana Savić",
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

const WEBPAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "O nama | Paleto – Kreativni atelje Beograd i Novi Sad",
  description:
    "Upoznajte Paleto tim. Radionice slikarstva, keramike i tim building u Beogradu i Novom Sadu.",
  url: ABOUT_URL,
  isPartOf: {
    "@type": "WebSite",
    name: "Paleto",
    url: SITE_URL,
  },
}

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Početna", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "O nama", item: ABOUT_URL },
  ],
}

const TEAM_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Paleto tim",
  description: "Članovi Paleto tima – instruktori i kreativci",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Person",
        name: "Lia Mojsilovic",
        jobTitle: "Instruktor",
        image: `${SITE_URL}/lia.png`,
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Person",
        name: "Danijela Vignjevic",
        jobTitle: "Osnivač Paleta",
        image: `${SITE_URL}/daca.png`,
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Person",
        name: "Anastasija Milivojevic",
        jobTitle: "Instruktor",
        image: `${SITE_URL}/jana.png`,
      },
    },
  ],
}

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TEAM_JSON_LD) }}
      />

      <AboutSection ariaLabelledBy="hero-heading">
        <AboutHero
          title="Više od Umetnosti : Naša priča"
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
          accentWord={TEAM_HERO.accentWord}
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
          subheading="Upoznajte naše instruktorke i saznajte ko stoji iza naših radionica. Svaka od njih donosi svoje iskustvo i energiju, i vodi vas kroz kreativni proces na svoj jedinstven način."
          members={[...TEAM_MEMBERS]}
          headingId="team-members-heading"
        />
      </AboutSection>

      <AboutSection
        backgroundColor={COLORS.background.aboutHero}
        ariaLabelledBy="origin-story-heading"
      >
        <AboutTeamHero
          title={ORIGIN_STORY.title}
          accentWord={ORIGIN_STORY.accentWord}
          body={ORIGIN_STORY.body}
          imageSrc={ORIGIN_STORY.imageSrc}
          imageAlt={ORIGIN_STORY.imageAlt}
          decorativeSvgSrc={ORIGIN_STORY.decorativeSvgSrc}
          headingId="origin-story-heading"
        />
      </AboutSection>

      <AboutSection
        backgroundColor={COLORS.background.aboutTeam}
        ariaLabelledBy="workshops-origin-heading"
      >
        <AboutTeamInfo
          title={WORKSHOPS_ORIGIN.title}
          body={WORKSHOPS_ORIGIN.body}
          imageSrc={WORKSHOPS_ORIGIN.imageSrc}
          imageAlt={WORKSHOPS_ORIGIN.imageAlt}
          headingId="workshops-origin-heading"
        />
      </AboutSection>

      <AboutSection
        backgroundColor={COLORS.background.aboutHero}
        className="z-10"
        ariaLabelledBy="celebrations-heading"
      >
        <AboutOverlapSection
          title={CELEBRATIONS.title}
          accentWord={CELEBRATIONS.accentWord}
          body={CELEBRATIONS.body}
          imageSrc={CELEBRATIONS.imageSrc}
          imageAlt={CELEBRATIONS.imageAlt}
          headingId="celebrations-heading"
        />
      </AboutSection>

      <AboutSection ariaLabelledBy="cta-banner-heading">
        <AboutCtaBanner
          title="Dođite da stvarate zajedno sa nama"
          body="Odaberite radionicu i pridružite nam se u ateljeu na nekoliko sati stvaranja i opuštanja. Upoznaćete naš tim, osetiti energiju prostora i videti zašto se ljudi rado vraćaju."
          backgroundSrc="/osma.png"
          backgroundAlt="Paleto atelje – unutrašnjost prostora"
          ctaLabel="Rezervišite"
          ctaHref="/"
          headingId="cta-banner-heading"
        />
      </AboutSection>
    </div>
  )
}
