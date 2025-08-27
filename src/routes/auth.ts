import { Router } from "express";
import { db } from "../db";
import { users } from "../schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { username, password, isAdmin } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  try {
    // Check for existing username or email
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .get();
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }
    if (req.body.email) {
      const existingEmail = await db
        .select()
        .from(users)
        .where(eq(users.email, req.body.email))
        .get();
      if (existingEmail) {
        return res.status(409).json({ error: "Email already exists" });
      }
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await db.insert(users).values({
      username,
      passwordHash,
      isAdmin: isAdmin ? 1 : 0,
      email: req.body.email || "",
    });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Login
const SECRET_KEY = "your_secret_key"; // Replace with a secure key

export const generateToken = (userId: string | number) => {
  return jwt.sign({ userId: userId.toString() }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

authRouter.post("/login", async (req, res) => {
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

    // Generate JWT
    const token = generateToken(user.id);

    res.json({
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
      token, // Include token in response
    });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

export { authRouter };

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"] as string;
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    (req as any).user = verified; // Use 'any' to avoid type errors for custom properties
    next();
  } catch (error) {
    res.status(403).send("Invalid Token");
  }
};
