import { DataSource } from 'typeorm'
import { dataSource } from './conn.migrations'

let i = 1
describe(`DataSource - Test's `, () => {
    test(`${i++} - Migrations D.S Should be a DataSource instance`, () => {
        const ds = dataSource
        expect(ds).toBeInstanceOf(DataSource)
        expect(ds).toHaveProperty('initialize')
    })
})
