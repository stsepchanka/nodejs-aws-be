import { getProductsList } from "./getProductsList";
import * as data from "../data/getProducts";
import products from "../data/productList.mock.json";

let spyOnGetProducts: jest.SpyInstance;

beforeEach(() => {
  spyOnGetProducts = jest.spyOn(data, "getProducts");
});

afterEach(() => {
  spyOnGetProducts.mockReset();
});

test("getProductsList should return a response with status code 200 and products list", async () => {
  spyOnGetProducts.mockImplementation(() => Promise.resolve(products));

  const expected = {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(products),
  };

  const response = await getProductsList(null, null, null);

  expect(spyOnGetProducts.mock.calls.length).toBe(1);
  expect(response).toEqual(expected);
});

test("getProductsList should return a response with status code 500 if data was not read", async () => {
  spyOnGetProducts.mockImplementation(() => Promise.reject("some error"));

  const expected = {
    statusCode: 500,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ message: "File read error" }),
  };

  const response = await getProductsList(null, null, null);

  expect(spyOnGetProducts.mock.calls.length).toBe(1);
  expect(response).toEqual(expected);
});
