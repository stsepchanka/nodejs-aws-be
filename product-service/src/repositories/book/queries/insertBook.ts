import { Client } from "pg";
import { Book } from "./../book.model";
import { dbOptions } from "./../db.options";

export async function insertBook(book: Book): Promise<string> {
  let client;
  try {
    client = new Client(dbOptions);
    await client.connect();
    await client.query("BEGIN");

    let queryText =
      "INSERT INTO products (title, description, price) VALUES($1, $2, $3) RETURNING id";
    const insertBookResult = await client.query(queryText, [
      book.title,
      book.description,
      book.price,
    ]);
    const bookId = insertBookResult.rows[0].id;

    queryText = "INSERT INTO stocks (product_id, count) VALUES ($1, $2)";
    await client.query(queryText, [bookId, book.count]);

    await client.query("COMMIT");

    return bookId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.end();
  }
}
