import { ParkingRepository } from "../repositories/ParkingRepository";

export class DeleteCar {
    constructor(private readonly parkingRepository: ParkingRepository) {}

    async exec(id: number) {
        await this.parkingRepository.delete(id)
    }
}