import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { HelpCircle, Mail, Phone, MessageSquare, Search, ChevronDown, ChevronUp, ShieldCheck, Globe, Star, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export const HelpPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I book a private jet experience?",
      answer: "Booking a private jet is seamless. Simply select the 'Flights' category, choose your destination and dates, and our concierge will handle the rest. You'll receive a curated itinerary within 2 hours."
    },
    {
      question: "What is your cancellation policy for luxury villas?",
      answer: "We offer full refunds for cancellations made at least 14 days prior to check-in. For cancellations within 14 days, a 50% refund is provided. Premium members enjoy flexible cancellation up to 48 hours before arrival."
    },
    {
      question: "Are all experiences on Jurni verified?",
      answer: "Yes, every listing on Jurni undergoes a rigorous 100-point inspection by our global team. We verify everything from amenities and safety standards to the quality of service provided."
    },
    {
      question: "How can I contact my personal concierge?",
      answer: "Your personal concierge is available 24/7 via the 'Chat' feature in your dashboard or by calling our dedicated luxury line. You can also email concierge@jurni.luxury for non-urgent requests."
    }
  ];

  const supportChannels = [
    {
      title: "Concierge Chat",
      description: "Real-time assistance for your luxury travel needs.",
      icon: MessageSquare,
      action: "Start Chat",
      color: "bg-blue-50"
    },
    {
      title: "Priority Email",
      description: "Send us your detailed requests and inquiries.",
      icon: Mail,
      action: "Send Email",
      color: "bg-amber-50"
    },
    {
      title: "Luxury Line",
      description: "Speak directly with a travel specialist.",
      icon: Phone,
      action: "Call Now",
      color: "bg-emerald-50"
    }
  ];

  return (
    <div className="bg-pearl min-h-screen py-12 lg:py-20 px-6 sm:px-12">
      <div className="max-w-screen-2xl mx-auto space-y-12 lg:space-y-20">
        <div data-aos="fade-down">
          <span className="text-rose font-bold text-[10px] tracking-[0.5em] uppercase block mb-4">Support Portal</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-midnight leading-[1.1] tracking-tight">Help & Support</h1>
          <p className="text-lg text-midnight/60 mt-4 max-w-2xl italic">Our concierge team is at your service, 24/7. Excellence is our standard.</p>
        </div>

        {/* Search Help */}
        <div className="relative max-w-3xl mx-auto" data-aos="fade-up">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-midnight/20" />
          <input 
            type="text" 
            placeholder="Search for help, policies, or guides..." 
            className="w-full bg-pearl border border-midnight/10 rounded-[32px] py-8 pl-20 pr-8 text-xl font-serif text-midnight focus:outline-none focus:border-champagne shadow-card transition-all duration-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12" data-aos="fade-up">
          {supportChannels.map((channel) => (
            <Card key={channel.title} className="p-10 text-center space-y-8 rounded-[40px] shadow-card border-midnight/5 group hover:shadow-hover transition-all duration-700 bg-pearl">
              <div className={cn("h-20 w-20 rounded-full flex items-center justify-center mx-auto text-midnight transition-all duration-700 group-hover:scale-110 shadow-inner bg-midnight/5", channel.color)}>
                <channel.icon size={36} className="text-champagne" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-serif text-midnight leading-tight">{channel.title}</h3>
                <p className="text-sm text-midnight/50 leading-relaxed">{channel.description}</p>
              </div>
              <Button variant="outline" className="w-full rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] py-4 border-midnight/10 hover:border-champagne transition-all">
                {channel.action}
              </Button>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* FAQ Section */}
          <div className="lg:col-span-8 space-y-10" data-aos="fade-right">
            <h2 className="text-3xl lg:text-4xl font-serif text-midnight leading-tight">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-pearl border border-midnight/5 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
                >
                  <button 
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-8 text-left hover:bg-midnight/5 transition-colors"
                  >
                    <span className="text-lg lg:text-xl font-serif text-midnight leading-tight">{faq.question}</span>
                    {activeFaq === index ? <ChevronUp size={24} className="text-champagne" /> : <ChevronDown size={24} className="text-midnight/20" />}
                  </button>
                  {activeFaq === index && (
                    <div className="px-8 pb-8 animate-fade-in">
                      <p className="text-base text-midnight/60 leading-relaxed italic border-t border-midnight/5 pt-6 mt-2">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4 space-y-12" data-aos="fade-left">
            <div className="space-y-8">
              <h2 className="text-2xl font-serif text-midnight leading-tight">Quick Resources</h2>
              <div className="space-y-4">
                {[
                  { label: 'Booking Policies', icon: ShieldCheck },
                  { label: 'Global Destinations', icon: Globe },
                  { label: 'Member Benefits', icon: Star },
                  { label: 'Terms of Service', icon: HelpCircle }
                ].map((link) => (
                  <button 
                    key={link.label}
                    className="w-full flex items-center justify-between p-5 bg-pearl border border-midnight/5 hover:border-champagne/50 transition-all group rounded-2xl shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-5">
                      <div className="h-12 w-12 rounded-xl bg-midnight/5 flex items-center justify-center text-midnight/40 group-hover:text-champagne group-hover:bg-midnight transition-all duration-500 shadow-inner">
                        <link.icon size={20} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-midnight/70 group-hover:text-midnight transition-colors">{link.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-midnight/20 group-hover:text-champagne transition-all" />
                  </button>
                ))}
              </div>
            </div>

            <Card className="p-10 bg-midnight text-pearl rounded-[40px] shadow-2xl border-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-champagne opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <h3 className="text-2xl font-serif text-champagne mb-4 leading-tight">Still need help?</h3>
              <p className="text-sm opacity-60 leading-relaxed mb-10">Our luxury travel specialists are standing by to assist you with any request, no matter how complex.</p>
              <Button className="w-full bg-pearl text-midnight hover:bg-champagne transition-all rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] py-5 shadow-xl shadow-midnight/20">
                Contact Concierge
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
