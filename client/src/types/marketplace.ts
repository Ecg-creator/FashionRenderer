import { Garment } from './garment';

export type ManufacturerStatus = 'available' | 'busy' | 'offline';
export type OrderStatus = 'draft' | 'pending' | 'quoted' | 'accepted' | 'in_production' | 'quality_check' | 'shipped' | 'completed' | 'cancelled';
export type ProductionMilestone = 'materials_sourced' | 'cutting' | 'sewing' | 'finishing' | 'quality_check' | 'packaging';

export interface Manufacturer {
  id: string;
  name: string;
  description: string;
  location: string;
  specialties: string[];
  minOrderQuantity: number;
  maxCapacityPerMonth: number;
  leadTimeInDays: number;
  rating: number;
  status: ManufacturerStatus;
  contactInfo: {
    email: string;
    phone: string;
  };
  capabilities: {
    materials: string[];
    techniques: string[];
    certifications: string[];
  };
}

export interface OrderRequest {
  id: string;
  customerId: string;
  garment: Garment;
  customizations: {
    color: string;
    texture: string;
    additionalNotes: string;
  };
  quantity: number;
  targetPrice: number;
  deadline: Date;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quote {
  id: string;
  orderRequestId: string;
  manufacturerId: string;
  price: number;
  estimatedDeliveryDate: Date;
  notes: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface Order {
  id: string;
  orderRequestId: string;
  quoteId: string;
  manufacturerId: string;
  customerId: string;
  garment: Garment;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  milestones: {
    milestone: ProductionMilestone;
    completed: boolean;
    completedAt?: Date;
    notes?: string;
  }[];
  paymentStatus: 'pending' | 'partial' | 'complete';
  transactions: {
    id: string;
    amount: number;
    timestamp: Date;
    type: 'deposit' | 'milestone' | 'final';
    status: 'pending' | 'completed';
    transactionHash?: string; // For blockchain-based transactions
  }[];
  shippingDetails?: {
    address: string;
    trackingNumber?: string;
    carrier?: string;
    estimatedDelivery?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  orderId: string;
  manufacturerId: string;
  customerId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
}

export interface SmartContract {
  id: string;
  orderId: string;
  contractAddress: string;
  network: string;
  status: 'created' | 'active' | 'completed' | 'disputed' | 'terminated';
  milestones: {
    milestone: ProductionMilestone;
    paymentPercentage: number;
    completed: boolean;
    verified: boolean;
    releaseTransaction?: string;
  }[];
  disputeResolution?: {
    status: 'none' | 'pending' | 'resolved' | 'failed';
    description?: string;
    resolution?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}