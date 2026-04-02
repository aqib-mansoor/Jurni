import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import { FeaturesSection as ValueProposition } from './FeaturesSection';
import { DestinationShowcase } from './DestinationShowcase';
import { AboutSection } from './AboutSection';
import { TestimonialsSection } from './TestimonialsSection';
import { FAQSection } from './FAQSection';
import { LandingFooter as Footer } from './LandingFooter';

export const LandingPage = ({ onAuthClick }: { onAuthClick?: () => void }) => {
  const context = useOutletContext<{ onAuthClick: () => void }>();
  const handleAuthClick = onAuthClick || context?.onAuthClick || (() => {});

  return (
    <div className="bg-pearl selection:bg-champagne selection:text-midnight overflow-hidden">
      <HeroSection onAuthClick={handleAuthClick} />
      <ValueProposition />
      <DestinationShowcase />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};
