import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import { LandingNavbar } from './LandingNavbar';
import { PlatformNavbar } from './PlatformNavbar';
import { Footer } from './Footer';
import { LandingPage } from '../landing/LandingPage';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { LoginModal } from '../auth/LoginModal';
import { SupportModal } from '../ui/SupportModal';
import { motion, AnimatePresence } from 'motion/react';

export const RootLayout = () => {
  const { user, loading } = useJurniAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useScrollAnimation();

  useEffect(() => {
    if (!loading && user && location.pathname === '/') {
      navigate('/platform/explore', { replace: true });
    }
  }, [user, loading, location.pathname, navigate]);

  if (loading || (user && location.pathname === '/')) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="h-16 w-16 border-4 border-champagne border-t-transparent rounded-full animate-spin" />
          <p className="text-champagne font-serif text-xl tracking-[0.3em] animate-pulse uppercase">Jurni</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar onAuthClick={() => setIsAuthModalOpen(true)} />

      <main className="flex-1">
        <Outlet context={{ onAuthClick: () => setIsAuthModalOpen(true) }} />
      </main>

      <Footer />

      {/* Floating Support Button - Only for Landing */}
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-20 right-0 w-72 bg-white rounded-sm shadow-2xl border border-midnight border-opacity-10 overflow-hidden"
            >
              <div className="bg-midnight p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-champagne rounded-full animate-pulse" />
                  <span className="text-pearl text-sm font-serif">Concierge Online</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-pearl opacity-50 hover:opacity-100 transition-opacity">
                  <X size={16} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs text-midnight opacity-70 leading-relaxed">
                  Welcome to Jurni. How can our luxury travel experts assist you today?
                </p>
                <button 
                  onClick={() => {
                    setIsChatOpen(false);
                    setIsSupportModalOpen(true);
                  }}
                  className="w-full py-2.5 bg-midnight text-champagne text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-opacity-90 transition-all"
                >
                  Contact Support
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="h-16 w-16 rounded-full bg-midnight text-champagne shadow-2xl flex items-center justify-center hover:bg-opacity-90 transition-all border-2 border-champagne border-opacity-20"
        >
          <MessageCircle size={28} />
        </motion.button>
      </div>

      {/* Auth Modal */}
      <LoginModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Support Modal */}
      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </div>
  );
};
