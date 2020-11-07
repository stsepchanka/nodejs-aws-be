import { Book } from "../book.model";

export function validBookData(book: Book): boolean {
  return book.title.length > 0 && book.price >= 0 && book.count >= 0;
}
