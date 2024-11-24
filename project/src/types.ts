export interface MediaElement {
  type: 'text' | 'video' | 'audio' | 'image' | 'button' | 'heading';
  content: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  style?: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    opacity?: number;
    blur?: number;
  };
}

export interface FloorData {
  level: number;
  isAvailable: boolean;
  price?: number;
  title?: string;
  description?: string;
  imageUrl?: string;
  theme?: string;
  baseVisitors: number;
  ctaText?: string;
  ctaLink?: string;
  mediaElements?: MediaElement[];
}