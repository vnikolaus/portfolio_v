import { Connection } from "./conn"

let i = 1
describe(`############ Test's Database - Connection ############`, () => {
    
    it(`${i++} - Should create a instance of Connection - MySQL `, async () => {
        const conn = new Connection()
        
        expect(conn).toBeInstanceOf(Connection)
        expect(conn).toHaveProperty('connection')
        expect(conn.connection).not.toBeNull()
    })

})
