# Retail Guesser

A static, six-page Astro website for [retailguesser.com](https://retailguesser.com), built with TypeScript and custom CSS. Fonts are hosted with the site. No database, form service, API keys, or runtime server are required.

## Local development

Use Node.js 22.22+ (Node.js 24 recommended).

```sh
npm ci
npm run dev
```

Open `http://localhost:4321`. The dev server listens on all interfaces for workspace previews.

```sh
npm run check   # Astro and TypeScript validation
npm run build   # Generate the production site in dist/
npm run preview # Inspect the production build at localhost:4321
npm test        # Build, start a preview, and run browser checks
```

Browser checks use Google Chrome when installed at `/usr/bin/google-chrome`, or `CHROME_PATH` if supplied. Otherwise, install Playwright Chromium with `npx playwright install chromium` before running tests. The checks cover all six pages at four screen widths, accessibility, contact links, internal destinations, metadata, mobile navigation, and a JavaScript-disabled visit. They do not send email or place calls.

## Content and design

- `src/data/site.ts`: shared business details, services, case studies, and testimonials. Keep the supplied `welsome@retailguesser.com` spelling.
- `src/pages/`: the six site pages and generated sitemap. Business content and legal copy were carried over from the previous site; contact information uses the owner's supplied details. Existing legal effective dates are preserved.
- `src/components/`, `src/layouts/`, and `src/styles/global.css`: shared navigation, accessible icons, illustrations, layout, and responsive styles.

Consultation buttons lead to the Contact page. Its primary button opens an email to `sales@retailguesser.com`; all three inboxes and the phone number have direct contact links. Chart data is illustrative and labeled accordingly. Case study statistics are the existing published figures. Client wordmarks are typographic treatments of their published names, and testimonial avatars use initials.

The share image is committed in `public/social-card.png`. Regenerate it after changing its design with `node scripts/generate-social-card.mjs` (requires Chrome or Playwright Chromium).

## Deployment

Upload the contents of `dist/` to any static web host. Build command: `npm run build`. Output directory: `dist`. No environment variables are needed.

The existing public URLs are preserved: `/`, `/about.html`, `/case-studies.html`, `/contact.html`, `/privacy.html`, and `/terms.html`, plus the homepage `#services` anchor. Serve the generated `.html` files at those exact paths; disable host settings that redirect `.html` URLs to extensionless URLs. Host changes and production DNS updates are separate deployment steps.

Canonical URLs, social metadata, `robots.txt`, and `sitemap.xml` use `https://retailguesser.com`. The sitemap is generated from the shared page list.

### Cloudflare publication

The included Wrangler configuration uses the verified Cloudflare account for `retailguesser.com`. Run `npm run deploy:preview` to publish a separate workers.dev version, then `npm run deploy` to publish the production Worker on the `retailguesser.com/*` route. Use an existing authenticated Wrangler session; credentials do not belong in the repository.

The route uses the domain's existing proxied DNS record. It does not replace DNS records, change nameservers, or configure email. The small Worker maps `/` to `/index.html` while static asset HTML handling is disabled to preserve `.html` page URLs. Security and cache headers are supplied by `public/_headers`.

Run the same browser checks against a deployed origin with `VERIFY_URL=https://retailguesser.com npm test`. When this variable is set, the tests use that host without starting a local server.

Before the first production release, record the zone's existing Worker routes and verify the workers.dev build. If the first release needs to be reverted, remove only the `retailguesser.com/*` route pointing to `retailguesser-website-production`; this restores the previous origin through the existing DNS record. For later releases, record the active Worker version and use Wrangler rollback if needed.
