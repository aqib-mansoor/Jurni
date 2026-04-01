import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Booking, Listing } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { 
  Calendar, 
  MapPin, 
  Plane, 
  Hotel, 
  Train, 
  Clock, 
  ChevronLeft, 
  Info, 
  User, 
  CheckCircle2,
  Map,
  Navigation
} from 'lucide-react';
import { formatPrice, cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const ItineraryPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const bookingDoc = await getDoc(doc(db, 'bookings', id));
        if (bookingDoc.exists()) {
          const bookingData = { id: bookingDoc.id, ...bookingDoc.data() } as Booking;
          setBooking(bookingData);
          
          const listingDoc = await getDoc(doc(db, 'listings', bookingData.listingId));
          if (listingDoc.exists()) {
            setListing({ id: listingDoc.id, ...listingDoc.data() } as Listing);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner fullScreen />;
  if (!booking || !listing) return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-serif">Itinerary not found</h2>
      <Link to="/platform/bookings">
        <Button className="mt-4">Back to Bookings</Button>
      </Link>
    </div>
  );

  const travelDate = new Date(booking.dates.start);
  
  const getItinerarySteps = () => {
    const steps = [];
    
    if (listing.type === 'flight') {
      steps.push({
        time: '08:00 AM',
        title: 'Check-in at Airport',
        description: `Arrive at the airport for your flight to ${listing.location}.`,
        icon: User,
        color: 'text-champagne'
      });
      steps.push({
        time: '10:30 AM',
        title: 'Departure',
        description: `Flight ${listing.title} departs.`,
        icon: Plane,
        color: 'text-midnight'
      });
      steps.push({
        time: '02:45 PM',
        title: 'Arrival',
        description: `Landing in ${listing.location}. Welcome to your destination!`,
        icon: Navigation,
        color: 'text-rose'
      });
    } else if (listing.type === 'hotel') {
      steps.push({
        time: '02:00 PM',
        title: 'Hotel Check-in',
        description: `Check-in at ${listing.title}. Your luxury suite awaits.`,
        icon: Hotel,
        color: 'text-champagne'
      });
      steps.push({
        time: '07:00 PM',
        title: 'Welcome Dinner',
        description: 'Enjoy a complimentary welcome dinner at the hotel restaurant.',
        icon: Info,
        color: 'text-midnight'
      });
      steps.push({
        time: 'Next Day',
        title: 'Check-out',
        description: 'Check-out by 11:00 AM. We hope you enjoyed your stay!',
        icon: CheckCircle2,
        color: 'text-rose'
      });
    } else if (listing.type === 'train') {
      steps.push({
        time: '09:15 AM',
        title: 'Station Arrival',
        description: `Arrive at the station for your journey to ${listing.location}.`,
        icon: User,
        color: 'text-champagne'
      });
      steps.push({
        time: '10:00 AM',
        title: 'Train Departure',
        description: `${listing.title} departs from Platform 4.`,
        icon: Train,
        color: 'text-midnight'
      });
      steps.push({
        time: '01:30 PM',
        title: 'Arrival',
        description: `Arriving at ${listing.location} station.`,
        icon: MapPin,
        color: 'text-rose'
      });
    }
    
    return steps;
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 lg:space-y-12">
      <div className="flex items-center gap-3 sm:gap-4" data-aos="fade-right">
        <Link to="/platform/bookings">
          <Button variant="ghost" size="sm" className="p-1.5 sm:p-2 rounded-full">
            <ChevronLeft size={20} className="sm:size-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-4xl font-serif text-midnight">Your Itinerary</h1>
          <p className="text-xs sm:text-base text-midnight opacity-60 italic">Chronological view of your luxury journey.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Trip Overview */}
        <div className="lg:col-span-1 space-y-6 lg:space-y-8" data-aos="fade-up">
          <Card className="overflow-hidden rounded-none shadow-lg border-none">
            <img src={listing.images[0]} alt={listing.title} className="h-40 sm:h-48 w-full object-cover" referrerPolicy="no-referrer" />
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-midnight opacity-50 text-[10px] uppercase font-bold tracking-widest">
                <MapPin size={12} /> {listing.location}
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-midnight leading-tight">{listing.title}</h3>
              <div className="pt-4 border-t border-midnight border-opacity-5 space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="opacity-50">Booking ID</span>
                  <span className="font-mono font-bold uppercase">{booking.id.slice(-8)}</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="opacity-50">Travel Date</span>
                  <span className="font-bold">{travelDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="opacity-50">Total Paid</span>
                  <span className="font-bold text-champagne">{formatPrice(booking.totalPrice)}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5 sm:p-6 space-y-4 rounded-none shadow-md border-none">
            <h4 className="text-[10px] sm:text-sm font-bold uppercase tracking-widest opacity-40">Passenger Details</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-midnight bg-opacity-5 flex items-center justify-center">
                  <User size={18} className="text-midnight opacity-40 sm:size-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-midnight">{booking.passengerManifest[0].name}</p>
                  <p className="text-[10px] sm:text-xs opacity-50">{booking.passengerManifest[0].email}</p>
                </div>
              </div>
              {booking.specialRequests && (
                <div className="p-3 sm:p-4 bg-champagne bg-opacity-10 rounded-none border border-champagne border-opacity-20">
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Special Requests</p>
                  <p className="text-xs sm:text-sm italic">"{booking.specialRequests}"</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-2 space-y-8 lg:space-y-12" data-aos="fade-left">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-midnight border-opacity-10 space-y-10 lg:space-y-12">
            {getItinerarySteps().map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Dot */}
                <div className={cn(
                  "absolute -left-[33px] sm:-left-[41px] top-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full border-4 border-pearl shadow-md",
                  index === 0 ? "bg-champagne" : "bg-midnight"
                )} />
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] sm:text-sm font-bold text-champagne uppercase tracking-widest">{step.time}</span>
                    <div className={cn("p-1 sm:p-1.5 rounded-none bg-midnight bg-opacity-5", step.color)}>
                      <step.icon size={14} className="sm:size-4" />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-midnight">{step.title}</h3>
                  <p className="text-xs sm:text-base text-midnight opacity-60 leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-8 lg:pt-12 flex justify-center">
            <Link to="/platform/explore" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-none text-xs sm:text-sm">
                <Map size={16} className="sm:size-[18px]" /> Plan Another Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
