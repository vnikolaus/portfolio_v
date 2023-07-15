import { JwtPayload } from "jsonwebtoken";
import { IMySqlProps } from "./implementations/IMySqlProps";

export interface ITokensRepository {
    findByID(id: string): Promise<IMySqlProps>
    findByLogin(login: string): Promise<IMySqlProps>
}

export interface ITokenUser {
    id: number
    login: string
}