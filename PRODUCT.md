# Product

## Register

brand

## Users

Two audiences, one page:

1. **Crypto end-users** — people on Sui who want AI agents to trade/act for them
   (DCA, swaps, yield) *without* surrendering custody. They've been burned by, or
   are scared of, "approve-all" wallets and drained agents. They arrive skeptical:
   the page must earn trust fast and prove control is real, on-chain, and one-click.
2. **Agent & dApp developers** — builders who want a standard, safe way to let their
   agents touch user funds. They care about the SDK, the policy model, and shipping a
   policy to the marketplace. They scan for code, primitives, and proof it's real.

Context of use: desktop browser (they install a Chrome extension), often arriving from
a hackathon/X/Sui-ecosystem link. Mobile visitors exist but the app is not shipped yet.

## Product Purpose

Pinace is the **Autonomous Agent Wallet on Sui** — a non-custodial wallet (browser
extension today, mobile soon) that lets users delegate on-chain actions to AI agents
within limits enforced by Move smart contracts, not by trust.

The core promise: **you give an agent a budget and a rulebook, not your private key.**
Assets sit in an on-chain BalancePool; a Policy object caps budget, scope, tokens,
slippage, and expiry; every agent action runs as a hot-potato PTB (`propose_action →
settle`) that the chain reverts if it breaks the rules; and the owner can revoke in one
click, after which the agent's next transaction fails on-chain with `E_REVOKED`.

Success = a skeptical visitor installs the extension (or joins the mobile waitlist), and
a developer leaves wanting to read the SDK docs. The page must make "AI trades, you stay
in control" feel obviously, verifiably true.

## Brand Personality

Three words: **kinetic · credible · in-control.**

- **Voice:** confident and precise. Security-credible without fear-mongering; energetic
  without hype-spam. Speaks plainly about a technical guarantee ("the chain enforces it")
  rather than vague "next-gen / revolutionary" filler.
- **Emotional goal:** the visitor should feel *relief and control* — "I can finally let an
  agent work for me and still hold the kill switch." Motion conveys aliveness and capability;
  the copy conveys safety.
- This is a **bold kinetic** brand: big confident display type, drenched-blue hero moments,
  and motion that demonstrates the product (propose→settle, revoke→revert) rather than
  decorating it.

## Anti-references

- **Generic "AI crypto SaaS" slop** — the first-order reflex for this exact category
  (dark + blue + glass cards + gradient-text everywhere + three identical feature cards +
  tiny uppercase eyebrows over every section). The whole point is to NOT look like every
  other Sui/agent/wallet launch page.
- **Fear-mongering security theater** — padlock icons, red alarms, "BANK-GRADE" badges.
- **Hype-token aesthetics** — moonboy gradients, coin-spam, ticker noise, fake "$10B
  volume" hero metrics with no substance.
- **Timid restraint** — beige/slate minimalism, no motion, no POV. Safe = invisible here.
- **Mono-as-costume** — monospace sprayed everywhere to look "technical." Mono is allowed
  ONLY for real on-chain data (tx digests, code, `E_REVOKED`, PTB calls), never as decoration.

### Reconciliation note (identity vs. Impeccable bans)
Impeccable's absolute bans flag glassmorphism-as-default and gradient-text. Pinace's
shipped extension identity *is* glass + electric blue + multi-color radial gradients on
black — so **identity-preservation wins on palette**, but the bans still apply to *usage*:
- Glass is used **purposefully** (a few hero/product surfaces), not on every card.
- Gradient is carried by **backgrounds, orbs, and glow** — not by `background-clip:text`
  on headlines. Emphasis comes from weight/scale and one drenched-blue moment.
- The marketing font is **NOT** the extension's Inter (a reflex-reject default); pick a
  distinctive display+body pairing (see DESIGN.md).

## Design Principles

1. **Show the guarantee, don't claim it.** The revoke→`E_REVOKED` revert and the
   propose→settle flow are demonstrated with real-looking on-chain motion, not asserted in
   a bullet. Motion is proof, not polish.
2. **Control is the feeling.** Every section should reinforce "you hold the kill switch."
   When in doubt, lead with the user's authority, not the agent's autonomy.
3. **Credible over loud.** Energetic and bold, but every claim is backed by a real
   mechanism (BalancePool, hot-potato PTB, Move policy, Sui-native primitives). No empty hype.
4. **Two doors, one house.** Users and developers both find their path without the page
   splitting personality. Dev proof (SDK/code) deepens trust for users too.
5. **Faithful, not a clone.** Honor the extension's vibrant-glass-on-black identity and
   the kinetic motion the team loves — but as a distinctive marketing surface, not a copy
   of the extension UI or of the category's default landing page.

## Accessibility & Inclusion

- WCAG 2.1 AA targets: body text ≥4.5:1, large text ≥3:1, including on glass/gradient
  surfaces (verify against the actual blurred backdrop, not the token in isolation).
- `prefers-reduced-motion`: every animation needs a reduced alternative (crossfade or
  instant). Reveals must enhance already-visible content — never gate visibility on a
  scroll/transition class, or sections ship blank to crawlers and reduced-motion users.
- Custom cursor and heavy motion must not trap keyboard users or hide focus states;
  keep real focus rings and full keyboard nav.
- Mobile visitors get a coherent (lighter-motion) experience even though the app isn't shipped.
