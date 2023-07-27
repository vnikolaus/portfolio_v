import { formatNumber } from "./formatNumber"

let i = 1
describe(`############ Test's Function - formatNumber ############`, () => {
    it(`${i++} - Should complete number with zeros in left `, () => {
        const formatNum = formatNumber(123, 6)

        expect(formatNum).toBe('000123')
    })
})
