/**
 * STORE CONFIG
 * Edit this file only to turn this template into a new client's store.
 * No other file needs to change for a standard reskin.
 */
window.STORE_CONFIG = {

  // ---------- Identity ----------
  storeName: "Yenagoa Chic",
  storeNameAccent: "Store",       // rendered in the accent color next to storeName
  bannerText: "Fast delivery across Yenagoa & Bayelsa State",

  // Favicon is generated automatically from the first letter of storeName — no image needed.
  // Set this to override which letter is used (e.g. for a two-word mark); leave "" to auto-derive.
  faviconLetter: "",

  // ---------- Hero ----------
  // Keep a single, clear primary action. Leave heroSecondaryCta as "" to show only the primary button
  // (recommended — two competing full-width buttons crowd the mobile view). Set it to a label to show both.
  heroHeadline: "Discover latest fashion in Yenagoa",
  heroSubtitle: "Senator wear, Ankara sets, and statement heels — picked for the Bayelsa scene and delivered same-day across town.",
  heroPrimaryCta: "View the catalogue",
  heroSecondaryCta: "",

  // ---------- Trust badges (shown in the strip under the hero AND the location section) ----------
  // Keep these hyper-local and specific — vague claims like "100% quality guaranteed" get ignored.
  badges: [
    "Same-day delivery to Swali, Amarata & Kuto",
    "Pay on delivery or bank transfer",
    "Handpicked for quality, every time"
  ],

  // ---------- Contact / location ----------
  address: "Mbiama–Yenagoa Road, near Amarata Junction, Yenagoa, Bayelsa State",
  phoneDisplay: "+234 801 234 5678",
  hours: "Mon – Sat, 9:00 AM – 7:00 PM",
  mapCaption: "Yenagoa Chic Store — Amarata, Yenagoa",

  // WhatsApp number used for ordering AND the footer link.
  // Digits only, country code first, no leading + and no leading 0 after it
  // e.g. a Nigerian number 0801 234 5678 becomes "2348012345678"
  whatsappNumber: "2348012345678",

  // ---------- Socials (leave blank string "" to hide a link) ----------
  socials: {
    instagram: "",
    facebook: ""
  },

  // ---------- Categories shown as filter tabs ----------
  // "value" must match a product's "category" below. "all" is added automatically.
  categories: [
    { value: "women", label: "Women" },
    { value: "men", label: "Men" },
    { value: "accessories", label: "Accessories" }
  ],

  // ---------- Products ----------
  // swatch: 1-6, picks one of the built-in fabric-pattern placeholders (no images needed).
  // To use a real photo instead, set image: "https://..." and it will be used in place of the swatch pattern.
  products: [
    { name: "Men's Senator Wear",     price: "₦28,500", category: "men",         swatch: 1, inStock: true },
    { name: "Female Ankara Set",      price: "₦22,000", category: "women",       swatch: 2, inStock: true },
    { name: "Designer Heels",         price: "₦15,750", category: "women",       swatch: 5, inStock: true },
    { name: "Casual Tee — Crew Neck", price: "₦6,500",  category: "men",         swatch: 3, inStock: true },
    { name: "Beaded Waist Chain",     price: "₦4,200",  category: "accessories", swatch: 4, inStock: true },
    { name: "Woven Tote Bag",         price: "₦9,900",  category: "accessories", swatch: 6, inStock: true }
  ],

  // ---------- Colors ----------
  // Two palettes: "dark" is the default look, "light" is what the theme toggle switches to.
  // Change these six values per palette to reskin the whole site's color identity.
  // "light" is the default look on first visit — a clean, minimalist boutique palette
  // (off-white, near-black type, muted gold). "dark" is what the toggle switches to —
  // a sophisticated deep-charcoal-and-gold alternative, not a second competing brand look.
  colors: {
    light: {
      bg: "#FAFAFA", bgRaised: "#FFFFFF", bgSunken: "#F0EDE8",
      text: "#111111", textDim: "#6B6660", border: "rgba(17,17,17,0.10)",
      ochre: "#B4791F", rust: "#8A5A24", leaf: "#5C6B4C", focus: "#B4791F"
    },
    dark: {
      bg: "#121212", bgRaised: "#1A1A1A", bgSunken: "#0A0A0A",
      text: "#F5F1E8", textDim: "#B8B2A6", border: "rgba(245,241,232,0.12)",
      ochre: "#D4AF37", rust: "#9C7A2E", leaf: "#6E8B5A", focus: "#D4AF37"
    }
  },

  // ---------- Fonts ----------
  // Any Google Fonts family name works here; update the <link> tags in index.html to match if you change these.
  fontDisplay: "'Fraunces', Georgia, 'Times New Roman', serif",
  fontBody: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
};
