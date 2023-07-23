import { fetchData } from "../../app"


let i = 1
describe(`############ Test's UseCase - FetchData ############`, () => {
    it(`${i++} - Should returns a error on console.log `, async () => {
        const errorSpy = jest.spyOn(console, 'log');
        await fetchData.fetchRawData(`${process.env.SYMB_0}x`)

        expect(errorSpy).toBeCalled()
        errorSpy.mockClear()
    })

    it(`${i++} - Should returns a Object: StocksDTO `, async () => {
        const errorSpy = jest.spyOn(console, 'log');
        const data = await fetchData.fetchRawData(`${process.env.SYMB_0}`)

        expect(errorSpy).not.toBeCalled()

        expect(data.symbol).not.toBeNull
        expect(data.openPrice).not.toBeNull
        expect(data.currentPrice).not.toBeNull
        expect(data.variation).not.toBeNull
    })
    
})
