import { CreateChallengeSubmission } from './createChallengeSubmission'
import { InMemoryStudentsRepository } from '../../../../tests/repositories/inMemoryStudentsRepository'
import { InMemoryChallengesRepository } from '../../../../tests/repositories/inMemoryChallengesRepository'
import { Student } from '../../../domain/entities/student'
import { Challenge } from '../../../domain/entities/challenge'
import { describe, it, expect } from 'vitest'

let i = 1
describe(`############ Test 's Create Challenge Submission ############`, () => {

    it(`${i++} - Should create a new Challenge Submission`, async() => {
        const inMemoryStudentsRepository = new InMemoryStudentsRepository()
        const inMemoryChallengeRepository = new InMemoryChallengesRepository()

        const student = Student.create({ 
            name: 'Student Vitest', 
            email: 'vitest@test.com' 
        })

        const challenge = Challenge.create({ 
            title: 'Challenge Vitest', 
            instructionsUrl: 'http://vitest.com'
        })

        inMemoryStudentsRepository.items.push(student)
        inMemoryChallengeRepository.items.push(challenge)

        const sut = new CreateChallengeSubmission(
            inMemoryStudentsRepository, 
            inMemoryChallengeRepository
        )

        const response = await sut.exec({ 
            studentId: student.id, 
            challengeId: challenge.id
        })

        expect(sut).toBeInstanceOf(CreateChallengeSubmission)
        expect(response).toBeTruthy()
    })
})