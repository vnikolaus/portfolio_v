import { Injectable } from "@nestjs/common";
import { Database } from "src/application/db/db.datasource";
import { User } from "src/application/useCases/user/entities/user.entity";

@Injectable()
export class UserRepository {
    constructor(private database: Database) {}

    async exec() {
        const conn = (await this.database.connection()).getRepository(User)
        return conn
    }
}