import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Linkedin, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '../ui/Button';

const links = {
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Our Story', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ],
  services: [
    { name: 'Concierge', href: '#' },
    { name: 'Private Jets', href: '#' },
    { name: 'Yacht Charters', href: '#' },
    { name: 'Corporate', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Booking Terms', href: '#' },
  ]
};

export const Footer = () => {
  return (
    <footer className="bg-midnight text-pearl pt-32 pb-16 px-6 sm:px-12 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F7D794 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-champagne opacity-[0.05] rounded-full blur-[120px]" />
      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-rose opacity-[0.04] rounded-full blur-[120px]" />
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 mb-32">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-serif text-champagne tracking-tighter">Jurni</h2>
              <p className="text-pearl/50 text-lg leading-relaxed max-w-sm font-medium italic">
                Crafting extraordinary journeys for the world's most discerning travelers. Every detail is a masterpiece, every moment is a legacy.
              </p>
            </div>
            
            <div className="flex items-center gap-5">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -8, color: '#F7D794', borderColor: '#F7D794' }}
                  className="h-14 w-14 border border-pearl/10 rounded-2xl flex items-center justify-center text-pearl/30 hover:bg-pearl/5 transition-all duration-700 shadow-2xl"
                >
                  <Icon size={22} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-16">
            <div className="space-y-10">
              <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-champagne/60">The Company</h4>
              <ul className="space-y-5">
                {links.company.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-base text-pearl/40 hover:text-champagne transition-all duration-500 font-medium block hover:translate-x-2">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-10">
              <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-champagne/60">Our Services</h4>
              <ul className="space-y-5">
                {links.services.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-base text-pearl/40 hover:text-champagne transition-all duration-500 font-medium block hover:translate-x-2">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1 space-y-10">
              <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-champagne/60">Legal Elite</h4>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-5">
                {links.legal.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-base text-pearl/40 hover:text-champagne transition-all duration-500 font-medium block hover:translate-x-2">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-12">
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-champagne/60">The Newsletter</h4>
              <p className="text-base text-pearl/50 font-medium leading-relaxed">Subscribe to receive exclusive travel inspiration and elite offers.</p>
            </div>
            
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full bg-pearl/5 border border-pearl/10 py-6 px-8 text-base text-pearl placeholder:text-pearl/20 focus:outline-none focus:border-champagne transition-all duration-700 rounded-[20px] shadow-inner"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 h-14 w-14 bg-champagne text-midnight rounded-2xl flex items-center justify-center hover:bg-white transition-all duration-700 shadow-2xl shadow-champagne/20">
                <ArrowRight size={24} />
              </button>
            </div>
            
            <div className="space-y-5 pt-4">
              <div className="flex items-center gap-5 text-pearl/30 group cursor-pointer">
                <div className="h-10 w-10 rounded-xl bg-pearl/5 flex items-center justify-center group-hover:bg-champagne group-hover:text-midnight transition-all duration-500">
                  <Mail size={18} />
                </div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase group-hover:text-pearl transition-colors">concierge@jurni.com</span>
              </div>
              <div className="flex items-center gap-5 text-pearl/30 group cursor-pointer">
                <div className="h-10 w-10 rounded-xl bg-pearl/5 flex items-center justify-center group-hover:bg-champagne group-hover:text-midnight transition-all duration-500">
                  <Phone size={18} />
                </div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase group-hover:text-pearl transition-colors">+1 (800) JURNI-LUXE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-16 border-t border-pearl/10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-pearl/20">
              © {new Date().getFullYear()} Jurni Luxury Travel. All Rights Reserved.
            </p>
            <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-pearl/10">
              <a href="#" className="hover:text-champagne transition-colors">Privacy</a>
              <a href="#" className="hover:text-champagne transition-colors">Terms</a>
              <a href="#" className="hover:text-champagne transition-colors">Cookies</a>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-10 grayscale hover:opacity-40 transition-all duration-1000">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-5" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-5" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_Pay_logo.svg/1920px-Apple_Pay_logo.svg.png" alt="Apple Pay" className="h-8" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </footer>
  );
};
