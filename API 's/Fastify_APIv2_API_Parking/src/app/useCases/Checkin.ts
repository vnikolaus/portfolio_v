import { GMT } from "../../infra/time/GMT";
import { ParkingRepository } from "../repositories/ParkingRepository";

export class Checkin {
    constructor(private readonly parkingRepository: ParkingRepository) {}

    async exec(plate: string) {
        const car = await this.parkingRepository.getByPlate(plate)
        if (car && !car.checkout) throw new Error('Car already is in parking.')
        const checkin = new Date(GMT.format(new Date()))
        return await this.parkingRepository.add(plate, checkin)
    }
}