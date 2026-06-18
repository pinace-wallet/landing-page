# Pinace Landing Page — Context Pack

Everything an AI agent needs to design and build the Pinace landing page lives here.
Point the agent at this folder (start with `docs/landing-page-plan.md`, then pull from
the reference + skills folders as needed).

## Folder map

| Folder | What goes in it |
|--------|-----------------|
| `docs/` | The plan, product context, copy, decisions. **Start here.** `landing-page-plan.md` is the source of truth. |
| `references/saved-pages/` | Saved HTML landing pages (the one you exported + any others) used as structural/style references. |
| `references/inspiration/` | Dribbble / Pinterest / live-site screenshots and links — visual mood and section ideas. |
| `references/extension/` | Screenshots of the current extension frontend + Figma exports (the brand/theme to match). |
| `brand/` | Logo files, color tokens, fonts chosen for the marketing site. |
| `skills/shadcn/` | shadcn/ui skill source / component snippets / docs to feed the agent. |
| `skills/gsap/` | GSAP skill source / animation recipes / docs. |
| `workflow/` | AI workflow notes: agent prompts, build order, which skill to use per section. |
| `assets/` | Working + final images, illustrations, exports produced during the build. |
| `build/` | The actual coded landing page output (React/Tailwind site or static HTML), once we start. |

## How an agent should use this
1. Read `docs/landing-page-plan.md` for product context, page structure, and brand tokens.
2. Match the **theme** from `references/extension/` + `brand/`; pick a fresh marketing font/vibe.
3. Use `skills/shadcn/` for structure/components, `skills/gsap/` for motion on the hero,
   how-it-works flow, and the 1-click-revoke moment.
4. Follow `workflow/` for the recommended build order and per-section skill choice.
