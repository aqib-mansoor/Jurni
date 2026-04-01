export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  uid: string;
  displayName: string;
  email: string;
  avatar?: string;
  memberSince: string;
  role: UserRole;
  wishlist: string[];
}

export type ListingType = 'flight' | 'train' | 'hotel' | 'villa' | 'adventure' | 'wellness';

export interface Listing {
  id: string;
  type: ListingType;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  amenities: string[];
  availability: {
    totalSeats: number;
    bookedSeats: number;
    availableSeats: number;
  };
  rating: number;
  reviewsCount: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  userId: string;
  listingId: string;
  dates: {
    start: string;
    end: string;
  };
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  totalPrice: number;
  status: BookingStatus;
  createdAt: any;
  passengerManifest: {
    name: string;
    email: string;
    phone: string;
  }[];
  specialRequests?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  listingId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface SearchFilters {
  destination: string;
  checkIn?: string;
  checkOut?: string;
  guests: number;
  type?: ListingType;
  priceRange: [number, number];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  location: string;
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  propertyCount: number;
}
