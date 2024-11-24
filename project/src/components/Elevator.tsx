import React from 'react';
 import { X, Users, TrendingUp, CalendarCheck, Info, Building2 } from 'react-feather'; 
import { motion } from 'framer-motion';

function Elevator({ onClose, onFloorSelect, floorGroups, currentFloor }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl bg-gray-900 p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-white/10"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-center">Select Floor</h2>

        <div className="grid gap-4">
          {floorGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="grid grid-cols-3 gap-2 sm:grid-cols-5">
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

export default Elevator;