@AGENTS.md

# Cnncted (concept)

Concept website for Cnncted, a creative marketing agency from Amsterdam (owner Floris; current site cnnctedmedia.com, static HTML). Built 2026-10-31 as a sales concept; business context lives in ATLAS (`Projects/Cnncted.md`).

- Live on https://cnncted.luukvandijk.com. Vercel project `cnncted` is connected to github.com/Luukvdijk/cnncted: every push to `main` deploys to production.
- Next.js 16 App Router, Tailwind v4, GSAP (ScrollTrigger, SplitText) and Lenis for motion. Run with preview entry `cnncted` (port 5185).
- Routes live under `src/app/[lang]` so Dutch can be added later: add `nl` to `locales` in `src/content/site.ts` and a `src/content/nl.ts` typed as `Dictionary`. Only `en` exists now; `/` redirects to `/en` (next.config.ts).
- All copy, cases and media references: `src/content/en.ts`. Case pages are generated from `cases`.
- Media in `public/media/`: photos resized from their old site, the showreel and case clips cut from their 4K files with ffmpeg (no audio).
- Page transitions use React `<ViewTransition>` (`PageShell`), work card covers morph into the case hero (`case-<slug>` names).
- Visual system: white base, ink `#0e0e10`, lime `#d6ff3f` from the logo dot, Schibsted Grotesk, lowercase headings that end in the lime dot (`<Dot />`). No eyebrow labels.
- In a hidden browser pane requestAnimationFrame does not run, so GSAP never ticks. In dev, `gsap` is on `window`: `setInterval(() => gsap.ticker.tick(), 30)` drives it for testing.
- Concept only: `robots` is noindex in `src/app/[lang]/layout.tsx`; the contact form shows a thank-you state and sends nothing.
- No em-dashes or en-dashes anywhere.
