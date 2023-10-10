import { Plate } from "./Plate";

export interface IParkedCar {
    plate: Plate,
    checkinDate?: Date,
    checkoutDate?: Date,
    ticketPrice?: number
}