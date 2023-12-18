import { GMT } from "../../infra/time/GMT";
import { CalculateTotal } from "./CalculateTotal";
import { GetCar } from "./GetCar";

export class Checkout {
    constructor(private readonly parkingRepository: ParkingRepository) {}

    async exec(id: number) {
        try {
            const getCar = new GetCar(this.parkingRepository)
            const parkedCar =  await getCar.exec(id)
            if (parkedCar.checkout) throw new Error('Car already checkouted.')
            const checkout = new Date(GMT.format(new Date()))
            const calculate = new CalculateTotal()
            const total = await calculate.exec(parkedCar.checkin, checkout)
            const updatedData = {
                ...parkedCar,
                checkout,
                total
            }
            await this.parkingRepository.update(updatedData)
            return updatedData
        } catch (err) {
            return { error: err.message }
        }
    }
}