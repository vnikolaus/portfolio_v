import { MySqlReturnProps } from "./iMysqlReturnProps"

type KeyProps = MySqlReturnProps | null

export interface ITokensRepository {
    findKey(key: string): KeyProps
    findToken(token: string): KeyProps
    updateToken(token: string, key: string): Promise<void>
}
