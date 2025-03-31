import { create } from 'zustand';
import { garmentData } from '@/data/garmentData';
import { Garment } from '@/types/garment';

interface GarmentState {
  garments: Garment[];
  selectedGarment: Garment | undefined;
  selectedColor: string;
  selectedTexture: string;
  initialized: boolean;
  
  // Actions
  selectGarment: (id: string) => void;
  updateGarmentColor: (color: string) => void;
  updateGarmentTexture: (texture: string) => void;
  setInitialized: (value: boolean) => void;
}

export const useGarment = create<GarmentState>((set, get) => ({
  garments: garmentData,
  selectedGarment: garmentData[0] || undefined,
  selectedColor: '#0047AB', // Default blue
  selectedTexture: 'none',
  initialized: false,
  
  selectGarment: (id) => {
    const garment = get().garments.find(g => g.id === id);
    set({ selectedGarment: garment });
  },
  
  updateGarmentColor: (color) => {
    set({ selectedColor: color });
  },
  
  updateGarmentTexture: (texture) => {
    set({ selectedTexture: texture });
  },
  
  setInitialized: (value) => {
    set({ initialized: value });
  }
}));
