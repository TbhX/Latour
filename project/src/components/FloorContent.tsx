import React from 'react';
import { motion } from 'framer-motion';
import { MediaElement } from '../types';

interface FloorContentProps {
  elements: MediaElement[];
  isEditing?: boolean;
  onElementUpdate?: (index: number, element: MediaElement) => void;
}

export default function FloorContent({ elements, isEditing, onElementUpdate }: FloorContentProps) {
  const renderElement = (element: MediaElement, index: number) => {
    const commonProps = {
      className: `absolute ${isEditing ? 'cursor-move' : ''}`,
      style: {
        left: `${element.position.x}%`,
        top: `${element.position.y}%`,
        width: `${element.size.width}%`,
        height: `${element.size.height}%`,
        ...element.style,
      },
    };

    switch (element.type) {
      case 'text':
        return (
          <motion.p
            {...commonProps}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${commonProps.className} backdrop-blur-sm`}
          >
            {element.content}
          </motion.p>
        );
      case 'video':
        return (
          <motion.div {...commonProps}>
            <video
              src={element.content}
              controls={!isEditing}
              autoPlay
              loop
              muted
              className="h-full w-full rounded-lg object-cover"
            />
          </motion.div>
        );
      case 'audio':
        return (
          <motion.div {...commonProps}>
            <audio
              src={element.content}
              controls
              className="w-full rounded-lg bg-white/10 p-2 backdrop-blur-sm"
            />
          </motion.div>
        );
      case 'image':
        return (
          <motion.div {...commonProps}>
            <img
              src={element.content}
              alt=""
              className="h-full w-full rounded-lg object-cover"
            />
          </motion.div>
        );
      case 'heading':
        return (
          <motion.h2
            {...commonProps}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${commonProps.className} text-4xl font-bold`}
          >
            {element.content}
          </motion.h2>
        );
      case 'button':
        return (
          <motion.button
            {...commonProps}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${commonProps.className} rounded-full bg-white px-8 py-3 font-semibold text-gray-900 transition hover:bg-opacity-90`}
          >
            {element.content}
          </motion.button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full w-full">
      {elements?.map((element, index) => (
        <React.Fragment key={index}>
          {renderElement(element, index)}
        </React.Fragment>
      ))}
    </div>
  );
}