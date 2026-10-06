# Dekstive Studio

Portfolio site built from the Figma file "Dekstive Studio" (h2VnGwKznu2hytInzK7WIM), which is the source of truth.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production check
```

## Where things live

- `src/app/page.tsx`: section order (Hero, About, Services, Process, Portfolio, Testimonials, FAQ, CTA, Cat Runner, Footer).
- `src/components/`: one component per section.
- `src/lib/links.ts`: every link on the site. Social, legal, project and "see more" links are `#` placeholders until real URLs are supplied.
- `public/`: assets exported from Figma.

## Deliberate differences from Figma

- Geist Sans (official `geist` package) is the primary font. It is slightly wider than the face in Figma, so a few lines may wrap differently.
- The sun/moon switch is decorative; there is no dark mode.
- Motion is subtle and turns off under `prefers-reduced-motion`.
