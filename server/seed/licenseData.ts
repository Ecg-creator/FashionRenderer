import { db } from "../db";
import * as licenseSchema from "../../shared/licenseSchema";
import { eq } from "drizzle-orm";

// Generates a license key with a consistent format
function generateLicenseKey(prefix: string): string {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed similar looking characters
  let result = prefix + "-";
  
  // Generate 3 groups of 4 characters separated by dashes
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if (i < 2) result += "-";
  }
  
  return result;
}

// Helper function to add months to a date
function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

// Generate realistic usage data for the license
function generateUsageData(licenseId: number, activatedAt: Date, users: number) {
  const usageData: licenseSchema.NewLicenseUsageStat[] = [];
  const today = new Date();
  const daysBetween = Math.round((today.getTime() - activatedAt.getTime()) / (1000 * 60 * 60 * 24));
  
  // Generate daily usage statistics for the past 90 days or since activation, whichever is shorter
  const daysToGenerate = Math.min(daysBetween, 90);
  
  for (let i = 0; i < daysToGenerate; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - (daysToGenerate - i));
    
    // Vary the active users
    // More activity on weekdays
    const isWeekday = currentDate.getDay() > 0 && currentDate.getDay() < 6;
    const activeUsers = Math.floor(isWeekday ? 
      users * (0.6 + Math.random() * 0.4) : 
      users * (0.1 + Math.random() * 0.3));
    
    // API calls vary by day and user count
    const apiCalls = activeUsers * 25 + Math.floor(Math.random() * 100);
    
    // Storage usage increases over time
    const dayProgress = i / daysToGenerate;
    const storageUsed = Math.floor(100 + (dayProgress * 400) + (Math.random() * 50));
    
    // Transactions vary by weekday/weekend
    const transactionsProcessed = isWeekday ? 
      Math.floor(activeUsers * 0.5 + Math.random() * 10) : 
      Math.floor(activeUsers * 0.2 + Math.random() * 5);
    
    usageData.push({
      licenseId,
      date: currentDate,
      activeUsers,
      apiCalls,
      storageUsed,
      transactionsProcessed
    });
  }
  
  return usageData;
}

