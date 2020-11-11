export class Book {
  id: string;
  title: string;
  description: string;
  price: number;
  count: number;

  constructor({ id, title = "", description, price = null, count = null }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.count = count;
  }
}
