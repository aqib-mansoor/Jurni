import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Globe, Clock } from 'lucide-react';

export const AboutSection = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: "Uncompromising Security",
      description: "Your privacy and security are our highest priority. Every transaction and journey is protected by state-of-the-art encryption."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Access a curated selection of the world's most exclusive hotels, private jets, and luxury trains across 150+ countries."
    },
    {
      icon: Clock,
      title: "24/7 Concierge",
      description: "Our dedicated AI and human curators are available around the clock to ensure every detail of your journey is perfect."
    }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-pearl relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-champagne/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-midnight/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="space-y-8" data-aos="fade-right">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-champagne rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-midnight/40">The Jurni Philosophy</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-serif text-midnight leading-tight tracking-tight">
                Beyond Travel. <br />
                <span className="text-midnight/40 italic">A Masterpiece in Motion.</span>
              </h2>
            </div>
            
            <p className="text-lg text-midnight/60 font-light leading-relaxed max-w-xl">
              Jurni was founded on a simple yet profound belief: that travel should be more than just a destination. It should be a curated experience, a work of art that stays with you forever.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
              {values.map((value, index) => (
                <div key={index} className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-midnight/[0.03] text-champagne flex items-center justify-center">
                    <value.icon size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-midnight uppercase tracking-widest">{value.title}</h4>
                  <p className="text-xs text-midnight/40 leading-relaxed font-light">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Composition */}
          <div className="relative" data-aos="fade-left">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1000" 
                alt="Luxury Travel Experience" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="absolute -bottom-8 -left-8 lg:-left-12 bg-white p-8 rounded-[32px] shadow-2xl border border-midnight/5 z-20 max-w-[240px] hidden sm:block"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-champagne">
                  {[1, 2, 3, 4, 5].map(i => <Sparkles key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="text-sm font-serif text-midnight italic leading-relaxed">
                  "The most seamless and elegant travel platform I have ever experienced."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-midnight/10" />
                  <div>
                    <p className="text-[10px] font-bold text-midnight uppercase tracking-widest">Elena Rossi</p>
                    <p className="text-[8px] text-midnight/30 uppercase tracking-widest">Platinum Member</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Frame */}
            <div className="absolute -top-8 -right-8 w-full h-full border-2 border-champagne/20 rounded-[40px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
