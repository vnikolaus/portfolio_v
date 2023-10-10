import AWS from 'aws-sdk'

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
})

const db = new AWS.DynamoDB.DocumentClient()
export { db }