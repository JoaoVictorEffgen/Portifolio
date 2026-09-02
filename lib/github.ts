import { site } from "@/lib/site"

export type GithubProfile = {
  login: string
  name: string | null
  bio: string | null
  htmlUrl: string
  avatarUrl: string
  publicRepos: number
  followers: number
  following: number
}

export type Project = {
  id: string
  name: string
  description: string | null
  htmlUrl: string
  homepage: string | null
  language: string | null
  stars: number
  forks: number
  topics: string[]
  updatedAt: string
  createdAt: string
  image: string
  featured: boolean
}

export type Skill = {
  name: string
  level: string
}

export type GithubPayload = {
  profile: GithubProfile | null
  projects: Project[]
  skills: Skill[]
  error: string | null
  fetchedAt: string
}

type GithubUserResponse = {
  login: string
  name: string | null
  bio: string | null
  html_url: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
}

type GithubRepoResponse = {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics?: string[]
  updated_at: string
  created_at: string
  fork: boolean
  archived: boolean
  private: boolean
  has_pages: boolean
}

const GITHUB_HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "joao-victor-effgen-portfolio",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
}

function githubImage(fullName: string) {
  return `https://opengraph.githubassets.com/1/${fullName}`
}

function githubPagesUrl(repoName: string) {
  return `https://${site.githubUsername.toLowerCase()}.github.io/${repoName}/`
}

function resolveHomepage(repo: GithubRepoResponse) {
  const homepage = repo.homepage?.trim()
  if (homepage) {
    return homepage.startsWith("http") ? homepage : `https://${homepage}`
  }
  if (repo.has_pages) return githubPagesUrl(repo.name)
  return null
}

function mapRepo(repo: GithubRepoResponse): Project {
  const topics = repo.topics ?? []
  const homepage = resolveHomepage(repo)

  return {
    id: String(repo.id),
    name: repo.name,
    description: repo.description ?? site.repoDescriptions[repo.name] ?? null,
    htmlUrl: repo.html_url,
    homepage,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics,
    updatedAt: repo.updated_at,
    createdAt: repo.created_at,
    image: site.projectImages[repo.name] ?? githubImage(repo.full_name),
    featured:
      topics.includes("portfolio") ||
      (site.featuredRepos as readonly string[]).includes(repo.name),
  }
}

function shouldShow(repo: GithubRepoResponse) {
  if (repo.fork || repo.private) return false
  if (repo.name.startsWith(".")) return false
  if (repo.name.toLowerCase() === site.githubUsername.toLowerCase()) return false
  if ((site.hiddenRepos as readonly string[]).includes(repo.name)) return false
  if ((repo.topics ?? []).includes("hide-from-portfolio")) return false
  return true
}

async function githubFetch<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: GITHUB_HEADERS,
    next: {
      revalidate: site.revalidateSeconds,
      tags: ["github"],
    },
  })

  if (response.status === 403 || response.status === 429) {
    throw new Error("O GitHub limitou as consultas no momento. Tente de novo em alguns minutos.")
  }

  if (response.status === 404) {
    throw new Error(`Usuário GitHub "${site.githubUsername}" não encontrado.`)
  }

  if (!response.ok) {
    throw new Error(`Falha ao consultar o GitHub (${response.status}).`)
  }

  return (await response.json()) as T
}

function skillsFromProjects(projects: Project[]): Skill[] {
  const counts = new Map<string, number>()
  for (const project of projects) {
    if (!project.language) continue
    counts.set(project.language, (counts.get(project.language) ?? 0) + 1)
  }

  const fromGithub = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"))
    .map(([name, count]) => ({
      name,
      level: count === 1 ? "1 repositório" : `${count} repositórios`,
    }))

  const extras = site.skills.filter((skill) => {
    const key = skill.name.toLowerCase()
    return !fromGithub.some((item) => {
      const language = item.name.toLowerCase()
      return (
        key === language ||
        key.includes(language) ||
        language.includes(key.split(" ")[0] ?? "")
      )
    })
  })

  return [...fromGithub, ...extras]
}

async function urlIsReachable(url: string) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(4000),
      next: { revalidate: 3600 },
    })
    if (response.ok) return true
    if (response.status === 405 || response.status === 403) {
      const getResponse = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(4000),
        next: { revalidate: 3600 },
      })
      return getResponse.ok
    }
    return false
  } catch {
    return false
  }
}

export async function getGithubData(): Promise<GithubPayload> {
  const fetchedAt = new Date().toISOString()
  const username = site.githubUsername

  try {
    const [profileRaw, reposRaw] = await Promise.all([
      githubFetch<GithubUserResponse>(
        `https://api.github.com/users/${username}`
      ),
      githubFetch<GithubRepoResponse[]>(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner`
      ),
    ])

    const profile: GithubProfile = {
      login: profileRaw.login,
      name: profileRaw.name,
      bio: profileRaw.bio,
      htmlUrl: profileRaw.html_url,
      avatarUrl: profileRaw.avatar_url,
      publicRepos: profileRaw.public_repos,
      followers: profileRaw.followers,
      following: profileRaw.following,
    }

    const mapped = reposRaw.filter(shouldShow).map(mapRepo)
    const homepages = await Promise.all(
      mapped.map(async (project) => {
        if (!project.homepage) return null
        return (await urlIsReachable(project.homepage)) ? project.homepage : null
      })
    )

    const projects = mapped
      .map((project, index) => ({
        ...project,
        homepage: homepages[index],
      }))
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })

    return {
      profile,
      projects,
      skills: skillsFromProjects(projects),
      error: null,
      fetchedAt,
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Não foi possível carregar os projetos do GitHub."

    return {
      profile: null,
      projects: [],
      skills: [...site.skills],
      error: message,
      fetchedAt,
    }
  }
}
