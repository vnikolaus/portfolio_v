import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/domain/User'
import { WhereProps } from './typings/types'

@Injectable()
export class RepositoriesService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async list(): Promise<User[]> {
        try {
            return await this.userModel.find()
        } catch (err) {
            throw new UnauthorizedException(err?.message)
        }
    }

    async findOne(id: string): Promise<User> {
        try {
            return await this.userModel.findById(id)
        } catch (err) {
            throw new UnauthorizedException(err?.message)
        }
    }

    async findUser(where: WhereProps): Promise<User> {
        try {
            return await this.userModel.findOne({ ...where })
        } catch (err) {
            throw new UnauthorizedException(err?.message)
        }
    }

    async create(user: User): Promise<User> {
        try {
            await this.userModel.collection.createIndex({ email: 1 }, { unique: true })

            return await new this.userModel(user).save()
        } catch (err) {
            throw new UnauthorizedException(err?.message)
        }
    }

    async update(user: Partial<User>): Promise<User> {
        try {
            if ('email' in user) {
                const findUser = await this.findUser({ email: user.email })
                if (!findUser) throw new Error(`User not defined`)

                await this.userModel.findOneAndUpdate({ email: user.email }, { ...user })

                const updatedUser: User = Object.assign(findUser, user)
                return updatedUser
            }

            throw new Error(`Invalid props`)
        } catch (err) {
            throw new UnauthorizedException(err?.message)
        }
    }

    async delete(id: string) {
        try {
            return { deleted_user: await this.userModel.findByIdAndDelete(id) }
        } catch (err) {
            throw new UnauthorizedException(err?.message)
        }
    }
}
