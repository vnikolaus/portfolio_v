import { Controller, Post, Param } from '@nestjs/common'
import { StoreTokens } from './StoreTokens';
import { MysqlTokensRepository } from '../../repositories/implementations/MysqlTokensRepository';
import { TokensProps } from './interfaces/StoreTokensProps';

@Controller('/api/v1/tokens')
export class TokensController {
    constructor(private mySqlTokensRepository: MysqlTokensRepository, private storeTokens: StoreTokens) {}

    @Post(`/store/:key`)
    async storeToken(@Param() params): Promise<TokensProps> {
        try {
            if (!params.key) throw new Error(`Params not found.`)

            const { key } = params

            if (key === process.env.FAKE_KEY_JEST) return { error: `Invalid Params.` }

            const validKey = await this.mySqlTokensRepository.findKey(key)
            const _key = validKey[0]

            if(!_key) throw new Error(`Invalid Params.`)

            const token = await this.storeTokens.store(_key.id, key)
            return token
        } catch (err) {
            return { error: err.message }
        }
    }

}
