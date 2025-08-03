import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { Calendar, Clock, MapPin, Star, Gift, CheckCircle, X, Award } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const { getBookings, cancelBooking } = useBooking();
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    setBookings(getBookings());
    
    if (location.state?.showSuccess) {
      setShowSuccess(true);
      setSuccessDetails({
        bookingId: location.state.bookingId,
        nftMinted: location.state.nftMinted,
      });
    }
  }, [location.state, getBookings]);

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
      setBookings(getBookings());
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-6">
                Your booking has been successfully confirmed. You'll receive an email confirmation shortly.
              </p>
              
              {successDetails?.nftMinted && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Gift className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold text-purple-800">NFT Collectible Minted!</span>
                  </div>
                  <p className="text-sm text-purple-600">
                    You've earned a unique NFT for this booking. Check your wallet!
                  </p>
                </div>
              )}
              
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-teal-700 transition-all duration-200"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Manage your bookings and view your grooming history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed Sessions</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => b.status === 'completed').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">NFTs Collected</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => b.nftMinted).length}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Your Bookings</h2>
        
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No bookings yet</p>
            <p className="text-gray-400">Book your first grooming session to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-lg font-semibold">{booking.stationName}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      {booking.nftMinted && (
                        <div className="flex items-center space-x-1 bg-purple-100 px-2 py-1 rounded-full">
                          <Gift className="h-3 w-3 text-purple-600" />
                          <span className="text-xs text-purple-600 font-medium">NFT</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {booking.services.map((service: any, index: number) => (
                          <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                            {service.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-purple-600">
                        ${booking.totalPrice}
                      </span>
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;