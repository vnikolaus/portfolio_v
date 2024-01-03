export class GMT {
    static format(date: Date) {
        return new Date(date.valueOf() - date.getTimezoneOffset() * 60000).toISOString()
    }
}