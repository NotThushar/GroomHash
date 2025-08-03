import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStations } from '../contexts/StationContext';
import { Star, MapPin, Filter, Search } from 'lucide-react';

const StationsPage = () => {
  const { stations } = useStations();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filteredStations = stations
    .filter(station =>
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') {
        const aMinPrice = Math.min(...a.services.map(s => s.price));
        const bMinPrice = Math.min(...b.services.map(s => s.price));
        return aMinPrice - bMinPrice;
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Grooming Stations</h1>
        <p className="text-gray-600">
          Discover and book at premium grooming stations in your area
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search stations or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="rating">Highest Rated</option>
                <option value="price">Lowest Price</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStations.map((station) => (
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
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Services:</h4>
                <div className="space-y-1">
                  {station.services.slice(0, 2).map((service) => (
                    <div key={service.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{service.name}</span>
                      <span className="font-medium">${service.price}</span>
                    </div>
                  ))}
                  {station.services.length > 2 && (
                    <p className="text-sm text-gray-500">
                      +{station.services.length - 2} more services
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  From ${Math.min(...station.services.map(s => s.price))}
                </span>
                <Link
                  to={`/book/${station.id}`}
                  className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-teal-700 transition-all duration-200 font-medium"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No stations found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StationsPage;