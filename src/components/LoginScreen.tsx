import React, { useState } from 'react';
import { Leaf, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onLogin();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white animate-fade-in">
      {/* Header */}
      <div className="pt-16 pb-8 px-8 flex flex-col items-center">
        <div className="bg-primary/10 rounded-full p-6 mb-6 animate-bounce">
          <Leaf className="w-16 h-16 text-primary" strokeWidth={2} />
        </div>
        <h1 className="text-text-main mb-2 text-2xl font-bold">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-text-muted text-center">
          {isSignUp
            ? 'Join thousands of farmers improving their harvest'
            : 'Sign in to access your farm dashboard'
          }
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-8 pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-text-main font-medium mb-2">Email</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer@example.com"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-text-main font-medium mb-2">Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm animate-slide-up">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 text-green-600 p-3 rounded-xl flex items-center gap-2 text-sm animate-slide-up">
              <Leaf className="w-4 h-4 shrink-0" />
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-4 rounded-2xl shadow-lg hover:bg-primary-dark 
                     transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Please wait...</span>
              </>
            ) : (
              <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
            )}
          </button>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setMessage('');
              }}
              className="text-primary font-medium hover:underline"
            >
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
