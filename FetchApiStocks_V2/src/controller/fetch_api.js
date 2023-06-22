class FetchAPI {
    
    static async fetchHistoricalPrice(symbol) {
        try {
            if (!symbol || symbol === 'IBOV') return;
            const api_url = `${process.env.API_URL_STOCKS_1}${symbol}${process.env.API_URL_STOCKS_2}`;
            const data = await fetch(api_url);
            const dataObj = await data.json().then(res => res.results[process.env.STOCK].historicalDataPrice);
            if (!dataObj) throw new Error("Dados da API Preço não encontrados");

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
            if (!dataObj) throw new Error("Dados da API Indicadores não encontrados");

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
            if (!dataObj) throw new Error("Dados da API Dividendos não encontrados");

            return dataObj;
        } catch (err) {
            console.log(err);
        }
    }

    static async fetchQuotation(symbol) {
        try {
            if (!symbol) throw new Error("Ação não encontrada.");
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
            console.log(api_url);
            const response = await fetch(api_url);
            const data = await response.json();
            if (data.historicals.length <= 0) throw new Error('Data not found');

            // return data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default FetchAPI;