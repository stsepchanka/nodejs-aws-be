import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { getProducts } from "../data/getProducts";

export const getProductById: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  try {
    const { productId } = event.pathParameters;
    const data = await getProducts();
    const product = data.find((item) => item.id === productId);

    if (!product) {
      throw "Product is not found";
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(product),
    };
  } catch (errorMessage) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: errorMessage }),
    };
  }
};
