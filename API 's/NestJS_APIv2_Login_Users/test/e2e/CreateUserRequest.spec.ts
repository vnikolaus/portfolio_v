describe('Create User Request - Test', () => {
    it.skip('should create a new user', async () => {
        const url = 'http://localhost:3000/api/v1/user/create'
        const input = { email: 'fake@email.com', pwd: 'fakepwd' }
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(input),
        })
        const data = await response.json()
        expect(data).toHaveProperty('id')
        expect(data).toHaveProperty('createdAt')
    })
})
