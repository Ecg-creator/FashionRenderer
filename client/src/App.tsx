import { useState, useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { queryClient } from './lib/queryClient';
import GarmentViewer from './components/GarmentViewer';
import SpecificationPanel from './components/SpecificationPanel';
import MeasurementPanel from './components/MeasurementPanel';
import ColorVariationPanel from './components/ColorVariationPanel';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import { useGarment } from './lib/stores/useGarment';
import { TooltipProvider } from './components/ui/tooltip';
import { MarketplaceLayout } from './components/marketplace/MarketplaceLayout';
import { ManufacturerList } from './components/marketplace/ManufacturerList';
import { ManufacturerDetail } from './components/marketplace/ManufacturerDetail';
import { OrderList } from './components/marketplace/OrderList';
import { OrderDetail } from './components/marketplace/OrderDetail';
import { OrderRequestList } from './components/marketplace/OrderRequestList';
import { OrderRequestDetail } from './components/marketplace/OrderRequestDetail';
import NotFound from './pages/not-found';
import '@fontsource/inter';
import './index.css';

function GarmentDesigner() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const { selectedGarment } = useGarment();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#FFFFFF] text-[#2C3E50] font-['Montserrat',sans-serif]">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - specifications */}
        {isPanelOpen && (
          <div className="w-80 bg-[#F8F9FA] border-r border-gray-200 overflow-y-auto hidden md:block">
            <SpecificationPanel garment={selectedGarment} />
          </div>
        )}
      
        {/* Main viewport */}
        <div className="flex-1 relative">
          <GarmentViewer />
          <Toolbar onTogglePanel={() => setIsPanelOpen(!isPanelOpen)} />
        </div>
        
        {/* Right panels - measurements and colors */}
        {isPanelOpen && (
          <div className="w-80 bg-[#F8F9FA] border-l border-gray-200 overflow-y-auto hidden md:block">
            <MeasurementPanel garment={selectedGarment} />
            <ColorVariationPanel />
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  // Initialize the garment data when the application starts
  const { setInitialized } = useGarment();
  
  useEffect(() => {
    setInitialized(true);
  }, [setInitialized]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {/* Main garment viewer/designer route */}
            <Route path="/" element={<GarmentDesigner />} />
            
            {/* Marketplace routes */}
            <Route path="/marketplace" element={<MarketplaceLayout />}>
              <Route index element={<ManufacturerList />} />
              <Route path="manufacturer" element={<ManufacturerDetail />} />
              <Route path="orders" element={<OrderList />} />
              <Route path="order" element={<OrderDetail />} />
              <Route path="requests" element={<OrderRequestList />} />
              <Route path="request" element={<OrderRequestDetail />} />
            </Route>
            
            {/* Not found route */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
