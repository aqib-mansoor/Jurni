import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Anchor, Mountain, Compass, ArrowRight, Star } from 'lucide-react';

const experiences = [
  {
    icon: Anchor,
    title: 'Private Yacht Charter',
    description: 'Sail the Mediterranean on a custom-built superyacht with a private crew and Michelin-star chef.',
    price: 'From $15,000 / day',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1920&auto=format&fit=crop',
    tags: ['Mediterranean', 'Private Crew', 'Ultra-Luxury']
  },
  {
    icon: Mountain,
    title: 'Alpine Luxury Chalet',
    description: 'Experience the Swiss Alps from a ski-in/ski-out chalet featuring a private spa and cinema.',
    price: 'From $8,500 / night',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=1920&auto=format&fit=crop',
    tags: ['Swiss Alps', 'Ski-in/out', 'Private Spa']
  },
  {
    icon: Compass,
    title: 'Cultural Immersion',
    description: 'A curated journey through Kyoto\'s hidden temples with a private guide and traditional tea ceremonies.',
    price: 'From $4,200 / person',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1920&auto=format&fit=crop',
    tags: ['Kyoto', 'Private Guide', 'Heritage']
  }
];

export const ExperiencePreview = () => {
  return (
    <section id="experiences" className="py-20 sm:py-32 px-4 sm:px-8 bg-midnight text-pearl overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-champagne/5 to-transparent pointer-events-none" />
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-16 sm:mb-24 gap-8 sm:gap-12" data-aos="fade-up">
          <div className="max-w-2xl">
            <span className="text-champagne text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold mb-4 sm:mb-6 block">Signature Experiences</span>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-serif text-pearl leading-[1.1] sm:leading-[0.9] tracking-tighter">
              Curated <br />
              <span className="text-champagne italic font-light">Masterpieces</span>
            </h2>
          </div>
          <div className="max-w-md lg:mt-12">
            <p className="text-lg sm:text-xl text-pearl/60 font-light leading-relaxed">
              We don't just book travel; we curate legacies. Every detail is meticulously planned to ensure your journey is nothing short of a masterpiece.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group bg-pearl/5 border border-pearl/10 rounded-none overflow-hidden hover:border-champagne/30 transition-all duration-500"
            >
              <div className="relative h-[250px] sm:h-[300px] overflow-hidden">
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-champagne text-midnight px-3 py-1 sm:px-4 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {exp.price}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} className="text-[8px] sm:text-[9px] uppercase tracking-widest font-bold text-pearl/70 bg-pearl/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6 sm:p-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-champagne/10 text-champagne rounded-full flex items-center justify-center group-hover:bg-champagne group-hover:text-midnight transition-colors duration-500">
                    <exp.icon size={20} strokeWidth={1.5} className="sm:w-[24px] sm:h-[24px]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-pearl tracking-tight">{exp.title}</h3>
                </div>
                
                <p className="text-pearl/50 text-xs sm:text-sm leading-relaxed mb-8 sm:mb-10 font-light group-hover:text-pearl/80 transition-colors">
                  {exp.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full border-pearl/20 text-pearl hover:bg-champagne hover:text-midnight hover:border-champagne transition-all duration-500 rounded-none uppercase tracking-[0.2em] text-[10px] font-bold py-4 sm:py-6 flex items-center justify-center gap-2"
                >
                  Inquire Now <ArrowRight size={14} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
