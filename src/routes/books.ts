import express, { Request, Response, NextFunction } from "express";
import { getAllBooks, getBookById, deleteBookById } from "../models/books";

// import cors from "cors";
const booksRouter = express.Router();

interface Book {
  id: number;
  title: string;
  author: string;
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

// booksRouter.put("/:id", (req: Request, res: Response) => {
//   const book = parseInt(req.params.id);
//   const bookIndex = books.findIndex((i) => i.id === book);

//   if (bookIndex !== -1) {
//     books[bookIndex] = {
//       id: book,
//       title: req.body.title,
//       author: req.body.author,
//     };
//     res.json(books[bookIndex]);
//   } else {
//     res.status(404).json({ message: "Book not found" });
//   }
// });

// booksRouter.delete("/:id", (req: Request, res: Response) => {
//   const book = parseInt(req.params.id);
//   const bookIndex = books.findIndex((i) => i.id === book);
//   if (bookIndex !== -1) {
//     books.splice(bookIndex, 1);
//     res.status(204).send();
//   } else {
//     res.status(404).json({ message: "Book not found" });
//   }
// });

export { booksRouter };
