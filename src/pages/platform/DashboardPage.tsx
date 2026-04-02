import React, { useState, useEffect } from 'react';
import { collection, query, limit, getDocs, orderBy, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Listing, Booking } from '../../types';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Calendar, MapPin, Star, TrendingUp, Clock, Briefcase, ChevronRight, Hotel, Plane, Train } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice, cn } from '../../lib/utils';

export const DashboardPage = () => {
  const { user } = useJurniAuth();
  const navigate = useNavigate();
  const [recentBookings, setRecentBookings] = useState<(Booking & { listing?: Listing })[]>([]);
  const [recommendations, setRecommendations] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { label: 'Luxury Stays', value: '0', icon: Hotel, color: 'text-midnight', path: '/platform/bookings?type=hotel' },
    { label: 'Private Flights', value: '0', icon: Plane, color: 'text-champagne', path: '/platform/bookings?type=flight' },
    { label: 'Elite Trains', value: '0', icon: Train, color: 'text-rose', path: '/platform/bookings?type=train' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recommendations
        const listingsQ = query(collection(db, 'listings'), limit(3));
        const listingsSnap = await getDocs(listingsQ);
        setRecommendations(listingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Listing)));

        // Fetch recent bookings
        if (user) {
          const bookingsQ = query(
            collection(db, 'bookings'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc'),
            limit(3)
          );
          const bookingsSnap = await getDocs(bookingsQ);
          const bookings = bookingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
          
          // Fetch associated listings for recent bookings
          const bookingsWithListings = await Promise.all(bookings.map(async (booking) => {
            const listingDoc = await getDoc(doc(db, 'listings', booking.listingId));
            return { 
              ...booking, 
              listing: listingDoc.exists() ? { id: listingDoc.id, ...listingDoc.data() } as Listing : undefined 
            };
          }));
          
          setRecentBookings(bookingsWithListings);

          // Update stats
          setStats([
            { 
              label: 'Luxury Stays', 
              value: bookingsWithListings.filter(b => b.listing?.type === 'hotel').length.toString(), 
              icon: Hotel, 
              color: 'text-midnight',
              path: '/platform/bookings?type=hotel'
            },
            { 
              label: 'Private Flights', 
              value: bookingsWithListings.filter(b => b.listing?.type === 'flight').length.toString(), 
              icon: Plane, 
              color: 'text-champagne',
              path: '/platform/bookings?type=flight'
            },
            { 
              label: 'Elite Trains', 
              value: bookingsWithListings.filter(b => b.listing?.type === 'train').length.toString(), 
              icon: Train, 
              color: 'text-rose',
              path: '/platform/bookings?type=train'
            },
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="bg-pearl min-h-screen py-12 lg:py-20 px-6 sm:px-12">
      <div className="max-w-screen-2xl mx-auto space-y-12 lg:space-y-20">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8" data-aos="fade-down">
          <div className="max-w-2xl">
            <span className="text-rose font-bold text-[10px] tracking-[0.5em] uppercase block mb-4">Welcome Back</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-midnight leading-[1.1] tracking-tight">
              Hello, {user?.displayName?.split(' ')[0] || 'Traveler'}
            </h1>
            <p className="text-lg text-midnight/60 mt-4 italic leading-relaxed">
              Your next masterpiece journey is waiting to be written. Where will your curiosity take you today?
            </p>
          </div>
          <Link to="/platform/explore" className="w-full md:w-auto">
            <Button size="lg" className="w-full md:w-auto px-10 py-6 text-xs uppercase tracking-[0.3em] font-bold shadow-2xl shadow-champagne/20 rounded-2xl">
              Explore Destinations
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label} 
              className="p-10 flex items-center gap-8 cursor-pointer hover:shadow-hover transition-all duration-700 border-midnight/5 group rounded-[32px] bg-pearl shadow-card" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
              onClick={() => navigate(stat.path)}
            >
              <div className={cn('h-16 w-16 rounded-2xl bg-midnight/5 flex items-center justify-center group-hover:bg-midnight group-hover:text-champagne transition-all duration-700 shadow-inner', stat.color)}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-[10px] opacity-40 font-bold uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                <p className="text-4xl font-serif text-midnight leading-none">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-16 lg:gap-24">
          {/* Recommendations */}
          <div className="space-y-10" data-aos="fade-up">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl lg:text-4xl font-serif text-midnight leading-tight">Recommended for You</h2>
              <Link to="/platform/explore" className="text-xs font-bold uppercase tracking-widest text-champagne hover:underline transition-all">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {recommendations.map((listing) => (
                <Card key={listing.id} className="group cursor-pointer rounded-[32px] border-midnight/5 overflow-hidden bg-pearl shadow-card hover:shadow-hover transition-all duration-700">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={listing.images[0]} 
                      alt={listing.title} 
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-pearl/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-xl border border-midnight/5">
                      <Star className="h-3 w-3 text-champagne fill-current" />
                      {listing.rating}
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="font-serif text-xl lg:text-2xl text-midnight mb-2 group-hover:text-champagne transition-colors line-clamp-1 leading-tight">{listing.title}</h4>
                    <p className="text-[10px] opacity-40 font-bold uppercase tracking-[0.2em] flex items-center gap-2 mb-8">
                      <MapPin size={12} className="text-champagne" /> {listing.location}
                    </p>
                    <div className="flex justify-between items-center pt-6 border-t border-midnight/5">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-widest opacity-30">Starting from</span>
                        <p className="text-lg font-bold text-midnight">{formatPrice(listing.price)}</p>
                      </div>
                      <Link to={`/platform/listing/${listing.id}`}>
                        <Button size="sm" variant="outline" className="text-[10px] uppercase tracking-widest font-bold px-6 py-3 rounded-xl border-midnight/10 hover:border-champagne group-hover:bg-champagne group-hover:text-midnight transition-all">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
