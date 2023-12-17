export class CalculateTotal {
    readonly #dailyPrice = 180
    readonly #firstHour = 15
    readonly #aditionalHours = 10
    readonly #tolerancy = 0

    #calculatePermanency(hours: number) {
        let total = 0
        for (let i = 0; i < hours; i++) {
            i === 0 ? total += this.#firstHour : total += this.#aditionalHours
        }
        return total
    }

    async exec(checkin: Date, checkout: Date) {
        const days = checkout.getUTCDate() - checkin.getUTCDate()
        const hours = new Date(checkout - checkin).getUTCHours()
        const minutes = new Date(checkout - checkin).getUTCMinutes()
        const entrance = checkin.getUTCHours(), exit = checkout.getUTCHours()
        const exactly24Hours = (hours === 0 && minutes === 0)
        const dayNotCompleted = (entrance > exit)
        const dayCompleted = (entrance < exit)
        const firstHourNotCompleted = (hours < 1 && minutes > 15)
        const tolerancyTime = (hours < 1 && minutes <= 15)
        if (days > 0 && exactly24Hours) return days * this.#dailyPrice
        else if (days > 0 && dayNotCompleted) return Math.min((days - 1) * this.#dailyPrice + Math.min(this.#calculatePermanency(hours), days * this.#dailyPrice), days * this.#dailyPrice)
        else if (days > 0 && dayCompleted) return (days * this.#dailyPrice) + Math.min(this.#calculatePermanency(hours), days * this.#dailyPrice) 
        else if (firstHourNotCompleted) return this.#firstHour
        else if (tolerancyTime) return this.#tolerancy
        else return Math.min(this.#calculatePermanency(hours), this.#dailyPrice)
    }
}