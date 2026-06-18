import { Logo } from "@/components/common/Logo";
import { Container } from "@/components/common/Container";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-14">
      <Container>
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[15px] leading-relaxed text-white/50">
              The autonomous agent wallet on Sui. Delegate a budget and a rulebook — never
              your keys.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] font-medium text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-pinace-blue" />
              Built on Sui
            </span>
          </div>

          <nav className="flex gap-14">
            <div className="flex flex-col gap-3">
              <span className="text-[13px] uppercase tracking-wide text-white/35">
                Product
              </span>
              {site.nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-[15px] text-white/65 transition-colors hover:text-white"
                >
                  {n.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[13px] uppercase tracking-wide text-white/35">
                Resources
              </span>
              <a
                href={site.githubUrl}
                className="text-[15px] text-white/65 transition-colors hover:text-white"
              >
                GitHub
              </a>
              <a
                href={site.docsUrl}
                className="text-[15px] text-white/65 transition-colors hover:text-white"
              >
                Docs
              </a>
              <a
                href="#waitlist"
                className="text-[15px] text-white/65 transition-colors hover:text-white"
              >
                Mobile waitlist
              </a>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-7 text-[13px] text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} Pinace · Non-custodial by design</span>
          <span>Sui · Extension live · Mobile soon</span>
        </div>
      </Container>
    </footer>
  );
}
