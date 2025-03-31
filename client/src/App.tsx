import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import GarmentViewer from './components/GarmentViewer';
import SpecificationPanel from './components/SpecificationPanel';
import MeasurementPanel from './components/MeasurementPanel';
import ColorVariationPanel from './components/ColorVariationPanel';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import { useGarment } from './lib/stores/useGarment';
import { TooltipProvider } from './components/ui/tooltip';
import '@fontsource/inter';
import './index.css';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const { selectedGarment } = useGarment();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
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
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
