# Pinace Landing Page — Plan & Product Context

> Source of truth for designing and building the Pinace product landing page.
> Compiled from the repo's system design docs, frontend domain model, and brand tokens.

---

## 1. What Pinace is

**Pinace — the Autonomous Agent Wallet on Sui.** A non-custodial wallet (today a
browser extension) that lets people safely delegate on-chain actions to AI agents,
with hard limits enforced by Move smart contracts — not by trust.

**The core message:** you give an AI agent a *budget and a rulebook*, not your private
key. The agent can trade for you 24/7, but the blockchain itself refuses any action
that breaks your rules, and you can kill its access in one click.

### How it's safe (the mechanism)
- **BalancePool** — deposit assets into an escrow once; the agent only ever touches the
  pool, never your main wallet.
- **Policy objects** — on-chain rules: budget ceiling, token whitelist, allowed actions
  (swap / stake), slippage guard, time window / expiry.
- **Hot-potato PTB** — every agent action is `propose_action → settle` in one atomic
  transaction; violate the policy and the *whole thing reverts* on-chain.
- **1-click revoke** — hero demo: hit STOP and the agent's next transaction fails
  on-chain with `E_REVOKED`.
- **Track progress** — an indexer feeds a milestone timeline of every action
  (success / reverted / pending) with explorer links.

### Built on Sui-native primitives
zkLogin (Google/Apple sign-in) · Enoki (gasless / sponsored tx) · DeepBook v3
(reference DCA agent) · Walrus (audit log) · Pyth (price oracle) · Seal · Sui Wallet
Standard.

### Audiences
1. **Crypto end-users** — want automated / AI trading without losing custody.
2. **Agent & dApp developers** — build and publish policies to the marketplace via the SDK.

### Product status (reflect on the page)
- Browser extension — **live now** (primary install CTA).
- Mobile app — **coming soon** (waitlist optional).
- Team — **4 people**: Hulk, Wyner, John, Ikaris.
- Reference agent — DCA on DeepBook v3.

---

## 2. Page direction (decided)

- **Goal:** standard product landing page. Primary CTA = **Install** (Chrome extension
  live now + mobile "coming soon").
- **Audience:** both end-users and developers on one page.
- **Visual:** keep the extension's **theme** (dark base, blue `#006fee`, success green,
  glass, big rounded cards) but free to pick a **fresh marketing font + vibe** — more
  expressive than the extension's Inter UI.

---

## 3. Section-by-section structure

| # | Section | What it shows |
|---|---------|---------------|
| 1 | **Nav** | Logo · anchors (How it works · Features · Developers · Team) · "Add to Chrome" button · "Built on Sui" badge |
| 2 | **Hero** | Hook: *"Let AI trade for you — without handing over your keys."* Sub: budget + rules enforced on-chain. CTAs: Install extension + Mobile coming soon. Visual: extension UI mock / animated agent flow |
| 3 | **The problem** | AI agents need to act without you signing every tx — but giving up keys = drained wallets. Pinace's answer: delegate a budget, not custody |
| 4 | **How it works** | 3–4 steps: Deposit to BalancePool → Set Policy (budget/scope/expiry) → Agent acts within bounds → Revoke anytime. Diagram of `propose_action → settle` |
| 5 | **Features grid** | On-chain policy guardrails · BalancePool (keys never leave) · Audit / milestone timeline · Gasless (Enoki) · zkLogin sign-in · Policy marketplace |
| 6 | **The special thing** ⭐ | 1-click revoke hero moment: STOP → next agent tx reverts on-chain with `E_REVOKED`, shown on Sui explorer. "You're always in control" |
| 7 | **POC in action** | DCA-on-DeepBook reference agent: *"Swap 100 SUI → USDC, max 12% slippage, over 1 day"* → executes within policy |
| 8 | **For developers** | SDK snippet (`proposeAction` / `settle`), three-tier SDK (wallet / agent / MCP), publish policies to marketplace. CTA: Read the docs |
| 9 | **Sui ecosystem** | Sui Wallet Standard, built on Sui-native primitives (DeepBook, Walrus, Seal, Pyth, zkLogin, Enoki) — protocol-agnostic / non-custodial credibility |
| 10 | **Roadmap / mobile** | Extension = live · Mobile app — coming soon (waitlist optional) · more policy types ahead |
| 11 | **Team** | 4 members: Hulk, Wyner, John, Ikaris with roles |
| 12 | **Final CTA + footer** | "Install Pinace" + mobile waitlist · GitHub · docs · socials |

---

## 4. Brand tokens (pulled from the extension)

Reuse the **theme**; choose a fresh marketing **font/vibe**.

| Token | Value |
|-------|-------|
| Background | `#000000` (near-black canvas) |
| Primary | `#006fee` (blue) |
| Success | `#17c964` (green) |
| Warning | `#f5a524` (amber) |
| Danger | `#f31260` (pink) |
| Muted text | `#a1a1aa` / `#52525b` |
| Card bg (glass) | `rgba(24,24,27,0.5)` / `rgba(255,255,255,0.05)` |
| Card radius | 24–32px |
| Pill radius | 9999px |
| UI font (extension) | Inter (marketing site may differ) |
| Mono | Menlo / ui-monospace |
| Balance gradient | radial `#000 → #031e3e → #006fee → #9dc2eb` |
| Agents gradient | radial `#b8d2fe → #006fee → #000` |

**Visual language:** dark canvas, radial-blue gradients, glassmorphism, large rounded
cards, status accents.

**Logo:** `Frontend/public/icon/pinace-logo.svg`

---

## 5. Reference snippets

### Agent SDK usage (for the developer section)
```ts
const pinace = new PinaceClient({ signer: agentSigner, network: "mainnet" });

const receipt = await pinace.proposeAction({
  poolId: userPoolId,
  action: { type: "swap", fromToken: "SUI", toToken: "USDC", amount: 100 },
});

await pinace.settle(receipt);
```

### Three-tier SDK
| Tier | Package | Audience |
|------|---------|----------|
| 1 | `@pinace/wallet-sdk` | End-user wallet apps (extension, mobile) |
| 2 | `@pinace/agent-sdk` | Agent builders (LangChain, AutoGen, Eliza) |
| 3 | `@pinace/mcp-server` | LLM tool use (Claude, GPT) — MCP compliant |

---

## 6. Source references (in-repo)
- `Frontend/docs/human/Pinace-System-Design-Specifications`
- `Frontend/docs/human/Pinace-Research-Design-Hub-Sub-track-2`
- `Frontend/docs/human/Pinace-System-Draft-Design`
- `Frontend/types/domain.ts` (Agent, Policy, BalancePool, Milestone models)
- `Frontend/entrypoints/popup/globals.css` (brand tokens)
- `backend/README.md` (indexer + REST API surface)
- `pinace-sdk/README.md` (SDK packages)
