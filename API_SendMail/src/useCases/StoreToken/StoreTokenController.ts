import { StoreToken } from './StoreToken'
import { mySqlTokensRepository } from '../CreateUser/main'
import { Request, Response } from 'express'
import { SHA1 } from 'crypto-js'

export class StoreTokenController {
    async store(req: Request, res: Response): Promise<void> {
        try {
            const data = await mySqlTokensRepository.findByLogin(req.body.login)
            const user = data[0]
            if (!user) throw new Error('User not found')

            const hashPwd = SHA1(req.body.password).toString()

            if (!req.body.login || !req.body.password) throw new Error('User needs to login')

            if (user.password !== hashPwd) throw new Error('Password is not acceptable')

            const token = StoreToken.createToken(user.id, user.login)
            
            res.status(201).send({ token: token })
        } catch (err) {
            res.status(401).json({ message: err.message || 'Undentified Error' })
        }
    }
}