import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Headphones, Tag, Clock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Curated Experiences',
    description: 'Every destination and property is hand-picked by our luxury travel experts.'
  },
  {
    icon: Headphones,
    title: '24/7 Concierge',
    description: 'Your personal travel assistant is always just a call or message away.'
  },
  {
    icon: Tag,
    title: 'Best Price Guarantee',
    description: 'Exclusive rates and perks that you won\'t find anywhere else.'
  },
  {
    icon: Clock,
    title: 'Real-time Availability',
    description: 'Instant booking with live updates on the world\'s most sought-after stays.'
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 lg:py-40 px-6 sm:px-12 bg-midnight text-pearl overflow-hidden relative">
      {/* Decorative Background Text */}
      <div className="absolute top-0 right-0 text-[25vw] lg:text-[20vw] font-serif text-pearl/[0.03] select-none pointer-events-none translate-x-1/4 -translate-y-1/4 leading-none">
        Excellence
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-20 lg:mb-32 gap-12 lg:gap-20" data-aos="fade-up">
          <div className="max-w-3xl">
            <span className="text-rose font-bold text-[10px] tracking-[0.5em] uppercase block mb-6">The Jurni Standard</span>
            <h2 className="text-5xl lg:text-8xl font-serif text-pearl leading-[1.1] tracking-tight">
              Uncompromising <br />
              <span className="text-champagne italic font-light">Quality</span>
            </h2>
          </div>
          <div className="max-w-lg lg:mt-24">
            <p className="text-xl lg:text-2xl text-pearl/60 font-light leading-relaxed italic">
              "We don't just book travel; we curate legacies. Every detail is meticulously planned to ensure your journey is nothing short of a masterpiece."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-pearl/10 border border-pearl/10 rounded-[40px] overflow-hidden shadow-2xl shadow-midnight/50">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              whileHover={{ backgroundColor: 'rgba(247, 215, 148, 0.03)' }}
              className="p-10 lg:p-16 bg-midnight group transition-all duration-700 relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-champagne/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="h-16 w-16 lg:h-20 lg:w-20 bg-pearl/5 text-champagne rounded-2xl flex items-center justify-center mb-10 lg:mb-16 group-hover:scale-110 group-hover:bg-champagne group-hover:text-midnight transition-all duration-700 shadow-inner">
                <feature.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-serif text-pearl mb-6 lg:mb-8 tracking-tight leading-tight">{feature.title}</h3>
              <p className="text-sm lg:text-base text-pearl/40 leading-relaxed font-light group-hover:text-pearl/80 transition-colors duration-500">
                {feature.description}
              </p>
              
              <div className="mt-12 lg:mt-20 overflow-hidden">
                <div className="h-[1px] w-full bg-pearl/10 relative">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-champagne shadow-[0_0_15px_rgba(247,215,148,0.5)]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
