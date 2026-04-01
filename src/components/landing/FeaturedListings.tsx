import React from 'react';
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatPrice } from '../../lib/utils';

const listings = [
  {
    id: '1',
    title: 'The Royal Atlantis',
    location: 'Dubai, UAE',
    price: 336000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Azure Bay Villa',
    location: 'Santorini, Greece',
    price: 238000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Orient Express Suite',
    location: 'Paris to Venice',
    price: 672000,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'Skyline Penthouse',
    location: 'New York, USA',
    price: 420000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'
  }
];

export const FeaturedListings = () => {
  return (
    <section className="py-24 px-6 bg-pearl overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-serif text-midnight">Featured Journeys</h2>
          <div className="flex gap-4">
            <button className="h-12 w-12 rounded-full border border-midnight border-opacity-20 flex items-center justify-center hover:bg-midnight hover:text-pearl transition-all">
              <ChevronLeft size={24} />
            </button>
            <button className="h-12 w-12 rounded-full border border-midnight border-opacity-20 flex items-center justify-center hover:bg-midnight hover:text-pearl transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-8 no-scrollbar">
          {listings.map((listing, index) => (
            <div 
              key={listing.id} 
              className="min-w-[350px] md:min-w-[400px] bg-white rounded-sm border border-midnight border-opacity-5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              data-aos="fade-left"
              data-aos-delay={index * 100}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={listing.image} 
                  alt={listing.title} 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-pearl px-3 py-1 rounded-sm text-sm font-medium flex items-center gap-1 shadow-md">
                  <Star className="h-4 w-4 text-champagne fill-current" />
                  {listing.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-midnight opacity-60 text-sm mb-2">
                  <MapPin size={14} />
                  {listing.location}
                </div>
                <h3 className="text-2xl font-serif text-midnight mb-4">{listing.title}</h3>
                <div className="flex items-center justify-between pt-4 border-t border-midnight border-opacity-5">
                  <div>
                    <span className="text-2xl font-bold text-midnight">{formatPrice(listing.price)}</span>
                    <span className="text-sm opacity-60"> / night</span>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
