import { insertStock } from "../../app"

const stockJEST = { symbol: 'JEST1', openPrice: 99, currentPrice: 99, variation: 99 }

let i = 1
describe(`############ Test's UseCase - InsertStock ############`, () => {
    it(`${i++} - Should returns a undefined `, async () => {
        expect(await insertStock.insertRawData([stockJEST])).toBeUndefined()
    })
    
})
