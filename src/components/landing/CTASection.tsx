import React from 'react';
import { Button } from '../ui/Button';

export const CTASection = ({ onAuthClick }: { onAuthClick: () => void }) => {
  return (
    <section className="py-24 px-6 bg-midnight relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #F7D794 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10" data-aos="zoom-in">
        <h2 className="text-4xl md:text-6xl font-serif text-pearl mb-8 leading-tight">
          Ready to Experience <br />
          <span className="text-champagne italic">True Luxury?</span>
        </h2>
        <p className="text-xl text-pearl opacity-70 mb-12 font-light tracking-wide">
          Join thousands of discerning travelers who have discovered the Jurni difference. 
          Your masterpiece journey begins here.
        </p>
        <Button 
          size="lg" 
          className="px-16 py-6 text-2xl shadow-2xl hover:scale-105 transition-transform"
          onClick={onAuthClick}
        >
          Join Jurni Today
        </Button>
      </div>
    </section>
  );
};
