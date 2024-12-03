import React, { useEffect, useState } from "react";

type FloorScrollbarProps = {
  floors: number[];
  currentFloor: number;
  onFloorSelect: (floor: number) => void;
};

const FloorScrollbar: React.FC<FloorScrollbarProps> = ({
  floors,
  currentFloor,
  onFloorSelect,
}) => {
  // L'ordre des étages doit commencer par l'étage 100 et finir par l'étage 1.
  const reversedFloors = floors.slice().reverse(); 
  const [scrollPosition, setScrollPosition] = useState(0);
  const floorsPerView = 10;

  // Initialisation de la scrollPosition pour que l'étage 100 soit visible dès le début.
  useEffect(() => {
    const indexOfCurrentFloor = reversedFloors.indexOf(currentFloor);
    if (indexOfCurrentFloor !== -1) {
      const newScrollPosition = Math.floor(indexOfCurrentFloor / floorsPerView) * floorsPerView;
      setScrollPosition(newScrollPosition);
    }
  }, [currentFloor, reversedFloors]);

  // Mise à jour des étages visibles en fonction de la scrollPosition
  const visibleFloors = reversedFloors.slice(scrollPosition, scrollPosition + floorsPerView);

  const handleScroll = (event: React.WheelEvent) => {
    event.preventDefault();
    const newScrollPosition = scrollPosition + (event.deltaY > 0 ? floorsPerView : -floorsPerView);

    // Clamp la position de scroll à des valeurs valides
    if (newScrollPosition >= 0 && newScrollPosition <= floors.length - floorsPerView) {
      setScrollPosition(newScrollPosition);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    const screenHeight = window.innerHeight;
    const mouseY = event.clientY;

    // Si la souris est proche du haut de l'écran, défilement vers le haut
    if (mouseY < 50 && scrollPosition > 0) {
      setScrollPosition((prev) => Math.max(prev - floorsPerView, 0));
    }
    // Si la souris est proche du bas de l'écran, défilement vers le bas
    if (mouseY > screenHeight - 50 && scrollPosition < floors.length - floorsPerView) {
      setScrollPosition((prev) => Math.min(prev + floorsPerView, floors.length - floorsPerView));
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [scrollPosition, floors]);

  return (
    <div
      className="fixed right-0 top-0 bottom-0 flex flex-col justify-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm z-50 overflow-hidden"
      onWheel={handleScroll}
    >
      {visibleFloors.map((floor) => (
        <button
          key={floor}
          onClick={() => {
            onFloorSelect(floor);
            // Quand on clique sur un étage, mettre à jour la position du scroll
            const indexOfFloor = reversedFloors.indexOf(floor);
            const newScrollPosition = Math.floor(indexOfFloor / floorsPerView) * floorsPerView;
            setScrollPosition(newScrollPosition);
          }}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            currentFloor === floor
              ? "bg-white text-black scale-110"
              : "bg-gray-500/50 text-white hover:bg-gray-400/50"
          }`}
        >
          {floor}
        </button>
      ))}
    </div>
  );
};

export default FloorScrollbar;
