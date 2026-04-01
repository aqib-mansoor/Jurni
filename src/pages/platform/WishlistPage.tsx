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
    <div className="bg-pearl min-h-screen py-8 lg:py-12 px-4 sm:px-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-8 lg:mb-12" data-aos="fade-down">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-midnight mb-2 lg:mb-4">Your Wishlist</h1>
          <p className="text-sm sm:text-base lg:text-lg text-midnight opacity-60">Curated experiences waiting for your arrival.</p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                    className="group overflow-hidden cursor-pointer bg-white border-midnight border-opacity-5 hover:shadow-2xl transition-all duration-500 rounded-none"
                    onClick={() => navigate(`/platform/listing/${item.id}`)}
                  >
                    <div className="relative h-56 sm:h-64 overflow-hidden">
                      <img 
                        src={item.images[0]} 
                        alt={item.title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-40" />
                      <button 
                        onClick={(e) => handleRemove(e, item.id)}
                        className="absolute top-3 right-3 h-9 w-9 lg:h-10 lg:w-10 rounded-full bg-pearl bg-opacity-20 backdrop-blur-md text-rose flex items-center justify-center hover:bg-rose hover:text-pearl transition-all z-10"
                      >
                        <Heart size={16} className="fill-current lg:size-[18px]" />
                      </button>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-pearl">
                        <Star size={12} className="text-champagne fill-current lg:size-3.5" />
                        <span className="text-[10px] lg:text-xs font-bold">{item.rating}</span>
                      </div>
                    </div>

                    <div className="p-5 lg:p-6">
                      <div className="flex justify-between items-start mb-1 lg:mb-2">
                        <h3 className="text-lg lg:text-xl font-serif text-midnight group-hover:text-champagne transition-colors">{item.title}</h3>
                        <span className="text-base lg:text-lg font-bold text-midnight">{formatPrice(item.price)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-midnight opacity-50 text-xs lg:text-sm mb-4 lg:mb-6">
                        <MapPin size={12} className="lg:size-3.5" />
                        {item.location}
                      </div>

                      <Button className="w-full group/btn rounded-none text-xs lg:text-sm py-3 lg:py-4">
                        Book Experience
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 lg:py-24 bg-white rounded-none border border-dashed border-midnight border-opacity-10" data-aos="fade-up">
            <div className="h-16 w-16 lg:h-20 lg:w-20 rounded-full bg-pearl mx-auto flex items-center justify-center text-midnight opacity-20 mb-4 lg:mb-6">
              <Heart size={32} className="lg:size-10" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-serif text-midnight mb-2 lg:mb-4">Your wishlist is empty</h2>
            <p className="text-sm lg:text-base text-midnight opacity-50 mb-6 lg:mb-8 max-w-xs sm:max-w-md mx-auto">
              Explore our handpicked luxury experiences and save your favorites here for later.
            </p>
            <Button onClick={() => navigate('/platform/explore')} className="rounded-none">
              Start Exploring
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
