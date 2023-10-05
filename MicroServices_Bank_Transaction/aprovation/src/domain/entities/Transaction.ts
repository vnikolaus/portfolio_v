import { randomUUID as uuid } from 'crypto'
import { Account } from './Account'

type Status = 'pending' | 'approved' | 'rejected'

export class Transaction {
    private id?: string
    private from: Account
    private to: Account
    private amount: number
    private status?: Status

    constructor(props: { id: string; from: Account; to: Account; amount: number }) {
        this.status = 'pending'

        Object.assign(this, {
            id: props.id ?? uuid(),
            ...props,
            status: this.status,
            createdAt: new Date().toLocaleDateString('pt-br'),
        })
    }

    approve() {
        this.status = 'done'
    }

    reject() {
        this.status = 'rejected'
    }
}
