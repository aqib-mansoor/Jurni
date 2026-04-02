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
    <section id="experiences" className="py-24 lg:py-40 px-6 sm:px-12 bg-midnight text-pearl overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-champagne/[0.03] to-transparent pointer-events-none" />
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-20 lg:mb-32 gap-12 lg:gap-20" data-aos="fade-up">
          <div className="max-w-3xl">
            <span className="text-rose font-bold text-[10px] tracking-[0.5em] uppercase block mb-6">Signature Experiences</span>
            <h2 className="text-5xl lg:text-8xl font-serif text-pearl leading-[1.1] tracking-tight">
              Curated <br />
              <span className="text-champagne italic font-light">Masterpieces</span>
            </h2>
          </div>
          <div className="max-w-lg lg:mt-24">
            <p className="text-xl lg:text-2xl text-pearl/60 font-light leading-relaxed italic">
              "We don't just book travel; we curate legacies. Every detail is meticulously planned to ensure your journey is nothing short of a masterpiece."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="group bg-pearl/[0.02] border border-pearl/10 rounded-[40px] overflow-hidden hover:border-champagne/30 transition-all duration-700 shadow-2xl shadow-midnight/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 bg-champagne text-midnight px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-xl">
                  {exp.price}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-3">
                  {exp.tags.map(tag => (
                    <span key={tag} className="text-[9px] uppercase tracking-[0.2em] font-bold text-pearl/70 bg-pearl/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-pearl/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-10 lg:p-12">
                <div className="flex items-center gap-6 mb-8 lg:mb-10">
                  <div className="h-14 w-14 lg:h-16 lg:w-16 bg-champagne/10 text-champagne rounded-2xl flex items-center justify-center group-hover:bg-champagne group-hover:text-midnight transition-all duration-700 shadow-inner">
                    <exp.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-serif text-pearl tracking-tight leading-tight">{exp.title}</h3>
                </div>
                
                <p className="text-pearl/40 text-sm lg:text-base leading-relaxed mb-10 lg:mb-12 font-light group-hover:text-pearl/80 transition-colors duration-500">
                  {exp.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full border-pearl/10 text-pearl hover:bg-champagne hover:text-midnight hover:border-champagne transition-all duration-700 rounded-2xl uppercase tracking-[0.3em] text-[10px] font-bold py-6 flex items-center justify-center gap-3 shadow-xl shadow-midnight/20"
                >
                  Inquire Now <ArrowRight size={16} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
