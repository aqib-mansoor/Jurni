import { collection, getDocs, addDoc, serverTimestamp, query, limit, where } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';

const listings = [
  {
    title: "The Royal Atlantis Suite",
    description: "Experience unparalleled luxury in one of the world's most iconic hotels. Our Royal Suite offers pure opulence, featuring a private elevator, cinema, and library.",
    price: 25000,
    location: "Dubai, UAE",
    type: "hotel",
    rating: 4.9,
    reviewsCount: 128,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80"
    ],
    amenities: ["Private Butler", "Chauffeur-driven Rolls Royce", "Private Cinema", "Infinity Pool Access", "Helipad Access"],
    availability: { totalSeats: 4, bookedSeats: 0, availableSeats: 4 }
  },
  {
    title: "Global 7500 Private Jet",
    description: "Fly in absolute comfort and privacy. Our Gulfstream G650ER service provides the ultimate in long-range luxury travel, with a bespoke menu and dedicated cabin crew.",
    price: 15000,
    location: "London, UK",
    type: "flight",
    rating: 4.8,
    reviewsCount: 85,
    images: [
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1920&q=80"
    ],
    amenities: ["Bespoke Catering", "High-speed Wi-Fi", "Full-flat Beds", "Dedicated Cabin Crew", "Priority Boarding"],
    availability: { totalSeats: 12, bookedSeats: 0, availableSeats: 12 }
  },
  {
    title: "Orient Express Suite",
    description: "Step back in time to the golden age of travel. Journey from Paris to Venice in a meticulously restored 1920s carriage, featuring exquisite dining and world-class service.",
    price: 8500,
    location: "Paris, France",
    type: "train",
    rating: 4.9,
    reviewsCount: 210,
    images: [
      "https://images.unsplash.com/photo-1474487022159-5a4284fe52b0?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1532105956691-94ad9c0339c7?auto=format&fit=crop&w=1920&q=80"
    ],
    amenities: ["Fine Dining", "Champagne Bar", "Private Cabin", "Personal Steward", "Live Music"],
    availability: { totalSeats: 2, bookedSeats: 0, availableSeats: 2 }
  },
  {
    title: "Azure Bay Villa",
    description: "A breathtaking villa perched on the cliffs of Oia. Features a private infinity pool, panoramic caldera views, and minimalist Cycladic architecture.",
    price: 4500,
    location: "Oia, Santorini",
    type: "villa",
    rating: 5.0,
    reviewsCount: 42,
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1515404929826-76fff9fef204?auto=format&fit=crop&w=1920&q=80"
    ],
    amenities: ["Infinity Pool", "Private Terrace", "Chef Service", "Wine Cellar", "Sunset Views"],
    availability: { totalSeats: 6, bookedSeats: 0, availableSeats: 6 }
  },
  {
    title: "Arctic Glass Igloo",
    description: "A rare adventure into the heart of the Arctic. Stay in luxury glass igloos and witness the celestial dance of the Aurora Borealis.",
    price: 12000,
    location: "Lapland, Finland",
    type: "adventure",
    rating: 4.7,
    reviewsCount: 64,
    images: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1920&q=80"
    ],
    amenities: ["Glass Igloo", "Husky Safari", "Private Sauna", "Thermal Clothing", "Photography Guide"],
    availability: { totalSeats: 10, bookedSeats: 0, availableSeats: 10 }
  },
  {
    title: "Kyoto Zen Retreat",
    description: "Rejuvenate your soul in a traditional Ryokan surrounded by bamboo forests. Includes daily meditation, tea ceremonies, and onsen baths.",
    price: 3200,
    location: "Kyoto, Japan",
    type: "hotel",
    rating: 4.9,
    reviewsCount: 89,
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1920&q=80"
    ],
    amenities: ["Onsen Bath", "Zen Garden", "Meditation Hall", "Organic Cuisine", "Tea Ceremony"],
    availability: { totalSeats: 8, bookedSeats: 0, availableSeats: 8 }
  },
  {
    title: "Monaco Yacht Experience",
    description: "Sail the French Riviera in a 50-meter superyacht. Features a helipad, jacuzzi, and a full crew to cater to your every whim.",
    price: 35000,
    location: "Monaco",
    type: "adventure",
    rating: 4.9,
    reviewsCount: 34,
    images: [
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80"
    ],
    amenities: ["Helipad", "Jacuzzi", "Private Chef", "Jet Skis", "Cinema Room"],
    availability: { totalSeats: 12, bookedSeats: 0, availableSeats: 12 }
  },
  {
    title: "Safari Lodge: Serengeti",
    description: "Immerse yourself in the wild. Our luxury lodge offers front-row seats to the Great Migration, with private game drives and gourmet bush dinners.",
    price: 6800,
    location: "Serengeti, Tanzania",
    type: "adventure",
    rating: 4.8,
    reviewsCount: 156,
    images: [
      "https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80"
    ],
    amenities: ["Game Drives", "Bush Dinners", "Infinity Pool", "Spa", "Library"],
    availability: { totalSeats: 4, bookedSeats: 0, availableSeats: 4 }
  },
  {
    title: "The Glass House: Iceland",
    description: "A architectural masterpiece in the middle of nowhere. Floor-to-ceiling glass walls provide 360-degree views of the Icelandic landscape.",
    price: 5500,
    location: "Hella, Iceland",
    type: "villa",
    rating: 4.9,
    reviewsCount: 28,
    images: [
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80"
    ],
    amenities: ["Glass Walls", "Outdoor Hot Tub", "Northern Lights View", "Private Chef", "Luxury Linens"],
    availability: { totalSeats: 2, bookedSeats: 0, availableSeats: 2 }
  },
  {
    title: "Maldives Overwater Palace",
    description: "The ultimate island escape. A massive overwater villa with its own slide into the ocean, private gym, and underwater bedroom.",
    price: 18000,
    location: "Maldives",
    type: "hotel",
    rating: 5.0,
    reviewsCount: 75,
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1920&q=80"
    ],
    amenities: ["Water Slide", "Underwater Bedroom", "Private Gym", "Personal Butler", "Yacht Transfers"],
    availability: { totalSeats: 8, bookedSeats: 0, availableSeats: 8 }
  }
];

export const seedDatabase = async () => {
  try {
    const listingsRef = collection(db, 'listings');
    const q = query(listingsRef, limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('Seeding database with initial listings...');
      for (const listing of listings) {
        // Check if listing already exists by title to avoid duplicates
        const existingQuery = query(listingsRef, where('title', '==', listing.title));
        const existingSnap = await getDocs(existingQuery);
        
        if (existingSnap.empty) {
          await addDoc(listingsRef, {
            ...listing,
            createdAt: serverTimestamp()
          });
        }
      }
      console.log('Database seeded successfully!');
    }
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.WRITE, 'listings');
    } catch (e) {
      // Error is already logged
    }
  }
};
