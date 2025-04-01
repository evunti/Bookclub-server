// import { createServer } from "http";
// import { handler } from "./handler";
import express, { Request, Response, NextFunction } from "express";

// import cors from "cors";
const app = express();
app.use(express.json());
// app.use(cors());
const PORT = process.env.PORT || 8000;

const books: Book[] = [
  { id: 1, title: "Educated", author: "Tara Westover" },
  {
    id: 2,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
  },
];

export default books;

interface Book {
  id: number;
  title: string;
  author: string;
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
