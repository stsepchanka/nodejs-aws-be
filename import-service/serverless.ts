import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "import-service",
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: [
    "serverless-webpack",
    "serverless-dotenv-plugin",
    "serverless-pseudo-parameters",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    region: "eu-west-1",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "s3:ListBucket",
        Resource: `arn:aws:s3:::aws-training-import-csv`,
      },
      {
        Effect: "Allow",
        Action: "sqs:*",
        Resource: { "Fn::GetAtt": ["SQSQueue", "Arn"] },
      },
    ],
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "catalogItemsQueue",
        },
      },
      GatewayResponseDenied: {
        Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Credentials": "'true'",
          },
          ResponseType: "ACCESS_DENIED",
          RestApiId: {
            Ref: "ApiGatewayRestApi",
          },
        },
      },
      GatewayResponseUnauthorized: {
        Type: "AWS::ApiGateway::GatewayResponse",
        Properties: {
          ResponseParameters: {
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Credentials": "'true'",
          },
          ResponseType: "UNAUTHORIZED",
          RestApiId: {
            Ref: "ApiGatewayRestApi",
          },
        },
      },
    },
    Outputs: {
      QueueURL: {
        Description: "URL of Catalog Items Queue",
        Value: { Ref: "SQSQueue" },
      },
      QueueARN: {
        Description: "ARN of Catalog Items Queue",
        Value: { "Fn::GetAtt": ["SQSQueue", "Arn"] },
      },
      QueueName: {
        Description: "Name of Catalog Items Queue",
        Value: { "Fn::GetAtt": ["SQSQueue", "QueueName"] },
      },
    },
  },
  functions: {
    importProductsFile: {
      handler: "src/handlers/handler.importProductsFile",
      events: [
        {
          http: {
            method: "get",
            path: "import",
            request: {
              parameters: {
                querystrings: {
                  name: true,
                },
              },
            },
            cors: true,
            authorizer: {
              name: "basicAuthorizer",
              arn:
                "arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:authorization-service-dev-basicAuthorizer",
              resultTtlInSeconds: 0,
              identitySource: "method.request.header.Authorization",
              type: "token",
            },
          },
        },
      ],
    },
    importFileParser: {
      handler: "src/handlers/handler.importFileParser",
      events: [
        {
          s3: {
            bucket: "aws-training-import-csv",
            event: "s3:ObjectCreated:*",
            rules: [
              {
                prefix: "uploaded/",
                suffix: ".csv",
              },
            ],
            existing: true,
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
