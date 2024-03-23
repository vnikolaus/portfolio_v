import { expect, it, vi } from 'vitest'
import { User } from '../../entities/User'
import { SHA1 } from 'crypto-js'
import { mySqlUsersRepository } from './main'
import { afterEach, describe } from 'node:test'

const OBJ_USER = { name: 'Vitest', email: 'vitest@test.com', password: 'testVitest@' }

describe(`Tests - CreateUser`, () => {
    afterEach(() => vi.clearAllMocks())
    const spyConsole = vi.spyOn(console, 'log')

    let i = 1;

    it(`${i++} - should create a new User`, async () => {
        const user = new User(OBJ_USER)
        expect(user).toBeInstanceOf(User)
        expect(user.name).toEqual('Vitest')
        expect(user.id).not.toBeNull()
    })
    
    
    it(`${i++} - should save / delete user in the database, after call MySQL functions`, async() => {
        const user = new User(OBJ_USER)
        const savedUser = await mySqlUsersRepository.save(user)
    
        await mySqlUsersRepository.delete(user.id)

        const findUser = await mySqlUsersRepository.findByEmail(user.email)
    
        expect(savedUser[0]).toHaveProperty('id')
        expect(spyConsole).toBeCalledTimes(1)
        expect(findUser).empty
    })

    it(`${i++} - should return a correct user according to the email passed`, async () => {
        const user = new User(OBJ_USER)
        const savedUser = await mySqlUsersRepository.save(user)
        const findUser = await mySqlUsersRepository.findByEmail(savedUser[0].email)

        await mySqlUsersRepository.delete(user.id)
        
        expect(findUser[0].name).toEqual('Vitest')
        expect(findUser[0].password).toEqual(String(SHA1('testVitest@')))
    })

    it(`${i++} - should return a list of all users`, async () => {
        const user = new User(OBJ_USER)
        const savedUser = await mySqlUsersRepository.save(user)
        const rows = await mySqlUsersRepository.listUsers()

        await mySqlUsersRepository.delete(user.id)
        
        // @ts-ignore
        expect(rows.length).toBeGreaterThanOrEqual(1)
    })
})