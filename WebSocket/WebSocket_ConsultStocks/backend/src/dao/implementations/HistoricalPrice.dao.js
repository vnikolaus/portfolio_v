/**
 * @typedef {Array<string>} Dates
 * @typedef {Array<number>} Prices
 * @param {string} ticker 
 * @param {string | number} period 
 * @returns {{ dates: Dates, prices: Prices }}
 */
export async function historicalPriceDAO(ticker, period) {
    if (typeof period === 'string') period = +period
    const oneDay = -1, fiveDays = 0, oneMonth = 1, sixMonths = 2, oneYear = 3, maxYears = 4
    const validPeriod = [oneDay, fiveDays, oneMonth, sixMonths, oneYear, maxYears].includes(+period)
    if (!validPeriod) throw new Error('Periodo de Preços inválido')
    const url = `${process.env.URL_API_PRICE}?ticker=${ticker}&type=${period}`
    const res = await fetch(url)
    const [{ prices: rawData }] = await res.json()
    const set = new Set(), output = []
    for (const obj of rawData) {
        if (!set.has(obj.date)) {
            set.add(obj.date)
            const date = obj.date.split(' ')[0]
            const dto = {
                date,
                price: obj.price,
            }
            output.push(dto)
        }
    }
    const dates = output.map(el => el.date)
    const prices = output.map(el => el.price)
    return { dates, prices }
}