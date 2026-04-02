import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ListingCard } from '../ui/ListingCard';
import { Listing } from '../../types';

const listings: Listing[] = [
  {
    id: '1',
    title: 'The Royal Atlantis',
    location: 'Dubai, UAE',
    price: 336000,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800'],
    type: 'hotel',
    description: '',
    amenities: [],
    availability: { totalSeats: 10, bookedSeats: 0, availableSeats: 10 },
    reviewsCount: 120
  },
  {
    id: '2',
    title: 'Azure Bay Villa',
    location: 'Santorini, Greece',
    price: 238000,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800'],
    type: 'villa',
    description: '',
    amenities: [],
    availability: { totalSeats: 10, bookedSeats: 0, availableSeats: 10 },
    reviewsCount: 85
  },
  {
    id: '3',
    title: 'Orient Express Suite',
    location: 'Paris to Venice',
    price: 672000,
    rating: 5.0,
    images: ['https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=800'],
    type: 'train',
    description: '',
    amenities: [],
    availability: { totalSeats: 10, bookedSeats: 0, availableSeats: 10 },
    reviewsCount: 45
  },
  {
    id: '4',
    title: 'Skyline Penthouse',
    location: 'New York, USA',
    price: 420000,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'],
    type: 'hotel',
    description: '',
    amenities: [],
    availability: { totalSeats: 10, bookedSeats: 0, availableSeats: 10 },
    reviewsCount: 210
  }
];

export const FeaturedListings = () => {
  return (
    <section className="py-24 px-6 bg-pearl overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16" data-aos="fade-up">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-midnight/30">Curated Experiences</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-midnight leading-tight">Featured Journeys</h2>
          </div>
          <div className="hidden md:flex gap-4 mb-2">
            <button className="h-12 w-12 rounded-full border border-midnight/10 flex items-center justify-center hover:bg-midnight hover:text-pearl transition-all duration-500">
              <ChevronLeft size={20} />
            </button>
            <button className="h-12 w-12 rounded-full border border-midnight/10 flex items-center justify-center hover:bg-midnight hover:text-pearl transition-all duration-500">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {listings.map((listing, index) => (
            <ListingCard key={listing.id} listing={listing} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
