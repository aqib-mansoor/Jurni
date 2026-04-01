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
    <section id="destinations" className="py-20 sm:py-32 px-4 sm:px-8 bg-pearl overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 sm:mb-24 gap-8 sm:gap-12" data-aos="fade-up">
          <div className="max-w-2xl">
            <span className="text-rose text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold mb-4 sm:mb-6 block">Destinations</span>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-serif text-midnight leading-[1.1] sm:leading-[0.9] tracking-tighter">
              The World's <br />
              <span className="text-champagne italic font-light">Most Exclusive</span>
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-midnight/60 font-light max-w-md lg:text-right leading-relaxed italic">
            "Travel is the only thing you buy that makes you richer." — Anonymous
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative h-[400px] sm:h-[500px] overflow-hidden cursor-pointer"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10">
                <p className="text-champagne text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold mb-1 sm:mb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {dest.properties}
                </p>
                <h3 className="text-3xl sm:text-4xl font-serif text-pearl tracking-tight mb-4 sm:mb-6">
                  {dest.name}
                </h3>
                
                <div className="h-[1px] w-0 group-hover:w-full bg-champagne transition-all duration-700 mb-4 sm:mb-6" />
                
                <Button 
                  size="sm" 
                  className="bg-champagne text-midnight border-none rounded-none opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 flex items-center gap-2 text-[10px] sm:text-xs px-6 py-3 sm:px-8 sm:py-4"
                >
                  Explore <ArrowRight size={14} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
