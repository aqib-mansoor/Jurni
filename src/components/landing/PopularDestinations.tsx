import React from 'react';
import { motion } from 'framer-motion';

const destinations = [
  { name: 'Santorini, Greece', properties: 12, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800' },
  { name: 'Maldives', properties: 8, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800' },
  { name: 'Amalfi Coast, Italy', properties: 15, image: 'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?auto=format&fit=crop&q=80&w=800' },
  { name: 'Kyoto, Japan', properties: 10, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800' },
  { name: 'Swiss Alps', properties: 6, image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&q=80&w=800' },
  { name: 'Bora Bora', properties: 5, image: 'https://images.unsplash.com/photo-1589979482817-4fed7bb47052?auto=format&fit=crop&q=80&w=800' },
];

export const PopularDestinations = () => {
  return (
    <section className="py-24 px-6 bg-pearl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6" data-aos="fade-up">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-midnight mb-4">Iconic Destinations</h2>
            <p className="text-midnight opacity-60 font-light max-w-xl">
              Explore our most sought-after locations, each offering a unique blend of heritage and luxury.
            </p>
          </div>
          <button className="text-midnight font-medium border-b-2 border-champagne pb-1 hover:text-champagne transition-colors">
            View All Destinations
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              whileHover={{ scale: 1.02 }}
              className="group relative h-96 overflow-hidden rounded-sm cursor-pointer"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 text-pearl">
                <h3 className="text-2xl font-serif mb-2">{dest.name}</h3>
                <p className="text-sm opacity-80 mb-4">{dest.properties} Exclusive Properties</p>
                <button className="bg-champagne text-midnight px-6 py-2 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Explore
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
