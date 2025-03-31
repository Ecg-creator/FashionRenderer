import React, { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useMarketplace } from '../../lib/stores/useMarketplace';

export function MarketplaceLayout() {
  const { loadManufacturers } = useMarketplace();
  const location = useLocation();

  useEffect(() => {
    // Load manufacturers data when the marketplace is first visited
    loadManufacturers();
  }, [loadManufacturers]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600">Garment Platform</Link>
              </div>
              <nav className="ml-10 flex space-x-8">
                <Link 
                  to="/marketplace" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname === '/marketplace' 
                      ? 'border-blue-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Browse Manufacturers
                </Link>
                <Link 
                  to="/marketplace/orders" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname.includes('/marketplace/orders') 
                      ? 'border-blue-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  My Orders
                </Link>
                <Link 
                  to="/marketplace/requests" 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname.includes('/marketplace/requests') 
                      ? 'border-blue-500 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  My Requests
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <button className="ml-8 bg-blue-600 hover:bg-blue-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white">
                Create Production Request
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Garment Platform Manufacturing Marketplace
          </p>
        </div>
      </footer>
    </div>
  );
}