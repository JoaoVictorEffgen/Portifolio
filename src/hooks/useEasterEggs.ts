import { useState, useEffect, useCallback } from 'react';

// Declaração global para intervalos
declare global {
  interface Window {
    easterEggInterval?: NodeJS.Timeout | null;
  }
}

interface EasterEgg {
  id: string;
  name: string;
  description: string;
  sequence: string[];
  unlocked: boolean;
  reward?: string;
}

export const useEasterEggs = () => {
  const [easterEggs, setEasterEggs] = useState<EasterEgg[]>([
    {
      id: 'konami',
      name: 'Konami Code',
      description: '↑↑↓↓←→←→BA - O código clássico!',
      sequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'],
      unlocked: false,
      reward: 'Matrix Mode ativado! 🟢'
    },
    {
      id: 'developer',
      name: 'Developer Mode',
      description: 'Digite: DEV',
      sequence: ['KeyD', 'KeyE', 'KeyV'],
      unlocked: false,
      reward: 'Developer Mode ativado! 👨‍💻'
    },
    {
      id: 'coffee',
      name: 'Coffee Mode',
      description: 'Café é vida! Digite COFFEE',
      sequence: ['KeyC', 'KeyO', 'KeyF', 'KeyF', 'KeyE', 'KeyE'],
      unlocked: false,
      reward: 'Café infinito! ☕☕☕'
    },
    {
      id: 'coffee-mobile',
      name: 'Coffee Photo',
      description: 'Café na foto! 3 cliques na foto do Sobre Mim',
      sequence: ['tap', 'tap', 'tap'],
      unlocked: false,
      reward: 'Coffee Photo Mode! ☕📸'
    },
    {
      id: 'shake-mobile',
      name: 'Shake It',
      description: 'Agite o celular! 📱',
      sequence: ['shake'],
      unlocked: false,
      reward: 'Shake Mode ativado! 🎉'
    },
    {
      id: 'konami-mobile',
      name: 'Konami Mobile',
      description: 'Toque no logo para Snake automático! 🐍',
      sequence: ['logo-tap'],
      unlocked: false,
      reward: 'Snake automático no site! 🐍🤖'
    }
  ]);

  const [visitCount, setVisitCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSequences, setCurrentSequences] = useState<{[key: string]: string[]}>({});
  const [coffeeTapCount, setCoffeeTapCount] = useState(0);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      console.log(`📱 Detecção Mobile: ${isMobileDevice} (UserAgent: ${navigator.userAgent.includes('Mobile')}, Width: ${window.innerWidth})`);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Carregar dados salvos
  useEffect(() => {
    const savedEasterEggs = localStorage.getItem('portfolio-easter-eggs');
    if (savedEasterEggs) {
      try {
        const parsed = JSON.parse(savedEasterEggs);
        setEasterEggs(parsed);
      } catch (error) {
        console.error('Erro ao carregar Easter Eggs:', error);
      }
    }

    const savedVisitCount = localStorage.getItem('portfolio-visit-count');
    if (savedVisitCount) {
      setVisitCount(parseInt(savedVisitCount));
    } else {
      const newCount = 1;
      setVisitCount(newCount);
      localStorage.setItem('portfolio-visit-count', newCount.toString());
    }
  }, []);

  // Salvar Easter Eggs
  useEffect(() => {
    localStorage.setItem('portfolio-easter-eggs', JSON.stringify(easterEggs));
  }, [easterEggs]);

  const showNotification = (message: string) => {
    // Criar notificação customizada
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '10px';
    notification.style.zIndex = '10000';
    notification.style.fontWeight = 'bold';
    notification.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  const unlockEasterEgg = useCallback((id: string) => {
    setEasterEggs(prev => {
      const existing = prev.find(egg => egg.id === id);
      if (existing && !existing.unlocked) {
        showNotification(existing.reward || `Easter Egg desbloqueado: ${existing.name}!`);
        triggerSpecialEffect(id);
        return prev.map(egg => 
          egg.id === id ? { ...egg, unlocked: true } : egg
        );
      }
      return prev;
    });
  }, []);

  const triggerSpecialEffect = (eggId: string) => {
    // Remover efeitos anteriores
    clearPreviousEffects();
    
    switch (eggId) {
      case 'konami':
        activateSnakeMode();
        break;
      case 'developer':
        activateDeveloperMode();
        break;
      case 'coffee':
      case 'coffee-mobile':
        activateCoffeeMode();
        break;
      case 'shake-mobile':
        activateShakeMode();
        break;
      case 'snake':
        activateSnakeMode();
        break;
      default:
        break;
    }
  };

  const clearPreviousEffects = () => {
    document.body.classList.remove('matrix-mode', 'developer-mode', 'coffee-mode', 'shake-mode');
    
    // Remover overlays existentes
    const existingOverlays = document.querySelectorAll('.easter-egg-overlay');
    existingOverlays.forEach(overlay => overlay.remove());
    
    // Remover textos criados
    const existingTexts = document.querySelectorAll('.easter-egg-text');
    existingTexts.forEach(text => text.remove());
    
    // Remover partículas
    const existingParticles = document.querySelectorAll('.easter-egg-particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Remover canvas do Snake
    const snakeCanvas = document.getElementById('site-snake');
    if (snakeCanvas) {
      snakeCanvas.remove();
    }
    
    // Parar animações
    document.body.style.animation = '';
    
    // Limpar intervalos
    if (window.easterEggInterval) {
      clearInterval(window.easterEggInterval);
      window.easterEggInterval = null;
    }
  };

  const activateMatrixMode = () => {
    document.body.classList.add('matrix-mode');
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'easter-egg-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #000000, #001100, #000000);
      z-index: 1000;
      pointer-events: none;
      opacity: 0.3;
    `;
    document.body.appendChild(overlay);
    
    // Criar chuva de caracteres
    createMatrixRain();
    
    // Auto-clear após 10 segundos
    setTimeout(() => {
      clearPreviousEffects();
    }, 10000);
  };

  const activateDeveloperMode = () => {
    document.body.classList.add('developer-mode');
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'easter-egg-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #000000, #001a00, #000000);
      z-index: 1000;
      pointer-events: none;
      opacity: 0.4;
    `;
    document.body.appendChild(overlay);
    
    // Criar MUITAS partículas de código inicialmente
    for (let i = 0; i < 100; i++) {
      setTimeout(() => createDeveloperRain(), i * 50);
    }
    
    // Continuar criando partículas durante todo o efeito
    const devInterval = setInterval(() => {
      // Criar 3-5 caracteres a cada 200ms
      const count = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < count; i++) {
        setTimeout(() => createDeveloperRain(), i * 50);
      }
    }, 200);
    
    // Salvar o intervalo para limpeza
    window.easterEggInterval = devInterval;
    
    // Adicionar texto hacker
    const text = document.createElement('div');
    text.className = 'easter-egg-text';
    text.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #00ff00;
      font-family: 'Courier New', monospace;
      font-size: 24px;
      font-weight: bold;
      z-index: 1001;
      pointer-events: none;
      text-shadow: 0 0 10px #00ff00;
      animation: dev-scan 2s ease-in-out infinite;
    `;
    text.textContent = 'DEVELOPER MODE';
    document.body.appendChild(text);
    
    // Auto-clear após 10 segundos
    setTimeout(() => {
      clearPreviousEffects();
    }, 10000);
  };

  const activateCoffeeMode = () => {
    document.body.classList.add('coffee-mode');
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'easter-egg-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #8B4513, #D2691E, #8B4513);
      z-index: 1000;
      pointer-events: none;
      opacity: 0.2;
    `;
    document.body.appendChild(overlay);
    
    // Criar MUITAS partículas de café inicialmente
    for (let i = 0; i < 100; i++) {
      setTimeout(() => createCoffeeParticle(), i * 50);
    }
    
    // Continuar criando partículas durante todo o efeito
    const coffeeInterval = setInterval(() => {
      // Criar 3-5 xícaras a cada 200ms
      const count = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < count; i++) {
        setTimeout(() => createCoffeeParticle(), i * 50);
      }
    }, 200);
    
    // Salvar o intervalo para limpeza
    window.easterEggInterval = coffeeInterval;
    
    // Adicionar texto
    const text = document.createElement('div');
    text.className = 'easter-egg-text';
    text.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: #8B4513;
      font-size: 32px;
      font-weight: bold;
      z-index: 1001;
      pointer-events: none;
      text-shadow: 0 0 20px #8B4513;
      animation: coffee-glow 2s ease-in-out infinite;
    `;
    text.textContent = '☕ CAFÉ INFINITO ☕';
    document.body.appendChild(text);
    
    // Auto-clear após 10 segundos
    setTimeout(() => {
      clearPreviousEffects();
    }, 10000);
  };

  const activateShakeMode = () => {
    document.body.classList.add('shake-mode');
    
    // Criar partículas de poeira
    for (let i = 0; i < 20; i++) {
      createDustParticle();
    }
    
    // Animação contínua de shake
    const shakeInterval = setInterval(() => {
      document.body.style.animation = 'none';
      setTimeout(() => {
        document.body.style.animation = 'shake 0.5s ease-in-out';
      }, 10);
    }, 2000);
    
    // Auto-clear após 10 segundos
    setTimeout(() => {
      clearInterval(shakeInterval);
      document.body.style.animation = '';
      clearPreviousEffects();
    }, 10000);
  };

  const createCoffeeParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'easter-egg-particle';
    
    // Variar os emojis de café
    const coffeeEmojis = ['☕', '☕', '☕', '🫖', '🍵', '☕'];
    const emoji = coffeeEmojis[Math.floor(Math.random() * coffeeEmojis.length)];
    particle.innerHTML = emoji;
    
    console.log('☕ Criando xícara:', emoji);
    
    // Variar tamanhos
    const sizes = ['16px', '20px', '24px', '28px', '32px'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    
    // Variar cores
    const colors = ['#8B4513', '#A0522D', '#D2691E', '#CD853F', '#DEB887'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Variar velocidade de queda
    const durations = ['2s', '2.5s', '3s', '3.5s', '4s'];
    const randomDuration = durations[Math.floor(Math.random() * durations.length)];
    
    particle.style.cssText = `
      position: fixed;
      top: -50px;
      left: ${Math.random() * window.innerWidth}px;
      font-size: ${randomSize};
      color: ${randomColor};
      pointer-events: none;
      z-index: 1001;
      animation: coffee-fall ${randomDuration} linear forwards;
      text-shadow: 0 0 10px ${randomColor};
    `;
    
    document.body.appendChild(particle);
    
    // Remover após a animação
    const duration = parseInt(randomDuration) * 1000;
    setTimeout(() => {
      if (document.body.contains(particle)) {
        document.body.removeChild(particle);
      }
    }, duration);
  };

  const createDeveloperRain = () => {
    // Caracteres de código e programação
    const characters = '{}()[];<>=!&|+-*/%^~?.,:;"\'`@#$0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    const rain = document.createElement('div');
    rain.className = 'easter-egg-particle';
    
    // Variar tamanhos
    const sizes = ['12px', '14px', '16px', '18px', '20px'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    
    // Variar cores verdes
    const colors = ['#00ff00', '#00ff41', '#39ff14', '#32cd32', '#00ff7f'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Variar velocidade de queda
    const durations = ['2s', '2.5s', '3s', '3.5s', '4s'];
    const randomDuration = durations[Math.floor(Math.random() * durations.length)];
    
    rain.style.cssText = `
      position: fixed;
      top: -50px;
      left: ${Math.random() * window.innerWidth}px;
      color: ${randomColor};
      font-family: 'Courier New', monospace;
      font-size: ${randomSize};
      pointer-events: none;
      z-index: 1001;
      animation: coffee-fall ${randomDuration} linear forwards;
      text-shadow: 0 0 10px ${randomColor};
    `;
    rain.textContent = characters[Math.floor(Math.random() * characters.length)];
    
    document.body.appendChild(rain);
    
    // Remover após a animação
    const duration = parseInt(randomDuration) * 1000;
    setTimeout(() => {
      if (document.body.contains(rain)) {
        document.body.removeChild(rain);
      }
    }, duration);
  };

  const createMatrixRain = () => {
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const rain = document.createElement('div');
        rain.className = 'easter-egg-particle';
        rain.style.cssText = `
          position: fixed;
          top: -50px;
          left: ${Math.random() * window.innerWidth}px;
          color: #00ff00;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          pointer-events: none;
          z-index: 1001;
          animation: matrix-fall 3s linear forwards;
        `;
        rain.textContent = characters[Math.floor(Math.random() * characters.length)];
        document.body.appendChild(rain);
        
        setTimeout(() => {
          if (document.body.contains(rain)) {
            document.body.removeChild(rain);
          }
        }, 3000);
      }, i * 100);
    }
  };

  const createDustParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'easter-egg-particle';
    particle.innerHTML = '✨';
    particle.style.cssText = `
      position: fixed;
      top: ${Math.random() * window.innerHeight}px;
      left: ${Math.random() * window.innerWidth}px;
      font-size: 16px;
      color: #FFD700;
      pointer-events: none;
      z-index: 1001;
      animation: dust-float 2s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      if (document.body.contains(particle)) {
        document.body.removeChild(particle);
      }
    }, 2000);
  };

  const activateSnakeMode = () => {
    clearPreviousEffects();
    
    // Criar o Snake no site
    const snakeCanvas = document.createElement('canvas');
    snakeCanvas.id = 'site-snake';
    snakeCanvas.width = window.innerWidth;
    snakeCanvas.height = window.innerHeight;
    snakeCanvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.8);
    `;
    document.body.appendChild(snakeCanvas);
    
    // Lógica do Snake
    const ctx = snakeCanvas.getContext('2d');
    if (!ctx) return;
    
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 1;
    let dy = 0;
    let score = 0;
    
    const gridSize = 25;
    const tileCount = Math.floor(snakeCanvas.width / gridSize);
    const tileCountY = Math.floor(snakeCanvas.height / gridSize);
    
    // Adicionar texto "KONAMI SNAKE"
    const title = document.createElement('div');
    title.className = 'easter-egg-text';
    title.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: #00ff00;
      font-family: 'Courier New', monospace;
      font-size: 24px;
      font-weight: bold;
      z-index: 10000;
      pointer-events: none;
      text-shadow: 0 0 10px #00ff00;
      animation: dev-scan 2s ease-in-out infinite;
    `;
    title.textContent = '🐍 KONAMI SNAKE 🐍';
    document.body.appendChild(title);
    
    const gameLoop = () => {
      // Limpar canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
      
      // Mover cobra
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);
      
      // Verificar colisão com comida
      if (head.x === food.x && head.y === food.y) {
        score++;
        console.log(`🐍 Snake pegou comida! Score: ${score}`);
        food = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCountY)
        };
      } else {
        snake.pop();
      }
      
      // Verificar colisões
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCountY ||
          snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        // Game over - recriar cobra
        snake = [{ x: Math.floor(tileCount/2), y: Math.floor(tileCountY/2) }];
        dx = 1;
        dy = 0;
        score = 0;
      }
      
      // Desenhar cobra com gradiente
      snake.forEach((segment, index) => {
        const alpha = index === 0 ? 1 : 0.7 - (index * 0.1);
        ctx.fillStyle = `rgba(0, 255, 0, ${Math.max(alpha, 0.3)})`;
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        
        // Cabeça da cobra
        if (index === 0) {
          ctx.fillStyle = '#00ff00';
          ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 2, gridSize - 6, gridSize - 6);
        }
      });
      
      // Desenhar comida com brilho
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
      ctx.fillStyle = '#ffff00';
      ctx.fillRect(food.x * gridSize + 2, food.y * gridSize + 2, gridSize - 6, gridSize - 6);
      
      // Desenhar score
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(`Score: ${score}`, 20, 60);
    };
    
    // IA inteligente para buscar a comida automaticamente
    const getBestDirection = () => {
      const head = snake[0];
      const targetX = food.x;
      const targetY = food.y;
      
      // Calcular distâncias para cada direção
      const directions = [
        { dx: 1, dy: 0, name: 'direita' },
        { dx: -1, dy: 0, name: 'esquerda' },
        { dx: 0, dy: 1, name: 'baixo' },
        { dx: 0, dy: -1, name: 'cima' }
      ];
      
      // Função para verificar se uma posição é segura
      const isSafe = (x, y) => {
        if (x < 0 || x >= tileCount || y < 0 || y >= tileCountY) {
          return false;
        }
        return !snake.slice(0, -1).some(segment => segment.x === x && segment.y === y);
      };
      
      // Função para calcular quantas direções seguras existem a partir de uma posição
      const getSafeDirectionsCount = (x, y) => {
        return directions.filter(dir => isSafe(x + dir.dx, y + dir.dy)).length;
      };
      
      // Avaliar cada direção
      const evaluatedDirections = directions.map(dir => {
        const newHead = { x: head.x + dir.dx, y: head.y + dir.dy };
        const distToFood = Math.abs(newHead.x - targetX) + Math.abs(newHead.y - targetY);
        const isSafeMove = isSafe(newHead.x, newHead.y);
        const safeDirectionsFromNewPos = getSafeDirectionsCount(newHead.x, newHead.y);
        
        return {
          ...dir,
          distToFood,
          isSafeMove,
          safeDirectionsFromNewPos,
          score: isSafeMove ? (1000 - distToFood) + (safeDirectionsFromNewPos * 100) : -1000
        };
      });
      
      // Filtrar apenas movimentos seguros
      const safeDirections = evaluatedDirections.filter(dir => dir.isSafeMove);
      
      if (safeDirections.length === 0) {
        // Se não há movimentos seguros, tentar qualquer movimento
        const anyDirections = directions.filter(dir => {
          const newHead = { x: head.x + dir.dx, y: head.y + dir.dy };
          return newHead.x >= 0 && newHead.x < tileCount && newHead.y >= 0 && newHead.y < tileCountY;
        });
        
        if (anyDirections.length > 0) {
          return anyDirections[Math.floor(Math.random() * anyDirections.length)];
        }
        
        return { dx, dy }; // Manter direção atual se tudo falhar
      }
      
      // Escolher a melhor direção (menor distância + mais direções seguras futuras)
      const bestDirection = safeDirections.reduce((best, current) => 
        current.score > best.score ? current : best
      );
      
      return { dx: bestDirection.dx, dy: bestDirection.dy };
    };
    
    const changeDirection = () => {
      const newDirection = getBestDirection();
      dx = newDirection.dx;
      dy = newDirection.dy;
    };
    
    // Iniciar jogo
    const gameInterval = setInterval(() => {
      changeDirection();
      gameLoop();
    }, 150); // Mais rápido
    
    // Auto-clear após 10 segundos
    setTimeout(() => {
      clearInterval(gameInterval);
      snakeCanvas.remove();
      clearPreviousEffects();
    }, 10000);
  };

  // Keyboard handler
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const key = event.code;
    
    // Verificar sequências complexas
    easterEggs.forEach(egg => {
      if (!egg.unlocked && egg.sequence.length > 1) {
        // Inicializar sequência se não existir
        if (!currentSequences[egg.id]) {
          setCurrentSequences(prev => ({ ...prev, [egg.id]: [] }));
        }
        
        // Adicionar tecla à sequência atual
        setCurrentSequences(prev => {
          const currentSeq = prev[egg.id] || [];
          const newSeq = [...currentSeq, key];
          
          // Verificar se a sequência está correta
          if (newSeq.length <= egg.sequence.length) {
            const isCorrect = newSeq.every((k, i) => k === egg.sequence[i]);
            
            if (isCorrect && newSeq.length === egg.sequence.length) {
              // Sequência completa!
              setTimeout(() => {
                unlockEasterEgg(egg.id);
                triggerSpecialEffect(egg.id);
              }, 100);
              return { ...prev, [egg.id]: [] }; // Reset
            } else if (isCorrect) {
              // Sequência parcial correta
              return { ...prev, [egg.id]: newSeq };
            } else {
              // Sequência incorreta, reset
              return { ...prev, [egg.id]: [] };
            }
          }
          
          return { ...prev, [egg.id]: [] }; // Reset se excedeu o tamanho
        });
      }
      // Easter Eggs de tecla única
      else if (!egg.unlocked && egg.sequence.length === 1 && egg.sequence[0] === key) {
        unlockEasterEgg(egg.id);
        triggerSpecialEffect(egg.id);
      }
    });
  }, [easterEggs, currentSequences, unlockEasterEgg]);

  // Touch handlers para mobile
  const handleTouch = useCallback((_event: TouchEvent, element: string) => {
    if (!isMobile) return;
    
    console.log(`📱 Touch detectado no elemento: ${element}`);
    
    // Verificar Easter Eggs de tap específicos por elemento
    easterEggs.forEach(egg => {
      if (!egg.unlocked && egg.id.includes('mobile')) {
        console.log(`🔍 Verificando Easter Egg: ${egg.id} para elemento: ${element}`);
        
        // Para coffee-mobile, só conta se for na foto e contar taps
        if (egg.id === 'coffee-mobile' && element === 'photo') {
          setCoffeeTapCount(prev => {
            const newCount = prev + 1;
            console.log(`☕ Coffee Photo taps: ${newCount}/3`);
            if (newCount >= 3) {
              console.log(`✅ Coffee Photo Easter Egg ativado!`);
              unlockEasterEgg(egg.id);
              triggerSpecialEffect(egg.id);
              return 0; // Reset
            }
            return newCount;
          });
        }
        // Para konami-mobile, só conta se for no logo
        else if (egg.id === 'konami-mobile' && element === 'logo') {
          console.log(`🐍 Konami Mobile Easter Egg ativado!`);
          unlockEasterEgg(egg.id);
          triggerSpecialEffect('snake'); // Ativar Snake Mode
        }
        // Para outros Easter Eggs mobile (shake-mobile não usa handleTouch)
        else if (egg.id !== 'coffee-mobile' && egg.id !== 'konami-mobile') {
          console.log(`✅ Easter Egg mobile ativado: ${egg.id}`);
          unlockEasterEgg(egg.id);
          triggerSpecialEffect(egg.id);
        }
      }
    });
  }, [isMobile, easterEggs, unlockEasterEgg, triggerSpecialEffect]);

  const handleSwipe = useCallback((direction: string) => {
    if (!isMobile) return;
    
    // Verificar Easter Eggs de swipe
    easterEggs.forEach(egg => {
      if (!egg.unlocked && egg.id.includes('mobile') && egg.sequence.includes(`swipe-${direction}`)) {
        unlockEasterEgg(egg.id);
        showNotification(egg.reward || `Easter Egg desbloqueado: ${egg.name}!`);
        triggerSpecialEffect(egg.id);
      }
    });
  }, [isMobile, easterEggs, unlockEasterEgg]);

  const handleShake = useCallback(() => {
    if (!isMobile) {
      console.log(`🚫 Shake ignorado - não é mobile`);
      return;
    }
    
    console.log(`📱 Shake detectado no mobile!`);
    
    // Verificar shake Easter Egg
    easterEggs.forEach(egg => {
      if (!egg.unlocked && egg.id === 'shake-mobile') {
        console.log(`🎉 Shake Easter Egg ativado!`);
        unlockEasterEgg(egg.id);
        showNotification(egg.reward || `Easter Egg desbloqueado: ${egg.name}!`);
        triggerSpecialEffect(egg.id);
      }
    });
  }, [isMobile, easterEggs, unlockEasterEgg, showNotification, triggerSpecialEffect]);

  // Event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!isMobile) return;
    
    let lastShake = 0;
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;
      
      const { x, y, z } = acceleration;
      if (x === null || y === null || z === null) return;
      const accelerationMagnitude = Math.sqrt(x * x + y * y + z * z);
      
      // Log para debug (apenas quando magnitude > 10 para não spam)
      if (accelerationMagnitude > 10) {
        console.log(`📱 Aceleração: ${accelerationMagnitude.toFixed(2)}g (x:${x?.toFixed(1)}, y:${y?.toFixed(1)}, z:${z?.toFixed(1)})`);
      }
      
      if (accelerationMagnitude > 15 && Date.now() - lastShake > 1000) {
        console.log(`🎉 Shake detectado! Magnitude: ${accelerationMagnitude.toFixed(2)}g`);
        lastShake = Date.now();
        handleShake();
      }
    };
    
    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => window.removeEventListener('devicemotion', handleDeviceMotion);
  }, [isMobile, handleShake]);

  return {
    easterEggs,
    visitCount,
    isMobile,
    handleTouch,
    handleSwipe,
    handleShake,
    unlockEasterEgg,
    activateSnakeMode
  };
};