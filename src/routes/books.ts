import express, { Request, Response, NextFunction } from "express";
import { db } from "../db";
import { books } from "../schema";
import {
  getAllBooks,
  getBookById,
  deleteBookById,
  updateBookByID,
} from "../models/books";

// import cors from "cors";
const booksRouter = express.Router();

interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
}

booksRouter.get("/", async (req: Request, res: Response) => {
  const books = await getAllBooks();
  res.send(books);
});

booksRouter.get("/:id", async (req: Request, res: Response) => {
  const book = await getBookById(parseInt(req.params.id));
  if (book) {
    res.send(book);
  } else {
    res.status(404).send();
  }
});
// creatbook api:
booksRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { title, author, pages } = req.body;

    if (!title || !author || !pages) {
      return res.status(400).json({
        error: "Please fill out all the fields",
      });
    }

    const result = await db.insert(books).values({
      title,
      author,
      pages,
    });

    res
      .status(201)
      .json({ message: "Book created successfully", book: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the book" });
  }
});
booksRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.id); // Extract the book ID from the URL
    if (isNaN(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" }); // Handle invalid IDs
    }

    const updatedData = req.body; // Get the updated data from the request body
    const result = await updateBookByID(bookId, updatedData); // Call the update function

    if (result) {
      return res.status(200).json({ message: "Book updated successfully" }); // Success response
    } else {
      return res.status(404).json({ message: "Book not found" }); // Book not found
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the book" }); // Handle server errors
  }
});

booksRouter.delete("/:id", async (req, res) => {
  const book = await getBookById(parseInt(req.params.id));
  if (book !== undefined) {
    const books = await getAllBooks();
    const updatedBooks = books.filter((i) => i.id !== book.id);
    res.status(204).send(updatedBooks);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

export { booksRouter };
