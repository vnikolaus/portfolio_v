import { addDays, formatDistance } from 'date-fns'

export class Period {
    static generateDates(duration: number) {
        const start_date = new Date().toISOString();
        const end_date = addDays(start_date, duration).toISOString();
        return {
            start_date,
            end_date
        }
    }

    static getDistance(start_date: string, end_date: string) {
        const distance = formatDistance(new Date(start_date), new Date(end_date))
        return parseInt(distance)
    }
}