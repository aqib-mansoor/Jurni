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
    <section className="pt-24 pb-12 sm:pt-32 sm:pb-24 px-4 sm:px-8 bg-pearl overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center gap-8 sm:gap-12">
          <div className="flex items-center gap-4 sm:gap-8 w-full" data-aos="fade-up">
            <div className="h-[1px] flex-1 bg-midnight/10" />
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-bold text-midnight/40 whitespace-nowrap text-center">
              Trusted by Luxury Travelers Worldwide
            </span>
            <div className="h-[1px] flex-1 bg-midnight/10" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 md:gap-24 items-center justify-center w-full max-w-5xl opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="flex items-center justify-center"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-4 sm:h-6 md:h-8 w-auto object-contain hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to text if image fails
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const span = document.createElement('span');
                      span.className = "text-lg sm:text-xl font-serif text-midnight/60 tracking-tight";
                      span.innerText = brand.name;
                      parent.appendChild(span);
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-champagne mt-4 sm:mt-8" data-aos="zoom-in" />
        </div>
      </div>
    </section>
  );
};
