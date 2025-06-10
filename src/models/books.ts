import { eq } from "drizzle-orm";
import { db } from "../db";
import { books } from "../schema";

interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
  coverUrl?: string;
}

export const getAllBooks = async () => {
  return await db.query.books.findMany();
};

export const getBookById = async (bookId: number) => {
  return await db.query.books.findFirst({
    where: eq(books.id, bookId),
  });
};

export const addNewBook = async (newBook: Book) => {
  return await db.insert(books).values(newBook);
};

export const updateBookByID = async (
  bookId: number,
  updateBook: Partial<Book>
) => {
  return await db.update(books).set(updateBook).where(eq(books.id, bookId));
};

export const deleteBookById = async (bookId: number) => {
  await db.delete(books).where(eq(books.id, bookId));
};
