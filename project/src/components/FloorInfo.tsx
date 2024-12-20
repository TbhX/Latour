import React from "react";
import { motion } from "framer-motion";
import { X, Users, TrendingUp } from "lucide-react";
import { FloorData } from "../types";

interface FloorInfoProps {
  isOpen: boolean;
  onClose: () => void;
  floor: FloorData;
}

export default function FloorInfo({ isOpen, onClose, floor }: FloorInfoProps) {
  if (!isOpen) return null;

  const generateFloorPrice = (level: number, baseVisitors: number) => {
    const basePrice = 300;
    const visitorMultiplier = Math.floor(baseVisitors / 100);
    return (basePrice * level * visitorMultiplier) / 100;
  };

  const dailyPrice = generateFloorPrice(floor.level, floor.baseVisitors);
  const monthlyPrice = dailyPrice * 30;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-lg p-6 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black shadow-2xl"
      >
        {/* Bouton pour fermer */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-white/10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Titre */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">Floor {floor.level}</h2>
          <p className="text-lg text-gray-300">{floor.title}</p>
        </div>

        {/* Informations principales */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-blue-400">
              <Users className="h-5 w-5" />
              <span>Daily Visitors</span>
            </div>
            <p className="text-2xl font-bold text-white">{floor.baseVisitors}+</p>
            <p className="text-sm text-gray-400">Unique views per day</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-green-400">
              <TrendingUp className="h-5 w-5" />
              <span>Growth Potential</span>
            </div>
            <p className="text-2xl font-bold text-white">+{Math.floor(floor.level / 2)}%</p>
            <p className="text-sm text-gray-400">Monthly increase in traffic</p>
          </div>
        </div>

        {/* Prix et actions */}
        {floor.isAvailable ? (
          <div className="space-y-4 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Premium Digital Space</h3>
                <p className="text-blue-100">Available for immediate reservation</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-200">Starting from</p>
                <p className="text-3xl font-bold text-white">${dailyPrice}/day</p>
                <p className="text-sm text-blue-200">${monthlyPrice}/month</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 rounded-full bg-white px-4 py-3 text-blue-600 font-semibold text-center transition hover:bg-opacity-90">
                Reserve Now
              </button>
              <button className="rounded-full bg-white/20 px-4 py-3 text-white font-semibold backdrop-blur transition hover:bg-white/30">
                Schedule Tour
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-gray-800/50 p-6">
            <h3 className="mb-2 text-xl font-bold text-white">{floor.title}</h3>
            <p className="text-gray-300">{floor.description}</p>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-400">
          * Prices are calculated based on floor level and daily visitor count
        </div>
      </motion.div>
    </motion.div>
  );
}
