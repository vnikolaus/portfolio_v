import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    email: String,
    pwd: String,
    createdAt: Date,
    updatedAt: Date,
})
