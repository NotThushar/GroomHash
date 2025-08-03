import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useStations } from '../contexts/StationContext';
import { Calendar, Clock, DollarSign, Users, Star, MapPin, Settings, Plus } from 'lucide-react';

const StationDashboard = () => {
  const { user } = useAuth();
  const { getUserStations, updateStationAvailability } = useStations();
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [newTimeSlot, setNewTimeSlot] = useState('');

  const userStations = getUserStations(user?.id || '');

  const handleAddTimeSlot = () => {
    if (!selectedStation || !selectedDate || !newTimeSlot) return;
    
    const currentSlots = selectedStation.availability[selectedDate] || [];
    const updatedSlots = [...currentSlots, newTimeSlot].sort();
    
    updateStationAvailability(selectedStation.id, selectedDate, updatedSlots);
    setNewTimeSlot('');
    
    // Update local state
    setSelectedStation({
      ...selectedStation,
      availability: {
        ...selectedStation.availability,
        [selectedDate]: updatedSlots,
      },
    });
  };

  const handleRemoveTimeSlot = (date: string, time: string) => {
    if (!selectedStation) return;
    
    const currentSlots = selectedStation.availability[date] || [];
    const updatedSlots = currentSlots.filter((slot: string) => slot !== time);
    
    updateStationAvailability(selectedStation.id, date, updatedSlots);
    
    // Update local state
    setSelectedStation({
      ...selectedStation,
      availability: {
        ...selectedStation.availability,
        [date]: updatedSlots,
      },
    });
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (userStations.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Stations Found</h2>
          <p className="text-gray-600 mb-6">You don't have any stations registered yet.</p>
          <button className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-teal-700 transition-all duration-200">
            Add New Station
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Station Management</h1>
        <p className="text-gray-600">Manage your grooming stations and availability</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Station List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Stations</h2>
            <div className="space-y-3">
              {userStations.map((station) => (
                <div
                  key={station.id}
                  onClick={() => setSelectedStation(station)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedStation?.id === station.id
                      ? 'bg-purple-50 border-2 border-purple-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{station.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{station.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{station.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          {selectedStation && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Station Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600">Total Bookings</span>
                  </div>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-gray-600">Revenue</span>
                  </div>
                  <span className="font-semibold">$1,240</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-600">This Month</span>
                  </div>
                  <span className="font-semibold">12 bookings</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Station Details */}
        <div className="lg:col-span-2">
          {selectedStation ? (
            <div className="space-y-6">
              {/* Station Overview */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={selectedStation.image}
                  alt={selectedStation.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedStation.name}</h2>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{selectedStation.address}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-xl font-bold">{selectedStation.rating}</span>
                      </div>
                      <span className="text-gray-600 text-sm">Rating</span>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold mb-1">{selectedStation.services.length}</div>
                      <span className="text-gray-600 text-sm">Services</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Services Offered</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedStation.services.map((service: any) => (
                        <div key={service.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <span className="font-medium">{service.name}</span>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>{service.duration} min</span>
                            </div>
                          </div>
                          <span className="font-bold text-purple-600">${service.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Management */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-6">Manage Availability</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Choose a date</option>
                      {generateDateOptions().map((date) => (
                        <option key={date} value={date}>
                          {formatDate(date)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add Time Slot
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="time"
                        value={newTimeSlot}
                        onChange={(e) => setNewTimeSlot(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleAddTimeSlot}
                        disabled={!selectedDate || !newTimeSlot}
                        className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {selectedDate && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Available slots for {formatDate(selectedDate)}</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {(selectedStation.availability[selectedDate] || []).map((time: string) => (
                        <div
                          key={time}
                          className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg text-sm"
                        >
                          <span>{time}</span>
                          <button
                            onClick={() => handleRemoveTimeSlot(selectedDate, time)}
                            className="text-red-600 hover:text-red-700 ml-2"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    {(!selectedStation.availability[selectedDate] || selectedStation.availability[selectedDate].length === 0) && (
                      <p className="text-gray-500 text-center py-4">No time slots available</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Station</h3>
              <p className="text-gray-600">Choose a station from the left to manage its details and availability</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StationDashboard;