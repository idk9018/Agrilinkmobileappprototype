import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, Mic, Bug, Droplet, Cloud, Leaf, AlertCircle, Settings } from 'lucide-react';
import { getGeminiResponse } from '../services/ai';

interface AskExpertProps {
  onBack: () => void;
  onNavigate?: (screen: any) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'expert';
  timestamp: Date;
}

const quickReplies = [
  { id: 'pest', label: 'Pest Problem', icon: Bug, color: '#FF6B6B' },
  { id: 'soil', label: 'Soil Issue', icon: Droplet, color: '#8B4513' },
  { id: 'weather', label: 'Weather Update', icon: Cloud, color: '#4A90E2' },
  { id: 'disease', label: 'Crop Disease', icon: Leaf, color: '#2E7D32' },
];

export function AskExpert({ onBack, onNavigate }: AskExpertProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am your AgriLink farming expert. How can I help you today?',
      sender: 'expert',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const key = localStorage.getItem('agrolink_gemini_key');
    setApiKey(key);
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    if (!apiKey) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: 'Please configure your AI API Key in Profile -> App Settings to use this feature.',
        sender: 'expert',
        timestamp: new Date()
      }]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Prepare history for context (last 5 messages)
      const history = messages.slice(-5).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model' as 'user' | 'model',
        text: m.text
      }));

      const responseText = await getGeminiResponse(history, userMessage.text, apiKey);

      const expertMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'expert',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, expertMessage]);
    } catch (error: any) {
      console.error('Chat Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Error: ${error.toString()}. Please check your API Key.`,
        sender: 'expert',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (label: string) => {
    setInputText(`I have a question about: ${label}`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (!apiKey) {
    return (
      <div className="w-full h-full flex flex-col bg-[#F5F5F5]">
        <div className="bg-[#2E7D32] px-6 py-4 shadow-sm flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-white">Ask an Expert</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="bg-orange-100 p-4 rounded-full">
            <AlertCircle className="w-12 h-12 text-orange-600" />
          </div>
          <h3 className="text-lg font-bold text-[#1B1B1B]">Setup Required</h3>
          <p className="text-gray-600">To talk to our AI Expert, you need to add your Gemini API Key in settings.</p>
          <button
            onClick={() => onNavigate && onNavigate('profile')}
            className="bg-[#2E7D32] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#1B5E20] transition-colors"
          >
            <Settings className="w-5 h-5" />
            Go to Settings
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-[#2E7D32] px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1">
            <h2 className="text-white">
              Ask an Expert
            </h2>
            <p className="text-white/80 text-xs mt-1">
              Online • AI Powered
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-[20px] px-5 py-3 shadow-md ${message.sender === 'user'
                ? 'bg-[#2E7D32] text-white rounded-br-sm'
                : 'bg-white text-[#1B1B1B] rounded-bl-sm'
                }`}
            >
              <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
              <p
                className={`mt-2 text-xs ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                  }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-[20px] rounded-bl-sm px-5 py-3 shadow-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-[#F5F5F5] rounded-[24px] px-5 py-3 flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about crops, pests..."
              className="flex-1 bg-transparent outline-none text-[#1B1B1B] placeholder:text-gray-500"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-[#2E7D32] p-4 rounded-full shadow-lg hover:bg-[#1B5E20] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
