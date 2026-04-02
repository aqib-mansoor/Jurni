import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Forbes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Forbes_logo.svg/1024px-Forbes_logo.svg.png' },
  { name: 'Condé Nast', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Conde_Nast_logo.svg/1024px-Conde_Nast_logo.svg.png' },
  { name: 'Robb Report', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Robb_Report_logo.svg/1024px-Robb_Report_logo.svg.png' },
  { name: 'Travel + Leisure', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Travel_%2B_Leisure_logo.svg/1024px-Travel_%2B_Leisure_logo.svg.png' },
];

export const TrustSignals = () => {
  return (
    <section className="py-20 lg:py-32 px-6 sm:px-12 bg-pearl overflow-hidden border-y border-midnight/5">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          <div className="flex items-center gap-6 lg:gap-10 w-full" data-aos="fade-up">
            <div className="h-[1px] flex-1 bg-midnight/10 shadow-sm" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-midnight/30 whitespace-nowrap text-center">
              Trusted by Luxury Travelers Worldwide
            </span>
            <div className="h-[1px] flex-1 bg-midnight/10 shadow-sm" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 items-center justify-center w-full max-w-6xl opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="flex items-center justify-center group"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-6 sm:h-8 lg:h-10 w-auto object-contain transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const span = document.createElement('span');
                      span.className = "text-xl lg:text-2xl font-serif text-midnight/40 tracking-tight group-hover:text-midnight transition-colors duration-700";
                      span.innerText = brand.name;
                      parent.appendChild(span);
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          <div className="w-20 lg:w-32 h-1 bg-champagne mt-8 lg:mt-12 rounded-full shadow-2xl shadow-champagne/40" data-aos="zoom-in" />
        </div>
      </div>
    </section>
  );
};
