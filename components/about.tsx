import { Badge } from "@/components/ui/badge"
import type { Skill } from "@/lib/github"
import { site } from "@/lib/site"

export function About({ skills }: { skills: Skill[] }) {
  return (
    <section id="sobre" className="scroll-mt-20 border-b border-white/10">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:py-20">
        <div className="space-y-5">
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
            Sobre
          </p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Criando produtos digitais com processo e resultado
          </h2>
          {site.about.map((paragraph) => (
            <p key={paragraph} className="max-w-2xl text-base leading-7 text-zinc-400">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-sm font-medium tracking-wide text-white uppercase">
            Stack no GitHub
          </h3>
          <p className="mt-2 text-xs text-zinc-500">
            Linguagens detectadas nos repositórios públicos, atualizadas junto com os projetos.
          </p>
          <ul className="mt-5 space-y-3">
            {skills.map((skill) => (
              <li
                key={skill.name}
                className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0"
              >
                <span className="text-sm text-zinc-200">{skill.name}</span>
                <Badge variant="secondary">{skill.level}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
