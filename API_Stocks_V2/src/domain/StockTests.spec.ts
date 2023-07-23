import { Stock } from './stock'

const stockJEST = { symbol: 'JEST1', openPrice: 99, currentPrice: 99, variation: 99 }
const stock = Stock.instance(stockJEST)

let i = 1
describe(`############ Test's Domain Class - Stock ############`, () => {
    it(`${i++} - Should be a instance of Stock `, () => {
        expect(stock).toBeInstanceOf(Stock)
    })

    it(`${i++} - Should be have a id `, () => {
        expect(stock).toHaveProperty('id')
        expect(stock.id).not.toBeNull()
    })

    it(`${i++} - Should be have a props `, () => {
        expect(stock).toHaveProperty('props')
        expect(stock.props).not.toBeNull()
        expect(stock.props.openPrice).not.toBeNaN()
        expect(stock.props.currentPrice).not.toBeNaN()
        expect(stock.props.variation).not.toBeNaN()
    })
})
