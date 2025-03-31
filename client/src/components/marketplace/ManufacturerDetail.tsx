import React, { useState } from 'react';
import { useMarketplace } from '../../lib/stores/useMarketplace';
import { useGarment } from '../../lib/stores/useGarment';
import { useNavigate } from 'react-router-dom';

export function ManufacturerDetail() {
  const { selectedManufacturer, createOrderRequest } = useMarketplace();
  const { selectedGarment } = useGarment();
  const navigate = useNavigate();
  
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [targetPrice, setTargetPrice] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [customizations, setCustomizations] = useState({
    color: '',
    texture: '',
    additionalNotes: ''
  });
  
  if (!selectedManufacturer) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-gray-900">No manufacturer selected</h3>
        <p className="mt-2 text-sm text-gray-500">
          Please select a manufacturer from the list to view details.
        </p>
        <button
          onClick={() => navigate('/marketplace')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Back to Manufacturers
        </button>
      </div>
    );
  }
  
  const handleSubmitRequest = () => {
    if (!selectedGarment) {
      alert('Please select a garment first');
      return;
    }
    
    const deadlineDate = new Date(deadline);
    
    if (isNaN(deadlineDate.getTime())) {
      alert('Please enter a valid deadline');
      return;
    }
    
    createOrderRequest(
      selectedGarment,
      customizations,
      quantity,
      targetPrice,
      deadlineDate
    );
    
    // Reset form and navigate to requests page
    setShowOrderForm(false);
    setQuantity(0);
    setTargetPrice(0);
    setDeadline('');
    setCustomizations({
      color: '',
      texture: '',
      additionalNotes: ''
    });
    
    navigate('/marketplace/requests');
  };
  
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      {/* Header */}
      <div className="px-6 py-5 sm:px-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedManufacturer.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{selectedManufacturer.location}</p>
          </div>
          <div 
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedManufacturer.status === 'available' 
                ? 'bg-green-100 text-green-800' 
                : selectedManufacturer.status === 'busy' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-gray-100 text-gray-800'
            }`}
          >
            {selectedManufacturer.status.charAt(0).toUpperCase() + selectedManufacturer.status.slice(1)}
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="border-t border-gray-200 px-6 py-5 sm:px-8">
        <h3 className="text-lg font-medium text-gray-900">About</h3>
        <p className="mt-2 text-sm text-gray-500">{selectedManufacturer.description}</p>
      </div>
      
      {/* Capabilities */}
      <div className="border-t border-gray-200 px-6 py-5 sm:px-8">
        <h3 className="text-lg font-medium text-gray-900">Capabilities</h3>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Materials */}
          <div>
            <h4 className="text-sm font-medium text-gray-500">Materials</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedManufacturer.capabilities.materials.map((material, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>
          
          {/* Techniques */}
          <div>
            <h4 className="text-sm font-medium text-gray-500">Techniques</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedManufacturer.capabilities.techniques.map((technique, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                >
                  {technique}
                </span>
              ))}
            </div>
          </div>
          
          {/* Certifications */}
          <div>
            <h4 className="text-sm font-medium text-gray-500">Certifications</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedManufacturer.capabilities.certifications.map((certification, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800"
                >
                  {certification}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Business Terms */}
      <div className="border-t border-gray-200 px-6 py-5 sm:px-8">
        <h3 className="text-lg font-medium text-gray-900">Business Terms</h3>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Minimum Order Quantity</h4>
            <p className="mt-1 text-base font-medium text-gray-900">{selectedManufacturer.minOrderQuantity} pieces</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Maximum Monthly Capacity</h4>
            <p className="mt-1 text-base font-medium text-gray-900">{selectedManufacturer.maxCapacityPerMonth} pieces</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Standard Lead Time</h4>
            <p className="mt-1 text-base font-medium text-gray-900">{selectedManufacturer.leadTimeInDays} days</p>
          </div>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="border-t border-gray-200 px-6 py-5 sm:px-8">
        <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Email</h4>
            <p className="mt-1 text-base text-blue-600">{selectedManufacturer.contactInfo.email}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Phone</h4>
            <p className="mt-1 text-base text-gray-900">{selectedManufacturer.contactInfo.phone}</p>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="border-t border-gray-200 px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:justify-end gap-4">
        <button
          onClick={() => navigate('/marketplace')}
          className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to List
        </button>
        
        <button
          onClick={() => setShowOrderForm(!showOrderForm)}
          className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {showOrderForm ? 'Cancel Request' : 'Request Production Quote'}
        </button>
      </div>
      
      {/* Order Request Form */}
      {showOrderForm && (
        <div className="border-t border-gray-200 px-6 py-5 sm:px-8">
          <h3 className="text-lg font-medium text-gray-900">Production Request</h3>
          
          {!selectedGarment ? (
            <div className="mt-4 p-4 bg-yellow-50 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">No garment selected</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Please select a garment in the main application before requesting production.</p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => navigate('/')}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                    >
                      Go to Garment Selection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <div className="sm:col-span-2">
                <label htmlFor="garment" className="block text-sm font-medium text-gray-700">
                  Selected Garment
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="garment"
                    id="garment"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                    disabled
                    value={selectedGarment.name}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="color"
                    id="color"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={customizations.color}
                    onChange={(e) => setCustomizations({ ...customizations, color: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="texture" className="block text-sm font-medium text-gray-700">
                  Texture/Fabric
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="texture"
                    id="texture"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={customizations.texture}
                    onChange={(e) => setCustomizations({ ...customizations, texture: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    min={selectedManufacturer.minOrderQuantity}
                    name="quantity"
                    id="quantity"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={quantity || ''}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Minimum: {selectedManufacturer.minOrderQuantity} pieces
                </p>
              </div>
              
              <div>
                <label htmlFor="targetPrice" className="block text-sm font-medium text-gray-700">
                  Target Price ($ per unit)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="targetPrice"
                    id="targetPrice"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={targetPrice || ''}
                    onChange={(e) => setTargetPrice(parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Target Deadline
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="additionalNotes"
                    id="additionalNotes"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={customizations.additionalNotes}
                    onChange={(e) => setCustomizations({ ...customizations, additionalNotes: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2 flex justify-end">
                <button
                  onClick={handleSubmitRequest}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}