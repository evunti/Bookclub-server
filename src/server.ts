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

interface Book {
  id: number;
  title: string;
  author: string;
}

// function NewBook(title, author) {
//   this.title = title;
//   this.author = author;
// }

// function NewBook(title, author) {
//   let bookName = new NewBook(title, author);
//   books.push(bookName);
// // }

// const createBook(book){
//   return new Promise((resolve, reject) => {
//     const newUser = {
//       // getNewId creates an updated ID
//       // for the new user
//       id: getNewId(books),
//       ...book,
//     };
//     books = [newBook, ...books];
//     resolve(newBook);
//   });
// };

export default books;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
