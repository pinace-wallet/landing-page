# Design

Bold, kinetic, control-room-on-black. Pinace's marketing surface takes the extension's
vibrant-glass-on-pure-black identity and amplifies it into a motion-led brand page:
electric blue as the through-line, a drifting multi-color orb field (blue, violet,
hot-pink, teal) bleeding through a near-black canvas, and large confident display type.
The energy says "alive and capable"; the restraint (spare layout, mono only for real
on-chain data) says "credible and in control." Atmosphere: a dark trading terminal lit
from within — premium, fast, precise. Not a generic dark SaaS gradient page.

## Color

Pure-black canvas, electric-blue brand, vibrant gradient accents, semantic status colors.
Palette is inherited from the shipped extension (identity-preservation) — values are
canonical; do not re-tint toward warm/cool defaults.

### Core
- **Background** `#000000` — true black canvas. The base everywhere.
- **Surface / raised** `#0A0A0C` → `#18181B` (zinc-900/800) for solid panels.
- **Ink (primary text)** `#FAFAFA` — near-white on black.
- **Muted text** `#A1A1AA` (zinc-400); **faint** `#52525B` (zinc-600) for metadata.
- **Hairline / border** `rgba(255,255,255,0.08)`; **strong border** `rgba(255,255,255,0.14)`.

### Brand
- **Primary (electric blue)** `#006FEE` — primary CTAs, links, the dominant glow/orb.
- **Primary-bright** `#3D7BFF` / `#9DC2EB` — gradient highs, glow falloff.

### Accents (gradient field + product surfaces — use deliberately, not as text)
- **Violet** `#9B5CFF`
- **Hot pink** `#F31260` (doubles as danger)
- **Teal** `#17C9A0` / green family
- **Amber** `#F5A524`

### Semantic / status (from the extension's agent chips)
- **Success / Done** `#17C964`
- **Running / Warning** `#F5A524`
- **Idle** `#3F3F46`
- **Danger / Revoked / `E_REVOKED`** `#F31260`

### Color rules
- Body text is `#FAFAFA` or `#A1A1AA` on near-black — verify ≥4.5:1 over the *actual*
  blurred orb backdrop, not the flat token. Never muted-gray body over a bright glow.
- Color strategy: **Committed**, leaning **Drenched** in the hero (one big blue moment).
  Don't hedge the hero with neutrals; commit to the blue field, then let sections breathe.
- Accents (violet/pink/teal) appear in the orb field and on a few product surfaces — they
  are voice, not decoration sprinkled per-card.
- **No gradient text** (`background-clip:text`). Gradient lives in backgrounds, orbs, glow,
  borders. Headline emphasis = weight + scale + one solid accent.

## Typography

Distinctive display + clean geometric body. **Not Inter** (extension UI font, and a
reflex-reject marketing default).

- **Display / headings:** **Clash Display** (Fontshare) — weights 500–700. Big, tight,
  confident. Used for hero, section headings, large numbers.
- **Body / UI:** **Satoshi** (Fontshare) — weights 400–700. Neutral, modern, legible.
- **Mono (on-chain data only):** **JetBrains Mono** — tx digests, code snippets, PTB
  calls, `E_REVOKED`. Never used decoratively.

### Scale & rules
- Modular scale, ratio ≥1.25. Headings use fluid `clamp()`.
- Hero display: `clamp(48px, 11vw, 132px)`, `line-height: .92`, `letter-spacing: -.035em`
  (display floor ≥ -0.04em). Cap display max ≤ ~8rem; don't shout past it.
- Body: 16–18px, `line-height` 1.5–1.6 (add ~0.05 for light-on-dark). Max line length 65–75ch.
- `text-wrap: balance` on h1–h3; `text-wrap: pretty` on prose.
- Weight/size contrast carries hierarchy — no all-caps body, no tracked-uppercase eyebrow
  repeated over every section.

## Shape & elevation

- **Radii:** cards/panels `24px`; hero/feature surfaces up to `32px`; pills `9999px`;
  icon buttons `12px`. (Matches extension tokens.)
