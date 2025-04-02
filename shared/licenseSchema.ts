import { pgTable, text, serial, integer, timestamp, jsonb, pgEnum, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Define license types enum
export const licenseTypeEnum = pgEnum('license_type', [
  'basic',
  'professional',
  'enterprise',
  'supplier',
  'manufacturer',
  'academic'
]);

// Define license status enum
export const licenseStatusEnum = pgEnum('license_status', [
  'active',
  'expired',
  'trial',
  'suspended',
  'cancelled'
]);

// Licenses table
export const licenses = pgTable('licenses', {
  id: serial('id').primaryKey(),
  licenseKey: text('license_key').notNull().unique(),
  licenseType: licenseTypeEnum('license_type').notNull(),
  status: licenseStatusEnum('status').notNull().default('active'),
  organizationName: text('organization_name').notNull(),
  contactName: text('contact_name'),
  contactEmail: text('contact_email'),
  contactPhone: text('contact_phone'),
  activatedAt: timestamp('activated_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
  maxUsers: integer('max_users').default(1),
  currentUsers: integer('current_users').default(0),
  features: jsonb('features').$type<string[]>().default([]),
  modules: jsonb('modules').$type<string[]>().default([]),
  transactionHistory: jsonb('transaction_history').$type<{
    date: string,
    amount: number,
    type: 'charge' | 'refund' | 'credit',
    description: string
  }[]>().default([]),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// License users table
export const licenseUsers = pgTable('license_users', {
  id: serial('id').primaryKey(),
  licenseId: integer('license_id').notNull().references(() => licenses.id),
  userId: integer('user_id').notNull(),
  isAdmin: boolean('is_admin').notNull().default(false),
  roleAssignment: jsonb('role_assignment').$type<{
    role: string,
    permissions: string[]
  }>(),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// License usage statistics table
export const licenseUsageStats = pgTable('license_usage_stats', {
  id: serial('id').primaryKey(),
  licenseId: integer('license_id').notNull().references(() => licenses.id),
  date: timestamp('date').notNull().defaultNow(),
  activeUsers: integer('active_users').default(0),
  apiCalls: integer('api_calls').default(0),
  storageUsed: integer('storage_used').default(0), // in MB
  transactionsProcessed: integer('transactions_processed').default(0)
});

// Create Zod schemas for validation
export const insertLicenseSchema = createInsertSchema(licenses);
export const selectLicenseSchema = createSelectSchema(licenses);

export const insertLicenseUsageStatsSchema = createInsertSchema(licenseUsageStats);
export const selectLicenseUsageStatsSchema = createSelectSchema(licenseUsageStats);

export const insertLicenseUserSchema = createInsertSchema(licenseUsers);
export const selectLicenseUserSchema = createSelectSchema(licenseUsers);

// Export types
export type License = typeof licenses.$inferSelect;
export type NewLicense = typeof licenses.$inferInsert;

export type LicenseUsageStat = typeof licenseUsageStats.$inferSelect;
export type NewLicenseUsageStat = typeof licenseUsageStats.$inferInsert;

export type LicenseUser = typeof licenseUsers.$inferSelect;
export type NewLicenseUser = typeof licenseUsers.$inferInsert;

// Define license features for each tier
export const licenseFeatures = {
  basic: {
    price: 99, // Monthly price
    features: [
      'design_basic',
      'pattern_library_limited',
      'marketplace_access',
      'material_library_view',
      'hsn_code_lookup_limited'
    ],
    modules: [
      'garment_designer',
      'pattern_marketplace'
    ]
  },
  professional: {
    price: 299, // Monthly price
    features: [
      'design_advanced',
      'pattern_library_full',
      'marketplace_access',
      'marketplace_selling',
      'material_library_full',
      'hsn_code_lookup_full',
      'technical_specifications',
      'size_grading',
      'api_access_limited'
    ],
    modules: [
      'garment_designer',
      'pattern_marketplace',
      'material_library',
      'hsn_integration',
      'technical_specifications'
    ]
  },
  enterprise: {
    price: 999, // Monthly price
    features: [
      'design_advanced',
      'pattern_library_full',
      'marketplace_access',
      'marketplace_selling',
      'material_library_full',
      'hsn_code_lookup_full',
      'technical_specifications',
      'size_grading',
      'api_access_full',
      'team_collaboration',
      'workflow_automation',
      'custom_integrations',
      'advanced_analytics',
      'priority_support',
      'white_label'
    ],
    modules: [
      'garment_designer',
      'pattern_marketplace',
      'material_library',
      'hsn_integration',
      'technical_specifications',
      'team_collaboration',
      'workflow_automation',
      'analytics_dashboard',
      'api_gateway',
      'integration_hub'
    ]
  },
  supplier: {
    price: 399, // Monthly price
    features: [
      'material_library_full',
      'material_management',
      'marketplace_selling',
      'hsn_code_lookup_full',
      'technical_specifications',
      'api_access_limited',
      'order_management',
      'logistics_integration'
    ],
    modules: [
      'material_library',
      'material_management',
      'marketplace_supplier',
      'hsn_integration',
      'technical_specifications',
      'order_management',
      'logistics_integration'
    ]
  },
  manufacturer: {
    price: 599, // Monthly price
    features: [
      'design_view',
      'pattern_library_full',
      'material_library_full',
      'hsn_code_lookup_full',
      'technical_specifications',
      'production_planning',
      'quality_control',
      'api_access_limited',
      'order_management',
      'logistics_integration'
    ],
    modules: [
      'pattern_viewer',
      'material_library',
      'hsn_integration',
      'technical_specifications',
      'production_management',
      'quality_control',
      'order_management',
      'logistics_integration'
    ]
  },
  academic: {
    price: 49, // Monthly price
    features: [
      'design_basic',
      'pattern_library_limited',
      'marketplace_access',
      'material_library_view',
      'hsn_code_lookup_limited',
      'educational_resources'
    ],
    modules: [
      'garment_designer',
      'pattern_marketplace',
      'material_library',
      'educational_resources'
    ]
  }
};