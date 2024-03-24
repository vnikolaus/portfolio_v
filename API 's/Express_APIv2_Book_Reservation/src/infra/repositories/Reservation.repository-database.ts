import { Reservation } from "@entities/Reservation";
import { PrismaClient } from "@prisma/client";
import { ReservationRepository } from "@repositories/Reservation.repository";

export class ReservationRepositoryDatabase implements ReservationRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async find(id: string) {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id }
        })
        return new Reservation(reservation)
    }
    
    async findAll(): Promise<Reservation[]> {
        return await this.prisma.reservation.findMany({
            include: {
                book: {
                    select: {
                        id: true,
                        title: true,
                    }
                }
            }
        })
    }
    
    async insert(reservation: Reservation): Promise<Reservation> {
        const new_reservation = await this.prisma.reservation.create({
            data: reservation
        })
        return new Reservation(new_reservation)
    }

    async delete(id: string): Promise<void> {
        await this.prisma.reservation.delete({ where: { id }})
    }
}