import { StocksDTO } from 'src/application/dtos/stocksDTO'
import { FetchDataProps } from './interfaces/FetchDataProps'


export class FetchData implements FetchDataProps {
    async fetchRawData(symbol: string): Promise<StocksDTO> {
        try {
            const url = `${process.env.URL_API}${symbol}`
            const response = await fetch(url)
            const rawData = await response.json()

            if(!rawData) throw new Error(`API data not found`)

            if (rawData.BizSts.cd === 'NOK') throw new Error(`API is not ready`)
    
            const prices = rawData.Trad[process.env.PRICES].scty.SctyQtn
            const _symbol = rawData.Trad[process.env.SYMBOL].scty.symb
    
            const obj = {
                symbol: _symbol,
                openPrice: prices.opngPric,
                currentPrice: prices.curPrc,
                variation: prices.prcFlcn,
            }
    
            return obj
        } catch (err) {
            console.log(err);
        }
    }
}
