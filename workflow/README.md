# AI build workflow

Notes for driving the AI agents that build the landing page.

## Recommended build order
1. **Scaffold** the page structure + theme tokens (shadcn). Lock the 12 sections from
   `../docs/landing-page-plan.md`.
2. **Fill content** section by section using the plan's copy + reference pages.
3. **Layer motion** (GSAP) onto hero, how-it-works, and the revoke moment.
4. **Polish** — responsive passes, mobile "coming soon" states, performance.

## Per-section skill choice
- Structure / components → **shadcn** (Nav, Features, Developers, Team, Footer)
- Motion / wow → **GSAP** (Hero, How it works, Revoke demo, scroll reveals)

## Add here as you go
- Agent prompts that worked well
- Decisions made during the build
- Open questions / TODOs
