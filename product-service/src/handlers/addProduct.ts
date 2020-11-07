import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { Book, insertBook, validBookData } from "../repositories/book";
import { response } from "./../response";

export const addProduct: APIGatewayProxyHandler = async (event, _context) => {
  try {
    console.log("Request Path: ", event.path);
    console.log("Request Body: ", event.body);
    console.log("Request Time: ", event.requestContext.requestTime);
    console.log("Source IP: ", event.requestContext.identity.sourceIp);

    const book = new Book(JSON.parse(event.body));

    if (!validBookData(book)) {
      return response(400, "Product data is invalid");
    }

    const productId = await insertBook(book);

    return response(200, { bookID: productId });
  } catch (error) {
    return response(500, { message: error });
  }
};
