import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Filter } from 'lucide-react'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'Sistema PD',
      description: 'Sistema de gestão desenvolvido com HTML, CSS e JavaScript para controle de dados.',
      image: '/imagem/Sistema PD.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      category: 'frontend',
      github: 'https://github.com/JoaoVictorEffgen',
      live: 'https://github.com/JoaoVictorEffgen',
      featured: true
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
      featured: true
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
      featured: false
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
      featured: false
    }
  ]

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'mobile', name: 'Mobile' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meus <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Projetos</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Alguns dos projetos que desenvolvi para demonstrar minhas habilidades e paixão pela programação
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

                 {/* Projects Grid */}
         <motion.div
           layout
           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
         >
           {filteredProjects.map((project, index) => (
             <motion.div
               key={project.id}
               layout
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -50 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 aspect-square"
             >
               {/* Project Image */}
               <div className="relative h-3/5 overflow-hidden">
                 <img
                   src={project.image}
                   alt={project.title}
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 
                 {/* Featured Badge */}
                 {project.featured && (
                   <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                     Destaque
                   </div>
                 )}

                 {/* Project Links */}
                 <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <a
                     href={project.github}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="p-1.5 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors duration-200"
                     aria-label="Ver código no GitHub"
                   >
                     <Github className="w-3 h-3 text-white" />
                   </a>
                   <a
                     href={project.live}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="p-1.5 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors duration-200"
                     aria-label="Ver projeto ao vivo"
                   >
                     <ExternalLink className="w-3 h-3 text-white" />
                   </a>
                 </div>
               </div>

               {/* Project Content */}
               <div className="p-4 h-2/5 flex flex-col justify-between">
                 <div>
                   <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300 line-clamp-1">
                     {project.title}
                   </h3>
                   <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
                     {project.description}
                   </p>
                 </div>
                 
                 {/* Technologies */}
                 <div className="flex flex-wrap gap-1">
                   {project.technologies.map((tech) => (
                     <span
                       key={tech}
                       className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30"
                     >
                       {tech}
                     </span>
                   ))}
                 </div>
               </div>
             </motion.div>
           ))}
         </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/JoaoVictorEffgen"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            <Github className="w-5 h-5" />
            Ver Mais no GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
