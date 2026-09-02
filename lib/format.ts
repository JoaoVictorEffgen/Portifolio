const relative = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" })

export function formatRelativeDate(isoDate: string) {
  const then = new Date(isoDate).getTime()
  if (Number.isNaN(then)) return ""

  const diffMs = then - Date.now()
  const minutes = Math.round(diffMs / 60_000)
  const hours = Math.round(diffMs / 3_600_000)
  const days = Math.round(diffMs / 86_400_000)
  const months = Math.round(days / 30)
  const years = Math.round(days / 365)

  if (Math.abs(minutes) < 60) return relative.format(minutes, "minute")
  if (Math.abs(hours) < 24) return relative.format(hours, "hour")
  if (Math.abs(days) < 30) return relative.format(days, "day")
  if (Math.abs(months) < 12) return relative.format(months, "month")
  return relative.format(years, "year")
}

export function formatClock(isoDate: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(isoDate))
}

export function prettyRepoName(name: string) {
  const aliases: Record<string, string> = {
    nexo: "Nexo",
    veiculo_app: "Veículo App",
    EngenhariaAmbiental: "Engenharia Ambiental",
    SaaS: "SaaS de Agendamento",
    Portifolio: "Portfólio",
    Reconhecimento: "Reconhecimento",
    VSC: "VSC",
    Padaria: "Padaria",
    GameRede: "GameRede",
  }

  if (aliases[name]) return aliases[name]

  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}
