// Single source of content for the landing page (AGENTS.md §6).
// Product facts come from ../../docs/landing-page-plan.md — do not invent claims.

export const site = {
  name: "Pinace",
  tagline: "The Autonomous Agent Wallet on Sui",
  chromeStoreUrl: "#install",
  docsUrl: "#developers",
  githubUrl: "https://github.com/pinace-wallet",
  nav: [
    { label: "How it works", href: "#how" },
    { label: "Features", href: "#features" },
    { label: "Developers", href: "#developers" },
    { label: "Team", href: "#team" },
  ],
} as const;

export const hero = {
  badge: "Built on Sui",
  status: "Extension live on Chrome",
  // headline is rendered as reveal rows; last word is the drenched-blue accent.
  headlineRows: ["Let AI trade", "for you — without", "handing over"],
  headlineAccent: "your keys.",
  sub: "Pinace lets you delegate a budget and a rulebook to AI agents. The limits are enforced by Move smart contracts on-chain — and you can revoke access in one click.",
  primaryCta: { label: "Add to Chrome", href: "#install" },
  secondaryCta: { label: "Watch it work", href: "#how" },
} as const;

export const steps = [
  {
    n: "01",
    title: "Deposit to a BalancePool",
    body: "Fund an on-chain escrow once. Agents only ever touch the pool — never your main wallet.",
  },
  {
    n: "02",
    title: "Set the policy",
    body: "Cap budget, allowed tokens, action types, slippage and expiry. The rulebook lives on-chain.",
  },
  {
    n: "03",
    title: "The agent acts within bounds",
    body: "Every action runs as a hot-potato PTB: propose_action → settle. Break a rule and the whole tx reverts.",
  },
  {
    n: "04",
    title: "Revoke anytime",
    body: "One click burns the agent's authority. Its next transaction fails on-chain with E_REVOKED.",
  },
] as const;

export const features = [
  {
    title: "On-chain policy guardrails",
    body: "Budget ceilings, token whitelists, slippage guards and expiry windows — enforced by Move, not by trust.",
  },
  {
    title: "BalancePool escrow",
    body: "Your keys never leave your wallet. Agents operate inside a bounded pool you fund and own.",
  },
  {
    title: "One-click revoke",
    body: "Kill an agent's access instantly. The next propose_action reverts with E_REVOKED on Sui.",
  },
  {
    title: "Audit timeline",
    body: "An indexer streams every action — success, reverted, pending — with explorer links you can verify.",
  },
  {
    title: "Gasless via Enoki",
    body: "Agent transactions are sponsored, so automation runs without you topping up gas every time.",
  },
  {
    title: "zkLogin sign-in",
    body: "Onboard with Google or Apple. A Sui address, no seed phrase to lose on day one.",
  },
] as const;

export const suiPrimitives = [
  "Sui Wallet Standard",
  "DeepBook v3",
  "Walrus",
  "Seal",
  "zkLogin",
  "Enoki",
  "Pyth",
] as const;

export const team = [
  { name: "Hulk", role: "Wallet UI · Contracts · Market" },
  { name: "Wyner", role: "Contracts · Indexer · Agent SDK" },
  { name: "John", role: "SDK · Indexer" },
  { name: "Ikaris", role: "SDK integration · Wallet UI" },
] as const;

export const sdkTiers = [
  { pkg: "@pinace/wallet-sdk", who: "End-user wallet apps (extension, mobile)" },
  { pkg: "@pinace/agent-sdk", who: "Agent builders (LangChain, AutoGen, Eliza)" },
  { pkg: "@pinace/mcp-server", who: "LLM tool use (Claude, GPT) — MCP compliant" },
] as const;

export const sdkSnippet = `const pinace = new PinaceClient({ signer: agentSigner, network: "mainnet" });

const receipt = await pinace.proposeAction({
  poolId: userPoolId,
  action: { type: "swap", fromToken: "SUI", toToken: "USDC", amount: 100 },
});

await pinace.settle(receipt);`;

