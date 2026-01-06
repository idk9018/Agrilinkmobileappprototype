import React, { useState } from 'react';
import { ArrowLeft, LogOut, User, Mail, Shield, ChevronRight, Save, Lock, Loader2, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface ProfileSettingsProps {
    onBack: () => void;
}

type View = 'menu' | 'personal' | 'security' | 'settings';

export function ProfileSettings({ onBack }: ProfileSettingsProps) {
    const { user, signOut } = useAuth();
    const [currentView, setCurrentView] = useState<View>('menu');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Form states
    const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [apiKey, setApiKey] = useState(localStorage.getItem('agrolink_gemini_key') || '');

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const updateProfile = async () => {
        setIsLoading(true);
        setMessage(null);
        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: fullName }
            });

            if (error) throw error;
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const updatePassword = async () => {
        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }
        if (password.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            return;
        }

        setIsLoading(true);
        setMessage(null);
        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;

            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const saveSettings = () => {
        setIsLoading(true);
        try {
            localStorage.setItem('agrolink_gemini_key', apiKey.trim());
            setMessage({ type: 'success', text: 'Settings saved successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save settings' });
        } finally {
            setIsLoading(false);
        }
    };

    const renderHeader = (title: string, backAction: () => void) => (
        <div className="bg-white px-6 py-4 shadow-sm flex items-center gap-4">
            <button
                onClick={backAction}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
                <ArrowLeft className="w-6 h-6 text-[#1B1B1B]" />
            </button>
            <h2 className="text-[#1B1B1B] font-semibold text-lg">
                {title}
            </h2>
        </div>
    );

    if (currentView === 'personal') {
        return (
            <div className="w-full h-full flex flex-col bg-[#F5F5F5] animate-fade-in">
                {renderHeader('Personal Information', () => {
                    setCurrentView('menu');
                    setMessage(null);
                })}
                <div className="p-6">
                    <div className="bg-white rounded-[22px] p-6 shadow-sm space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative opacity-60">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={user?.email}
                                    disabled
                                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 ml-1">Email cannot be changed</p>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        <button
                            onClick={updateProfile}
                            disabled={isLoading}
                            className="w-full bg-[#2E7D32] text-white font-semibold py-4 rounded-[20px] flex items-center justify-center gap-2 hover:bg-[#1B5E20] transition-colors active:scale-98 disabled:opacity-70"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (currentView === 'security') {
        return (
            <div className="w-full h-full flex flex-col bg-[#F5F5F5] animate-fade-in">
                {renderHeader('Privacy & Security', () => {
                    setCurrentView('menu');
                    setMessage(null);
                })}
                <div className="p-6">
                    <div className="bg-white rounded-[22px] p-6 shadow-sm space-y-6">
                        <h3 className="font-medium text-[#1B1B1B]">Change Password</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min. 6 characters"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter password"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                                />
                            </div>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        <button
                            onClick={updatePassword}
                            disabled={isLoading}
                            className="w-full bg-[#2E7D32] text-white font-semibold py-4 rounded-[20px] flex items-center justify-center gap-2 hover:bg-[#1B5E20] transition-colors active:scale-98 disabled:opacity-70"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (currentView === 'settings') {
        return (
            <div className="w-full h-full flex flex-col bg-[#F5F5F5] animate-fade-in">
                {renderHeader('App Settings', () => {
                    setCurrentView('menu');
                    setMessage(null);
                })}
                <div className="p-6">
                    <div className="bg-white rounded-[22px] p-6 shadow-sm space-y-6">
                        <div>
                            <h3 className="font-medium text-[#1B1B1B] mb-1">AI Expert Configuration</h3>
                            <p className="text-gray-500 text-xs mb-4">
                                Enter your Google Gemini API Key to enable real-time AI expert responses.
                            </p>

                            <label className="block text-sm font-medium text-gray-700 mb-2">Gemini API Key</label>
                            <div className="relative">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="Enter API Key"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                                />
                            </div>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        <button
                            onClick={saveSettings}
                            disabled={isLoading}
                            className="w-full bg-[#2E7D32] text-white font-semibold py-4 rounded-[20px] flex items-center justify-center gap-2 hover:bg-[#1B5E20] transition-colors active:scale-98 disabled:opacity-70"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col bg-[#F5F5F5] animate-fade-in">
            {/* Header */}
            {renderHeader('Profile & Settings', onBack)}

            <div className="flex-1 overflow-y-auto px-6 py-6">
                {/* User Card */}
                <div className="bg-white rounded-[22px] p-6 shadow-sm mb-6 flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <User className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-[#1B1B1B] text-xl font-bold mb-1">
                        {user?.user_metadata?.full_name || 'Farmer'}
                    </h3>
                    <p className="text-gray-500 text-sm">
                        {user?.email}
                    </p>
                </div>

                {/* Settings List */}
                <div className="bg-white rounded-[22px] overflow-hidden shadow-sm mb-6">
                    <button
                        onClick={() => setCurrentView('personal')}
                        className="w-full p-4 border-b border-gray-100 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                        <div className="bg-blue-50 p-2 rounded-full">
                            <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-[#1B1B1B] font-medium">Personal Information</h4>
                            <p className="text-gray-500 text-xs">Edit your details</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                    </button>

                    <button
                        onClick={() => setCurrentView('security')}
                        className="w-full p-4 border-b border-gray-100 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                        <div className="bg-purple-50 p-2 rounded-full">
                            <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-[#1B1B1B] font-medium">Privacy & Security</h4>
                            <p className="text-gray-500 text-xs">Change password</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                    </button>

                    <button
                        onClick={() => setCurrentView('settings')}
                        className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                        <div className="bg-orange-50 p-2 rounded-full">
                            <Key className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-[#1B1B1B] font-medium">App Settings</h4>
                            <p className="text-gray-500 text-xs">Configure AI Key</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                    </button>
                </div>

                {/* Sign Out Button */}
                <button
                    onClick={handleSignOut}
                    className="w-full bg-red-50 text-red-600 font-semibold py-4 rounded-[20px] flex items-center justify-center gap-2 hover:bg-red-100 transition-colors active:scale-98"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>

                <p className="text-center text-gray-400 text-xs mt-6">
                    AgroLink v0.1.0
                </p>
            </div>
        </div>
    );
}
