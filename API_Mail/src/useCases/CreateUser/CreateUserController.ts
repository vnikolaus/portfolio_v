import { Request, Response } from "express";
import { CreateUser } from "./CreateUser";
import { MySqlUsersRepository } from "../../repositories/implementations/MySqlUsersRepository";

export class CreateUserController {
    constructor(private createUser: CreateUser) {}
    
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        try {
            const newUser = await this.createUser.exec({ name, email, password })

            return res.status(201).send({ user: newUser })
        } catch(err) {
            return res.status(400).json({
                message: err.message || 'Unexpected error'
            })
        }
    }

    async show(req, res): Promise<Response> {
        try {
            const mySqlUsersRepository = new MySqlUsersRepository()
            const users = await mySqlUsersRepository.listUsers()

            if(!users) throw new Error('Users not found')
            
            return res.status(200).send({ users: users })
        } catch (err) {
            return res.status(400).json({ message: err.message || 'Undentified Error' })
        }

    }
}