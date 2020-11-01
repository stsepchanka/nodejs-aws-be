import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import data from "./../data/productList.json";

export const getProductById: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const { productId } = event.pathParameters;
  const product = data.find((item) => item.id === productId);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
