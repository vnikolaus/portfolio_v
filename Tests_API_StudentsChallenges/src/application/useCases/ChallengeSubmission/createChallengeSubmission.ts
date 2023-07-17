import { Submission } from "../../../domain/entities/submission"
import { ChallengesRepository } from "../../repositories/ChallengesRepository "
import { StudentsRepository } from "../../repositories/StudentsRepository"

type CreateChallengeSubmissionProps = {
    challengeId: string
    studentId: string
}

export class CreateChallengeSubmission {
    constructor(private studentsRepository: StudentsRepository, 
        private challengesRepository: ChallengesRepository) {}

    async exec({ challengeId, studentId }: CreateChallengeSubmissionProps ) {
        const student = await this.studentsRepository.findById(studentId)
        if (!student) throw new Error('Student not found')

        const challenge = await this.challengesRepository.findById(challengeId)
        if (!challenge) throw new Error('Student not found')

        const submission = Submission.create({ challengeId, studentId })
        return submission
    }
}