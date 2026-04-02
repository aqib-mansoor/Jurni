import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, Star } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-24 lg:py-48 px-6 sm:px-12 bg-midnight text-pearl overflow-hidden relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1920&auto=format&fit=crop" 
          alt="Luxury Background" 
          className="h-full w-full object-cover opacity-10 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/90 to-midnight/60" />
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto" data-aos="zoom-in">
          <div className="flex items-center gap-3 mb-10 lg:mb-12 bg-pearl/[0.03] px-8 py-3 rounded-full border border-pearl/10 backdrop-blur-md shadow-inner">
            <Star size={14} className="text-champagne fill-current shadow-sm" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-pearl/60">
              Join 10,000+ Elite Travelers
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-9xl font-serif text-pearl leading-[1.1] tracking-tight mb-12 lg:mb-16">
            Your Extraordinary <br />
            <span className="text-champagne italic font-light">Journey Awaits</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-pearl/50 font-light leading-relaxed mb-16 lg:mb-24 max-w-3xl italic">
            "Step into a world where every detail is a masterpiece. Join Jurni today and experience the pinnacle of luxury travel."
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-10 lg:gap-12">
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-16 py-8 bg-champagne text-midnight hover:bg-pearl hover:text-midnight transition-all duration-700 font-bold uppercase tracking-[0.4em] text-[10px] rounded-2xl shadow-2xl shadow-midnight/50 flex items-center justify-center gap-3 group border-none"
            >
              Join Jurni Today <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <p className="text-[10px] uppercase tracking-[0.5em] text-pearl/30 font-bold">
              No commitment. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
