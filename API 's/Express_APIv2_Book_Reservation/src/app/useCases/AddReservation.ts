import { Reservation } from "@entities/Reservation";
import { ReservationRepository } from "@repositories/Reservation.repository";
import { Period } from "@services/Period";
import { ReservationProps } from "@types/types";

export class AddReservation {
    constructor(private readonly repository: ReservationRepository) {}

    async execute(input: ReservationProps) {
        const { start_date, end_date } = Period.generateDates(input.duration)
        const props = {
            ...input,
            start_date, 
            end_date,
        }
        const reservation = new Reservation(props)
        const output = await this.repository.insert(reservation)
        return output
    }
}