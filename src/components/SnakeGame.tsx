import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw } from 'lucide-react';
import SnakeSwipeDetector from './SnakeSwipeDetector';

interface Position {
  x: number;
  y: number;
}

interface SnakeGameProps {
  isOpen: boolean;
  onClose: () => void;
  onSnakeMode?: () => void;
}

const SnakeGame = ({ isOpen, onClose, onSnakeMode }: SnakeGameProps) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(150);
  const [hasUnlockedSnakeAchievement, setHasUnlockedSnakeAchievement] = useState(false);

  const gridSize = 20;
  const boardWidth = 400;
  const boardHeight = 400;

  // Gerar comida em posição aleatória
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * (boardWidth / gridSize)),
      y: Math.floor(Math.random() * (boardHeight / gridSize))
    };
    setFood(newFood);
  }, []);

  // Resetar jogo
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    setIsPlaying(false);
    generateFood();
  };

  // Mover cobra
  const moveSnake = useCallback(() => {
    if (!isPlaying || gameOver || direction.x === 0 && direction.y === 0) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      // Mover cabeça
      head.x += direction.x;
      head.y += direction.y;

      // Verificar colisão com paredes
      if (head.x < 0 || head.x >= boardWidth / gridSize || 
          head.y < 0 || head.y >= boardHeight / gridSize) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      // Verificar colisão com próprio corpo
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      newSnake.unshift(head);

      // Verificar se comeu a comida
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        generateFood();
        
        // Aumentar velocidade gradualmente
        setGameSpeed(prev => Math.max(80, prev - 2));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, isPlaying, gameOver, food, generateFood]);

  // Controles de teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isOpen || gameOver) return;

      switch (event.key) {
        case 'ArrowUp':
          if (direction.y !== 1) {
            setDirection({ x: 0, y: -1 });
            if (!isPlaying) {
              setIsPlaying(true);
              // Unlock Snake achievement na primeira jogada
              if (!hasUnlockedSnakeAchievement) {
                console.log('🐍 Snake achievement ativado!'); // Debug log
                setHasUnlockedSnakeAchievement(true);
              }
            }
          }
          break;
        case 'ArrowDown':
          if (direction.y !== -1) {
            setDirection({ x: 0, y: 1 });
            if (!isPlaying) {
              setIsPlaying(true);
              if (!hasUnlockedSnakeAchievement) {
                setHasUnlockedSnakeAchievement(true);
              }
            }
          }
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) {
            setDirection({ x: -1, y: 0 });
            if (!isPlaying) {
              setIsPlaying(true);
              if (!hasUnlockedSnakeAchievement) {
                setHasUnlockedSnakeAchievement(true);
              }
            }
          }
          break;
        case 'ArrowRight':
          if (direction.x !== -1) {
            setDirection({ x: 1, y: 0 });
            if (!isPlaying) {
              setIsPlaying(true);
              if (!hasUnlockedSnakeAchievement) {
                setHasUnlockedSnakeAchievement(true);
              }
            }
          }
          break;
        case ' ':
          event.preventDefault();
          setIsPlaying(!isPlaying);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPlaying, gameOver, isOpen]);

  // Loop do jogo
  useEffect(() => {
    const gameLoop = setInterval(moveSnake, gameSpeed);
    return () => clearInterval(gameLoop);
  }, [moveSnake, gameSpeed]);

  // Controles touch para mobile
  const handleSwipe = useCallback((swipeDirection: string) => {
    if (!isOpen || gameOver) return;

    switch (swipeDirection) {
      case 'up':
        if (direction.y !== 1) {
          setDirection({ x: 0, y: -1 });
          if (!isPlaying) {
            setIsPlaying(true);
            if (!hasUnlockedSnakeAchievement) {
              setHasUnlockedSnakeAchievement(true);
            }
          }
        }
        break;
      case 'down':
        if (direction.y !== -1) {
          setDirection({ x: 0, y: 1 });
          if (!isPlaying) {
            setIsPlaying(true);
            if (!hasUnlockedSnakeAchievement) {
              setHasUnlockedSnakeAchievement(true);
            }
          }
        }
        break;
      case 'left':
        if (direction.x !== 1) {
          setDirection({ x: -1, y: 0 });
          if (!isPlaying) {
            setIsPlaying(true);
            if (!hasUnlockedSnakeAchievement) {
              setHasUnlockedSnakeAchievement(true);
            }
          }
        }
        break;
      case 'right':
        if (direction.x !== -1) {
          setDirection({ x: 1, y: 0 });
          if (!isPlaying) {
            setIsPlaying(true);
            if (!hasUnlockedSnakeAchievement) {
              setHasUnlockedSnakeAchievement(true);
            }
          }
        }
        break;
    }
  }, [direction, isPlaying, gameOver, isOpen, hasUnlockedSnakeAchievement]);

  // Renderizar grade do jogo
  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < boardHeight / gridSize; y++) {
      for (let x = 0; x < boardWidth / gridSize; x++) {
        const isSnake = snake.some(segment => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;
        
        cells.push(
          <div
            key={`${x}-${y}`}
            className={`absolute w-5 h-5 border border-gray-600 ${
              isSnake 
                ? 'bg-green-500' 
                : isFood 
                  ? 'bg-red-500' 
                  : 'bg-gray-800'
            }`}
            style={{
              left: x * gridSize,
              top: y * gridSize,
            }}
          />
        );
      }
    }
    return cells;
  };

  return (
    <>
      <SnakeSwipeDetector onSwipe={handleSwipe} isActive={isOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-700"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">🐍 Snake Game</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (onSnakeMode) {
                      onSnakeMode();
                    }
                    onClose();
                  }}
                  className="text-green-400 hover:text-green-300 transition-colors text-sm"
                  title="Snake Mode no Site"
                >
                  🌐
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Score e Status */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-white">
                <span className="text-lg font-bold">Score: {score}</span>
              </div>
              <div className="text-white">
                {gameOver ? (
                  <span className="text-red-400 font-bold">GAME OVER</span>
                ) : isPlaying ? (
                  <span className="text-green-400 font-bold">PLAYING</span>
                ) : (
                  <span className="text-yellow-400 font-bold">PAUSED</span>
                )}
              </div>
            </div>

            {/* Área do Jogo */}
            <div className="relative mb-4 mx-auto border-2 border-gray-600 rounded-lg overflow-hidden bg-gray-900"
                 style={{ width: boardWidth, height: boardHeight }}>
              {renderGrid()}
            </div>

            {/* Controles */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <button
                onClick={() => handleSwipe('up')}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
              >
                ↑
              </button>
              <button
                onClick={() => handleSwipe('left')}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => handleSwipe('down')}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
              >
                ↓
              </button>
              <button
                onClick={() => handleSwipe('right')}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
              >
                →
              </button>
            </div>

            {/* Botões de Controle */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={gameOver}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'Pausar' : 'Jogar'}
              </button>
              <button
                onClick={resetGame}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>

            {/* Instruções */}
            <div className="mt-4 text-center text-gray-400 text-sm">
              <p>Desktop: Use as setas do teclado</p>
              <p>Mobile: Use os botões ou deslize</p>
              <p>Espaço: Pausar/Continuar</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default SnakeGame;
