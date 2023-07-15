import { Request, Response } from "express";
import { CreateUser } from "./CreateUser";
import { mySqlUsersRepository } from "./main";

export class CreateUserController {
    constructor(private createUser: CreateUser) {}
    
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        try {
            const newUser = await this.createUser.exec({ name, email, password })
            
            if(!newUser) throw new Error('New user not found')

            return res.status(201).send({ user: newUser })
        } catch(err) {
            return res.status(400).json({
                message: err.message || 'Unexpected error'
            })
        }
    }

    async show(req: Request, res: Response): Promise<Response> {
        try {
            const users = await mySqlUsersRepository.listUsers()

            if(!users) throw new Error('Users not found')
            
            return res.status(200).send({ users: users })
        } catch (err) {
            return res.status(400).json({ message: err.message || 'Undentified Error' })
        }

    }
}