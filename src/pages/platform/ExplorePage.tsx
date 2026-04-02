import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { Listing, ListingType } from '../../types';
import { ListingCard } from '../../components/ui/ListingCard';
import { Button } from '../../components/ui/Button';
import { ListingSkeleton } from '../../components/ui/SkeletonLoader';
import { Search, Hotel, Plane, Train, Tent, Sparkles, Compass, Palmtree } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { motion, AnimatePresence } from 'motion/react';
import { useSearch } from '../../context/SearchContext';

import { SearchBar } from '../../components/ui/SearchBar';

export const ExplorePage = () => {
  const { user, toggleWishlist } = useJurniAuth();
  const { openSearch } = useSearch();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const [activeCategory, setActiveCategory] = useState<ListingType | 'all'>('all');

  const fetchAllListings = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'listings'), orderBy('rating', 'desc'));
      const snap = await getDocs(q);
      const allListings = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Listing));
      
      const seen = new Set();
      const uniqueListings = allListings.filter(item => {
        const identifier = `${item.title}-${item.images[0]}`;
        if (seen.has(identifier)) return false;
        seen.add(identifier);
        return true;
      });

      setListings(uniqueListings);
      setFeaturedListings(uniqueListings.slice(0, 3)); // Featured for You (3 items)
    } catch (err) {
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllListings();
  }, [fetchAllListings]);

  useEffect(() => {
    let filtered = [...listings];
    const seen = new Set();
    filtered = filtered.filter(item => {
      const identifier = `${item.title}-${item.images[0]}`;
      if (seen.has(identifier)) return false;
      seen.add(identifier);
      return true;
    });
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(l => l.type === activeCategory);
    }
    
    setFeaturedListings(filtered.slice(0, 3));
  }, [activeCategory, listings]);

  const categories = [
    { name: 'All', value: 'all', icon: Compass },
    { name: 'Hotels', value: 'hotel', icon: Hotel },
    { name: 'Villas', value: 'villa', icon: Palmtree },
    { name: 'Flights', value: 'flight', icon: Plane },
    { name: 'Trains', value: 'train', icon: Train },
    { name: 'Adventures', value: 'adventure', icon: Tent },
  ];

  const trendingDestinations = [
    { name: 'Amalfi Coast', country: 'Italy', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800' },
    { name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800' },
    { name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800' },
    { name: 'Maldives', country: 'South Asia', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="bg-pearl min-h-screen pb-24">
      {/* Header Section */}
      <header className="px-6 pt-10 pb-6 space-y-6" data-aos="fade-down">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-px w-6 bg-rose/30" />
              <span className="text-rose font-bold text-[9px] tracking-[0.4em] uppercase block">Elite Portal</span>
            </div>
            <h1 className="text-4xl font-serif text-midnight tracking-tight leading-tight">
              Welcome, <span className="italic">{user?.displayName?.split(' ')[0] || 'Traveler'}</span>
            </h1>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-midnight/5 border border-midnight/5 flex items-center justify-center overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-midnight/5 group-hover:bg-transparent transition-colors" />
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="text-midnight/20 font-serif text-2xl">J</div>
            )}
          </div>
        </div>
        
        <p className="text-[11px] text-midnight/40 font-medium leading-relaxed italic max-w-[300px] border-l-2 border-champagne/30 pl-4">
          "The world is a book, and those who do not travel read only one page."
        </p>
      </header>

      {/* Category Navigation */}
      <section className="mb-10">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar px-6 pb-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value as any)}
                className={cn(
                  "flex items-center gap-3 px-6 py-3.5 rounded-xl transition-all duration-500 border whitespace-nowrap group",
                  isActive 
                    ? "bg-midnight text-champagne border-midnight shadow-2xl shadow-midnight/20" 
                    : "bg-white text-midnight/40 border-midnight/5 hover:border-champagne/40 hover:text-midnight"
                )}
              >
                <Icon size={14} className={cn("transition-transform group-hover:scale-110", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured for You */}
      <section className="px-6 mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-serif text-midnight tracking-tight">Curated for You</h2>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-midnight/20">Based on your elite preferences</p>
          </div>
          <Link to="/platform/explore" className="text-[9px] font-bold text-champagne uppercase tracking-[0.3em] hover:text-midnight transition-colors">View All</Link>
        </div>
        <div className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <motion.div key={`skeleton-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ListingSkeleton />
                </motion.div>
              ))
            ) : (
              featuredListings.map((listing, index) => (
                <ListingCard key={listing.id} listing={listing} index={index} />
              ))
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="px-4 mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif text-midnight">Trending Destinations</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {trendingDestinations.map((dest, index) => (
            <motion.div 
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative h-48 rounded-[20px] overflow-hidden shadow-card group"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-champagne text-[8px] font-bold uppercase tracking-widest mb-0.5">{dest.country}</p>
                <h3 className="text-sm font-serif text-pearl tracking-tight">{dest.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};


