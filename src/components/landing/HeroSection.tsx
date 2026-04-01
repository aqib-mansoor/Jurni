import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { SearchBar } from './SearchBar';
import { VideoModal } from './VideoModal';

export const HeroSection = ({ onAuthClick }: { onAuthClick: () => void }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative h-screen w-full bg-midnight z-20">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          src="https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-overwater-villas-at-sunset-41130-large.mp4"
          className="h-full w-full object-cover opacity-60 scale-105 animate-slow-zoom"
          poster="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1920&auto=format&fit=crop"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-midnight/40 to-midnight/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 pt-32 sm:pt-40 lg:pt-48">
        <div className="max-w-screen-2xl mx-auto w-full flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 bg-pearl/5 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-pearl/10 backdrop-blur-sm"
          >
            <Star size={12} className="text-champagne fill-current sm:w-[14px] sm:h-[14px]" />
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-pearl/70">
              The Pinnacle of Luxury Travel
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-7xl lg:text-[10rem] font-serif text-pearl leading-[1.1] sm:leading-[0.85] tracking-tighter mb-8 sm:mb-12"
          >
            Journeys That Become <br />
            <span className="text-champagne italic font-light relative">
              Masterpieces
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 1.5 }}
                className="absolute -bottom-2 sm:-bottom-4 left-0 h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-xl lg:text-2xl text-pearl/60 font-light max-w-3xl mb-10 sm:mb-16 leading-relaxed px-4 sm:px-0"
          >
            Crafting extraordinary experiences for the world's most discerning travelers. Your legacy begins with a single <span className="text-champagne italic">Jurni</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-16 sm:mb-24"
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-10 py-5 sm:px-12 sm:py-8 bg-champagne text-midnight hover:bg-pearl hover:text-midnight transition-all duration-500 font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs rounded-none shadow-[0_20px_50px_rgba(247,215,148,0.3)] group"
              onClick={onAuthClick}
            >
              Start Your Journey <ArrowRight size={14} className="inline-block ml-2 group-hover:translate-x-2 transition-transform sm:w-[16px] sm:h-[16px]" />
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="grid grid-cols-3 gap-4 sm:gap-12 md:gap-24 border-t border-pearl/10 pt-8 sm:pt-12 w-full max-w-5xl"
          >
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <span className="text-xl sm:text-3xl font-serif text-pearl tracking-tight">500+</span>
              <span className="text-[7px] sm:text-[10px] uppercase tracking-widest text-pearl/40 font-bold">Properties</span>
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <span className="text-xl sm:text-3xl font-serif text-pearl tracking-tight">24/7</span>
              <span className="text-[7px] sm:text-[10px] uppercase tracking-widest text-pearl/40 font-bold">Concierge</span>
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <span className="text-xl sm:text-3xl font-serif text-pearl tracking-tight">10k+</span>
              <span className="text-[7px] sm:text-[10px] uppercase tracking-widest text-pearl/40 font-bold">Travelers</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Search Bar */}
      <SearchBar />

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-pearl/30 rotate-90 mb-8">Scroll</span>
        <div className="h-16 w-[1px] bg-gradient-to-b from-champagne to-transparent" />
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
