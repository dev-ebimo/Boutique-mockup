# Boutique Store Template

A reusable, no-backend storefront template: static HTML/CSS/JS, WhatsApp-based
ordering, no database, no auth, no payment gateway. Reskin it per client by
editing **`config.js`** only.

## Files

- `index.html` — page structure (you shouldn't need to touch this for a reskin)
- `style.css` — all styling, driven by CSS variables set from `config.js`
- `config.js` — **everything client-specific**: store name, colors, copy, products, contact info, WhatsApp number
- `app.js` — renders the page from `config.js` and handles filtering, ordering, theme toggle, mobile menu

## What changed in this revision

- **Default look is now light and minimalist** (off-white, near-black type, muted gold) instead of navy — reads as a boutique, not a SaaS dashboard. The dark/gold palette is still there as the toggle's alternate mode, not the default.
- **Real map embed.** The location section now embeds an actual Google Maps view of `address` from `config.js` (no API key needed) instead of a fake CSS grid with a CSS pin.
- **Single primary CTA in the hero** by default (`heroSecondaryCta` is `""`) — two competing full-width buttons crowded the mobile view. Set `heroSecondaryCta` if a client genuinely needs a second action.
- **Mobile fixes:** the headline and CTA now load before the decorative swatches on small screens (previously the swatches jumped above the headline); category filter tabs scroll horizontally on mobile instead of wrapping into messy multi-row stacks; hero padding is tighter on small screens.
- **Hyper-local trust badges** by default — named neighborhoods instead of generic "100% quality guaranteed" filler.
- **Favicon** is now a generated initial-letter mark instead of an emoji.

**On product photos:** the built-in "swatch" patterns are deliberately gradient placeholders, not real photos — a boutique's actual stock is the one thing a template can't guess. We deliberately did **not** hotlink random stock-photo URLs here: stock-photo hotlinking services are unreliable (several are fully shut down and return broken images), and a broken `<img>` icon looks worse than a clean placeholder. Instead, `config.js` fully supports real photos: set `image` on any product to a URL (or a path to a photo you host alongside these files) and it replaces the swatch immediately — see step 5 below. For client delivery, plan on the store owner supplying real product photos before launch, same as they'd supply their WhatsApp number and prices.

## Reskinning for a new client

1. Open `config.js`.
2. Update `storeName`, `bannerText`, `heroHeadline`, `heroSubtitle`.
3. Set `whatsappNumber` to the client's real number (digits only, country code first — e.g. `2348012345678`).
4. Update `address`, `phoneDisplay`, `hours`, `mapCaption`.
5. Replace the `products` array with the client's real catalogue. Each product needs `name`, `price`, `category` (must match a value in `categories`), and either a `swatch` number (1–6, built-in pattern placeholders) or an `image` URL.
6. Optionally change `categories` if the client's product types differ from Women/Men/Accessories.
7. Optionally change `colors.dark` / `colors.light` to match the client's brand.
8. Fill in `socials.instagram` / `socials.facebook` if they have them (leave `""` to hide).

Nothing else needs to change for a standard reskin.

## Test locally

Any static file server works, e.g. from this folder:

```bash
npx serve .
```

or just open `index.html` directly in a browser (all features work without a server, since there's no backend).

## Deploy on Vercel

**Option A — Vercel CLI (fastest)**
```bash
npm install -g vercel
cd boutique-template
vercel
```
Follow the prompts (set up and deploy → link to a new project → accept defaults, since this is a static site with no build step). Vercel will give you a live `.vercel.app` URL immediately, and `vercel --prod` promotes it to your production URL.

**Option B — Vercel dashboard**
1. Push this folder to a GitHub repo.
2. On vercel.com, click **New Project** → import the repo.
3. Framework preset: **Other** (no build command, no output directory needed — it's already static).
4. Click **Deploy**.

**Custom domain:** add it under Project → Settings → Domains once deployed.

## Notes

- No environment variables, no build step, no server — it's plain static files, so any static host works (Vercel, Netlify, GitHub Pages).
- The dark/light toggle preference is stored in the visitor's own browser (`localStorage`) — it does not sync between devices, which is expected for this kind of site.
