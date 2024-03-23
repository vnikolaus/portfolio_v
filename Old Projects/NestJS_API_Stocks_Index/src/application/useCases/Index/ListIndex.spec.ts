import { listIndex } from "../../app"

const indexJEST = { symbol: 'JEST1', openPrice: 99, currentPrice: 99, variation: 99 }

let i = 1
describe(`############ Test's UseCase - ListIndex ############`, () => {
    it(`${i++} - Should returns a unique index `, async () => {
        const sut = await listIndex.findIndex(indexJEST.symbol)
        const index = sut[0]

        expect(sut).toHaveLength(1)
        expect(index).toHaveProperty('date')
    })

    it(`${i++} - Should returns a list of a index `, async () => {
        const stockJEST = await listIndex.listByRange('JEST1', 365)

        // @ts-ignore
        expect(stockJEST.length).toBeGreaterThan(1)
        expect(stockJEST[0].symbol).toBe('JEST1')
    })
})
