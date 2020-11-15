import { importProductsFile } from "./importProductsFile";
import { APIGatewayProxyEvent } from "aws-lambda";
import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";

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

  AWSMock.setSDKInstance(AWS);

  AWSMock.mock("S3", "getSignedUrlPromise", (action, _params) => {
    console.log("S3", "getSignedUrl", "mock called");
    return Promise.resolve(mockSignedUrl);
  });

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
