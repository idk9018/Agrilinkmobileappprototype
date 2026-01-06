import React, { useState } from 'react';
import { ArrowLeft, Clock, Share2, ThumbsUp, Bookmark } from 'lucide-react';
import type { VideoData } from '../App';

interface VideoDetailProps {
  video: VideoData;
  onBack: () => void;
}

export function VideoDetail({ video, onBack }: VideoDetailProps) {
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 12);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Video Player */}
      <div className="relative w-full aspect-video bg-black">
        {video.videoUrl ? (
          <video
            className="w-full h-full object-cover"
            src={video.videoUrl}
            title={video.title}
            controls
            autoPlay
            muted
            playsInline
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <p>Video not available</p>
          </div>
        )}

        {/* Back button overlay */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <span className="inline-block px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full text-sm font-medium mb-3">
          {video.category}
        </span>

        <h1 className="text-2xl font-bold text-[#1B1B1B] mb-2">
          {video.title}
        </h1>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
          <Clock className="w-4 h-4" />
          <span>{video.duration}</span>
          <span>•</span>
          <span>Uploaded today</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-y border-gray-100 py-4 mb-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isLiked ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'hover:bg-gray-50 text-gray-600'
              }`}
          >
            <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium">{likes}</span>
          </button>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${isSaved ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'hover:bg-gray-50 text-gray-600'
              }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            <span className="font-medium">{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-600 rounded-full transition-colors">
            <Share2 className="w-5 h-5" />
            <span className="font-medium">Share</span>
          </button>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-[#1B1B1B]">About this video</h3>
          <p className="text-gray-600 leading-relaxed">
            Learn essential techniques for {video.title.toLowerCase()}. This comprehensive guide covers everything from preparation to execution, ensuring you get the best results for your farm.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Perfect for both beginners and experienced farmers looking to improve their yield and efficiency.
          </p>
        </div>
      </div>
    </div>
  );
}
