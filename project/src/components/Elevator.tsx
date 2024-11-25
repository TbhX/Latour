import React from 'react';
import { X } from 'lucide-react';

interface ElevatorProps {
  isOpen: boolean;
  onClose: () => void;
  currentFloor: number;
  onFloorSelect: (floor: number) => void;
}

export default function Elevator({
  isOpen,
  onClose,
  currentFloor,
  onFloorSelect,
}: ElevatorProps) {
  if (!isOpen) return null;

  // Génération des groupes d'étages
  const floorGroups = Array.from({ length: 10 }, (_, i) => {
    const start = 91 - i * 10;
    return Array.from({ length: 10 }, (_, j) => start + j);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl bg-gray-900 p-6 shadow-xl">
        {/* Bouton pour fermer l'ascenseur */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-white/10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Titre */}
        <h2 className="mb-6 text-2xl font-bold">Select Floor</h2>

        {/* Grille des étages */}
        <div className="grid gap-4">
          {floorGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="grid grid-cols-5 gap-2">
              {group.map(floor => (
                <button
                  key={floor}
                  onClick={() => {
                    onFloorSelect(floor);
                    onClose();
                  }}
                  className={`aspect-square rounded-lg p-2 text-sm font-medium transition
                    ${
                      floor === currentFloor
                        ? 'bg-white text-gray-900'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                >
                  {floor}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}