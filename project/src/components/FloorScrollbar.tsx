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
  const [scrollPosition, setScrollPosition] = useState(0);
  const floorsPerView = 10;

  // Update scroll position and visible floors when the floor is selected
  useEffect(() => {
    const indexOfCurrentFloor = floors.indexOf(currentFloor);
    if (indexOfCurrentFloor !== -1) {
      const newScrollPosition = Math.floor(indexOfCurrentFloor / floorsPerView) * floorsPerView;
      setScrollPosition(newScrollPosition);
    }
  }, [currentFloor, floors]);

  // Update visible floors based on scroll position
  const visibleFloors = floors.slice(scrollPosition, scrollPosition + floorsPerView);

  const handleScroll = (event: React.WheelEvent) => {
    event.preventDefault();
    const newScrollPosition = scrollPosition + (event.deltaY > 0 ? floorsPerView : -floorsPerView);
    
    // Clamp the scroll position to valid bounds
    if (newScrollPosition >= 0 && newScrollPosition <= floors.length - floorsPerView) {
      setScrollPosition(newScrollPosition);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    const screenHeight = window.innerHeight;
    const mouseY = event.clientY;

    // If mouse is near the top of the screen, scroll up
    if (mouseY < 50 && scrollPosition > 0) {
      setScrollPosition((prev) => Math.max(prev - floorsPerView, 0));
    }
    // If mouse is near the bottom of the screen, scroll down
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
            // When clicking on an individual floor, update the scroll position to center that floor
            const indexOfFloor = floors.indexOf(floor);
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
