import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { SearchBar } from './SearchBar';
import { VideoModal } from './VideoModal';

export const HeroSection = ({ onAuthClick }: { onAuthClick: () => void }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative h-screen w-full bg-charcoal z-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1920&auto=format&fit=crop"
          alt="Maldives Overwater Villa"
          className="h-full w-full object-cover scale-105 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/20 to-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 pt-32 sm:pt-40">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full border border-white/10 backdrop-blur-2xl shadow-2xl"
          >
            <Star size={16} className="text-amber fill-current animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-white/90">
              The Pinnacle of Luxury Travel
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
            className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-serif text-pearl leading-[1.05] tracking-tight drop-shadow-2xl max-w-5xl text-balance"
          >
            Journeys That Become <br />
            <span className="text-champagne italic font-light">Masterpieces</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-pearl/80 font-medium max-w-2xl mb-12 leading-relaxed tracking-wide uppercase"
          >
            Crafting extraordinary experiences for the world's most discerning travelers. <br className="hidden md:block" /> Your legacy begins with a single <span className="text-champagne italic font-light">Jurni</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
            className="w-full max-w-5xl flex justify-center"
          >
            <Button 
              onClick={onAuthClick}
              className="bg-champagne text-midnight px-16 py-6 rounded-2xl text-[12px] font-bold uppercase tracking-[0.4em] shadow-2xl shadow-champagne/20 hover:scale-105 transition-all"
            >
              Begin Your Journey
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <div className="h-12 w-[1px] bg-gradient-to-b from-amber to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/40">Scroll</span>
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
