import {
  APIGatewayTokenAuthorizerEvent,
  Callback,
  Context,
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerHandler,
} from "aws-lambda";
import "source-map-support/register";

export const basicAuthorizer: APIGatewayTokenAuthorizerHandler = (
  event: APIGatewayTokenAuthorizerEvent,
  _context: Context,
  cb: Callback<APIGatewayAuthorizerResult>
) => {
  if (event.type !== "TOKEN") {
    cb("Unauthorized");
  }

  try {
    const authorizationToken = event.authorizationToken;
    const encodedCreds = authorizationToken.split(" ")[1];
    const buff = Buffer.from(encodedCreds, "base64");
    const [username, password] = buff.toString("utf-8").split(":");

    console.log("username: ", username, ";   password: ", password);

    const storedUserPassword = process.env[username.toUpperCase()];
    const passwordOK = storedUserPassword && storedUserPassword === password;
    const effect = passwordOK ? "Allow" : "Deny";

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    cb(null, policy);
  } catch (error) {
    cb(`Unauthorized: ${error.message}`);
  }
};

const generatePolicy = (
  principalId: string,
  resource: string,
  effect: "Allow" | "Deny"
) => {
  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};
