import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star, Sparkles } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marcus Thorne",
      role: "CEO, Thorne Enterprises",
      text: "Jurni has completely transformed the way I travel. The attention to detail and the sheer exclusivity of the experiences they curate is unparalleled.",
      avatar: "https://i.pravatar.cc/150?u=marcus",
      rating: 5
    },
    {
      name: "Sophia Chen",
      role: "Luxury Lifestyle Blogger",
      text: "As someone who travels for a living, I've seen it all. But Jurni consistently manages to surprise and delight me with their hidden gems and VIP access.",
      avatar: "https://i.pravatar.cc/150?u=sophia",
      rating: 5
    },
    {
      name: "Julian de Silva",
      role: "International Architect",
      text: "The aesthetic of the platform itself is a masterpiece. It reflects the high-end experiences they provide. Seamless, elegant, and truly premium.",
      avatar: "https://i.pravatar.cc/150?u=julian",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-midnight relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-champagne/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center space-y-6 mb-20" data-aos="fade-up">
          <div className="flex items-center justify-center gap-3">
            <div className="h-1 w-12 bg-champagne rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne/60">Voices of the Elite</span>
            <div className="h-1 w-12 bg-champagne rounded-full" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-serif text-pearl tracking-tight leading-tight">
            The Masterpiece <br />
            <span className="text-champagne italic">Experience</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-pearl/5 backdrop-blur-xl p-10 rounded-[40px] border border-pearl/10 shadow-2xl hover:bg-pearl/10 transition-all duration-500 group"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-champagne/20 flex items-center justify-center text-champagne">
                    <Quote size={24} fill="currentColor" />
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} className="text-champagne fill-current" />)}
                  </div>
                </div>

                <p className="text-lg font-serif text-pearl/80 italic leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-pearl/10">
                  <div className="h-12 w-12 rounded-2xl overflow-hidden border-2 border-champagne/20">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-pearl uppercase tracking-widest">{testimonial.name}</h4>
                    <p className="text-[10px] text-champagne uppercase tracking-widest font-bold opacity-60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-24 flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          {['FORBES', 'VOGUE', 'CONDÉ NAST', 'THE TIMES', 'TRAVEL+LEISURE'].map(brand => (
            <span key={brand} className="text-xl lg:text-3xl font-serif text-pearl tracking-[0.2em] font-bold">{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
