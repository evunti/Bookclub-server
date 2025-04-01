import { db } from "./db";
import { books } from "./schema";

async function main() {
  await db.insert(books).values([
    {
      title: "Educated",
      author: "Tara Westover",
      pages: 320,
    },
    {
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
    },
  ]);
}

main();
