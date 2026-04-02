import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What makes Jurni different from other luxury travel platforms?",
      answer: "Jurni is built on the philosophy of 'Masterpiece Journeys.' We don't just book trips; we curate experiences. Our AI Concierge, combined with human expertise, ensures every detail is personalized to your unique taste."
    },
    {
      question: "How do I become a Platinum member?",
      answer: "Platinum status is awarded to our most frequent travelers who have accumulated 50,000 loyalty points. Benefits include private jet upgrades, personal travel curators, and exclusive access to invite-only events."
    },
    {
      question: "Is my data secure with Jurni?",
      answer: "Absolutely. We use military-grade encryption and strictly adhere to global privacy standards. Your personal information and travel history are kept confidential and secure at all times."
    },
    {
      question: "Can I book private jets and luxury trains through Jurni?",
      answer: "Yes, Jurni offers a comprehensive range of luxury travel options, including private jets, luxury trains, and the world's most exclusive hotels and resorts."
    }
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 bg-pearl relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-champagne/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-midnight/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center space-y-6 mb-20" data-aos="fade-up">
          <div className="flex items-center justify-center gap-3">
            <div className="h-1 w-12 bg-champagne rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-midnight/40">Curated Answers</span>
            <div className="h-1 w-12 bg-champagne rounded-full" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-serif text-midnight tracking-tight leading-tight">
            Frequently Asked <br />
            <span className="text-midnight/40 italic">Questions</span>
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "bg-white rounded-[32px] border border-midnight/5 shadow-card overflow-hidden transition-all duration-500",
                openIndex === index ? "shadow-2xl shadow-midnight/5" : "hover:shadow-xl"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-8 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                    openIndex === index ? "bg-midnight text-champagne" : "bg-midnight/[0.03] text-midnight/20 group-hover:bg-midnight/10"
                  )}>
                    <HelpCircle size={24} />
                  </div>
                  <h3 className="text-lg font-serif text-midnight group-hover:text-champagne transition-colors duration-500">{faq.question}</h3>
                </div>
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-500",
                  openIndex === index ? "bg-champagne text-midnight rotate-180" : "bg-midnight/5 text-midnight/20"
                )}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 pl-[calc(2rem+3rem)]">
                      <p className="text-sm text-midnight/50 font-light leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center space-y-8" data-aos="fade-up">
          <p className="text-sm text-midnight/40 font-light tracking-wide">Still have questions? Our curators are here to help.</p>
          <button className="flex items-center gap-3 mx-auto px-8 py-4 bg-midnight text-champagne rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-2xl shadow-midnight/20 hover:scale-105 transition-all group">
            Speak with our Concierge
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
