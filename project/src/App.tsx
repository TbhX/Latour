import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Elevator from "./components/Elevator";
import FloorInfo from "./components/FloorInfo";

import TowerScene from "./components/TowerScene";
import { floors } from "./data/floors";

// Floor number display component
const FloorDisplay = ({ floor }: { floor: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="fixed top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
  >
    <span className="text-2xl font-bold">{floor}</span>
    <span className="text-sm opacity-75">FL</span>
  </motion.div>
);

// Control buttons component
const ControlButtons = ({ 
  onElevatorOpen, 
  onInfoOpen 
}: { 
  onElevatorOpen: () => void;
  onInfoOpen: () => void;
}) => (
  <>
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onElevatorOpen}
      className="fixed top-4 right-20 z-50 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-colors hover:bg-white/20"
      aria-label="Open elevator"
    >
      <span role="img" aria-label="elevator">🏢</span>
    </motion.button>

    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onInfoOpen}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/20"
    >
      <span role="img" aria-label="info">ℹ️</span>
      <span>Floor Info</span>
    </motion.button>
  </>
);

// Floor content component
const FloorContent = ({ 
  floors, 
  currentFloor 
}: { 
  floors: typeof import('./data/floors').floors;
  currentFloor: number;
}) => (
  <motion.div
    className="h-full w-full transition-transform duration-1000"
    style={{
      transform: `translateY(-${(currentFloor - 1) * 100}vh)`,
    }}
  >
    {floors.map((floor) => (
      <div
        key={floor.level}
        className={`
          h-screen w-full
          flex items-center justify-center
          transition-opacity duration-500
          ${currentFloor === floor.level ? "opacity-100" : "opacity-50"}
        `}
      >
        <h1 className="text-4xl font-bold">{`Floor ${floor.level}`}</h1>
      </div>
    ))}
  </motion.div>
);

const App = () => {
  const [currentFloor, setCurrentFloor] = useState(100);
  const [isElevatorOpen, setIsElevatorOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const floorLevels = floors.map(f => f.level);
  const currentFloorData = floors.find(f => f.level === currentFloor)!;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-blue-900 to-black text-white">
      {/* Background Scene */}
      <TowerScene currentFloor={currentFloor} />

      {/* UI Elements */}
      <FloorDisplay floor={currentFloor} />
      
      <ControlButtons 
        onElevatorOpen={() => setIsElevatorOpen(true)}
        onInfoOpen={() => setIsInfoOpen(true)}
      />

      <FloorScrollbar
        floors={floorLevels}
        currentFloor={currentFloor}
        onFloorSelect={setCurrentFloor}
      />

      {/* Main Content */}
      <FloorContent floors={floors} currentFloor={currentFloor} />

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
};

export default App;
