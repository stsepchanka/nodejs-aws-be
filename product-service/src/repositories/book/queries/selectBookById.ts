import { Client } from "pg";
import { Book } from "./../book.model";
import { dbOptions } from "./../db.options";

export async function selectBookById(bookId: string): Promise<Book> {
  let client;
  try {
    client = new Client(dbOptions);
    await client.connect();
    const { rows: books } = await client.query(
      `select p.*, s.count from products p left join stocks s on p.id = s.product_id where p.id = '${bookId}'`
    );
    return books[0];
  } finally {
    client.end();
  }
}
