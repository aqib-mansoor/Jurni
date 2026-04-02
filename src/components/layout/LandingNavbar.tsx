import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User as UserIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const LandingNavbar = ({ onAuthClick }: { onAuthClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Experiences', href: '#experiences' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Process', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQs', href: '#faqs' },
  ];

  return (
    <>
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 sm:px-12 py-6',
        isScrolled 
          ? 'bg-midnight/95 backdrop-blur-xl py-4 shadow-2xl border-b border-pearl/5' 
          : 'bg-transparent border-b border-transparent'
      )}>
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <span className={cn(
              "text-3xl sm:text-4xl font-serif font-bold tracking-[0.4em] transition-all duration-700",
              isScrolled ? "text-champagne" : "text-pearl"
            )}>
              JURNİ
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-16">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "transition-all text-[10px] uppercase font-bold tracking-[0.5em] relative group",
                  isScrolled ? "text-pearl/60 hover:text-champagne" : "text-pearl/80 hover:text-pearl"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-3 left-0 w-0 h-[1px] transition-all duration-700 group-hover:w-full",
                  isScrolled ? "bg-champagne" : "bg-pearl"
                )} />
              </a>
            ))}
            
            <div className={cn(
              "h-8 w-[1px] mx-4 transition-all duration-700",
              isScrolled ? "bg-pearl/10" : "bg-pearl/20"
            )} />
            
            <Button 
              onClick={onAuthClick} 
              size="sm" 
              variant={isScrolled ? "primary" : "outline"}
              className={cn(
                "px-12 py-5 rounded-2xl text-[10px] uppercase font-bold tracking-[0.4em] transition-all duration-700 shadow-xl hover:scale-105 active:scale-95",
                !isScrolled && "border-pearl/30 text-pearl hover:bg-pearl hover:text-midnight"
              )}
            >
              Join Jurni
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={cn(
              "lg:hidden h-14 w-14 flex items-center justify-center rounded-2xl transition-all duration-500 shadow-xl",
              isScrolled 
                ? "text-champagne bg-pearl/5 border border-pearl/10" 
                : "text-pearl bg-white/10 border border-white/20 backdrop-blur-md"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-[100] bg-midnight flex flex-col p-8 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-16">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-2xl font-serif font-bold text-champagne tracking-[0.2em]">
                  JURNİ
                </span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-pearl h-12 w-12 flex items-center justify-center border border-pearl/10 rounded-2xl bg-pearl/5 backdrop-blur-md shadow-xl"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-pearl/80 text-3xl uppercase tracking-[0.2em] font-bold hover:text-champagne transition-colors font-serif border-b border-pearl/5 pb-6"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-16">
              <Button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onAuthClick();
                }} 
                className="w-full py-6 text-[10px] font-bold uppercase tracking-[0.4em] bg-champagne text-midnight rounded-2xl shadow-2xl shadow-champagne/10"
              >
                Join Jurni
              </Button>
              <p className="text-center text-pearl/20 text-[9px] uppercase tracking-[0.5em] mt-8 font-bold">
                The Pinnacle of Luxury Travel
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
