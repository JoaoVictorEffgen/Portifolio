import { useEffect } from 'react';
import { useEasterEggs } from '../hooks/useEasterEggs';

const SwipeDetector = () => {
  const { handleSwipe, isMobile } = useEasterEggs();

  useEffect(() => {
    if (!isMobile) return;

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const diffX = endX - startX;
      const diffY = endY - startY;
      
      // Determinar direção do swipe
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Swipe horizontal
        if (Math.abs(diffX) > 50) { // Mínimo de 50px para considerar swipe
          if (diffX > 0) {
            handleSwipe('right');
          } else {
            handleSwipe('left');
          }
        }
      } else {
        // Swipe vertical
        if (Math.abs(diffY) > 50) { // Mínimo de 50px para considerar swipe
          if (diffY > 0) {
            handleSwipe('down');
          } else {
            handleSwipe('up');
          }
        }
      }
    };

    // Adicionar event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, handleSwipe]);

  return null; // Este componente não renderiza nada
};

export default SwipeDetector;
