import { mySqlTokensRepository } from "../../app"

const FAKE_ID_JEST = +process.env.FAKE_ID_JEST
const FAKE_KEY_JEST = process.env.FAKE_KEY_JEST
const FAKE_TOKEN_JEST = process.env.FAKE_TOKEN_JEST_1


let i = 1
describe(`############ Test's UseCase - StoreTokens ############`, () => {
    it(`${i++} - Should find a correct key `, async () => {
        const data = await mySqlTokensRepository.findKey(FAKE_KEY_JEST)
        const key = data[0]

        expect(key.id).toBe(FAKE_ID_JEST)
        expect(key.tempKey).toBe(FAKE_KEY_JEST)
    })

    it(`${i++} - Should not find a incorrect key `, async () => {
        const data = await mySqlTokensRepository.findKey(`${FAKE_KEY_JEST}x`)
        const key = data[0]

        expect(key).toBeUndefined()
    })

    it(`${i++} - Should find a correct token `, async () => {
        const data = await mySqlTokensRepository.findToken(FAKE_TOKEN_JEST)
        const token = data[0]

        expect(token.tempKey).toBe(FAKE_KEY_JEST)
        expect(token.token).toBe(FAKE_TOKEN_JEST)
    })

    it(`${i++} - Should not find a incorrect token `, async () => {
        const data = await mySqlTokensRepository.findToken(`${FAKE_TOKEN_JEST}x`)
        const token = data[0]

        expect(token).toBeUndefined()
    })

    it(`${i++} - Should updated a token in database `, async () => {
        await mySqlTokensRepository.updateToken(`${FAKE_TOKEN_JEST}-active-test`, FAKE_KEY_JEST)

        const databaseToken = await mySqlTokensRepository.findToken(`${FAKE_TOKEN_JEST}-active-test`)
        const token = databaseToken[0]

        expect(token.tempKey).toBe(FAKE_KEY_JEST)
        expect(token.token).toBe(`${FAKE_TOKEN_JEST}-active-test`)
        expect(new Date(token.updated_at).getDate()).toBe(new Date().getDate())

        await mySqlTokensRepository.updateToken(FAKE_TOKEN_JEST, FAKE_KEY_JEST)
    })

})
