import { describe, test, vi, expect } from 'vitest'
import { DB } from '../../src/infra/database/connection'
import { DynamoDB } from '@aws-sdk/client-dynamodb'

describe('DB Test', () => {
    test('Client-DB should be a instance of DynamoDB', () => {
        const db = new DB()
        expect(db.client).toBeInstanceOf(DynamoDB)
    })
})