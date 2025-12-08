import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import type { Screen, CropData } from '../App';

interface CropAdvisoryProps {
  onNavigate: (screen: Screen, data?: any) => void;
  onBack: () => void;
}

const crops: CropData[] = [
  {
    id: 'maize',
    name: 'Maize (Corn)',
    image: 'https://images.unsplash.com/photo-1608995855173-bb65a3fe1bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFybWVyJTIwbWFpemV8ZW58MXx8fHwxNzY1MjM1NzI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'cassava',
    name: 'Cassava',
    image: 'https://images.unsplash.com/photo-1700594066143-6b1f0f4e12ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIwZmFybXxlbnwxfHx8fDE3NjUyMzU3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'rice',
    name: 'Rice',
    image: 'https://images.unsplash.com/photo-1651981350249-6173caeeb660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwZmFybWluZ3xlbnwxfHx8fDE3NjUyMzU3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'yam',
    name: 'Yam',
    image: 'https://images.unsplash.com/photo-1597474417024-3ca3baa9fb13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YW0lMjBoYXJ2ZXN0fGVufDF8fHx8MTc2NTIzNTcyOXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'pepper',
    name: 'Pepper',
    image: 'https://images.unsplash.com/photo-1719957770295-82515e051011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXIlMjBmYXJtaW5nfGVufDF8fHx8MTc2NTIzNTcyOXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function CropAdvisory({ onNavigate, onBack }: CropAdvisoryProps) {
  return (
    <div className="w-full h-full flex flex-col bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#1B1B1B]" />
        </button>
        <h2 className="text-[#1B1B1B]">
          Crop Advisory
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <p className="text-gray-600 mb-6">
          Select a crop to get personalized farming guides and tips
        </p>

        {/* Crop list */}
        <div className="space-y-4">
          {crops.map((crop) => (
            <button
              key={crop.id}
              onClick={() => onNavigate('crop-detail', crop)}
              className="w-full bg-white rounded-[22px] overflow-hidden shadow-md hover:shadow-xl transition-all active:scale-98"
            >
              <div className="flex items-center gap-4 p-4">
                {/* Crop image */}
                <div className="w-24 h-24 rounded-[16px] overflow-hidden flex-shrink-0 bg-gray-200">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Crop info */}
                <div className="flex-1 text-left">
                  <h3 className="text-[#1B1B1B] mb-2">
                    {crop.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full">
                      Planting Guide
                    </span>
                    <span className="px-3 py-1 bg-[#FFF9E6] text-[#FFC107] rounded-full">
                      Fertilizer Plan
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
