import { Mail, MapPin } from "lucide-react"

import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Olá! Vi seu portfólio e gostaria de conversar sobre um projeto."
)}`

export function Contact() {
  return (
    <section id="contato" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(39,103,187,0.22),rgba(7,11,26,0.9)_48%,rgba(241,196,15,0.12))] px-6 py-10 sm:px-10">
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
            Contato
          </p>
          <h2 className="mt-3 max-w-xl font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Vamos conversar sobre o próximo projeto
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">
            Disponível para freelance e produtos digitais. Novos repositórios
            públicos em{" "}
            <span className="text-white">{site.githubUsername}</span> passam a
            aparecer neste site automaticamente.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-300">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              {site.location}
            </span>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Mail className="size-4 text-primary" />
              {site.email}
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
            >
              <GitHubIcon className="size-4" data-icon="inline-start" />
              GitHub
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 px-5"
              )}
            >
              <LinkedInIcon className="size-4" data-icon="inline-start" />
              LinkedIn
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "h-11 px-5"
              )}
            >
              <WhatsAppIcon className="size-4" data-icon="inline-start" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
