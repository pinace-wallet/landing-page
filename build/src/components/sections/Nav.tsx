"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Container } from "@/components/common/Container";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <Container className="flex h-[76px] items-center gap-6">
        <a href="#top" aria-label="Pinace home">
          <Logo />
        </a>

        <div className="flex flex-1 items-center justify-end gap-6 md:gap-8">
          <nav className="hidden items-center gap-8 md:flex">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href={site.chromeStoreUrl}
            aria-label="Add to Chrome"
            title="Add to Chrome"
            className="text-white/85 transition-colors hover:text-pinace-blue-bright"
          >
            <Download className="size-5" />
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span
            className={cn(
              "h-0.5 w-6 bg-white transition-transform",
              open && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn("h-0.5 w-6 bg-white transition-opacity", open && "opacity-0")}
          />
          <span
            className={cn(
              "h-0.5 w-6 bg-white transition-transform",
              open && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </Container>

      {/* mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-[-1] flex flex-col justify-center gap-2 bg-black/95 px-8 backdrop-blur-xl transition-transform duration-500 md:hidden",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        {site.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="font-heading border-b border-white/10 py-4 text-3xl font-semibold text-white"
          >
            {item.label}
          </a>
        ))}
        <a
          href={site.chromeStoreUrl}
          onClick={() => setOpen(false)}
          className={cn(
            buttonVariants(),
            "mt-6 h-14 rounded-full bg-primary text-base font-medium text-primary-foreground",
          )}
        >
          Add to Chrome
        </a>
      </div>
    </header>
  );
}
