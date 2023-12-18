import { ParkingRepository } from "../repositories/ParkingRepository";

export class DeleteCar {
    constructor(private readonly parkingRepository: ParkingRepository) {}

    async exec(id: number) {
        try {
            await this.parkingRepository.delete(id)
        } catch (err) {
            return { error: err.message }
        }
    }
}