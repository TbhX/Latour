import { FloorData, MediaElement } from '../types';

const generateFloorPrice = (level: number, baseVisitors: number): number => {
  const basePrice = 300;
  const visitorMultiplier = Math.floor(baseVisitors / 100);
  return (basePrice * level * visitorMultiplier) / 100;
};

interface Theme {
  name: string;
  style: string;
  placeholderWidth: number;
  placeholderHeight: number;
}

const themes: Theme[] = [
  {
    name: "Luxury Penthouse",
    style: "from-purple-900 to-indigo-900",
    placeholderWidth: 800,
    placeholderHeight: 600
  },
  {
    name: "Modern Gallery",
    style: "from-gray-900 to-black",
    placeholderWidth: 800,
    placeholderHeight: 600
  },
  {
    name: "Digital Garden",
    style: "from-emerald-900 to-green-900",
    placeholderWidth: 800,
    placeholderHeight: 600
  },
  {
    name: "Ocean View",
    style: "from-blue-900 to-cyan-900",
    placeholderWidth: 800,
    placeholderHeight: 600
  },
  {
    name: "Sunset Lounge",
    style: "from-orange-900 to-red-900",
    placeholderWidth: 800,
    placeholderHeight: 600
  },
];

const exampleMediaElements: MediaElement[] = [
  {
    type: 'heading',
    content: 'Welcome to TechCorp Global',
    position: { x: 10, y: 20 },
    size: { width: 80, height: 10 },
    style: { fontSize: '3rem', fontWeight: 'bold' },
  },
  {
    type: 'text',
    content: 'Innovating the future of technology',
    position: { x: 10, y: 35 },
    size: { width: 60, height: 10 },
    style: { fontSize: '1.5rem', opacity: 0.8 },
  },
  {
    type: 'video',
    content: '/api/placeholder/640/360',  // Using placeholder for video preview
    position: { x: 60, y: 20 },
    size: { width: 35, height: 40 },
  },
  {
    type: 'button',
    content: 'Learn More',
    position: { x: 10, y: 60 },
    size: { width: 20, height: 10 },
  },
];

export const floors: FloorData[] = [
  {
    level: 100,
    isAvailable: false,
    title: "LA TOUR - Digital Luxury Hotel",
    description: "Welcome to the world's first digital luxury hotel. Each floor is a unique digital space for premium brand experiences.",
    imageUrl: `/api/placeholder/800/600`,
    theme: "from-indigo-900 to-purple-900",
    baseVisitors: 2000,
    mediaElements: [
      {
        type: 'heading',
        content: 'LA TOUR',
        position: { x: 50, y: 30 },
        size: { width: 80, height: 15 },
        style: { fontSize: '5rem', fontWeight: 'bold', textAlign: 'center' },
      },
      {
        type: 'text',
        content: "The World's First Digital Luxury Hotel",
        position: { x: 50, y: 50 },
        size: { width: 60, height: 10 },
        style: { fontSize: '1.5rem', opacity: 0.8, textAlign: 'center' },
      },
    ],
  },
  ...Array.from({ length: 99 }, (_, i) => {
    const level = 99 - i;
    const baseVisitors = Math.floor(Math.random() * 1000) + 500;
    const themeIndex = Math.floor(Math.random() * themes.length);
    const isAvailable = Math.random() > 0.3;
    const theme = themes[themeIndex];
    
    return {
      level,
      isAvailable,
      baseVisitors,
      price: generateFloorPrice(level, baseVisitors),
      imageUrl: isAvailable ? `/api/placeholder/${theme.placeholderWidth}/${theme.placeholderHeight}` : undefined,
      theme: theme.style,
      title: isAvailable ? `${theme.name} ${level}` : `Occupied Space ${level}`,
      description: isAvailable 
        ? "Experience luxury digital real estate at its finest. Perfect for brand showcases, digital exhibitions, and immersive marketing."
        : "This premium digital space is currently hosting an exclusive brand experience.",
      mediaElements: !isAvailable && level === 98 ? exampleMediaElements : undefined,
    };
  }),
];