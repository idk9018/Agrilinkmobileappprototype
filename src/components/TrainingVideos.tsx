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
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/John_Deere_tractor_when_plowing_a_field.webm/800px--John_Deere_tractor_when_plowing_a_field.webm.jpg',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/John_Deere_tractor_when_plowing_a_field.webm',
  },
  {
    id: '2',
    title: 'Effective Pest Control Methods for Maize',
    category: 'Pest Control',
    duration: '12:30',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/View_of_a_Maize_Farm.webm/800px--View_of_a_Maize_Farm.webm.jpg',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/View_of_a_Maize_Farm.webm',
  },
  {
    id: '3',
    title: 'Soil Testing and Improvement Techniques',
    category: 'Soil Care',
    duration: '15:20',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/How_to_collect_a_soil_sample.webm/800px--How_to_collect_a_soil_sample.webm.jpg',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/How_to_collect_a_soil_sample.webm',
  },
  {
    id: '4',
    title: 'Best Practices for Cassava Harvesting',
    category: 'Harvesting',
    duration: '10:15',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Local_cassava_farming_in_Ohaji_Egbema%2C_Imo_State%2C_Nigeria.webm/800px--Local_cassava_farming_in_Ohaji_Egbema%2C_Imo_State%2C_Nigeria.webm.jpg',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Local_cassava_farming_in_Ohaji_Egbema%2C_Imo_State%2C_Nigeria.webm',
  },
  {
    id: '5',
    title: 'Rice Transplanting Step-by-Step Guide',
    category: 'Planting',
    duration: '14:00',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Rice_transplanter_in_use_-_rural_Kanagawa_-_2023_June_13.webm/800px--Rice_transplanter_in_use_-_rural_Kanagawa_-_2023_June_13.webm.jpg',
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Rice_transplanter_in_use_-_rural_Kanagawa_-_2023_June_13.webm',
  },
  {
    id: '6',
    title: 'Organic Fertilizer Preparation at Home',
    category: 'Soil Care',
    duration: '9:30',
    thumbnail: 'https://images.unsplash.com/photo-1596289428111-54fc7aaa79d4?w=800',
    videoUrl: '/videos/organic_farming.ogv',
  },
  {
    id: '7',
    title: 'Identifying and Treating Common Plant Diseases',
    category: 'Pest Control',
    duration: '11:45',
    thumbnail: 'https://images.unsplash.com/photo-1608995855173-bb65a3fe1bec?w=800',
    videoUrl: '/videos/organic_farming.ogv',
  },
  {
    id: '8',
    title: 'Post-Harvest Storage Solutions',
    category: 'Harvesting',
    duration: '13:10',
    thumbnail: 'https://images.unsplash.com/photo-1597474417024-3ca3baa9fb13?w=800',
    videoUrl: '/videos/organic_farming.ogv',
  }
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
              className={`px-5 py-2 rounded-full whitespace-nowrap transition-all ${selectedCategory === category
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
