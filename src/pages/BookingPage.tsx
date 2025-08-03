import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStations } from '../contexts/StationContext';
import { useBooking } from '../contexts/BookingContext';
import { Calendar, Clock, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const BookingPage = () => {
  const { stationId } = useParams<{ stationId: string }>();
  const navigate = useNavigate();
  const { getStation } = useStations();
  const { setBookingDetails } = useBooking();
  const [station, setStation] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (stationId) {
      const foundStation = getStation(stationId);
      setStation(foundStation);
    }
  }, [stationId, getStation]);

  if (!station) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Station not found</p>
        </div>
      </div>
    );
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isDateAvailable = (date: Date) => {
    const dateKey = formatDateKey(date);
    return station.availability[dateKey] && station.availability[dateKey].length > 0;
  };

  const handleDateSelect = (date: Date) => {
    const dateKey = formatDateKey(date);
    setSelectedDate(dateKey);
    setSelectedTime('');
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = station.services.find((s: any) => s.id === serviceId);
      return total + (service ? service.price : 0);
    }, 0);
  };

  const getTotalDuration = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = station.services.find((s: any) => s.id === serviceId);
      return total + (service ? service.duration : 0);
    }, 0);
  };

  const handleProceedToCheckout = () => {
    if (!selectedDate || !selectedTime || selectedServices.length === 0) {
      alert('Please select date, time, and at least one service');
      return;
    }

    const services = selectedServices.map(serviceId => 
      station.services.find((s: any) => s.id === serviceId)
    );

    setBookingDetails({
      stationId: station.id,
      stationName: station.name,
      date: selectedDate,
      time: selectedTime,
      services,
      totalPrice: getTotalPrice(),
    });

    navigate('/checkout');
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Station Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <img
          src={station.image}
          alt={station.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{station.name}</h1>
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-lg font-medium">{station.rating}</span>
            </div>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{station.address}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Services Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Select Services</h2>
            <div className="space-y-3">
              {station.services.map((service: any) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedServices.includes(service.id)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {service.duration}min
                        </span>
                        <span className="font-medium text-purple-600">${service.price}</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedServices.includes(service.id)
                        ? 'bg-purple-500 border-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedServices.includes(service.id) && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedServices.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Total Duration:</span>
                  <span>{getTotalDuration()} minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Price:</span>
                  <span className="text-xl font-bold text-purple-600">${getTotalPrice()}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Date and Time Selection */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Select Date & Time</h2>
            
            {/* Calendar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <div key={index} className="aspect-square">
                    {day ? (
                      <button
                        onClick={() => handleDateSelect(day)}
                        disabled={!isDateAvailable(day) || day < new Date()}
                        className={`w-full h-full rounded-lg text-sm transition-all duration-200 ${
                          selectedDate === formatDateKey(day)
                            ? 'bg-purple-500 text-white'
                            : isDateAvailable(day) && day >= new Date()
                            ? 'hover:bg-purple-100 bg-gray-50'
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {day.getDate()}
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div>
                <h3 className="text-lg font-medium mb-4">Available Times</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {station.availability[selectedDate]?.map((time: string) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedTime === time
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 hover:bg-purple-100 text-gray-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Proceed Button */}
            {selectedDate && selectedTime && selectedServices.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout - ${getTotalPrice()}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;