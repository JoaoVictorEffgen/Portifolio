
import { motion } from 'framer-motion'
import { useSkillsData } from '../hooks/useSkillsData'

const Skills = () => {
  const { skills, loading, error } = useSkillsData()

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Minhas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Habilidades</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tecnologias e ferramentas que domino para criar soluções incríveis
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            Carregando habilidades...
          </div>
        ) : error ? (
          <div className="text-center text-red-400">
            <p>Erro ao carregar habilidades: {error}</p>
            <p className="text-sm text-gray-400 mt-2">Usando dados padrão</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="text-white font-semibold text-lg">{skill.name}</span>
                  </div>
                  <span className="text-blue-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                  />
                </div>
                <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {skill.description}
                </p>
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30">
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Skills
