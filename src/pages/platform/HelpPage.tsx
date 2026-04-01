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
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 lg:space-y-12">
      <div data-aos="fade-down">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-midnight mb-2">Help & Support</h1>
        <p className="text-sm sm:text-base text-midnight opacity-60 font-light italic">Our concierge team is at your service, 24/7.</p>
      </div>

      {/* Search Help */}
      <div className="relative max-w-2xl mx-auto" data-aos="fade-up">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-midnight opacity-20" />
        <input 
          type="text" 
          placeholder="Search for help, policies, or guides..." 
          className="w-full bg-white border border-midnight border-opacity-10 rounded-none py-6 pl-16 pr-6 text-lg font-serif text-midnight focus:outline-none focus:border-champagne shadow-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" data-aos="fade-up">
        {supportChannels.map((channel) => (
          <Card key={channel.title} className="p-8 text-center space-y-6 rounded-none shadow-lg border-none group hover:shadow-2xl transition-all duration-500">
            <div className={cn("h-16 w-16 rounded-full flex items-center justify-center mx-auto text-midnight transition-transform duration-500 group-hover:scale-110", channel.color)}>
              <channel.icon size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-serif text-midnight">{channel.title}</h3>
              <p className="text-xs text-midnight opacity-50 leading-relaxed">{channel.description}</p>
            </div>
            <Button variant="outline" className="w-full rounded-none text-[10px] font-bold uppercase tracking-widest">
              {channel.action}
            </Button>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-6" data-aos="fade-right">
          <h2 className="text-2xl lg:text-3xl font-serif text-midnight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-midnight border-opacity-5 rounded-none overflow-hidden"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-pearl transition-colors"
                >
                  <span className="text-sm lg:text-base font-serif text-midnight">{faq.question}</span>
                  {activeFaq === index ? <ChevronUp size={20} className="text-champagne" /> : <ChevronDown size={20} className="text-midnight opacity-20" />}
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-sm text-midnight opacity-60 leading-relaxed italic">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-1 space-y-6" data-aos="fade-left">
          <h2 className="text-2xl font-serif text-midnight mb-8">Quick Resources</h2>
          <div className="space-y-4">
            {[
              { label: 'Booking Policies', icon: ShieldCheck },
              { label: 'Global Destinations', icon: Globe },
              { label: 'Member Benefits', icon: Star },
              { label: 'Terms of Service', icon: HelpCircle }
            ].map((link) => (
              <button 
                key={link.label}
                className="w-full flex items-center justify-between p-4 bg-white border border-midnight border-opacity-5 hover:border-champagne transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-pearl flex items-center justify-center text-midnight opacity-40 group-hover:text-champagne group-hover:opacity-100 transition-all">
                    <link.icon size={18} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-midnight opacity-70">{link.label}</span>
                </div>
                <ChevronRight size={16} className="text-midnight opacity-20 group-hover:text-champagne group-hover:opacity-100 transition-all" />
              </button>
            ))}
          </div>

          <Card className="p-8 bg-midnight text-pearl rounded-none shadow-xl border-none">
            <h3 className="text-xl font-serif text-champagne mb-4">Still need help?</h3>
            <p className="text-xs opacity-60 leading-relaxed mb-8">Our luxury travel specialists are standing by to assist you with any request, no matter how complex.</p>
            <Button className="w-full bg-white text-midnight hover:bg-champagne transition-all rounded-none text-[10px] font-bold uppercase tracking-widest">
              Contact Concierge
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