export const modelStats = [
  { to: 1, suffix: " click", label: "to revoke an agent" },
  { to: 100, suffix: "%", label: "on-chain enforcement" },
  { to: 0, suffix: "", label: "keys ever shared" },
] as const;

// Core features rendered as 3D tilt cards (mirrors the reference's services grid).
export const featureCards = [
  {
    n: "01",
    tone: "blue" as const,
    kicker: "Enforcement",
    title: "On-chain policy guardrails",
    body: "Budget ceilings, token whitelists, slippage guards and expiry windows — checked by Move on every action, not by trust.",
    tags: ["Budget", "Whitelist", "Slippage", "Expiry"],
  },
  {
    n: "02",
    tone: "teal" as const,
    kicker: "Custody",
    title: "BalancePool escrow",
    body: "Your keys never leave your wallet. Agents operate inside a bounded pool you fund and own — and nothing else.",
    tags: ["Non-custodial", "Owned", "Bounded"],
  },
  {
    n: "03",
    tone: "pink" as const,
    kicker: "Control",
    title: "One-click revoke",
    body: "Kill an agent's authority instantly. Its next propose_action reverts with E_REVOKED on Sui — verifiable on the explorer.",
    tags: ["Instant", "On-chain", "E_REVOKED"],
  },
  {
    n: "04",
    tone: "violet" as const,
    kicker: "Frictionless",
    feature: true,
    title: "Audit timeline, gasless, zkLogin",
    body: "An indexer streams every action with explorer links. Agent transactions are sponsored via Enoki, and you sign in with zkLogin — a Sui address, no seed phrase.",
    tags: ["Audit log", "Gasless · Enoki", "zkLogin", "Indexed"],
  },
] as const;

// Capability columns (mirrors the reference's "domaines" 3-column lists).
export const capabilities = [
  {
    tone: "blue" as const,
    title: "Agent actions",
    items: [
      "Swap on DeepBook v3",
      "Dollar-cost-average (DCA)",
      "Limit & market orders",
      "Stake and manage positions",
      "Rebalance within a budget",
      "Bounded, repeatable strategies",
    ],
  },
  {
    tone: "teal" as const,
    title: "Policy controls",
    items: [
      "Per-tx & daily budget caps",
      "Token allow-lists",
      "Allowed action types",
      "Max slippage guard",
      "Time window & expiry",
      "Composable policy templates",
    ],
  },
  {
    tone: "pink" as const,
    title: "Safety guarantees",
    items: [
      "Hot-potato PTB settlement",
      "Atomic propose → settle",
      "Whole-tx revert on violation",
      "One-click on-chain revoke",
      "Bounded blast radius",
      "Full indexed audit trail",
    ],
  },
] as const;

// Use-case rows with hover-peek + modal (mirrors the reference's projects list).
export const useCases = [
  {
    k: "DeepAge",
    tone: "pink" as const,
    img: "/agents/app-detail.png",
    avatar: "/agents/deepage.svg",
    tag: "DCA on DeepBook v3 · the reference agent",
    meta: "DCA · DeepBook",
    desc: "The flagship POC. Tell it: \"Swap 100 SUI to USDC, max 12% slippage, over 1 day.\" It executes DCA orders on DeepBook v3 inside a policy you set — and you watch every fill on the timeline.",
    tags: ["DeepBook v3", "OpenAI", "DCA", "Pyth"],
  },
  {
    k: "KuanQue",
    tone: "teal" as const,
    img: "/agents/app-agents.png",
    avatar: "/agents/kuanque.svg",
    tag: "Range rebalancer, bounded by policy",
    meta: "Rebalance",
    desc: "A liquidity agent that rebalances a position within budget and slippage limits. When the job is done, its status flips to Done — and you can revoke at any point.",
    tags: ["Rebalance", "Bounded", "Policy"],
  },
  {
    k: "MBO",
    tone: "blue" as const,
    img: "/agents/app-home.png",
    avatar: "/agents/mbo.svg",
    tag: "Idle until you delegate, never before",
    meta: "On-demand",
    desc: "An agent only acts when you've delegated a pool and policy. Idle by default, it can never touch funds outside its bounds — the wallet shows exactly what it's allowed to do.",
    tags: ["On-demand", "Scoped", "Revocable"],
  },
] as const;

