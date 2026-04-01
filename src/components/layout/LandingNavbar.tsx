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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-4 sm:px-8',
        isScrolled 
          ? 'bg-midnight/95 backdrop-blur-xl py-3 sm:py-5 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-b border-pearl/10' 
          : 'py-4 sm:py-8 bg-transparent'
      )}>
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-4 group">
            <div className="h-7 w-7 sm:h-10 sm:w-10 bg-champagne rounded-none flex items-center justify-center text-midnight font-serif text-lg sm:text-2xl font-bold group-hover:scale-110 transition-transform duration-500">
              J
            </div>
            <span className="text-lg sm:text-3xl font-serif font-bold text-pearl tracking-[0.15em] sm:tracking-[0.3em] group-hover:text-champagne transition-colors duration-500">
              JURNI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-pearl/50 hover:text-champagne transition-all text-[10px] uppercase font-bold tracking-[0.4em] relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-champagne transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
            
            <div className="h-6 w-[1px] bg-pearl/10 mx-4" />
            
            <button
              onClick={onAuthClick}
              className="text-pearl/50 hover:text-champagne transition-all text-[10px] uppercase font-bold tracking-[0.4em]"
            >
              Sign In
            </button>
            
            <Button 
              onClick={onAuthClick} 
              size="sm" 
              className="bg-champagne text-midnight hover:bg-pearl hover:text-midnight transition-all duration-500 px-10 py-4 rounded-none text-[10px] uppercase font-bold tracking-[0.3em] border-none shadow-lg shadow-champagne/10"
            >
              Join Jurni
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-pearl h-10 w-10 flex items-center justify-center border border-pearl/10 rounded-full hover:border-champagne transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Moved outside nav for better z-index and background handling */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-[100] bg-midnight flex flex-col p-6 sm:p-12 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-12">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="h-8 w-8 bg-champagne flex items-center justify-center text-midnight font-serif text-xl font-bold">
                  J
                </div>
                <span className="text-xl font-serif font-bold text-pearl tracking-[0.2em]">
                  JURNI
                </span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-pearl h-10 w-10 flex items-center justify-center border border-pearl/10 rounded-full bg-pearl/5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-pearl/90 text-2xl sm:text-3xl uppercase tracking-[0.15em] font-bold hover:text-champagne transition-colors font-serif border-b border-pearl/5 pb-4"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-12">
              <Button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onAuthClick();
                }} 
                className="w-full bg-champagne text-midnight rounded-none py-6 uppercase tracking-[0.2em] font-bold text-xs shadow-2xl"
              >
                Join Jurni
              </Button>
              <p className="text-center text-pearl/30 text-[8px] uppercase tracking-[0.4em] mt-6 font-bold">
                The Pinnacle of Luxury Travel
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
