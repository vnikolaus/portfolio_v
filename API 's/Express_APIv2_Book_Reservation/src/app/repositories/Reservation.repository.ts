import { Reservation } from "@entities/Reservation"

export interface ReservationRepository {
    find(id: string): Promise<Reservation>
    findAll(): Promise<Reservation[]>
    insert(reservation: Reservation): Promise<Reservation>
    delete(id: string): Promise<void>
}