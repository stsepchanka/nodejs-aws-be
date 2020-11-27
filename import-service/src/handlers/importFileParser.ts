import { S3Event, S3Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import * as csv from "csv-parser";
import "source-map-support/register";

const { IMPORT_BUCKET_NAME, IMPORT_BUCKET_REGION, SQS_URL } = process.env;

export const importFileParser: S3Handler = (event: S3Event) => {
  const s3 = new AWS.S3({ region: IMPORT_BUCKET_REGION });
  const sqs = new AWS.SQS();

  event.Records.forEach((record) => {
    let objectKey = record.s3.object.key;

    const s3Stream = s3
      .getObject({
        Bucket: IMPORT_BUCKET_NAME,
        Key: objectKey,
      })
      .createReadStream();

    s3Stream
      .pipe(csv())
      .on("data", (data) => {
        sqs.sendMessage(
          {
            QueueUrl: SQS_URL,
            MessageBody: JSON.stringify(data),
          },
          () => {
            console.log("Send data", data);
          }
        );
      })
      .on("end", async () => {
        console.log(`Copy from ${IMPORT_BUCKET_NAME}/${objectKey}`);

        const objectNewKey = objectKey.replace("uploaded", "parsed");

        await s3
          .copyObject({
            Bucket: IMPORT_BUCKET_NAME,
            CopySource: `${IMPORT_BUCKET_NAME}/${objectKey}`,
            Key: objectNewKey,
          })
          .promise();

        console.log(`Copied into ${IMPORT_BUCKET_NAME}/${objectNewKey}`);

        await s3
          .deleteObject({
            Bucket: IMPORT_BUCKET_NAME,
            Key: objectKey,
          })
          .promise();

        console.log(`Deleted ${IMPORT_BUCKET_NAME}/${objectKey}`);
      });
  });
};
