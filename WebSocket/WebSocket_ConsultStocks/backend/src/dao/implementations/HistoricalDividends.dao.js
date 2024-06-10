/**
 * @typedef {Array<number>} Years
 * @typedef {Array<number>} Payments
 * @param {string} ticker 
 * @param {string | number} period 
 * @returns {{ years: Years, payments: Payments }}
 */
export async function historicalDividendsDAO(ticker, period) {
    if (typeof period === 'string') period = +period
    const oneYear = -1, twoYears = 0, fiveYears = 1, maxYears = 2
    const validPeriod = [oneYear, twoYears, fiveYears, maxYears].includes(period)
    if (!validPeriod) throw new Error('Periodo de Dividendos inválido')
    const url = `${process.env.URL_API_DIVIDENDS}?ticker=${ticker}&chartProventsType=${period}`
    const res = await fetch(url)
    const { assetEarningsYearlyModels } = await res.json()
    const years = [],  payments = []
    for (const obj of assetEarningsYearlyModels) {
        years.push(obj.rank)
        payments.push(obj.value)
    }
    return { years, payments }
}