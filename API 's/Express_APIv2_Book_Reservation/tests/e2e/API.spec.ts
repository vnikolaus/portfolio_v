import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'

const e2e_disabled = true

describe('API - TEST', () => {
    it.skipIf(e2e_disabled)('Should insert & delete a new book', async () => {
        const url = `http://localhost:3000/add/book`
        const body = {
                title: 'Livro Teste - 1',
                author: 'Vitest',
                pages: 150,
        }
        const response = await axios.post(url, body)
        const output = await response.data
        expect(output.id).toBeDefined()
        const url_delete = `http://localhost:3000/book/${output.id}`
        expect(axios.delete(url_delete)).resolves
    })

    it.skipIf(e2e_disabled)('Should find a book', async () => {
        const url = `http://localhost:3000/book/6`
        const response = await axios.get(url)
        const output = await response.data
        expect(output.id).toBeDefined()
        expect(output.pages).toBe(150)
    })

    it.skipIf(e2e_disabled)('Should insert & delete a new reservation', async () => {
        const url = `http://localhost:3000/add/reservation`
        const body = {
            book_id: 6,
            duration: 10,
        }
        const response = await axios.post(url, body)
        const output = await response.data
        expect(output.id).toBeDefined()
        expect(output.status).toBe('pending')
        const url_delete = `http://localhost:3000/reservation/${output.id}`
        expect(axios.delete(url_delete)).resolves
    })

    it.skipIf(e2e_disabled)('Should find all reservations', async () => {
        const url = `http://localhost:3000/reservations`
        const response = await axios.get(url)
        const data = await response.data
        expect(data.length).toBeGreaterThanOrEqual(1)
    })
})