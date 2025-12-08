import React from 'react';
import { Leaf } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#2E7D32] to-[#1B5E20]">
      <div className="animate-bounce">
        <div className="bg-white rounded-full p-8 shadow-2xl">
          <Leaf className="w-24 h-24 text-[#2E7D32]" strokeWidth={2} />
        </div>
      </div>
      <h1 className="mt-8 text-white tracking-wider">
        AgriLink
      </h1>
      <p className="mt-2 text-white/80">
        Empowering Farmers
      </p>
    </div>
  );
}
