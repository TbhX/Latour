import React from 'react';
import { Building2, Users, TrendingUp, Info, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { FloorData } from '../types';
import FloorContent from './FloorContent';

interface FloorProps {
  floor: FloorData;
  isActive: boolean;
  onOpenInfo?: () => void;
}

export default function Floor({ floor, isActive, onOpenInfo }: FloorProps) {
  const generateFloorPrice = (level: number, baseVisitors: number) => {
    const basePrice = 300;
    const visitorMultiplier = Math.floor(baseVisitors / 100);
    return (basePrice * level * visitorMultiplier) / 100;
  };

  const dailyPrice = generateFloorPrice(floor.level, floor.baseVisitors);

  const defaultElements = floor.mediaElements || [
    {
      type: 'heading',
      content: floor.title || `Floor ${floor.level}`,
      position: { x: 50, y: 20 },
      size: { width: 80, height: 10 },
      style: { textAlign: 'center' },
    },
    {
      type: 'text',
      content: floor.description || '',
      position: { x: 50, y: 35 },
      size: { width: 80, height: 20 },
      style: { textAlign: 'center', fontSize: '1.125rem', opacity: 0.8 },
    },
  ];

  return (
    <div className="relative h-screen w-full">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${floor.theme || 'from-gray-900 to-black'}`}>
        {floor.imageUrl ? (
          <>
            <img
              src={floor.imageUrl}
              alt={`Floor ${floor.level}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Building2 className="h-24 w-24 opacity-20" />
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="absolute inset-0"
      >
        {floor.isAvailable ? (
          <div className="relative h-full">
            {/* Main Content */}
            <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 lg:px-8">
              <FloorContent elements={defaultElements} />
            </div>

            {/* Bottom Section */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 backdrop-blur-sm sm:p-6">
              <div className="mx-auto max-w-6xl">
                {/* Stats Grid */}
                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
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
                  <div className="col-span-2 md:col-span-1 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-purple-300">
                      <CalendarCheck className="h-5 w-5" />
                      <span>Availability</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold">Immediate</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-lg font-semibold shadow-lg transition sm:max-w-xs"
                  >
                    Réserver maintenant
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onOpenInfo}
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-4 text-lg font-semibold backdrop-blur-sm transition hover:bg-white/20"
                  >
                    <Info className="h-5 w-5" />
                    Voir les détails
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <FloorContent elements={floor.mediaElements || defaultElements} />
        )}
      </motion.div>
    </div>
  );
}