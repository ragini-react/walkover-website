# walkover.in

The official website of Walkover Web Solutions Pvt. Ltd. It is built with Next.js 15 (App Router), TypeScript and CSS Modules. The site has no UI framework and no animation library.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

To run a production build next to a running `next dev`, use a separate output folder. Both commands otherwise share `.next` and break each other:

```bash
NEXT_DIST_DIR=.next-qa npm run build && NEXT_DIST_DIR=.next-qa npm start -- -p 3217
```

Environment variables are listed in `.env.example`. The contact form posts to `/api/contact`, which validates the enquiry and forwards it to `CONTACT_WEBHOOK_URL`. A viaSocket webhook trigger is a natural fit. Without that variable in production, the form tells visitors to email instead.

## Structure

```
src/
  app/                 routes (all statically prerendered except /api/contact)
  content/             typed content: products, solutions, industries, posts, company, site
  components/
    layout/            header + mega menu, mobile dialog nav, footer, analytics listener
    ui/                logo, buttons, icons, breadcrumbs, FAQ, JSON-LD, section header
    home/              homepage sections (hero, product universe, principles, …)
    sections/          shared page sections (page hero, cards, explore, contact form, article body)
    visuals/           hero board (canvas), product demos, workflow path, 3D die
    motion/            magnetic hover
  lib/                 seo, schema.org builders, analytics seam, motion bootstrap, contact validation
  styles/              tokens.css (design system) and globals.css
docs/RESEARCH.md       sources, verified vs inferred, open questions
```

## Content model

Entities reference each other by slug: Product → Solution → Industry → Post. A relationship is declared once and shows up everywhere it applies. The places it feeds are the menus, footer, sitemap, related links, the product-universe map and the "how it connects" lists.

- **Add a product.** Add an entry to `src/content/products.ts` and add its slug to `ProductSlug` in `types.ts`. Its page, menu entry, sitemap entry, OG image and schema are generated from that entry.
- **Add an article.** Add `src/content/posts/<slug>.ts` and register it in `posts/index.ts`.

Only facts with a source go into content. Product figures are rendered with attribution (`claimsSource`).

## Design system

All tokens live in `src/styles/tokens.css`:

- Colour: Walkover red `#dc281e` from the logo, plus ink and paper neutrals. Each product appears only in its own brand colour (`Product.brand` in `src/content/products.ts`). Give an element the colour with `brandProps(product.brand)`. A global `[data-brand]` rule then sets `--c` to the true colour on light surfaces and to a lifted tint on dark ones. Solutions take the colour of their lead product.
- Type scale: Inter Tight display, Inter body, JetBrains Mono labels.
- Spacing, radius, shadows, and motion durations and easings.

Dark sections opt in with `.surface-dark`. Text sizes and colours meet WCAG AA contrast on both surfaces. Small accent-coloured text uses `color-mix(… 45%, var(--fg))`, and small red text uses `--signal-text`.

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
