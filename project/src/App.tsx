import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Building2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Floor from './components/Floor';
import Elevator from './components/Elevator';
import FloorInfo from './components/FloorInfo';
import TowerScene from './components/TowerScene';
import { floors } from './data/floors';

function App() {
  const [currentFloor, setCurrentFloor] = useState(100);
  const [isElevatorOpen, setIsElevatorOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      if (e.deltaY < 0 && currentFloor < 100) {
        setCurrentFloor((prev) => Math.min(prev + 1, 100));
      } else if (e.deltaY > 0 && currentFloor > 1) {
        setCurrentFloor((prev) => Math.max(prev - 1, 1));
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentFloor]);

  const currentFloorData = floors.find((f) => f.level === currentFloor);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-blue-900 to-black text-white">
      <TowerScene currentFloor={currentFloor} />

      {/* Elevator Button */}
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

      {/* Floors */}
      <div className="h-full w-full overflow-y-auto">
        {floors.map((floor) => (
          <Floor
            key={floor.level}
            floor={floor}
            isActive={currentFloor === floor.level}
            onOpenInfo={() => setIsInfoOpen(true)}
          />
        ))}
      </div>

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