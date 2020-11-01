import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import data from "./../data/productList.json";

export const getProductsList: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(data),
  };
};
