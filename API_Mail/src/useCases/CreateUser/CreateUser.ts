import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IMailService } from "../../services/IMailService";
import { ICreateUserDTO } from "./CreateUserDTO";

export class CreateUser {
    constructor(private usersRepository: IUsersRepository, private mailService: IMailService ) {}
    
    async exec(data: ICreateUserDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

        if(userAlreadyExists[0]) throw new Error('User already exists')

        const user = new User(data)

        const userData = await this.usersRepository.save(user)
        await this.mailService.sendMail({
            to: { name: data.name, email: data.email },
            from: { name: 'Team App', email: 'teamapp@app.net' },
            subject: 'Welcome to our Aplication !',
            content: `<p>You already can login into our app !</p>`
        })

        return userData
    }
}