import React from 'react';
import { X } from 'lucide-react';

interface ElevatorProps {
  isOpen: boolean;
  onClose: () => void;
  currentFloor: number;
  onFloorSelect: (floor: number) => void;
}
