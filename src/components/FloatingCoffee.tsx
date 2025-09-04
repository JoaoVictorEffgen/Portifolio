import { useState } from 'react'
import { motion } from 'framer-motion'
import { Coffee } from 'lucide-react'

const FloatingCoffee = () => {
  const [showCoffeeModal, setShowCoffeeModal] = useState(false)
  const [hasBeenClicked, setHasBeenClicked] = useState(false)

  return (
    <>
      {/* Floating Coffee Icon */}
      {!hasBeenClicked && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="fixed top-8 right-8 z-40"
        >
          <motion.button
            onClick={() => {
              setShowCoffeeModal(true)
              setHasBeenClicked(true)
            }}
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 8, -8, 0],
              x: [0, 5, -5, 0]
            }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="p-4 bg-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-500/30 hover:bg-yellow-500/30 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
            aria-label="Apoie com um café"
          >
            <Coffee className="w-7 h-7 text-yellow-400" />
          </motion.button>
        </motion.div>
      )}

      {/* Coffee Modal */}
      {showCoffeeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCoffeeModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-slate-800/95 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <Coffee className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Apoie com um Café! ☕
                </h3>
                <p className="text-gray-400 mb-6">
                  Se gostou do meu trabalho, que tal me pagar um café? 
                  Cada xícara me ajuda a continuar criando projetos incríveis!
                </p>
              </motion.div>

              <div className="space-y-4">
                <motion.a
                  href="https://nubank.com.br/pagar/1qj8h/joaoeffgens@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  💳 Pagar com PIX
                </motion.a>

                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Ou escaneie o QR Code:</p>
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <img 
                      src="/imagem/qrcode-pix.png" 
                      alt="QR Code PIX" 
                      className="w-32 h-32"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setShowCoffeeModal(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    Fechar
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setShowCoffeeModal(false)
                      setHasBeenClicked(false)
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    Mostrar Xícara
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default FloatingCoffee
