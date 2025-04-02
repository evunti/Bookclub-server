import { eq } from "drizzle-orm";
import { db } from "../db";
import { books } from "../schema";

interface Book {
  id: number;
  title: string;
  author: string;
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
// return await db.query.bookIndex.findFirst
// };

export const deleteBookById = async (bookId: number) => {
  await db.delete(books).where(eq(books.id, bookId));
};
