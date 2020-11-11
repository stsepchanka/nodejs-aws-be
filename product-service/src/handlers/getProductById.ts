import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { selectBookById, validId } from "../repositories/book";
import { response } from "./../response";

export const getProductById: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const { productId } = event.pathParameters;

    console.log("Request Path: ", event.path);
    console.log("Request Path Parameters: ", event.pathParameters);
    console.log("Request Time: ", event.requestContext.requestTime);
    console.log("Source IP: ", event.requestContext.identity.sourceIp);

    if (!validId(productId)) {
      return response(400, { message: "Product ID is invalid" });
    }

    const product = await selectBookById(productId);

    if (!product) {
      return response(404, { message: "Product is not found" });
    }

    return response(200, product);
  } catch {
    return response(500, { message: "Internal server error" });
  }
};
