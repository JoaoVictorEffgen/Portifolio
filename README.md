# Portfólio — João Victor Effgen

Site pessoal profissional de [João Victor Effgen](https://github.com/JoaoVictorEffgen). Os projetos públicos vêm direto da API do GitHub: quando um repositório novo é criado na conta, ele passa a aparecer na grade automaticamente.

## Como rodar

```bash
npm install
npm run dev
```

O servidor sobe em [http://localhost:43217](http://localhost:43217).

Para produção:

```bash
npm run build
npm start -- --port 43217
```

## Ligação com o GitHub

O site consulta `https://api.github.com/users/JoaoVictorEffgen/repos` a cada 5 minutos. Não é preciso editar o código para publicar um projeto novo.

O que entra na lista:

- repositórios **públicos** da conta
- que **não** sejam forks
- que **não** tenham o tópico `hide-from-portfolio`
- o repositório de perfil (`JoaoVictorEffgen`) e o portfólio antigo (`Portifolio`) ficam de fora — este site passa a ser a vitrine

O que ajuda o card a ficar completo:

- descrição no repositório
- linguagem detectada pelo GitHub
- GitHub Pages ou o campo **About → Website** (vira o botão Demo)
- tópico `portfolio` (marca o card como destaque)

Destaques atuais configurados em `lib/site.ts`: Nexo, SaaS, Padaria e VSC.

Para apontar para outra conta, altere `githubUsername` em `lib/site.ts` ou defina:

```bash
GITHUB_USERNAME=JoaoVictorEffgen
```

Se o GitHub limitar as consultas, use um token só de leitura em `.env.local`:

```bash
GITHUB_TOKEN=ghp_...
```

## Conteúdo editável

Identidade, texto, e-mail e redes ficam em `lib/site.ts`.

## Deploy

Publique este repositório na Vercel. Cada push atualiza o site, e o fetch do GitHub continua preenchendo os projetos.
