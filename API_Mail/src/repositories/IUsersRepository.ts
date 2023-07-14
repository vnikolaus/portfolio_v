import { User } from "../entities/User";
import { IMySqlProps } from "./implementations/IMySqlProps";

export interface IUsersRepository {
    findByEmail(email: string): Promise<IMySqlProps>
    save(user: User): Promise<IMySqlProps>
    listUsers(): Promise<IMySqlProps>
}