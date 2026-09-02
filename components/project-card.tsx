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
import { formatRelativeDate, prettyRepoName } from "@/lib/format"
import type { Project } from "@/lib/github"
import { cn } from "@/lib/utils"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full bg-white/[0.04] ring-white/10 transition-colors hover:bg-white/[0.07]">
      <div className="relative aspect-[1200/630] overflow-hidden border-b border-white/10 bg-[#0b1228]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`Prévia do repositório ${project.name}`}
          className="h-full w-full object-cover object-top"
        />
        {project.featured ? (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Destaque
          </Badge>
        ) : null}
      </div>

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
