import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, Star } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-8 bg-midnight text-pearl overflow-hidden relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1920&auto=format&fit=crop" 
          alt="Luxury Background" 
          className="h-full w-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/80 to-midnight/40" />
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto" data-aos="zoom-in">
          <div className="flex items-center gap-2 mb-6 sm:mb-8 bg-pearl/5 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-pearl/10 backdrop-blur-sm">
            <Star size={12} className="text-champagne fill-current sm:w-[14px] sm:h-[14px]" />
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-pearl/70">
              Join 10,000+ Elite Travelers
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl lg:text-9xl font-serif text-pearl leading-[1.1] sm:leading-[0.85] tracking-tighter mb-8 sm:mb-12">
            Your Extraordinary <br />
            <span className="text-champagne italic font-light">Journey Awaits</span>
          </h2>
          
          <p className="text-base sm:text-xl text-pearl/60 font-light leading-relaxed mb-10 sm:mb-16 max-w-2xl px-4 sm:px-0">
            Step into a world where every detail is a masterpiece. Join Jurni today and experience the pinnacle of luxury travel.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-10 py-5 sm:px-16 sm:py-8 bg-champagne text-midnight hover:bg-pearl hover:text-midnight transition-all duration-500 font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs rounded-none shadow-[0_20px_50px_rgba(247,215,148,0.3)] flex items-center justify-center gap-2 group"
            >
              Join Jurni — It's Free <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform sm:w-[16px] sm:h-[16px]" />
            </Button>
            
            <p className="text-[10px] uppercase tracking-widest text-pearl/40 font-bold">
              No commitment. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
