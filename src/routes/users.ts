import { Router } from "express";
import { db } from "../db";
import { users } from "../schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

const router = Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password, isAdmin } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await db.insert(users).values({
      username,
      passwordHash,
      isAdmin: isAdmin ? 1 : 0,
    });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    // Unique username error (sqlite)
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      err.code === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      return res.status(409).json({ error: "Username already exists" });
    }
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .get();
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
    res.json({ id: user.id, username: user.username, isAdmin: user.isAdmin });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
