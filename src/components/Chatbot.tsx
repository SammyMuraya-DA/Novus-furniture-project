
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to Novus Furniture. How can I help you today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
      return 'Hello! Welcome to Novus Furniture. How can I assist you today?';
    }
    
    if (message.includes('delivery') || message.includes('shipping')) {
      return 'We offer free delivery within Nairobi and surrounding areas. Delivery typically takes 3-5 business days. For areas outside Nairobi, please contact us for shipping rates.';
    }
    
    if (message.includes('payment') || message.includes('pay')) {
      return 'We accept various payment methods including M-Pesa, bank transfers, and cash on delivery. You can also contact us via WhatsApp at +254 708 921377 to arrange payment.';
    }
    
    if (message.includes('warranty') || message.includes('guarantee')) {
      return 'All our furniture comes with a 1-year warranty against manufacturing defects. We also offer a 30-day return policy if you\'re not satisfied with your purchase.';
    }
    
    if (message.includes('custom') || message.includes('bespoke')) {
      return 'Yes, we offer custom furniture solutions! Please contact us with your requirements and we\'ll work with you to create the perfect piece for your space.';
    }
    
    if (message.includes('price') || message.includes('cost')) {
      return 'Our prices vary depending on the item and customization options. Please browse our products page or contact us for specific pricing information.';
    }
    
    if (message.includes('contact') || message.includes('phone') || message.includes('whatsapp')) {
      return 'You can reach us via WhatsApp at +254 708 921377. We\'re also available through our website contact form or visit our showroom in Nairobi.';
    }
    
    if (message.includes('hours') || message.includes('open')) {
      return 'Our showroom is open Monday to Saturday, 9:00 AM to 6:00 PM. We\'re closed on Sundays and public holidays.';
    }
    
    if (message.includes('location') || message.includes('address')) {
      return 'Our showroom is located in Nairobi. Please contact us at +254 708 921377 for the exact address and directions.';
    }
    
    return 'Thank you for your question! For specific inquiries, please contact us directly via WhatsApp at +254 708 921377 or browse our products page for more information.';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 transition-transform hover:scale-110",
          "bg-amber-900 hover:bg-amber-800 text-white"
        )}
        size="sm"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 shadow-2xl z-40 flex flex-col">
          <CardHeader className="bg-amber-900 text-white rounded-t-lg py-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Novus Furniture Support
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.isBot ? "justify-start" : "justify-end"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-2 rounded-lg text-sm",
                      message.isBot
                        ? "bg-gray-100 text-gray-900"
                        : "bg-amber-900 text-white"
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 p-2 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4 flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-amber-900 hover:bg-amber-800"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
