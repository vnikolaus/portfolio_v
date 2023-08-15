import { setYear } from 'date-fns'

export function changeDate(date: string): Date {
    const _date = new Date(date)
    return setYear(_date, _date.getFullYear() + 1)
}
