## Task 5

1. What is done:
1 - File serverless.yml contains configuration for importProductsFile function
3 - The importProductsFile lambda function returns a correct response which can be used to upload a file into the S3 bucket
4 - Frontend application is integrated with importProductsFile lambda
5 - The importFileParser lambda function is implemented and serverless.yml contains configuration for the lambda
  
    #### Additional tasks:
+1 - async/await is used in lambda functions
+1 - At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder (move the file means that file should be 
copied into parsed folder, and then deleted from uploaded folder)

Get Signed URL [https://rsipotklc8.execute-api.eu-west-1.amazonaws.com/dev/import?name=catalog.csv](https://rsipotklc8.execute-api.eu-west-1.amazonaws.com/dev/import?name=catalog.csv)

FE [https://d310rchd4cv01e.cloudfront.net/admin/products](https://d310rchd4cv01e.cloudfront.net/admin/products)