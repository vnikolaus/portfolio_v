import puppeteer from 'puppeteer'
import { setTimeout } from 'timers/promises'

const getDistance = async (origin: string, destination: string) => {
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()
    await page.goto('https://www.distanciaentreascidades.com.br/')

    await page.focus('#origem')
    await page.keyboard.type(origin)

    await page.focus('#destino')
    await page.keyboard.type(destination)

    const button = await page.$('#btn_calcula_distancia')
    await button?.click()

    const data = await Promise.race([page.waitForSelector('#distancia_linha_reta > span'), setTimeout(10000, 'Distance not found')])
    if (typeof data === 'string') throw new Error(data)

    const rawData = await data.getProperty('textContent')
    const distance = await rawData.jsonValue()

    await page.close()
    return +distance?.replace(/\D/g, '')
}

export { getDistance }
