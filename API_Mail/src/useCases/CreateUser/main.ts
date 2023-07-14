import { MySqlUsersRepository } from "../../repositories/implementations/MySqlUsersRepository"
import { MailTrapService } from "../../services/implementations/MailTrapService"
import { CreateUser } from "./CreateUser"
import { CreateUserController } from "./CreateUserController"

const mySqlUsersRepository = new MySqlUsersRepository()
const mailTrapService = new MailTrapService()

const createUser = new CreateUser(mySqlUsersRepository, mailTrapService)

const createUserController = new CreateUserController(createUser)

export { createUser, createUserController, mySqlUsersRepository }