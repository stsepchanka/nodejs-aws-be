import { importProductsFile } from "./importProductsFile";
import { APIGatewayProxyEvent } from "aws-lambda";

const AWS = require("aws-sdk");

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

test("importProductsFile should return a response with status code 400 if there is no query parameter in the url", async () => {
  event.queryStringParameters = {};

  const expected = {
    statusCode: 400,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify({ message: "Incorrect file" }),
  };

  const response = await importProductsFile(event, null, null);

  expect(response).toEqual(expected);
});

test("importProductsFile should return a response with status code 400 if there is a wrong file type in the url", async () => {
  event.queryStringParameters = { name: "file.withWrongType" };

  const expected = {
    statusCode: 400,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify({ message: "Incorrect file" }),
  };

  const response = await importProductsFile(event, null, null);

  expect(response).toEqual(expected);
});

test("importProductsFile should return a response with status code 200", async () => {
  event.queryStringParameters = { name: "file.csv" };

  const mockSignedUrl = "mock signed url";

  AWS.S3 = jest.fn().mockImplementation(() => ({
    getSignedUrlPromise: () => Promise.resolve(mockSignedUrl),
  }));

  const expected = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify(mockSignedUrl),
  };

  const response = await importProductsFile(event, null, null);

  expect(response).toEqual(expected);
});
