import React from 'react';
import { Bell, User } from 'lucide-react';
import type { Screen } from '../App';
import { menuItems, cropTip } from '../data/mockData';
import { useWeather } from '../hooks/useWeather';

interface HomeDashboardProps {
  onNavigate: (screen: Screen) => void;
}

export function HomeDashboard({ onNavigate }: HomeDashboardProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
  const { weather, loading, error, locationName } = useWeather();

  return (
    <div className="w-full h-full flex flex-col bg-bg-main animate-fade-in">
      {/* Header */}
      <div className="bg-primary rounded-b-[32px] px-6 pt-12 pb-8 shadow-lg relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-white/90 text-sm font-medium">
                {greeting}
              </p>
              <h2 className="text-white text-xl font-bold">
                Farmer Ayo
              </h2>
            </div>
          </div>
          <button className="bg-white/20 rounded-full p-3 hover:bg-white/30 transition-colors backdrop-blur-sm">
            <Bell className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Quick stats */}
        <div className="glass-panel rounded-2xl p-4 relative z-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="border-r border-white/20">
              <p className="text-white/80 text-xs mb-1">
                Weather Today
              </p>
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 w-16 bg-white/20 rounded mb-1"></div>
                  <div className="h-3 w-24 bg-white/20 rounded"></div>
                </div>
              ) : error ? (
                <p className="text-white text-sm">Unavailable</p>
              ) : (
                <>
                  <p className="text-white font-semibold flex items-center gap-2">
                    {weather?.current.temp}°C <span className="text-xs font-normal opacity-80">{weather?.current.condition}</span>
                  </p>
                  <p className="text-white/60 text-[10px]">
                    {locationName}
                  </p>
                </>
              )}
            </div>
            <div className="pl-2">
              <p className="text-white/80 text-xs mb-1">
                Best Crop
              </p>
              <p className="text-white font-semibold">
                Maize Season
              </p>
              <p className="text-white/60 text-[10px]">
                High Yield Expected
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <h3 className="text-text-main mb-6 text-lg font-semibold">
          What would you like to do?
        </h3>

        {/* Menu grid */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all active:scale-95 text-left group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="rounded-2xl p-4 mb-4 inline-flex transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: item.color }}
                    strokeWidth={2}
                  />
                </div>
                <h4 className="text-text-main font-semibold mb-1">
                  {item.title}
                </h4>
                <p className="text-text-muted text-xs leading-relaxed">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Tips section */}
        <div className="mt-6 bg-gradient-to-r from-secondary to-amber-400 rounded-3xl p-6 shadow-lg text-white relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 bg-white/10 w-24 h-24 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

          <h4 className="font-bold mb-2 flex items-center gap-2 relative z-10">
            <span className="bg-white/20 p-1 rounded-lg">💡</span>
            {cropTip.title}
          </h4>
          <p className="text-white/90 text-sm leading-relaxed relative z-10">
            {cropTip.content}
          </p>
        </div>
      </div>
    </div>
  );
}
