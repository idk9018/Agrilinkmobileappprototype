import React, { useState } from 'react';
import { ArrowLeft, Send, Mic, Bug, Droplet, Cloud, Leaf } from 'lucide-react';

interface AskExpertProps {
  onBack: () => void;
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

export function AskExpert({ onBack }: AskExpertProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am your AgriLink farming expert. How can I help you today?',
      sender: 'expert',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate expert response
    setTimeout(() => {
      const expertMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your question. Our agricultural expert will respond to you shortly. In the meantime, you can check our crop advisory section for immediate guidance.',
        sender: 'expert',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, expertMessage]);
    }, 1500);
  };

  const handleQuickReply = (label: string) => {
    setInputText(`I have a question about: ${label}`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

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
              Online • Responds in 5-10 mins
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
              className={`max-w-[80%] rounded-[20px] px-5 py-3 shadow-md ${
                message.sender === 'user'
                  ? 'bg-[#2E7D32] text-white rounded-br-sm'
                  : 'bg-white text-[#1B1B1B] rounded-bl-sm'
              }`}
            >
              <p className="leading-relaxed">{message.text}</p>
              <p
                className={`mt-2 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick replies */}
      {messages.length <= 2 && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 mb-3">
            Quick select:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {quickReplies.map((reply) => {
              const Icon = reply.icon;
              return (
                <button
                  key={reply.id}
                  onClick={() => handleQuickReply(reply.label)}
                  className="bg-white rounded-[16px] p-4 shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-3"
                >
                  <div
                    className="rounded-full p-2"
                    style={{ backgroundColor: `${reply.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: reply.color }} />
                  </div>
                  <span className="text-[#1B1B1B]">{reply.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-[#F5F5F5] rounded-[24px] px-5 py-3 flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your question..."
              className="flex-1 bg-transparent outline-none text-[#1B1B1B] placeholder:text-gray-500"
            />
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <Mic className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-[#2E7D32] p-4 rounded-full shadow-lg hover:bg-[#1B5E20] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
