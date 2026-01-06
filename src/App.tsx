import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding as OnboardingScreen } from './components/Onboarding';
import { LoginScreen } from './components/LoginScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { CropAdvisory } from './components/CropAdvisory';
import { MarketInsights } from './components/MarketInsights';
import { AskExpert } from './components/AskExpert';
import { TrainingVideos } from './components/TrainingVideos';
import { AuthProvider, useAuth } from './context/AuthContext';

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
  | 'video-detail'
  | 'profile';

export interface VideoData {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string; // Direct MP4 URL
}

export interface CropData {
  id: string;
  name: string;
  image: string;
  planting_guide?: {
    soil: string;
    sowing: string;
    care: string;
  };
  fertilizer?: string;
  pests?: string[];
  harvest?: string;
}

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedCrop, setSelectedCrop] = useState<CropData | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const { session, loading } = useAuth();

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      if (session) {
        setCurrentScreen('home');
      } else {
        setCurrentScreen('onboarding');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [session]);

  const handleNavigate = (screen: Screen, data?: any) => {
    if (screen === 'crop-detail' && data) {
      setSelectedCrop(data);
    }
    if (screen === 'video-detail' && data) {
      setSelectedVideo(data);
    }
    setCurrentScreen(screen);
  };

  if (currentScreen === 'splash') {
    return <SplashScreen />;
  }

  return (
    <div className="w-full h-screen bg-gray-50 max-w-md mx-auto relative overflow-hidden shadow-2xl sm:rounded-[32px] sm:my-8 sm:h-[800px]">
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={() => setCurrentScreen('login')} />
      )}

      {currentScreen === 'login' && (
        <LoginScreen onLogin={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'home' && (
        <HomeDashboard onNavigate={handleNavigate} />
      )}

      {currentScreen === 'profile' && (
        <ProfileSettings onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'crop-advisory' && (
        <CropAdvisory onBack={() => setCurrentScreen('home')} onNavigate={handleNavigate} />
      )}

      {currentScreen === 'crop-detail' && selectedCrop && (
        <CropDetail crop={selectedCrop} onBack={() => setCurrentScreen('crop-advisory')} />
      )}

      {currentScreen === 'market-insights' && (
        <MarketInsights onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'ask-expert' && (
        <AskExpert onBack={() => setCurrentScreen('home')} onNavigate={handleNavigate} />
      )}

      {currentScreen === 'training-videos' && (
        <TrainingVideos onBack={() => setCurrentScreen('home')} onNavigate={handleNavigate} />
      )}

      {currentScreen === 'video-detail' && selectedVideo && (
        <VideoDetail video={selectedVideo} onBack={() => setCurrentScreen('training-videos')} />
      )}
    </div>
  );
}

import { CropDetail } from './components/CropDetail';
import { ProfileSettings } from './components/ProfileSettings';
import { VideoDetail } from './components/VideoDetail';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
