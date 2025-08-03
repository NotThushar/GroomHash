import React, { createContext, useContext, useState } from 'react';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface Booking {
  id: string;
  stationId: string;
  stationName: string;
  date: string;
  time: string;
  services: Service[];
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  nftMinted: boolean;
}

interface BookingContextType {
  currentBooking: {
    stationId: string;
    stationName: string;
    date: string;
    time: string;
    services: Service[];
    totalPrice: number;
  } | null;
  bookings: Booking[];
  setBookingDetails: (booking: any) => void;
  confirmBooking: () => string;
  getBookings: () => Booking[];
  cancelBooking: (bookingId: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const setBookingDetails = (booking: any) => {
    setCurrentBooking(booking);
  };

  const confirmBooking = (): string => {
    if (!currentBooking) throw new Error('No booking details available');

    const newBooking: Booking = {
      id: Date.now().toString(),
      ...currentBooking,
      status: 'confirmed',
      nftMinted: Math.random() > 0.5, // Random NFT minting for demo
    };

    setBookings(prev => [...prev, newBooking]);
    setCurrentBooking(null);
    return newBooking.id;
  };

  const getBookings = (): Booking[] => {
    return bookings;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    );
  };

  return (
    <BookingContext.Provider value={{
      currentBooking,
      bookings,
      setBookingDetails,
      confirmBooking,
      getBookings,
      cancelBooking,
    }}>
      {children}
    </BookingContext.Provider>
  );
};