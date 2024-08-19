import { Email } from './Email'
import { Password } from './Password'

export class User {
    readonly email: Email
    readonly pwd: Password
    createdAt: Date
    updatedAt: Date

    private constructor(user: UserProps) {
        this.email = new Email(user.email)
        this.pwd = new Password(user.pwd)
    }

    static create(user: UserProps): User {
        const newUser = new User(user)
        newUser.createdAt = new Date()
        newUser.updatedAt = new Date()
        return newUser
    }
}

export type UserProps = {
    email: string
    pwd: string
}
