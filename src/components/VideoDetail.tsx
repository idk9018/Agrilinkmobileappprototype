import React from 'react';
import { ArrowLeft, Play, ThumbsUp, Share2, Download, CheckCircle } from 'lucide-react';
import type { VideoData } from '../App';

interface VideoDetailProps {
  video: VideoData | null;
  onBack: () => void;
}

const relatedTopics = [
  'Proper land preparation',
  'Seed selection and treatment',
  'Optimal planting depth',
  'Irrigation management',
  'Weed control strategies',
];

export function VideoDetail({ video, onBack }: VideoDetailProps) {
  if (!video) return null;

  return (
    <div className="w-full h-full flex flex-col bg-[#F5F5F5]">
      {/* Video player */}
      <div className="relative bg-black">
        <div className="relative h-64 bg-gray-900">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover opacity-70"
          />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white/95 backdrop-blur-sm rounded-full p-6 shadow-2xl hover:bg-white transition-all hover:scale-110 active:scale-95">
              <Play className="w-12 h-12 text-[#2E7D32] fill-[#2E7D32]" />
            </button>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-sm rounded-full shadow-lg hover:bg-black/70 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Video info */}
        <div className="bg-white px-6 py-6 border-b border-gray-200">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full mb-3">
                {video.category}
              </span>
              <h1 className="text-[#1B1B1B] mb-2">
                {video.title}
              </h1>
              <p className="text-gray-600">
                Duration: {video.duration} • 45,234 views
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button className="flex-1 bg-[#2E7D32] text-white py-3 rounded-[16px] flex items-center justify-center gap-2 shadow-md hover:bg-[#1B5E20] transition-colors">
              <ThumbsUp className="w-5 h-5" />
              <span>Like (2.3k)</span>
            </button>
            <button className="bg-[#F5F5F5] p-3 rounded-[16px] hover:bg-gray-200 transition-colors">
              <Share2 className="w-5 h-5 text-[#1B1B1B]" />
            </button>
            <button className="bg-[#F5F5F5] p-3 rounded-[16px] hover:bg-gray-200 transition-colors">
              <Download className="w-5 h-5 text-[#1B1B1B]" />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white px-6 py-6 mt-2">
          <h3 className="text-[#1B1B1B] mb-4">
            About This Video
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Learn the essential techniques for preparing your farm before the planting season begins. This comprehensive guide covers soil preparation, land clearing, and pre-planting treatments that will help ensure a successful harvest.
          </p>

          <div className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] rounded-[20px] p-5 text-white">
            <h4 className="mb-3">
              What You Will Learn:
            </h4>
            <ul className="space-y-2">
              {relatedTopics.map((topic, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructor */}
        <div className="bg-white px-6 py-6 mt-2">
          <h3 className="text-[#1B1B1B] mb-4">
            Expert Instructor
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] flex items-center justify-center">
              <span className="text-white text-xl">DA</span>
            </div>
            <div className="flex-1">
              <h4 className="text-[#1B1B1B] mb-1">
                Dr. Adebayo Oluwaseun
              </h4>
              <p className="text-gray-600 mb-2">
                Agricultural Specialist
              </p>
              <p className="text-gray-500">
                15 years experience • 200+ videos
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-[#FFF9E6] border-2 border-[#FFC107] rounded-[22px] p-6 mx-6 my-6">
          <h4 className="text-[#1B1B1B] mb-3">
            💡 Pro Tip
          </h4>
          <p className="text-gray-700">
            Download this video to watch offline and share with other farmers in your community. Knowledge sharing helps everyone grow better crops!
          </p>
        </div>
      </div>
    </div>
  );
}
