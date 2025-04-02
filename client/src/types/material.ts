export interface MaterialType {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  textureUrl?: string;
  thumbnailUrl?: string;
  color?: string;
  price?: number;
  priceUnit?: string;
  inStock: boolean;
  minimumOrder?: number;
  unit?: string;
  composition?: string;
  weight?: number;
  width?: number;
  stretch?: string;
  tags: string[];
  supplier?: {
    name: string;
    origin: string;
    leadTime: string;
  };
  properties?: {
    name: string;
    value: string;
  }[];
  specifications?: {
    name: string;
    value: string;
  }[];
  performanceData?: {
    name: string;
    value: string;
  }[];
  careInstructions?: string[];
  documents?: {
    name: string;
    url: string;
    type: string;
  }[];
  usageGuidelines?: string;
  certifications?: string[];
  sustainabilityRating?: {
    water: string;
    carbon: string;
    overall: string;
  };
  environmentalImpact?: string;
  recyclingInfo?: string;
  recommendedApplications?: string[];
  sewingDetails?: string[];
  buttonDetails?: {
    size: string;
    holes: number;
    material: string;
    finishType: string;
  };
  buttonStyles?: string[];
}

export interface MaterialCategory {
  id: string;
  name: string;
  description: string;
  subcategories?: string[];
}