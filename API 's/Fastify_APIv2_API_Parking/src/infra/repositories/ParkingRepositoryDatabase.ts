import { FastifyInstance } from "fastify";
import { ParkingRepository } from "../../app/repositories/ParkingRepository";
import { ParkedCar } from "../../domain/entities/ParkedCar";

export class ParkingRepositoryDatabase implements ParkingRepository {
    constructor(private readonly fastify: FastifyInstance) {}

    async get(id: string) {
        const { rows } = await this.fastify.pg.query('SELECT * FROM "parked_car" WHERE id = $1', [id])
        if (rows.length <= 0) return false
        const parkedCar = ParkedCar.instance(...rows)
        return parkedCar
    }

    async getByPlate(plate: string) {
        const { rows } = await this.fastify.pg.query('SELECT * FROM "parked_car" WHERE plate = $1', [plate])
        if (rows.length <= 0) return false
        const parkedCar = ParkedCar.instance(rows.at(-1))
        return parkedCar
    }

    async add(plate: string, checkin: Date) {
        await this.fastify.pg.query('INSERT INTO "parked_car" (plate, checkin) VALUES ($1, $2)', [plate, checkin.toISOString()])
        return await this.getByPlate(plate)
    }

    async update({ id, plate, checkin, checkout, total }: ParkedCar) {
        await this.fastify.pg.query('UPDATE "parked_car" SET plate = $1, checkin = $2, checkout = $3, total = $4 WHERE id = $5', [
            plate, checkin.toISOString(), checkout.toISOString(), total, id
        ])
    }

    async delete(id: number) {
        await this.fastify.pg.query('DELETE FROM "parked_car" WHERE id = $1', [id])
    }
}