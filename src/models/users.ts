import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../schema";

interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
}

export const getAllUsers = async () => {
  return await db.query.users.findMany();
};

export const getUserById = async (userId: number) => {
  return await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
};

export const addNewUser = async (newUser: User) => {
  return await db.insert(users).values(newUser);
};

export const updateUserByID = async (
  userId: number,
  updateUser: Partial<User>
) => {
  return await db.update(users).set(updateUser).where(eq(users.id, userId));
};

export const deleteUserById = async (userId: number) => {
  await db.delete(users).where(eq(users.id, userId));
};
