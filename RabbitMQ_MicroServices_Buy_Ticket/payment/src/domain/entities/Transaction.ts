import { randomUUID as uuid } from 'crypto'

export class Transaction {
    private transaction_id: string
    private ticket_id: string
    private event_id: string
    private price: number
    private tid: string
    private status: string

    private constructor(props: {
        transaction_id: string
        ticket_id: string
        event_id: string
        price: number
        tid: string
        status: string
    }) {
        Object.assign(this, props)
    }

    static create(transaction: Partial<Transaction>) {
        return new Transaction({
            transaction_id: transaction.transaction_id ?? uuid(),
            ...transaction,
        })
    }
}
