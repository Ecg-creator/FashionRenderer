import React, { useState } from 'react';
import { useMarketplace } from '../../lib/stores/useMarketplace';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ProductionMilestone } from '../../types/marketplace';

export function OrderDetail() {
  const { 
    selectedOrder, 
    contracts, 
    createSmartContract,
    updateSmartContractStatus,
    verifyMilestone
  } = useMarketplace();
  
  const navigate = useNavigate();
  const [showSmartContractCreation, setShowSmartContractCreation] = useState(false);
  
  if (!selectedOrder) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-gray-900">No order selected</h3>
        <p className="mt-2 text-sm text-gray-500">
          Please select an order from the list to view details.
        </p>
        <button
          onClick={() => navigate('/marketplace/orders')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Back to Orders
        </button>
      </div>
    );
  }
  
  // Find the contract for this order, if any
  const orderContract = contracts.find(contract => contract.orderId === selectedOrder.id);
  
  const formatMilestoneName = (milestone: ProductionMilestone) => {
    return milestone.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  const handleCreateSmartContract = () => {
    if (window.confirm('Creating a smart contract will use blockchain technology to secure your order. Payments will be released in stages as milestones are completed and verified. Continue?')) {
      createSmartContract(selectedOrder.id);
      setShowSmartContractCreation(false);
    }
  };
  
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      {/* Header */}
      <div className="px-6 py-5 sm:px-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-gray-900">{selectedOrder.garment.name}</h2>
              <span
                className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  selectedOrder.status === 'accepted'
                    ? 'bg-green-100 text-green-800'
                    : selectedOrder.status === 'in_production'
                    ? 'bg-blue-100 text-blue-800'
                    : selectedOrder.status === 'quality_check'
                    ? 'bg-purple-100 text-purple-800'
                    : selectedOrder.status === 'shipped'
                    ? 'bg-indigo-100 text-indigo-800'
                    : selectedOrder.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1).replace(/_/g, ' ')}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">Order #{selectedOrder.id.substring(selectedOrder.id.length - 6)}</p>
          </div>
        </div>
      </div>
      
      {/* Overview */}
      <div className="border-t border-gray-200 px-6 py-5 sm:px-8">
        <h3 className="text-lg font-medium text-gray-900">Order Overview</h3>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Order Date</h4>
            <p className="mt-1 text-base text-gray-900">{format(new Date(selectedOrder.createdAt), 'MMMM d, yyyy')}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Quantity</h4>
            <p className="mt-1 text-base text-gray-900">{selectedOrder.quantity} pieces</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Total Price</h4>
            <p className="mt-1 text-base text-gray-900">${selectedOrder.totalPrice.toFixed(2)}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Payment Status</h4>
            <p className={`mt-1 text-base ${
              selectedOrder.paymentStatus === 'complete' 
                ? 'text-green-600' 
                : selectedOrder.paymentStatus === 'partial' 
                  ? 'text-yellow-600' 
                  : 'text-gray-900'
            }`}>
              {selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Price Per Unit</h4>
            <p className="mt-1 text-base text-gray-900">
              ${(selectedOrder.totalPrice / selectedOrder.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Progress tracker */}
      <div className="border-t border-gray-200 px-6 py-5 sm:px-8">
        <h3 className="text-lg font-medium text-gray-900">Production Progress</h3>
        
        <div className="mt-6">
          <div className="overflow-hidden">
            <ul className="-mb-8">
              {selectedOrder.milestones.map((milestone, idx) => (
                <li key={milestone.milestone}>
                  <div className="relative pb-8">
                    {idx !== selectedOrder.milestones.length - 1 && (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                          milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {milestone.completed ? (
                            <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="h-5 w-5 text-white flex items-center justify-center text-xs">
                              {idx + 1}
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-900">{formatMilestoneName(milestone.milestone as ProductionMilestone)}</p>
                          {milestone.notes && (
                            <p className="mt-1 text-xs text-gray-500">{milestone.notes}</p>
                          )}
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {milestone.completed && milestone.completedAt && (
                            <time dateTime={milestone.completedAt.toString()}>
                              {format(new Date(milestone.completedAt), 'MMM d')}
                            </time>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Smart Contract */}
      <div className="border-t border-gray-200 px-6 py-5 sm:px-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Smart Contract</h3>
          
          {!orderContract && (
            <button
              onClick={() => setShowSmartContractCreation(true)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Create Smart Contract
            </button>
          )}
        </div>
        
        {orderContract ? (
          <div className="mt-4">
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100-2h-1a1 1 0 100 2h1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-blue-700">
                    Smart contract deployed on {orderContract.network} network.
                  </p>
                  <p className="mt-3 text-sm md:mt-0 md:ml-6">
                    <a href={`https://example.org/contract/${orderContract.contractAddress}`} className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                      View on Explorer <span aria-hidden="true">&rarr;</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <h4 className="text-base font-medium text-gray-900">Contract Details</h4>
                  
                  <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Contract Address</div>
                      <div className="mt-1 text-sm text-gray-900 font-mono">{orderContract.contractAddress}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Status</div>
                      <div className="mt-1 text-sm text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          orderContract.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : orderContract.status === 'completed' 
                              ? 'bg-blue-100 text-blue-800'
                              : orderContract.status === 'disputed'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                          {orderContract.status.charAt(0).toUpperCase() + orderContract.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Schedule</h4>
                    <div className="bg-gray-50 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Milestone
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Percentage
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orderContract.milestones.map((milestone) => (
                            <tr key={milestone.milestone}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {formatMilestoneName(milestone.milestone as ProductionMilestone)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {milestone.paymentPercentage}%
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${(selectedOrder.totalPrice * (milestone.paymentPercentage / 100)).toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {milestone.verified ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Verified
                                  </span>
                                ) : milestone.completed ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Completed (Pending Verification)
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    Pending
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {milestone.completed && !milestone.verified && (
                                  <button
                                    onClick={() => verifyMilestone(orderContract!.id, milestone.milestone)}
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    Verify & Release Payment
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : showSmartContractCreation ? (
          <div className="mt-4 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <h4 className="text-base font-medium text-gray-900">Create Smart Contract</h4>
              <p className="mt-1 text-sm text-gray-500">
                A smart contract will automate payments based on production milestones and provide transparent verification.
              </p>
              
              <div className="mt-4">
                <div className="rounded-md bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Attention</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Creating a smart contract involves blockchain transactions and requires cryptocurrency for gas fees. Make sure you have a wallet set up and funded.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Blockchain Network</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>Ethereum</option>
                    <option>Polygon</option>
                    <option>Binance Smart Chain</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contract Type</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>Standard Escrow</option>
                    <option>Milestone-based Payment</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-5">
                <h5 className="text-sm font-medium text-gray-700">Default Milestone Payments</h5>
                <div className="mt-2 text-sm text-gray-500">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Materials Sourced: 10%</li>
                    <li>Cutting: 15%</li>
                    <li>Sewing: 25%</li>
                    <li>Finishing: 20%</li>
                    <li>Quality Check: 20%</li>
                    <li>Packaging: 10%</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-5 flex space-x-3">
                <button 
                  onClick={handleCreateSmartContract}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Contract
                </button>
                <button 
                  onClick={() => setShowSmartContractCreation(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">
              No smart contract has been created for this order yet. Create a smart contract to automate payments and ensure transparency throughout the manufacturing process.
            </p>
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div className="border-t border-gray-200 px-6 py-5 sm:px-8 flex justify-end">
        <button
          onClick={() => navigate('/marketplace/orders')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
}