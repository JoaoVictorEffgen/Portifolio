#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Atualizando dados do portfólio...\n');

// Função para adicionar nova habilidade
function addSkill(name, level, category, icon, description) {
  const skillsPath = path.join(__dirname, '../public/data/skills.json');
  const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
  
  const newSkill = { name, level, category, icon, description };
  skills.push(newSkill);
  
  fs.writeFileSync(skillsPath, JSON.stringify(skills, null, 2));
  console.log(`✅ Habilidade "${name}" adicionada com sucesso!`);
}

// Função para adicionar novo projeto
function addProject(title, description, image, technologies, category, github, live, featured = false) {
  const projectsPath = path.join(__dirname, '../public/data/projects.json');
  const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  
  const newProject = {
    id: projects.length + 1,
    title,
    description,
    image,
    technologies,
    category,
    github,
    live,
    featured,
    date: new Date().toISOString().split('T')[0],
    status: 'completed'
  };
  
  projects.push(newProject);
  
  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  console.log(`✅ Projeto "${title}" adicionado com sucesso!`);
}

// Função para atualizar nível de habilidade
function updateSkillLevel(skillName, newLevel) {
  const skillsPath = path.join(__dirname, '../public/data/skills.json');
  const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
  
  const skill = skills.find(s => s.name === skillName);
  if (skill) {
    skill.level = newLevel;
    fs.writeFileSync(skillsPath, JSON.stringify(skills, null, 2));
    console.log(`✅ Nível da habilidade "${skillName}" atualizado para ${newLevel}%`);
  } else {
    console.log(`❌ Habilidade "${skillName}" não encontrada`);
  }
}

// Exemplo de uso (descomente para testar):
// addSkill('TypeScript', 80, 'frontend', '📘', 'Tipagem estática para JavaScript');
// addProject('Novo Projeto', 'Descrição do projeto', '/imagem/novo-projeto.png', ['React', 'TypeScript'], 'frontend', 'https://github.com/user/projeto', 'https://projeto.com', true);
// updateSkillLevel('React', 85);

console.log('\n📋 Comandos disponíveis:');
console.log('addSkill(name, level, category, icon, description)');
console.log('addProject(title, description, image, technologies, category, github, live, featured)');
console.log('updateSkillLevel(skillName, newLevel)');
console.log('\n💡 Para usar, edite este arquivo e descomente as linhas desejadas!');
