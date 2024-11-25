import React, { useEffect } from "react";

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
  // Handle mouse wheel scrolling
  const handleScroll = (event: React.WheelEvent) => {
    event.preventDefault();
    
    // Get current floor index
    const sortedFloors = [...floors].sort((a, b) => b - a); // Sort floors in descending order
    const currentIndex = sortedFloors.indexOf(currentFloor);
    
    if (event.deltaY > 0) {
      // Scrolling down - go to lower floor
      if (currentIndex < sortedFloors.length - 1) {
        onFloorSelect(sortedFloors[currentIndex + 1]);
      }
    } else {
      // Scrolling up - go to higher floor
      if (currentIndex > 0) {
        onFloorSelect(sortedFloors[currentIndex - 1]);
      }
    }
  };

  useEffect(() => {
    const handleWheelEvent = (event: WheelEvent) => {
      event.preventDefault();
      handleScroll(event as any);
    };

    window.addEventListener("wheel", handleWheelEvent, { passive: false });
    return () => window.removeEventListener("wheel", handleWheelEvent);
  }, [currentFloor, floors]);

  return (
    <div
      className="fixed right-0 top-0 bottom-0 flex flex-col justify-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm z-50"
      onWheel={handleScroll}
    >
      {[...floors].sort((a, b) => b - a).map((floor) => (
        <button
          key={floor}
          onClick={() => onFloorSelect(floor)}
          className={`
            w-12 h-12 
            rounded-full 
            flex items-center justify-center
            transition-all duration-300
            ${
              currentFloor === floor 
                ? "bg-white text-black scale-110" 
                : "bg-gray-500/50 text-white hover:bg-gray-400/50"
            }
          `}
        >
          {floor}
        </button>
      ))}
    </div>
  );
};

export default FloorScrollbar;