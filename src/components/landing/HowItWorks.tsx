import React from 'react';
import { motion } from 'framer-motion';
import { Search, Headphones, Plane, ArrowRight } from 'lucide-react';

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
  return (
    <section className="py-32 px-8 bg-pearl overflow-hidden relative">
      {/* Decorative Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-serif text-midnight/5 select-none pointer-events-none">
        Process
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="text-center mb-24" data-aos="fade-up">
          <span className="text-rose text-xs uppercase tracking-[0.4em] font-bold mb-6 block">The Jurni Experience</span>
          <h2 className="text-6xl lg:text-8xl font-serif text-midnight leading-[0.9] tracking-tighter">
            How It <span className="text-champagne italic font-light">Works</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 lg:gap-32 relative">
          {/* Connecting Lines (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-midnight/10 -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="h-24 w-24 bg-pearl border-2 border-midnight/10 rounded-full flex items-center justify-center mb-10 group-hover:border-champagne group-hover:bg-champagne group-hover:text-midnight transition-all duration-700 relative">
                <div className="absolute -top-4 -right-4 h-10 w-10 bg-midnight text-champagne rounded-full flex items-center justify-center font-serif text-xl border-4 border-pearl group-hover:bg-champagne group-hover:text-midnight transition-colors duration-700">
                  {index + 1}
                </div>
                <step.icon size={32} strokeWidth={1.5} className="text-midnight group-hover:scale-110 transition-transform duration-700" />
              </div>
              
              <h3 className="text-2xl font-serif text-midnight mb-6 tracking-tight">{step.title}</h3>
              <p className="text-midnight/60 text-sm leading-relaxed font-light max-w-xs group-hover:text-midnight transition-colors duration-500">
                {step.description}
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
    </section>
  );
};
