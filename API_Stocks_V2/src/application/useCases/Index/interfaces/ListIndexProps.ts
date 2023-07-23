import { MySqlReturnProps } from 'src/application/repositories/iMysqlReturnProps'

export interface ListIndexProps {
    listByRange(index: string, range: number): MySqlReturnProps
    findIndex(index: string): MySqlReturnProps
}
