import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface FloorScrollbarProps {
  currentFloor: number;
  onFloorChange: (floor: number) => void;
}

export default function FloorScrollbar({ currentFloor, onFloorChange }: FloorScrollbarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  // Inversion du sens de défilement (haut = croissant, bas = décroissant)
  const calculateFloorFromPosition = (clientY: number) => {
    if (!scrollbarRef.current) return currentFloor;

    const rect = scrollbarRef.current.getBoundingClientRect();
    const percentage = (clientY - rect.top) / rect.height;
    const floor = Math.round(percentage * 99 + 1); // Haut = valeurs croissantes
    return Math.max(1, Math.min(100, floor));
  };

  const handleDrag = (e: MouseEvent) => {
    if (!isDragging) return;
    const newFloor = calculateFloorFromPosition(e.clientY);
    onFloorChange(newFloor);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => handleDrag(e);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Calcul de la position du handle (en pourcentage)
  const handlePosition = ((currentFloor - 1) / 99) * 100;

  return (
    <div className="fixed left-8 top-1/2 z-50 h-[60vh] -translate-y-1/2">
      <div
        ref={scrollbarRef}
        className="relative h-full w-1 rounded-full bg-white/10 backdrop-blur-sm"
        onClick={(e) => {
          const newFloor = calculateFloorFromPosition(e.clientY);
          onFloorChange(newFloor);
        }}
      >
        <motion.div
          ref={handleRef}
          className="absolute left-1/2 flex -translate-x-1/2 cursor-pointer items-center"
          style={{ top: `${handlePosition}%` }}
          animate={{ top: `${handlePosition}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div
            className="h-12 w-12 -translate-x-1 rounded-xl bg-white/10 p-2 backdrop-blur-lg transition-all hover:bg-white/20"
            onMouseDown={() => setIsDragging(true)}
          >
            <div className="flex h-full flex-col items-center justify-center">
              <span className="text-xs font-semibold text-white/60">FL</span>
              <span className="text-sm font-bold">{currentFloor}</span>
            </div>
          </div>
          <div className="h-0.5 w-3 bg-white/20" />
        </motion.div>
      </div>
    </div>
  );
}
