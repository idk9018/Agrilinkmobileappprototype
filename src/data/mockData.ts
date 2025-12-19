import { Sprout, TrendingUp, MessageCircle, Video } from 'lucide-react';
import type { Screen } from '../App';

export const menuItems = [
  {
    id: 'crop-advisory' as Screen,
    title: 'Crop Advisory',
    description: 'Get planting guides',
    icon: Sprout,
    color: '#10B981', // Emerald 500
    bgColor: '#ECFDF5', // Emerald 50
  },
  {
    id: 'market-insights' as Screen,
    title: 'Market Prices',
    description: 'Check current rates',
    icon: TrendingUp,
    color: '#F59E0B', // Amber 500
    bgColor: '#FFFBEB', // Amber 50
  },
  {
    id: 'ask-expert' as Screen,
    title: 'Ask Expert',
    description: 'Get instant advice',
    icon: MessageCircle,
    color: '#10B981', // Emerald 500
    bgColor: '#ECFDF5', // Emerald 50
  },
  {
    id: 'training-videos' as Screen,
    title: 'Training Videos',
    description: 'Learn new techniques',
    icon: Video,
    color: '#F59E0B', // Amber 500
    bgColor: '#FFFBEB', // Amber 50
  },
];

export const weatherData = {
  temp: '28°C',
  condition: 'Sunny',
  location: 'Lagos, NG'
};

export const cropTip = {
  title: 'Farming Tip of the Day',
  content: 'December is the best time to plant cassava. The rainy season provides optimal soil moisture for root development.'
};
