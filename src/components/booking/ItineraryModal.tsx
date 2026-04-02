import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Download, Share2, MapPin, Calendar, Clock, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Booking, Listing } from '../../types';
import { formatPrice } from '../../lib/utils';
import { format } from 'date-fns';

interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking & { listing?: Listing };
}

export const ItineraryModal = ({ isOpen, onClose, booking }: ItineraryModalProps) => {
  if (!booking.listing) return null;

  const itinerarySteps = [
    { time: '09:00 AM', title: 'Private Chauffeur Arrival', description: 'Your dedicated driver will arrive at your residence in a premium sedan.' },
    { time: '11:30 AM', title: 'VIP Lounge Access', description: 'Relax in the exclusive Jurni lounge with complimentary refreshments.' },
    { time: '02:00 PM', title: 'Masterpiece Check-in', description: 'Priority check-in at your destination with a personal welcome amenity.' },
    { time: '07:00 PM', title: 'Curated Welcome Dinner', description: 'A bespoke 5-course tasting menu prepared by the executive chef.' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl" className="p-0 overflow-hidden">
      <div className="bg-pearl flex flex-col max-h-[90vh]">
        {/* Header - Cinematic */}
        <header className="relative h-64 overflow-hidden">
          <img 
            src={booking.listing.images[0]} 
            alt={booking.listing.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
          
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-pearl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-champagne text-midnight px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-xl">
                Confirmed Journey
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-pearl/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">ID: {booking.id.slice(0, 8)}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif leading-tight tracking-tight">{booking.listing.title}</h2>
            <div className="flex items-center gap-2 text-champagne mt-2">
              <MapPin size={16} />
              <span className="text-sm font-medium">{booking.listing.location}</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="absolute top-6 right-6 h-10 w-10 rounded-full bg-midnight/40 backdrop-blur-md border border-pearl/20 text-pearl flex items-center justify-center hover:bg-midnight transition-all"
          >
            <Clock size={20} />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12 no-scrollbar">
          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-6 py-8 border-y border-midnight/5">
            <div className="text-center space-y-1">
              <p className="text-[9px] text-midnight/30 uppercase tracking-widest font-bold">Departure</p>
              <p className="text-sm font-bold text-midnight">{format(new Date(booking.dates.start), 'MMM dd, yyyy')}</p>
            </div>
            <div className="text-center space-y-1 border-x border-midnight/5">
              <p className="text-[9px] text-midnight/30 uppercase tracking-widest font-bold">Guests</p>
              <p className="text-sm font-bold text-midnight">{(booking.guests?.adults || 0) + (booking.guests?.children || 0)} Explorers</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-[9px] text-midnight/30 uppercase tracking-widest font-bold">Total</p>
              <p className="text-sm font-bold text-midnight">{formatPrice(booking.totalPrice)}</p>
            </div>
          </div>

          {/* Timeline */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif text-midnight">Your Masterpiece Timeline</h3>
              <span className="text-[10px] text-champagne font-bold uppercase tracking-widest">Day 01</span>
            </div>
            
            <div className="space-y-10 relative">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-midnight/5" />
              
              {itinerarySteps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-12 group"
                >
                  <div className="absolute left-3 top-1.5 h-2 w-2 rounded-full bg-champagne border-4 border-pearl ring-1 ring-midnight/5 group-hover:scale-150 transition-transform" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-champagne uppercase tracking-widest">{step.time}</span>
                    <h4 className="text-lg font-serif text-midnight group-hover:text-champagne transition-colors">{step.title}</h4>
                    <p className="text-sm text-midnight/50 font-light leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Perks */}
          <section className="bg-midnight/[0.02] p-8 rounded-[32px] border border-midnight/5 space-y-6">
            <div className="flex items-center gap-3 text-midnight">
              <Star size={20} className="text-champagne fill-current" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Exclusive Perks</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['VIP Lounge', 'Early Check-in', 'Chef\'s Table', 'Spa Credit'].map(perk => (
                <div key={perk} className="flex items-center gap-2 text-xs text-midnight/60">
                  <CheckCircle2 size={14} className="text-green-500" />
                  {perk}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer - Actions */}
        <footer className="p-8 bg-pearl border-t border-midnight/5 flex gap-4">
          <Button variant="outline" className="flex-1 rounded-2xl py-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold border-midnight/10 hover:border-champagne">
            <Share2 size={16} />
            Share Itinerary
          </Button>
          <Button className="flex-1 rounded-2xl py-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold bg-midnight text-pearl hover:bg-midnight/90 shadow-xl shadow-midnight/20">
            <Download size={16} />
            Download PDF
          </Button>
        </footer>
      </div>
    </Modal>
  );
};
