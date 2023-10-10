import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { conn } from "../../database/connection";
import { IMySqlProps } from "./IMySqlProps";
import { SHA1 } from "crypto-js";

export class MySqlUsersRepository implements IUsersRepository {
    async findByEmail(email: string): Promise<IMySqlProps> {
        const [ data, fields ] = await conn.query(`SELECT * FROM users WHERE email = ?`, [email])
        return data
    }

    async save(user: User): Promise<IMySqlProps> {
        const sql = `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`
        await conn.query(sql, [
            user.id,
            user.name,
            user.email,
            SHA1(user.password).toString()
        ])

        return this.findByEmail(user.email)
    }

    async listUsers(): Promise<IMySqlProps> {
        const [ data ] = await conn.query(`SELECT name, email, created_at FROM users`)
        return data
    }

    async delete(id: string): Promise<void> {
        await conn.query(`DELETE FROM users WHERE id = ?`, [id])
        console.log(`User ID: ${id} has deleted`);
    }
}