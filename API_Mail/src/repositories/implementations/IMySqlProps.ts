import { OkPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export type IMySqlProps = OkPacket | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | OkPacket[] | ProcedureCallPacket