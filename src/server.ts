// import { createServer } from "http";
// import { handler } from "./handler";
import express, { Request, Response, NextFunction } from "express";

// import cors from "cors";
const booksRouter = require("express").Router();

module.exports = booksRouter;

const app = express();
app.use(express.json());
// app.use(cors());

const PORT = process.env.PORT || 8000;

interface Book {
  id: number;
  title: string;
  author: string;
}

const books: Book[] = [
  { id: 1, title: "Educated", author: "Tara Westover" },
  {
    id: 2,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
  },
];

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

booksRouter.put("/", (req: Request, res: Response) => {});
booksRouter.post("/:id", (req: Request, res: Response) => {});
booksRouter.delete("/:id", (req: Request, res: Response) => {});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
