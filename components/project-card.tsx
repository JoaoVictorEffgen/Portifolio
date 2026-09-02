import { ExternalLink, Star } from "lucide-react"

import { GitHubIcon } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { languageAccent, formatRelativeDate, prettyRepoName } from "@/lib/format"
import type { Project } from "@/lib/github"
import { cn } from "@/lib/utils"

function ProjectCover({ project }: { project: Project }) {
  const title = prettyRepoName(project.name)
  const accent = languageAccent(project.language)

  return (
    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-[#070b1a]">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${accent.from}2e 0%, #070b1a 46%, ${accent.to}24 100%)`,
        }}
      />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div
        className="absolute -right-10 -top-16 size-48 rounded-full blur-3xl"
        style={{ background: accent.from, opacity: 0.18 }}
      />
      <div
        className="absolute -bottom-16 -left-8 size-44 rounded-full blur-3xl"
        style={{ background: accent.to, opacity: 0.16 }}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-3">
          {project.featured ? (
            <Badge className="bg-primary text-primary-foreground">Destaque</Badge>
          ) : (
            <span />
          )}
          {project.language ? (
            <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[11px] font-medium tracking-wide text-zinc-200 uppercase">
              {project.language}
            </span>
          ) : null}
        </div>
        <div>
          <p className="font-heading text-2xl font-semibold tracking-tight text-white">
            {title}
          </p>
          <p className="mt-1 line-clamp-1 text-sm text-zinc-400">
            {project.description ?? "Projeto público no GitHub"}
          </p>
        </div>
      </div>
    </div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full bg-white/[0.04] ring-white/10 transition-colors hover:bg-white/[0.07]">
      <ProjectCover project={project} />

      <CardHeader>
        <CardTitle className="text-lg text-white">
          {prettyRepoName(project.name)}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-zinc-400">
          {project.description ??
            "Repositório público no GitHub. Adicione uma descrição no repo para ela aparecer aqui."}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto flex flex-wrap items-center gap-2">
        {project.language ? (
          <Badge variant="secondary">{project.language}</Badge>
        ) : null}
        {project.topics
          .filter((topic) => topic !== "portfolio")
          .slice(0, 3)
          .map((topic) => (
            <Badge key={topic} variant="outline" className="capitalize">
              {topic}
            </Badge>
          ))}
        {project.stars > 0 ? (
          <span className="ml-auto inline-flex items-center gap-1 text-xs text-zinc-400">
            <Star className="size-3.5 fill-primary text-primary" />
            {project.stars}
          </span>
        ) : null}
      </CardContent>

      <CardFooter className="justify-between gap-3 bg-transparent">
        <span className="text-xs text-zinc-500">
          Atualizado {formatRelativeDate(project.updatedAt)}
        </span>
        <div className="flex items-center gap-3">
          <a
            href={project.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-white"
            )}
          >
            <GitHubIcon className="size-4" />
            Código
          </a>
          {project.homepage ? (
            <a
              href={project.homepage}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <ExternalLink className="size-4" />
              Demo
            </a>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  )
}
