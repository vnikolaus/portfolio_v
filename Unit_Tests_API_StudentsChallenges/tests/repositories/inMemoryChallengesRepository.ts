import { ChallengesRepository } from "../../src/application/repositories/ChallengesRepository "
import { Challenge } from "../../src/domain/entities/challenge"


export class InMemoryChallengesRepository implements ChallengesRepository {
    public items: Challenge[] = []

    async findById(id: string): Promise<Challenge | null> {
        const challenge = this.items.find(item => item.id === id)
        return challenge ?? null
    }
}