# 📊 Sistema de Atualização Automática - Portfolio

Este diretório contém os arquivos de dados que são carregados automaticamente pelo portfolio.

## 📁 Arquivos

- **`skills.json`** - Habilidades e tecnologias
- **`projects.json`** - Projetos e trabalhos
- **`README.md`** - Este arquivo de documentação

## 🔄 Como Atualizar

### 1. **Edição Manual**
Edite diretamente os arquivos JSON:
- `skills.json` - Adicione/remova/modifique habilidades
- `projects.json` - Adicione/remova/modifique projetos

### 2. **Script Automático**
Use o script `scripts/update-portfolio-data.js`:

```bash
# Adicionar nova habilidade
node scripts/update-portfolio-data.js
```

### 3. **Git Workflow**
1. Faça suas alterações nos arquivos JSON
2. `git add .`
3. `git commit -m "Adicionar nova habilidade/projeto"`
4. `git push`
5. **Vercel faz deploy automático! 🚀**

## 📋 Estrutura dos Dados

### Skills (skills.json)
```json
{
  "name": "React",
  "level": 80,
  "category": "frontend",
  "icon": "⚛️",
  "description": "Desenvolvimento de interfaces modernas"
}
```

### Projects (projects.json)
```json
{
  "id": 1,
  "title": "Meu Projeto",
  "description": "Descrição do projeto",
  "image": "/imagem/projeto.png",
  "technologies": ["React", "TypeScript"],
  "category": "frontend",
  "github": "https://github.com/user/projeto",
  "live": "https://projeto.com",
  "featured": true,
  "date": "2024-01-15",
  "status": "completed"
}
```

## 🎯 Categorias

### Skills
- `frontend` - Tecnologias frontend
- `backend` - Tecnologias backend  
- `tools` - Ferramentas de desenvolvimento

### Projects
- `frontend` - Projetos web frontend
- `mobile` - Aplicativos móveis
- `fullstack` - Projetos completos

## ⚡ Vantagens

- ✅ **Atualização automática** via Git
- ✅ **Deploy automático** no Vercel
- ✅ **Fallback** para dados padrão se houver erro
- ✅ **Loading states** durante carregamento
- ✅ **TypeScript** com tipagem completa
- ✅ **Fácil manutenção** via arquivos JSON

## 🚀 Deploy

Após fazer `git push`, o Vercel automaticamente:
1. Detecta as mudanças
2. Faz build do projeto
3. Deploy em ~2-3 minutos
4. Site atualizado! ✨
