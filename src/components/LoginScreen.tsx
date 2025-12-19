import React, { useState } from 'react';
import { Leaf, Phone, Chrome, Loader2 } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePhone(phoneNumber)) {
      setError('Please enter a valid phone number (10-11 digits)');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white animate-fade-in">
      {/* Header */}
      <div className="pt-16 pb-8 px-8 flex flex-col items-center">
        <div className="bg-primary/10 rounded-full p-6 mb-6 animate-bounce">
          <Leaf className="w-16 h-16 text-primary" strokeWidth={2} />
        </div>
        <h1 className="text-text-main mb-2 text-2xl font-bold">
          Welcome to AgriLink
        </h1>
        <p className="text-text-muted text-center">
          Join thousands of farmers improving their harvest
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-8 pt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone number input */}
          <div>
            <label htmlFor="phone" className="block text-text-main font-medium mb-3">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Phone className={`w-5 h-5 ${error ? 'text-red-500' : 'text-gray-400'}`} />
              </div>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setError('');
                }}
                placeholder="080 1234 5678"
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl transition-colors
                  ${error
                    ? 'border-red-500 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-primary focus:bg-primary-light'
                  } focus:outline-none`}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 ml-1 animate-slide-up">
                {error}
              </p>
            )}
          </div>

          {/* Continue button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-4 rounded-2xl shadow-lg hover:bg-primary-dark 
                     transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Continue</span>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google sign in */}
          <button
            type="button"
            onClick={onLogin}
            className="w-full bg-white border-2 border-gray-200 text-text-main py-4 rounded-2xl 
                     flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <Chrome className="w-5 h-5 text-[#4285F4]" />
            <span>Continue with Google</span>
          </button>
        </form>

        {/* Terms */}
        <p className="text-center text-text-muted text-sm mt-8 px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
