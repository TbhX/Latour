import React, { useState, useEffect } from "react";

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
  const [scrollPosition, setScrollPosition] = useState(0);

  // Utiliser la position de la molette pour ajuster l'étage
  const handleScroll = (event: React.WheelEvent) => {
    // Si la molette est utilisée vers le bas (défilement vers le bas)
    if (event.deltaY > 0) {
      const nextFloor = Math.min(currentFloor + 1, floors.length);
      onFloorSelect(nextFloor);
    } else if (event.deltaY < 0) {
      const prevFloor = Math.max(currentFloor - 1, 1);
      onFloorSelect(prevFloor);
    }
  };

  useEffect(() => {
    // Écouter les événements de la molette
    const onWheel = (event: WheelEvent) => {
      handleScroll(event as any);
    };

    // Ajouter l'événement de molette
    window.addEventListener("wheel", onWheel, { passive: true });

    // Nettoyer l'événement lors du démontage
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [currentFloor]);

  return (
    <div
      className="fixed right-0 top-0 bottom-0 flex flex-col gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm z-50 cursor-pointer"
      style={{ height: "100vh" }}
      onWheel={handleScroll}
    >
      {floors.map((floor) => (
        <div
          key={floor}
          className={`p-2 rounded-full cursor-pointer transition-colors ${
            currentFloor === floor ? "bg-white text-black" : "bg-gray-500 text-white"
          }`}
        >
          {floor}
        </div>
      ))}
    </div>
  );
};

export default FloorScrollbar;
