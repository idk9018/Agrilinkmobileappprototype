import React, { useState } from 'react';
import { Leaf, Phone, Chrome } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="pt-16 pb-8 px-8 flex flex-col items-center">
        <div className="bg-[#2E7D32] rounded-full p-6 mb-6">
          <Leaf className="w-16 h-16 text-white" strokeWidth={2} />
        </div>
        <h1 className="text-[#1B1B1B] mb-2">
          Welcome to AgriLink
        </h1>
        <p className="text-gray-600 text-center">
          Join thousands of farmers improving their harvest
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-8 pt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone number input */}
          <div>
            <label htmlFor="phone" className="block text-[#1B1B1B] mb-3">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Phone className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="080 1234 5678"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-[18px] focus:border-[#2E7D32] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Continue button */}
          <button
            type="submit"
            className="w-full bg-[#2E7D32] text-white py-4 rounded-[20px] shadow-lg hover:bg-[#1B5E20] transition-colors"
          >
            Continue
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google sign in */}
          <button
            type="button"
            onClick={onLogin}
            className="w-full bg-white border-2 border-gray-200 text-[#1B1B1B] py-4 rounded-[20px] flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <Chrome className="w-5 h-5 text-[#4285F4]" />
            <span>Continue with Google</span>
          </button>
        </form>

        {/* Terms */}
        <p className="text-center text-gray-500 mt-8 px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
