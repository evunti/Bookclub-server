import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const db = drizzle("file:book.db", {
  schema: schema,
});

export const db = drizzle("file:users.db", {
  schema: schema,
});
