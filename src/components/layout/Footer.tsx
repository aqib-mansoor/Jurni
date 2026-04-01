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
    <footer className="bg-midnight text-pearl pt-16 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pearl/10 to-transparent" />
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16 sm:mb-32">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl font-serif text-champagne tracking-tighter mb-6 sm:mb-8">Jurni</h2>
            <p className="text-pearl/50 text-xs sm:text-sm leading-relaxed mb-8 sm:mb-12 max-w-sm font-light">
              Crafting extraordinary journeys for the world's most discerning travelers. Every detail is a masterpiece, every moment is a legacy.
            </p>
            
            <div className="flex items-center gap-4 sm:gap-6">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: '#F7D794' }}
                  className="h-9 w-9 sm:h-10 sm:w-10 border border-pearl/10 rounded-full flex items-center justify-center text-pearl/40 hover:border-champagne transition-all duration-500"
                >
                  <Icon size={16} className="sm:size-[18px]" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <h4 className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-champagne mb-6 sm:mb-8">Company</h4>
              <ul className="space-y-3 sm:space-y-4">
                {links.company.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-xs sm:text-sm text-pearl/40 hover:text-pearl transition-colors duration-500 font-light">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-champagne mb-6 sm:mb-8">Services</h4>
              <ul className="space-y-3 sm:space-y-4">
                {links.services.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-xs sm:text-sm text-pearl/40 hover:text-pearl transition-colors duration-500 font-light">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-champagne mb-6 sm:mb-8">Legal</h4>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-4">
                {links.legal.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-xs sm:text-sm text-pearl/40 hover:text-pearl transition-colors duration-500 font-light">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h4 className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-champagne mb-6 sm:mb-8">Newsletter</h4>
            <p className="text-xs sm:text-sm text-pearl/50 mb-6 sm:mb-8 font-light">Subscribe to receive exclusive travel inspiration and elite offers.</p>
            
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full bg-pearl/5 border border-pearl/10 py-3 sm:py-4 px-4 sm:px-6 text-xs sm:text-sm text-pearl placeholder:text-pearl/20 focus:outline-none focus:border-champagne transition-all duration-500 rounded-none"
              />
              <button className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 bg-champagne text-midnight rounded-none flex items-center justify-center hover:bg-pearl transition-all duration-500">
                <ArrowRight size={16} className="sm:size-[18px]" />
              </button>
            </div>
            
            <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4 text-pearl/40">
                <Mail size={14} className="text-champagne sm:size-4" />
                <span className="text-[10px] sm:text-xs font-light tracking-widest uppercase">concierge@jurni.com</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-pearl/40">
                <Phone size={14} className="text-champagne sm:size-4" />
                <span className="text-[10px] sm:text-xs font-light tracking-widest uppercase">+1 (800) JURNI-LUXE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 sm:pt-12 border-t border-pearl/10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-pearl/20 text-center md:text-left">
            © 2024 Jurni Luxury Travel. All Rights Reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-20 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-3 sm:h-4" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 sm:h-6" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-3 sm:h-4" referrerPolicy="no-referrer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_Pay_logo.svg/1920px-Apple_Pay_logo.svg.png" alt="Apple Pay" className="h-4 sm:h-6" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </footer>
  );
};
