import { StoreToken } from '../useCases/StoreToken/StoreToken'
import { NextFunction,  Request, Response } from 'express'
import { mySqlTokensRepository } from '../useCases/CreateUser/main'

export default async (req: Request, res: Response, next: NextFunction) => {
    const { token_key } = req.headers
    
    try {
        const [ , token ] = String(token_key).split(' ')

        if (!token) throw new Error('User not authorized')

        const dataUser = StoreToken.validToken(token)
        const { id, login }  = dataUser;

        const qryData = await mySqlTokensRepository.findByID(id)
        const user = qryData[0]

        if(!user) throw new Error('Invalid user')

        return next()
    } catch (err) {
        return res.status(401).json({ message: err.message || 'Undentified Error' })
    }
}