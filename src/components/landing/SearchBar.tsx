import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, Compass } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { SearchModal } from '../search/SearchModal';

export const SearchBar = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto px-4 relative z-30"
      >
        <button 
          onClick={() => setIsSearchModalOpen(true)}
          className="w-full bg-white/95 backdrop-blur-2xl border border-midnight/5 p-3 sm:p-4 rounded-[24px] shadow-card flex flex-col sm:flex-row items-center gap-4 sm:gap-0 group hover:shadow-hover transition-all duration-700 text-left"
        >
          <div className="flex-1 w-full flex items-center gap-6 px-4 sm:px-8">
            <div className="h-12 w-12 rounded-xl bg-midnight/5 flex items-center justify-center text-midnight group-hover:bg-midnight group-hover:text-champagne transition-all duration-700">
              <Search size={20} strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <p className="text-midnight/30 text-[8px] font-bold uppercase tracking-[0.4em] mb-0.5">Elite Search</p>
              <span className="text-midnight/80 text-lg sm:text-xl font-serif italic tracking-tight">Where would you like to escape?</span>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-12 px-12 border-l border-midnight/10">
            <div className="flex flex-col">
              <p className="text-midnight/30 text-[8px] font-bold uppercase tracking-[0.4em] mb-0.5">When</p>
              <span className="text-midnight/80 text-[10px] font-bold uppercase tracking-[0.2em]">Add Dates</span>
            </div>
            <div className="flex flex-col">
              <p className="text-midnight/30 text-[8px] font-bold uppercase tracking-[0.4em] mb-0.5">Who</p>
              <span className="text-midnight/80 text-[10px] font-bold uppercase tracking-[0.2em]">Add Guests</span>
            </div>
          </div>

          <div className="h-14 w-14 sm:h-16 sm:w-16 bg-champagne rounded-xl flex items-center justify-center text-midnight group-hover:scale-105 group-hover:rotate-3 transition-all duration-700 shadow-lg shadow-champagne/20 shrink-0 sm:ml-4">
            <Compass size={28} className="group-hover:animate-spin-slow" />
          </div>
        </button>
      </motion.div>

      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </>
  );
};
