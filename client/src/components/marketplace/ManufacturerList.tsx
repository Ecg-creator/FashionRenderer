import React, { useState } from 'react';
import { useMarketplace } from '../../lib/stores/useMarketplace';
import { ManufacturerCard } from './ManufacturerCard';
import { ManufacturerStatus } from '../../types/marketplace';

export function ManufacturerList() {
  const { 
    filteredManufacturers, 
    manufacturerFilters, 
    filterManufacturers,
    selectManufacturer
  } = useMarketplace();
  
  const [showFilters, setShowFilters] = useState(false);
  
  // Available specialties from all manufacturers
  const allSpecialties = Array.from(
    new Set(
      filteredManufacturers.flatMap(m => m.specialties)
    )
  ).sort();
  
  // Available locations from all manufacturers
  const allLocations = Array.from(
    new Set(
      filteredManufacturers.map(m => m.location.split(',')[1]?.trim() || m.location)
    )
  ).sort();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Browse Manufacturers</h1>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg 
            className="mr-2 h-5 w-5 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </button>
      </div>
      
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Specialty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={manufacturerFilters.specialties[0] || ''}
                onChange={(e) => {
                  const specialty = e.target.value;
                  filterManufacturers({
                    specialties: specialty ? [specialty] : []
                  });
                }}
              >
                <option value="">All Specialties</option>
                {allSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={manufacturerFilters.location}
                onChange={(e) => {
                  filterManufacturers({
                    location: e.target.value
                  });
                }}
              >
                <option value="">All Locations</option>
                {allLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={manufacturerFilters.status || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  filterManufacturers({
                    status: value ? value as ManufacturerStatus : null
                  });
                }}
              >
                <option value="">All Statuses</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>
          
          {/* Rating Filter */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Rating
            </label>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={manufacturerFilters.minRating}
                onChange={(e) => {
                  filterManufacturers({
                    minRating: parseFloat(e.target.value)
                  });
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                {manufacturerFilters.minRating.toFixed(1)}
              </span>
            </div>
          </div>
          
          {/* Reset Filters Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                filterManufacturers({
                  specialties: [],
                  minRating: 0,
                  location: '',
                  status: null
                });
              }}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
      
      {filteredManufacturers.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-medium text-gray-900">No manufacturers found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your filters or check back later for new manufacturers.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredManufacturers.map((manufacturer) => (
            <ManufacturerCard 
              key={manufacturer.id} 
              manufacturer={manufacturer} 
              onSelect={selectManufacturer}
            />
          ))}
        </div>
      )}
    </div>
  );
}