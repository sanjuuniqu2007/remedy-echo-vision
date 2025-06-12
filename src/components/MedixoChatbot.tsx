
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Send, Bot, User, Heart, Pill, Stethoscope } from 'lucide-react';

const MedixoChatbot = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'medixo',
      content: "Hi! I'm Medixo, your AI medical assistant. How can I help you today? I can provide home remedies, medicine suggestions, and symptom analysis.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickSuggestions = [
    { text: 'Home remedies for headache', icon: Heart },
    { text: 'Common cold treatments', icon: Pill },
    { text: 'When to see a doctor', icon: Stethoscope }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    // Simulate AI response
    const aiResponse = {
      id: messages.length + 2,
      sender: 'medixo',
      content: getAIResponse(inputValue),
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInputValue('');
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('headache')) {
      return "For headaches, try these remedies: 1) Apply peppermint oil to temples, 2) Stay hydrated, 3) Try ginger tea, 4) Apply cold compress. If pain persists for more than 2 days or is severe, please consult a doctor.";
    }
    
    if (lowerInput.includes('cold') || lowerInput.includes('cough')) {
      return "For common cold: 1) Drink warm ginger honey tea, 2) Gargle with salt water, 3) Get plenty of rest, 4) Stay hydrated. Symptoms usually improve in 7-10 days. See a doctor if fever exceeds 101°F or symptoms worsen.";
    }
    
    if (lowerInput.includes('fever')) {
      return "For fever management: 1) Stay hydrated, 2) Rest in a cool room, 3) Use lukewarm sponge baths, 4) Consider willow bark tea (natural aspirin). ⚠️ Seek immediate medical attention if fever exceeds 103°F (39.4°C) or if you have severe symptoms.";
    }
    
    return "I understand you're concerned about your health. Could you provide more specific details about your symptoms? This will help me give you better guidance. Remember, I'm here to provide general information - for serious concerns, always consult with a healthcare professional.";
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <CardTitle className="text-lg">Medixo AI</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:text-gray-200">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm opacity-90">Online - Ready to help</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-purple-100 text-purple-600'
                }`}>
                  {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestions */}
        {messages.length === 1 && (
          <div className="p-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
            <div className="space-y-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-2"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                >
                  <suggestion.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-xs">{suggestion.text}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Ask Medixo about your health..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 For emergencies, always call your local emergency number
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedixoChatbot;
