import { OkPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from 'mysql2'

export type MySqlReturnProps = Promise<OkPacket | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | OkPacket[] | ProcedureCallPacket>

export type MySqlReturnPropsNotPromise = OkPacket | RowDataPacket[] | ProcedureCallPacket | ResultSetHeader[] | RowDataPacket[][] | OkPacket[]
