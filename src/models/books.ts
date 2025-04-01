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
