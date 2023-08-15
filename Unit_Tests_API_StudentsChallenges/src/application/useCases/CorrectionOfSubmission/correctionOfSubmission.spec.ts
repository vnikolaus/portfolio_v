import { number } from "zod"
import { Correction } from "../../../domain/entities/correction"
import { CorrectionOfSubmission } from "./correctionOfSubmission"
import { describe, it, expect } from 'vitest'

let i = 1
describe(`############ Test 's Correction of Challenge Submission ############`, () => {
    it(`${i++} - Should create a new instance of Correction`, async() => {
        const correction = new CorrectionOfSubmission()

        expect(correction).toBeInstanceOf(CorrectionOfSubmission)
    })

    it(`${i++} - Grade should be a number, and returns between 0 - 10`, async() => {
        const correction = Correction.create({
            grade: 0,
            submissionId: 'vitest-fake-id',
            createdAt: new Date()
        })
        const correctionOfSubmission = new CorrectionOfSubmission()
        const correctObj = await correctionOfSubmission.correction(correction)

        expect(correctObj.grade).toEqual(Number(correctObj.grade))
        expect(correctObj.grade).toBeGreaterThan(0)
        expect(correctObj.grade).toBeLessThan(10)
    })
})