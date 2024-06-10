/**
 * @typedef {{ logourl: string; longName: string; regularMarketOpen: number; regularMarketTime: string; }} Output
 * @param {string} ticker 
 * @returns {Output}
 */
export async function companyInformationDAO(ticker) {
    const token = process.env.TOKEN_API
    const url = `${process.env.URL_API_COMPANY_INFO}${ticker}?token=${token}`
    const res = await fetch(url)
    const data = await res.json()
    if ('error' in data) throw new Error('Error nas informações da empresa')
    const [{ logourl, longName, regularMarketOpen, regularMarketTime }] = data.results
    return { logourl, longName, regularMarketOpen, regularMarketTime }
}