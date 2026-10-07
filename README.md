# Boutique Store Template

A reusable, no-backend storefront: static HTML/CSS/JS, WhatsApp-based ordering, no database,
no auth, no payment gateway. Reskin it per client by editing **`config.js`** only.

## Files

| File | What it is | Edit it? |
|---|---|---|
| `config.js` | **Everything client-specific**: name, theme, text, photos, products, contact info, WhatsApp number | **Yes — this is the only one** |
| `images/` | Client photos (products, hero, logo, about) | Add files here |
| `index.html` | Page structure | No (SEO tags are written into it by `build-seo.js`) |
| `style.css` | All styling (mobile-first) | No |
| `app.js` | Renders the page, product popup, filters, ordering, Google Sheet loading | No |
| `themes.js`, `boot.js` | The three built-in designs and the code that applies them | No |
| `build-seo.js` | Writes search/link-preview tags + `robots.txt` + `sitemap.xml` from `config.js` | Run it |

## Setting up a new client (about 30 minutes once you have their content)

**Get from the client first:** logo (optional), product photos, names + prices (+ sizes/colours if any),
WhatsApp number, address, opening hours, Instagram/Facebook links, 2–3 sentences about the business.

1. Open `config.js` and work top to bottom. Every option has a comment explaining it.
2. Pick a look with `theme: "classic" | "modern" | "soft" | "fayt"`. Optionally tweak colors in `colors`.
3. Put photos in `images/` and refer to them by file name (`image: "senator.jpg"`). Keep each under ~300 KB;
   portrait or square photos look best (cards are 4:5).
4. Replace `products` (or connect a Google Sheet — see below).
5. Set `siteUrl` to the live address, then run:
   ```bash
   node build-seo.js
   ```
6. Test (below), deploy, send the client the link.

## What's in the template

- **House of FAYT additions** — `fayt` theme (light cream + soft amber, dark mode stays dark), `logoImageDark` (light logo swapped in automatically in dark mode), `orderSteps` (a "How to order" section), and an empty `address` hides the map for online-only stores.

- **Three designs** — `classic` (warm off-white + gold), `modern` (black & white, sharp, uppercase),
  `soft` (cream + terracotta, rounded). Each has light and dark mode; visitors can toggle.
- **Photos from `config.js`** — product photos, an extra swipe gallery per product (`images: [...]`), hero photos,
  logo, About photo. Blank or broken photos fall back to a pattern, never a broken-image icon.
- **Product popup** — tap a product to see a big photo (swipeable), description, size and colour choice.
  The choice goes into the WhatsApp message: *"…buying Blue Striped Button-Up (Size: L) priced at ₦18,500…"*.
  Products with no sizes/colours order in one tap.
- **Sold-out handling** — `inStock: false` greys the photo and turns the button into "Ask about restock".
- **Floating chat button** — stays on screen on phones (`floatingButton`, `floatingMessage`).
- **About section** — from `aboutText` (leave empty to hide it and its menu link).
- **Editable wording** — section headings and menu labels live in `sections`.
- **Tap-to-call and directions** — the address and phone number in "Find us" are links, plus Directions / Call buttons.
- **Basic SEO** — page title, description, canonical link, WhatsApp/Facebook link preview (Open Graph),
  local-business structured data, `robots.txt`, `sitemap.xml`.
- **Mobile-first** — two-column product grid on phones, 44px+ tap targets, bottom-sheet popup,
  swipeable filter tabs and gallery, safe-area padding for notched phones, no horizontal scroll (tested at 320–1280px).

## Let the owner update products themselves (Google Sheet, optional)

Without this, every price change means editing `config.js`. With it, the owner edits a spreadsheet and the site updates.

1. Create a Google Sheet with this header row (first row, in any order):

   `name | price | category | image | images | description | sizes | colors | badge | instock`

2. One product per row. Prices can be plain numbers (`18500` becomes ₦18,500). Separate several sizes, colours or
   extra photos with commas (`S, M, L`). `instock`: `yes` or `no`. New categories appear as filter tabs automatically.
   Photos: file names from `images/`, or full URLs.
3. **File → Share → Publish to web** → pick the sheet tab and **Comma-separated values (.csv)** → **Publish**.
4. Paste the link into `productsSheetUrl` in `config.js`.

If the sheet can't be reached, the site shows the last version it saw, then falls back to the `products` list in `config.js`.
New photos still need to be added to the `images/` folder (or use hosted image URLs in the sheet).

## SEO: what `build-seo.js` does and why you must run it

WhatsApp, Facebook and Google's first pass read the raw HTML and do **not** run JavaScript, so the title, description and
preview photo must be written into `index.html` itself. Run `node build-seo.js` after changing `storeName`, `seoTitle`,
`seoDescription`, `siteUrl`, photos, hours or socials. (If you forget, `app.js` adds the basics at runtime so Google still
sees them, but link previews will be missing.) Without `siteUrl` the script skips the canonical link, sitemap and
preview photo and tells you so.

After going live, add the site to **Google Search Console** and submit `sitemap.xml`, and create a **Google Business Profile**
for the shop — that is what puts a local business on Google Maps and in "near me" searches.

## Test locally

Any static file server works, from this folder:

```bash
npx serve .
```

Opening `index.html` directly also works for everything except the Google Sheet option (browsers restrict it on `file://`).
Always check on a real phone before handing over: product popup, a size choice, the chat button, and the WhatsApp message it opens.

## Deploy

Plain static files, no build step — any static host works.

- **Cloudflare Pages**, **Netlify** or **GitHub Pages** are free and allow commercial/client sites.
- **Vercel's free (Hobby) plan is meant for non-commercial use**, so for paying clients use one of the above or Vercel's paid plan
  (check Vercel's current terms). Vercel deploys with `vercel` from this folder, or by importing the repo with the framework preset **Other**.
- **Custom domain:** add it in the host's dashboard; set `siteUrl` to it and re-run `node build-seo.js`.
- File names are case-sensitive on most hosts: `Heels.JPG` is not `heels.jpg`.

## Notes

- No environment variables, no build step, no server.
- The dark/light preference and the cached Google Sheet are stored in the visitor's own browser (`localStorage`); nothing is sent anywhere.
- Sample photos in `images/` are for testing only (one has a watermark, one is a retailer's product photo). Replace them with the client's own.
