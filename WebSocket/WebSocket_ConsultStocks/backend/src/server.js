import express from 'express'
import { createServer } from 'node:http'
import { resolve } from 'node:path'
import { Server } from 'socket.io'
import { companyInformationDAO, historicalDividendsDAO, historicalPriceDAO, stockDataDAO, bazinPriceDAO } from './dao/index.js'

const app = express()
app.use(express.static(resolve('frontend')))
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

async function main() {
    io.on('connection', (client) => {
        client.on('new_search', async (ticker) => {
            try {
                const maxPrices = 4, maxDividends = 2
                const [info, data, prices, dividends] = await Promise.all([companyInformationDAO(ticker), stockDataDAO(ticker), historicalPriceDAO(ticker, maxPrices), historicalDividendsDAO(ticker, maxDividends)])
                client.emit('company_info', info)
                client.emit('historical_prices', prices)
                client.emit('historical_dividends', dividends)
                client.emit('raw_data', { info, data })
            } catch (err) {
                client.emit('error', err)
            }
        })
        client.on('calculate_bazin', async ({ years, payments, actualPrice }) => {
            try {
                const { oneYear, threeYears, fiveYears, tenYears } = bazinPriceDAO(years, payments, actualPrice)
                client.emit('bazin_calculated', { oneYear, threeYears, fiveYears, tenYears, actualPrice })
            } catch (err) {
                client.emit('error', err)
            }
        })
        client.on('change_hp_graphic', async ({ ticker, option }) => {
            try {
                const { dates, prices } = await historicalPriceDAO(ticker, option)
                client.emit('new_price_graphic', { dates, prices })
            } catch (err) {
                client.emit('error', err)
            }
        })
        client.on('change_dv_graphic', async ({ ticker, option }) => {
            try {
                const { years, payments } = await historicalDividendsDAO(ticker, 2)
                if (option === 'max') {
                    client.emit('new_dividend_graphic', { years, payments })
                } else {
                    const filteredYear = new Date().getFullYear() - +option
                    const newYears = [], newPayments = []
                    for (let i = 0; i < years.length; i++) {
                        if (years[i] === new Date().getFullYear()) continue
                        if (years[i] >= filteredYear) {
                            newYears.push(years[i])
                            newPayments.push(payments[i])
                        }
                    }
                    client.emit('new_dividend_graphic', { years: newYears, payments: newPayments })
                }
            } catch (err) {
                client.emit('error', err)
            }
        })
    })
    httpServer.listen(3000, () => console.log('Servidor online'))
}
main()