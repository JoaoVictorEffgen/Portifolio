import { site } from "@/lib/site"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {year} {site.name}. Todos os direitos reservados.
        </p>
        <p>Projetos atualizados automaticamente a partir do GitHub.</p>
      </div>
    </footer>
  )
}
