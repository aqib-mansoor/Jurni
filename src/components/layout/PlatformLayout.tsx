import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { PlatformNavbar } from './PlatformNavbar';
import { Home, Search, Calendar, Heart, User, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { SupportModal } from '../ui/SupportModal';
import { ScrollToTop } from '../ui/ScrollToTop';
import { NetworkStatus } from '../ui/NetworkStatus';
import { ConciergeModal } from '../platform/ConciergeModal';

import { useSearch } from '../../context/SearchContext';

export const PlatformLayout = () => {
  const location = useLocation();
  const { isSearchModalOpen, openSearch, setSearchModalOpen } = useSearch();
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const bottomNavItems = [
    { name: 'Explore', icon: Home, path: '/platform/explore' },
    { name: 'Search', icon: Search, onClick: openSearch },
    { name: 'Bookings', icon: Calendar, path: '/platform/bookings' },
    { name: 'Wishlist', icon: Heart, path: '/platform/wishlist' },
    { name: 'Profile', icon: User, path: '/platform/profile' },
  ];

  return (
    <div className="min-h-screen bg-pearl flex flex-col pb-24 lg:pb-0">
      <ScrollToTop />
      <NetworkStatus />
      <PlatformNavbar onSearchClick={openSearch} isSearchModalOpen={isSearchModalOpen} setIsSearchModalOpen={setSearchModalOpen} />
      
      <main className="flex-1 w-full pt-0 md:pt-24">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation - 5 Items, Luxurious Design */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-pearl/80 backdrop-blur-2xl border-t border-midnight/5 px-6 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] z-50 shadow-[0_-10px_40px_rgba(25,42,86,0.08)]">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {bottomNavItems.map((item) => {
            const isActive = item.path ? location.pathname === item.path : false;
            const Icon = item.icon;
            
            const content = (
              <motion.div 
                className="flex flex-col items-center gap-1.5"
                whileTap={{ scale: 0.9 }}
              >
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                  isActive ? "bg-midnight text-champagne shadow-lg shadow-midnight/20 rotate-3" : "text-midnight/30"
                )}>
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-500",
                  isActive ? "text-midnight" : "text-midnight/30"
                )}>
                  {item.name}
                </span>
              </motion.div>
            );

            if (item.onClick) {
              return (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="relative group"
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.path!}
                className="relative group"
              >
                {content}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Concierge Button */}
      <div className="fixed bottom-32 lg:bottom-12 right-8 lg:right-12 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsConciergeOpen(true)}
          className="h-16 w-16 rounded-2xl bg-midnight text-champagne shadow-2xl flex items-center justify-center hover:bg-midnight/90 transition-all border-2 border-pearl/10 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-midnight via-midnight to-midnight/80" />
          <div className="absolute -inset-2 bg-champagne/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Sparkles size={28} className="relative z-10 group-hover:rotate-12 transition-transform duration-500" />
        </motion.button>
      </div>

      <ConciergeModal 
        isOpen={isConciergeOpen} 
        onClose={() => setIsConciergeOpen(false)} 
      />

      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </div>
  );
};
