import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon, neonConfig } from '@neondatabase/serverless';
import * as schema from '../shared/schema';

// Get the database URL from environment variables
const databaseUrl = process.env.DATABASE_URL!;

// Configure neon to use WebSocket pooling
neonConfig.fetchConnectionCache = true;

// Create a new PostgreSQL client and Drizzle instance
const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });

console.log("Database connection established successfully");

// Enable Drizzle Studio when in development mode
if (process.env.NODE_ENV === 'development') {
  console.log('Drizzle Studio available for database management');
}