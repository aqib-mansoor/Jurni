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
    <section id="features" className="py-20 sm:py-32 px-4 sm:px-8 bg-midnight text-pearl overflow-hidden relative">
      {/* Decorative Background Text */}
      <div className="absolute top-0 right-0 text-[20vw] sm:text-[15vw] font-serif text-pearl/5 select-none pointer-events-none translate-x-1/4 -translate-y-1/4">
        Excellence
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-16 sm:mb-24 gap-8 sm:gap-12" data-aos="fade-up">
          <div className="max-w-2xl">
            <span className="text-champagne text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold mb-4 sm:mb-6 block">The Jurni Standard</span>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-serif text-pearl leading-[1.1] sm:leading-[0.9] tracking-tighter">
              Uncompromising <br />
              <span className="text-champagne italic font-light">Quality</span>
            </h2>
          </div>
          <div className="max-w-md lg:mt-12">
            <p className="text-lg sm:text-xl text-pearl/60 font-light leading-relaxed">
              We don't just book travel; we curate legacies. Every detail is meticulously planned to ensure your journey is nothing short of a masterpiece.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              whileHover={{ backgroundColor: 'rgba(247, 215, 148, 0.05)' }}
              className="p-8 sm:p-12 border border-pearl/10 group transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="h-12 w-12 sm:h-16 sm:w-16 bg-pearl/5 text-champagne rounded-full flex items-center justify-center mb-6 sm:mb-10 group-hover:scale-110 group-hover:bg-champagne group-hover:text-midnight transition-all duration-500">
                <feature.icon size={24} strokeWidth={1.5} className="sm:w-[28px] sm:h-[28px]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-pearl mb-4 sm:mb-6 tracking-tight">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-pearl/50 leading-relaxed font-light group-hover:text-pearl/80 transition-colors">
                {feature.description}
              </p>
              
              <div className="mt-8 sm:mt-12 overflow-hidden">
                <div className="h-[1px] w-full bg-pearl/10 relative">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-champagne"
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
