import React from 'react';
import { Search, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchBarProps {
  onClick?: () => void;
}

export const SearchBar = ({ onClick }: SearchBarProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-champagne/20 via-rose/20 to-champagne/20 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <button 
          onClick={onClick}
          className="relative w-full bg-pearl border border-midnight/5 p-4 sm:p-5 rounded-[24px] shadow-card flex items-center justify-between group hover:shadow-hover transition-all duration-700 focus:outline-none focus:border-champagne"
        >
          <div className="flex items-center gap-4 sm:gap-8 px-2 sm:px-4">
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-midnight/5 rounded-2xl flex items-center justify-center text-champagne group-hover:bg-midnight transition-all duration-700">
              <Search size={20} strokeWidth={2} />
            </div>
            <div className="text-left">
              <span className="text-midnight/60 text-lg sm:text-xl font-serif italic tracking-tight">Where would you like to escape?</span>
            </div>
          </div>
          <div className="h-10 w-10 sm:h-14 sm:w-14 bg-champagne rounded-xl flex items-center justify-center text-midnight group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-xl shadow-champagne/20">
            <Compass size={24} className="animate-spin-slow" />
          </div>
        </button>
      </div>
    </motion.div>
  );
};
