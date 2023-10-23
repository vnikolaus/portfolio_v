class FetchAPI {
    
    static async fetchHistoricalPrice(symbol) {
        try {
            if (!symbol || symbol === 'IBOV') return;
            const api_url = `${process.env.API_URL_STOCKS_1}${symbol}${process.env.API_URL_STOCKS_2}`;
            const data = await fetch(api_url);
            const res = await data.json()
            const dataObj = res.results[process.env.STOCK].historicalDataPrice;
            if (!dataObj) throw new Error("Data API price not found");

            return dataObj;
        } catch (err) {
            console.log(err);
        }
    }

    static async fecthIndicators(symbol) {
        try {
            if (!symbol || symbol === 'IBOV') return;
            const api_url = `${process.env.API_URL_INDICATOR}${symbol}`;
            const data = await fetch(api_url);
            const dataObj = await data.json().then(res => res.indicators[process.env.STOCK]);
            if (!dataObj) throw new Error("Data API indicators not found");

            return dataObj;
        } catch (err) {
            console.log(err);
        }
    }

    static async fetchDividends(symbol) {
        try {
            if (!symbol || symbol === 'IBOV') return;
            const api_url = `${process.env.API_URL_DIVIDENDS}${symbol}`;
            const data = await fetch(api_url);
            const dataObj = await data.json().then(res => res);
            if (!dataObj) throw new Error("Data API dividends not found");

            return dataObj;
        } catch (err) {
            console.log(err);
        }
    }

    static async fetchQuotation(symbol) {
        try {
            if (!symbol) throw new Error("Stock not found");
            const api_url = `${[process.env.API_URL_QUOTATION]}${symbol}`;
            const response = await fetch(api_url);
            const data = await response.json();
            
            return data;
        } catch (err) {
            console.log(err);
        }

    }

    static async fetchDataIBOV() {
        try {
            const api_url = [process.env.API_URL_IBOV];
            const response = await fetch(api_url);
            const data = await response.json();
            if (data.historicals.length <= 0) throw new Error('Data not found');

            return data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default FetchAPI;