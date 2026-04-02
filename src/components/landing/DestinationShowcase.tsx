import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const destinations = [
  { name: 'Maldives', properties: '120+ Properties', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1920&auto=format&fit=crop' },
  { name: 'Swiss Alps', properties: '85+ Chalets', image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1920&auto=format&fit=crop' },
  { name: 'Santorini', properties: '64+ Villas', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1920&auto=format&fit=crop' },
  { name: 'Amalfi Coast', properties: '92+ Estates', image: 'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?q=80&w=1920&auto=format&fit=crop' },
  { name: 'Kyoto', properties: '45+ Ryokans', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1920&auto=format&fit=crop' },
  { name: 'Bora Bora', properties: '38+ Resorts', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop' },
];

export const DestinationShowcase = () => {
  return (
    <section id="destinations" className="py-24 lg:py-40 px-6 sm:px-12 bg-pearl overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-20 lg:mb-32 gap-12 lg:gap-20" data-aos="fade-up">
          <div className="max-w-3xl">
            <span className="text-rose font-bold text-[10px] tracking-[0.5em] uppercase block mb-6">Global Destinations</span>
            <h2 className="text-5xl lg:text-8xl font-serif text-midnight leading-[1.1] tracking-tight">
              The World's <br />
              <span className="text-champagne italic font-light">Most Exclusive</span>
            </h2>
          </div>
          <p className="text-xl lg:text-2xl text-midnight/60 font-light max-w-lg lg:text-right leading-relaxed italic border-l-2 lg:border-l-0 lg:border-r-2 border-champagne/30 pl-6 lg:pl-0 lg:pr-6">
            "Travel is the only thing you buy that makes you richer." — Anonymous
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="group relative aspect-[4/5] overflow-hidden cursor-pointer rounded-[40px] shadow-card hover:shadow-hover transition-all duration-700"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              
              <div className="absolute bottom-10 left-10 right-10 lg:bottom-12 lg:left-12 lg:right-12">
                <p className="text-champagne text-[10px] font-bold uppercase tracking-[0.3em] mb-3 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-700">
                  {dest.properties}
                </p>
                <h3 className="text-4xl lg:text-5xl font-serif text-pearl tracking-tight mb-6 lg:mb-8 leading-tight">
                  {dest.name}
                </h3>
                
                <div className="h-[1px] w-0 group-hover:w-full bg-champagne transition-all duration-1000 mb-8 lg:mb-10 shadow-[0_0_10px_rgba(247,215,148,0.5)]" />
                
                <Button 
                  size="sm" 
                  className="bg-champagne text-midnight border-none rounded-2xl opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-700 delay-150 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] px-10 py-5 shadow-2xl shadow-midnight/20"
                >
                  Explore <ArrowRight size={16} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
