import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { selectBookList } from "../repositories/book";
import { response } from "./../response";

export const getProductsList: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    console.log("Request Path: ", event.path);
    console.log("Request Time: ", event.requestContext.requestTime);
    console.log("Source IP: ", event.requestContext.identity.sourceIp);

    const products = await selectBookList();

    return response(200, products);
  } catch {
    return response(500, { message: "Internal server error" });
  }
};
