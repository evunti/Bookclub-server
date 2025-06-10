import { db } from "./db";
import { books, users } from "./schema";
import bcrypt from "bcryptjs";

async function main() {
  await db.insert(books).values([
    {
      title: "Educated",
      author: "Tara Westover",
      pages: 320,
    },
    {
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
    },
  ]);

  // Seed users with hashed passwords
  const password1 = await bcrypt.hash("password123", 10);
  const password2 = await bcrypt.hash("adminpass", 10);
  await db.insert(users).values([
    {
      username: "alice",
      email: "alice@example.com",
      passwordHash: password1,
      isAdmin: 0,
    },
    {
      username: "admin",
      email: "admin@example.com",
      passwordHash: password2,
      isAdmin: 1,
    },
  ]);
}

main();
