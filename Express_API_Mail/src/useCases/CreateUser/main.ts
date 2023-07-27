import { MySqlUsersRepository } from "../../repositories/implementations/MySqlUsersRepository"
import { MySqlTokensRepository } from "../../repositories/implementations/MySqlTokensRepository"
import { MailTrapService } from "../../services/implementations/MailTrapService"
import { CreateUser } from "./CreateUser"
import { CreateUserController } from "./CreateUserController"
import { StoreTokenController } from "../StoreToken/StoreTokenController"

const mySqlUsersRepository = new MySqlUsersRepository()
const mySqlTokensRepository = new MySqlTokensRepository()
const mailTrapService = new MailTrapService()
const storeTokenController = new StoreTokenController()

const createUser = new CreateUser(mySqlUsersRepository, mailTrapService)

const createUserController = new CreateUserController(createUser)

export { createUser, createUserController, mySqlUsersRepository, mySqlTokensRepository, storeTokenController }