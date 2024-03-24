describe('E2E - Test', () => {
    it.skip('should insert a new item in stock', async () => {
        const url = 'http://localhost:3000/ms/v1/item/insert'
        const item = {
            code: '123456',
            name: 'Martelo',
            qty: 1,
        }

        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(item),
        })

        const output = await response.json()
        expect(output.new_movimentation_id).toBeDefined()
        expect(output.status).toBeDefined()
    })
})
