import Image from "next/image"
import { ArrowDown, MapPin } from "lucide-react"

import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import type { GithubProfile } from "@/lib/github"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Hero({ profile }: { profile: GithubProfile | null }) {
  const visibleRepos = profile
    ? Math.max(profile.publicRepos - site.hiddenRepos.length, 0)
    : 0

  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-white/10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(39,103,187,0.35),transparent_42%),radial-gradient(circle_at_90%_10%,rgba(241,196,15,0.16),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(7,11,26,1),rgba(7,11,26,1))]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="order-2 space-y-6 lg:order-1">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
            <span className="size-1.5 rounded-full bg-primary" />
            Sincronizado com github.com/{site.githubUsername}
          </p>
          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {site.name}
            </h1>
            <p className="text-lg text-zinc-300">{site.role}</p>
            <p className="max-w-xl text-base leading-7 text-zinc-400">
              {site.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" />
              {site.location}
            </span>
            {profile ? (
              <>
                <span className="text-white/20">·</span>
                <span>{visibleRepos} projetos no GitHub</span>
              </>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#projetos"
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
            >
              Ver projetos
              <ArrowDown data-icon="inline-end" />
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 px-5"
              )}
            >
              <GitHubIcon className="size-4" data-icon="inline-start" />
              GitHub
            </a>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl" />
            <div className="relative size-56 overflow-hidden rounded-full ring-4 ring-primary/70 shadow-[0_0_0_12px_rgba(7,11,26,0.8)] sm:size-72">
              <Image
                src={site.photo}
                alt={`Ilustração de ${site.name}`}
                width={420}
                height={420}
                priority
                className="size-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
