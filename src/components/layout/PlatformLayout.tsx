import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { PlatformNavbar } from './PlatformNavbar';
import { Home, Search, Calendar, Heart, User, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { SupportModal } from '../ui/SupportModal';
import { ScrollToTop } from '../ui/ScrollToTop';
import { NetworkStatus } from '../ui/NetworkStatus';

import { useSearch } from '../../context/SearchContext';

export const PlatformLayout = () => {
  const location = useLocation();
  const { isSearchModalOpen, openSearch, setSearchModalOpen } = useSearch();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const bottomNavItems = [
    { name: 'Explore', icon: Home, path: '/platform/explore' },
    { name: 'Bookings', icon: Calendar, path: '/platform/bookings' },
    { name: 'Wishlist', icon: Heart, path: '/platform/wishlist' },
    { name: 'Profile', icon: User, path: '/platform/profile', isProfile: true },
  ];

  return (
    <div className="min-h-screen bg-pearl flex flex-col pb-20 lg:pb-0">
      <ScrollToTop />
      <NetworkStatus />
      <PlatformNavbar onSearchClick={openSearch} isSearchModalOpen={isSearchModalOpen} setIsSearchModalOpen={setSearchModalOpen} />
      
      <main className="flex-1 w-full pt-20">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-midnight border-t border-pearl/10 px-6 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] z-50">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {bottomNavItems.map((item) => {
            const isActive = item.path ? location.pathname === item.path : false;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.path!}
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors",
                  isActive ? "text-champagne" : "text-pearl/50"
                )}
              >
                <Icon size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Concierge Chat Button (Dusty Rose) */}
      <div className="fixed bottom-24 lg:bottom-8 right-8 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-20 right-0 w-80 bg-pearl rounded-none shadow-2xl border border-midnight/10 overflow-hidden"
            >
              <div className="bg-rose p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                  <span className="text-white text-sm font-serif font-bold tracking-wider">Concierge Online</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-white opacity-70 hover:opacity-100 transition-opacity">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs text-midnight/70 leading-relaxed font-medium">
                  Welcome back to Jurni. Our luxury travel experts are standing by to curate your next extraordinary experience.
                </p>
                <button 
                  onClick={() => {
                    setIsChatOpen(false);
                    setIsSupportModalOpen(true);
                  }}
                  className="w-full py-3 bg-midnight text-champagne text-[10px] font-bold uppercase tracking-[0.2em] rounded-none hover:bg-midnight/90 transition-all shadow-lg"
                >
                  Speak with Concierge
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="h-16 w-16 rounded-full bg-rose text-white shadow-2xl flex items-center justify-center hover:bg-rose/90 transition-all border-2 border-white/20"
        >
          <MessageCircle size={28} />
        </motion.button>
      </div>

      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </div>
  );
};
