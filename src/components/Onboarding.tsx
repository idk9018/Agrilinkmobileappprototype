import React, { useState } from 'react';
import { TrendingUp, DollarSign, MessageCircle, ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: TrendingUp,
    title: 'Improve Your Farm Yield',
    description: 'Get personalized crop recommendations and expert farming tips to boost your harvest',
    color: '#2E7D32',
  },
  {
    icon: DollarSign,
    title: 'Track Market Prices Easily',
    description: 'Know the best prices and perfect time to sell your crops for maximum profit',
    color: '#FFC107',
  },
  {
    icon: MessageCircle,
    title: 'Get Advice from Experts Anytime',
    description: 'Chat with agricultural experts and get instant answers to your farming questions',
    color: '#2E7D32',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Skip button */}
      <div className="p-6 flex justify-end">
        <button
          onClick={handleSkip}
          className="text-gray-500 px-4 py-2"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Icon */}
        <div 
          className="rounded-full p-12 mb-8 shadow-lg"
          style={{ backgroundColor: `${slide.color}15` }}
        >
          <Icon 
            className="w-32 h-32" 
            style={{ color: slide.color }}
            strokeWidth={1.5}
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-[#1B1B1B] mb-4 px-4">
          {slide.title}
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 px-4 leading-relaxed">
          {slide.description}
        </p>
      </div>

      {/* Bottom section */}
      <div className="p-8">
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-[#2E7D32]'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="w-full bg-[#2E7D32] text-white py-4 rounded-[20px] flex items-center justify-center gap-2 shadow-lg hover:bg-[#1B5E20] transition-colors"
        >
          <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
