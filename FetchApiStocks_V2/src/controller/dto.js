import FetchAPI from "./fetch_api";
import FormatData from "./format_data";

class DTO {

    async data(symbol) {
        if (!symbol) throw new Error('Stock not found.');
        try {
            const promises = [ 
                FetchAPI.fetchHistoricalPrice(symbol),
                FetchAPI.fecthIndicators(symbol),
                FetchAPI.fetchDividends(symbol)
            ];
    
            const promisesData = await Promise.all(promises);
            if (!promisesData) throw new Error('Data after fetch not found.');
            
            const _DTO = this.newDTO(promisesData);
            return _DTO;
        } catch (err) {
            console.log(err);
        }
    }

    newDTO(arr) {
        let _DTO = [[[],[]], [], []];
        const stocks = arr[process.env.STOCK];
        const indicators = arr[process.env.INDICATORS];
        const dividends = arr[process.env.DIVIDENDS];

        for (let i in stocks) {
            _DTO[process.env.HISTORICAL][process.env.DATE].push(FormatData.formatTimeStamp(stocks[i].date));
            _DTO[process.env.HISTORICAL][process.env.PRICE].push(FormatData.formatPrice(stocks[i].close));
        }

        _DTO[process.env.INDICATORS] = {...indicators};
        _DTO[process.env.DIVIDENDS] = {...dividends};
        return _DTO;
    }
}

export default DTO;