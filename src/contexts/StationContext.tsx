import React, { createContext, useContext, useState } from 'react';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface Station {
  id: string;
  name: string;
  address: string;
  image: string;
  rating: number;
  services: Service[];
  availability: {
    [date: string]: string[];
  };
  ownerId: string;
}

interface StationContextType {
  stations: Station[];
  getStation: (id: string) => Station | undefined;
  updateStationAvailability: (stationId: string, date: string, slots: string[]) => void;
  getUserStations: (userId: string) => Station[];
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export const useStations = () => {
  const context = useContext(StationContext);
  if (context === undefined) {
    throw new Error('useStations must be used within a StationProvider');
  }
  return context;
};

const mockStations: Station[] = [
  {
    id: '1',
    name: 'Premium Grooming Hub',
    address: '123 Main St, Downtown',
    image: 'https://images.pexels.com/photos/4148906/pexels-photo-4148906.jpeg',
    rating: 4.8,
    ownerId: '2',
    services: [
      { id: 's1', name: 'Haircut & Styling', duration: 45, price: 35 },
      { id: 's2', name: 'Beard Trim', duration: 20, price: 15 },
      { id: 's3', name: 'Hot Towel Shave', duration: 30, price: 25 },
    ],
    availability: {
      '2025-01-15': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      '2025-01-16': ['09:00', '10:00', '13:00', '14:00', '15:00'],
      '2025-01-17': ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
    },
  },
  {
    id: '2',
    name: 'Modern Cuts Studio',
    address: '456 Oak Ave, Midtown',
    image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg',
    rating: 4.6,
    ownerId: '2',
    services: [
      { id: 's4', name: 'Classic Cut', duration: 30, price: 28 },
      { id: 's5', name: 'Wash & Style', duration: 40, price: 32 },
      { id: 's6', name: 'Facial Treatment', duration: 60, price: 45 },
    ],
    availability: {
      '2025-01-15': ['08:00', '09:00', '10:00', '13:00', '14:00'],
      '2025-01-16': ['09:00', '11:00', '12:00', '15:00', '16:00'],
      '2025-01-17': ['08:00', '09:00', '13:00', '14:00', '15:00'],
    },
  },
  {
    id: '3',
    name: 'Luxury Grooming Lounge',
    address: '789 Pine St, Uptown',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
    rating: 4.9,
    ownerId: '2',
    services: [
      { id: 's7', name: 'Executive Package', duration: 90, price: 75 },
      { id: 's8', name: 'Mustache Styling', duration: 15, price: 12 },
      { id: 's9', name: 'Scalp Treatment', duration: 45, price: 38 },
    ],
    availability: {
      '2025-01-15': ['10:00', '12:00', '14:00', '16:00'],
      '2025-01-16': ['09:00', '11:00', '13:00', '15:00'],
      '2025-01-17': ['10:00', '12:00', '14:00', '16:00', '18:00'],
    },
  },
];

export const StationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stations, setStations] = useState<Station[]>(mockStations);

  const getStation = (id: string): Station | undefined => {
    return stations.find(station => station.id === id);
  };

  const updateStationAvailability = (stationId: string, date: string, slots: string[]) => {
    setStations(prev => 
      prev.map(station => 
        station.id === stationId
          ? {
              ...station,
              availability: {
                ...station.availability,
                [date]: slots,
              },
            }
          : station
      )
    );
  };

  const getUserStations = (userId: string): Station[] => {
    return stations.filter(station => station.ownerId === userId);
  };

  return (
    <StationContext.Provider value={{
      stations,
      getStation,
      updateStationAvailability,
      getUserStations,
    }}>
      {children}
    </StationContext.Provider>
  );
};