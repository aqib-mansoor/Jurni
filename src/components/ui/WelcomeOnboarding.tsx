import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

interface WelcomeOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const slides = [
  {
    title: "Welcome to JURNİ",
    description: "Your gateway to the world's most extraordinary travel experiences. Curated for the discerning traveler.",
    icon: Compass,
    color: "bg-midnight",
    iconColor: "text-champagne"
  },
  {
    title: "Curated Excellence",
    description: "Every listing is hand-picked and verified to meet our luxury standards. From private villas to wellness retreats.",
    icon: Sparkles,
    color: "bg-champagne",
    iconColor: "text-midnight"
  },
  {
    title: "Secure & Seamless",
    description: "Experience peace of mind with our secure payment systems and dedicated 24/7 concierge support.",
    icon: ShieldCheck,
    color: "bg-midnight",
    iconColor: "text-champagne"
  }
];

export const WelcomeOnboarding = ({ isOpen, onClose, userName }: WelcomeOnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      onClose();
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentSlide(prev => prev - 1);
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <div className="relative h-[450px] flex flex-col items-center justify-center text-center p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className={cn("p-8 rounded-full mb-8 shadow-2xl", slide.color)}>
              <Icon className={cn("h-16 w-16", slide.iconColor)} />
            </div>
            
            <h2 className="text-3xl font-serif text-midnight mb-4">
              {currentSlide === 0 && userName ? `Welcome, ${userName}` : slide.title}
            </h2>
            
            <p className="text-midnight opacity-60 leading-relaxed max-w-xs mb-12">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === currentSlide ? "w-8 bg-champagne" : "w-1.5 bg-midnight opacity-10"
                )}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {currentSlide > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                className="h-10 w-10 p-0 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="primary"
              onClick={handleNext}
              className="h-10 px-6 rounded-full flex items-center gap-2"
            >
              {currentSlide === slides.length - 1 ? "Start Exploring" : "Next"}
              {currentSlide < slides.length - 1 && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
