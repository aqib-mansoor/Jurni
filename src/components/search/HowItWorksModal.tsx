import React from 'react';
import { motion } from 'framer-motion';
import { Search, Headphones, Plane, X, ArrowRight } from 'lucide-react';
import { Modal } from '../ui/Modal';

const steps = [
  {
    icon: Search,
    title: 'Choose Your Journey',
    description: 'Explore our curated collection of elite properties and exclusive experiences worldwide. From private islands to hidden mountain retreats, your perfect escape awaits.',
    details: 'Our algorithm curates the most exclusive listings based on your preferences, ensuring every recommendation is a masterpiece of luxury.'
  },
  {
    icon: Headphones,
    title: 'Personalize with Concierge',
    description: 'Our dedicated travel experts will tailor every detail to your unique preferences and desires.',
    details: 'Your personal concierge is available 24/7 to handle everything from dinner reservations at Michelin-starred restaurants to private jet transfers.'
  },
  {
    icon: Plane,
    title: 'Embark & Enjoy',
    description: 'Step into a world of seamless luxury as we handle everything from arrival to departure.',
    details: 'Experience travel without friction. We coordinate all logistics, so your only responsibility is to immerse yourself in the extraordinary.'
  }
];

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-5xl" title="">
      <div className="p-8 sm:p-16 bg-white overflow-hidden relative">
        <div className="text-center mb-16">
          <span className="text-terracotta text-xs uppercase tracking-[0.5em] font-bold mb-4 block">The Jurni Process</span>
          <h2 className="text-5xl sm:text-6xl font-serif text-charcoal leading-[1.1] tracking-tighter">
            How It <span className="text-amber italic font-light">Works</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative flex flex-col items-center text-center group p-8 rounded-[32px] bg-ivory/30 border border-ivory/50 hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              <div className="h-20 w-20 bg-white border border-ivory/50 rounded-full flex items-center justify-center mb-8 group-hover:border-amber group-hover:scale-110 transition-all duration-500 relative shadow-sm">
                <div className="absolute -top-2 -right-2 h-8 w-8 bg-charcoal text-amber rounded-full flex items-center justify-center font-serif text-sm border-2 border-white">
                  {index + 1}
                </div>
                <step.icon size={28} strokeWidth={1.5} className="text-charcoal" />
              </div>
              
              <h3 className="text-2xl font-serif text-charcoal mb-4 tracking-tight">{step.title}</h3>
              <p className="text-charcoal/60 text-sm leading-relaxed font-medium mb-6">
                {step.description}
              </p>
              <div className="pt-6 border-t border-charcoal/5 w-full">
                <p className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold leading-relaxed italic">
                  {step.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={onClose}
            className="px-12 py-5 bg-charcoal text-amber rounded-2xl text-[10px] uppercase font-bold tracking-[0.4em] hover:scale-105 transition-all duration-500 shadow-2xl"
          >
            Begin Your Journey
          </button>
        </div>
      </div>
    </Modal>
  );
};