- **Glass (purposeful only):** `background: rgba(24,24,27,0.5)`, `backdrop-filter: blur(16px)`,
  `border: 1px solid rgba(255,255,255,0.08)`. Reserve for hero/product mock surfaces — not
  every card. Never nest glass in glass.
- **Glow:** soft blue radial glow behind focal surfaces; box-shadow with blue at low alpha.
- Build a semantic z-index scale (field → grain → content → nav → cursor/toast). No 9999.

## Layout

- Container max-width `1200px`, side padding `clamp(20px, 5vw, 32px)`.
- Fluid vertical rhythm with `clamp()`; vary spacing for rhythm (generous between sections,
  tight within groups). One shared `<Section>` / `<Container>` shell — defined once, reused.
- Mobile-first; breakpoint ramp sm→md→lg only. Asymmetric/broken-grid moments are allowed
  for emphasis (hero, revoke demo). Avoid identical card grids; when cards are right, use
  `repeat(auto-fit, minmax(280px,1fr))`.
- Cards are the lazy answer — use only when truly the best affordance.

## Imagery & product visuals

- The product IS the imagery: extension UI mock (faithful to the real screens — black,
  blue glow, glass cards, agent chips), an animated propose→settle PTB diagram, and the
  revoke→`E_REVOKED` explorer-style log. These are first-class, not colored placeholders.
- Logo: `../Frontend/public/icon/pinace-logo.svg`. "Built on Sui" badge in nav/footer.
- Avoid stock photography; this is a software/protocol brand. Custom canvas/SVG/WebGL
  (orb field, particle hero, animated flows) is the imagery.

## Motion (bold kinetic — ported to GSAP + ScrollTrigger)

Motion vocabulary adapted from the approved reference (hugostawiarski.fr), recolored to
Pinace's blue-led palette and rebuilt with `@gsap/react` (`useGSAP`, scoped refs;
plugins registered once in `src/lib/gsap.ts`).

- **Drifting orb field:** fixed, blurred (`blur(70px) saturate(140%)`), `mix-blend:screen`
  radial orbs (blue, violet, pink, teal) slowly drifting; opacity ~.5; one orb follows the
  cursor with lerp. Reduced on mobile.
- **Grain overlay:** subtle SVG fractal-noise at ~5% opacity over the field.
- **Custom cursor:** small lerp-follow dot, `mix-blend:difference`, grows over interactive
  targets. Desktop only (`@media(hover:none)` → native cursor).
- **Intro loader:** brief brand reveal with text-up (`translateY(100%)→0`) + fill bar;
  skipped when navigating with a hash.
- **Hero:** line-by-line reveal (rows clip-overflow, `translateY(110%)→0`,
  `cubic-bezier(.16,1,.3,1)`); a "drenched blue" headline word; availability pulse dot.
- **Scroll:** thin top progress bar; `ScrollTrigger` reveals per section (staggered, each
  fit to its content — not one uniform fade on every block); number count-ups on enter.
- **Cards / product surfaces:** subtle 3D tilt on pointer-move (rAF-throttled).
- **Signature moments (the proof):** animated `propose_action → settle` PTB chain, and the
  `STOP → next tx → ✗ E_REVOKED` revert. These are the centerpieces; spend the motion budget here.
- **Easing:** ease-out exponential (quart/quint/expo). No bounce/elastic. Don't animate
  layout props. Premium materials (blur, glow, clip-path, mask) are in-palette when smooth.
- **Reduced motion:** every effect has a `prefers-reduced-motion` fallback (crossfade/instant);
  content is visible by default and never gated on a reveal class.

## Components (initial inventory)

shadcn/ui primitives, themed to the above (no hand-rolled equivalents):
`button` (primary blue / ghost / pill), `badge` (status: success/running/idle/danger +
"Built on Sui"), `card` (glass + solid variants), `accordion` (FAQ/dev), `tabs`
(users ↔ developers), `tooltip`, `avatar` (agent marks), `separator`. Section components
live in `build/src/components/sections/*`; shared shell in `build/src/components/common/*`.
