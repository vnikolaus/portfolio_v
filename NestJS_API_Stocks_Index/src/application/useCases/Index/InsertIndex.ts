import { Injectable } from "@nestjs/common";
import { InsertIndexProps } from "./interfaces/InsertIndexProps";
import { MySqlStocksRepository } from "../../repositories/implementations/MysqlStocksRepository";
import { Index } from "../../../domain/index";

@Injectable()
export class InsertIndex implements InsertIndexProps {
    constructor(private mySqlStocksRepository: MySqlStocksRepository) {}

    async insertIndex(index: Index): Promise<void> {
        try {
            await this.mySqlStocksRepository.insert(index)
        } catch (err) {
            console.log(err);
        }
    }
    
}