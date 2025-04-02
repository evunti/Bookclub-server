import express, { Request, Response, NextFunction } from "express";
import { getAllBooks, getBookById, deleteBookById } from "../models/books";

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
// booksRouter.delete(
//   "/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const bookId = parseInt(req.params.id); // Extract the book ID from the URL
//       if (isNaN(bookId)) {
//         return res.status(400).json({ message: "Invalid book ID" });
//       }

//       await deleteBookById(bookId); // Call the function to delete the book
//       res.status(204).send(); // Respond with 204 No Content if successful
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ message: "An error occurred while deleting the book" });
//     }
//   }
// );

export { booksRouter };
