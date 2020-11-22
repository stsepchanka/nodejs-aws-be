import { catalogBatchProcess } from "./catalogBatchProcess";
import * as repository from "../repositories/book";
import { SQSEvent, SQSRecord } from "aws-lambda";

const AWS = require("aws-sdk");

const { SNS_ARN } = process.env;

const booksData = [
  {
    body:
      '{"title":"AWS Book1","description":"AWS Book1 Description","price":"1","count":"1"}',
  },
  {
    body:
      '{"title":"AWS Book9","description":"AWS Book9 Description","price":"invalid price","count":"invalid count"}',
  },
] as SQSRecord[];

const validBooks: repository.Book[] = [
  {
    id: undefined,
    title: "AWS Book1",
    description: "AWS Book1 Description",
    price: 1,
    count: 1,
  },
];

const event: SQSEvent = {
  Records: booksData,
};

test("catalogBatchProcess should call sns.publish with expected properties for valid data", async () => {
  const expected = {
    Subject: "Added Books",
    Message: JSON.stringify(validBooks),
    TopicArn: SNS_ARN,
    MessageAttributes: {
      dataValidity: {
        DataType: "String",
        StringValue: "valid",
      },
    },
  };

  AWS.SNS = jest.fn().mockImplementation(() => ({
    publish: (props) => {
      expect(props).toEqual(expected);
    },
  }));

  await catalogBatchProcess(event, null, null);
});

test("catalogBatchProcess should call sns.publish with expected properties for invalid data", async () => {
  const expected = {
    Subject: "Invalid Book Data",
    Message: JSON.stringify([booksData[1]]),
    TopicArn: SNS_ARN,
    MessageAttributes: {
      dataValidity: {
        DataType: "String",
        StringValue: "invalid",
      },
    },
  };

  AWS.SNS = jest.fn().mockImplementation(() => ({
    publish: (props) => {
      expect(props).toEqual(expected);
    },
  }));

  await catalogBatchProcess(event, null, null);
});
