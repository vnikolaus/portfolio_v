import { getHour } from "../app/helpers/getDate"

export class Period {
    private readonly OPEN_HOUR = 8
    private readonly CLOSED_HOUR = 21

    private readonly PRICE_PER_HOUR:number = 15
    
    constructor (checkinDate: Date, checkoutDate?: Date) {
        if (getHour(checkinDate) < this.OPEN_HOUR || getHour(checkinDate) > this.CLOSED_HOUR) throw new Error('Parking lot is out of operation time')
        if (checkoutDate) {
            if (getHour(checkoutDate) < this.OPEN_HOUR || getHour(checkoutDate) > this.CLOSED_HOUR) throw new Error('Parking lot is out of operation time')
        }
    }

    async calculateTaxes ({ plate, checkinDate, checkoutDate }: { plate: string, checkinDate: Date, checkoutDate: Date }) {
        const period = +checkoutDate.getHours() - +checkinDate.getHours()

        return {
            plate,
            checkinDate,
            checkoutDate,
            ticketPrice: period * this.PRICE_PER_HOUR
        }
    }
}