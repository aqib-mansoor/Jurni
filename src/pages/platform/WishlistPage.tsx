import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Heart, MapPin, Star, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Listing } from '../../types';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export const WishlistPage = () => {
  const { user, toggleWishlist } = useJurniAuth();
  const [wishlistItems, setWishlistItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.wishlist || user.wishlist.length === 0) {
        setWishlistItems([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'listings'), where('__name__', 'in', user.wishlist));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Listing));
        setWishlistItems(items);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user?.wishlist]);

  const handleRemove = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await toggleWishlist(id);
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="bg-pearl min-h-screen py-12 lg:py-20 px-6 sm:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-12 lg:mb-16" data-aos="fade-down">
          <span className="text-rose font-bold text-[10px] tracking-[0.5em] uppercase block mb-4">Your Collection</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-midnight leading-[1.1] tracking-tight">Your Wishlist</h1>
          <p className="text-lg text-midnight/60 mt-4 max-w-2xl">Curated experiences waiting for your arrival. Handpicked by you, for your next extraordinary journey.</p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            <AnimatePresence mode="popLayout">
              {wishlistItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className="group overflow-hidden cursor-pointer bg-pearl border-midnight/5 hover:shadow-hover transition-all duration-700 rounded-[32px] shadow-card"
                    onClick={() => navigate(`/platform/listing/${item.id}`)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={item.images[0]} 
                        alt={item.title} 
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-60" />
                      <button 
                        onClick={(e) => handleRemove(e, item.id)}
                        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-pearl/20 backdrop-blur-md text-rose flex items-center justify-center hover:bg-rose hover:text-pearl transition-all z-10 shadow-xl"
                      >
                        <Heart size={18} className="fill-current" />
                      </button>
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-midnight/40 backdrop-blur-md px-3 py-1.5 rounded-full text-pearl border border-pearl/20 shadow-xl">
                        <Star size={14} className="text-champagne fill-current" />
                        <span className="text-xs font-bold">{item.rating}</span>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl lg:text-2xl font-serif text-midnight group-hover:text-champagne transition-colors leading-tight">{item.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-midnight/50 text-sm mb-6">
                        <MapPin size={14} />
                        {item.location}
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-midnight/5">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-midnight/40">Price</span>
                          <span className="text-lg font-bold text-midnight">{formatPrice(item.price)}</span>
                        </div>
                        <Button className="rounded-xl px-8 py-3 text-xs uppercase tracking-widest font-bold shadow-xl shadow-champagne/20">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-24 lg:py-32 bg-pearl rounded-[48px] border border-dashed border-midnight/10 shadow-card" data-aos="fade-up">
            <div className="h-20 w-20 lg:h-24 lg:w-24 rounded-full bg-midnight/5 mx-auto flex items-center justify-center text-midnight/20 mb-8">
              <Heart size={40} />
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif text-midnight mb-4 leading-tight">Your wishlist is empty</h2>
            <p className="text-lg text-midnight/50 mb-10 max-w-md mx-auto leading-relaxed">
              Explore our handpicked luxury experiences and save your favorites here for later.
            </p>
            <Button 
              onClick={() => navigate('/platform/explore')} 
              className="rounded-2xl px-12 py-6 text-sm uppercase tracking-[0.3em] font-bold shadow-2xl shadow-champagne/20"
            >
              Explore Luxury Experiences
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
