import express, { Request, Response, NextFunction } from "express";
import books from "./server";
// import cors from "cors";
const booksRouter = express.Router();

module.exports = booksRouter;

interface Book {
  id: number;
  title: string;
  author: string;
}

booksRouter.get("/", (req: Request, res: Response) => {
  res.send(books);
});

booksRouter.get("/:id", (req: Request, res: Response) => {
  const book = parseInt(req.params.id);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send();
  }
});

booksRouter.post("/", (req: Request, res: Response) => {
  const newBook: Book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

booksRouter.put("/:id", (req: Request, res: Response) => {
  const book = parseInt(req.params.id);
  const bookIndex = books.findIndex((i) => i.id === book);

  if (bookIndex !== -1) {
    books[bookIndex] = {
      id: book,
      title: req.body.title,
      author: req.body.author,
    };
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

booksRouter.delete("/:id", (req: Request, res: Response) => {
  const book = parseInt(req.params.id);
  const bookIndex = books.findIndex((i) => i.id === book);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});
