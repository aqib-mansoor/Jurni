import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How do I book a luxury experience with Jurni?",
    answer: "Booking with Jurni is a curated process. You can explore our collection online and submit an inquiry. One of our dedicated travel experts will then contact you to personalize every detail of your journey before finalizing the booking."
  },
  {
    question: "What makes Jurni different from other travel platforms?",
    answer: "We focus exclusively on ultra-luxury, hand-picked properties and experiences. Every listing is vetted by our experts, and every traveler is assigned a personal concierge available 24/7 to ensure a seamless journey."
  },
  {
    question: "Are the prices on the website final?",
    answer: "Prices shown are starting rates. Because we specialize in highly personalized travel, the final price may vary based on your specific requests, seasonal availability, and additional concierge services."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellation policies vary by property and experience. However, we work closely with our partners to offer the most flexible terms possible for our elite members. Detailed terms are provided during the inquiry process."
  },
  {
    question: "Can Jurni handle private jet and yacht charters?",
    answer: "Absolutely. Our concierge team has exclusive access to a global network of private jet operators and superyacht charters, allowing us to manage your entire journey from door to door."
  },
  {
    question: "Do you offer corporate travel services?",
    answer: "Yes, we provide bespoke corporate travel management for executives and high-performance teams, focusing on privacy, efficiency, and luxury."
  },
  {
    question: "How do I become a Jurni Elite member?",
    answer: "Membership is currently by invitation or application. Elite members enjoy exclusive perks, priority access to new properties, and enhanced concierge benefits."
  },
  {
    question: "Is my personal data secure with Jurni?",
    answer: "We employ industry-leading encryption and privacy protocols to ensure your data and travel details remain strictly confidential and secure."
  }
];

export const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-8 bg-pearl overflow-hidden relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-24" data-aos="fade-up">
          <span className="text-rose text-xs uppercase tracking-[0.4em] font-bold mb-6 block">Common Inquiries</span>
          <h2 className="text-6xl lg:text-8xl font-serif text-midnight leading-[0.9] tracking-tighter">
            Frequently <br />
            <span className="text-champagne italic font-light">Asked</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="border-b border-midnight/10 overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className={`text-xl font-serif transition-colors duration-500 ${activeIndex === index ? 'text-champagne' : 'text-midnight group-hover:text-champagne'}`}>
                  {faq.question}
                </span>
                <div className={`h-10 w-10 rounded-full border border-midnight/10 flex items-center justify-center transition-all duration-500 ${activeIndex === index ? 'bg-champagne border-champagne text-midnight rotate-180' : 'text-midnight group-hover:border-champagne group-hover:text-champagne'}`}>
                  {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <div className="pb-10 text-midnight/60 leading-relaxed font-light max-w-3xl">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
