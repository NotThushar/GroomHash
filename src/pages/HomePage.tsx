import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Shield, Zap, Award } from 'lucide-react';
import { useStations } from '../contexts/StationContext';

const HomePage = () => {
  const { stations } = useStations();
  const topStations = stations.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-purple-700 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Book Your Perfect
              <span className="block bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
                Grooming Experience
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Discover premium grooming stations, book instantly, and pay with crypto or traditional methods
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/stations"
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Find Stations Near You
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200"
              >
                Join as Station Owner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose GroomSpot?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of grooming with our innovative platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-200">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Booking</h3>
              <p className="text-gray-600">
                Book your slot in seconds with our intelligent availability system
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 hover:shadow-lg transition-all duration-200">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Crypto Payments</h3>
              <p className="text-gray-600">
                Pay with Hedera crypto or traditional methods - your choice
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-all duration-200">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">NFT Rewards</h3>
              <p className="text-gray-600">
                Earn unique NFT collectibles with every booking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Stations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top-Rated Stations
            </h2>
            <p className="text-xl text-gray-600">
              Discover the most popular grooming destinations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {topStations.map((station) => (
              <div key={station.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                <img
                  src={station.image}
                  alt={station.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{station.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{station.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{station.address}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      From ${Math.min(...station.services.map(s => s.price))}
                    </span>
                    <Link
                      to={`/book/${station.id}`}
                      className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-teal-700 transition-all duration-200"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/stations"
              className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View All Stations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;