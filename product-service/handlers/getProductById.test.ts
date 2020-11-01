import { getProductById } from "./getProductById";
import * as data from "./../data/getProducts";
import products from "./../data/productList.mock.json";
import { APIGatewayProxyEvent } from "aws-lambda";

const event: APIGatewayProxyEvent = {
  body: "",
  headers: {},
  httpMethod: "GET",
  isBase64Encoded: false,
  path: "",
  pathParameters: {},
  queryStringParameters: undefined,
  stageVariables: {},
  requestContext: null,
  resource: "",
  multiValueHeaders: null,
  multiValueQueryStringParameters: null,
};

let spyOnGetProducts: jest.SpyInstance;

beforeEach(() => {
  spyOnGetProducts = jest
    .spyOn(data, "getProducts")
    .mockImplementation(() => Promise.resolve(products));
});

afterEach(() => {
  spyOnGetProducts.mockReset();
});

test("getProductById should return a response with status code 200 and product info", async () => {
  const productId = products[0].id;

  const expected = {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(products[0]),
  };

  event.pathParameters = { productId };

  const response = await getProductById(event, null, null);

  expect(spyOnGetProducts.mock.calls.length).toBe(1);
  expect(response).toEqual(expected);
});

test("getProductsList should return a response with status code 404 if data was not read", async () => {
  const productId = "some-unavailable-id";

  const expected = {
    statusCode: 404,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ message: "Product is not found" }),
  };

  event.pathParameters = { productId };

  const response = await getProductById(event, null, null);

  expect(spyOnGetProducts.mock.calls.length).toBe(1);
  expect(response).toEqual(expected);
});
