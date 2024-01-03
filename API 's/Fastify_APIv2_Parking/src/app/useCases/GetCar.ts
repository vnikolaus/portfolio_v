import { ParkingRepository } from "../repositories/ParkingRepository";

export class GetCar {
    constructor(private readonly parkingRepository: ParkingRepository) {}

    async exec(id: number) {
        const car = await this.parkingRepository.get(id)
        if (!car) throw new Error('Car is not found')
        return car
    }
}