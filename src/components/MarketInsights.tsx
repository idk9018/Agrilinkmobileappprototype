import React, { useState } from 'react';
import { ArrowLeft, MapPin, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MarketInsightsProps {
  onBack: () => void;
}

const locations = ['Lagos', 'Kano', 'Ibadan', 'Port Harcourt', 'Abuja'];

const commodities = [
  { 
    name: 'Maize', 
    price: 245000, 
    unit: 'per ton',
    change: 12,
    bestTime: 'November - January',
  },
  { 
    name: 'Rice (Paddy)', 
    price: 320000, 
    unit: 'per ton',
    change: -5,
    bestTime: 'September - November',
  },
  { 
    name: 'Cassava', 
    price: 85000, 
    unit: 'per ton',
    change: 8,
    bestTime: 'December - February',
  },
  { 
    name: 'Yam', 
    price: 180000, 
    unit: 'per ton',
    change: 15,
    bestTime: 'August - October',
  },
  { 
    name: 'Tomatoes', 
    price: 45000, 
    unit: 'per basket',
    change: -8,
    bestTime: 'March - May',
  },
  { 
    name: 'Pepper', 
    price: 35000, 
    unit: 'per basket',
    change: 20,
    bestTime: 'Year-round (Peak: Dec-Feb)',
  },
];

const priceHistoryData = [
  { week: 'Week 1', price: 220000 },
  { week: 'Week 2', price: 225000 },
  { week: 'Week 3', price: 235000 },
  { week: 'Week 4', price: 230000 },
  { week: 'Week 5', price: 240000 },
  { week: 'Week 6', price: 242000 },
  { week: 'Week 7', price: 245000 },
];

export function MarketInsights({ onBack }: MarketInsightsProps) {
  const [selectedLocation, setSelectedLocation] = useState('Lagos');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState(commodities[0]);

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1B1B1B]" />
          </button>
          <h2 className="text-[#1B1B1B]">
            Market Prices
          </h2>
        </div>

        {/* Location selector */}
        <div className="relative">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="w-full bg-[#F5F5F5] rounded-[16px] px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#2E7D32]" />
              <span className="text-[#1B1B1B]">{selectedLocation}</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showLocationDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[16px] shadow-xl border border-gray-200 z-10">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    setSelectedLocation(location);
                    setShowLocationDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-[#F5F5F5] first:rounded-t-[16px] last:rounded-b-[16px] transition-colors"
                >
                  <span className={selectedLocation === location ? 'text-[#2E7D32]' : 'text-[#1B1B1B]'}>
                    {location}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Current prices */}
        <div className="mb-6">
          <h3 className="text-[#1B1B1B] mb-4">
            Current Market Prices
          </h3>
          <div className="space-y-3">
            {commodities.map((commodity) => (
              <button
                key={commodity.name}
                onClick={() => setSelectedCommodity(commodity)}
                className={`w-full bg-white rounded-[18px] p-4 shadow-md hover:shadow-lg transition-all ${
                  selectedCommodity.name === commodity.name ? 'ring-2 ring-[#2E7D32]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h4 className="text-[#1B1B1B] mb-1">
                      {commodity.name}
                    </h4>
                    <p className="text-gray-600">
                      {commodity.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#1B1B1B] mb-1">
                      {formatPrice(commodity.price)}
                    </p>
                    <div className={`flex items-center gap-1 justify-end ${
                      commodity.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {commodity.change > 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{Math.abs(commodity.change)}%</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price trend chart */}
        <div className="bg-white rounded-[22px] p-6 shadow-md mb-6">
          <h3 className="text-[#1B1B1B] mb-4">
            7-Day Price Trend: {selectedCommodity.name}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis 
                  dataKey="week" 
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: '#666', fontSize: 12 }}
                  tickFormatter={(value) => `₦${(value / 1000)}k`}
                />
                <Tooltip
                  formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Price']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E0E0E0',
                    borderRadius: '12px',
                    padding: '12px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2E7D32" 
                  strokeWidth={3}
                  dot={{ fill: '#2E7D32', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best time to sell */}
        <div className="bg-gradient-to-r from-[#FFC107] to-[#FFD54F] rounded-[22px] p-6 shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-white rounded-full p-3">
              <TrendingUp className="w-8 h-8 text-[#FFC107]" />
            </div>
            <div>
              <h3 className="text-[#1B1B1B] mb-2">
                Best Time to Sell {selectedCommodity.name}
              </h3>
              <p className="text-[#1B1B1B]/80 mb-3">
                {selectedCommodity.bestTime}
              </p>
              <p className="text-[#1B1B1B]/70">
                Prices typically peak during this period due to high demand and lower supply.
              </p>
            </div>
          </div>
        </div>

        {/* Market tips */}
        <div className="mt-6 bg-white rounded-[22px] p-6 shadow-md">
          <h3 className="text-[#1B1B1B] mb-4">
            Market Tips
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-[#2E7D32]">•</span>
              <span>Check prices daily for the most accurate rates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2E7D32]">•</span>
              <span>Compare prices across multiple markets before selling</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2E7D32]">•</span>
              <span>Consider storage costs when timing your sale</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2E7D32]">•</span>
              <span>Join farmer cooperatives for better negotiating power</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
