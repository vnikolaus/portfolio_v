import { IParkedCar } from "../../domain/ParkedCar"
import { Period } from "../../domain/Period"
import { Plate } from "../../domain/Plate"
import { ParkingRepository } from "../repositories/parking.repository"

export class Checkin {
    constructor(private repository: ParkingRepository) {}

    async execute (plate: Plate['content'], checkinDate: Date): Promise<Partial<IParkedCar>> {
        new Period(checkinDate)
        const _plate = new Plate(plate)
        const parkedCar = { plate: _plate, checkinDate }

        await this.repository.add(parkedCar)

        return parkedCar
    }
}