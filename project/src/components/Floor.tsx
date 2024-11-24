import React from 'react';
import { Building2, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { FloorData } from '../types';
import FloorContent from './FloorContent';

interface FloorProps {
  floor: FloorData;
  isActive: boolean;
}

export default function Floor({ floor, isActive }: FloorProps) {
  const generateFloorPrice = (level: number, baseVisitors: number) => {
    const basePrice = 300;
    const visitorMultiplier = Math.floor(baseVisitors / 100);
    return (basePrice * level * visitorMultiplier) / 100;
  };

  const dailyPrice = generateFloorPrice(floor.level, floor.baseVisitors);

  // Example media elements for demonstration
  const defaultElements = floor.mediaElements || [
    {
      type: 'heading',
      content: floor.title || `Floor ${floor.level}`,
      position: { x: 50, y: 30 },
      size: { width: 60, height: 10 },
      style: { textAlign: 'center' },
    },
    {
      type: 'text',
      content: floor.description || '',
      position: { x: 50, y: 45 },
      size: { width: 60, height: 20 },
      style: { textAlign: 'center', fontSize: '1.125rem', opacity: 0.8 },
    },
  ];

  return (
    <div className={`relative h-screen w-full bg-gradient-to-br ${floor.theme || 'from-gray-900 to-black'}`}>
      {floor.imageUrl ? (
        <div className="absolute inset-0">
          <img
            src={floor.imageUrl}
            alt={`Floor ${floor.level}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Building2 className="h-24 w-24 opacity-20" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="absolute inset-0"
      >
        {floor.isAvailable ? (
          <div className="relative h-full">
            <FloorContent elements={defaultElements} />
            
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform items-center gap-8">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-blue-300">
                  <Users className="h-5 w-5" />
                  <span>Daily Visitors</span>
                </div>
                <p className="mt-2 text-2xl font-bold">{floor.baseVisitors}+</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-green-300">
                  <TrendingUp className="h-5 w-5" />
                  <span>Daily Rate</span>
                </div>
                <p className="mt-2 text-2xl font-bold">${dailyPrice}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-white px-8 py-3 text-lg font-semibold text-gray-900"
              >
                <span className="relative z-10">Reserve This Floor</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.button>
            </div>
          </div>
        ) : (
          <FloorContent 
            elements={floor.mediaElements || defaultElements} 
          />
        )}
      </motion.div>
    </div>
  );
}