"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const links = [
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b1a]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="font-heading text-sm font-semibold tracking-wide text-white">
          {site.shortName}
          <span className="ml-2 hidden text-primary sm:inline">.dev</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.socials.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ size: "sm" }), "px-3")}
          >
            GitHub
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-white/10 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
              onClick={() => setOpen(false)}
            >
              Abrir GitHub
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
