export const COLORS = {
  primary: "#5CA2BC",
  primaryHover: "#5CA2BC",
  primaryBorder: "rgba(92, 162, 188, 0.6)",
  primaryLight: "rgba(92, 162, 188, 0.1)",

  text: {
    primary: "#000914",
    secondary: "#212529",
    muted: "#86B4C5",
    disabled: "#BCBCBC",
    label: "#989B9C",
    white: "#FFFFFF",
  },

  border: {
    default: "#D9D9D9",
    light: "#E5E5E5",
  },

  error: "#DC0000",

  background: {
    white: "#FFFFFF",
    section: "#F8F9FA",
    aboutHero: "#FDFBF8",
    aboutFeatures: "#F6F9FB",
    aboutAlt: "#F8F6F4",
    aboutTeam: "#E5EEEF",
    heroGradient:
      "linear-gradient(135deg, #4a8fa3 0%, #5CA2BC 50%, #6eb5ce 100%)",
  },

  icon: {
    primary: "rgba(92, 162, 188, 0.6)",
    muted: "rgba(92, 162, 188, 0.35)",
    placeholder: "rgba(0, 9, 20, 0.12)",
  },

  fonts: {
    heading: "var(--font-comfortaa), 'Comfortaa', sans-serif",
    body: "var(--font-geist-sans), 'Inter', sans-serif",
  },
} as const;