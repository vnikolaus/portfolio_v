import puppeteer from 'puppeteer'
import { setTimeout } from 'timers/promises'

const getIataCode = async (location: string) => {
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()
    await page.goto('https://www.seabaycargo.com/airport-code/')

    await page.focus('#keyword')
    await page.keyboard.type(location)

    await page.evaluate(() => {
        document.getElementById('IATASearchSubmit').click()
    })

    const data = await Promise.race([page.waitForSelector('.defa_tr > td'), setTimeout(10000, 'Airport not found')])
    if (typeof data === 'string') throw new Error(data)

    const rawData = await data.getProperty('innerText')
    const iataCode = await rawData.jsonValue()

    await page.close()
    return iataCode
}

export { getIataCode }
