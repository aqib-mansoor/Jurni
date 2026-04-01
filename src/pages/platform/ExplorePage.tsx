import React, { useState, useEffect, useCallback } from 'react';
import { collection, query, getDocs, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { Listing, ListingType } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ListingSkeleton } from '../../components/ui/SkeletonLoader';
import { Search, MapPin, Star, Plane, Train, Hotel, Tent, Heart, Sparkles, Clock, TrendingUp, Compass, Palmtree } from 'lucide-react';
import { formatPrice, cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { motion, AnimatePresence } from 'motion/react';

import { useSearch } from '../../context/SearchContext';

export const ExplorePage = () => {
  const { user, toggleWishlist } = useJurniAuth();
  const { openSearch } = useSearch();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const [recentViews, setRecentViews] = useState<Listing[]>([]);
  const [exclusiveOffers, setExclusiveOffers] = useState<Listing[]>([]);
  const [activeCategory, setActiveCategory] = useState<ListingType | 'all'>('all');

  const fetchAllListings = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'listings'), orderBy('rating', 'desc'));
      const snap = await getDocs(q);
      const allListings = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Listing));
      
      // Ensure uniqueness in the base listings as well
      const seen = new Set();
      const uniqueListings = allListings.filter(item => {
        const identifier = `${item.title}-${item.images[0]}`;
        if (seen.has(identifier)) return false;
        seen.add(identifier);
        return true;
      });

      setListings(uniqueListings);
      
      // Initial featured (all)
      setFeaturedListings(uniqueListings.slice(0, 8));
      
      // Offers (first 3)
      setExclusiveOffers(uniqueListings.slice(0, 3));
      
      // Recent (last 4 for demo)
      setRecentViews(uniqueListings.slice(-4));
    } catch (err) {
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllListings();
  }, [fetchAllListings]);

  // Filter listings based on category and search query
  useEffect(() => {
    let filtered = [...listings];
    
    // Ensure uniqueness by title and first image to avoid duplicates from multiple seedings
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
    
    setFeaturedListings(filtered);
  }, [activeCategory, listings]);

  const categories = [
    { name: 'All', value: 'all', icon: Compass },
    { name: 'Hotels', value: 'hotel', icon: Hotel },
    { name: 'Villas', value: 'villa', icon: Palmtree },
    { name: 'Flights', value: 'flight', icon: Plane },
    { name: 'Trains', value: 'train', icon: Train },
    { name: 'Adventures', value: 'adventure', icon: Tent },
    { name: 'Wellness', value: 'wellness', icon: Sparkles },
  ];

  const trendingDestinations = [
    { name: 'Amalfi Coast', country: 'Italy', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800' },
    { name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800' },
    { name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800' },
    { name: 'Maldives', country: 'South Asia', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-screen w-full flex flex-col justify-center items-center px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            poster="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2560&q=80"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-a-pool-and-palm-trees-1122-large.mp4" type="video/mp4" />
          </video>
          {/* Layered Gradients for Depth */}
          <div className="absolute inset-0 bg-midnight/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-transparent to-pearl" />
        </div>

        <div className="relative z-10 max-w-6xl w-full text-center space-y-10 md:space-y-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 md:space-y-10"
          >
            <span className="text-champagne font-mono text-[10px] md:text-sm tracking-[0.5em] md:tracking-[0.8em] uppercase block font-bold">Elite Travel Curators</span>
            <h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-serif text-white leading-[0.9] md:leading-[0.8] tracking-tighter">
              The Art of <br />
              <span className="italic font-light text-champagne">Exceptional</span> Travel
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="max-w-2xl mx-auto w-full px-4"
          >
            <button 
              onClick={openSearch}
              className="w-full bg-white/10 backdrop-blur-3xl border border-white/20 p-4 md:p-6 rounded-full shadow-2xl flex items-center justify-between group hover:bg-white/20 transition-all duration-700"
            >
              <div className="flex items-center gap-4 md:gap-8 px-4">
                <Search className="text-champagne" size={24} />
                <span className="text-white/60 text-base md:text-2xl font-serif italic">Where would you like to escape?</span>
              </div>
              <div className="h-12 w-12 md:h-16 md:w-16 bg-champagne rounded-full flex items-center justify-center text-midnight group-hover:scale-110 transition-transform duration-500">
                <Compass size={24} className="animate-spin-slow" />
              </div>
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="hidden sm:flex justify-center gap-8 md:gap-16 pt-8 md:pt-12"
          >
            <div className="text-center">
              <p className="text-white text-2xl md:text-3xl font-serif">24/7</p>
              <p className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-widest mt-1">Personal Concierge</p>
            </div>
            <div className="text-center">
              <p className="text-white text-2xl md:text-3xl font-serif">100%</p>
              <p className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-widest mt-1">Verified Luxury</p>
            </div>
            <div className="text-center">
              <p className="text-white text-2xl md:text-3xl font-serif">50+</p>
              <p className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-widest mt-1">Global Regions</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4"
        >
          <span className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-[0.3em] vertical-rl">Scroll</span>
          <div className="w-px h-8 md:h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* Sophisticated Category Navigation */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="space-y-2 md:space-y-4">
            <span className="text-champagne font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase block">Curated Collections</span>
            <h2 className="text-3xl md:text-6xl font-serif text-midnight leading-tight">
              Explore by <br /><span className="italic font-light">Category</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value as any)}
                  className={cn(
                    "group flex items-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-5 rounded-full transition-all duration-500 border whitespace-nowrap",
                    isActive 
                      ? "bg-midnight text-champagne border-midnight shadow-lg -translate-y-0.5" 
                      : "bg-white text-midnight/40 border-midnight/10 hover:border-champagne/40 hover:text-midnight"
                  )}
                >
                  <Icon size={16} strokeWidth={1.5} className={cn("transition-transform duration-500", isActive ? "scale-110" : "group-hover:scale-110")} />
                  <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Listings Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10">
          <AnimatePresence mode="popLayout">
            {loading ? (
              [...Array(8)].map((_, i) => (
                <motion.div 
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ListingSkeleton />
                </motion.div>
              ))
            ) : (
              featuredListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/platform/listing/${listing.id}`} className="group block h-full">
                    <div className="relative aspect-[4/5] rounded-2xl md:rounded-[2.5rem] overflow-hidden mb-3 md:mb-6 shadow-sm group-hover:shadow-xl transition-all duration-700">
                      <img 
                        src={listing.images[0]} 
                        alt={listing.title} 
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                      
                      {/* Price Tag Overlay */}
                      <div className="absolute top-2 md:top-6 left-2 md:left-6 bg-white/95 backdrop-blur-md px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-2xl shadow-lg">
                        <p className="text-midnight font-bold text-xs md:text-lg">{formatPrice(listing.price)}</p>
                        <p className="text-midnight/40 text-[6px] md:text-[8px] uppercase tracking-widest font-bold">per night</p>
                      </div>

                      {/* Rating Overlay */}
                      <div className="absolute top-2 md:top-6 right-2 md:right-6 h-8 w-8 md:h-12 md:w-12 bg-midnight/30 backdrop-blur-md border border-white/10 rounded-full flex flex-col items-center justify-center text-white">
                        <Star size={10} className="text-champagne fill-current mb-0.5" />
                        <span className="text-[8px] md:text-[10px] font-bold">{listing.rating}</span>
                      </div>

                      {/* Wishlist Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(listing.id);
                        }}
                        className={cn(
                          "absolute bottom-2 md:bottom-6 right-2 md:right-6 h-8 w-8 md:h-12 md:w-12 rounded-full backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-500",
                          user?.wishlist?.includes(listing.id) 
                            ? "bg-rose text-white border-rose" 
                            : "bg-midnight/30 text-white hover:bg-rose hover:border-rose"
                        )}
                      >
                        <Heart size={14} className={cn("md:size-5 transition-all", user?.wishlist?.includes(listing.id) ? "fill-current" : "")} />
                      </button>

                      <div className="absolute bottom-3 md:bottom-8 left-3 md:left-8 right-3 md:right-8">
                        <div className="flex items-center gap-1 text-champagne text-[7px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mb-1 md:mb-2">
                          <MapPin size={8} />
                          {listing.location}
                        </div>
                        <h3 className="text-sm md:text-2xl font-serif text-white leading-tight group-hover:text-champagne transition-colors duration-500 line-clamp-1">{listing.title}</h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        
        {!loading && featuredListings.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-pearl/50 rounded-[4rem] border border-dashed border-midnight/10"
          >
            <Compass size={64} className="mx-auto text-midnight/10 mb-6" />
            <h3 className="text-3xl font-serif text-midnight mb-4">No matches found</h3>
            <p className="text-midnight/40 max-w-md mx-auto font-light">We couldn't find any extraordinary stays matching your current filters. Try broadening your search or exploring a different category.</p>
            <Button 
              variant="outline" 
              className="mt-10 rounded-2xl px-12 py-6 border-midnight/10 text-midnight hover:bg-midnight hover:text-champagne transition-all"
              onClick={() => {
                setActiveCategory('all');
              }}
            >
              Reset All Filters
            </Button>
          </motion.div>
        )}
      </section>

      {/* Trending Destinations - Luxury Grid */}
      <section className="bg-midnight py-20 md:py-32 px-4 md:px-6 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-4 space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <span className="text-champagne font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase block">Global Hotspots</span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-tight">
                  Trending <br /><span className="italic font-light">Destinations</span>
                </h2>
              </div>
              <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">
                Handpicked by our global curators, these destinations represent the pinnacle of contemporary luxury and cultural immersion.
              </p>
              <div className="pt-2 md:pt-4">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-midnight rounded-xl md:rounded-2xl px-8 md:px-12 py-5 md:py-7 text-[10px] md:text-[11px] uppercase tracking-widest font-bold transition-all duration-500">
                  Explore All Regions
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-8 flex md:grid md:grid-cols-2 gap-4 md:gap-8 overflow-x-auto md:overflow-visible no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {trendingDestinations.map((dest, index) => (
                <motion.div 
                  key={dest.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className={cn(
                    "relative h-[280px] md:h-[450px] min-w-[220px] md:min-w-0 group cursor-pointer overflow-hidden rounded-2xl md:rounded-[3rem] flex-shrink-0",
                    index % 2 !== 0 ? "md:translate-y-12" : ""
                  )}
                >
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
                    <p className="text-champagne text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] mb-1 md:mb-2">{dest.country}</p>
                    <h3 className="text-2xl md:text-4xl font-serif text-white group-hover:text-champagne transition-colors duration-500">{dest.name}</h3>
                    <div className="h-px w-0 group-hover:w-full bg-champagne mt-2 md:mt-4 transition-all duration-700" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Privileges - Editorial Style */}
      <section className="py-20 md:py-32 px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24 space-y-3 md:space-y-4">
          <span className="text-champagne font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase block">Member Benefits</span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-midnight">Exclusive Privileges</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {exclusiveOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="group relative h-[400px] md:h-[600px] overflow-hidden border-none rounded-2xl md:rounded-[3rem] shadow-xl md:shadow-2xl">
                <img 
                  src={offer.images[0]} 
                  alt={offer.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent opacity-90" />
                
                <div className="absolute inset-x-3 md:inset-x-8 bottom-3 md:bottom-8 p-5 md:p-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-xl md:rounded-[2.5rem] flex flex-col">
                  <div className="inline-flex items-center gap-2 bg-champagne text-midnight px-2.5 md:px-4 py-1 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-3 md:mb-6 self-start">
                    <Sparkles size={10} /> Special Invitation
                  </div>
                  <h3 className="text-xl md:text-3xl font-serif text-white mb-2 md:mb-4 leading-tight">{offer.title}</h3>
                  <p className="text-white/60 text-[10px] md:text-sm font-light line-clamp-2 mb-4 md:mb-8 leading-relaxed">{offer.description}</p>
                  <Link to={`/platform/listing/${offer.id}`}>
                    <Button className="w-full bg-white text-midnight hover:bg-champagne transition-all duration-500 rounded-lg md:rounded-2xl py-3 md:py-6 uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold text-[9px] md:text-[11px]">
                      View Invitation
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recently Viewed - Elegant Rail */}
      {recentViews.length > 0 && (
        <section className="py-20 md:py-32 px-4 md:px-6 lg:px-16 border-t border-midnight/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12 md:mb-16">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-pearl flex items-center justify-center text-midnight border border-midnight/5">
                  <Clock size={20} strokeWidth={1} />
                </div>
                <div>
                  <span className="text-midnight/30 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] block mb-0.5 md:mb-1">Your Journey</span>
                  <h2 className="text-2xl md:text-3xl font-serif text-midnight">Recently Viewed</h2>
                </div>
              </div>
              <div className="h-px flex-1 mx-8 md:mx-16 bg-gradient-to-r from-midnight/10 to-transparent hidden md:block" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10">
              {recentViews.map((listing) => (
                <Link key={listing.id} to={`/platform/listing/${listing.id}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:rounded-[2rem] mb-2 md:mb-6 shadow-sm group-hover:shadow-lg transition-all duration-500">
                    <img 
                      src={listing.images[0]} 
                      alt={listing.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-white/90 backdrop-blur-md px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[7px] md:text-[9px] font-bold flex items-center gap-0.5 md:gap-1.5 shadow-lg">
                      <Star className="h-2 w-2 md:h-3 md:w-3 text-champagne fill-current" />
                      {listing.rating}
                    </div>
                  </div>
                  <h4 className="text-sm md:text-xl font-serif text-midnight group-hover:text-champagne transition-colors duration-500 truncate mb-1 md:mb-2">{listing.title}</h4>
                  <div className="flex items-center gap-1 text-[7px] md:text-[10px] text-midnight/40 font-bold uppercase tracking-widest">
                    <MapPin size={8} />
                    {listing.location}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};


