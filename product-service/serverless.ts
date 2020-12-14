import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "product-service",
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
        Action: "sqs:*",
        Resource: "arn:aws:sqs:eu-west-1:895273477359:catalogItemsQueue",
      },
      {
        Effect: "Allow",
        Action: "sns:*",
        Resource: {
          Ref: "SNSTopic",
        },
      },
    ],
  },
  resources: {
    Resources: {
      SNSTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "createProductTopic",
        },
      },
      SNSSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "stsepchanka@gmail.com",
          Protocol: "email",
          TopicArn: {
            Ref: "SNSTopic",
          },
          FilterPolicy: {
            dataValidity: ["valid"],
          },
        },
      },
      SNSSubscriptionInvalidProduct: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "stsepchanka2@gmail.com",
          Protocol: "email",
          TopicArn: {
            Ref: "SNSTopic",
          },
          FilterPolicy: {
            dataValidity: ["invalid"],
          },
        },
      },
    },
  },
  functions: {
    getProductsList: {
      handler: "src/handlers/handler.getProductsList",
      events: [
        {
          http: {
            method: "get",
            path: "products",
            cors: true,
          },
        },
      ],
    },
    getProductById: {
      handler: "src/handlers/handler.getProductById",
      events: [
        {
          http: {
            method: "get",
            path: "products/{productId}",
            cors: true,
          },
        },
      ],
    },
    addProduct: {
      handler: "src/handlers/handler.addProduct",
      events: [
        {
          http: {
            method: "post",
            path: "products",
            cors: true,
          },
        },
      ],
    },
    catalogBatchProcess: {
      handler: "src/handlers/handler.catalogBatchProcess",
      events: [
        {
          sqs: {
            batchSize: 5,
            arn: "arn:aws:sqs:eu-west-1:895273477359:catalogItemsQueue",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
