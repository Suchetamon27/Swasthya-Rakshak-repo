import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User as UserIcon, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAppContext } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const AIChatbot = () => {
  const { kpiStats, addLog } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Investigator Assistant. Ask me about fraud stats, hospital performance, or flagged claims. You can also use voice commands!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();

    // Fraud stats queries
    if (lowerMsg.includes('fraud') && (lowerMsg.includes('stat') || lowerMsg.includes('how many'))) {
      return `Currently, we have detected **${kpiStats.fraud.toLocaleString()} fraudulent claims**. This represents a 4.2% increase from last month. Our AI system has saved approximately **₹${(kpiStats.funds / 10000000).toFixed(2)} Crores** by preventing these fraudulent payouts.`;
    }

    // Worst hospital query
    if (lowerMsg.includes('worst') && lowerMsg.includes('hospital')) {
      return `Based on our analysis, **Apollo Gleneagles** has the highest fraud detection rate with multiple flagged claims in the past week. The hospital has been flagged for cost mismatches and duplicate billing patterns. I recommend a comprehensive audit.`;
    }

    // Last claim flagged
    if (lowerMsg.includes('last') && lowerMsg.includes('flag')) {
      return `The most recent flagged claim was **CLM-002** from Nadia District Hospital. It was flagged due to **pattern matching with known fraud cluster #429**. The claim amount was ₹12,400 for a Viral Fever diagnosis, which exceeded standard treatment costs by 40%.`;
    }

    // Pending review
    if (lowerMsg.includes('pending') || lowerMsg.includes('review')) {
      return `There are currently **${kpiStats.pending.toLocaleString()} claims pending review**. This is a 2.1% decrease from yesterday. The average processing time is 1.2 days. Priority should be given to high-value claims above ₹1 lakh.`;
    }

    // Total claims
    if (lowerMsg.includes('total') && lowerMsg.includes('claim')) {
      return `We have processed **${kpiStats.total.toLocaleString()} total claims** to date. The system maintains a 94.2% audit rate with AI-powered verification active across 240+ registered hospitals in West Bengal.`;
    }

    // Funds saved
    if (lowerMsg.includes('fund') || lowerMsg.includes('save') || lowerMsg.includes('money')) {
      return `Our fraud detection system has saved **₹${(kpiStats.funds / 10000000).toFixed(2)} Crores** by identifying and preventing fraudulent claims. This represents an 18.7% increase in savings compared to last month.`;
    }

    // Hospital performance
    if (lowerMsg.includes('hospital') && lowerMsg.includes('perform')) {
      return `Top performing hospitals with lowest fraud rates: **SSKM Hospital** (0.2% fraud rate), **Bankura Sammilani** (0.5%), and **Nadia District Hospital** (1.1%). These hospitals demonstrate excellent compliance with claim protocols.`;
    }

    // District-specific queries
    if (lowerMsg.includes('nadia') && (lowerMsg.includes('trend') || lowerMsg.includes('analyze'))) {
      return `**Nadia District Analysis:**\n• Total Claims: 720\n• Fraud Detected: 89 cases (12.4% rate)\n• Risk Level: **HIGH**\n• Trend: Increasing fraud pattern detected in the last 30 days\n• Primary Issues: Cost inflation and duplicate billing\n• Recommendation: Immediate audit of top 3 hospitals in the district`;
    }

    if (lowerMsg.includes('district') && (lowerMsg.includes('worst') || lowerMsg.includes('highest') || lowerMsg.includes('high risk'))) {
      return `**Top 5 High-Risk Districts** (by fraud rate):\n1. **Nadia** - 12.4% fraud rate (89 cases)\n2. **Murshidabad** - 11.6% fraud rate (67 cases)\n3. **Kolkata** - 9.9% fraud rate (124 cases)\n4. **Birbhum** - 9.3% fraud rate (52 cases)\n5. **Malda** - 8.1% fraud rate (34 cases)\n\nThese districts require enhanced monitoring and hospital audits.`;
    }

    if (lowerMsg.includes('district') && (lowerMsg.includes('best') || lowerMsg.includes('lowest') || lowerMsg.includes('low risk'))) {
      return `**Top 5 Low-Risk Districts** (by fraud rate):\n1. **Alipurduar** - 2.8% fraud rate (7 cases)\n2. **Cooch Behar** - 2.8% fraud rate (8 cases)\n3. **Kalimpong** - 2.9% fraud rate (6 cases)\n4. **Jhargram** - 3.1% fraud rate (8 cases)\n5. **Purulia** - 3.2% fraud rate (10 cases)\n\nThese districts demonstrate excellent compliance and monitoring.`;
    }

    if (lowerMsg.includes('how many district') || lowerMsg.includes('total district')) {
      return `The Shasthya-Rakshak system monitors **all 23 districts** of West Bengal:\n\n**North Bengal:** Alipurduar, Cooch Behar, Darjeeling, Jalpaiguri, Kalimpong, Malda, North Dinajpur, South Dinajpur\n\n**Central Bengal:** Birbhum, Hooghly, Howrah, Murshidabad, Nadia, Purba Bardhaman, Paschim Bardhaman\n\n**South Bengal:** Bankura, Jhargram, Kolkata, North 24 Parganas, South 24 Parganas, Purba Medinipur, Paschim Medinipur, Purulia`;
    }

    // AI capabilities
    if (lowerMsg.includes('how') && (lowerMsg.includes('work') || lowerMsg.includes('detect'))) {
      return `I use a **Neural Engine v2.4** with Random Forest algorithms and OCR scanning to analyze claims in real-time. I check for cost deviations, document authenticity, provider history, and pattern matching against known fraud clusters. Each claim receives a risk score from 0-100.`;
    }

    // Cataract specific
    if (lowerMsg.includes('cataract')) {
      return `Cataract surgeries are flagged as high-risk when costs exceed **₹25,000**. Standard cataract procedures should range between ₹15,000-₹22,000. Claims above this threshold are automatically sent for manual review.`;
    }

    // Appendicitis specific
    if (lowerMsg.includes('appendicitis') || lowerMsg.includes('appendix')) {
      return `Appendicitis claims are verified by checking if the discharge summary contains the keyword "appendix". Claims missing this critical term are flagged as potential fraud with a 95% risk score.`;
    }

    // Blockchain
    if (lowerMsg.includes('blockchain') || lowerMsg.includes('ledger')) {
      return `Every claim action is recorded on our **Immutable Blockchain Ledger** with cryptographic hashes. This ensures complete transparency and prevents tampering. You can see the live ledger at the bottom of your screen.`;
    }

    // Help/capabilities
    if (lowerMsg.includes('help') || lowerMsg.includes('what can you')) {
      return `I can help you with:\n• Fraud statistics and trends\n• Hospital performance analysis\n• Flagged claim details\n• Pending review counts\n• Funds saved reports\n• AI detection methodology\n• Blockchain audit trail info\n\nJust ask me anything!`;
    }

    // Default response
    return `I understand you're asking about "${userMessage}". I can provide insights on fraud stats, hospital performance, flagged claims, and system analytics. Try asking "Show me fraud stats" or "Which hospital has the most issues?"`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    addLog(`AI Query: ${input.substring(0, 50)}...`);
    setInput('');

    // Simulate AI thinking delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      addLog('AI response generated');
    }, 800);
  };

  const handleVoiceCommand = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    addLog('Voice command activated');

    // Simulate voice recognition with typing effect
    const voiceQueries = [
      'Analyze the trend for Nadia district',
      'Show me fraud statistics for this month',
      'Which hospital has the highest fraud rate',
      'What is the total amount saved',
      'How many claims are pending review'
    ];

    const randomQuery = voiceQueries[Math.floor(Math.random() * voiceQueries.length)];
    let currentText = '';
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < randomQuery.length) {
        currentText += randomQuery[index];
        setInput(currentText);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsListening(false);
        addLog(`Voice recognized: ${randomQuery}`);
        // Auto-send after typing completes
        setTimeout(() => {
          if (currentText === randomQuery) {
            handleSend();
          }
        }, 500);
      }
    }, 50);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-4 md:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 z-50 animate-pulse"
          title="Open AI Chat"
        >
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 left-4 md:bottom-6 md:right-8 md:left-auto md:w-96 max-h-[calc(100vh-2rem)] md:max-h-[600px] shadow-2xl border-2 border-purple-200 z-50 flex flex-col bg-white overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Investigator</h3>
                <p className="text-xs opacity-90">Neural Engine v2.4</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full shrink-0"
              title="Close Chat"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gradient-to-br from-purple-600 to-blue-600'
                }`}>
                  {message.sender === 'user' ? (
                    <UserIcon className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-[10px] mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 bg-white shrink-0">
            <div className="flex gap-2">
              <Button
                onClick={handleVoiceCommand}
                variant={isListening ? "destructive" : "outline"}
                className={cn(
                  "h-11 px-3",
                  isListening && "animate-pulse"
                )}
                title={isListening ? "Stop listening" : "Voice command"}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isListening && handleSend()}
                placeholder={isListening ? "Listening..." : "Ask about fraud stats or use voice..."}
                className="flex-1 h-11 bg-slate-50"
                disabled={isListening}
              />
              <Button
                onClick={handleSend}
                disabled={isListening || !input.trim()}
                className="h-11 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              Powered by Neural Engine • Real-time Analytics • Voice Enabled
            </p>
          </div>
        </Card>
      )}
    </>
  );
};

export default AIChatbot;
