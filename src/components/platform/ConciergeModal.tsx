import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Send, User, Sparkles, X, MessageSquare, Phone, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { cn } from '../../lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConciergeModal = ({ isOpen, onClose }: ConciergeModalProps) => {
  const { user } = useJurniAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Good evening, ${user?.displayName?.split(' ')[0] || 'Traveler'}. I am your Jurni AI Concierge. How may I assist in crafting your next masterpiece journey today?`,
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing the world's most exclusive destinations to find the perfect match for your request. One moment while I curate your options...",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { label: 'Book a Private Jet', icon: Plane },
    { label: 'Michelin Dining', icon: Star },
    { label: 'Exclusive Events', icon: Award },
    { label: 'Luxury Transfers', icon: Car },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl" className="p-0 overflow-hidden">
      <div className="flex flex-col h-[600px] bg-pearl">
        {/* Header */}
        <header className="bg-midnight p-6 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/80 to-midnight/40" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-champagne/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          
          <div className="relative z-10 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-champagne/20 backdrop-blur-md border border-champagne/30 flex items-center justify-center text-champagne shadow-xl">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-xl font-serif text-pearl leading-tight">Jurni AI Concierge</h3>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-pearl/40 uppercase tracking-widest font-bold">Always at your service</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="relative z-10 h-10 w-10 rounded-full bg-pearl/10 text-pearl flex items-center justify-center hover:bg-pearl/20 transition-all"
          >
            <X size={20} />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3 max-w-[85%]",
                msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
                msg.sender === 'ai' ? "bg-midnight text-champagne" : "bg-champagne text-midnight"
              )}>
                {msg.sender === 'ai' ? <Sparkles size={14} /> : <User size={14} />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed shadow-card border border-midnight/5",
                msg.sender === 'ai' 
                  ? "bg-white text-midnight rounded-tl-none" 
                  : "bg-midnight text-pearl rounded-tr-none"
              )}>
                {msg.text}
                <div className={cn(
                  "text-[8px] mt-2 font-bold uppercase tracking-widest opacity-30",
                  msg.sender === 'user' ? "text-right" : ""
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="h-8 w-8 rounded-full bg-midnight text-champagne flex items-center justify-center shadow-sm">
                <Sparkles size={14} />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-midnight/5 shadow-card flex gap-1">
                <div className="h-1.5 w-1.5 bg-midnight/20 rounded-full animate-bounce" />
                <div className="h-1.5 w-1.5 bg-midnight/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="h-1.5 w-1.5 bg-midnight/20 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-4 border-t border-midnight/5 bg-midnight/[0.02]">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {['Private Jet', 'Fine Dining', 'VIP Access', 'Chauffeur'].map(action => (
              <button 
                key={action}
                onClick={() => setInputText(prev => prev + (prev ? ' ' : '') + action)}
                className="px-4 py-2 bg-white border border-midnight/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-midnight/60 hover:border-champagne hover:text-midnight transition-all whitespace-nowrap shadow-sm"
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-6 bg-white border-t border-midnight/5">
          <div className="relative group">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask your concierge anything..."
              className="w-full bg-midnight/[0.03] border border-transparent focus:border-champagne/30 p-5 pr-16 text-sm focus:ring-4 focus:ring-champagne/5 outline-none rounded-2xl transition-all placeholder:text-midnight/20"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-midnight text-champagne rounded-xl flex items-center justify-center hover:bg-midnight/90 disabled:opacity-30 transition-all shadow-lg shadow-midnight/20"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const Plane = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plane"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>;
const Star = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const Award = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>;
const Car = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>;
