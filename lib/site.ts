export const site = {
  name: "João Victor Effgen",
  shortName: "João Victor",
  role: "Desenvolvedor full stack",
  tagline:
    "Crio produtos digitais úteis — sistemas de gestão, automações e aplicações web — com atenção à experiência, ao código e ao resultado.",
  about: [
    "Olá, sou João Victor Effgen. Desenvolvo soluções web e desktop com foco em sistemas de gestão, produtividade e produtos SaaS. Meu trabalho une frontend, backend e organização de processo.",
    "Este portfólio lê os repositórios públicos da conta JoaoVictorEffgen. Quando um projeto novo entra no GitHub, ele aparece aqui na próxima atualização — sem editar o site à mão.",
  ],
  location: "Espírito Santo, Brasil",
  githubUsername: process.env.GITHUB_USERNAME ?? "JoaoVictorEffgen",
  photo: "/foto-perfil.png",
  email: "joaoeffgens@gmail.com",
  whatsapp: "5527995187615",
  socials: {
    github: "https://github.com/JoaoVictorEffgen",
    linkedin: "https://www.linkedin.com/in/joao-victor-effgen-84888b239",
    instagram: "https://www.instagram.com/joaoeffgen/",
  },
  skills: [
    { name: "JavaScript", level: "Principal" },
    { name: "TypeScript", level: "Principal" },
    { name: "React", level: "Frontend" },
    { name: "HTML e CSS", level: "Frontend" },
    { name: "Node.js", level: "Backend" },
    { name: "Python", level: "Backend" },
    { name: "Dart / Flutter", level: "Mobile" },
    { name: "Git e GitHub", level: "Fluxo" },
  ],
  hiddenRepos: ["JoaoVictorEffgen", "Portifolio"] as string[],
  featuredRepos: ["nexo", "SaaS", "Padaria", "VSC"] as string[],
  projectImages: {
    Padaria: "/projetos/padaria.jpg",
    VSC: "/projetos/vsc.jpg",
    veiculo_app: "/projetos/veiculo.jpg",
    GameRede: "/projetos/gamerede.jpg",
  } as Record<string, string>,
  repoDescriptions: {
    veiculo_app: "Aplicativo em Flutter para gestão de veículos.",
    EngenhariaAmbiental: "Site institucional de engenharia ambiental.",
    GameRede: "Projeto em JavaScript para praticar lógica e desenvolvimento.",
  } as Record<string, string>,
  revalidateSeconds: 300,
} as const

export type SiteConfig = typeof site
