// import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class UserSchema {
    @Prop({ type: 'string', required: true, unique: true })
    email: string

    @Prop({ type: 'string', required: true })
    pwd: string

    @Prop({ type: Date })
    createdAt: string

    @Prop({ type: Date })
    updatedAt: string
}

export const userSchema = SchemaFactory.createForClass(UserSchema)

// METODO ALTERNATIVO
// export const UserSchema = new mongoose.Schema({
//     email: { type: 'string', required: true, unique: true },
//     pwd: { type: 'string', required: true },
//     createdAt: { type: Date, required: true },
//     updatedAt: { type: Date, required: true },
// })
