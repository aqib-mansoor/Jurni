import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Search, MapPin, Calendar, Users, X, Compass, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularDestinations = [
  { name: 'Maldives', region: 'South Asia', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=400&q=80' },
  { name: 'Santorini', region: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80' },
  { name: 'Kyoto', region: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80' },
  { name: 'Amalfi Coast', region: 'Italy', image: 'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b?auto=format&fit=crop&w=400&q=80' },
];

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [destination, setDestination] = useState('');
  const [activeTab, setActiveTab] = useState<'destination' | 'dates' | 'guests'>('destination');

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      maxWidth="max-w-4xl"
      className="bg-ivory/95 backdrop-blur-3xl border-none p-0 overflow-visible"
    >
      <div className="relative">
        {/* Search Header */}
        <div className="p-8 sm:p-12 space-y-10">
          <div className="space-y-4">
            <span className="text-terracotta font-bold text-[10px] tracking-[0.5em] uppercase block">Global Search</span>
            <h2 className="text-4xl sm:text-5xl font-serif text-charcoal tracking-tight">Where to <span className="italic font-light">Next?</span></h2>
          </div>

          <div className="bg-white rounded-[40px] shadow-2xl shadow-charcoal/5 border border-ivory/50 p-3 flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ivory/50">
              <button 
                onClick={() => setActiveTab('destination')}
                className={cn(
                  "flex items-center gap-4 px-8 py-5 transition-all duration-500 text-left rounded-3xl md:rounded-none",
                  activeTab === 'destination' ? "bg-ivory/50 shadow-inner" : "hover:bg-ivory/20"
                )}
              >
                <MapPin className={cn("transition-colors", activeTab === 'destination' ? "text-amber" : "text-charcoal/20")} size={22} />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal/30">Destination</p>
                  <input 
                    type="text"
                    placeholder="Search destinations"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="bg-transparent border-none p-0 text-charcoal font-serif text-lg placeholder:text-charcoal/20 focus:ring-0 w-full"
                    autoFocus
                  />
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('dates')}
                className={cn(
                  "flex items-center gap-4 px-8 py-5 transition-all duration-500 text-left rounded-3xl md:rounded-none",
                  activeTab === 'dates' ? "bg-ivory/50 shadow-inner" : "hover:bg-ivory/20"
                )}
              >
                <Calendar className={cn("transition-colors", activeTab === 'dates' ? "text-amber" : "text-charcoal/20")} size={22} />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal/30">Travel Dates</p>
                  <p className="text-lg font-serif text-charcoal/40">Add dates</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveTab('guests')}
                className={cn(
                  "flex items-center gap-4 px-8 py-5 transition-all duration-500 text-left rounded-3xl md:rounded-none",
                  activeTab === 'guests' ? "bg-ivory/50 shadow-inner" : "hover:bg-ivory/20"
                )}
              >
                <Users className={cn("transition-colors", activeTab === 'guests' ? "text-amber" : "text-charcoal/20")} size={22} />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal/30">Guests</p>
                  <p className="text-lg font-serif text-charcoal/40">Add guests</p>
                </div>
              </button>
            </div>

            <Button className="w-full md:w-auto bg-charcoal text-amber hover:bg-charcoal/90 rounded-[28px] px-12 py-6 text-xs font-bold uppercase tracking-widest shadow-xl shadow-charcoal/20 flex items-center justify-center gap-3">
              <Search size={18} />
              Search
            </Button>
          </div>
        </div>

        {/* Search Content */}
        <div className="px-8 sm:px-12 pb-12 space-y-12">
          <AnimatePresence mode="wait">
            {activeTab === 'destination' && (
              <motion.div
                key="destination-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-charcoal/30 flex items-center gap-3">
                    <TrendingUp size={14} /> Popular Escapes
                  </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {popularDestinations.map((dest) => (
                    <button 
                      key={dest.name}
                      className="group text-left space-y-4"
                    >
                      <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-xl shadow-charcoal/5 group-hover:shadow-2xl group-hover:shadow-charcoal/10 transition-all duration-700 relative">
                        <img 
                          src={dest.image} 
                          alt={dest.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </div>
                      <div className="px-2">
                        <p className="text-lg font-serif text-charcoal group-hover:text-amber transition-colors">{dest.name}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal/30">{dest.region}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'dates' && (
              <motion.div
                key="dates-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-64 flex flex-col items-center justify-center text-center space-y-6 bg-white/50 rounded-[40px] border border-dashed border-ivory/50"
              >
                <Calendar size={48} className="text-charcoal/10" />
                <p className="text-charcoal/40 font-serif text-xl italic">Calendar integration coming soon to your portal.</p>
              </motion.div>
            )}

            {activeTab === 'guests' && (
              <motion.div
                key="guests-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-64 flex flex-col items-center justify-center text-center space-y-6 bg-white/50 rounded-[40px] border border-dashed border-ivory/50"
              >
                <Users size={48} className="text-charcoal/10" />
                <p className="text-charcoal/40 font-serif text-xl italic">Guest selection coming soon to your portal.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-8 border-t border-charcoal/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-amber/10 flex items-center justify-center text-amber">
                <Sparkles size={18} />
              </div>
              <p className="text-sm font-medium text-charcoal/60">Need inspiration? Try our <span className="text-charcoal font-bold underline decoration-amber decoration-2 underline-offset-4 cursor-pointer">Elite Concierge</span></p>
            </div>
            <button 
              onClick={onClose}
              className="text-[10px] font-bold uppercase tracking-widest text-charcoal/30 hover:text-charcoal transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
