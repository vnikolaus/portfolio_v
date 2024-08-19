import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../../../domain/entities/User'
import { UserSchema } from '../../database/schemas/User.schema'

@Injectable()
export class UserRepositoryService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserSchema>) {}

    async save(user: User) {
        const persistencyData = {
            ...user,
            email: user.email.content,
            pwd: user.pwd.content,
        }
        return await new this.userModel(persistencyData).save()
    }

    async find() {
        return this.userModel.find()
    }

    async findOne(email: string) {
        return this.userModel.findOne({ email })
    }
}
