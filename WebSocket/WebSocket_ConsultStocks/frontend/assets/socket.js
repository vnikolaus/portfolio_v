/**
 * @typedef {{ [key: string]: string | number }} DTO
 * @param {DTO} info 
 * @param {DTO} data
 * @returns {void}
 */
function setActualPrice(info, data) {
    const { PRECO } = data
    const actualPrice = Utils.stringToNumber(PRECO)
    document.setText('actual_price', Utils.formatCurrency(actualPrice))
    setPriceVariation(info, data)
}

/**
 * @typedef {{ [key: string]: string | number }} DTO
 * @param {DTO} info 
 * @param {DTO} data
 * @returns {void}
 */
function setPriceVariation(info, data) {
    const { PRECO } = data
    const { regularMarketOpen, regularMarketTime } = info
    const actualPrice = Utils.stringToNumber(PRECO)
    const calcOpenMarket = (100 * regularMarketOpen) / actualPrice
    const percentageOpenMarket = 100 - calcOpenMarket
    const gap = new Date() - new Date(regularMarketTime)
    const dayInMs = 86400000
    if (gap > dayInMs) {
        Utils.changeBackground('variation', 'gray')
        document.setText('variation', `0%`)
    } else if (percentageOpenMarket < 0) {
        Utils.changeBackground('variation', 'red')
        document.setText('variation', `- ${Math.abs(percentageOpenMarket.toFixed(2))}%`)
    } else {
        Utils.changeBackground('variation', 'green')
        document.setText('variation', `+ ${Math.abs(percentageOpenMarket.toFixed(2))}%`)
    }
}

/**
 * @typedef {{ [key: string]: string | number }} DTO
 * @param {DTO} data
 * @returns {void}
 */
function setGrahamPrice(data) {
    const { LPA, VPA } = data
    const grahamPrice = Math.sqrt(22.5 * (Utils.stringToNumber(VPA) * Utils.stringToNumber(LPA)))
    document.setText('graham', Utils.formatCurrency(grahamPrice))
}

/**
 * @typedef {{ [key: string]: string | number }} DTO
 * @param {DTO} data
 * @returns {void}
 */
function setBazinPrice(data) {
    const { PRECO } = data
    const actualPrice = Utils.stringToNumber(PRECO)
    const [ years, payments ] = [Utils.getStorage('dividends_years'), Utils.getStorage('dividends_payments')]
    const config = {
        years,
        payments,
        actualPrice
    }
    SOCKET_CLIENT.emit('calculate_bazin', config)
}

/**
 * @param {number} ceilPrice
 * @param {number} actualPrice
 * @returns {void}
 */
function setSecurityMargin(ceilPrice, actualPrice) {
    const a = 100
    const calc = (a * actualPrice) / ceilPrice
    const percentage = a - calc
    if (percentage < 0) {
        document.setText('security_margin', `- ${Math.abs(percentage.toFixed(2))}%`)
        Utils.changeBackground('security_margin', 'red')
    } else {
        document.setText('security_margin', `+ ${percentage.toFixed(2)}%`)
        Utils.changeBackground('security_margin', 'green')
    }
    setTendency(ceilPrice, actualPrice)
}

/**
 * @param {number} ceilPrice 
 * @param {number} actualPrice 
 * @returns {void}
 */
function setTendency(ceilPrice, actualPrice) {
    if (ceilPrice > actualPrice) {
        document.setText('tendency', 'COMPRA')
        document.style('#tendency', 'color: black;')
        Utils.changeBackground('tendency', 'green')
    } else {
        document.setText('tendency', 'MANTER')
        Utils.changeBackground('tendency', 'yellow')
    }
}

/**
 *  SOCKET_CLIENT EVENTS
 */

const SOCKET_CLIENT = io('http://localhost:3000')

SOCKET_CLIENT.on('company_info', (info) => {
    if (!info) return
    const { logourl, longName } = info
    document.removeAttr('.stock-information', 'hidden')
    document.setAttr('#company_logo', 'src', logourl)
    document.setText('company_name', longName)
})

SOCKET_CLIENT.on('raw_data', async ({ info, data }) => {
    const isStock = 'TICKER' in data
    if (!isStock) {
        const inputs = ['actual_price','graham','bazin1','bazin3','bazin5','bazin10','ceil_price','security_margin','tendency']
        inputs.forEach(input => document.setText(input, '-'))
        return
    }
    setActualPrice(info, data)
    setGrahamPrice(data)
    setBazinPrice(data)
})

SOCKET_CLIENT.on('bazin_calculated', (data) => {
    const { oneYear, threeYears, fiveYears, tenYears, actualPrice } = data
    document.setText('bazin1', Utils.formatCurrency(oneYear))
    document.setText('bazin3', Utils.formatCurrency(threeYears))
    document.setText('bazin5', Utils.formatCurrency(fiveYears))
    document.setText('bazin10', Utils.formatCurrency(tenYears))
    const ceilPrice = (oneYear + threeYears + fiveYears + tenYears) / 4
    document.setText('ceil_price', Utils.formatCurrency(ceilPrice))
    setSecurityMargin(ceilPrice, actualPrice)
})

SOCKET_CLIENT.on('historical_prices', (data) => {
    const { dates, prices } = data
    Graphic.historicalPrice(dates, prices)
    Utils.setStorage('prices_dates', dates)
    Utils.setStorage('prices_values', prices)
})

SOCKET_CLIENT.on('historical_dividends', (data) => {
    const { years, payments } = data
    Graphic.historicalDividends(years, payments)
    Utils.setStorage('dividends_years', years)
    Utils.setStorage('dividends_payments', payments)
})

SOCKET_CLIENT.on('new_price_graphic', (data) => {
    const { dates, prices } = data
    Graphic.historicalPrice(dates, prices)
})

SOCKET_CLIENT.on('new_dividend_graphic', (data) => {
    const { years, payments } = data
    Graphic.historicalDividends(years, payments)
})

SOCKET_CLIENT.on('error', (err) => {
    console.log("SOCKET_ERROR", err);
    alert(`SOCKET_ERROR: ${err.message}`)
})