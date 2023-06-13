// SCRIPT JS
const apiStocks = 'https://mfinance.com.br/api/v1/stocks/';
const apiIndicators = 'https://mfinance.com.br/api/v1/stocks/indicators?symbols=';
const apiDividends = 'https://mfinance.com.br/api/v1/stocks/dividends/';
const apiLogo = 'https://brapi.dev/api/quote/list?limit=1&search=';


async function cotacaoAtual() {
    const stocksList = document.getElementById('stocksList');
    const { options, selectedIndex } = stocksList; 
    const symbol = options[selectedIndex].value; 
    const apiUrlStocks = `${apiStocks}${symbol}`
    
    await fetch(apiUrlStocks).then(function(response){
        response.json().then(function(data){
        const { lastPrice } = data;

        if (symbol == "IBOV") {
            let dataFields = document.querySelectorAll('.campos');

            for (let field of dataFields) {
                field.value = ''
            }

            document.getElementById('teto').value = '';
            document.getElementById('graham').value = '';
            document.getElementById('cotacaoAtual').value = lastPrice.toFixed(2)+ " pts";
            changeGraphic();
            return
        }

        document.getElementById('cotacaoAtual').value = "R$" + data.lastPrice.toFixed(2);
        document.getElementById('dy').value = data.dividendYield.toFixed(2)+"%";

        getInfos();
        getDividends();
        changeGraphic();
        capturePrice();
        })
        .catch(err => {
            console.log(err);
        })
    });
}

async function getInfos() {
    const stocksList = document.getElementById('stocksList');
    const symbol = stocksList.value;
    const apiUrlIndicators = `${apiIndicators}${symbol}`
    const apiUrlLogo = `${apiLogo}${symbol}` 

    try { 
        const response = await fetch(apiUrlIndicators);
        data = await response.json()
        const info = data.indicators[0];

        const LPA = info.earningsPerShare.value;
        const VPA = info.bookValuePerShare.value;
        const VI = Math.sqrt((22.5 * (LPA * VPA))); 
        const graham = VI.toFixed(2)
        
        document.getElementById('graham').value = "R$" + graham;
        document.getElementById('pvp').value = info.priceEarningsRatio.value+"x";
        document.getElementById('pl').value = info.priceToBookValue.value+"x";
        document.getElementById('dvEbitda').value = info.netDebtToEbitda.value+"x";
        document.getElementById('mgEbitda').value = info.ebitdaMargin.value+"%";
        document.getElementById('roe').value = info.returnOnEquity.value+"%";
        document.getElementById('cagrLucros').value = info.cagrProfitsFiveYears.value+"%";
        document.getElementById('cagrReceitas').value = info.cagrRecipesFiveYears.value+"%";

    } catch (error) {
        console.log(error);
    }
}

async function getDividends() {
    const stocksList = document.getElementById('stocksList');
    const symbol = stocksList.value; 
    const apiUrlDividends = `${apiDividends}${symbol}`

    await fetch(apiUrlDividends).then(function(response){
        response.json().then(function(data) {
        const arr = Array.from(data.dividends);

        const dividends2022 = arr.filter((value) => ((value.date.includes('2022'))));
        const dividends2021 = arr.filter((value) => ((value.date.includes('2021'))));
        const dividends2020 = arr.filter((value) => ((value.date.includes('2020'))));
        const dividends2019 = arr.filter((value) => ((value.date.includes('2019'))));
        const dividends2018 = arr.filter((value) => ((value.date.includes('2018'))));
        const dividends2017 = arr.filter((value) => ((value.date.includes('2017'))));

        let totalDividend2022 = dividends2022.reduce((sum, dividend) => {return sum + dividend.value}, 0) 
        let totalDividend2021 = dividends2021.reduce((sum, dividend) => {return sum + dividend.value}, 0) 
        let totalDividend2020 = dividends2020.reduce((sum, dividend) => {return sum + dividend.value}, 0) 
        let totalDividend2019 = dividends2019.reduce((sum, dividend) => {return sum + dividend.value}, 0) 
        let totalDividend2018 = dividends2018.reduce((sum, dividend) => {return sum + dividend.value}, 0) 
        let totalDividend2017 = dividends2017.reduce((sum, dividend) => {return sum + dividend.value}, 0) 

        let dividends3y = totalDividend2022 + totalDividend2021 + totalDividend2020;
        let dividends6y = totalDividend2022 + totalDividend2021 + totalDividend2020 + totalDividend2019 + totalDividend2018 +totalDividend2017
        let precoTeto = ((totalDividend2022 / 0.06) + (dividends3y / 3 / 0.06) + (dividends6y / 6 / 0.06)) / 3

        symbol === "TRPL4" ? totalDividend2022 = 1.23 : totalDividend2022;

        document.getElementById('media1y').value = "R$" + (totalDividend2022 / 0.06).toFixed(2)
        document.getElementById('media3y').value = "R$" + (dividends3y / 3 / 0.06).toFixed(2)
        document.getElementById('media6y').value = "R$" + (dividends6y / 6 / 0.06).toFixed(2)
        document.getElementById('teto').value = "R$" + precoTeto.toFixed(2)
        })
        .catch(err => {
            console.log(err);
        })
    });
}

