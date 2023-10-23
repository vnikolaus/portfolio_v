class FormatData {

    static formatTimeStamp(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('pt-BR');
    }

    static getActualDate() {
        const date = new Date();
        const formatedActualDate = date.toLocaleDateString('pt-BR').replace(/[/]/g, '-');
        return formatedActualDate;
    }
    
    static sliceDate(date) {
        date = String(date);
        date = date.substring(0, 10);
        return date;
    }

    static formatPrice(value) {
        value = FormatData.completeNumber(value.toFixed(2));
        return value;
    }

    static completeNumber(num) {
        return num >= 10 ? num : `0${num}`;
    }

    static calculateGraham(obj) {
        const VPA = obj[process.env.INDICATORS][process.env.VPA].value;
        const LPA = obj[process.env.INDICATORS][process.env.LPA].value;
        const graham = Math.sqrt(22.5 * ( LPA * VPA )).toFixed(2);
        return graham;
    }

    static calculateCeilingPrice(data, symbol) {
        try {
            const averagePercentage = 0.06;
            const allDividends  = FormatData.formatArrayDividends(data[process.env.DIVIDENDS], symbol);
            if (!allDividends) throw new Error('Dividends not found');
            const dividendSixYears = allDividends.slice(allDividends.length - (allDividends.length - 5));
            dividendSixYears.pop()
            const totalDividendSixYears = dividendSixYears.reduce((sum, value) => {return sum + Number(value)}, 0).toFixed(2);
            const ceilingPrice = ((totalDividendSixYears / 6) / averagePercentage).toFixed(2);

            return ceilingPrice;
        } catch (err) {
            console.log(err);
        }
    }

    static formatArrayDividends(data, symbol) {
        try {
            let dataArr = Array.from(data.dividends);
            let dataVO = [[],[],[],[],[],[],[],[],[],[],[]];
            const actualDate = FormatData.getActualDate();
            const checkNull = (dataArr.findIndex((value) => value.date === null));

            if (checkNull !== -1) {
                dataArr[checkNull].date = actualDate;
            }

            const dividends2023 = dataArr.filter(value => value.date.includes('2023'));
            const dividends2022 = dataArr.filter(value => value.date.includes('2022'));
            const dividends2021 = dataArr.filter(value => value.date.includes('2021'));
            const dividends2020 = dataArr.filter(value => value.date.includes('2020'));
            const dividends2019 = dataArr.filter(value => value.date.includes('2019'));
            const dividends2018 = dataArr.filter(value => value.date.includes('2018'));
            const dividends2017 = dataArr.filter(value => value.date.includes('2017'));
            const dividends2016 = dataArr.filter(value => value.date.includes('2016'));
            const dividends2015 = dataArr.filter(value => value.date.includes('2015'));
            const dividends2014 = dataArr.filter(value => value.date.includes('2014'));
            const dividends2013 = dataArr.filter(value => value.date.includes('2013'));
            const dividends2012 = dataArr.filter(value => value.date.includes('2012'));
    
            dataVO[process.env.Y2023] = dividends2023.reduce((sum, dividend) => {return sum + dividend.value}, 0).toFixed(2);
            dataVO[process.env.Y2022] = dividends2022.reduce((sum, dividend) => {return sum + dividend.value}, 0).toFixed(2);
            dataVO[process.env.Y2021] = dividends2021.reduce((sum, dividend) => {return sum + dividend.value}, 0).toFixed(2);
            dataVO[process.env.Y2020] = dividends2020.reduce((sum, dividend) => {return sum + dividend.value}, 0).toFixed(2);
            dataVO[process.env.Y2019] = dividends2019.reduce((sum, dividend) => {return sum + dividend.value}, 0).toFixed(2);
            dataVO[process.env.Y2018] = dividends2018.reduce((sum, dividend) => {return sum + dividend.value}, 0).toFixed(2);
            dataVO[process.env.Y2017] = dividends2017.reduce((sum, dividend) => {return sum + dividend.value}, 0).toFixed(2);
            dataVO[process.env.Y2016] = dividends2016.reduce((sum, dividend) => {return sum + dividend.value}, 0).toFixed(2);
            dataVO[process.env.Y2015] = dividends2015.reduce((sum, dividend) => {return sum + dividend.value}, 0).toFixed(2);
            dataVO[process.env.Y2014] = dividends2014.reduce((sum, dividend) => {return sum + dividend.value}, 0).toFixed(2);
            dataVO[process.env.Y2013] = dividends2013.reduce((sum, dividend) => {return sum + dividend.value}, 0).toFixed(2);
            dataVO[process.env.Y2012] = dividends2012.reduce((sum, dividend) => {return sum + dividend.value}, 0).toFixed(2);

            return dataVO;
        } catch (err) {
            console.log(err);
        }
    }
    
    static formatArrayIndicators(arr) {
        arr = arr[process.env.INDICATORS];
        let dataVO = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

        dataVO[0].push(arr[process.env.VPA].value);
        dataVO[1].push(arr[process.env.LPA].value);
        dataVO[2].push(arr[process.env.CAGR_PROFITS].value);
        dataVO[3].push(arr[process.env.CAGR_RECIPES].value);
        dataVO[4].push(arr[process.env.DIVIDEND_YIELD]);
        dataVO[5].push(arr[process.env.EBIT_MARGIN].value);
        dataVO[6].push(arr[process.env.EBITDA_MARGIN].value);
        dataVO[7].push(arr[process.env.DIV_PL].value);
        dataVO[8].push(arr[process.env.DIV_EBITDA].value);
        dataVO[9].push(arr[process.env.NET_MARGIN].value);
        dataVO[10].push(arr[process.env.PVP].value);
        dataVO[11].push(arr[process.env.PL].value);
        dataVO[12].push(arr[process.env.EBIT].value);
        dataVO[13].push(arr[process.env.EBITDA].value);
        dataVO[14].push(arr[process.env.ROE].value);
        dataVO[15].push(arr[process.env.ROIC].value);
        return dataVO;
    }

    static formatArrayIBOV(arr) {
        try {
            const dataArr = arr.historicals;
            let dataVO = [[],[]];

            for (let i of dataArr) {
                dataVO[process.env.DATE].push(FormatData.sliceDate(i.date));
                dataVO[process.env.PRICE].push(FormatData.formatPrice(i.close));
            }
            return dataVO;
        } catch (err) {
            console.log(err);
        }
    }
}

export default FormatData;