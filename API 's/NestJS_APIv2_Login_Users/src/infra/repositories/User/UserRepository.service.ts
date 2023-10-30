import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../../../domain/User'

@Injectable()
export class UserRepositoryService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async save(user: User) {
        await this.userModel.collection.createIndex({ email: 1 }, { unique: true })
        const persistencyData = {
            ...user,
            email: user.email.content,
            pwd: user.pwd.content,
        }
        return await new this.userModel(persistencyData).save()
    }

    async find() {
        return await this.userModel.find()
    }

    async findOne(email: string) {
        return await this.userModel.findOne({ email })
    }
}
