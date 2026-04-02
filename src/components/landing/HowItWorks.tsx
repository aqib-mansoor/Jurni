import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Headphones, Plane, ArrowRight } from 'lucide-react';
import { HowItWorksModal } from '../search/HowItWorksModal';

const steps = [
  {
    icon: Search,
    title: 'Choose Your Journey',
    description: 'Explore our curated collection of elite properties and exclusive experiences worldwide.'
  },
  {
    icon: Headphones,
    title: 'Personalize with Concierge',
    description: 'Our dedicated travel experts will tailor every detail to your unique preferences and desires.'
  },
  {
    icon: Plane,
    title: 'Embark & Enjoy',
    description: 'Step into a world of seamless luxury as we handle everything from arrival to departure.'
  }
];

export const HowItWorks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 lg:py-40 px-6 sm:px-12 bg-pearl overflow-hidden relative">
      {/* Decorative Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] lg:text-[25vw] font-serif text-midnight/[0.02] select-none pointer-events-none leading-none">
        Process
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="text-center mb-24 lg:mb-32" data-aos="fade-up">
          <span className="text-rose font-bold text-[10px] tracking-[0.5em] uppercase block mb-6">The Jurni Experience</span>
          <h2 className="text-5xl lg:text-8xl font-serif text-midnight leading-[1.1] tracking-tight">
            How It <span className="text-champagne italic font-light">Works</span>
          </h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-12 px-12 py-5 bg-midnight text-champagne rounded-2xl text-[10px] uppercase font-bold tracking-[0.3em] hover:scale-105 transition-all duration-700 shadow-2xl shadow-midnight/20 group"
          >
            Explore the Process <ArrowRight size={14} className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 relative">
          {/* Connecting Lines (Desktop) */}
          <div className="hidden md:block absolute top-[48px] lg:top-[60px] left-0 w-full h-[2px] bg-midnight/5 z-0 shadow-sm" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="h-24 w-24 lg:h-32 lg:w-32 bg-pearl border-2 border-midnight/5 rounded-[32px] flex items-center justify-center mb-10 lg:mb-12 group-hover:border-champagne group-hover:bg-midnight group-hover:text-champagne transition-all duration-700 relative shadow-card group-hover:shadow-hover">
                <div className="absolute -top-4 -right-4 h-10 w-10 lg:h-12 lg:w-12 bg-midnight text-champagne rounded-xl flex items-center justify-center font-serif text-xl border-4 border-pearl group-hover:bg-champagne group-hover:text-midnight transition-all duration-700 shadow-lg">
                  {index + 1}
                </div>
                <step.icon size={36} strokeWidth={1.5} className="text-midnight group-hover:text-champagne group-hover:scale-110 transition-all duration-700" />
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-serif text-midnight mb-6 lg:mb-8 tracking-tight leading-tight">{step.title}</h3>
              <p className="text-midnight/50 text-sm lg:text-base leading-relaxed font-light max-w-xs group-hover:text-midnight transition-colors duration-500 italic">
                "{step.description}"
              </p>
              
              {index < steps.length - 1 && (
                <div className="md:hidden mt-12 text-champagne animate-bounce">
                  <ArrowRight size={24} className="rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <HowItWorksModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
