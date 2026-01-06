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
    planting_guide: {
      soil: 'Maize thrives in well-drained loamy soil with a pH of 5.5-7.0. Clear land and till to a depth of 20-25cm.',
      sowing: 'Plant seeds 5cm deep, spaced 25cm apart within rows and 75cm between rows. Best planted at the onset of rains.',
      care: 'Weed control is critical in the first 8 weeks. Water critical stages: germination, flowering, and grain filling.'
    },
    fertilizer: 'Apply NPK 15:15:15 at planting (200kg/ha). Top dress with Urea (100kg/ha) at 4-6 weeks.',
    pests: ['Stem Borers', 'Armyworms', 'Termites', 'Striga Weed'],
    harvest: '3-4 Months'
  },
  {
    id: 'cassava',
    name: 'Cassava',
    image: 'https://images.unsplash.com/photo-1700594066143-6b1f0f4e12ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIwZmFybXxlbnwxfHx8fDE3NjUyMzU3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    planting_guide: {
      soil: 'Sandy loam soil is best. Avoid waterlogged or stony soils. Mound or ridge making is recommended.',
      sowing: 'Plant stem cuttings (stakes) 25cm long at a 45° angle or horizontally. Spacing: 1m x 1m.',
      care: 'Weed frequently for the first 3 months. Cassava is drought tolerant once established.'
    },
    fertilizer: 'Rich soil requires no fertilizer. For poor soils, apply NPK 15:15:15 (400kg/ha) at 6 weeks.',
    pests: ['Cassava Mosaic Disease', 'Mealybug', 'Green Mite'],
    harvest: '8-12 Months'
  },
  {
    id: 'rice',
    name: 'Rice',
    image: 'https://images.unsplash.com/photo-1651981350249-6173caeeb660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwZmFybWluZ3xlbnwxfHx8fDE3NjUyMzU3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    planting_guide: {
      soil: 'Clayey or loamy soil that retains water. Level the field properly for even water distribution.',
      sowing: 'Direct seeding or transplanting (15-21 day old seedlings). Spacing: 20cm x 20cm.',
      care: 'Maintain water level at 2-5cm. Drain field 2 weeks before harvest.'
    },
    fertilizer: 'Apply basal NPK before leveling. Top dress with Nitrogen at tillering and panicle initiation.',
    pests: ['Birds', 'Stem Borers', 'Rice Blast', 'Brown Spot'],
    harvest: '3-5 Months'
  },
  {
    id: 'yam',
    name: 'Yam',
    image: 'https://images.unsplash.com/photo-1597474417024-3ca3baa9fb13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YW0lMjBoYXJ2ZXN0fGVufDF8fHx8MTc2NTIzNTcyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    planting_guide: {
      soil: 'Deep, free-draining, fertile loamy soil. Make large mounds (heaps) 1m apart.',
      sowing: 'Plant yam setts or seed yams in the center of the mound. Cap with crop residue/mulch.',
      care: 'Staking is essential for maximizing yield. Regular weeding and vine training required.'
    },
    fertilizer: 'Apply organic manure during soil prep. NPK 15:15:15 can be applied at 8-10 weeks.',
    pests: ['Yam Beetle', 'Nematodes', 'Anthracnose'],
    harvest: '6-10 Months'
  },
  {
    id: 'pepper',
    name: 'Pepper',
    image: 'https://images.unsplash.com/photo-1719957770295-82515e051011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXIlMjBmYXJtaW5nfGVufDF8fHx8MTc2NTIzNTcyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    planting_guide: {
      soil: 'Well-drained sandy loam rich in humus. pH 6.0-7.0.',
      sowing: 'Nurse seeds in trays for 4-6 weeks. Transplant to field at 60cm x 60cm spacing.',
      care: 'Water regularly. Stake tall varieties. Mulch to retain moisture.'
    },
    fertilizer: 'Apply manure before planting. Split application of NPK at 2 weeks and flowering.',
    pests: ['Aphids', 'Fruit Fly', 'Pepper Veinal Mottle Virus'],
    harvest: '2-3 Months'
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
