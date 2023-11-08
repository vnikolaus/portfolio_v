import { Schema, model } from 'mongoose'
import { Account } from '../../../domain/entities/Account'
import { Status } from '../../../domain/entities/Transaction'

export interface ITransaction {
    id: string
    from: Account['number']
    to: Account['number']
    amount: number
    status: Status
    createdAt: Date
}

const transactionSchema = new Schema<ITransaction>({
    id: { type: String, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, required: false, default: new Date().toLocaleDateString('pt-br') },
})

const TransactionModel = model<ITransaction>('Transaction', transactionSchema)

export { TransactionModel }
