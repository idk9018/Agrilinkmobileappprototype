import React, { useState } from 'react';
import { ArrowLeft, Play, Clock, Search } from 'lucide-react';
import type { Screen, VideoData } from '../App';

interface TrainingVideosProps {
  onNavigate: (screen: Screen, data?: any) => void;
  onBack: () => void;
}

const categories = ['All', 'Planting', 'Pest Control', 'Soil Care', 'Harvesting'];

const videos: VideoData[] = [
  {
    id: '1',
    title: 'How to Prepare Your Farm for Planting Season',
    category: 'Planting',
    duration: '8:45',
    thumbnail: 'https://images.unsplash.com/photo-1596289428111-54fc7aaa79d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtaW5nJTIwdHV0b3JpYWx8ZW58MXx8fHwxNzY1MjM1NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: 'Effective Pest Control Methods for Maize',
    category: 'Pest Control',
    duration: '12:30',
    thumbnail: 'https://images.unsplash.com/photo-1761203370916-14d311ff9ad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXN0JTIwY29udHJvbCUyMGZhcm1pbmd8ZW58MXx8fHwxNzY1MjM1NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'Soil Testing and Improvement Techniques',
    category: 'Soil Care',
    duration: '15:20',
    thumbnail: 'https://images.unsplash.com/photo-1710090720809-527cefdac598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2lsJTIwdGVzdGluZyUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc2NTE5MjAyNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    title: 'Best Practices for Cassava Harvesting',
    category: 'Harvesting',
    duration: '10:15',
    thumbnail: 'https://images.unsplash.com/photo-1700594066143-6b1f0f4e12ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIwZmFybXxlbnwxfHx8fDE3NjUyMzU3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    title: 'Rice Transplanting Step-by-Step Guide',
    category: 'Planting',
    duration: '14:00',
    thumbnail: 'https://images.unsplash.com/photo-1651981350249-6173caeeb660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwZmFybWluZ3xlbnwxfHx8fDE3NjUyMzU3Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    title: 'Organic Fertilizer Preparation at Home',
    category: 'Soil Care',
    duration: '9:30',
    thumbnail: 'https://images.unsplash.com/photo-1596289428111-54fc7aaa79d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtaW5nJTIwdHV0b3JpYWx8ZW58MXx8fHwxNzY1MjM1NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '7',
    title: 'Identifying and Treating Common Plant Diseases',
    category: 'Pest Control',
    duration: '11:45',
    thumbnail: 'https://images.unsplash.com/photo-1608995855173-bb65a3fe1bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFybWVyJTIwbWFpemV8ZW58MXx8fHwxNzY1MjM1NzI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '8',
    title: 'Post-Harvest Storage Solutions',
    category: 'Harvesting',
    duration: '13:10',
    thumbnail: 'https://images.unsplash.com/photo-1597474417024-3ca3baa9fb13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YW0lMjBoYXJ2ZXN0fGVufDF8fHx8MTc2NTIzNTcyOXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function TrainingVideos({ onNavigate, onBack }: TrainingVideosProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            Training Videos
          </h2>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search videos..."
            className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white px-6 py-4 shadow-sm overflow-x-auto">
        <div className="flex gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-[#2E7D32] text-white shadow-md'
                  : 'bg-[#F5F5F5] text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Videos grid */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {filteredVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="bg-gray-200 rounded-full p-8 mb-4">
              <Play className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-[#1B1B1B] mb-2">
              No videos found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or category filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => onNavigate('video-detail', video)}
                className="bg-white rounded-[22px] overflow-hidden shadow-md hover:shadow-xl transition-all active:scale-98"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                      <Play className="w-8 h-8 text-[#2E7D32] fill-[#2E7D32]" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-white" />
                    <span className="text-white">{video.duration}</span>
                  </div>
                </div>

                {/* Video info */}
                <div className="p-4 text-left">
                  <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full mb-2">
                    {video.category}
                  </span>
                  <h3 className="text-[#1B1B1B] line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
