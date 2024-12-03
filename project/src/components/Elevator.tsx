import React from "react";
import { X } from "lucide-react";

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

  const totalFloors = 100;
  const floorsPerGroup = 10;

  // Generate floor groups in ascending order (from 1 to 100)
  const floorGroups = Array.from({ length: Math.ceil(totalFloors / floorsPerGroup) }, (_, i) => {
    const start = i * floorsPerGroup + 1; // First floor in the group
    return Array.from({ length: floorsPerGroup }, (_, j) => start + j).filter(floor => floor <= totalFloors);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl bg-gray-900 p-6 shadow-xl">
        {/* Button to close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-white/10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Title */}
        <h2 className="mb-6 text-2xl font-bold text-white">Select Floor</h2>

        {/* Buttons for floors */}
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
                  className={`aspect-square rounded-lg p-2 text-sm font-medium transition ${
                    floor === currentFloor
                      ? "bg-white text-gray-900"
                      : "bg-gray-800 hover:bg-gray-700"
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
