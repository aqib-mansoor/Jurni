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
    <div className="bg-pearl min-h-screen py-12 lg:py-20 px-6 sm:px-12">
      <div className="max-w-screen-2xl mx-auto space-y-12 lg:space-y-16">
        <div className="flex items-center gap-6 sm:gap-8" data-aos="fade-right">
          <Link to="/platform/bookings">
            <Button variant="ghost" size="sm" className="h-12 w-12 rounded-full bg-midnight/5 hover:bg-midnight hover:text-champagne transition-all duration-500">
              <ChevronLeft size={24} />
            </Button>
          </Link>
          <div>
            <span className="text-rose font-bold text-[10px] tracking-[0.5em] uppercase block mb-2">Travel Document</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-midnight leading-[1.1] tracking-tight">Your Itinerary</h1>
            <p className="text-lg text-midnight/60 mt-2 italic">Chronological view of your luxury journey.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Trip Overview */}
          <div className="lg:col-span-4 space-y-8 lg:space-y-10" data-aos="fade-up">
            <Card className="overflow-hidden rounded-[32px] shadow-card border-midnight/5 bg-pearl hover:shadow-hover transition-all duration-700">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-2 text-rose font-bold text-[10px] uppercase tracking-[0.3em]">
                  <MapPin size={14} /> {listing.location}
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-midnight leading-tight">{listing.title}</h3>
                <div className="pt-6 border-t border-midnight/5 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-midnight/40 font-bold uppercase tracking-widest text-[10px]">Booking ID</span>
                    <span className="font-mono font-bold uppercase text-midnight">{booking.id.slice(-8)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-midnight/40 font-bold uppercase tracking-widest text-[10px]">Travel Date</span>
                    <span className="font-serif font-bold text-midnight">{travelDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-midnight/40 font-bold uppercase tracking-widest text-[10px]">Total Paid</span>
                    <span className="font-serif font-bold text-champagne text-lg">{formatPrice(booking.totalPrice)}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 space-y-6 rounded-[32px] shadow-card border-midnight/5 bg-pearl">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-midnight/40">Passenger Details</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-midnight/5 flex items-center justify-center text-midnight/40 shadow-inner">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-midnight uppercase tracking-widest">{booking.passengerManifest[0].name}</p>
                    <p className="text-xs text-midnight/50 mt-1">{booking.passengerManifest[0].email}</p>
                  </div>
                </div>
                {booking.specialRequests && (
                  <div className="p-6 bg-champagne/5 rounded-2xl border border-champagne/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-champagne/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-champagne mb-2">Special Requests</p>
                    <p className="text-sm italic text-midnight/70 leading-relaxed">"{booking.specialRequests}"</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-8 space-y-12 lg:space-y-16" data-aos="fade-left">
            <div className="relative pl-10 sm:pl-12 border-l-2 border-midnight/10 space-y-12 lg:space-y-16">
              {getItinerarySteps().map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group/step"
                >
                  {/* Dot */}
                  <div className={cn(
                    "absolute -left-[51px] sm:-left-[59px] top-0 h-6 w-6 sm:h-8 sm:w-8 rounded-full border-4 border-pearl shadow-lg transition-all duration-500 group-hover/step:scale-125",
                    index === 0 ? "bg-champagne" : "bg-midnight"
                  )} />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-champagne uppercase tracking-[0.3em]">{step.time}</span>
                      <div className={cn("p-2 rounded-xl bg-midnight/5 shadow-inner", step.color)}>
                        <step.icon size={20} />
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif text-midnight leading-tight">{step.title}</h3>
                    <p className="text-base sm:text-lg text-midnight/60 leading-relaxed max-w-2xl italic">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-12 flex justify-center">
              <Link to="/platform/explore" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-4 rounded-2xl px-12 py-6 text-xs font-bold uppercase tracking-[0.3em] border-midnight/10 hover:border-champagne group">
                  <Map size={20} className="group-hover:rotate-12 transition-transform" /> Plan Another Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
