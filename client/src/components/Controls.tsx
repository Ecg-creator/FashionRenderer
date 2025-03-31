import { FiZoomIn, FiZoomOut, FiRefreshCw, FiCrosshair } from 'react-icons/fi';
import { useState, useCallback } from 'react';
import { useGarment } from '@/lib/stores/useGarment';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { create } from 'zustand';

// Create a store to manage control state outside of React Three Fiber
interface ControlsStore {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  setOrbitControls: (controls: any) => void;
  orbitControls: any;
}

export const useControlsStore = create<ControlsStore>((set, get) => ({
  orbitControls: null,
  setOrbitControls: (controls) => set({ orbitControls: controls }),
  zoomIn: () => {
    const { orbitControls } = get();
    if (orbitControls) {
      const newZoom = Math.max(orbitControls.getDistance() - 0.5, 1);
      orbitControls.dollyTo(newZoom, true);
    }
  },
  zoomOut: () => {
    const { orbitControls } = get();
    if (orbitControls) {
      const newZoom = Math.min(orbitControls.getDistance() + 0.5, 10);
      orbitControls.dollyTo(newZoom, true);
    }
  },
  reset: () => {
    const { orbitControls } = get();
    if (orbitControls) {
      orbitControls.reset();
    }
  }
}));

const Controls = () => {
  const { initialized } = useGarment();
  const { zoomIn, zoomOut, reset } = useControlsStore();
  const [measureMode, setMeasureMode] = useState(false);
  
  const handleZoomIn = useCallback(() => {
    zoomIn();
  }, [zoomIn]);
  
  const handleZoomOut = useCallback(() => {
    zoomOut();
  }, [zoomOut]);
  
  const handleReset = useCallback(() => {
    reset();
  }, [reset]);
  
  const toggleMeasureMode = useCallback(() => {
    setMeasureMode(prev => !prev);
  }, []);
  
  if (!initialized) return null;
  
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md">
      <Button 
        onClick={handleZoomIn} 
        variant="outline" 
        size="icon" 
        className="rounded-full h-10 w-10 bg-white/90 text-[#0047AB] hover:bg-[#0047AB] hover:text-white"
        aria-label="Zoom in"
      >
        <FiZoomIn className="h-5 w-5" />
      </Button>
      
      <Button 
        onClick={handleZoomOut}
        variant="outline" 
        size="icon"
        className="rounded-full h-10 w-10 bg-white/90 text-[#0047AB] hover:bg-[#0047AB] hover:text-white"
        aria-label="Zoom out"
      >
        <FiZoomOut className="h-5 w-5" />
      </Button>
      
      <Button 
        onClick={handleReset}
        variant="outline" 
        size="icon"
        className="rounded-full h-10 w-10 bg-white/90 text-[#0047AB] hover:bg-[#0047AB] hover:text-white"
        aria-label="Reset view"
      >
        <FiRefreshCw className="h-5 w-5" />
      </Button>
      
      <Button 
        onClick={toggleMeasureMode}
        variant="outline" 
        size="icon"
        className={cn(
          "rounded-full h-10 w-10 bg-white/90 text-[#0047AB] hover:bg-[#0047AB] hover:text-white",
          measureMode && "bg-[#0047AB] text-white"
        )}
        aria-label="Measure mode"
      >
        <FiCrosshair className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Controls;
