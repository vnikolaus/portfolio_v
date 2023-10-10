
import { Index } from "../../../domain/index"
import { insertIndex } from "../../app"

const indexJEST = { symbol: 'JEST1', openPrice: 99, currentPrice: 99, variation: 99 }

let i = 1
describe(`############ Test's UseCase - InsertIndex ############`, () => {
    it(`${i++} - Should returns a undefined `, async () => {
        const consoleSpy = jest.spyOn(console, 'log')
        const instanceIndex = Index.instance(indexJEST)

        expect(await insertIndex.insertIndex(instanceIndex)).toBeUndefined()
        expect(consoleSpy).toBeCalledTimes(1)
    })
    
})
