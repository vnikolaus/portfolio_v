import { mySqlStocksRepository } from '../../app'

let i = 1
describe(`############ Test's Repositories - MySQL Stocks ############`, () => {
    test(`${i++} - Find query should be return Props of MySQL `, async () => {
        const find = await mySqlStocksRepository.find('JEST1')
        const stock = find[0]

        expect(stock).toHaveProperty('symbol')
        expect(stock).toHaveProperty('open_price')
        expect(stock).toHaveProperty('current_price')
        expect(stock).toHaveProperty('variation')
        expect(stock).toHaveProperty('date')
    })

    test(`${i++} - ListGroup query should be return a group of stocks `, async () => {
        const group = await mySqlStocksRepository.listGroup(['JEST1', 'JEST1'])
        const stock = group[0]

        expect(group).toHaveLength(2)
        expect(stock).toHaveProperty('date')
    })

    test(`${i++} - Range query should return a register corresponding to the date  `, async () => {
        const today = new Date()
        const createdAt = new Date(process.env.FAKE_PARAMS_DATE)

        const stocks = await mySqlStocksRepository.listByRange('JEST1', 365)
        
        const dateStock = stocks[stocks.length -1].date

        expect(createdAt).not.toEqual(today)
        expect(dateStock).toEqual(createdAt)
    })
})
