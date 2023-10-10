import { Controller, Get, Param } from '@nestjs/common'
import { MySqlReturnProps } from 'src/application/repositories/iMysqlReturnProps'
import { ListIndex } from './ListIndex'

@Controller('/api/v1/index')
export class IndexController {
    constructor(private listIndex: ListIndex) {}

    @Get(`/:index`)
    async listUnique(@Param() params): MySqlReturnProps {
        if (params.index !== 'IBOV') return { message: `Use our stocks endpoint for the consulting.`}

        try {
            const stock = await this.listIndex.findIndex(params.index)
            return stock
        } catch (err) {
            console.log(err.message);
            return err
        }
    }

    @Get(`:index/range=:range`)
    async listRange(@Param() params): MySqlReturnProps {
        if (params.index !== 'IBOV') return { message: `Use our stocks endpoint for the consulting.`}
        
        try {
            const stocks = await this.listIndex.listByRange(params.index, params.range)
            return stocks
        } catch (err) {
            console.log(err.message);
            return err
        }
    }
}
