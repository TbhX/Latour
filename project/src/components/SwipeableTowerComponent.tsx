import React, { useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform, animate } from 'framer-motion';
import Floor from './Floor';
import { FloorData } from '../types';

interface SwipeableTowerProps {
  floors: FloorData[];
  currentFloor: number;
  onFloorChange: (floor: number) => void;
}

export default function SwipeableTower({ floors, currentFloor, onFloorChange }: SwipeableTowerProps) {
  const [isDragging, setIsDragging] = useState(false);
  
  // Configuration du swipe
  const SWIPE_THRESHOLD = 50; // pixels minimum pour changer d'étage
  const SNAP_DURATION = 0.5; // durée de l'animation en secondes
  
  // Valeur de position Y pour le swipe
  const y = useMotionValue(0);
  
  // Transformation de la position Y en opacité pour l'effet de fondu
  const opacity = useTransform(
    y,
    [-window.innerHeight, 0, window.innerHeight],
    [0.3, 1, 0.3]
  );

  // Gestion du drag
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const yOffset = info.offset.y;
    const velocity = info.velocity.y;

    // Changement d'étage basé sur la direction et la vitesse du swipe
    if (Math.abs(yOffset) > SWIPE_THRESHOLD || Math.abs(velocity) > 500) {
      const direction = yOffset > 0 ? -1 : 1;
      const newFloorIndex = Math.min(
        Math.max(currentFloor + direction, 1),
        floors.length
      );
      
      onFloorChange(newFloorIndex);
      
      // Animation de retour à la position initiale
      animate(y, 0, {
        duration: SNAP_DURATION,
        type: "spring",
        bounce: 0.2
      });
    } else {
      // Retour à la position initiale si le swipe n'est pas assez fort
      animate(y, 0, {
        duration: SNAP_DURATION,
        type: "spring",
        bounce: 0.2
      });
    }
  };

  return (
    <motion.div
      className="relative h-screen w-full overflow-hidden touch-none"
      style={{ y }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.4}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Indicateur visuel de swipe */}
      <div className="fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none">
        <motion.div 
          className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm"
          style={{ opacity }}
        >
          Swipe pour changer d'étage
        </motion.div>
      </div>

      {/* Étage actuel */}
      <motion.div style={{ opacity }}>
        <Floor
          floor={floors[currentFloor - 1]}
          isActive={true}
        />
      </motion.div>
      
      {/* Indicateurs de direction */}
      <motion.div 
        className="fixed inset-x-0 bottom-8 z-50 flex justify-center gap-4 pointer-events-none"
        style={{ opacity: useTransform(y, [-50, 0, 50], [1, 0, 1]) }}
      >
        {currentFloor < floors.length && (
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
            ⬆️ Étage {currentFloor + 1}
          </div>
        )}
        {currentFloor > 1 && (
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
            ⬇️ Étage {currentFloor - 1}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}