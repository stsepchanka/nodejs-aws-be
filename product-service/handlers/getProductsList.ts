import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { getProducts } from "../data/getProducts";

export const getProductsList: APIGatewayProxyHandler = async () => {
  try {
    const data = await getProducts();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "File read error" }),
    };
  }
};
