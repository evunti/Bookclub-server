// import { createServer } from "http";
// import { handler } from "./handler";
import express, { Request, Response, NextFunction } from "express";

// import cors from "cors";
const booksRouter = require("express").Router();

module.exports = booksRouter;

const app = express();
app.use(express.json());
// app.use(cors());

const PORT = 8000;

booksRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send(getAllFromDatabase("books"));
});

booksRouter.get("/id:", (req: Request, res: Response, next: NextFunction) => {
  const book = getBookById(req.params.id, books);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send();
  }
});

booksRouter.put("/", (req: Request, res: Response, next: NextFunction) => {});
booksRouter.post(
  "/id:",
  (req: Request, res: Response, next: NextFunction) => {}
);
booksRouter.delete(
  "/id:",
  (req: Request, res: Response, next: NextFunction) => {}
);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
