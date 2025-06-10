import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

// Use a single database file for both books and users
export const db = drizzle("file:book.db", {
  schema: schema,
});