export async function seedLicenseData() {
  // Check if we already have license data
  const existingLicenses = await db.query.licenses.findMany({
    limit: 1
  });
  
  if (existingLicenses.length > 0) {
    console.log("License data already exists, skipping seed.");
    return;
  }
  
  console.log("Seeding license data...");
  
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1);
  const twoMonthsAgo = new Date(now);
  twoMonthsAgo.setMonth(now.getMonth() - 2);
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  
  // Create some example licenses
  const licenseData: licenseSchema.NewLicense[] = [
    {
      organizationName: "Fashion Innovators Inc.",
      contactEmail: "admin@fashioninnovators.com",
      contactName: "John Innovator",
      contactPhone: "+1-555-123-4567",
      licenseType: "enterprise",
      licenseKey: generateLicenseKey("ENT"),
      maxUsers: 50,
      activatedAt: sixMonthsAgo,
      expiresAt: addMonths(sixMonthsAgo, 12),
      status: "active",
      features: licenseSchema.licenseFeatures.enterprise.features,
      modules: licenseSchema.licenseFeatures.enterprise.modules,
      transactionHistory: [
        {
          date: sixMonthsAgo.toISOString(),
          amount: licenseSchema.licenseFeatures.enterprise.price * 12,
          type: "charge",
          description: "Annual enterprise license"
        }
      ],
      notes: "Enterprise client with custom branding requirements"
    },
    {
      organizationName: "Design Masters Studio",
      contactEmail: "info@designmasters.com",
      contactName: "Emily Designer",
      contactPhone: "+1-555-234-5678",
      licenseType: "professional",
      licenseKey: generateLicenseKey("PRO"),
      maxUsers: 10,
      activatedAt: twoMonthsAgo,
      expiresAt: addMonths(twoMonthsAgo, 12),
      status: "active",
      features: licenseSchema.licenseFeatures.professional.features,
      modules: licenseSchema.licenseFeatures.professional.modules,
      transactionHistory: [
        {
          date: twoMonthsAgo.toISOString(),
          amount: licenseSchema.licenseFeatures.professional.price * 12,
          type: "charge",
          description: "Annual professional license"
        }
      ],
      notes: "Specializes in women's fashion"
    },
    {
      organizationName: "Creative Threads Co.",
      contactEmail: "support@creativethreads.com",
      contactName: "Mike Creative",
      contactPhone: "+1-555-345-6789",
      licenseType: "basic",
      licenseKey: generateLicenseKey("BAS"),
      maxUsers: 3,
      activatedAt: oneMonthAgo,
      expiresAt: addMonths(oneMonthAgo, 6),
      status: "active",
      features: licenseSchema.licenseFeatures.basic.features,
      modules: licenseSchema.licenseFeatures.basic.modules,
      transactionHistory: [
        {
          date: oneMonthAgo.toISOString(),
          amount: licenseSchema.licenseFeatures.basic.price * 6,
          type: "charge",
          description: "6-month basic license"
        }
      ],
      notes: "Small boutique design studio"
    },
    {
      organizationName: "Garment Solutions Ltd.",
      contactEmail: "accounts@garmentsolutions.com",
      contactName: "Sarah Manufacturing",
      contactPhone: "+1-555-456-7890",
      licenseType: "manufacturer",
      licenseKey: generateLicenseKey("MFG"),
      maxUsers: 25,
      activatedAt: twoMonthsAgo,
      expiresAt: addMonths(twoMonthsAgo, 12),
      status: "active",
      features: licenseSchema.licenseFeatures.manufacturer.features,
      modules: licenseSchema.licenseFeatures.manufacturer.modules,
      transactionHistory: [
        {
          date: twoMonthsAgo.toISOString(),
          amount: licenseSchema.licenseFeatures.manufacturer.price * 12,
          type: "charge",
          description: "Annual manufacturer license"
        }
      ],
      notes: "Specializes in sportswear manufacturing"
    },
    {
      organizationName: "Fashion Academy",
      contactEmail: "dean@fashionacademy.edu",
      contactName: "Professor Styles",
      contactPhone: "+1-555-567-8901",
      licenseType: "professional",
      licenseKey: generateLicenseKey("PRO"),
      maxUsers: 30,
      activatedAt: sixMonthsAgo,
      expiresAt: addMonths(sixMonthsAgo, 12),
      status: "active",
      features: [
        ...licenseSchema.licenseFeatures.professional.features,
        "educational_resources"
      ],
      modules: [
        ...licenseSchema.licenseFeatures.professional.modules,
        "educational_resources"
      ],
      transactionHistory: [
        {
          date: sixMonthsAgo.toISOString(),
          amount: licenseSchema.licenseFeatures.professional.price * 12 * 0.5,
          type: "charge",
          description: "Annual professional license (academic discount)"
        }
      ],
      notes: "Educational institution with 50% discount"
    },
    {
      organizationName: "Boutique Designers Guild",
      contactEmail: "hello@boutiquedesigners.org",
      contactName: "Alex Boutique",
      contactPhone: "+1-555-678-9012",
      licenseType: "basic",
      licenseKey: generateLicenseKey("BAS"),
      maxUsers: 5,
      activatedAt: twoMonthsAgo,
      expiresAt: addMonths(twoMonthsAgo, 3),
      status: "trial",
      features: licenseSchema.licenseFeatures.basic.features,
      modules: licenseSchema.licenseFeatures.basic.modules,
      transactionHistory: [],
      notes: "Currently on trial period"
    },
    {
      organizationName: "Textile Trends International",
      contactEmail: "licensing@textiletrends.com",
      contactName: "Taylor Textile",
      contactPhone: "+1-555-789-0123",
      licenseType: "enterprise",
      licenseKey: generateLicenseKey("ENT"),
      maxUsers: 100,
      activatedAt: sixMonthsAgo,
      expiresAt: addMonths(sixMonthsAgo, 24),
      status: "active",
      features: [
        ...licenseSchema.licenseFeatures.enterprise.features,
        "white_label",
        "api_access_extended",
        "premium_support_24_7"
      ],
      modules: [
        ...licenseSchema.licenseFeatures.enterprise.modules,
        "custom_branding",
        "extended_api"
      ],
      transactionHistory: [
        {
          date: sixMonthsAgo.toISOString(),
          amount: licenseSchema.licenseFeatures.enterprise.price * 24 * 0.9,
          type: "charge",
          description: "2-year enterprise license (10% volume discount)"
        }
      ],
      notes: "Strategic partner with custom SLA requirements"
    }
  ];
  
  // Insert license data
  for (const license of licenseData) {
    const insertResult = await db.insert(licenseSchema.licenses).values(license).returning({ id: licenseSchema.licenses.id });
    const licenseId = insertResult[0].id;
    
    // Generate users for this license
    const userCount = license.maxUsers;
    const activeUserCount = Math.floor(userCount * (0.7 + Math.random() * 0.3));
    
    // Adding some users
    const usersData = [];
    for (let i = 0; i < activeUserCount; i++) {
      const isAdmin = i < 2; // Make the first two users admins
      
      // For user roles, we'll use the LicenseUser schema fields
      usersData.push({
        licenseId,
        userId: i + 1, // Just an ID for demo purposes
        isAdmin,
        lastLogin: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)), // Random time in the last week
        roleAssignment: {
          role: isAdmin ? "admin" : "user",
          permissions: isAdmin ? 
            ["view", "edit", "create", "delete", "manage_users"] :
            ["view", "edit", "create"]
        }
      });
    }
    
    // Insert users
    if (usersData.length > 0) {
      await db.insert(licenseSchema.licenseUsers).values(usersData);
    }
    
    // Generate usage statistics
    const usageStats = generateUsageData(licenseId, license.activatedAt, activeUserCount);
    
    // Insert usage statistics
    if (usageStats.length > 0) {
      await db.insert(licenseSchema.licenseUsageStats).values(usageStats);
    }
  }
  
  console.log(`Seeded ${licenseData.length} licenses with users and usage data`);
}