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

export function languageAccent(language: string | null) {
  switch (language) {
    case "JavaScript":
      return { from: "#f7df1e", to: "#2767bb" }
    case "TypeScript":
      return { from: "#3178c6", to: "#0d47a1" }
    case "Python":
      return { from: "#3776ab", to: "#ffd43b" }
    case "HTML":
      return { from: "#e34f26", to: "#273c75" }
    case "CSS":
      return { from: "#1572b6", to: "#f1c40f" }
    case "Dart":
      return { from: "#0175c2", to: "#13b9fd" }
    default:
      return { from: "#2767bb", to: "#f1c40f" }
  }
}
