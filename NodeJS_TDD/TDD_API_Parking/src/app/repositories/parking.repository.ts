import { DB } from "../../infra/database/db";
import { IParkedCar } from "../../domain/ParkedCar";
import { Plate } from "../../domain/Plate";

export class ParkingRepository {
    constructor(private database: DB) {}

    async findOne (plate: Plate['content']): Promise<IParkedCar> {
        return await this.database.get(plate) as IParkedCar
    }

    async findAll () {
        return await this.database.list()
    }

    async add (car: IParkedCar): Promise<IParkedCar> {
        return await this.database.insert(car) as IParkedCar
    }

    async update (plate: Plate['content'], car: Partial<IParkedCar>) {
        return await this.database.update(plate, car) as IParkedCar
    }
}