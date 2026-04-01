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
            where('userId', '==', user.id),
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
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 sm:space-y-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6" data-aos="fade-down">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-midnight mb-2">Welcome back, {user?.displayName?.split(' ')[0] || 'Traveler'}</h1>
          <p className="text-sm sm:text-base text-midnight opacity-60 font-light italic">Your next masterpiece journey is waiting to be written.</p>
        </div>
        <Link to="/platform/explore" className="w-full md:w-auto">
          <Button size="lg" className="w-full md:w-auto text-[10px] sm:text-xs uppercase tracking-widest font-bold py-4 sm:py-6">Explore New Destinations</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
        {stats.map((stat, index) => (
          <Card 
            key={stat.label} 
            className="p-6 sm:p-8 flex items-center gap-4 sm:gap-6 cursor-pointer hover:shadow-2xl transition-all duration-500 border-midnight border-opacity-5 group rounded-none" 
            data-aos="fade-up" 
            data-aos-delay={index * 100}
            onClick={() => navigate(stat.path)}
          >
            <div className={cn('h-12 w-12 sm:h-14 sm:w-14 rounded-none bg-midnight bg-opacity-5 flex items-center justify-center group-hover:bg-midnight group-hover:text-champagne transition-all duration-500', stat.color)}>
              <stat.icon size={24} className="sm:size-7" />
            </div>
            <div>
              <p className="text-[9px] sm:text-xs opacity-50 font-bold uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-3xl sm:text-4xl font-serif text-midnight">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:gap-12">
        {/* Recommendations */}
        <div className="space-y-6" data-aos="fade-up">
          <h2 className="text-xl sm:text-2xl font-serif text-midnight">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((listing) => (
              <Card key={listing.id} className="group cursor-pointer rounded-none border-midnight/5 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={listing.images[0]} 
                    alt={listing.title} 
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-pearl px-2 py-1 rounded-none text-[9px] lg:text-[10px] font-bold flex items-center gap-1 shadow-lg">
                    <Star className="h-2.5 w-2.5 lg:h-3 lg:w-3 text-champagne fill-current" />
                    {listing.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-serif text-base lg:text-lg text-midnight mb-2 group-hover:text-champagne transition-colors line-clamp-1">{listing.title}</h4>
                  <p className="text-[9px] lg:text-[10px] opacity-40 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-4">
                    <MapPin size={10} className="text-champagne lg:size-3" /> {listing.location}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-midnight/5">
                    <p className="text-sm font-bold text-midnight">{formatPrice(listing.price)}<span className="text-[9px] lg:text-[10px] opacity-50 font-normal"> / night</span></p>
                    <Link to={`/platform/listing/${listing.id}`}>
                      <Button size="sm" variant="ghost" className="text-[9px] lg:text-[10px] uppercase tracking-widest font-bold h-8 rounded-none border border-midnight/5 hover:border-champagne">View</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
