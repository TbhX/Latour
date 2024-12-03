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
  const reversedFloors = [...floors].reverse(); // Inverser les étages
  const [visibleFloors, setVisibleFloors] = useState(reversedFloors.slice(0, 10));
  const [scrollPosition, setScrollPosition] = useState(0);
  const floorsPerView = 10;

  // Mettre à jour les étages visibles en fonction de la position de défilement
  useEffect(() => {
    const start = scrollPosition;
    const end = start + floorsPerView;
    setVisibleFloors(reversedFloors.slice(start, end));
  }, [scrollPosition, reversedFloors]);

  const handleScroll = (event: React.WheelEvent) => {
    event.preventDefault();
    if (event.deltaY > 0 && scrollPosition < reversedFloors.length - floorsPerView) {
      setScrollPosition((prev) => prev + 1);
    } else if (event.deltaY < 0 && scrollPosition > 0) {
      setScrollPosition((prev) => prev - 1);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    const screenHeight = window.innerHeight;
    const mouseY = event.clientY;

    // Si la souris est proche du haut de l'écran, faites défiler vers le haut
    if (mouseY < 50 && scrollPosition > 0) {
      setScrollPosition((prev) => prev - 1);
    }
    // Si la souris est proche du bas de l'écran, faites défiler vers le bas
    if (
      mouseY > screenHeight - 50 &&
      scrollPosition < reversedFloors.length - floorsPerView
    ) {
      setScrollPosition((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [scrollPosition, reversedFloors]);

  return (
    <div
      className="fixed right-0 top-0 bottom-0 flex flex-col justify-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm z-50 overflow-hidden"
      onWheel={handleScroll}
    >
      {visibleFloors.map((floor) => (
        <button
          key={floor}
          onClick={() => onFloorSelect(floor)}
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
