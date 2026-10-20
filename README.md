# Turnstone Financial Planning — Life Transitions Preset

A calm, compassionate homepage for a **fictional** financial planning firm that specialises in life transitions: retirement, a job change, divorce and loss. Warm sand paper, deep rust and warm ink; Newsreader + Instrument Sans. No photography: the plan card, icons and logo are drawn in code.

Next.js 16 (static export) · GSAP 3 + ScrollTrigger · Lenis · CSS Modules. No UI libraries.

```bash
npm install
npm run dev
npm run build     # static site in ./out
```

## Sections

| Section | What it does |
|---|---|
| Hero | Serif headline with an italic accent word, credential ticks, and a "Your plan" card: a rotating "Ready for ..." line, a path from today to your next chapter, and floating chips for investments, insurance and taxes. |
| Trust marquee | Credentials and reasons to trust the firm. |
| Situations | Four life transitions as tabs, each with its own reassurance, what we help with, and a call to action. |
| Services | Investments, insurance, tax-aware planning and legacy as one connected plan. |
| Process | Four steps from first conversation to ongoing adjustments. |
| Why us | Training, experience and a family-focused approach. |
| Resources | Free guides and quick tools for people not ready to talk yet. |
| FAQ | Accordion. |
| Contact | Appointment request form with validation. |
| Mobile bar | Sticky call and contact buttons on small screens. |

## Re-skin

- **Copy & data**: `content/site.json` (brand, contact, navigation, footer, disclosures) and `content/home.json` (every section).
- **Logo**: `components/Logo.jsx` (turning-path mark and wordmark, drawn in `currentColor`) and `app/icon.svg`.
- **Colour**: tokens at the top of `app/globals.css` (`--brand*`, `--ink*`, `--paper*`, `--text`, `--muted`). The token names are kept from the base design; their values are the Turnstone palette.
- **Type**: `app/layout.js`.

## Accessibility & motion

`prefers-reduced-motion` stops the rotating word, path drawing, marquee and scroll reveals. Tabs, accordion and form are keyboard-operable, and form errors are announced.

## Demo content

Turnstone Financial Planning, its figures, address and resources are fictional, and the phone number is a placeholder. The footer disclosures are placeholders too: a real firm must replace them with its own regulatory wording before launch.
