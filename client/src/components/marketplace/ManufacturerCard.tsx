import React from 'react';
import { Manufacturer } from '../../types/marketplace';

interface ManufacturerCardProps {
  manufacturer: Manufacturer;
  onSelect: (id: string) => void;
}

export function ManufacturerCard({ manufacturer, onSelect }: ManufacturerCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => onSelect(manufacturer.id)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{manufacturer.name}</h3>
          <div 
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              manufacturer.status === 'available' 
                ? 'bg-green-100 text-green-800' 
                : manufacturer.status === 'busy' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-gray-100 text-gray-800'
            }`}
          >
            {manufacturer.status.charAt(0).toUpperCase() + manufacturer.status.slice(1)}
          </div>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          <div className="flex items-center">
            <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {manufacturer.location}
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600 line-clamp-2">{manufacturer.description}</p>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center">
            <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-900">{manufacturer.rating}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Specialties</div>
          <div className="mt-1 flex flex-wrap gap-1">
            {manufacturer.specialties.slice(0, 3).map((specialty, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {specialty}
              </span>
            ))}
            {manufacturer.specialties.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                +{manufacturer.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium text-gray-500">Min. Order</div>
            <div>{manufacturer.minOrderQuantity} pcs</div>
          </div>
          <div>
            <div className="font-medium text-gray-500">Lead Time</div>
            <div>{manufacturer.leadTimeInDays} days</div>
          </div>
        </div>
        
        <div className="mt-6">
          <button 
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(manufacturer.id);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}