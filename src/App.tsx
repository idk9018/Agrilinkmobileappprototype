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
  | 'market-insights'
  | 'ask-expert'
  | 'training-videos';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
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

  const handleNavigate = (screen: Screen) => {
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

      {currentScreen === 'crop-advisory' && (
        <CropAdvisory onBack={() => setCurrentScreen('home')} onNavigate={handleNavigate} />
      )}

      {currentScreen === 'market-insights' && (
        <MarketInsights onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'ask-expert' && (
        <AskExpert onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'training-videos' && (
        <TrainingVideos onBack={() => setCurrentScreen('home')} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
