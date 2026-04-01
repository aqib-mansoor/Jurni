import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Choose Your Journey',
    description: 'Browse our exclusive collection of luxury flights, trains, and hotels.'
  },
  {
    number: '02',
    title: 'Personalize Experience',
    description: 'Tailor every detail of your trip to match your unique preferences.'
  },
  {
    number: '03',
    title: 'Embark & Enjoy',
    description: 'Travel with peace of mind knowing Jurni handles everything else.'
  }
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-midnight text-pearl overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-serif text-champagne mb-4">How Jurni Works</h2>
          <p className="text-pearl opacity-60 font-light tracking-wide">Seamless luxury from discovery to destination.</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-champagne opacity-20 z-0" />

          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className="relative z-10 text-center"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="h-24 w-24 rounded-full bg-midnight border-2 border-champagne text-champagne flex items-center justify-center text-3xl font-serif mx-auto mb-8 shadow-2xl">
                {step.number}
              </div>
              <h3 className="text-2xl font-serif text-champagne mb-4">{step.title}</h3>
              <p className="text-pearl opacity-70 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
