import { ReservationRepository } from "@repositories/Reservation.repository";

export class FindReservations {
    constructor(private readonly repository: ReservationRepository) {}

    async execute() {
        return await this.repository.findAll()
    }
}