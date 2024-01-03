export class GMT {
    static format(date: Date, symbol = '-') {
        const timestampThreeHours = 60000
        return symbol === '-' ? date.valueOf() - date.getTimezoneOffset() * timestampThreeHours : date.valueOf() + date.getTimezoneOffset() * timestampThreeHours
    }
}