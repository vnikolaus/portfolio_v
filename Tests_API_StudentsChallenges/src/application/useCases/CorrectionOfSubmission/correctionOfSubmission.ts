import { Correction } from "../../../domain/entities/correction";
import { Submission } from "../../../domain/entities/submission";

export class CorrectionOfSubmission {

    async correction(submission: Correction) {
        const rand = Math.floor(Math.random() * 10)
        submission.props.grade = rand
        if (submission.props.grade < 0 || submission.props.grade > 10) throw new Error('Invalid grade')

        return submission.props
    }
}