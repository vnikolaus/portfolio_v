/**
 * @typedef {{ oneYear: number; threeYears:number; fiveYears:number; tenYears:number; }} BazinPayload
 * @param {Array<number>} years 
 * @param {Array<number>} payments 
 * @param {number} actualPrice 
 * @returns {BazinPayload}
 */
export function bazinPriceDAO(years, payments, actualPrice) {
    const dto = {}
    for (let i = 0; i < years.length; i++) {
        Reflect.set(dto, years[i], payments[i])
    }
    const actualYear = new Date().getFullYear()
    const maxYears = Object.keys(dto)
    const temp = maxYears
    if (maxYears.at(-1) == actualYear) temp.pop()
    const oneYear = temp.at(-1)
    const threeYears = temp.slice(-3)
    const fiveYears = temp.slice(-5)
    const tenYears = temp.slice(-10)
    const dividendOneYear = [oneYear].reduce((add, el) => {
        return dto[el]
    }, 0)
    const dividendThreeYears = threeYears.reduce((add, el) => {
        add += dto[el]
        return add
    }, 0)
    const dividendFiveYears = fiveYears.reduce((add, el) => {
        add += dto[el]
        return add
    }, 0)
    const dividendTenYears = tenYears.reduce((add, el) => {
        add += dto[el]
        return add
    }, 0)
    const minimumYield = 0.06
    const priceOneYear = dividendOneYear / minimumYield
    const priceThreeYears = (dividendThreeYears / minimumYield) / 3
    const priceFiveYears = (dividendFiveYears / minimumYield) / 5
    const maxLen = tenYears.length
    const priceTenYears = (dividendTenYears / minimumYield) / maxLen
    return {
        oneYear: priceOneYear,
        threeYears: priceThreeYears,
        fiveYears: priceFiveYears,
        tenYears: priceTenYears 
    }
}