async function getDividendGraphic() {
    const stocksList = document.getElementById('stocksList');
    const symbol = stocksList.value; 
    const apiUrlDividends = `${apiDividends}${symbol}`

    await fetch(apiUrlDividends).then(function(response){
        response.json().then(function(data) {
        const arr = Array.from(data.dividends);

        const dividends2023 = arr.filter((value) => ((value.date.includes('2023'))));
        const dividends2022 = arr.filter((value) => ((value.date.includes('2022'))));
        const dividends2021 = arr.filter((value) => ((value.date.includes('2021'))));
        const dividends2020 = arr.filter((value) => ((value.date.includes('2020'))));
        const dividends2019 = arr.filter((value) => ((value.date.includes('2019'))));
        const dividends2018 = arr.filter((value) => ((value.date.includes('2018'))));
        const dividends2017 = arr.filter((value) => ((value.date.includes('2017'))));
        const dividends2016 = arr.filter((value) => ((value.date.includes('2016'))));
        const dividends2015 = arr.filter((value) => ((value.date.includes('2015'))));
        const dividends2014 = arr.filter((value) => ((value.date.includes('2014'))));
        const dividends2013 = arr.filter((value) => ((value.date.includes('2013'))));
        const dividends2012 = arr.filter((value) => ((value.date.includes('2012'))));

        let totalDividend2023 = dividends2023.reduce((sum, dividend) => {return sum + dividend.value}, 0)
        let totalDividend2022 = dividends2022.reduce((sum, dividend) => {return sum + dividend.value}, 0)
        let totalDividend2021 = dividends2021.reduce((sum, dividend) => {return sum + dividend.value}, 0)
        let totalDividend2020 = dividends2020.reduce((sum, dividend) => {return sum + dividend.value}, 0)
        let totalDividend2019 = dividends2019.reduce((sum, dividend) => {return sum + dividend.value}, 0)
        let totalDividend2018 = dividends2018.reduce((sum, dividend) => {return sum + dividend.value}, 0)
        let totalDividend2017 = dividends2017.reduce((sum, dividend) => {return sum + dividend.value}, 0)
        let totalDividend2016 = dividends2016.reduce((sum, dividend) => {return sum + dividend.value}, 0)
        let totalDividend2015 = dividends2015.reduce((sum, dividend) => {return sum + dividend.value}, 0)
        let totalDividend2014 = dividends2014.reduce((sum, dividend) => {return sum + dividend.value}, 0)
        let totalDividend2013 = dividends2013.reduce((sum, dividend) => {return sum + dividend.value}, 0)
        let totalDividend2012 = dividends2012.reduce((sum, dividend) => {return sum + dividend.value}, 0)

        let chartStatus = Chart.getChart("myChart");
        const ctx = document.getElementById('myChart');

        if (chartStatus != undefined) { 
            chartStatus.destroy();
        }

        symbol == "TRPL4" ? totalDividend2022 = 1.23 : totalDividend2022;

        let dividendGraphic = new Chart(ctx, {
                                type: 'bar',
                                data: {
                                labels: ['2012','2013','2014','2015','2016','2017', '2018', '2019', '2020', '2021', '2022', '2023'],
                                datasets: [{
                                label: [`${symbol}`],
                                data: [totalDividend2012.toFixed(2),
                                        totalDividend2013.toFixed(2), 
                                        totalDividend2014.toFixed(2), 
                                        totalDividend2015.toFixed(2), 
                                        totalDividend2016.toFixed(2), 
                                        totalDividend2017.toFixed(2), 
                                        totalDividend2018.toFixed(2), 
                                        totalDividend2019.toFixed(2), 
                                        totalDividend2020.toFixed(2), 
                                        totalDividend2021.toFixed(2), 
                                        totalDividend2022.toFixed(2),
                                        totalDividend2023.toFixed(2)],
                                  borderWidth: 2,
                                  pointBorderColor: 'white',
                                  borderColor: '#0E9F9F',
                                  backgroundColor: '#0FB9B9',
                                  pointRadius: 2,
                                }]
                              }
                            });
        })
        .catch(err => {
            console.log(err);
        })
    });
}

