import { useState, useEffect } from 'react';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  description: string;
}

export const useSkillsData = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/skills.json');
        
        if (!response.ok) {
          throw new Error(`Erro ao carregar habilidades: ${response.status}`);
        }
        
        const data = await response.json();
        setSkills(data);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar habilidades:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        
        // Fallback para dados padrão se falhar
        setSkills([
          { name: 'HTML5', level: 95, category: 'frontend', icon: '🌐', description: 'Estruturação semântica' },
          { name: 'CSS3', level: 90, category: 'frontend', icon: '🎨', description: 'Estilização moderna' },
          { name: 'JavaScript', level: 85, category: 'frontend', icon: '⚡', description: 'Programação dinâmica' },
          { name: 'React', level: 80, category: 'frontend', icon: '⚛️', description: 'Interfaces modernas' },
          { name: 'Node.js', level: 75, category: 'backend', icon: '🟢', description: 'APIs server-side' },
          { name: 'Python', level: 70, category: 'backend', icon: '🐍', description: 'Automação e dados' },
          { name: 'Git', level: 85, category: 'tools', icon: '📚', description: 'Controle de versão' },
          { name: 'Java', level: 75, category: 'backend', icon: '☕', description: 'Orientado a objetos' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  return { skills, loading, error };
};
