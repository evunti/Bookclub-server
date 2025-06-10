import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const books = sqliteTable("books", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  author: text().notNull(),
  pages: int(),
  coverUrl: text(),
});

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull().unique(),
  email: text().notNull().unique(),
  password: text().notNull(),
});
