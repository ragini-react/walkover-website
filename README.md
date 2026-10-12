# walkover.in

The official website of Walkover Web Solutions Pvt. Ltd. It is built with Next.js 15 (App Router), TypeScript and Sass (SCSS Modules). The site has no UI framework and no animation library.

The site is a static export. `npm run build` writes plain HTML, CSS and JS to `out/`, which any static host can serve. It is deployed to GitHub Pages.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # static site in out/
npm run preview        # serves out/ on http://localhost:3000 (PORT=4000 to change)
```

`next build` always uses `.next` as scratch space, so it breaks a `next dev` running from the same folder. To build while dev is running, start dev in its own folder: `NEXT_DIST_DIR=.next-dev npm run dev`.

Environment variables are listed in `.env.example`. They are read at build time and baked into the files.

## Static export and GitHub Pages

`out/` is self-contained. It holds no absolute filesystem paths, so you can copy it anywhere and serve that folder as a web root: `node scripts/preview.mjs path/to/copy`. Opening the HTML files straight from disk (`file://`) does not work, because pages load `/_next/...` assets by URL.

The URL path the site lives under is fixed at build time by `BASE_PATH`:

| Served at | Build with |
| --- | --- |
| A domain root: custom domain, `USERNAME.github.io`, local preview | `npm run build` |
| A project site: `USERNAME.github.io/REPOSITORY/` | `BASE_PATH=/REPOSITORY npm run build` |

To preview a project-site build at the same path it will have on Pages:

```bash
BASE_PATH=/walkover-website npm run build
BASE_PATH=/walkover-website npm run preview   # http://localhost:3000/walkover-website/
```

`next/link`, metadata files and `/_next` assets pick up the base path automatically. Anything else that builds a root-relative URL (`next/image` src strings, plain `<a>` tags, the web manifest) must go through `withBasePath()` from `src/lib/base-path.ts`.

### Deployment

`.github/workflows/deploy.yml` builds and deploys on every push to `main`, and can be run manually from the Actions tab. `actions/configure-pages` detects the base path, so the same workflow works for a project site, a user site and a custom domain.

One-time setup:

1. Repository **Settings → Pages → Build and deployment → Source**: choose **GitHub Actions**.
2. Optional, under **Settings → Secrets and variables → Actions → Variables**:
   - `NEXT_PUBLIC_CONTACT_ENDPOINT`: where the contact form posts (see below).
   - `NEXT_PUBLIC_SITE_URL`: the canonical origin for SEO tags. Defaults to `https://walkover.in`.
   - `PAGES_BASE_PATH`: overrides the detected base path. Set it to `/` to force the root.
3. For a custom domain, enter it under **Settings → Pages → Custom domain**. The base path then becomes empty on the next deploy. No `CNAME` file is needed with Actions deployments.

### Limits of a static host

- **No server code.** There are no API routes, middleware, server actions or per-request rendering. Every page, including each dynamic route listed by `generateStaticParams`, is rendered at build time. A new product or article needs a rebuild, which a push to `main` does.
- **Contact form.** It used to post to an `/api/contact` route that validated input on the server, rate-limited by IP and forwarded to a secret `CONTACT_WEBHOOK_URL`. That route cannot run on Pages, so the form now validates in the browser and posts the same JSON straight to `NEXT_PUBLIC_CONTACT_ENDPOINT`. The URL is public and the endpoint must allow cross-origin POSTs. Server-side validation and rate limiting now have to happen at the endpoint, for example in the viaSocket flow. You can also put the old route's logic (in git history) in a small serverless function and point the variable at it. Without the variable, the form tells visitors to email instead.
- **Security headers.** `next start` used to send nosniff, referrer, frame, permissions and HSTS headers. GitHub Pages cannot set custom headers. Add them at a CDN in front of the custom domain if they are needed.
- **Generated images.** OG cards and the Apple touch icon are exported as PNG files without an extension (`opengraph-image`, `apple-icon`). Pages serves them as `application/octet-stream`. Browsers and the major link-preview crawlers detect the format, but a strict client might not.
- **Trailing slashes.** Pages live at `/about/`. GitHub Pages redirects `/about` to `/about/`.

## Structure

