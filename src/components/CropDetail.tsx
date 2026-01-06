import React, { useState } from 'react';
import { ArrowLeft, Sprout, Droplets, Bug, Timer, ChevronRight } from 'lucide-react';
import type { CropData } from '../App';

interface CropDetailProps {
  crop: CropData;
  onBack: () => void;
}

export function CropDetail({ crop, onBack }: CropDetailProps) {
  const [activeTab, setActiveTab] = useState<'planting' | 'care' | 'pests'>('planting');

  const tabs = [
    { id: 'planting', label: 'Planting', icon: Sprout },
    { id: 'care', label: 'Care', icon: Droplets },
    { id: 'pests', label: 'Pests & Diseases', icon: Bug },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#F5F5F5] animate-fade-in">
      {/* Header Image */}
      <div className="relative h-64 w-full">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl font-bold mb-1">{crop.name}</h1>
          <p className="opacity-90 flex items-center gap-2 text-sm">
            <Timer className="w-4 h-4" />
            Harvest in {crop.harvest || '3-4 months'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 flex px-6 pt-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 pb-4 pt-4 text-sm font-medium border-b-2 flex items-center justify-center gap-2 transition-colors ${isActive
                  ? 'border-[#2E7D32] text-[#2E7D32]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {activeTab === 'planting' && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-white rounded-[20px] p-6 shadow-sm">
              <h3 className="text-[#1B1B1B] font-semibold mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[#2E7D32]">1</span>
                Soil Preparation
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {crop.planting_guide?.soil || 'Ensure soil is well-drained and rich in organic matter. Clear all weeds and debris before planting.'}
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-sm">
              <h3 className="text-[#1B1B1B] font-semibold mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-[#2E7D32]">2</span>
                Sowing
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {crop.planting_guide?.sowing || 'Plant seeds at recommended depth and spacing. Water immediately after sowing to settle the soil.'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-white rounded-[20px] p-6 shadow-sm">
              <h3 className="text-[#1B1B1B] font-semibold mb-3 text-lg">Fertilizer Application</h3>
              <div className="bg-[#FFF9E6] p-4 rounded-xl border border-[#FFE082] mb-4">
                <p className="text-[#B78103] text-sm font-medium">
                  {crop.fertilizer || 'Apply NPK 15:15:15 four weeks after planting. Top dress with Urea at 8 weeks.'}
                </p>
              </div>
              <h3 className="text-[#1B1B1B] font-semibold mb-3 text-lg">Daily Care</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {crop.planting_guide?.care || 'Water regularly, especially during dry spells. Weed constantly to reduce competition for nutrients.'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'pests' && (
          <div className="space-y-4 animate-slide-up">
            <h3 className="text-[#1B1B1B] font-semibold mb-2">Common Threats</h3>
            {crop.pests?.map((pest, idx) => (
              <div key={idx} className="bg-white rounded-[16px] p-4 shadow-sm flex items-start gap-3">
                <div className="bg-red-50 p-2 rounded-full mt-1">
                  <Bug className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-[#1B1B1B] font-medium mb-1">{pest}</h4>
                  <p className="text-gray-500 text-xs">Monitor leaves for signs of infestation. Use recommended organic or chemical controls if threshold is exceeded.</p>
                </div>
              </div>
            )) || (
                <div className="bg-white rounded-[16px] p-6 shadow-sm text-center text-gray-500">
                  No specific pest data available.
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
