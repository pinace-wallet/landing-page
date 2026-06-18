<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Pinace Landing Page — AI Working Rules (BINDING)

> Binding for **every AI pass** on this project (Impeccable commands, agents, manual edits).
> Goal: follow **one consistent pattern**, and **never introduce a competing or ad-hoc pattern**.
> If a task seems to need a new pattern, **stop and propose it** — do not silently invent one.

## 0. Golden rule
**Consistency over cleverness.** When in doubt, copy the pattern already used in the nearest
existing section/component. One way to do each thing. No parallel solutions to the same problem.

## 1. Stack — do not add alternatives
- **Next.js App Router + TypeScript**, `src/` dir, `@/*` alias. (Re-read the Next warning above before writing Next code.)
- **Tailwind v4** for all styling. No CSS Modules, styled-components, or inline `style={{}}` except dynamic/GSAP-driven values.
- **shadcn/ui** is the ONLY component primitive source. Need one? `npx shadcn add <x>`. Never hand-roll buttons/cards/badges/tabs/etc.
- **GSAP** (`@gsap/react`) is the ONLY animation lib. No framer-motion, react-spring, AOS, or one-off CSS keyframes for component motion.
- **No new dependency** unless justified against the above. Prefer zero-dep.

## 2. Design tokens — single source of truth
- All color/radius/font/spacing values come from `globals.css` tokens / `DESIGN.md`.
- **Never hardcode a hex/oklch in a component.** Missing token? Add it to `globals.css` first, then reference it.
- The Pinace theme is intentional — **keep it, never "clean it off"**: near-black canvas, primary blue, glassmorphism, large rounded cards, radial-blue gradients, status accents (green/amber/pink). Features, not slop.

## 3. Component & file patterns
- One section = one component: `src/components/sections/<Section>.tsx`, default-exported, named for the section (`Hero`, `HowItWorks`, `Features`, `RevokeDemo`, `Poc`, `Developers`, `SuiEcosystem`, `Roadmap`, `Team`, `FinalCta`).
- Shared blocks → `src/components/ui` (shadcn) or `src/components/common`.
- `src/app/page.tsx` only imports and orders sections — no markup logic.
- Explicit `type Props = {...}`. No `any`. Compose classes with `cn()` from `@/lib/utils` — no string concatenation.

## 4. Layout & spacing — reuse, don't reinvent
- Every section uses one shared shell (`<Section>` / `<Container>` in `common/`) for vertical rhythm and max-width. Define once, reuse. Don't re-declare padding/max-width per section.
- Mobile-first, same breakpoint ramp everywhere (sm → md → lg). No per-section breakpoints.

## 5. Motion pattern (GSAP)
- Always `useGSAP()` from `@gsap/react` with a scoped container ref. Never `gsap.to` in a bare `useEffect`.
- Register plugins (e.g. ScrollTrigger) once in `src/lib/gsap.ts`; import from there.
- Motion reserved for high-impact moments (hero, how-it-works, revoke demo, scroll reveals). Restraint is the pattern. Respect `prefers-reduced-motion`.

## 6. Content & copy
- Product facts, positioning, structure come from `../docs/landing-page-plan.md`. Do not invent product claims.
- Brand voice per `PRODUCT.md`: confident, security-credible, no hype-spam.

## 7. Before finishing any pass
- `npm run lint` clean, TypeScript clean, no unused imports, no stray console logs/TODOs.
- Re-read §1–§3 and confirm the single-pattern rule still holds.
