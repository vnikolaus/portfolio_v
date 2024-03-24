import { ReservationProps } from "@types/types"

export class Reservation {
    readonly id?: string
    readonly book_id: number
    readonly duration: number
    readonly start_date: string
    readonly end_date: string
    readonly status: string

    constructor(props: ReservationProps) {
        const initial_status = 'pending'
        Object.assign(this, {
            ...props,
            status: initial_status,
        })
    }
}