import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Building2, Info } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import Floor from './components/Floor';
import Elevator from './components/Elevator';
import FloorInfo from './components/FloorInfo';
import TowerScene from './components/TowerScene';
import { floors } from './data/floors';

function App() {
  const [currentFloor, setCurrentFloor] = useState(100);
  const [isElevatorOpen, setIsElevatorOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Configuration du swipe
  const SWIPE_THRESHOLD = 50;
  const SWIPE_VELOCITY_THRESHOLD = 500;
  const y = useMotionValue(0);
  const opacity = useTransform(
    y,
    [-window.innerHeight/2, 0, window.innerHeight/2],
    [0.3, 1, 0.3]
  );

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (isDragging) return;
      e.preventDefault();
      if (e.deltaY < 0 && currentFloor < 100) {
        setCurrentFloor(prev => Math.min(prev + 1, 100));
      } else if (e.deltaY > 0 && currentFloor > 1) {
        setCurrentFloor(prev => Math.max(prev - 1, 1));
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentFloor, isDragging]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const yOffset = info.offset.y;
    const velocity = info.velocity.y;

    if (Math.abs(yOffset) > SWIPE_THRESHOLD || Math.abs(velocity) > SWIPE_VELOCITY_THRESHOLD) {
      if (yOffset > 0 && currentFloor > 1) {
        setCurrentFloor(prev => Math.max(prev - 1, 1));
      } else if (yOffset < 0 && currentFloor < 100) {
        setCurrentFloor(prev => Math.min(prev + 1, 100));
      }
    }

    // Reset position
    y.set(0);
  };

  const currentFloorData = floors.find(f => f.level === currentFloor)!;

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-blue-900 to-black text-white">
      <TowerScene currentFloor={currentFloor} />

      {/* Navigation Controls */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 right-4 z-50 flex flex-col items-center gap-4"
      >
        <button
          onClick={() => setIsElevatorOpen(true)}
          className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition hover:bg-white/20"
          aria-label="Open elevator"
        >
          <Building2 className="h-6 w-6" />
        </button>
        <div className="flex flex-col gap-2 rounded-full bg-white/10 p-2 backdrop-blur-sm">
          <button
            onClick={() => setCurrentFloor(prev => Math.min(prev + 1, 100))}
            disabled={currentFloor === 100}
            className="rounded-full p-2 transition hover:bg-white/20 disabled:opacity-50"
            aria-label="Go up"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentFloor(prev => Math.max(prev - 1, 1))}
            disabled={currentFloor === 1}
            className="rounded-full p-2 transition hover:bg-white/20 disabled:opacity-50"
            aria-label="Go down"
          >
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </motion.div>

      {/* Current Floor Display */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
      >
        <span className="text-2xl font-bold">{currentFloor}</span>
        <span className="text-sm opacity-75">FL</span>
      </motion.div>

      {/* Floor Info Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setIsInfoOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm transition hover:bg-white/20"
      >
        <Info className="h-5 w-5" />
        <span>Floor Info</span>
      </motion.button>

      {/* Main Content with Swipe */}
      <motion.div
        className="h-full w-full touch-none"
        style={{ y }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.4}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <motion.div
          className="h-full w-full transition-transform duration-1000"
          style={{
            transform: `translateY(${(100 - currentFloor) * 100}vh)`,
            opacity
          }}
        >
          {floors.map((floor) => (
            <Floor
              key={floor.level}
              floor={floor}
              isActive={currentFloor === floor.level}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Swipe Indicator */}
      <motion.div 
        className="fixed inset-x-0 bottom-20 z-50 flex justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDragging ? 1 : 0 }}
      >
        <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
          {currentFloor < 100 && "⬆️ Glissez vers le haut"}
          {currentFloor > 1 && "⬇️ Glissez vers le bas"}
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {isElevatorOpen && (
          <Elevator
            isOpen={isElevatorOpen}
            onClose={() => setIsElevatorOpen(false)}
            currentFloor={currentFloor}
            onFloorSelect={setCurrentFloor}
          />
        )}
        {isInfoOpen && (
          <FloorInfo
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(false)}
            floor={currentFloorData}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;