import { APIGatewayProxyHandler } from "aws-lambda";
import * as AWS from "aws-sdk";
import { response } from "./../response";

const { IMPORT_BUCKET_NAME, IMPORT_BUCKET_REGION } = process.env;

export const importProductsFile: APIGatewayProxyHandler = async (
  event,
  _context
) => {
  const name = event.queryStringParameters.name.trim();

  console.log("File name: ", name);

  if (!name || name.substr(-4).toLowerCase() !== ".csv") {
    return response(400, "Incorrect file");
  }

  const params = {
    Bucket: IMPORT_BUCKET_NAME,
    Key: `uploaded/${name}`,
    Expires: 60,
    ContentType: "text/csv",
  };

  try {
    const s3 = new AWS.S3({ region: IMPORT_BUCKET_REGION });
    const url = await s3.getSignedUrlPromise("putObject", params);

    return response(200, url);
  } catch {
    return response(500, { message: "Internal server error" });
  }
};
