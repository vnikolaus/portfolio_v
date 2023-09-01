import { Period } from "../../domain/Period";
import { Plate } from "../../domain/Plate";
import { ParkingRepository } from "../repositories/parking.repository";

export class Checkout {
    
    constructor(private repository: ParkingRepository) {}

    async execute (plate: Plate['content'], checkoutDate: Date) {
        new Plate(plate)

        const parkedCar = await this.repository.findOne(plate)
        if (!parkedCar) throw new Error('Undentified plate')

        const rawDate = String(parkedCar.checkinDate)
        const checkinDate = new Date(rawDate)

        const period = new Period(checkinDate, checkoutDate)
        const { ticketPrice } = await period.calculateTaxes({ plate, checkinDate, checkoutDate })

        return await this.repository.update(plate, { checkinDate, checkoutDate, ticketPrice })
    }
}