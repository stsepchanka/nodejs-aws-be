## Task 6

### What is done:
1 - File serverless.yml contains configuration for catalogBatchProcess function
2 - File serverless.yml contains policies to allow lambda catalogBatchProcess function to interact with SNS and SQS
3 - File serverless.yml contains configuration for SQS catalogItemsQueue
4 - File serverless.yml contains configuration for SNS Topic createProductTopic and email subscription

#### Additional tasks:
+1 - catalogBatchProcess lambda is covered by unit tests (npm run test)
+1 - set a Filter Policy for SNS createProductTopic in serverless.yml (Create an additional email subscription and distribute messages to different emails depending on the filter for any product attribute)

FE [https://d310rchd4cv01e.cloudfront.net/admin/products](https://d310rchd4cv01e.cloudfront.net/admin/products)
