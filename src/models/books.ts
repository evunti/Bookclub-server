import { eq } from "drizzle-orm";
import { db } from "../db";
import { books } from "../schema";

interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
}

export const getAllBooks = async () => {
  return await db.query.books.findMany();
};

export const getBookById = async (bookId: number) => {
  return await db.query.books.findFirst({
    where: eq(books.id, bookId),
  });
};

// export const addBookById = async () => {
//  await db.add.bookIndex.findFirst
// };

export const updateBookByID = async (bookId: number, updateBook: ) => {
  return await db.update(books)
  .set(books)
  .where(eq(books.id, bookId));
};
// do I need a seperate handler for each data type within the book?
export const deleteBookById = async (bookId: number) => {
  await db.delete(books).where(eq(books.id, bookId));
};
