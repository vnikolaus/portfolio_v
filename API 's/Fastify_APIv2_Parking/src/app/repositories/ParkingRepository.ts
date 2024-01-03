import { ParkedCar } from "../../domain/entities/ParkedCar"

export interface ParkingRepository {
    get(id: string): ParkedCar
    getByPlate(plate: string): ParkedCar
    add(plate: string): ParkedCar
    update(car: ParkedCar): void
    delete(id: number): void
}