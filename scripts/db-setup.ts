import { initializeDatabase } from "../server/seed/initDb";

// This is a simple script to initialize the database
// It's meant to be run once when setting up the project
console.log("Starting database initialization...");

initializeDatabase()
  .then(() => {
    console.log("Database initialization complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error initializing database:", error);
    process.exit(1);
  });