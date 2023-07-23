import { Index } from './index'

const indexJEST = { symbol: 'JEST1', openPrice: 99, currentPrice: 99, variation: 99 }
const index = Index.instance(indexJEST)

let i = 1
describe(`############ Test's Domain Class - Index ############`, () => {
    it(`${i++} - Should be a instance of Index `, () => {
        expect(index).toBeInstanceOf(Index)
    })

    it(`${i++} - Should be have a id `, () => {
        expect(index).toHaveProperty('id')
        expect(index.id).not.toBeNull()
    })

    it(`${i++} - Should be have a props `, () => {
        expect(index).toHaveProperty('props')
        expect(index.props).not.toBeNull()
        expect(index.props.openPrice).not.toBeNaN()
        expect(index.props.currentPrice).not.toBeNaN()
        expect(index.props.variation).not.toBeNaN()
    })
})
