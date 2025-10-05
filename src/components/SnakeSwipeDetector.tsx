import { useEffect, useRef } from 'react';

interface SnakeSwipeDetectorProps {
  onSwipe: (direction: string) => void;
  isActive: boolean;
}

const SnakeSwipeDetector = ({ onSwipe, isActive }: SnakeSwipeDetectorProps) => {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (!isActive) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartX.current || !touchStartY.current) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const diffX = touchEndX - touchStartX.current;
      const diffY = touchEndY - touchStartY.current;
      
      const minSwipeDistance = 50;
      
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Swipe horizontal
        if (Math.abs(diffX) > minSwipeDistance) {
          if (diffX > 0) {
            onSwipe('right');
          } else {
            onSwipe('left');
          }
        }
      } else {
        // Swipe vertical
        if (Math.abs(diffY) > minSwipeDistance) {
          if (diffY > 0) {
            onSwipe('down');
          } else {
            onSwipe('up');
          }
        }
      }
      
      // Reset
      touchStartX.current = 0;
      touchStartY.current = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipe, isActive]);

  return null;
};

export default SnakeSwipeDetector;
