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
          className="w-full bg-pearl/95 backdrop-blur-2xl border border-midnight/5 p-4 sm:p-6 rounded-[32px] shadow-2xl flex flex-col sm:flex-row items-center gap-4 sm:gap-0 group hover:shadow-hover transition-all duration-700 text-left"
        >
          <div className="flex-1 w-full flex items-center gap-8 px-4 sm:px-10">
            <div className="h-14 w-14 rounded-2xl bg-midnight/5 flex items-center justify-center text-midnight group-hover:bg-midnight group-hover:text-champagne transition-all duration-700">
              <Search size={24} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-midnight/40 text-[9px] font-bold uppercase tracking-[0.4em] mb-1">Elite Search</p>
              <span className="text-midnight/80 text-xl sm:text-2xl font-serif italic tracking-tight">Where would you like to escape?</span>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-16 px-16 border-l border-midnight/10">
            <div className="flex flex-col">
              <p className="text-midnight/40 text-[9px] font-bold uppercase tracking-[0.4em] mb-1">When</p>
              <span className="text-midnight/80 text-xs font-bold uppercase tracking-[0.2em]">Add Dates</span>
            </div>
            <div className="flex flex-col">
              <p className="text-midnight/40 text-[9px] font-bold uppercase tracking-[0.4em] mb-1">Who</p>
              <span className="text-midnight/80 text-xs font-bold uppercase tracking-[0.2em]">Add Guests</span>
            </div>
          </div>

          <div className="h-16 w-16 sm:h-20 sm:w-20 bg-champagne rounded-2xl flex items-center justify-center text-midnight group-hover:scale-105 group-hover:rotate-3 transition-all duration-700 shadow-xl shadow-champagne/20 shrink-0 sm:ml-6">
            <Compass size={32} className="group-hover:animate-spin-slow" />
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
