import { describe, it, expect, vi } from 'vitest'
import { Client } from '../../src/domain/entities/Client'
import { ZodError } from 'zod'
import { generateCode } from '../../src/application/helpers/generateCode'

describe('#Create', async () => {
    const codeClient = await generateCode(0, 6)
    const client = new Client({
        code: codeClient,
        name: 'Vitest',
        cnpj: '01.234.567/0001-01',
        active: true,
    })

    it('Should be a instance of Client', async () => {
        expect(client).toBeInstanceOf(Client)
    })

    it('Should create a valid client', async () => {
        expect(client.props).toHaveProperty('id')
        expect(client.props.code).toHaveLength(6)
    })

    it('Should not create a invalid client', async () => {
        expect(
            () =>
                new Client({
                    name: 'Vitest',
                    cnpj: '01.234.567/0001-0',
                    active: true,
                })
        ).toThrow(ZodError)
    })

    it('Should not create a unactive client', async () => {
        expect(
            () =>
                new Client({
                    name: 'Vitest',
                    cnpj: '01.234.567/0001-01',
                    active: false,
                })
        ).toThrow(ZodError)
    })
})
