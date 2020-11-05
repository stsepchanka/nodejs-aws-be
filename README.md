## Task 3

1. What is done:
  - Product Service is done.
  - FE application is integrated with service.
  
    #### Additional tasks:
  - Async/await is used in lambda functions
  - ES6 modules are used for product-service implementation (was added by aws-nodejs-typescript template);
  - Webpack is configured for product-service (was added by aws-nodejs-typescript template);
  - SWAGGER documentation is created for product-service
  - Lambda handlers are covered by basic UNIT tests (NO infrastructure logic is needed to be covered) (You may use JEST)
  - Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module (file) and separated in codebase.
  - Main error scenarios are handled by API ("Product not found" error, try catch blocks are used in lambda handlers).

2. Link to product-service API
  Products list [https://zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products](https://zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products)
  Product [https://zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa](https://zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa)
  Product is not found [https://zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products/some-unavailable-id](https://zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products/some-unavailable-id)
  

3. Link to FE 
  [FE repository PR](https://github.com/stsepchanka/nodejs-aws-fe/pull/2)
  Cloudfront link [https://d310rchd4cv01e.cloudfront.net/](https://d310rchd4cv01e.cloudfront.net/).

### To run unit tests
1. cd product-service
2. npm install
3. npm run test