import React, { useState } from 'react';
import { ArrowLeft, Calendar, Droplet, Bug, Leaf, AlertCircle } from 'lucide-react';
import type { CropData } from '../App';

interface CropDetailProps {
  crop: CropData | null;
  onBack: () => void;
}

export function CropDetail({ crop, onBack }: CropDetailProps) {
  const [activeTab, setActiveTab] = useState<'planting' | 'fertilizer' | 'pest'>('planting');

  if (!crop) return null;

  const tabs = [
    { id: 'planting' as const, label: 'Planting Guide', icon: Calendar },
    { id: 'fertilizer' as const, label: 'Fertilizer Plan', icon: Droplet },
    { id: 'pest' as const, label: 'Pest Control', icon: Bug },
  ];

  const getCropContent = () => {
    const content = {
      maize: {
        planting: {
          season: 'March - June (Rainy Season)',
          spacing: '75cm between rows, 25cm between plants',
          depth: '5cm deep',
          tips: [
            'Plant 2-3 seeds per hole',
            'Thin to one strong plant after 2 weeks',
            'Ensure good drainage to prevent waterlogging',
            'Apply compost or manure before planting',
          ],
        },
        fertilizer: {
          stage1: { time: 'At planting', fertilizer: 'NPK 15-15-15', amount: '2 bags per hectare' },
          stage2: { time: '3-4 weeks after planting', fertilizer: 'Urea (46-0-0)', amount: '1 bag per hectare' },
          stage3: { time: '6-8 weeks after planting', fertilizer: 'NPK 15-15-15', amount: '1 bag per hectare' },
        },
        pest: [
          { name: 'Fall Armyworm', solution: 'Apply neem-based pesticide or Emamectin benzoate' },
          { name: 'Stem Borers', solution: 'Use Carbofuran granules at planting' },
          { name: 'Birds', solution: 'Use scarecrows or reflective tape during grain filling' },
        ],
      },
      cassava: {
        planting: {
          season: 'November - February (Early dry season)',
          spacing: '1m between rows, 1m between plants',
          depth: '10cm deep at 45° angle',
          tips: [
            'Use stem cuttings 20-25cm long',
            'Ensure cuttings have 5-7 nodes',
            'Plant within 24 hours of cutting',
            'Keep 2/3 of cutting buried',
          ],
        },
        fertilizer: {
          stage1: { time: 'At planting', fertilizer: 'NPK 15-15-15', amount: '3 bags per hectare' },
          stage2: { time: '3 months after planting', fertilizer: 'NPK 12-12-17', amount: '2 bags per hectare' },
          stage3: { time: '6 months after planting', fertilizer: 'Muriate of Potash', amount: '1 bag per hectare' },
        },
        pest: [
          { name: 'Cassava Mealybug', solution: 'Introduce natural predators or use soap solution' },
          { name: 'Green Spider Mite', solution: 'Apply sulfur-based miticide' },
          { name: 'Termites', solution: 'Use Fipronil at planting' },
        ],
      },
      rice: {
        planting: {
          season: 'April - July (Peak rainy season)',
          spacing: '20cm between rows, 15cm between plants',
          depth: '2-3cm in nursery, transplant after 21 days',
          tips: [
            'Prepare seedbed in nursery first',
            'Transplant 2-3 seedlings per hill',
            'Maintain 5-10cm water level in paddy',
            'Weed regularly in first 40 days',
          ],
        },
        fertilizer: {
          stage1: { time: 'Before transplanting', fertilizer: 'NPK 15-15-15', amount: '2 bags per hectare' },
          stage2: { time: '3 weeks after transplanting', fertilizer: 'Urea (46-0-0)', amount: '2 bags per hectare' },
          stage3: { time: 'At panicle initiation', fertilizer: 'NPK 12-12-17', amount: '1 bag per hectare' },
        },
        pest: [
          { name: 'Rice Weevil', solution: 'Dry grain properly, use hermetic storage' },
          { name: 'Stem Borer', solution: 'Apply Carbofuran or use pheromone traps' },
          { name: 'Blast Disease', solution: 'Use resistant varieties, apply Tricyclazole fungicide' },
        ],
      },
      yam: {
        planting: {
          season: 'February - April (Early rainy season)',
          spacing: '1m between rows, 50cm between mounds',
          depth: 'Plant tubers 10-15cm deep',
          tips: [
            'Make mounds 1m high and 1m wide',
            'Use whole small tubers or sett (cut pieces)',
            'Provide stakes for vine support',
            'Plant yam heads upward',
          ],
        },
        fertilizer: {
          stage1: { time: 'At planting', fertilizer: 'NPK 15-15-15', amount: '4 bags per hectare' },
          stage2: { time: '8 weeks after planting', fertilizer: 'NPK 12-12-17', amount: '2 bags per hectare' },
          stage3: { time: '4 months after planting', fertilizer: 'Muriate of Potash', amount: '2 bags per hectare' },
        },
        pest: [
          { name: 'Yam Beetle', solution: 'Use wood ash or apply Lambda-cyhalothrin' },
          { name: 'Nematodes', solution: 'Crop rotation, use nematicide at planting' },
          { name: 'Anthracnose', solution: 'Apply copper-based fungicide' },
        ],
      },
      pepper: {
        planting: {
          season: 'Year-round with irrigation, best in March-April',
          spacing: '60cm between rows, 45cm between plants',
          depth: 'Transplant seedlings at 5-6 weeks',
          tips: [
            'Start seeds in nursery trays',
            'Harden seedlings before transplanting',
            'Mulch around plants to retain moisture',
            'Stake plants for support',
          ],
        },
        fertilizer: {
          stage1: { time: 'At transplanting', fertilizer: 'NPK 15-15-15', amount: '2 bags per hectare' },
          stage2: { time: 'At flowering', fertilizer: 'NPK 12-12-17', amount: '2 bags per hectare' },
          stage3: { time: 'During fruiting', fertilizer: 'Calcium nitrate', amount: '1 bag per hectare (weekly)' },
        },
        pest: [
          { name: 'Aphids', solution: 'Spray neem oil or use insecticidal soap' },
          { name: 'Whiteflies', solution: 'Use yellow sticky traps, apply Imidacloprid' },
          { name: 'Bacterial Wilt', solution: 'Remove infected plants, improve drainage' },
        ],
      },
    };

    return content[crop.id as keyof typeof content] || content.maize;
  };

  const cropContent = getCropContent();

  return (
    <div className="w-full h-full flex flex-col bg-[#F5F5F5]">
      {/* Header with image */}
      <div className="relative">
        <div className="h-48 overflow-hidden bg-gray-300">
          <img
            src={crop.image}
            alt={crop.name}
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#1B1B1B]" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h1 className="text-white">
            {crop.name}
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-2 flex flex-col items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#2E7D32] border-b-2 border-[#2E7D32]'
                    : 'text-gray-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {activeTab === 'planting' && (
          <div className="space-y-4">
            <div className="bg-white rounded-[22px] p-6 shadow-md">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-[#E8F5E9] rounded-full p-3">
                  <Calendar className="w-6 h-6 text-[#2E7D32]" />
                </div>
                <div>
                  <h3 className="text-[#1B1B1B] mb-1">
                    Best Planting Season
                  </h3>
                  <p className="text-gray-600">
                    {cropContent.planting.season}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[22px] p-6 shadow-md">
              <h3 className="text-[#1B1B1B] mb-4">
                Planting Specifications
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-[#2E7D32] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">
                      <span className="text-[#1B1B1B]">Spacing:</span> {cropContent.planting.spacing}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Droplet className="w-5 h-5 text-[#2E7D32] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600">
                      <span className="text-[#1B1B1B]">Depth:</span> {cropContent.planting.depth}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[22px] p-6 shadow-md">
              <h3 className="text-[#1B1B1B] mb-4">
                Pro Tips
              </h3>
              <ul className="space-y-3">
                {cropContent.planting.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFC107] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">{index + 1}</span>
                    </div>
                    <p className="text-gray-600">
                      {tip}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'fertilizer' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] rounded-[22px] p-6 shadow-md text-white">
              <h3 className="mb-2">
                Fertilizer Application Schedule
              </h3>
              <p className="text-white/80">
                Follow this timeline for optimal crop nutrition
              </p>
            </div>

            {Object.entries(cropContent.fertilizer).map(([stage, data], index) => (
              <div key={stage} className="bg-white rounded-[22px] p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-[#FFC107] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-white">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#1B1B1B] mb-2">
                      {data.time}
                    </h4>
                    <div className="space-y-1">
                      <p className="text-gray-600">
                        <span className="text-[#2E7D32]">Fertilizer:</span> {data.fertilizer}
                      </p>
                      <p className="text-gray-600">
                        <span className="text-[#2E7D32]">Amount:</span> {data.amount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-[#FFF9E6] border-2 border-[#FFC107] rounded-[22px] p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-[#FFC107] flex-shrink-0" />
                <div>
                  <h4 className="text-[#1B1B1B] mb-2">
                    Important Note
                  </h4>
                  <p className="text-gray-600">
                    Always apply fertilizer when soil is moist. Water immediately after application if rain is not expected within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pest' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] rounded-[22px] p-6 shadow-md text-white">
              <h3 className="mb-2">
                Common Pests & Solutions
              </h3>
              <p className="text-white/80">
                Protect your {crop.name.toLowerCase()} from these threats
              </p>
            </div>

            {cropContent.pest.map((pest, index) => (
              <div key={index} className="bg-white rounded-[22px] p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 rounded-full p-3 flex-shrink-0">
                    <Bug className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#1B1B1B] mb-3">
                      {pest.name}
                    </h4>
                    <div className="bg-[#E8F5E9] rounded-[16px] p-4">
                      <p className="text-[#2E7D32] mb-1">
                        Solution:
                      </p>
                      <p className="text-gray-700">
                        {pest.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-[#E8F5E9] rounded-[22px] p-6">
              <h4 className="text-[#2E7D32] mb-3">
                Prevention Tips
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Regular field inspection (at least twice weekly)</li>
                <li>• Practice crop rotation to break pest cycles</li>
                <li>• Remove and destroy infected plants immediately</li>
                <li>• Maintain proper spacing for good air circulation</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
