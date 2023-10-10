import jwt from 'jsonwebtoken'

export class StoreToken {
    static createToken(id: number, login: string): string {
        const token = jwt.sign({ id, login }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION
        })
        return token
    }

    static validToken(token: string): any {
        const verification = jwt.verify(token, process.env.TOKEN_SECRET);
        return verification
    }
}