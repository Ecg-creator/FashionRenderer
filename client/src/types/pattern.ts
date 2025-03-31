import { Garment } from './garment';

export interface Pattern {
  id: string;
  name: string;
  description: string;
  
  // Categories and subcategories
  primaryCategory: string; // ID of the primary category (e.g., 'ergonomic', 'technical')
  subcategory: string; // ID of the subcategory (e.g., 'ergonomic-workspace')
  
  // Additional categorization
  occasions: string[]; // IDs from occasionCategories
  
  // Pattern specifications
  measurements: {
    sizeRange: string[];
    measurementPoints: {
      name: string;
      description: string;
    }[];
  };
  
  // Pattern pieces and construction
  pieces: {
    name: string;
    description: string;
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
  }[];
  
  // Recommended materials
  recommendedMaterials: {
    type: string;
    weight: string;
    stretch: string;
    alternatives: string[];
  }[];
  
  // Technical details
  technicalDetails: {
    seams: string[];
    closures: string[];
    constructionTechniques: string[];
    finishingMethods: string[];
  };
  
  // Associated garments
  associatedGarments: Garment[];
  
  // Metadata
  tags: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  createdAt: Date;
  updatedAt: Date;
  
  // Design files and assets
  patternFiles: {
    fileType: 'pdf' | 'svg' | 'dxf' | 'ai';
    url: string;
    sizeVariant?: string;
  }[];
  
  // Instructions
  instructionSteps: {
    stepNumber: number;
    title: string;
    description: string;
    imageUrl?: string;
    tips?: string[];
  }[];
}

// Simplified pattern for listing views
export interface PatternSummary {
  id: string;
  name: string;
  description: string;
  primaryCategory: string;
  subcategory: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  thumbnailUrl: string;
  tags: string[];
}