```
src/
  app/                 routes (all statically exported)
  content/             typed content: products, solutions, industries, posts, company, site
  components/
    layout/            header + mega menu, mobile dialog nav, footer, analytics listener
    ui/                logo, buttons, icons, breadcrumbs, FAQ, JSON-LD, section header
    home/              homepage sections (hero, product universe, principles, …)
    sections/          shared page sections (page hero, cards, explore, contact form, article body)
    visuals/           hero board (canvas), product demos, workflow path, 3D die
    motion/            magnetic hover
  lib/                 seo, schema.org builders, analytics seam, motion bootstrap, contact validation
  styles/              globals.scss entry plus partials: _tokens (design system), _base, _layout,
                       _typography, _utilities, _motion, _brand, and shared _mixins
docs/RESEARCH.md       sources, verified vs inferred, open questions
scripts/preview.mjs    zero-dependency static server for out/ (mimics GitHub Pages)
```

## Content model

Entities reference each other by slug: Product → Solution → Industry → Post. A relationship is declared once and shows up everywhere it applies. The places it feeds are the menus, footer, sitemap, related links, the product-universe map and the "how it connects" lists.

- **Add a product.** Add an entry to `src/content/products.ts` and add its slug to `ProductSlug` in `types.ts`. Its page, menu entry, sitemap entry, OG image and schema are generated from that entry.
- **Add an article.** Add `src/content/posts/<slug>.ts` and register it in `posts/index.ts`.

Only facts with a source go into content. Product figures are rendered with attribution (`claimsSource`).

## Design system

All tokens live in `src/styles/_tokens.scss`:

- Colour: Walkover red `#dc281e` from the logo, plus ink and paper neutrals. Each product appears only in its own brand colour (`Product.brand` in `src/content/products.ts`). Give an element the colour with `brandProps(product.brand)`. A global `[data-brand]` rule then sets `--c` to the true colour on light surfaces and to a lifted tint on dark ones. Solutions take the colour of their lead product.
- Type scale: Inter Tight display, Inter body, JetBrains Mono labels.
- Spacing, radius, shadows, and motion durations and easings.

Dark sections opt in with `.surface-dark`. Text sizes and colours meet WCAG AA contrast on both surfaces. Small accent-coloured text uses `color-mix(… 45%, var(--fg))`, and small red text uses `--signal-text`.

## Styling

- Component and page styles are SCSS Modules (`Name.module.scss`) next to the file that uses them.
- `src/styles/globals.scss` is imported once, by the root layout. It loads the partials in cascade order: tokens, base, layout, typography, utilities, motion and brand. Put a new global class in the partial that matches it.
- `src/styles/_mixins.scss` holds the few declaration groups that repeat across files. Load it with a relative `@use "…/styles/mixins";`. Add a mixin only when it removes real repetition.
- Colours are OKLCH and come from tokens. The dark theme follows `prefers-color-scheme` through the tokens, with no toggle and no theme class.
- Tailwind is not used.

## Motion and performance

- Scroll reveals use `data-reveal` and a tiny inline script, with no hydration dependency. Content is visible without JS and to crawlers.
- The hero is an isometric board built from CSS 3D transforms (`IsoBoard`), with no canvas and no JS animation loop. Its keyframes are generated from the tile data, so the token, tile lift, glow and headline word share one beat. Animations pause off-screen and are static under `prefers-reduced-motion`.
- Product demos are pure CSS loops, paused off-screen via `PlayWhenVisible`.
- Scroll-linked effects (intro text, timeline rail, article progress bar) use CSS scroll timelines. Unsupported browsers get the finished state.
- First-load JS is about 103 kB shared, plus 1–10 kB per route. There are no images beyond SVG and generated OG cards.

## SEO

- Every page gets a canonical, Open Graph and Twitter card through `pageMeta()`.
- Generated OG images: site-wide, per product and per article.
- Generated `sitemap.xml`, `robots.txt` and web manifest.
- JSON-LD: Organization, WebSite, BreadcrumbList, SoftwareApplication, BlogPosting, FAQPage, CollectionPage and DefinedTermSet.
- No ratings, reviews, prices or JobPosting. The site has no verified data to back them.

## Analytics

Interactive elements carry `data-track="…"` attributes. One delegated listener forwards them to `track()` in `src/lib/analytics.ts`. To connect a provider, call `registerAnalyticsSink()`. No component imports a vendor SDK.
