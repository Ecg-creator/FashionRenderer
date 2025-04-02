// Declaration file for shared schema types
declare module '../../../shared/schema' {
  export interface License {
    id: number;
    licenseKey: string;
    licenseType: 'basic' | 'professional' | 'enterprise' | 'supplier' | 'manufacturer' | 'academic';
    status: 'active' | 'expired' | 'trial' | 'suspended' | 'cancelled';
    organizationName: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    activatedAt: Date;
    expiresAt: Date;
    maxUsers: number;
    currentUsers: number;
    features: string[];
    modules: string[];
    transactionHistory: {
      date: string;
      amount: number;
      type: 'charge' | 'refund' | 'credit';
      description: string;
    }[];
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface LicenseUser {
    id: number;
    licenseId: number;
    userId: number;
    isAdmin: boolean;
    roleAssignment: {
      role: string;
      permissions: string[];
    };
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface LicenseUsageStat {
    id: number;
    licenseId: number;
    date: Date;
    activeUsers: number;
    apiCalls: number;
    storageUsed: number; // in MB
    transactionsProcessed: number;
  }

  export const licenseFeatures: {
    [key: string]: {
      price: number;
      features: string[];
      modules: string[];
    };
  };
}