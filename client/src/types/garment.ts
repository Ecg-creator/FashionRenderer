export interface Garment {
  id: string;
  name: string;
  type: 'tshirt' | 'dress' | 'jacket' | string;
  description: string;
  material: {
    composition: string;
    weight: number; // g/m²
    stretch: string;
  };
  measurements: {
    size: string;
    chest: number; // cm
    waist: number; // cm
    hip: number; // cm
    length: number; // cm
    shoulder: number; // cm
    sleeve: number; // cm
  };
  construction: string[];
  careInstructions: string[];
  tags: string[];
}
