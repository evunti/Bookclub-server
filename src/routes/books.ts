import express, { Request, Response } from "express";
import { db } from "../db";
import { books } from "../schema";
import {
  getAllBooks,
  getBookById,
  deleteBookById,
  updateBookByID,
} from "../models/books";

const booksRouter = express.Router();

async function getBookCoverURL(
  title: string,
  author: string
): Promise<string | null> {
  const baseUrl = "https://bookcover.longitood.com/bookcover";
  const encodedTitle = encodeURIComponent(title);
  const encodedAuthor = encodeURIComponent(author);
  const imageUrl = `${baseUrl}?book_title=${encodedTitle}&author_name=${encodedAuthor}`;

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error(error);
    return null;
  }
}

booksRouter
  .route("/")
  .get(async (_: Request, res: Response) => {
    const books = await getAllBooks();
    res.send(books);
  })
  .post(async (req: Request, res: Response) => {
    try {
      const { title, author, pages } = req.body;

      if (!title || !author || !pages) {
        res.status(400).json({
          error: "Please fill out all the fields",
        });
      }

      const coverUrl = await getBookCoverURL(title, author);

      const result = await db.insert(books).values({
        title,
        author,
        pages,
        coverUrl,
      });

      res.status(201).json({
        message: "Book created successfully",
        id: result?.lastInsertRowid?.toString(),
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the book" });
    }
  });

booksRouter
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    const book = await getBookById(parseInt(req.params.id));
    if (book) {
      res.send(book);
    } else {
      res.status(404).send();
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      const bookId = parseInt(req.params.id);
      if (isNaN(bookId)) {
        res.status(400).json({ message: "Invalid book ID" });
        return;
      }

      const updatedData = req.body;
      // If coverUrl is missing but title/author are present, fetch and add it
      if (!updatedData.coverUrl && updatedData.title && updatedData.author) {
        const coverUrl = await getBookCoverURL(
          updatedData.title,
          updatedData.author
        );
        if (coverUrl) {
          updatedData.coverUrl = coverUrl;
        }
      }
      const result = await updateBookByID(bookId, updatedData);

      if (result) {
        res.status(200).json({ message: "Book updated successfully" });
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the book" });
    }
  })
  .delete(async (req, res) => {
    try {
      await deleteBookById(parseInt(req.params.id));
      res.status(200).send({ message: "Deleted Book" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Didn't delete book." });
    }
  });

export { booksRouter };
