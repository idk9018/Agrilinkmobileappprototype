import React from 'react';
import { Sprout, TrendingUp, MessageCircle, Video, Bell, User } from 'lucide-react';
import type { Screen } from '../App';

interface HomeDashboardProps {
  onNavigate: (screen: Screen) => void;
}

const menuItems = [
  {
    id: 'crop-advisory' as Screen,
    title: 'Crop Advisory',
    description: 'Get planting guides',
    icon: Sprout,
    color: '#2E7D32',
    bgColor: '#E8F5E9',
  },
  {
    id: 'market-insights' as Screen,
    title: 'Market Prices',
    description: 'Check current rates',
    icon: TrendingUp,
    color: '#FFC107',
    bgColor: '#FFF9E6',
  },
  {
    id: 'ask-expert' as Screen,
    title: 'Ask Expert',
    description: 'Get instant advice',
    icon: MessageCircle,
    color: '#2E7D32',
    bgColor: '#E8F5E9',
  },
  {
    id: 'training-videos' as Screen,
    title: 'Training Videos',
    description: 'Learn new techniques',
    icon: Video,
    color: '#FFC107',
    bgColor: '#FFF9E6',
  },
];

export function HomeDashboard({ onNavigate }: HomeDashboardProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="w-full h-full flex flex-col bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-[#2E7D32] rounded-b-[32px] px-6 pt-12 pb-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-white/90">
                {greeting}
              </p>
              <h2 className="text-white">
                Farmer Ayo
              </h2>
            </div>
          </div>
          <button className="bg-white/20 rounded-full p-3 hover:bg-white/30 transition-colors">
            <Bell className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Quick stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-[20px] p-4 border border-white/20">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/80 mb-1">
                Weather Today
              </p>
              <p className="text-white">
                28°C Sunny
              </p>
            </div>
            <div>
              <p className="text-white/80 mb-1">
                Best Crop
              </p>
              <p className="text-white">
                Maize Season
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <h3 className="text-[#1B1B1B] mb-6">
          What would you like to do?
        </h3>

        {/* Menu grid */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="bg-white rounded-[22px] p-6 shadow-md hover:shadow-xl transition-all active:scale-95"
              >
                <div
                  className="rounded-full p-4 mb-4 inline-flex"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: item.color }}
                    strokeWidth={2}
                  />
                </div>
                <h4 className="text-[#1B1B1B] mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Tips section */}
        <div className="mt-6 bg-gradient-to-r from-[#FFC107] to-[#FFD54F] rounded-[22px] p-6 shadow-md">
          <h4 className="text-[#1B1B1B] mb-2">
            💡 Farming Tip of the Day
          </h4>
          <p className="text-[#1B1B1B]/80">
            December is the best time to plant cassava. The rainy season provides optimal soil moisture for root development.
          </p>
        </div>
      </div>
    </div>
  );
}