// The three core products — each with the painpoint it kills + the breakthrough.
export const products = [
  {
    tone: "blue" as const,
    tag: "Wallet · Browser extension",
    title: "The Wallet",
    pain: "Letting an AI agent trade means giving up your keys or signing every transaction.",
    breakthrough:
      "A non-custodial wallet to connect an agent, set its policy, watch a live milestone timeline, and revoke in one click.",
    special: "Sui Wallet Standard · zkLogin onboarding · live on Chrome",
    points: ["Connect & scope agents", "Track progress on-chain", "1-click revoke"],
    asset: "/agents/app-agents.png",
  },
  {
    tone: "violet" as const,
    tag: "Protocol · Move contracts",
    title: "The Protocol",
    pain: "Sui has no allowance or session keys — agents can't get bounded authority natively.",
    breakthrough:
      "BalancePool escrow + Policy objects + a hot-potato PTB where the compiler itself enforces the budget. Revocation is one on-chain tx.",
    special: "Protocol-agnostic — gates ANY Sui Move call",
    points: ["BalancePool escrow", "propose → settle, atomic", "E_REVOKED on revoke"],
    asset: "/agents/app-detail.png",
  },
  {
    tone: "teal" as const,
    tag: "SDK · TypeScript",
    title: "The SDK",
    pain: "Builders need a standard, safe way to make agents act and to ship reusable policies.",
    breakthrough:
      "A three-tier SDK (wallet · agent · MCP). proposeAction → settle in a few lines, and publish a policy to the marketplace.",
    special: "MCP-compliant for LLM tool use (Claude, GPT)",
    points: ["@pinace/agent-sdk", "MCP server", "Publish policies"],
    asset: "/agents/app-activity.png",
  },
] as const;

// Ideas developers can build on the protocol.
export const ideas = [
  { icon: "📈", title: "DCA & TWAP bots", body: "Schedule bounded buys across DeepBook, hands-off." },
  { icon: "⚖️", title: "Yield rebalancers", body: "Keep an LP position in range, within a budget." },
  { icon: "🛡️", title: "Stop-loss guardian", body: "An agent that only ever exits — never adds risk." },
  { icon: "💸", title: "Payroll & subscriptions", body: "Streaming payments capped by policy and time." },
  { icon: "🏦", title: "Treasury management", body: "Delegate idle treasury to a scoped strategy agent." },
  { icon: "🔁", title: "Copy-trading", body: "Mirror a strategy with your own budget ceiling." },
  { icon: "🤖", title: "MCP tool for LLMs", body: "Give Claude or GPT a revocable on-chain wallet." },
  { icon: "🛒", title: "Agentic checkout (AP2)", body: "Intent → cart → payment, bounded on-chain." },
] as const;

export const faqs = [
  {
    q: "Do I give the agent my private key?",
    a: "No. You fund a BalancePool and attach a policy. The agent acts inside that pool via a session key — your main key never leaves your wallet.",
  },
  {
    q: "What happens when I revoke?",
    a: "Revocation is one on-chain transaction. The agent's authority is burned and its next propose_action reverts with E_REVOKED — visible on the Sui explorer.",
  },
  {
    q: "How are limits actually enforced?",
    a: "Every action runs as a hot-potato PTB: propose_action → settle in one atomic transaction. If it breaks budget, scope, slippage or expiry, the whole transaction reverts.",
  },
  {
    q: "Is there a mobile app?",
    a: "The browser extension is live today. A mobile app is coming soon — join the waitlist below and we'll let you know.",
  },
  {
    q: "Can I build my own policy or agent?",
    a: "Yes. The Pinace SDK ships a three-tier surface (wallet, agent, MCP). Developers can write a policy contract and publish it to the marketplace.",
  },
  {
    q: "Which networks and protocols are supported?",
    a: "Pinace is protocol-agnostic and gates any Sui Move call. The reference agent trades on DeepBook v3, with Walrus, Seal, Pyth, zkLogin and Enoki in the stack.",
  },
] as const;

