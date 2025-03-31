import React from 'react';
import { useMarketplace } from '../../lib/stores/useMarketplace';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export function OrderRequestDetail() {
  const { selectedOrderRequest, deleteOrderRequest } = useMarketplace();
  const navigate = useNavigate();
  
  if (!selectedOrderRequest) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-gray-900">No request selected</h3>
        <p className="mt-2 text-sm text-gray-500">
          Please select a request from the list to view details.
        </p>
        <button
          onClick={() => navigate('/marketplace/requests')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Back to Requests
        </button>
      </div>
    );
  }
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this request? This cannot be undone.')) {
      deleteOrderRequest(selectedOrderRequest.id);
      navigate('/marketplace/requests');
    }
  };
  
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      {/* Header */}
      <div className="px-6 py-5 sm:px-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-gray-900">{selectedOrderRequest.garment.name}</h2>
              <span
                className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  selectedOrderRequest.status === 'draft'
                    ? 'bg-gray-100 text-gray-800'
                    : selectedOrderRequest.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : selectedOrderRequest.status === 'quoted'
                    ? 'bg-blue-100 text-blue-800'
                    : selectedOrderRequest.status === 'accepted'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {selectedOrderRequest.status.charAt(0).toUpperCase() + selectedOrderRequest.status.slice(1).replace('_', ' ')}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Request ID: {selectedOrderRequest.id}</p>
          </div>
          
          <div className="flex">
            {selectedOrderRequest.status === 'draft' && (
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Garment Details */}
      <div className="border-t border-gray-200 px-6 py-5 sm:px-8">
        <h3 className="text-lg font-medium text-gray-900">Garment Details</h3>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Type</h4>
            <p className="mt-1 text-base text-gray-900">{selectedOrderRequest.garment.type}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Description</h4>
            <p className="mt-1 text-sm text-gray-600">{selectedOrderRequest.garment.description}</p>
          </div>
        </div>
      </div>
      
      {/* Request Details */}
      <div className="border-t border-gray-200 px-6 py-5 sm:px-8">
        <h3 className="text-lg font-medium text-gray-900">Production Request Details</h3>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Quantity</h4>
            <p className="mt-1 text-base text-gray-900">{selectedOrderRequest.quantity} pieces</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Target Price</h4>
            <p className="mt-1 text-base text-gray-900">${selectedOrderRequest.targetPrice} per unit</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Deadline</h4>
            <p className="mt-1 text-base text-gray-900">{format(new Date(selectedOrderRequest.deadline), 'MMMM d, yyyy')}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Created</h4>
            <p className="mt-1 text-base text-gray-900">{format(new Date(selectedOrderRequest.createdAt), 'MMMM d, yyyy')}</p>
          </div>
        </div>
      </div>
      
      {/* Customizations */}
      <div className="border-t border-gray-200 px-6 py-5 sm:px-8">
        <h3 className="text-lg font-medium text-gray-900">Customizations</h3>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Color</h4>
            <p className="mt-1 text-base text-gray-900">{selectedOrderRequest.customizations.color || 'Not specified'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Texture/Fabric</h4>
            <p className="mt-1 text-base text-gray-900">{selectedOrderRequest.customizations.texture || 'Not specified'}</p>
          </div>
          
          <div className="sm:col-span-2">
            <h4 className="text-sm font-medium text-gray-500">Additional Notes</h4>
            <p className="mt-1 text-sm text-gray-600">
              {selectedOrderRequest.customizations.additionalNotes || 'No additional notes provided.'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="border-t border-gray-200 px-6 py-5 sm:px-8 flex justify-end">
        <button
          onClick={() => navigate('/marketplace/requests')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Requests
        </button>
      </div>
    </div>
  );
}