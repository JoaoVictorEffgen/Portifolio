import { useState, useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  github: string;
  live: string;
  featured: boolean;
  date: string;
  status: string;
}

export const useProjectsData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/projects.json');
        
        if (!response.ok) {
          throw new Error(`Erro ao carregar projetos: ${response.status}`);
        }
        
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar projetos:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        
        // Fallback para dados padrão se falhar
        setProjects([
          {
            id: 1,
            title: 'Sistema PD',
            description: 'Sistema de gestão desenvolvido com HTML, CSS e JavaScript para controle de dados.',
            image: '/imagem/Sistema PD.png',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            category: 'frontend',
            github: 'https://github.com/JoaoVictorEffgen',
            live: 'https://github.com/JoaoVictorEffgen',
            featured: true,
            date: '2024-01-15',
            status: 'completed'
          },
          {
            id: 2,
            title: 'Quiz Saber',
            description: 'Aplicativo de quiz interativo desenvolvido para testar conhecimentos.',
            image: '/imagem/Quiz Saber.png',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            category: 'frontend',
            github: 'https://github.com/JoaoVictorEffgen',
            live: 'https://github.com/JoaoVictorEffgen',
            featured: true,
            date: '2024-02-20',
            status: 'completed'
          },
          {
            id: 3,
            title: 'App Mobile',
            description: 'Aplicativo mobile desenvolvido com React Native para dispositivos móveis.',
            image: '/imagem/App Mobile.png',
            technologies: ['React Native', 'JavaScript'],
            category: 'mobile',
            github: 'https://github.com/JoaoVictorEffgen',
            live: 'https://github.com/JoaoVictorEffgen',
            featured: false,
            date: '2024-03-10',
            status: 'completed'
          },
          {
            id: 4,
            title: 'Site Institucional',
            description: 'Site institucional responsivo desenvolvido com HTML, CSS e JavaScript.',
            image: '/imagem/Site.png',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            category: 'frontend',
            github: 'https://github.com/JoaoVictorEffgen',
            live: 'https://github.com/JoaoVictorEffgen',
            featured: false,
            date: '2024-03-25',
            status: 'completed'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, loading, error };
};
