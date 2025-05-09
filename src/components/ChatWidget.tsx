import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SAMPLE_RESPONSES: { [key: string]: string } = {
  'default': "I'm here to help you with any questions about selling your software licenses!",
  'how': "The process is simple: 1. Submit your license details through our form 2. Get an instant valuation 3. Accept the offer and receive payment within 24-48 hours.",
  'price': "Our valuations are based on current market rates, remaining subscription time, and license transferability. Submit your details for a precise quote.",
  'payment': "We offer secure payments via bank transfer or PayPal, typically processed within 24-48 hours after accepting an offer.",
  'security': "We use bank-level encryption and secure protocols to protect all transactions and data transfers.",
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleBotResponse("Hi! How can I help you today?");
    }
    scrollToBottom();
  }, [messages, isOpen]);

  const handleBotResponse = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateResponse = (input: string) => {
    const normalizedInput = input.toLowerCase();
    let response = SAMPLE_RESPONSES.default;

    if (normalizedInput.includes('how') || normalizedInput.includes('process')) {
      response = SAMPLE_RESPONSES.how;
    } else if (normalizedInput.includes('price') || normalizedInput.includes('cost') || normalizedInput.includes('worth')) {
      response = SAMPLE_RESPONSES.price;
    } else if (normalizedInput.includes('pay') || normalizedInput.includes('payment')) {
      response = SAMPLE_RESPONSES.payment;
    } else if (normalizedInput.includes('secure') || normalizedInput.includes('safe')) {
      response = SAMPLE_RESPONSES.security;
    }

    return response;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(userMessage.text);
      handleBotResponse(response);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 ${isOpen ? 'hidden' : ''}`}
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-blue-700 text-white rounded-t-lg">
              <h3 className="font-semibold">SoftSell Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-800 p-1 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-700 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2 text-gray-500"
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Typing...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;