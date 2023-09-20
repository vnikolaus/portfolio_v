import { FlightPlan } from '../../domain/FlightPlan'
import { PrismaClient } from '@prisma/client'

export class FpRepository {
    #prisma: PrismaClient

    constructor() {
        this.#prisma = new PrismaClient()
    }

    async insert(flightPlan: FlightPlan) {
        try {
            return this.#prisma.flightPlan.create({
                data: { ...flightPlan },
            })
        } catch (err) {
            console.error(err)
        }
    }

    async update(id: number, data: Partial<FlightPlan>) {
        try {
            return this.#prisma.flightPlan.update({ data: { ...data }, where: { id: id } })
        } catch (err) {
            console.error(err)
        }
    }

    async delete(id: number) {
        try {
            await this.#prisma.flightPlan.delete({ where: { id: id } })
        } catch (err) {
            console.error(err)
        }
    }

    async list() {
        try {
            return this.#prisma.flightPlan.findMany()
        } catch (err) {
            console.error(err)
        }
    }
}
