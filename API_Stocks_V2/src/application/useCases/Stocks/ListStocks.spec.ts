import { listStocks } from "../../app"

let i = 1
describe(`############ Test's UseCase - ListStocks ############`, () => {
    it(`${i++} - Should returns a unique stock `, async () => {
        const stockJEST = await listStocks.findUnique('JEST1')

        expect(stockJEST).toHaveLength(1)
        expect(stockJEST[0].symbol).toBe('JEST1')
    })

    it(`${i++} - Should returns a list of a stock `, async () => {
        const stockJEST = await listStocks.findByRange('JEST1', 365)
        // @ts-ignore
        expect(stockJEST.length).toBeGreaterThan(1)
        expect(stockJEST[0].symbol).toBe('JEST1')
    })

    it(`${i++} - Should returns a 2 register of JEST test `, async () => {
        const stockJEST = await listStocks.listStocks(['JEST1', 'JEST1'])
        
        expect(stockJEST).toHaveLength(2)
        expect(stockJEST[0].symbol).toBe('JEST1')
        expect(stockJEST[1].symbol).toBe('JEST1')
    })
    
})
