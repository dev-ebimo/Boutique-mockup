/**
 * STORE CONFIG
 * Edit this file only to turn this template into a new client's store.
 * No other file needs to change for a standard reskin.
 *
 * After editing, run  node build-seo.js  once (see README) so link previews and search
 * engines pick up the new name, description and photo.
 */
window.STORE_CONFIG = {

  // ---------- Identity ----------
  storeName: "House of FAYT",
  storeNameAccent: "",       // rendered in the accent color next to storeName
  bannerText: "Handmade for those who don't blend in — order on WhatsApp",

  // Favicon is generated automatically from the first letter of storeName — no image needed.
  // Set this to override which letter is used (e.g. for a two-word mark); leave "" to auto-derive.
  faviconLetter: "F",

  // ---------- Look & feel ----------
  // Pick one of the built-in designs. Each one changes colors, fonts, corner shapes and logo style:
  //   "classic" — warm off-white / charcoal with gold (default)
  //   "modern"  — black & white, sharp corners, uppercase headings, one hot accent
  //   "soft"    — cream and terracotta, rounded corners, friendly serif headings
  //   "fayt"    — light cream and soft amber-orange, serif headings (House of FAYT)
  theme: "fayt",

  // Optional: override individual colors of the chosen theme. Leave as {} to use the theme as is.
  // Example: colors: { light: { ochre: "#0A7B5C", rust: "#0A7B5C" } }
  // Available keys: bg, bgRaised, bgSunken, text, textDim, border, ochre (accent text/prices),
  //                 rust (buttons), onPrimary (text on buttons), leaf, focus
  colors: {},

  // Optional font overrides (Google Fonts). Leave "" to use the theme's fonts.
  fontDisplay: "",
  fontBody: "",
  fontsUrl: "",                       // the Google Fonts CSS URL that provides the fonts above

  // ---------- Photos ----------
  // Drop photo files into the "images/" folder next to index.html, then refer to them below by
  // file name only (e.g. "senator.jpg"). Anything starting with http://, https://, / or data:
  // is used exactly as written, so hosted URLs (Cloudinary, Imgur, Instagram CDN…) work too.
  // Any photo that is blank or fails to load falls back to the built-in pattern placeholder,
  // so the site never shows a broken-image icon.
  imageFolder: "images/",

  // Optional logo image. Leave "" to show the text logo (storeName + storeNameAccent).
  logoImage: "logo.png",
  // Logo shown in dark mode (light version of the same logo). Leave "" to reuse logoImage.
  logoImageDark: "logo-dark.png",

  // Up to 3 photos for the hero section. Leave empty ([]) to reuse the first products' photos,
  // or the pattern placeholders if those have no photos yet.
  // The first one is displayed tall, so a portrait photo works best there.
  heroImages: ["red-open-knit-crop-sweater.jpg", "daisy-granny-square-cardigan.jpg", "lime-fringe-two-piece.jpg"],

  // ---------- Hero ----------
  // Keep a single, clear primary action. Leave heroSecondaryCta as "" to show only the primary button
  // (recommended — two competing full-width buttons crowd the mobile view). Set it to a label to show both.
  heroHeadline: "Handmade for those who don't blend in",
  heroSubtitle: "Luxury handmade crochet pieces, tailored just for you — from statement tops and dresses to cardigans and accessories.",
  heroPrimaryCta: "Browse the collection",
  heroSecondaryCta: "",

  // ---------- About (leave aboutText empty to hide the section) ----------
  aboutTitle: "About House of FAYT",
  aboutText: [
    "House of FAYT creates luxury handmade crochet pieces, tailored just for you. Every piece is made to order around your measurements, so it fits exactly the way you want it to.",
    "Browse the collection, send us the name of the piece you love along with your measurements on WhatsApp, and we take it from there.",
    "Care tip: handwash in lukewarm water, dry flat on a towel, and store folded — never hung."
  ],
  aboutImage: "",                     // optional photo of the shop or owner (file name or URL)

  // ---------- Page text ----------
  // Section headings and menu labels. Change these to any wording or language you like.
  sections: {
    navShop: "Shop",
    navAbout: "About",
    navContact: "Contact",
    catalogTitle: "The collection",
    catalogSubtitle: "Handmade crochet, made to order — tap any piece to order on WhatsApp.",
    locationTitle: "Contact us",
    allLabel: "All",
    emptyMessage: "New pieces are on the way — message us on WhatsApp to ask what's available."
  },

  // ---------- Trust badges (shown in the strip under the hero AND the location section) ----------
  // Keep these hyper-local and specific — vague claims like "100% quality guaranteed" get ignored.
  badges: [
    "Tailored to your measurements",
    "Confirm your order and pay securely on WhatsApp",
    "Handmade with care, piece by piece"
  ],

  // ---------- Contact / location ----------
  address: "Fiko St, Yenagoa 569101, Bayelsa",
  // Optional: your Google Maps share link. Used for the "Get directions" button and the address link
  // (the embedded map is built from the address above).
  mapsUrl: "https://maps.app.goo.gl/gTiUsALUs6B6dZNTA",
  phoneDisplay: "0906 871 8151",
  hours: "",
  mapCaption: "House of FAYT — Fiko St, Yenagoa",

  // WhatsApp number used for ordering AND the footer link.
  // Digits only, country code first, no leading + and no leading 0 after it
  // e.g. a Nigerian number 0801 234 5678 becomes "2348012345678"
  whatsappNumber: "2349068718151",

  // ---------- WhatsApp ----------
  // Round chat button that stays on screen while visitors scroll (very effective on phones).
  floatingButton: true,
  floatingButtonLabel: "Order",
  floatingMessage: "Hello House of FAYT, I have a question about your crochet pieces.",
  restockMessage: "Hello House of FAYT, can you make {product} for me again?",
  // Message sent when someone taps "Order". Placeholders: {product}  {options}  {price}
  // {options} becomes e.g. " (Size: L, Colour: Blue)" — or nothing if the product has no options.
  orderMessage: "Hello House of FAYT, I would like to order {product}{options}. Please confirm the price and send me what you need (measurements and delivery details).",

  // ---------- Socials (leave blank string "" to hide a link) ----------
  socials: {
    instagram: "https://www.instagram.com/house_of_fayt",
    facebook: "https://www.facebook.com/profile.php?id=61578257531114",
    tiktok: "https://www.tiktok.com/@house_of_fayt",
    youtube: "https://www.youtube.com/@house_of_fayt"
  },

  // ---------- Search engines & link previews (SEO) ----------
  // siteUrl: the live address WITHOUT a trailing slash, e.g. "https://mrevans.com.ng".
  //          Needed for the WhatsApp/Facebook link preview photo, the sitemap and canonical link.
  siteUrl: "",
  seoTitle: "House of FAYT | Handmade Crochet Fashion",   // the title shown in Google results and browser tabs
  seoDescription: "House of FAYT — luxury handmade crochet tops, dresses, cardigans and accessories, tailored just for you. Order on WhatsApp.",
  seoImage: "",                       // photo shown when the link is shared; blank = first product photo
  businessType: "ClothingStore",      // schema.org type: ClothingStore, ShoeStore, Store, BeautySalon, Restaurant…
  priceRange: "",
  // Opening hours in search-engine format. Days: Mo Tu We Th Fr Sa Su, 24-hour times.
  openingHours: [],
  countryCode: "234",                 // used to turn the displayed phone number into a tap-to-call link

  // ---------- How to order (optional — remove or empty the list to hide the section) ----------
  orderStepsTitle: "How to order",
  orderStepsSubtitle: "Four simple steps, all on WhatsApp.",
  orderSteps: [
    { title: "Browse & pick", text: "Browse our collection. Screenshot or send the name of your preferred piece on WhatsApp." },
    { title: "Send your measurements", text: "Send your measurements and delivery details on WhatsApp." },
    { title: "Confirm & pay", text: "Provide your delivery address, confirm your order and make payment." },
    { title: "Sit back", text: "Sit back while we create magic." }
  ],

  // ---------- Categories shown as filter tabs ----------
  // "value" must match a product's "category" below. "all" is added automatically.
  // (Categories found in a Google Sheet but missing here are added automatically.)
  categories: [
    { value: "tops", label: "Tops" },
    { value: "layers", label: "Layers" },
    { value: "dresses", label: "Dresses" },
    { value: "sets", label: "Sets" },
    { value: "accessories", label: "Accessories" }
  ],

  // ---------- Products ----------
  // name, price, category     — required (category must match a value in categories)
  // image                     — main photo: file name from the images/ folder, or a full URL
  // images                    — optional extra photos shown when the product is opened (swipe gallery)
  // description               — optional short text shown when the product is opened
  // sizes, colors             — optional lists; the customer picks before ordering and the choice is
  //                             included in the WhatsApp message
  // badge                     — optional small label on the photo, e.g. "New" or "Sale"
  // inStock                   — false shows "Sold out" and changes the button to "Ask about restock"
  // swatch                    — 1-6, the built-in pattern shown until a photo is set (or if it can't load)
  products: [
    {
      name: "Daisy Granny-Square Cardigan", price: "Ask for price", category: "layers",
      image: "daisy-granny-square-cardigan.jpg",
      description: "Black crochet cardigan with white daisy granny-square motifs. Our signature FAYT piece.",
      swatch: 1, inStock: true
    },
    {
      name: "Red Open-Knit Crop Sweater", price: "Ask for price", category: "tops",
      image: "red-open-knit-crop-sweater.jpg",
      description: "Bold red open-knit crop sweater with relaxed sleeves.",
      swatch: 2, inStock: true
    },
    {
      name: "Lime Fringe Two-Piece", price: "Ask for price", category: "sets",
      image: "lime-fringe-two-piece.jpg",
      description: "Statement halter top and skirt set with playful lime fringe.",
      swatch: 3, inStock: true
    },
    {
      name: "Zigzag Crochet Polo", price: "Ask for price", category: "layers",
      image: "zigzag-crochet-polo.jpg",
      description: "Black and white zigzag crochet polo with a zip front.",
      swatch: 4, inStock: true
    },
    {
      name: "Pink Halter Maxi Dress", price: "Ask for price", category: "dresses",
      image: "pink-halter-maxi-dress.jpg",
      description: "Fitted crochet maxi dress in pink with a rose neck detail and cut-out sides.",
      swatch: 5, inStock: true
    },
    {
      name: "Red Net Sleeve Top", price: "Ask for price", category: "tops",
      image: "red-net-sleeve-top.jpg",
      description: "Red crochet top styled with open net sleeves.",
      swatch: 6, inStock: true
    },
    {
      name: "Red Crochet Crop Top", price: "Ask for price", category: "tops",
      image: "red-crochet-crop-top.jpg",
      description: "Cropped red crochet top, lovely layered over a crisp white shirt.",
      swatch: 1, inStock: true
    },
    {
      name: "Red Crochet Shrug", price: "Ask for price", category: "layers",
      image: "red-crochet-shrug.jpg",
      description: "Long-sleeve crochet shrug in red — an easy layer over any dress.",
      swatch: 2, inStock: true
    },
    {
      name: "Granny-Square Trousers", price: "Ask for price", category: "sets",
      image: "granny-square-trousers.jpg",
      description: "Wide-leg crochet trousers in bold granny-square patchwork.",
      swatch: 3, inStock: true
    },
    {
      name: "Purple Colour-Block Jacket", price: "Ask for price", category: "layers",
      image: "purple-colour-block-jacket.jpg",
      description: "Colour-blocked handmade jacket in purple and green.",
      swatch: 4, inStock: true
    },
    {
      name: "Black Crochet Hoodie", price: "Ask for price", category: "layers",
      image: "black-crochet-hoodie.jpg",
      description: "Chunky black crochet hoodie for a relaxed streetwear look.",
      swatch: 5, inStock: true
    },
    {
      name: "Red Off-Shoulder Gown", price: "Ask for price", category: "dresses",
      image: "red-off-shoulder-gown.jpg",
      description: "Dramatic red off-shoulder gown with voluminous sleeves.",
      swatch: 6, inStock: true
    },
    {
      name: "White Off-Shoulder Midi Dress", price: "Ask for price", category: "dresses",
      image: "white-off-shoulder-midi.jpg",
      description: "Fitted white midi dress with an off-shoulder neckline and side slit.",
      swatch: 1, inStock: true
    },
    {
      name: "Royal Blue Dress", price: "Ask for price", category: "dresses",
      image: "royal-blue-dress.jpg",
      description: "Clean-cut royal blue dress, easy to dress up or down.",
      swatch: 2, inStock: true
    },
    {
      name: "Pink Short-Sleeve Top", price: "Ask for price", category: "tops",
      image: "pink-short-sleeve-top.jpg",
      description: "Vibrant pink short-sleeve top with a button front.",
      swatch: 3, inStock: true
    },
    {
      name: "Pink Bloom Bonnet", price: "Ask for price", category: "accessories",
      image: "pink-bloom-bonnet.jpg",
      description: "Crochet bonnet with a ruffled pink bloom detail.",
      swatch: 4, inStock: true
    },
    {
      name: "Red Pin Beanie", price: "Ask for price", category: "accessories",
      image: "red-pin-beanie.jpg",
      description: "Slouchy red crochet beanie finished with safety-pin accents.",
      swatch: 5, inStock: true
    },
    {
      name: "Crochet Balaclava", price: "Ask for price", category: "accessories",
      image: "crochet-balaclava.jpg",
      description: "Black crochet balaclava with a bold statement look.",
      swatch: 6, inStock: true
    }
  ],

  // ---------- Update products from a Google Sheet (optional) ----------
  // Lets the owner change prices, add products and mark items sold out themselves — no code.
  // 1. Make a Google Sheet with the header row:  name | price | category | image | images | description | sizes | colors | badge | instock
  //    (sizes/colors/images: separate several with commas; instock: yes or no)
  // 2. File → Share → Publish to web → choose the sheet tab and "Comma-separated values (.csv)" → Publish.
  // 3. Paste the link it gives you here. Leave "" to use the products list above.
  // If the sheet can't be reached, the site quietly falls back to the last version it saw, then to the list above.
  productsSheetUrl: "",

  // Show a green "In Stock" tag on every product photo (off by default — cleaner on phones).
  showInStockTag: false,

  // Symbol added to plain numbers typed in the Google Sheet price column (18500 → ₦18,500).
  currencySymbol: "₦"
};
