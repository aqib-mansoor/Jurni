import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { SearchBar } from './SearchBar';
import { VideoModal } from './VideoModal';

export const HeroSection = ({ onAuthClick }: { onAuthClick: () => void }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] lg:h-screen w-full bg-midnight z-20 overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1920&auto=format&fit=crop"
          alt="Maldives Overwater Villa"
          className="h-full w-full object-cover scale-105 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/30 to-midnight/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 pt-32 sm:pt-40 pb-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center gap-3 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-xl mb-10"
          >
            <Star size={14} className="text-champagne fill-current" />
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-pearl/90">
              The Pinnacle of Luxury Travel
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
            className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[90px] font-serif text-pearl leading-[1.1] tracking-tight drop-shadow-2xl max-w-4xl text-balance mb-8"
          >
            Journeys That Become <br />
            <span className="text-champagne italic font-light">Masterpieces</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="text-[10px] sm:text-xs md:text-sm text-pearl/70 font-medium max-w-xl mb-16 leading-relaxed tracking-[0.2em] uppercase"
          >
            Crafting extraordinary experiences for the world's most discerning travelers. <br className="hidden md:block" /> Your legacy begins with a single <span className="text-champagne italic font-light">Jurni</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            <SearchBar />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <div className="h-10 w-[1px] bg-gradient-to-b from-champagne to-transparent" />
        <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-white/30">Scroll</span>
      </motion.div>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoUrl="https://www.youtube.com/embed/6_6v9x6XhZ8?autoplay=1" 
      />
    </section>
  );
};
