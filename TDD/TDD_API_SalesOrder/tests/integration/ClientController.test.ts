import { afterAll, describe, expect, it } from 'vitest'
import { clientRepository } from '../../src/application/repositories'
import { Client } from '../../src/domain/entities/Client'

describe('#Client - Controller', async () => {
    const { props: client } = new Client({
        name: 'Vitest',
        cnpj: '01.234.567/0001-01',
        active: true,
    })

    afterAll(async () => {
        await clientRepository.remove(client.id)
    })

    it('Should add a new client', async () => {
        const { props: newClient } = await clientRepository.add(client)

        expect(newClient).toHaveProperty('id')
        expect(newClient).toHaveProperty('code')
    })

    it('Should list clients', async () => {
        const clients = await clientRepository.list()

        expect(clients.length).toBeGreaterThanOrEqual(1)
        expect(clients).toContainEqual(client)
    })

    it('Should find a single Client', async () => {
        const clientById = await clientRepository.find(client.id)
        const clientByCode = await clientRepository.findByCode(client.code)

        expect(clientById).toStrictEqual(client)
        expect(clientByCode).toStrictEqual(client)
    })

    it('Should throw if not find a Client', async () => {
        expect(clientRepository.findByCode(client.code + 'x')).rejects.toThrowError(new Error('Client not found'))
    })
})
