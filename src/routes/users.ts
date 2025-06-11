import express, { Request, Response } from "express";
import { db } from "../db";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserByID,
  addNewUser,
} from "../models/users";

const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(async (_: Request, res: Response) => {
    try {
      const allUsers = await getAllUsers();
      res.send(allUsers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const { username, email, passwordHash } = req.body;
      if (!username || !email || !passwordHash) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const newUser = { username, email, passwordHash, isAdmin: 0 };
      try {
        const result = await addNewUser(newUser);
        res.status(201).json({ message: "User created" });
      } catch (err: any) {
        if (
          err &&
          typeof err === "object" &&
          "code" in err &&
          err.code === "SQLITE_CONSTRAINT_UNIQUE"
        ) {
          return res
            .status(409)
            .json({ message: "Username or email already exists" });
        }
        console.error(err); // Log the error for debugging
        throw err;
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Failed to create user" });
    }
  });

usersRouter
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    try {
      const user = await getUserById(parseInt(req.params.id));
      if (user) {
        res.send(user);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid user ID" });
        return;
      }
      const updatedData = req.body;
      const result = await updateUserByID(userId, updatedData);
      if (result) {
        res.status(200).json({ message: "User updated successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the user" });
    }
  })
  .delete(async (req, res) => {
    try {
      await deleteUserById(parseInt(req.params.id));
      res.status(200).send({ message: "Deleted User" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Didn't delete user." });
    }
  });

export { usersRouter };
