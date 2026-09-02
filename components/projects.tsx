import { GitBranch, RefreshCw } from "lucide-react"

import { ProjectCard } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { formatClock } from "@/lib/format"
import type { GithubPayload } from "@/lib/github"
import { site } from "@/lib/site"

export function Projects({ data }: { data: GithubPayload }) {
  const { projects, error, fetchedAt } = data

  return (
    <section id="projetos" className="scroll-mt-20 border-b border-white/10">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Badge variant="outline" className="border-primary/40 text-primary">
              <GitBranch />
              Ligado ao GitHub
            </Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Projetos
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
              Esta lista vem direto de{" "}
              <a
                href={site.socials.github}
                className="text-primary underline-offset-4 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                github.com/{site.githubUsername}
              </a>
              . Quando um repositório público novo for criado, ele aparece aqui
              na próxima atualização automática.
            </p>
          </div>
          <p className="inline-flex items-center gap-2 text-xs text-zinc-500">
            <RefreshCw className="size-3.5" />
            Consultado {formatClock(fetchedAt)} · a cada{" "}
            {Math.round(site.revalidateSeconds / 60)} min
          </p>
        </div>

        {error ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-5 py-6 text-sm text-zinc-200">
            <p className="font-medium text-white">Não foi possível sincronizar agora</p>
            <p className="mt-2 text-zinc-400">{error}</p>
          </div>
        ) : null}

        {!error && projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.04] px-5 py-12 text-center">
            <p className="text-base font-medium text-white">
              Nenhum projeto público ainda
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
              Crie um repositório público no GitHub. Em poucos minutos ele
              entra nesta grade, com nome, linguagem e link para o código.
            </p>
          </div>
        ) : null}

        {projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
