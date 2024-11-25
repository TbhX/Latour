import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Elevator from "./components/Elevator";
import FloorInfo from "./components/FloorInfo";
import FloorScrollbar from "./components/FloorScrollbar";
import TowerScene from "./components/TowerScene";
import { floors } from "./data/floors";

function App() {
  const [currentFloor, setCurrentFloor] = useState(100);
  const [isElevatorOpen, setIsElevatorOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const currentFloorData = floors.find((f) => f.level === currentFloor)!;

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-blue-900 to-black text-white">
      {/* Scène de la tour */}
      <TowerScene currentFloor={currentFloor} />

      {/* Affichage du numéro de l'étage */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm"
      >
        <span className="text-2xl font-bold">{currentFloor}</span>
        <span className="text-sm opacity-75">FL</span>
      </motion.div>

      {/* Bouton pour ouvrir l'ascenseur */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setIsElevatorOpen(true)}
        className="fixed top-4 right-4 z-50 rounded-full bg-white/10 p-3 backdrop-blur-sm transition hover:bg-white/20"
        aria-label="Open elevator"
      >
        <span role="img" aria-label="elevator">
          🏢
        </span>
      </motion.button>

      {/* Barre de défilement des étages */}
      <FloorScrollbar
        floors={floors.map((f) => f.level)} // Liste des étages
        currentFloor={currentFloor}
        onFloorSelect={(floor) => setCurrentFloor(floor)}
      />

      {/* Contenu principal des étages */}
      <motion.div
        className="h-full w-full transition-transform duration-1000"
        style={{
          transform: `translateY(${(100 - currentFloor) * 100}vh)`,
        }}
      >
        {floors.map((floor) => (
          <div
            key={floor.level}
            className={`h-screen flex items-center justify-center ${
              currentFloor === floor.level ? "opacity-100" : "opacity-50"
            }`}
          >
            <h1 className="text-4xl font-bold">{`Floor ${floor.level}`}</h1>
          </div>
        ))}
      </motion.div>

      {/* Bouton pour afficher les infos de l'étage */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setIsInfoOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm transition hover:bg-white/20"
      >
        ℹ️ <span>Floor Info</span>
      </motion.button>

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
