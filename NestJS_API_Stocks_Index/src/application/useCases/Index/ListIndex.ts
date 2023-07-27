import { MySqlStocksRepository } from "../../repositories/implementations/MysqlStocksRepository";
import { ListIndexProps } from "./interfaces/ListIndexProps";
import { MySqlReturnProps } from "../../repositories/iMysqlReturnProps";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListIndex implements ListIndexProps {
    constructor(private mySqlStocksRepository: MySqlStocksRepository) {}

    async findIndex(index: string): MySqlReturnProps {
        try {
            const _index = await this.mySqlStocksRepository.find(index)
            return _index
        } catch (err) {
            console.log(err);
        }
    }


    async listByRange(index: string, range = 1): MySqlReturnProps {
        try {
            const _index = await this.mySqlStocksRepository.listByRange(index, range)
            return _index
        } catch (err) {
            console.log(err);
        }
    }
}