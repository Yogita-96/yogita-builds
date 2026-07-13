# yogita.builds

Personal portfolio and case-study site — [yogitabuilds.dev](https://yogitabuilds.dev)

Frontend developer portfolio featuring project case studies, articles, AAA game QA credits (Ubisoft & Bandai Namco), and a chibi familiar that follows the cursor across every section.

Built in React with Vite. No Next.js, no framework layer. Just React Router and a hand-tuned CSS design system with light/dark themes.

---

## What's here

- **Landing page** — About, Experience, Skills, Projects, Articles, Game Credits, Contact — all single-page with scroll-spy navigation
- **Case study pages** — Deep-dives on TaskQuest and The Between at `/case-study/:slug`
- **Familiar companion** — A small animated character that walks between sections, sits when idle, dusts off when interrupted, and toggles the theme when clicked
- **Formspree contact form** with client-side validation
- **Live GitHub contribution graph** pulled via public API with a labeled fallback

---

## Tech stack

| Layer      | Choice                                                                                                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| Build      | Vite                                                                                                                       |
| Framework  | React 19                                                                                                                   |
| Routing    | React Router                                                                                                               |
| Styling    | Vanilla CSS with CSS variables (light/dark theme tokens)                                                                   |
| State      | useState + custom hooks (`useTypewriter`, `useScrollSpy`, `useReducedMotion`, `useScrollReveal`, `useCountUp`, `useTheme`) |
| Contact    | Formspree API                                                                                                              |
| Deployment | Vercel                                                                                                                     |

---

## Design principles

**Sage-family palette, tonal not chromatic.** One hue across the site — deeper sage in light mode, muted sage in dark mode. Ember accents (`#C89B6A`) as the only warm counterpoint. No gradient chaos.

**Light mode as default landing state.** Familiar chibi's warm brown outfit was designed for sage — the palette accommodates the character, not the other way around.

**Particle canvas that respects `prefers-reduced-motion`.** Slow drift, ~38 points, theme-aware colors.

**Corner-bracket accents on interactive elements.** Same visual grammar carries into The Between's combat UI — small consistency thread across projects.

**Typography.** Space Mono for code-adjacent labels, Syne for headings, DM Sans for body, JetBrains Mono for terminal-style eyebrows.

---

## Local development

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173` by default.

## Build

```bash
npm run build
npm run preview
```

Preview serves the production build locally before deploying.

---

## Deployment

Automatic Vercel deploys on push to `main`. The site rebuilds on every merge.

---

## Case studies covered

- **[TaskQuest](https://yogitabuilds.dev/case-study/taskquest)** — Gamified React task manager with RPG quest system, XP, streaks, level-up banners
- **[The Between](https://yogitabuilds.dev/case-study/the-between)** — Turn-based dark fantasy RPG built entirely in React, no game engine — [play the playtest build](https://the-between-navy.vercel.app)

---

## Credits

- **Familiar character sprites** — 8 hand-directed AI-generated frames, animated via a state machine that watches cursor position, velocity, and idle time
- **Character art for The Between** — AI-generated concept art, refined and directed by me
- **Fonts** — Google Fonts (Space Mono, Syne, DM Sans, JetBrains Mono)
- **Devicon icons** — Skill grid iconography via CDN

---

## Contact

- **Email** — [yogitaa.rm@gmail.com](mailto:yogitaa.rm@gmail.com)
- **LinkedIn** — [linkedin.com/in/Yogita-M](https://linkedin.com/in/Yogita-M)
- **GitHub** — [github.com/Yogita-96](https://github.com/Yogita-96)
- **MobyGames (game credits)** — [profile](https://www.mobygames.com/person/1835643/yogita-yogita/)

---

## License

Personal portfolio code. Feel free to look, but please don't clone-and-rebrand.

© 2026 yogita.builds
