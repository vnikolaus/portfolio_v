import { DynamoDB } from '@aws-sdk/client-dynamodb'

export class DB {
    readonly #client: DynamoDB

    constructor() {
        if (this.#client instanceof DynamoDB) return this.#client
        this.#client = new DynamoDB({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY
            }
        })
    }

    get client() {
        return this.#client
    }
}