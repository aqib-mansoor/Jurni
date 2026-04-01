import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface Availability {
  totalSeats: number;
  remainingSeats: number;
}

export const useAvailability = (listingId: string) => {
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!listingId) return;

    const unsubscribe = onSnapshot(doc(db, 'listings', listingId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setAvailability(data.availability || null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [listingId]);

  const isLowStock = availability ? availability.remainingSeats <= 2 : false;

  return { availability, loading, isLowStock };
};
