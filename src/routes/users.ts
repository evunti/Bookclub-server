import express, { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserByID,
} from "../models/users";

const usersRouter = express.Router();

usersRouter.route("/").get(async (_: Request, res: Response) => {
  const allUsers = await getAllUsers();
  res.send(allUsers);
});

usersRouter
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    const user = await getUserById(parseInt(req.params.id));
    if (user) {
      res.send(user);
    } else {
      res.status(404).send();
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
