import { db } from "./app/db/conn";

type ToolProps = {
    code: string,
    toolName: string,
    stock: number
}

export class ToolsRepository {
    #tableName: string = process.env.AWS_TABLE
    #db: AWS.DynamoDB.DocumentClient
    
    constructor(database: AWS.DynamoDB.DocumentClient) {
        this.#db = database
    }

    async list() {
        const params = { TableName: this.#tableName }
        
        try {
            const { Items: [ ...tools ] } = await this.#db.scan(params).promise()
            return tools
        } catch (err) {
            return { error: err?.message }
        }
    }

    async findOne(code: string) {
        const params = { 
            TableName: this.#tableName,
            FilterExpression: "code = :code",
            ExpressionAttributeValues: {
                ":code": code
            }
        }

        try {
            const findTool = await this.#db.scan(params).promise()
            return findTool
        } catch (err) {
            return { error: err?.message }
        }
    }

    async insert(data: ToolProps) {
        try {
            const params = { TableName: this.#tableName, Item: data }
            return await this.#db.put(params).promise()
        } catch (err) {
            return { error: err?.message }
        }
    }

    async delete(code: string, toolName = '') {
        const { Items: [ tool ] } = await this.findOne(code)
        toolName = tool.toolName

        try {
            const params = { TableName: this.#tableName, Key: { 'code': code, 'toolName': toolName }}
            return await this.#db.delete(params).promise()
        } catch (err) {
            return { error: err?.message }
        }
    }    
    
    async update({ code, toolName, stock }: ToolProps) {
        const params = {
            TableName: this.#tableName,
            Key: { 'code': code, 'toolName': toolName },
            UpdateExpression: 'set stock = :stock',
            ExpressionAttributeValues: { ':stock': stock },
            ReturnValues: 'UPDATED_NEW'
        }

        try {
            const { Items: [ dbTool ] } = await this.findOne(code)
            if(code === dbTool.code && toolName !== dbTool.toolName) throw new Error(`Product ${code} already exists`)

            return await this.#db.update(params).promise()
        } catch (err) {
            return { error: err?.message }
        }
    }
}