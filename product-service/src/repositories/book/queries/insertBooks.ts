import { Client } from "pg";
import { Book } from "../book.model";
import { dbOptions } from "../db.options";

export async function insertBooks(books: Book[]): Promise<string[]> {
  let client;
  const bookIds: string[] = [];
  try {
    client = new Client(dbOptions);
    await client.connect();
    await client.query("BEGIN");

    await Promise.all(
      books.map(async (book) => {
        let queryText =
          "INSERT INTO products (title, description, price) VALUES($1, $2, $3) RETURNING id";
        const insertBookResult = await client.query(queryText, [
          book.title,
          book.description,
          book.price,
        ]);
        const bookId = insertBookResult.rows[0].id;

        bookIds.push(bookId);

        queryText = "INSERT INTO stocks (product_id, count) VALUES ($1, $2)";
        await client.query(queryText, [bookId, book.count]);
      })
    );

    await client.query("COMMIT");

    return bookIds;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.end();
  }
}
