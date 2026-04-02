import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, MapPin, Star, ArrowRight } from 'lucide-react';
import { Listing } from '../../types';
import { formatPrice, cn } from '../../lib/utils';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { Button } from './Button';

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

export const ListingCard = ({ listing, index = 0 }: ListingCardProps) => {
  const { user, toggleWishlist } = useJurniAuth();
  const isWishlisted = user?.wishlist?.includes(listing.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group bg-pearl rounded-[20px] overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 border border-midnight/5 flex flex-col h-full"
    >
      <Link to={`/platform/listing/${listing.id}`} className="relative aspect-[4/3] overflow-hidden block">
        <img 
          src={listing.images[0] || `https://picsum.photos/seed/${listing.id}/800/600?travel`} 
          alt={listing.title} 
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000 rounded-t-[20px]" 
          referrerPolicy="no-referrer"
        />
        
        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(listing.id);
          }}
          className={cn(
            "absolute top-4 right-4 h-10 w-10 rounded-full backdrop-blur-md border border-pearl/20 flex items-center justify-center transition-all duration-500 z-10",
            isWishlisted 
              ? "bg-rose text-pearl border-rose" 
              : "bg-midnight/20 text-pearl hover:bg-rose hover:border-rose"
          )}
        >
          <Heart size={18} className={cn("transition-all", isWishlisted ? "fill-current" : "")} />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 bg-midnight/40 backdrop-blur-md border border-pearl/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-pearl">
          <Star size={12} className="text-champagne fill-current" />
          <span className="text-xs font-bold">{listing.rating}</span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-midnight/30 text-[9px] font-bold uppercase tracking-[0.2em]">
            <MapPin size={10} className="text-champagne" />
            {listing.location}
          </div>
          
          <Link to={`/platform/listing/${listing.id}`}>
            <h3 className="text-lg font-serif text-midnight leading-tight group-hover:text-champagne transition-colors duration-500 line-clamp-1 tracking-tight">
              {listing.title}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-midnight font-bold text-lg tracking-tight">{formatPrice(listing.price)}</span>
            <span className="text-[8px] text-midnight/20 uppercase tracking-[0.3em] font-bold">Investment / night</span>
          </div>
          <Link to={`/platform/listing/${listing.id}`}>
            <Button variant="ghost" className="px-0 text-[10px] font-bold uppercase tracking-widest text-midnight/40 hover:text-midnight group/btn">
              Explore <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
