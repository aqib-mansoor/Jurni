import React from 'react';
import { Button } from '../ui/Button';

export const CTASection = ({ onAuthClick }: { onAuthClick: () => void }) => {
  return (
    <section className="py-32 lg:py-48 px-6 sm:px-12 bg-midnight relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #F7D794 1px, transparent 0)', backgroundSize: '60px 60px' }} />
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-champagne/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10" data-aos="zoom-in">
        <span className="text-rose font-bold text-[10px] tracking-[0.5em] uppercase block mb-8">Start Your Journey</span>
        <h2 className="text-5xl lg:text-8xl font-serif text-pearl mb-12 leading-[1.1] tracking-tight">
          Ready to Experience <br />
          <span className="text-champagne italic font-light">True Luxury?</span>
        </h2>
        <p className="text-xl lg:text-2xl text-pearl/60 mb-16 font-light tracking-wide max-w-3xl mx-auto leading-relaxed italic">
          "Join thousands of discerning travelers who have discovered the Jurni difference. 
          Your masterpiece journey begins here."
        </p>
        <Button 
          size="lg" 
          className="px-16 py-8 text-xs lg:text-sm font-bold uppercase tracking-[0.4em] shadow-2xl shadow-midnight/50 hover:scale-105 transition-all duration-700 bg-champagne text-midnight border-none rounded-2xl"
          onClick={onAuthClick}
        >
          Join Jurni Today
        </Button>
      </div>
    </section>
  );
};
