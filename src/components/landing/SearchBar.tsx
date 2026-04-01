import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export const SearchBar = () => {
  const [destination, setDestination] = useState('');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="w-full max-w-5xl mx-auto px-4 relative z-30"
    >
      <div className="bg-pearl p-2 lg:p-4 rounded-none lg:rounded-full shadow-[0_20px_50px_rgba(25,42,86,0.15)] border border-midnight/5 flex flex-col lg:flex-row items-center gap-2 lg:gap-0">
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-midnight/10">
          {/* Destination */}
          <div className="px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-3 sm:gap-4 group">
            <MapPin className="text-champagne group-hover:scale-110 transition-transform" size={18} />
            <div className="flex-1">
              <p className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-midnight/40 mb-0.5 sm:mb-1">Destination</p>
              <input 
                type="text" 
                placeholder="Where to next?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-midnight font-medium placeholder:text-midnight/30 focus:ring-0 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-3 sm:gap-4 group cursor-pointer">
            <Calendar className="text-champagne group-hover:scale-110 transition-transform" size={18} />
            <div className="flex-1">
              <p className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-midnight/40 mb-0.5 sm:mb-1">Travel Dates</p>
              <p className="text-xs sm:text-sm text-midnight font-medium">Add dates</p>
            </div>
          </div>

          {/* Guests */}
          <div className="px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-3 sm:gap-4 group cursor-pointer">
            <Users className="text-champagne group-hover:scale-110 transition-transform" size={18} />
            <div className="flex-1">
              <p className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-midnight/40 mb-0.5 sm:mb-1">Guests</p>
              <p className="text-xs sm:text-sm text-midnight font-medium">Add guests</p>
            </div>
          </div>
        </div>

        <Button 
          size="lg" 
          className="w-full lg:w-auto px-8 sm:px-12 py-3 sm:py-4 lg:py-6 rounded-none lg:rounded-full bg-champagne text-midnight hover:bg-midnight hover:text-champagne transition-all duration-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center gap-2"
        >
          <Search size={14} />
          Explore
        </Button>
      </div>
    </motion.div>
  );
};
