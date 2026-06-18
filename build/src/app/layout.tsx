import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Atmosphere } from "@/components/common/Atmosphere";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pinace.xyz"),
  title: "Pinace — Let AI trade for you, without handing over your keys",
  description:
    "Pinace is the autonomous agent wallet on Sui. Delegate a budget and a rulebook to AI agents — limits enforced by Move smart contracts, revocable in one click. Non-custodial by design.",
  keywords: [
    "Pinace",
    "Sui wallet",
    "AI agent wallet",
    "autonomous agent",
    "non-custodial",
    "DeFi",
    "DeepBook",
    "agent delegation",
  ],
  openGraph: {
    title: "Pinace — The Autonomous Agent Wallet on Sui",
    description:
      "Give an AI agent a budget and a rulebook, not your private key. On-chain limits, one-click revoke.",
    type: "website",
    siteName: "Pinace",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinace — The Autonomous Agent Wallet on Sui",
    description:
      "Give an AI agent a budget and a rulebook, not your private key. On-chain limits, one-click revoke.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin=""
        />
        <link
          href="https://api.fontshare.com/v2/css?f%5B%5D=clash-display@400,500,600,700&f%5B%5D=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative min-h-dvh antialiased">
        <Atmosphere />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
