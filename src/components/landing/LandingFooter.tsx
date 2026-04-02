import React from 'react';
import { motion } from 'motion/react';
import { Globe, Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin, Sparkles, Send } from 'lucide-react';

export const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Experience',
      links: [
        { label: 'Luxury Hotels', path: '#' },
        { label: 'Private Jets', path: '#' },
        { label: 'Luxury Trains', path: '#' },
        { label: 'Exclusive Events', path: '#' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Jurni', path: '#about' },
        { label: 'Our Philosophy', path: '#' },
        { label: 'Careers', path: '#' },
        { label: 'Press', path: '#' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '#' },
        { label: 'Contact Us', path: '#' },
        { label: 'Privacy Policy', path: '#' },
        { label: 'Terms of Service', path: '#' },
      ]
    }
  ];

  return (
    <footer className="bg-midnight pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-champagne/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-champagne/20 flex items-center justify-center text-champagne shadow-xl">
                <Sparkles size={24} />
              </div>
              <span className="text-2xl font-serif text-pearl tracking-tight">JURNİ</span>
            </div>
            <p className="text-sm text-pearl/40 font-light leading-relaxed max-w-xs">
              Crafting extraordinary journeys that become timeless masterpieces. Experience the pinnacle of luxury travel.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <button key={i} className="h-10 w-10 rounded-xl bg-pearl/5 text-pearl/40 flex items-center justify-center hover:bg-champagne hover:text-midnight transition-all duration-500">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne/60">{group.title}</h4>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.path} className="text-sm text-pearl/40 hover:text-pearl transition-colors duration-300 font-light">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne/60">Newsletter</h4>
              <p className="text-sm text-pearl/40 font-light leading-relaxed">
                Join our elite circle for exclusive travel insights and early access to new masterpieces.
              </p>
            </div>
            <form className="relative group">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-pearl/5 border border-pearl/10 rounded-2xl p-5 pr-16 text-sm text-pearl outline-none focus:border-champagne/30 transition-all placeholder:text-pearl/20"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-champagne text-midnight rounded-xl flex items-center justify-center hover:scale-105 transition-all shadow-xl shadow-champagne/10">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-12 border-t border-pearl/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-pearl/20">
            <span>&copy; {currentYear} JURNİ LUXURY TRAVEL</span>
            <div className="h-1 w-1 rounded-full bg-pearl/10" />
            <span>ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-pearl/20">
            <a href="#" className="hover:text-pearl transition-colors">Privacy</a>
            <a href="#" className="hover:text-pearl transition-colors">Terms</a>
            <a href="#" className="hover:text-pearl transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
