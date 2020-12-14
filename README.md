## Task 9

### What is done:
- 3 - A working and correct express application should be in the bff-service folder. Reviewer can start this application locally with any valid configuration in the .env file and this application should works as described in the task 9.1
- 5 - The bff-service should be deployed with Elastic Beanstalk. The bff-service call should be redirected to the appropriate service : product-service or CART. The response from the bff-service should be the same as if product-service or CART services were called directly.

#### Additional tasks:
- +1 - Add a cache at the bff-service level for a request to the getProductsList function of the product-service. The cache should expire in 2 minutes.
- +1 - Use NestJS to create bff-service instead of express

##### Products API
- GET http://stsepchanka-bff-api-dev.eu-west-1.elasticbeanstalk.com/products
- GET http://stsepchanka-bff-api-dev.eu-west-1.elasticbeanstalk.com/products/93478c21-e0aa-46c4-b0f4-14e7248d12bd
- POST http://stsepchanka-bff-api-dev.eu-west-1.elasticbeanstalk.com/products

##### Cart API
- GET http://stsepchanka-bff-api-dev.eu-west-1.elasticbeanstalk.com/cart
- PUT http://stsepchanka-bff-api-dev.eu-west-1.elasticbeanstalk.com/cart
