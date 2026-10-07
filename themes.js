/**
 * Built-in designs. Pick one with  theme: "classic" | "modern" | "soft"  in config.js.
 * You normally don't need to edit this file.
 */
window.STORE_THEMES = {

  // House of FAYT — light cream and soft amber-orange, serif headings, black type. Dark mode stays properly dark.
  fayt: {
    fontsUrl: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Manrope:wght@400;500;600;700;800&display=swap",
    fontDisplay: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
    fontBody: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    radius: { s: "8px", m: "16px", l: "26px", btn: "999px" },
    colors: {
      light: {
        bg: "#FFF8EF", bgRaised: "#FFFFFF", bgSunken: "#FDEBD3",
        text: "#1A1612", textDim: "#6B5E50", border: "rgba(26,22,18,0.10)",
        ochre: "#A65D00", rust: "#F7BA54", onPrimary: "#1A1612", leaf: "#6B7A4C", focus: "#E39A1E"
      },
      dark: {
        bg: "#16120E", bgRaised: "#211B15", bgSunken: "#0F0C09",
        text: "#F8EEDF", textDim: "#BFB2A0", border: "rgba(248,238,223,0.13)",
        ochre: "#F6B84B", rust: "#F6B84B", onPrimary: "#16120E", leaf: "#8FA06E", focus: "#F6B84B"
      }
    }
  },

  // Warm off-white and charcoal with gold — the original look.
  classic: {
    fontsUrl: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Manrope:wght@400;500;600;700;800&display=swap",
    fontDisplay: "'Fraunces', Georgia, 'Times New Roman', serif",
    fontBody: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    radius: { s: "4px", m: "10px", l: "18px", btn: "999px" },
    colors: {
      light: {
        bg: "#FAFAFA", bgRaised: "#FFFFFF", bgSunken: "#F0EDE8",
        text: "#111111", textDim: "#6B6660", border: "rgba(17,17,17,0.10)",
        ochre: "#9A6516", rust: "#8A5A24", onPrimary: "#FFFFFF", leaf: "#5C6B4C", focus: "#B4791F"
      },
      dark: {
        bg: "#121212", bgRaised: "#1A1A1A", bgSunken: "#0A0A0A",
        text: "#F5F1E8", textDim: "#B8B2A6", border: "rgba(245,241,232,0.12)",
        ochre: "#D4AF37", rust: "#B8902B", onPrimary: "#111111", leaf: "#6E8B5A", focus: "#D4AF37"
      }
    }
  },

  // Monochrome, sharp, confident. Good for streetwear and menswear.
  modern: {
    fontsUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap",
    fontDisplay: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
    fontBody: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    radius: { s: "0px", m: "2px", l: "4px", btn: "2px" },
    colors: {
      light: {
        bg: "#FFFFFF", bgRaised: "#F6F6F4", bgSunken: "#EDEDEA",
        text: "#0B0B0B", textDim: "#5E5E5A", border: "rgba(11,11,11,0.14)",
        ochre: "#C2410C", rust: "#0B0B0B", onPrimary: "#FFFFFF", leaf: "#3F5E3A", focus: "#C2410C"
      },
      dark: {
        bg: "#0B0B0B", bgRaised: "#161616", bgSunken: "#000000",
        text: "#F4F4F2", textDim: "#A9A9A4", border: "rgba(244,244,242,0.16)",
        ochre: "#FB923C", rust: "#F4F4F2", onPrimary: "#0B0B0B", leaf: "#7FA877", focus: "#FB923C"
      }
    }
  },

  // Cream and terracotta, rounded and friendly. Good for women's wear, beauty and gifts.
  soft: {
    fontsUrl: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&display=swap",
    fontDisplay: "'DM Serif Display', Georgia, 'Times New Roman', serif",
    fontBody: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    radius: { s: "8px", m: "18px", l: "26px", btn: "999px" },
    colors: {
      light: {
        bg: "#FBF6EF", bgRaised: "#FFFFFF", bgSunken: "#F3E9DC",
        text: "#3B2A24", textDim: "#7A655B", border: "rgba(59,42,36,0.12)",
        ochre: "#A8472B", rust: "#B5573B", onPrimary: "#FFFFFF", leaf: "#6F8560", focus: "#B5573B"
      },
      dark: {
        bg: "#1E1613", bgRaised: "#2A1E1A", bgSunken: "#150F0D",
        text: "#F6EBDD", textDim: "#C4AFA0", border: "rgba(246,235,221,0.14)",
        ochre: "#E58B6C", rust: "#D9744F", onPrimary: "#1E1613", leaf: "#8FA87F", focus: "#E58B6C"
      }
    }
  }
};
