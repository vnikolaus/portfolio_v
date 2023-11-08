import { Schema, model } from 'mongoose'

export interface IAccount {
    number: string
    agency: string
    balance: number
    token?: Token
    pwd: Password
}

const accountSchema = new Schema<IAccount>({
    number: { type: String, required: true, unique: true },
    agency: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    token: { type: String, required: false },
    pwd: { type: String, required: true },
})

const AccountModel = model<IAccount>('Account', accountSchema)

export { AccountModel }
