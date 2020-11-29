## Task 7

### What is done:
- 1 - authorization-service is added to the repo, has correct basicAuthorizer lambda and correct serverless.yaml file
- 3 - import-service serverless.yaml file has authorizer configuration for the importProductsFile lambda. Request to the importProductsFile lambda should work only with correct authorization_token being decoded and checked by basicAuthorizer lambda. Response should be in 403 HTTP status if access is denied for this user (invalid authorization_token) and in 401 HTTP status if Authorization header is not provided.
- 5 - update client application to send Authorization: Basic authorization_token header on import. Client should get authorization_token value from browser localStorage https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage authorization_token = localStorage.getItem('authorization_token')

#### Additional tasks:
- +1 - Client application should display alerts for the responses in 401 and 403 HTTP statuses. This behavior should be added to the nodejs-aws-fe-main/src/index.tsx file

Import products endpoint [https://rsipotklc8.execute-api.eu-west-1.amazonaws.com/dev/import?name=abc.csv](https://rsipotklc8.execute-api.eu-west-1.amazonaws.com/dev/import?name=abc.csv)

FE Repository PR [https://github.com/stsepchanka/nodejs-aws-fe/pull/4](https://github.com/stsepchanka/nodejs-aws-fe/pull/4)

FE [https://d310rchd4cv01e.cloudfront.net/admin/products](https://d310rchd4cv01e.cloudfront.net/admin/products)

Please add to the local storage the variable with
key: authorization_token
value: U1RTRVBDSEFOS0E6VEVTVF9QQVNTV09SRA==
