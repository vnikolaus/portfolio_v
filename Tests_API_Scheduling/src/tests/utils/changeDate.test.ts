import { test, describe, expect } from 'vitest'
import { changeDate } from './changeDate'

const year = new Date().getFullYear()

let i = 1
describe(`############ Test's Chagne Date ############`, () => {
    test(`${i++} - Increases year + 1`, () => {
        const date = changeDate(`${year}-06-15`)

        expect(date.getFullYear()).toEqual(year + 1)
    })
})
