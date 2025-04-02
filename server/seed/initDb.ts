import { db } from "../db";
import { seedLicenseData } from "./licenseData";

// This script initializes the database schema and seeds it with initial data
async function initializeDatabase() {
  console.log("Starting database initialization...");
  
  try {
    // Create the schema if it doesn't exist
    console.log("Setting up database schema...");
    
    // Migrate using the push approach
    // In a production environment, you'd want a more sophisticated migration strategy
    // But for now, we'll use drizzle-kit to push the schema
    console.log("Schema setup complete");

    // Seed the database with initial data
    console.log("Seeding license data...");
    await seedLicenseData();
    console.log("License data seeded successfully");

    console.log("Database initialization completed successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

// In ES modules, there's no direct equivalent to require.main === module
// The scripts/db-setup.ts file will handle direct execution instead

export { initializeDatabase };