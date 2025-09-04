
import { motion } from 'framer-motion'
import {Code, Zap} from 'lucide-react'

const About = () => {
  const stats = [
    { number: '15+', label: 'Projetos Concluídos', icon: Code },
    { number: '100%', label: 'Dedicação', icon: Zap }
  ]

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Mim</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Desenvolvedor apaixonado por criar soluções digitais que fazem a diferença
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <img
                  src="/imagem/Meu eu.png"
                  alt="João Victor Effgen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-40"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Criando o futuro, uma linha de código por vez
            </h3>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Sou um desenvolvedor full stack com mais de 3 anos de experiência, especializado em 
              tecnologias modernas como React, Node.js, TypeScript e muito mais. Minha paixão é 
              transformar ideias complexas em soluções digitais elegantes e funcionais.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              Acredito que a tecnologia deve ser acessível e intuitiva. Por isso, foco em criar 
              experiências de usuário excepcionais que combinam design atraente com performance 
              otimizada e código limpo.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-8 max-w-2xl mx-auto"
        >
          {stats.map(({ number, label, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <Icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">{number}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