async function getPriceGraphic() {
    const stocksList = document.getElementById('stocksList');
    const symbol = stocksList.value; 
    const historicalPrice = `https://mfinance.com.br/api/v1/stocks/historicals/${symbol}?months=6`;

    await fetch(historicalPrice).then(function(response){
        response.json().then(function(dataSix){
        const arr = Array.from(dataSix.historicals)
        const chartStatus = Chart.getChart("myChart");
        const ctx = document.getElementById('myChart');
        const priceForPeriod = arr.slice((arr.length - 61), arr.length)
        
        let aData = new Array();
        let aPrice = new Array();

        for (let price of priceForPeriod) {
            aData.push(price.date.substring(2,10))
            aPrice.push(price.close)
        }

        if (chartStatus != undefined) { 
          chartStatus.destroy();
        }
        
        let priceGraphic = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [aData[0], aData[1], aData[2], aData[3], aData[4], aData[5], aData[6], aData[7], aData[8], aData[9], aData[10],
                     aData[11], aData[12], aData[13], aData[14], aData[15], aData[16], aData[17], aData[18], aData[19], aData[20],
                     aData[21], aData[22], aData[23], aData[24], aData[25], aData[26], aData[27], aData[28], aData[29], aData[30],
                     aData[31], aData[32], aData[33], aData[34], aData[35], aData[36], aData[37], aData[38], aData[39], aData[40],
                     aData[41], aData[42], aData[45], aData[44], aData[45],aData[46], aData[47], aData[48], aData[49], aData[50],
                     aData[51], aData[52], aData[53], aData[54], aData[55],aData[56], aData[57], aData[58], aData[59], aData[60]
                    ],
            datasets: [{
              label: [`${symbol}`],
              data: [aPrice[0], aPrice[1], aPrice[2], aPrice[3], aPrice[4], aPrice[5], aPrice[6], aPrice[7], aPrice[8], aPrice[9], aPrice[10],
                     aPrice[11], aPrice[12], aPrice[13], aPrice[14], aPrice[15], aPrice[16], aPrice[17], aPrice[18], aPrice[19], aPrice[20],
                     aPrice[21], aPrice[22], aPrice[23], aPrice[24], aPrice[25], aPrice[26], aPrice[27], aPrice[28], aPrice[29], aPrice[30],
                     aPrice[31], aPrice[32], aPrice[33], aPrice[34], aPrice[35], aPrice[36], aPrice[37], aPrice[38], aPrice[39], aPrice[40],
                     aPrice[41], aPrice[42], aPrice[43], aPrice[44], aPrice[45],aPrice[46], aPrice[47], aPrice[48], aPrice[49], aPrice[50],
                     aPrice[51], aPrice[52], aPrice[53], aPrice[54], aPrice[55],aPrice[56], aPrice[57], aPrice[58], aPrice[59], aPrice[60]
                    ],
              borderWidth: 2,
              pointBorderColor: 'white',
              borderColor: '#0E9F9F',
              backgroundColor: '#0FB9B9',
              fill: true,
              pointRadius: 1,
            }]
          }
        });
        }).catch(err => {
            console.log(err);
        })
    })
}

function changeGraphic(type) {
    if (!type || type == "price") {
        document.getElementById('selectGraphic').value = "price";
        getPriceGraphic();
    } else {
        getDividendGraphic();
    }
}

function changeImages(value) {
    let getLogo = document.getElementById('logo');

    getLogo.setAttribute('src', 'img/'+value+'.svg')
}