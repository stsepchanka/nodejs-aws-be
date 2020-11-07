## Task 4

1. What is done:
  - Task 4.1 is implemented
  - TASK 4.2 is implemented
  Get Products list [zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products](zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products)
  Get Product by id [zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products/4a0e8ace-c989-48a2-8301-5e04ca92ea2d](zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products/4a0e8ace-c989-48a2-8301-5e04ca92ea2d)
  - Task 4.3 is implemented
  POST request [zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products](zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products)
  - Products from product-service are represented on Frontend
  FE [https://d310rchd4cv01e.cloudfront.net](https://d310rchd4cv01e.cloudfront.net/)
  
    #### Additional tasks:
  - POST/products lambda functions returns error 400 status code if product data is invalid
  POST request [https://zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products](https://zvpmfqknbe.execute-api.eu-west-1.amazonaws.com/dev/products)
  please try with price or count < 0 or without title
  - All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
  - All lambdas do console.log for each incoming requests and their argumentsTransaction based creation of product
