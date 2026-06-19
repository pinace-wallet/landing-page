import { Loader } from "@/components/common/Loader";
import { FloatCta } from "@/components/common/FloatCta";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Model from "@/components/sections/Model";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import Capabilities from "@/components/sections/Capabilities";
import RevokeDemo from "@/components/sections/RevokeDemo";
import Poc from "@/components/sections/Poc";
import UseCases from "@/components/sections/UseCases";
import Ideas from "@/components/sections/Ideas";
import Ecosystem from "@/components/sections/Ecosystem";
import Developers from "@/components/sections/Developers";
import MobileBand from "@/components/sections/MobileBand";
import Faq from "@/components/sections/Faq";
import Team from "@/components/sections/Team";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <div className="relative z-10 -mt-[clamp(100px,14vw,200px)] bg-[#05070f]/85 shadow-[0_-30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md">
          {/* Wave decoration overlapping the hero boat logo */}
          <div className="absolute left-0 right-0 top-0 z-20 h-[clamp(60px,9vw,120px)] w-full -translate-y-[98%] pointer-events-none overflow-hidden select-none">
            {/* Background wave with soft brand/glow fills */}
            <svg
              className="absolute left-0 top-0 h-full w-[200%] wave-animation-slow"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="wave-grad-bg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#006FEE" stopOpacity="0.02" />
                  <stop offset="50%" stopColor="#9B5CFF" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#006FEE" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path
                d="M 0,60 C 150,20 150,100 300,60 C 450,20 450,100 600,60 C 750,20 750,100 900,60 C 1050,20 1050,100 1200,60 L 1200,120 L 0,120 Z"
                fill="url(#wave-grad-bg)"
              />
            </svg>

            {/* Foreground wave - solid background color with glowing neon crest line */}
            <svg
              className="absolute left-0 top-0 h-full w-[200%] wave-animation-fast"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="wave-grad-fg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#006FEE" stopOpacity="0.2" />
                  <stop offset="30%" stopColor="#3D7BFF" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#9B5CFF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#006FEE" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M 0,70 C 150,40 150,100 300,70 C 450,40 450,100 600,70 C 750,40 750,100 900,70 C 1050,40 1050,100 1200,70 L 1200,120 L 0,120 Z"
                fill="#05070f"
                stroke="url(#wave-grad-fg)"
                strokeWidth="2"
              />
            </svg>
          </div>
          <Products />
          <Model />
          <HowItWorks />
          <Features />
          <Capabilities />
          <RevokeDemo />
          <UseCases />
          <Poc />
          <Ideas />
          <Ecosystem />
          <Developers />
          <MobileBand />
          <Faq />
          <Team />
          <FinalCta />
        </div>
      </main>
      <Footer />
      <FloatCta />
    </>
  );
}
