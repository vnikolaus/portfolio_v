import { ReservationRepository } from "@repositories/Reservation.repository";

export class DeleteReservation {
    constructor(private readonly repository: ReservationRepository) {}

    async execute(id: string) {
        await this.repository.delete(id)
    }
}