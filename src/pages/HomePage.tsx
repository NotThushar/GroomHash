import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Shield, Zap, Award, Users, Calendar, CreditCard } from 'lucide-react';
import { useStations } from '../contexts/StationContext';

const HomePage = () => {
  const { stations } = useStations();
  const topStations = stations.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Book Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Grooming Experience
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Discover premium grooming stations, book instantly, and pay with crypto or traditional methods. 
              Experience the future of personal care.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/stations"
                className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                Find Stations Near You
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Join as Station Owner
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-pink-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-green-400 rounded-full opacity-20 animate-ping"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose GroomSpot?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of grooming with our innovative platform that combines convenience, 
              technology, and premium service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Instant Booking</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Book your slot in seconds with our intelligent availability system. 
                Real-time updates ensure you never miss your perfect time.
              </p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Crypto Payments</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Pay with Hedera crypto or traditional methods - your choice. 
                Secure, fast, and future-ready payment options.
              </p>
            </div>

            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">NFT Rewards</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Earn unique NFT collectibles with every booking. 
                Build your digital collection while looking your best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Partner Stations</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-200">Bookings Completed</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Stations Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Top-Rated Stations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most popular grooming destinations trusted by thousands of customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {topStations.map((station) => (
              <div key={station.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img
                    src={station.image}
                    alt={station.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-bold">{station.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{station.name}</h3>
                  <div className="flex items-center text-gray-600 mb-6">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{station.address}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-500">
                      From ${Math.min(...station.services.map(s => s.price))}
                    </span>
                    <Link
                      to={`/book/${station.id}`}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/stations"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              View All Stations
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting your perfect grooming experience is just three simple steps away
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Choose Your Station</h3>
              <p className="text-gray-600">Browse through our curated list of premium grooming stations and find the perfect match for your needs.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Book Your Slot</h3>
              <p className="text-gray-600">Select your preferred date, time, and services. Our real-time availability ensures you get the slot you want.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CreditCard className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Pay & Enjoy</h3>
              <p className="text-gray-600">Complete your payment with crypto or card, then enjoy your premium grooming experience and earn NFT rewards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Grooming Experience?
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Join thousands of satisfied customers who have discovered the future of personal care
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;