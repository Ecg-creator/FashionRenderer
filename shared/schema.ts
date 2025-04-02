import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { 
  licenses, 
  licenseUsers, 
  licenseUsageStats, 
  licenseTypeEnum, 
  licenseStatusEnum 
} from "./licenseSchema";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  companyName: text("company_name"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  lastLoginAt: timestamp("last_login_at"),
  preferences: json("preferences"),
});

// Organizations table
export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  postalCode: text("postal_code"),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  logoUrl: text("logo_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Organization Users join table
export const organizationUsers = pgTable("organization_users", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id").notNull().references(() => organizations.id),
  userId: integer("user_id").notNull().references(() => users.id),
  role: text("role").notNull().default("member"),
  isAdmin: boolean("is_admin").notNull().default(false),
  joinedAt: timestamp("joined_at").defaultNow()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  companyName: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Organization = typeof organizations.$inferSelect;
export type OrganizationUser = typeof organizationUsers.$inferSelect;

// Re-export license types
export { 
  licenses, 
  licenseUsers, 
  licenseUsageStats, 
  licenseTypeEnum, 
  licenseStatusEnum,
  licenseFeatures
} from "./licenseSchema";

export type { 
  License, 
  LicenseUser, 
  LicenseUsageStat,
  NewLicense,
  NewLicenseUser,
  NewLicenseUsageStat
} from "./licenseSchema";
