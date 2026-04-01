import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alexandra Sterling',
    location: 'London, UK',
    comment: 'Jurni transformed our anniversary trip into something truly magical. The attention to detail was beyond anything we\'ve experienced.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=alex'
  },
  {
    name: 'James Vanderbilt',
    location: 'New York, USA',
    comment: 'The 24/7 concierge service is a game-changer. They handled a last-minute change to our itinerary with absolute grace.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=james'
  },
  {
    name: 'Elena Moretti',
    location: 'Milan, Italy',
    comment: 'Finally, a platform that understands what luxury travel really means. Every property exceeded our expectations.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?u=elena'
  }
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-32 px-8 bg-pearl text-midnight overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-midnight/10 to-transparent" />
      <div className="absolute -left-24 top-1/2 -translate-y-1/2 text-[20vw] font-serif text-midnight/5 select-none pointer-events-none">
        Stories
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8" data-aos="fade-up">
          <div className="max-w-2xl">
            <span className="text-rose text-xs uppercase tracking-[0.4em] font-bold mb-6 block">Testimonials</span>
            <h2 className="text-6xl lg:text-8xl font-serif text-midnight leading-[0.9] tracking-tighter">
              Voices of the <br />
              <span className="text-champagne italic font-light">Discerning</span>
            </h2>
          </div>
          <p className="text-xl text-midnight/60 font-light max-w-md lg:text-right leading-relaxed italic">
            "Travel is the only thing you buy that makes you richer." — Anonymous
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {testimonials.map((t, index) => (
            <div 
              key={t.name} 
              className="group"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="relative mb-12">
                <Quote className="absolute -top-8 -left-8 text-champagne/20" size={80} />
                <div className="flex gap-1 mb-8">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-champagne fill-current" />
                  ))}
                </div>
                <p className="text-2xl font-serif italic mb-12 text-midnight leading-relaxed group-hover:text-midnight/70 transition-colors">
                  "{t.comment}"
                </p>
              </div>
              
              <div className="flex items-center gap-6 pt-8 border-t border-midnight/10">
                <div className="relative">
                  <img src={t.avatar} alt={t.name} className="h-16 w-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute -bottom-2 -right-2 h-6 w-6 bg-champagne rounded-full flex items-center justify-center border-2 border-pearl">
                    <Star size={10} className="text-midnight fill-current" />
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-xl text-midnight tracking-tight">{t.name}</h4>
                  <p className="text-xs uppercase tracking-widest text-midnight/40 font-bold mt-1">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trustpilot Widget */}
        <div className="mt-32 flex flex-col items-center" data-aos="fade-up">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-8 bg-[#00b67a] flex items-center justify-center">
                  <Star size={16} className="text-white fill-current" />
                </div>
              ))}
            </div>
            <span className="text-2xl font-bold text-midnight">4.9 / 5</span>
          </div>
          <p className="text-sm uppercase tracking-widest font-bold text-midnight/40">
            Excellent on Trustpilot
          </p>
        </div>
      </div>
    </section>
  );
};
