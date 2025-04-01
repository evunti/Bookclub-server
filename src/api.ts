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

booksRouter.post("/:id", (req: Request, res: Response) => {
  const book = parseInt(req.params.id);
  const bookIndex = books.findIndex((i) => i.id === book);
  if (book !== -1) {
  }
});

booksRouter.put("/", (req: Request, res: Response) => {});

booksRouter.delete("/:id", (req: Request, res: Response) => {});
