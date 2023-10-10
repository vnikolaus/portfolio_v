import { randomUUID as uuid } from 'crypto'
import { Account } from './Account'

export type Status = 'pending' | 'approved' | 'rejected'

export class Transaction {
    private id?: string
    private from: Account
    private to: Account
    private amount: number
    private status?: Status

    constructor(props: { id: string; from: Account; to: Account; amount: number; status: Status }) {
        this.status = 'pending'

        Object.assign(this, {
            id: props.id ?? uuid(),
            ...props,
            status: props.status ?? this.status,
            createdAt: new Date().toLocaleDateString('pt-br'),
        })
    }

    approve() {
        this.status = 'approved'
    }

    reject() {
        this.status = 'rejected'
    }
}
