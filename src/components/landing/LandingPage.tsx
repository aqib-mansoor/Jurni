import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import { TrustSignals } from './TrustSignals';
import { FeaturesSection as ValueProposition } from './FeaturesSection';
import { DestinationShowcase } from './DestinationShowcase';
import { ExperiencePreview } from './ExperiencePreview';
import { HowItWorks } from './HowItWorks';
import { TestimonialsSection } from './TestimonialsSection';
import { FAQSection } from './FAQSection';
import { FinalCTA } from './FinalCTA';
import { Footer } from '../layout/Footer';

export const LandingPage = ({ onAuthClick }: { onAuthClick?: () => void }) => {
  const context = useOutletContext<{ onAuthClick: () => void }>();
  const handleAuthClick = onAuthClick || context?.onAuthClick || (() => {});

  return (
    <div className="bg-pearl selection:bg-champagne selection:text-midnight">
      <HeroSection onAuthClick={handleAuthClick} />
      <TrustSignals />
      <ValueProposition />
      <DestinationShowcase />
      <ExperiencePreview />
      <HowItWorks />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};
