import { DB } from "../../data/db";
import { AuthorRepository } from "../../data/repositories";
import { AuthorService } from "../AuthorService";

export const createAuthService = (db: DB): AuthorService => {
    const repository = new AuthorRepository(db)
    return new AuthorService(repository)
}