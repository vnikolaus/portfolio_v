import { storeTokens } from "../../app"

const FAKE_ID_JEST = +process.env.FAKE_ID_JEST
const FAKE_KEY_JEST = process.env.FAKE_KEY_JEST
const FAKE_TOKEN_JEST = process.env.FAKE_TOKEN_JEST_2

let i = 1
describe(`############ Test's UseCase - StoreTokens ############`, () => {
    it(`${i++} - Should create a new Token `, async () => {
        const objToken = await storeTokens.store(FAKE_ID_JEST, FAKE_KEY_JEST)

        expect(objToken).not.toBeNull
        expect(objToken).toHaveProperty('content')
        expect(objToken.content).toBe(FAKE_TOKEN_JEST)
    })

    it(`${i++} - Should validate a true token `, async () => {
        const validation = await storeTokens.valid(FAKE_TOKEN_JEST)

        expect(validation[0]).toBe(process.env.VALIDATION_1)
        expect(validation).toBe(process.env.VALIDATION_2)
    })

    it(`${i++} - Should not validate a false token `, async () => {
        const validation = await storeTokens.valid(`${FAKE_TOKEN_JEST}x`)

        expect(validation).toBeUndefined()
    })
})
