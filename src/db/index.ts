import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "";

function getDb() {
  if (!connectionString) {
    // Return typed proxy or warning in development if DATABASE_URL is not yet provided
    return null;
  }
  const client = neon(connectionString);
  return drizzle(client, { schema });
}

export const db = getDb();
export { schema };

