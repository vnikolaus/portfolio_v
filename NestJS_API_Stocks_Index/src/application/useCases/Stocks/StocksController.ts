import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { MySqlReturnProps } from 'src/application/repositories/iMysqlReturnProps'
import { ListStocks } from './ListStocks'
import { SHA256 } from 'crypto-js';

@Controller('/api/v1/stocks')
export class StocksController {
    constructor(private listStocks: ListStocks) {}

    @Get(`:symbol`)
    async listUnique(@Param() params): MySqlReturnProps {
        if(params.symbol === 'IBOV') return { message: `Use our index endpoint for the consulting.`}

        try {
            const stock = await this.listStocks.findUnique(params.symbol)
            return stock
        } catch (err) {
            console.log(err.message);
            return err
        }
    }

    @Get(`:symbol/range=:range`)
    async listByRange(@Param() params): MySqlReturnProps {
        if(params.symbol === 'IBOV') return { message: `Use our index endpoint for the consulting.`}
        
        try {
            const stocks = await this.listStocks.findByRange(params.symbol, params.range)
            return stocks
        } catch (err) {
            console.log(err.message);
            return err
        }
    }

    @Post(`/group`)
    async listGroup(@Body() body): MySqlReturnProps {
        try {
            const stocks = await this.listStocks.listStocks(body.symbols)
            return stocks
        } catch (err) {
            console.log(err.message);
            return err
        }
    }   
}
