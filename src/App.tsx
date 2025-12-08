import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { LoginScreen } from './components/LoginScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { CropAdvisory } from './components/CropAdvisory';
import { CropDetail } from './components/CropDetail';
import { MarketInsights } from './components/MarketInsights';
import { AskExpert } from './components/AskExpert';
import { TrainingVideos } from './components/TrainingVideos';
import { VideoDetail } from './components/VideoDetail';

export type Screen = 
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'home'
  | 'crop-advisory'
  | 'crop-detail'
  | 'market-insights'
  | 'ask-expert'
  | 'training-videos'
  | 'video-detail';

export interface CropData {
  id: string;
  name: string;
  image: string;
}

export interface VideoData {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedCrop, setSelectedCrop] = useState<CropData | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

  // Auto-transition from splash to onboarding
  React.useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const navigateTo = (screen: Screen, data?: any) => {
    if (screen === 'crop-detail' && data) {
      setSelectedCrop(data);
    }
    if (screen === 'video-detail' && data) {
      setSelectedVideo(data);
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <Onboarding onComplete={() => navigateTo('login')} />;
      case 'login':
        return <LoginScreen onLogin={() => navigateTo('home')} />;
      case 'home':
        return <HomeDashboard onNavigate={navigateTo} />;
      case 'crop-advisory':
        return <CropAdvisory onNavigate={navigateTo} onBack={() => navigateTo('home')} />;
      case 'crop-detail':
        return <CropDetail crop={selectedCrop} onBack={() => navigateTo('crop-advisory')} />;
      case 'market-insights':
        return <MarketInsights onBack={() => navigateTo('home')} />;
      case 'ask-expert':
        return <AskExpert onBack={() => navigateTo('home')} />;
      case 'training-videos':
        return <TrainingVideos onNavigate={navigateTo} onBack={() => navigateTo('home')} />;
      case 'video-detail':
        return <VideoDetail video={selectedVideo} onBack={() => navigateTo('training-videos')} />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md h-screen bg-white relative overflow-hidden">
        {renderScreen()}
      </div>
    </div>
  );
}
