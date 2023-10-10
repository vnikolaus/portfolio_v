import { conn } from "../../database/connection";
import { IMySqlProps } from "./IMySqlProps";
import { ITokensRepository } from "../ITokensRepository";

export class MySqlTokensRepository implements ITokensRepository {
    async findByLogin(login: string): Promise<IMySqlProps> {
        const [ data ] = await conn.query(`SELECT * FROM _usersapi WHERE login = ?`, [login])
        return data
    }

    async findByID(id: string): Promise<IMySqlProps> {
        const [ data ] = await conn.query(`SELECT * FROM _usersapi WHERE id = ?`, [id])
        return data
    }
}