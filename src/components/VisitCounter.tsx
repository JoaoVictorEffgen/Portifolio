import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Clock, MapPin, TrendingUp } from 'lucide-react';
import { useEasterEggs } from '../hooks/useEasterEggs';

interface VisitStats {
  totalVisits: number;
  sessionStart: Date;
  sectionsVisited: Set<string>;
  scrollProgress: number;
}

const VisitCounter = () => {
  const { visitCount } = useEasterEggs();
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState<VisitStats>({
    totalVisits: visitCount,
    sessionStart: new Date(),
    sectionsVisited: new Set(),
    scrollProgress: 0
  });
  const [timeOnPage, setTimeOnPage] = useState(0);

  // Timer para tempo na página
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage(prev => {
        const newTime = prev + 1;
        
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      console.log(`📜 Scroll: ${scrollPercent.toFixed(2)}%`); // Debug log
      
      setStats(prev => ({
        ...prev,
        scrollProgress: Math.min(scrollPercent, 100)
      }));

      // Achievement: Scroll Master (100% scroll) - com tolerância
      if (scrollPercent >= 95) {
        console.log('🎯 Scroll Master achievement ativado!', { scrollPercent, scrollTop, docHeight }); // Debug log
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Forçar verificação de scroll no mount
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      console.log(`📜 Scroll inicial: ${scrollPercent.toFixed(2)}%`); // Debug log
      
      if (scrollPercent >= 95) {
        console.log('🎯 Scroll Master achievement ativado (inicial)!'); // Debug log
      }
    };
    
    // Verificar imediatamente
    handleScroll();
    
    // Verificar após um pequeno delay para garantir que a página carregou
    setTimeout(handleScroll, 1000);
  }, []);

  // Section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
              console.log(`🗺️ Seção visitada: ${sectionId}`); // Debug log
              
              setStats(prev => {
                const newSections = new Set(prev.sectionsVisited);
                newSections.add(sectionId);
                
                console.log(`📊 Seções visitadas: ${Array.from(newSections).join(', ')}`); // Debug log
                
                // Achievement: Explorador (todas as seções)
                // Verificar se visitou: home, about, skills, projects, contact
                const requiredSections = ['home', 'about', 'skills', 'projects', 'contact'];
                const hasAllSections = requiredSections.every(section => newSections.has(section));
                
                if (hasAllSections) {
                  console.log('🎯 Explorador achievement ativado!'); // Debug log
                }
                
                return {
                  ...prev,
                  sectionsVisited: newSections
                };
              });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observar todas as seções
    const sections = document.querySelectorAll('section[id], div[id*="section"]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Botão de Stats */}
      <motion.button
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        onClick={() => setShowStats(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
      >
        <Eye className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          {stats.totalVisits}
        </span>
      </motion.button>

      {/* Panel de Stats */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowStats(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-700"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">Estatísticas</h2>
                </div>
                <button
                  onClick={() => setShowStats(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Total Visits */}
                <motion.div
                  className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-lg border border-blue-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-300 text-sm">Visitas Totais</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.totalVisits}</div>
                </motion.div>

                {/* Time on Page */}
                <motion.div
                  className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4 rounded-lg border border-green-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 text-sm">Tempo Atual</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{formatTime(timeOnPage)}</div>
                </motion.div>

                {/* Sections Visited */}
                <motion.div
                  className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-lg border border-purple-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-300 text-sm">Seções</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.sectionsVisited.size}</div>
                </motion.div>

                {/* Scroll Progress */}
                <motion.div
                  className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-4 rounded-lg border border-orange-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                    <span className="text-orange-300 text-sm">Scroll</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{Math.round(stats.scrollProgress)}%</div>
                </motion.div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                {/* Scroll Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">Progresso do Scroll</span>
                    <span className="text-orange-400 text-sm">{Math.round(stats.scrollProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.scrollProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Sections Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">Seções Visitadas</span>
                    <span className="text-purple-400 text-sm">{stats.sectionsVisited.size}/5</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(stats.sectionsVisited.size / 5) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-700">
                <p className="text-center text-gray-400 text-sm">
                  Sessão iniciada em: {formatDate(stats.sessionStart)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VisitCounter;
