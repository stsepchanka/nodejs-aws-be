import { SQSEvent, SQSHandler } from "aws-lambda";
import * as AWS from "aws-sdk";
import "source-map-support/register";
import { Book, insertBooks, validBookData } from "../repositories/book";

const { REGION, SNS_ARN } = process.env;

export const catalogBatchProcess: SQSHandler = async (
  event: SQSEvent,
  _context
) => {
  try {
    const body = event.Records.map(({ body }) => body);

    console.log("Books from SQS ", body);

    const books: Book[] = [];
    const invalidData = [];

    body.forEach((bookData) => {
      const book = new Book(JSON.parse(bookData));

      if (validBookData(book)) {
        books.push(book);
      } else {
        invalidData.push(bookData);
      }
    });

    const bookIds = await insertBooks(books);

    console.log("Inserted bookIds", bookIds);

    const sns = new AWS.SNS({ region: REGION });

    if (books.length) {
      await sns
        .publish({
          Subject: "Added Books",
          Message: JSON.stringify(books),
          TopicArn: SNS_ARN,
          MessageAttributes: {
            dataValidity: {
              DataType: "String",
              StringValue: "valid",
            },
          },
        })
        .promise()
        .then((data) => {
          console.log(
            `Message ${JSON.stringify(books)} sent to the topic ${SNS_ARN}`
          );
          console.log("MessageID is " + data.MessageId);
        })
        .catch((err) => {
          console.error(err, err.stack);
        });
    }

    if (invalidData.length) {
      await sns
        .publish({
          Subject: "Invalid Book Data",
          Message: JSON.stringify(invalidData),
          TopicArn: SNS_ARN,
          MessageAttributes: {
            dataValidity: {
              DataType: "String",
              StringValue: "invalid",
            },
          },
        })
        .promise()
        .then((data) => {
          console.log(
            `Message ${JSON.stringify(
              invalidData
            )} sent to the topic ${SNS_ARN}`
          );
          console.log("MessageID is " + data.MessageId);
        })
        .catch((err) => {
          console.error(err, err.stack);
        });
    }
  } catch (error) {
    return console.log("Error", error);
  }
};
